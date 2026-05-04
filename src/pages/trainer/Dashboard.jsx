import React from 'react';
import { SidebarLayout } from '../../components/ui/Layouts';
import { Users, ClipboardList, MessageSquare } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTrainerClients } from '../../hooks/useUsers';

export const trainerLinks = [
  { label: 'Dashboard', path: '/trainer' },
  { label: 'My Clients', path: '/trainer/clients' },
  { label: 'Workout Plans', path: '/trainer/plans' },
  { label: 'Exercises', path: '/trainer/exercises' },
  { label: 'Messages', path: '/trainer/messages' },
  { label: 'My Profile', path: '/trainer/profile' },
];

export const TrainerDashboard = () => {
  const { profile } = useAuth();
  const { clients, loading } = useTrainerClients(profile?.id);

  return (
    <div>
      <SidebarLayout title={`Good morning, ${profile?.name || 'Trainer'}`} links={trainerLinks}>
        <div className="dashboard-grid">
          
          <div className="stat-card">
            <div className="stat-icon"><Users /></div>
            <div className="stat-info">
              <p className="stat-label">Total Clients</p>
              <h3 className="stat-value">{loading ? '...' : clients.length}</h3>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon"><ClipboardList /></div>
            <div className="stat-info">
              <p className="stat-label">Active Plans</p>
              <h3 className="stat-value">0</h3>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon"><MessageSquare /></div>
            <div className="stat-info">
              <p className="stat-label">Unread Messages</p>
              <h3 className="stat-value">0</h3>
            </div>
          </div>

        </div>

        <div className="feed-container fade-in">
          <h2 className="section-title">Client Activity</h2>
          <div className="activity-list">
            <div className="p-4 text-center text-secondary border rounded-md">
              No recent activity from your clients.
            </div>
          </div>
        </div>
      </SidebarLayout>
      <style>{`
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        .stat-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-card);
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          box-shadow: var(--shadow-sm);
        }
        .stat-icon {
          color: var(--accent-primary);
          background-color: rgba(0, 210, 255, 0.1);
          padding: 1rem;
          border-radius: 50%;
          display: flex;
        }
        .stat-label {
          color: var(--text-secondary);
          font-size: 0.875rem;
          margin: 0;
        }
        .stat-value {
          font-size: 1.5rem;
          margin: 0;
        }
        .section-title {
          font-size: 1.25rem;
          margin-bottom: 1rem;
        }
        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .p-4 { padding: 1rem; }
        .text-center { text-align: center; }
        .text-secondary { color: var(--text-secondary); }
        .border { border: 1px solid var(--border-color); }
        .rounded-md { border-radius: var(--radius-card); }
      `}</style>
    </div>
  );
};
