import React from 'react';
import { SidebarLayout } from '../../components/ui/Layouts';
import { trainerLinks } from './Dashboard';
import { useParams, Link } from 'react-router-dom';

export const TrainerClientDetail = () => {
  const { clientId } = useParams();

  return (
    <div>
      <SidebarLayout title="Client Progress" links={trainerLinks}>
        <div className="mb-4">
          <Link to="/trainer/clients" className="text-accent hover-underline">← Back to Clients</Link>
        </div>
        <div className="bg-card border rounded-md overflow-hidden fade-in p-4">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b">
            <div className="avatar-placeholder">C</div>
            <div>
              <h2 className="text-2xl">Client Profile</h2>
              <p className="text-secondary">ID: {clientId}</p>
            </div>
          </div>
          
          <h3 className="text-xl mb-4">Assigned Plan</h3>
          <div className="p-4 bg-sidebar border rounded-md mb-6">
            <p><strong>Current Phase:</strong> Hypertrophy Block 1</p>
            <p><strong>Progress:</strong> Week 3 of 8</p>
          </div>

          <h3 className="text-xl mb-4">Recent Activity</h3>
          <p className="text-secondary">No recent activity logged by this client.</p>
        </div>
      </SidebarLayout>
      <style>{`
        .bg-card { background-color: var(--bg-card); }
        .bg-sidebar { background-color: var(--bg-color); }
        .border { border: 1px solid var(--border-color); }
        .border-b { border-bottom: 1px solid var(--border-color); }
        .rounded-md { border-radius: var(--radius-card); }
        .overflow-hidden { overflow: hidden; }
        .p-4 { padding: 1.5rem; }
        .pb-6 { padding-bottom: 1.5rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .flex { display: flex; }
        .items-center { align-items: center; }
        .gap-4 { gap: 1rem; }
        .text-xl { font-size: 1.25rem; font-weight: 600; margin: 0; }
        .text-2xl { font-size: 1.5rem; font-weight: 700; margin: 0; }
        .text-secondary { color: var(--text-secondary); }
        .text-accent { color: var(--accent-primary); text-decoration: none; }
        .hover-underline:hover { text-decoration: underline; }
        .avatar-placeholder { width: 64px; height: 64px; border-radius: 50%; background: var(--accent-primary); color: white; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 700; }
      `}</style>
    </div>
  );
};
