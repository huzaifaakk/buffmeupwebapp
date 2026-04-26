import React from 'react';
import { SidebarLayout } from '../../components/ui/Layouts';
import { adminLinks } from './Dashboard';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export const AdminSettings = () => {
  return (
    <div>
      <SidebarLayout title="Platform Settings" links={adminLinks}>
        <div className="bg-card border rounded-md overflow-hidden fade-in p-4 max-w-lg">
          <h2 className="text-xl mb-4">Configuration</h2>
          <form className="flex flex-col gap-4">
            <Input label="Platform Name" defaultValue="BUFFMEUP" />
            <Input label="Support Email" defaultValue="support@buffmeup.com" />
            
            <div className="flex items-center gap-2 mt-2">
              <input type="checkbox" id="allowSignups" defaultChecked />
              <label htmlFor="allowSignups">Allow new user signups</label>
            </div>
            
            <div className="mt-4">
              <Button type="button">Save Changes</Button>
            </div>
          </form>
        </div>
      </SidebarLayout>
      <style>{`
        .bg-card { background-color: var(--bg-card); }
        .border { border: 1px solid var(--border-color); }
        .rounded-md { border-radius: var(--radius-card); }
        .p-4 { padding: 1.5rem; }
        .mb-4 { margin-bottom: 1.5rem; }
        .mt-2 { margin-top: 0.5rem; }
        .mt-4 { margin-top: 1rem; }
        .max-w-lg { max-width: 600px; }
        .text-xl { font-size: 1.25rem; font-weight: 600; margin: 0; }
        .flex { display: flex; }
        .flex-col { flex-direction: column; }
        .items-center { align-items: center; }
        .gap-2 { gap: 0.5rem; }
        .gap-4 { gap: 1rem; }
      `}</style>
    </div>
  );
};
