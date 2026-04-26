import React from 'react';
import { SidebarLayout } from '../../components/ui/Layouts';
import { adminLinks } from './Dashboard';
import { useAnalytics } from '../../hooks/useAnalytics';

export const AdminAnalytics = () => {
  const { stats, loading } = useAnalytics();

  return (
    <div>
      <SidebarLayout title="Analytics & Reports" links={adminLinks}>
        <div className="bg-card border rounded-md overflow-hidden fade-in p-4">
          <h2 className="text-xl mb-4">Platform Overview</h2>
          {loading ? (
            <p>Loading analytics data...</p>
          ) : (
            <div className="stats-grid">
              <div className="stat-box">
                <h4>Total Registered Clients</h4>
                <p className="text-2xl text-primary">{stats.totalUsers}</p>
              </div>
              <div className="stat-box">
                <h4>Active Trainers</h4>
                <p className="text-2xl text-success">{stats.activeTrainers}</p>
              </div>
              <div className="stat-box">
                <h4>Total Social Posts</h4>
                <p className="text-2xl text-accent">{stats.totalPosts}</p>
              </div>
            </div>
          )}
          <div className="mt-8 p-8 border rounded-md text-center text-secondary">
            [Chart Placeholder: User Growth Over Time]
          </div>
        </div>
      </SidebarLayout>
      <style>{`
        .bg-card { background-color: var(--bg-card); }
        .border { border: 1px solid var(--border-color); }
        .rounded-md { border-radius: var(--radius-card); }
        .overflow-hidden { overflow: hidden; }
        .p-4 { padding: 1.5rem; }
        .p-8 { padding: 2rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mt-8 { margin-top: 2rem; }
        .text-xl { font-size: 1.25rem; font-weight: 600; margin: 0; }
        .text-2xl { font-size: 2rem; font-weight: 700; margin-top: 0.5rem; }
        .text-primary { color: var(--text-primary); }
        .text-success { color: var(--status-success); }
        .text-accent { color: var(--accent-primary); }
        .text-secondary { color: var(--text-secondary); }
        .text-center { text-align: center; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; }
        .stat-box { padding: 1.5rem; background: rgba(0,0,0,0.2); border-radius: var(--radius-btn); border: 1px solid var(--border-color); }
        .stat-box h4 { font-size: 0.875rem; color: var(--text-secondary); margin: 0; font-weight: 500; }
      `}</style>
    </div>
  );
};
