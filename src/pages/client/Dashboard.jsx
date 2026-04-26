import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Activity, Zap, Trophy, TrendingUp, LogOut } from 'lucide-react';

import { ClientLayout } from './Sessions';

export const ClientDashboard = () => {
  const { profile } = useAuth();

  return (
    <ClientLayout activePath="/client">

      <main className="client-main">
        <div className="greeting-section fade-in">
          <h1>Welcome back, {profile?.name?.split(' ')[0] || 'Athlete'}</h1>
          <p>You have completed 3 sessions this week. Keep it up!</p>
        </div>

        <div className="dashboard-grid fade-in">
          <div className="stat-card">
            <div className="stat-icon"><Activity /></div>
            <div className="stat-info">
              <p className="stat-label">Sessions This Week</p>
              <h3 className="stat-value">3</h3>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon"><Zap /></div>
            <div className="stat-info">
              <p className="stat-label">Total Reps This Week</p>
              <h3 className="stat-value">450</h3>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon"><TrendingUp /></div>
            <div className="stat-info">
              <p className="stat-label">Current Streak</p>
              <h3 className="stat-value">4 Days</h3>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon"><Trophy /></div>
            <div className="stat-info">
              <p className="stat-label">Personal Best</p>
              <h3 className="stat-value">225 lbs</h3>
            </div>
          </div>
        </div>

        <div className="split-view fade-in">
          <div className="plan-card">
            <h2>Active Workout Plan</h2>
            <div className="plan-details">
              <h3>Hypertrophy Phase 1</h3>
              <p>By Trainer: Marcus Vance</p>
              <ul className="exercise-list">
                <li>Squats - 4 sets x 10 reps</li>
                <li>Bench Press - 4 sets x 10 reps</li>
                <li>Deadlifts - 3 sets x 8 reps</li>
              </ul>
            </div>
          </div>

          <div className="recent-sessions">
            <h2>Recent Sessions</h2>
            <div className="session-list">
              {[1, 2, 3].map((i) => (
                <div key={i} className="session-item">
                  <div className="session-info">
                    <strong>Upper Body Power</strong>
                    <span className="session-meta">Yesterday • 45 mins</span>
                  </div>
                  <div className="session-reps">
                    120 Reps
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <style>{`
        .client-layout {
          min-height: 100vh;
          background-color: var(--bg-color);
        }
        .top-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background-color: var(--bg-card);
          border-bottom: 1px solid var(--border-color);
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .nav-brand {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.5rem;
          color: var(--accent-primary);
          letter-spacing: 1px;
        }
        .nav-links {
          display: flex;
          gap: 2rem;
        }
        .nav-links a {
          color: var(--text-secondary);
          font-weight: 500;
          transition: color 0.2s;
        }
        .nav-links a:hover, .nav-links a.active {
          color: var(--accent-primary);
          text-decoration: none;
        }
        .nav-profile {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .profile-name {
          font-weight: 500;
        }
        .btn-logout {
          color: var(--text-secondary);
        }
        .btn-logout:hover {
          color: var(--status-danger);
        }
        .client-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }
        .greeting-section {
          margin-bottom: 2rem;
        }
        .greeting-section h1 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }
        .greeting-section p {
          color: var(--text-secondary);
        }
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
        .split-view {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 2rem;
        }
        .plan-card, .recent-sessions {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-card);
          padding: 2rem;
          box-shadow: var(--shadow-sm);
        }
        .plan-card h2, .recent-sessions h2 {
          margin-bottom: 1.5rem;
          font-size: 1.25rem;
        }
        .plan-details h3 {
          margin-bottom: 0.25rem;
        }
        .plan-details p {
          color: var(--text-secondary);
          margin-bottom: 1rem;
          font-size: 0.875rem;
        }
        .exercise-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .exercise-list li {
          padding: 0.75rem;
          background-color: var(--bg-color);
          border-radius: var(--radius-btn);
          font-size: 0.875rem;
        }
        .session-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .session-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid var(--border-color);
        }
        .session-item:last-child {
          border-bottom: none;
        }
        .session-info {
          display: flex;
          flex-direction: column;
        }
        .session-meta {
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin-top: 0.25rem;
        }
        .session-reps {
          font-weight: 600;
          color: var(--accent-primary);
        }
        @media (max-width: 768px) {
          .split-view {
            grid-template-columns: 1fr;
          }
          .nav-links {
            display: none;
          }
        }
      `}</style>
    </ClientLayout>
  );
};
