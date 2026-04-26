import React from 'react';
import { ClientLayout } from './Sessions';
import { Activity, Flame, Clock, Scale, Trophy, CheckCircle2 } from 'lucide-react';

export const ClientProgress = () => {
  return (
    <ClientLayout activePath="/client/progress">
      <div className="progress-container">
        <header className="progress-header fade-in">
          <h1>Progress</h1>
          <p className="text-secondary">Track your fitness journey</p>
        </header>

        <section className="weekly-summary fade-in">
          <div className="summary-card">
            <div className="summary-item">
              <span className="summary-value">5</span>
              <span className="summary-label">Workouts</span>
            </div>
            <div className="summary-item">
              <span className="summary-value">2,250</span>
              <span className="summary-label">Calories</span>
            </div>
            <div className="summary-item">
              <span className="summary-value">315</span>
              <span className="summary-label">Minutes</span>
            </div>
            <div className="summary-title">This Week</div>
          </div>
        </section>

        <section className="progress-charts fade-in">
          <h2>Progress Charts</h2>
          <div className="charts-grid">
            <div className="chart-card">
              <div className="chart-icon blue"><Activity size={24} /></div>
              <div className="chart-info">
                <h3>Weight Progress</h3>
                <p>Current: 75kg</p>
              </div>
            </div>
            <div className="chart-card">
              <div className="chart-icon orange"><Flame size={24} /></div>
              <div className="chart-info">
                <h3>Workout Streak</h3>
                <p>7 days</p>
              </div>
            </div>
            <div className="chart-card">
              <div className="chart-icon red"><Flame size={24} /></div>
              <div className="chart-info">
                <h3>Calories Burned</h3>
                <p>This month: 15,200</p>
              </div>
            </div>
            <div className="chart-card">
              <div className="chart-icon green"><Clock size={24} /></div>
              <div className="chart-info">
                <h3>Workout Time</h3>
                <p>This month: 25h</p>
              </div>
            </div>
          </div>
        </section>

        <section className="achievements fade-in">
          <h2>Achievements</h2>
          <div className="achievements-list">
            <div className="achievement-item">
              <div className="achievement-icon gold"><Trophy size={24} /></div>
              <div className="achievement-info">
                <h3>First Workout</h3>
                <p>Completed your first workout!</p>
              </div>
              <div className="achievement-status"><CheckCircle2 className="checked" /></div>
            </div>
            <div className="achievement-item">
              <div className="achievement-icon blue"><Clock size={24} /></div>
              <div className="achievement-info">
                <h3>Week Warrior</h3>
                <p>Completed 7 workouts in a week</p>
              </div>
              <div className="achievement-status"><CheckCircle2 className="checked" /></div>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .progress-container {
          max-width: 800px;
          margin: 0 auto;
        }
        .progress-header {
          margin-bottom: 2rem;
        }
        .progress-header h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }
        .weekly-summary {
          margin-bottom: 3rem;
        }
        .summary-card {
          background: linear-gradient(135deg, #42d392 0%, #647eff 100%);
          border-radius: var(--radius-card);
          padding: 2.5rem;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          color: white;
          position: relative;
          box-shadow: 0 10px 30px rgba(100, 126, 255, 0.3);
        }
        .summary-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .summary-value {
          font-size: 2rem;
          font-weight: 700;
        }
        .summary-label {
          font-size: 0.875rem;
          opacity: 0.8;
        }
        .summary-title {
          position: absolute;
          top: 1.5rem;
          left: 1.5rem;
          font-weight: 600;
          font-size: 1.1rem;
        }
        .progress-charts h2, .achievements h2 {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }
        .charts-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }
        .chart-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-card);
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          transition: transform 0.2s;
        }
        .chart-card:hover {
          transform: translateY(-4px);
        }
        .chart-icon {
          padding: 1rem;
          border-radius: var(--radius-btn);
          display: flex;
        }
        .chart-icon.blue { background-color: rgba(59, 130, 246, 0.1); color: #3b82f6; }
        .chart-icon.orange { background-color: rgba(249, 115, 22, 0.1); color: #f97316; }
        .chart-icon.red { background-color: rgba(239, 68, 68, 0.1); color: #ef4444; }
        .chart-icon.green { background-color: rgba(34, 197, 94, 0.1); color: #22c55e; }
        
        .chart-info h3 { font-size: 1rem; margin: 0 0 0.25rem 0; }
        .chart-info p { font-size: 0.875rem; color: var(--text-secondary); margin: 0; }
        
        .achievements-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .achievement-item {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-card);
          padding: 1.25rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .achievement-icon {
          padding: 0.75rem;
          border-radius: var(--radius-btn);
        }
        .achievement-icon.gold { background-color: rgba(234, 179, 8, 0.1); color: #eab308; }
        .achievement-icon.blue { background-color: rgba(59, 130, 246, 0.1); color: #3b82f6; }
        
        .achievement-info { flex: 1; }
        .achievement-info h3 { font-size: 1rem; margin: 0 0 0.25rem 0; }
        .achievement-info p { font-size: 0.875rem; color: var(--text-secondary); margin: 0; }
        
        .achievement-status .checked {
          color: #3b82f6;
        }

        @media (max-width: 600px) {
          .charts-grid { grid-template-columns: 1fr; }
          .summary-card { padding: 2rem 1rem; }
        }
      `}</style>
    </ClientLayout>
  );
};
