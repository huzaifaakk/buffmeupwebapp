import React from 'react';
import { SidebarLayout } from '../../components/ui/Layouts';
import { adminLinks } from './Dashboard';

export const AdminComments = () => {
  return (
    <div>
      <SidebarLayout title="Comments Moderation" links={adminLinks}>
        <div className="bg-card border rounded-md overflow-hidden fade-in">
          <div className="p-4 border-b">
            <h2 className="text-xl">Flagged Comments</h2>
          </div>
          <div className="p-4 text-center text-secondary">
            No flagged comments found.
          </div>
        </div>
      </SidebarLayout>
      <style>{`
        .bg-card { background-color: var(--bg-card); }
        .border { border: 1px solid var(--border-color); }
        .border-b { border-bottom: 1px solid var(--border-color); }
        .rounded-md { border-radius: var(--radius-card); }
        .overflow-hidden { overflow: hidden; }
        .p-4 { padding: 1.5rem; }
        .text-center { text-align: center; }
        .text-secondary { color: var(--text-secondary); }
        .text-xl { font-size: 1.25rem; font-weight: 600; margin: 0; }
      `}</style>
    </div>
  );
};
