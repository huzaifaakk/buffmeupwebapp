import React from 'react';
import { SidebarLayout } from '../../components/ui/Layouts';
import { trainerLinks } from './Dashboard';
import { useAuth } from '../../context/AuthContext';
import { useTrainerClients } from '../../hooks/useUsers';
import { useNavigate } from 'react-router-dom';

export const TrainerClients = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { clients, loading } = useTrainerClients(profile?.id);

  return (
    <div>
      <SidebarLayout title="My Clients" links={trainerLinks}>
        <div className="clients-container fade-in">
          {loading ? (
            <div className="p-4">Loading clients...</div>
          ) : clients.length > 0 ? (
            <div className="clients-grid">
              {clients.map(client => (
                <div key={client.id} className="client-card">
                  <div className="client-header">
                    <div className="client-avatar">
                      {client.profiles?.avatar_url ? (
                        <img src={client.profiles.avatar_url} alt="avatar" />
                      ) : (
                        <div className="avatar-placeholder">
                          {client.profiles?.name?.charAt(0) || client.profiles?.username?.charAt(0) || 'C'}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="client-name">{client.profiles?.name || client.profiles?.username}</h3>
                      <p className="client-username">@{client.profiles?.username}</p>
                    </div>
                  </div>
                  <div className="client-stats">
                    <div className="stat">
                      <span className="stat-label">Joined</span>
                      <span className="stat-val">{new Date(client.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="client-actions">
                    <button 
                      className="btn btn-outline w-full" 
                      style={{ padding: '0.5rem', fontSize: '0.875rem' }}
                      onClick={() => navigate(`/trainer/profile/${client.profiles?.username}`)}
                    >
                      View Profile
                    </button>
                    <button 
                      className="btn btn-primary w-full" 
                      style={{ padding: '0.5rem', fontSize: '0.875rem' }}
                      onClick={() => navigate('/trainer/messages')}
                    >
                      Message
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="p-4 text-center text-secondary border rounded-md">
                You don't have any assigned clients yet.
              </div>
            </div>
          )}
        </div>
      </SidebarLayout>
      <style>{`
        .clients-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        .client-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-card);
          padding: 1.5rem;
          box-shadow: var(--shadow-sm);
        }
        .client-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .client-avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          overflow: hidden;
        }
        .client-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .avatar-placeholder {
          width: 100%;
          height: 100%;
          background-color: var(--accent-primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 1.5rem;
        }
        .client-name {
          font-size: 1.125rem;
          margin: 0 0 0.25rem 0;
        }
        .client-username {
          color: var(--text-secondary);
          font-size: 0.875rem;
          margin: 0;
        }
        .client-stats {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          padding: 1rem 0;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }
        .stat {
          display: flex;
          flex-direction: column;
        }
        .stat-label {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
        .stat-val {
          font-weight: 500;
        }
        .client-actions {
          display: flex;
          gap: 0.5rem;
        }
        .p-4 { padding: 1rem; }
        .text-center { text-align: center; }
        .text-secondary { color: var(--text-secondary); }
        .border { border: 1px solid var(--border-color); }
        .rounded-md { border-radius: var(--radius-card); }
        .w-full { width: 100%; }
      `}</style>
    </div>
  );
};
