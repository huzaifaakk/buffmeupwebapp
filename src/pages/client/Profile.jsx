import React from 'react';
import { ClientLayout } from './Sessions';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export const ClientProfile = () => {
  const { profile } = useAuth();

  return (
    <ClientLayout activePath="/client/profile">
      <div className="bg-card border rounded-md p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl mb-6">Account Settings</h2>
        
        <form className="flex flex-col gap-4">
          <Input label="Full Name" defaultValue={profile?.name || ''} />
          <Input label="Username" defaultValue={profile?.username || ''} />
          
          <div className="mt-4 border-t pt-4">
            <h3 className="text-lg mb-4">Physical Attributes</h3>
            <div className="flex gap-4">
              <Input label="Age" type="number" defaultValue={profile?.age || ''} />
              <Input label="Height (cm)" type="number" defaultValue={profile?.height || ''} />
              <Input label="Weight (lbs)" type="number" defaultValue={profile?.weight || ''} />
            </div>
          </div>
          
          <div className="mt-4">
            <Button type="button">Save Profile</Button>
          </div>
        </form>
      </div>
      <style>{`
        .bg-card { background-color: var(--bg-card); }
        .border { border: 1px solid var(--border-color); }
        .border-t { border-top: 1px solid var(--border-color); }
        .rounded-md { border-radius: var(--radius-card); }
        .p-6 { padding: 2rem; }
        .pt-4 { padding-top: 1rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mt-4 { margin-top: 1rem; }
        .max-w-2xl { max-width: 600px; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .flex { display: flex; }
        .flex-col { flex-direction: column; }
        .gap-4 { gap: 1rem; }
        .text-2xl { font-size: 1.5rem; font-weight: 600; margin: 0; }
        .text-lg { font-size: 1.125rem; font-weight: 600; margin: 0; }
      `}</style>
    </ClientLayout>
  );
};
