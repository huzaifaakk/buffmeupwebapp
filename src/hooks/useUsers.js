import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useUsers = () => {
  const [profiles, setProfiles] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data: profilesData } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
      setProfiles(profilesData || []);

      // Fetch associations separately to avoid join errors
      const [{ data: trainersData }, { data: clientsData }] = await Promise.all([
        supabase.from('trainers').select('*'),
        supabase.from('clients').select('*')
      ]);

      // Map profiles to associations
      const trainersWithProfiles = (trainersData || []).map(t => ({
        ...t,
        profiles: profilesData?.find(p => p.id === t.user_id)
      }));
      const clientsWithProfiles = (clientsData || []).map(c => ({
        ...c,
        profiles: profilesData?.find(p => p.id === c.user_id)
      }));

      setTrainers(trainersWithProfiles);
      setClients(clientsWithProfiles);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { profiles, trainers, clients, loading, refetch: fetchUsers };
};

export const useTrainerClients = (trainerId) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!trainerId) return;

    const fetchClients = async () => {
      setLoading(true);
      try {
        const { data: clientsData, error: clientsError } = await supabase
          .from('clients')
          .select('*')
          .eq('trainer_id', trainerId);
        
        if (clientsError) throw clientsError;

        if (clientsData && clientsData.length > 0) {
          const userIds = clientsData.map(c => c.user_id);
          const { data: profilesData } = await supabase
            .from('profiles')
            .select('*')
            .in('id', userIds);
          
          const combined = clientsData.map(c => ({
            ...c,
            profiles: profilesData?.find(p => p.id === c.user_id)
          }));
          setClients(combined);
        } else {
          setClients([]);
        }
      } catch (err) {
        console.error("Error fetching trainer clients:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [trainerId]);

  return { clients, loading };
};
