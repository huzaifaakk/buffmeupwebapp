import React from 'react';
import { SidebarLayout } from '../../components/ui/Layouts';
import { adminLinks } from './Dashboard';
import { useUsers } from '../../hooks/useUsers';
import { supabase } from '../../lib/supabase';

export const AdminUsers = () => {
  const { profiles, loading, refetch } = useUsers();

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      const { error } = await supabase.from('profiles').delete().eq('id', userId);
      if (error) alert('Error removing user: ' + error.message);
      else {
        alert('User removed successfully');
        refetch();
      }
    }
  };

  return (
    <div>
      <SidebarLayout title="User Management" links={adminLinks}>
        <div className="users-container fade-in">
          <div className="table-container">
            {loading ? (
              <div className="p-4">Loading users...</div>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Joined Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {profiles.map(user => (
                    <tr key={user.id}>
                      <td>{user.name || user.username}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`badge badge-${user.role}`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </td>
                      <td>{new Date(user.created_at).toLocaleDateString()}</td>
                      <td>
                        <button 
                          className="btn btn-outline text-danger" 
                          style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                  {profiles.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center p-4">No users found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </SidebarLayout>
      <style>{`
        .users-container {
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
        .text-danger { border-color: var(--status-danger); color: var(--status-danger); }
        .text-danger:hover { background: rgba(239, 68, 68, 0.1) !important; }
      `}</style>
    </div>
  );
};
