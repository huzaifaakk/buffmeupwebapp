import React, { useState, useEffect } from 'react';
import { ClientLayout } from './Sessions';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

export const ClientTrainer = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const { data, error } = await supabase
          .from('clients')
          .select('*, trainers(id, profiles(*))')
          .eq('user_id', user?.id)
          .maybeSingle();

        if (error) throw error;
        setTrainer(data?.trainers);
      } catch (err) {
        console.error("Error fetching trainer:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchTrainer();
  }, [user]);

  if (loading) return (
    <ClientLayout activePath="/client/trainer">
      <div className="p-10 text-center">Loading trainer profile...</div>
    </ClientLayout>
  );

  return (
    <ClientLayout activePath="/client/trainer">
      <div className="bg-card border rounded-md p-6 max-w-4xl mx-auto flex flex-col items-center">
        {trainer ? (
          <>
            <div className="avatar-placeholder mb-4">
              {trainer.profiles?.avatar_url ? (
                <img src={trainer.profiles.avatar_url} alt="avatar" />
              ) : (
                (trainer.profiles?.name || trainer.profiles?.username || 'T').charAt(0).toUpperCase()
              )}
            </div>
            <h2 className="text-2xl mb-2">{trainer.profiles?.name || trainer.profiles?.username}</h2>
            <p className="text-secondary mb-6">{trainer.profiles?.bio || 'Professional Fitness Coach'}</p>
            
            <div className="flex gap-4">
              <Button onClick={() => navigate('/client/feed')}>Message Trainer</Button>
              <Button className="btn-outline" onClick={() => navigate('/client/sessions')}>View Programs</Button>
            </div>
            
            <div className="mt-8 text-left w-full">
              <h3 className="text-xl mb-4">Coaching Status</h3>
              <div className="p-4 bg-sidebar border rounded-md">
                <p className="font-semibold">Active Subscription</p>
                <p className="text-secondary text-sm">You are currently under {trainer.profiles?.name}'s guidance.</p>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-10">
            <h2 className="text-2xl mb-4">No Trainer Assigned</h2>
            <p className="text-secondary mb-6">Contact administration to get assigned to a professional coach.</p>
            <Button onClick={() => navigate('/client/feed')}>Browse Community</Button>
          </div>
        )}
      </div>
      <style>{`
        .bg-card { background-color: var(--bg-card); }
        .bg-sidebar { background-color: var(--bg-color); }
        .border { border: 1px solid var(--border-color); }
        .rounded-md { border-radius: var(--radius-card); }
        .p-6 { padding: 2rem; }
        .p-4 { padding: 1.5rem; }
        .py-10 { padding-top: 2.5rem; padding-bottom: 2.5rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mb-2 { margin-bottom: 0.5rem; }
        .mt-8 { margin-top: 2rem; }
        .max-w-4xl { max-width: 800px; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .flex { display: flex; }
        .flex-col { flex-direction: column; }
        .items-center { align-items: center; }
        .gap-4 { gap: 1rem; }
        .text-2xl { font-size: 1.5rem; font-weight: 700; margin: 0; }
        .text-xl { font-size: 1.25rem; font-weight: 600; margin: 0; }
        .text-secondary { color: var(--text-secondary); }
        .text-sm { font-size: 0.875rem; }
        .text-left { text-align: left; }
        .w-full { width: 100%; }
        .font-semibold { font-weight: 600; }
        .avatar-placeholder { width: 100px; height: 100px; border-radius: 50%; background: var(--accent-primary); color: white; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; font-weight: 700; overflow: hidden; }
        .avatar-placeholder img { width: 100%; height: 100%; object-fit: cover; }
      `}</style>
    </ClientLayout>
  );
};
