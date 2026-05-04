import React from 'react';
import { ThemeToggle } from '../../components/ui/ThemeToggle';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import buffmeupLogo from '../../assets/buffmeuplogo.webp';

export const ClientLayout = ({ children, activePath, fullWidth = false }) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="client-layout">
      <nav className="top-nav">
        <img src={buffmeupLogo} alt="BUFFMEUP" className="nav-logo" />
        <div className="nav-links items-center">
          <a href="/client" className={activePath === '/client' ? 'active' : ''}>Dashboard</a>
          <a href="/client/sessions" className={activePath === '/client/sessions' ? 'active' : ''}>Sessions</a>
          <a href="/client/progress" className={activePath === '/client/progress' ? 'active' : ''}>Progress</a>
          <a href="/client/feed" className={activePath === '/client/feed' ? 'active' : ''}>Feed</a>
          <a href="/client/trainer" className={activePath === '/client/trainer' ? 'active' : ''}>Trainer</a>
          <a href="/client/exercises" className={activePath === '/client/exercises' ? 'active' : ''}>Exercises</a>
          <a href="/client/nutrition" className={activePath === '/client/nutrition' ? 'active' : ''}>Nutrition</a>
          <a href="/client/pose-analysis" className={activePath === '/client/pose-analysis' ? 'active' : ''}>Pose AI</a>
          <a href="/client/goals" className={activePath === '/client/goals' ? 'active' : ''}>Goals</a>
          <a href="/client/profile" className={activePath === '/client/profile' ? 'active' : ''}>Profile</a>
          <ThemeToggle />
          <button onClick={handleLogout} className="btn-logout-client" title="Logout">
            <LogOut size={20} />
          </button>
        </div>
      </nav>
      <main className={`client-main fade-in ${fullWidth ? 'full-width' : ''}`}>
        {children}
      </main>
      <style>{`
        .client-layout { min-height: 100vh; background-color: var(--bg-color); }
        .top-nav { display: flex; justify-content: space-between; align-items: center; padding: 1rem 2rem; background-color: var(--bg-card); border-bottom: 1px solid var(--border-color); position: sticky; top: 0; z-index: 10; }
        .nav-logo { height: 40px; width: auto; }
        .nav-links { display: flex; gap: 1.5rem; flex-wrap: wrap; }
        .nav-links a { color: var(--text-secondary); font-weight: 500; transition: color 0.2s; text-decoration: none; }
        .nav-links a:hover, .nav-links a.active { color: var(--accent-primary); }
        .btn-logout-client { background: transparent; border: none; color: var(--text-secondary); cursor: pointer; display: flex; align-items: center; padding: 0.5rem; transition: color 0.2s; }
        .btn-logout-client:hover { color: var(--status-danger); }
        .client-main { max-width: 1200px; margin: 0 auto; padding: 2rem; transition: max-width 0.3s ease; }
        .client-main.full-width { max-width: 1800px; width: 100%; padding: 2rem 4%; }
      `}</style>
    </div>
  );
};

export const ClientSessions = () => {
  return (
    <ClientLayout activePath="/client/sessions">
      <div className="bg-card border rounded-md p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl mb-6">Session History</h2>
        <div className="p-4 text-center text-secondary border rounded-md bg-sidebar">
          You haven't completed any tracked sessions yet.
        </div>
      </div>
      <style>{`
        .bg-card { background-color: var(--bg-card); }
        .bg-sidebar { background-color: var(--bg-color); }
        .border { border: 1px solid var(--border-color); }
        .rounded-md { border-radius: var(--radius-card); }
        .p-6 { padding: 2rem; }
        .p-4 { padding: 1.5rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .max-w-4xl { max-width: 800px; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .text-2xl { font-size: 1.5rem; font-weight: 600; margin: 0; }
        .text-center { text-align: center; }
        .text-secondary { color: var(--text-secondary); }
      `}</style>
    </ClientLayout>
  );
};
