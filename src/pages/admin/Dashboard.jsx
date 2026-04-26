import React from 'react';
import { SidebarLayout } from '../../components/ui/Layouts';
import { Users, Activity, Flag } from 'lucide-react';
import { useAnalytics } from '../../hooks/useAnalytics';
import { useUsers } from '../../hooks/useUsers';

export const adminLinks = [
  { label: 'Dashboard', path: '/admin' },
  { label: 'Users', path: '/admin/users' },
  { label: 'Trainers', path: '/admin/trainers' },
  { label: 'Posts', path: '/admin/content' },
  { label: 'Comments', path: '/admin/content/comments' },
  { label: 'Exercise Library', path: '/admin/exercise-library' },
  { label: 'Analytics', path: '/admin/analytics' },
  { label: 'Settings', path: '/admin/settings' },
];

export const AdminDashboard = () => {
  const { stats, loading: statsLoading } = useAnalytics();
  const { profiles, loading: usersLoading } = useUsers();

  const recentUsers = profiles.slice(0, 5); // Last 5 registered users

  return (
    <div>
      <SidebarLayout title="Admin Dashboard" links={adminLinks}>
        <div className="dashboard-grid">
          
          <div className="stat-card">
            <div className="stat-icon"><Users /></div>
            <div className="stat-info">
              <p className="stat-label">Total Clients</p>
              <h3 className="stat-value">{statsLoading ? '...' : stats.totalUsers}</h3>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon"><Activity /></div>
            <div className="stat-info">
              <p className="stat-label">Active Trainers</p>
              <h3 className="stat-value">{statsLoading ? '...' : stats.activeTrainers}</h3>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon"><Flag /></div>
            <div className="stat-info">
              <p className="stat-label">Total Posts</p>
              <h3 className="stat-value">{statsLoading ? '...' : stats.totalPosts}</h3>
            </div>
          </div>

        </div>

        <div className="recent-activity fade-in">
          <h2 className="section-title">Recent Registrations</h2>
          <div className="table-container">
            {usersLoading ? (
              <div className="p-4">Loading users...</div>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Joined Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map(user => (
                    <tr key={user.id}>
                      <td>{user.name || user.username}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`badge badge-${user.role}`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </td>
                      <td>{new Date(user.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {recentUsers.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center p-4">No users found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
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
          border-left: 4px solid var(--accent-primary);
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
        .text-danger {
          color: var(--status-danger);
        }
        .p-4 { padding: 1rem; }
        .section-title {
          font-size: 1.25rem;
          margin-bottom: 1rem;
        }
        .table-container {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-card);
          overflow: hidden;
        }
        .data-table {
          width: 100%;
          border-collapse: collapse;
        }
        .data-table th, .data-table td {
          padding: 1rem 1.5rem;
          text-align: left;
          border-bottom: 1px solid var(--border-color);
        }
        .data-table th {
          background-color: rgba(0, 0, 0, 0.2);
          color: var(--text-secondary);
          font-weight: 500;
          font-size: 0.875rem;
        }
        .badge {
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-badge);
          font-size: 0.75rem;
          font-weight: 600;
        }
        .badge-client { background: rgba(0, 210, 255, 0.1); color: var(--accent-primary); }
        .badge-trainer { background: rgba(34, 197, 94, 0.1); color: var(--status-success); }
        .badge-admin { background: rgba(234, 179, 8, 0.1); color: var(--status-warning); }
      `}</style>
    </div>
  );
};
