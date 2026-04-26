import React from 'react';
import { SidebarLayout } from '../../components/ui/Layouts';
import { trainerLinks } from './Dashboard';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export const TrainerProfile = () => {
  const { profile } = useAuth();

  return (
    <div>
      <SidebarLayout title="My Profile" links={trainerLinks}>
        <div className="bg-card border rounded-md p-4 fade-in max-w-lg">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b">
            <div className="avatar-placeholder">
              {profile?.name?.charAt(0) || 'T'}
            </div>
            <div>
              <h2 className="text-xl">{profile?.name || 'Trainer'}</h2>
              <p className="text-secondary">@{profile?.username}</p>
            </div>
          </div>
          
          <form className="flex flex-col gap-4">
            <Input label="Full Name" defaultValue={profile?.name || ''} />
            <Input label="Bio" defaultValue={profile?.bio || ''} />
            <div className="mt-4">
              <Button type="button">Update Profile</Button>
            </div>
          </form>
        </div>
      </SidebarLayout>
      <style>{`
        .bg-card { background-color: var(--bg-card); }
        .border { border: 1px solid var(--border-color); }
        .border-b { border-bottom: 1px solid var(--border-color); }
        .rounded-md { border-radius: var(--radius-card); }
        .p-4 { padding: 1.5rem; }
        .pb-6 { padding-bottom: 1.5rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mt-4 { margin-top: 1rem; }
        .max-w-lg { max-width: 600px; }
        .flex { display: flex; }
        .flex-col { flex-direction: column; }
        .items-center { align-items: center; }
        .gap-4 { gap: 1rem; }
        .text-xl { font-size: 1.25rem; font-weight: 600; margin: 0; }
        .text-secondary { color: var(--text-secondary); }
        .avatar-placeholder { width: 64px; height: 64px; border-radius: 50%; background: var(--accent-primary); color: white; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 700; }
      `}</style>
    </div>
  );
};
