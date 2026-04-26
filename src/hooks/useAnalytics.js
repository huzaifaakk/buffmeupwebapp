import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useAnalytics = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeTrainers: 0,
    totalPosts: 0,
    flaggedContent: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [usersRes, trainersRes, postsRes] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'client'),
        supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'trainer'),
        supabase.from('posts').select('*', { count: 'exact', head: true })
      ]);

      setStats({
        totalUsers: usersRes.count || 0,
        activeTrainers: trainersRes.count || 0,
        totalPosts: postsRes.count || 0,
        flaggedContent: 0 // Placeholder until flag schema is added
      });
    } catch (err) {
      console.error("Error fetching analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return { stats, loading, refetch: fetchStats };
};
