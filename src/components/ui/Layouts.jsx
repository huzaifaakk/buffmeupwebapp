import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import buffmeupLogo from '../../assets/buffmeuplogo.webp';

export const SidebarLayout = ({ children, title, links }) => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="layout-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src={buffmeupLogo} alt="BUFFMEUP" className="sidebar-logo" />
        </div>
        <nav className="sidebar-nav">
          {links.map((link, idx) => (
            <a key={idx} href={link.path} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>
      <main className="main-content">
        <header className="topbar">
          <h1>{title}</h1>
          <div className="user-info flex items-center gap-4">
            <ThemeToggle />
            <span>{user?.email}</span>
          </div>
        </header>
        <div className="page-content">
          {children}
        </div>
      </main>
      <style>{`
        .layout-container {
          display: flex;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
        }
        .sidebar {
          width: 240px;
          background-color: var(--bg-sidebar);
          display: flex;
          flex-direction: column;
          border-right: 1px solid var(--border-color);
        }
        .sidebar-header {
          padding: 2rem 1.5rem;
        }
        .sidebar-logo {
          width: 100%;
          height: auto;
          max-width: 180px;
        }
        .sidebar-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 0 1rem;
        }
        .nav-link {
          padding: 0.75rem 1rem;
          border-radius: var(--radius-btn);
          color: var(--text-secondary);
          transition: all 0.2s;
        }
        .nav-link:hover {
          background-color: rgba(0, 210, 255, 0.1);
          color: var(--accent-primary);
          text-decoration: none;
        }
        .sidebar-footer {
          padding: 1.5rem;
          border-top: 1px solid var(--border-color);
        }
        .logout-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          width: 100%;
          padding: 0.5rem;
          transition: color 0.2s;
        }
        .logout-btn:hover {
          color: var(--status-danger);
        }
        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          background-color: var(--bg-color);
          overflow-y: auto;
        }
        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          background-color: var(--bg-card);
          border-bottom: 1px solid var(--border-color);
        }
        .user-info {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }
        .page-content {
          padding: 2rem;
          flex: 1;
        }
      `}</style>
    </div>
  );
};
