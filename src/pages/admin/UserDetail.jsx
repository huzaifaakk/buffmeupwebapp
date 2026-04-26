import React from 'react';
import { SidebarLayout } from '../../components/ui/Layouts';
import { adminLinks } from './Dashboard';

export const AdminUserDetail = () => {
  return (
    <div>
      <SidebarLayout title="User Detail" links={adminLinks}>
        <div className="p-4 bg-card border rounded-md">
          <h2 className="text-xl mb-4">User Profile</h2>
          <p className="text-secondary">This page will display detailed information about a specific user, including their history, assigned trainer, and activity logs.</p>
          <div className="mt-4 p-4 border rounded-md" style={{ background: 'var(--bg-color)' }}>
            <p><strong>Name:</strong> John Doe</p>
            <p><strong>Role:</strong> Client</p>
            <p><strong>Status:</strong> Active</p>
          </div>
        </div>
      </SidebarLayout>
      <style>{`
        .bg-card { background-color: var(--bg-card); }
        .border { border: 1px solid var(--border-color); }
        .rounded-md { border-radius: var(--radius-card); }
        .p-4 { padding: 1.5rem; }
        .text-xl { font-size: 1.25rem; font-weight: 600; }
        .text-secondary { color: var(--text-secondary); }
        .mb-4 { margin-bottom: 1rem; }
        .mt-4 { margin-top: 1rem; }
      `}</style>
    </div>
  );
};
