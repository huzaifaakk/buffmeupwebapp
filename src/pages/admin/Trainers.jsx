import React from 'react';
import { SidebarLayout } from '../../components/ui/Layouts';
import { adminLinks } from './Dashboard';
import { useUsers } from '../../hooks/useUsers';

export const AdminTrainers = () => {
  const { trainers, loading } = useUsers();

  return (
    <div>
      <SidebarLayout title="Trainer Management" links={adminLinks}>
        <div className="bg-card border rounded-md overflow-hidden fade-in">
          <div className="p-4 border-b">
            <h2 className="text-xl">Approved Trainers</h2>
          </div>
          <div className="table-container">
            {loading ? (
              <div className="p-4">Loading trainers...</div>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Trainer</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {trainers.map(trainer => (
                    <tr key={trainer.id}>
                      <td>{trainer.profiles?.name || trainer.profiles?.username}</td>
                      <td>{trainer.profiles?.email}</td>
                      <td><span className="badge badge-success">Active</span></td>
                      <td>
                        <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>View</button>
                      </td>
                    </tr>
                  ))}
                  {trainers.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center p-4">No trainers found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
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
        .text-xl { font-size: 1.25rem; font-weight: 600; margin: 0; }
        
        .data-table { width: 100%; border-collapse: collapse; }
        .data-table th, .data-table td { padding: 1rem 1.5rem; text-align: left; border-bottom: 1px solid var(--border-color); }
        .data-table th { background-color: rgba(0, 0, 0, 0.2); color: var(--text-secondary); font-weight: 500; font-size: 0.875rem; }
        
        .badge { padding: 0.25rem 0.75rem; border-radius: var(--radius-badge); font-size: 0.75rem; font-weight: 600; }
        .badge-success { background: rgba(34, 197, 94, 0.1); color: var(--status-success); }
      `}</style>
    </div>
  );
};
