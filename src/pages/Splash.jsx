import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import buffmeupLogo from '../assets/buffmeuplogo.webp';

export const Splash = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        if (!user || !profile) {
          // If no user, or user exists but profile failed to fetch, go to login
          navigate('/login');
        } else {
          const userRole = profile.role || 'client';
          if (userRole === 'admin') navigate('/admin');
          else if (userRole === 'trainer') navigate('/trainer');
          else navigate('/client');
        }
      }, 500); // 500ms splash screen delay
    }
  }, [user, profile, loading, navigate]);

  return (
    <div className="splash-container">
      <div className="splash-content fade-in">
        <img src={buffmeupLogo} alt="BUFFMEUP" className="splash-logo" />
        <div className="loader"></div>
      </div>
      <style>{`
        .splash-container {
          height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--bg-sidebar); /* Darker background for splash */
          color: #fff;
        }
        .splash-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }
        .splash-logo {
          width: 200px;
          height: auto;
          max-width: 80vw;
        }
        .loader {
          width: 48px;
          height: 48px;
          border: 4px solid rgba(0, 210, 255, 0.2);
          border-left-color: var(--accent-primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
