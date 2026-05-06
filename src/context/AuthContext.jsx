import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);
  const loadingProfile = useRef(null); // Store the current fetch promise

  const fetchProfile = async (userId) => {
    if (loadingProfile.current === userId) return; // Already fetching this profile
    loadingProfile.current = userId;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      setProfile(data);
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      loadingProfile.current = null;
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    let mounted = true;

    const initializeAuth = async () => {
      // Safety timeout: If initialization takes > 10s, force loading to false
      const timeout = setTimeout(() => {
        if (mounted) {
          console.warn("Auth initialization timed out (10s)");
          setLoading(false);
        }
      }, 10000);

      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Session fetch error:", error);
          if (mounted) setLoading(false);
          return;
        }
        
        if (session?.user) {
          if (mounted) setUser(session.user);
          await fetchProfile(session.user.id);
        } else {
          if (mounted) setLoading(false);
        }
      } catch (error) {
        console.error("Auth init error:", error);
        if (mounted) setLoading(false);
      } finally {
        clearTimeout(timeout);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;
      
      if (event === 'INITIAL_SESSION') return;
      
      if (session?.user) {
        setUser(session.user);
        // If we just signed up, the signUp function handles setProfile
        // But for other logins, we need to fetch it
        if (!profile || profile.id !== session.user.id) {
          await fetchProfile(session.user.id);
        }
      } else {
        setUser(null);
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [profile]); // Added profile to deps to help check in onAuthStateChange

  const signIn = async (email, password) => {
    return supabase.auth.signInWithPassword({ email: email.trim(), password });
  };

  const signUp = async (email, password, role, name, username, age, height, weight) => {
    // 1. Sign up user
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return { error };

    const userId = data.user.id;
    const newProfile = { 
      id: userId, 
      email, 
      role, 
      name, 
      username, 
      age: age ? parseInt(age) : null, 
      height: height ? parseFloat(height) : null, 
      weight: weight ? parseFloat(weight) : null 
    };

    // 2. Create profile
    const { error: profileError } = await supabase.from('profiles').upsert([newProfile]);
    
    if (profileError) return { error: profileError };
    
    // Set local state immediately to fix the race condition before router navigates
    setProfile(newProfile);

    // 3. Create role-specific record
    if (role === 'client') {
      await supabase.from('clients').insert([{ id: crypto.randomUUID(), user_id: userId }]);
    } else if (role === 'trainer') {
      await supabase.from('trainers').insert([{ id: crypto.randomUUID(), user_id: userId }]);
    }

    return { data };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const updateProfile = async (updates) => {
    if (!user) return { error: new Error('No user logged in') };
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id);
    
    if (error) return { error };
    
    setProfile(prev => ({ ...prev, ...updates }));
    return { error: null };
  };

  const value = {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
