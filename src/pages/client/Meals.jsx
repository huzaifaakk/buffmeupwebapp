import React from 'react';
import { ClientLayout } from './Sessions';

export const ClientMeals = () => {
  return (
    <ClientLayout activePath="/client/meals">
      <div className="bg-card border rounded-md p-6 max-w-4xl mx-auto text-center fade-in">
        <h2 className="text-2xl mb-4">Meal Suggestions</h2>
        <p className="text-secondary mb-8">AI-powered meal suggestions based on your profile and goals.</p>
        
        <div className="grid-meals">
          <div className="meal-card">
            <h3>Breakfast</h3>
            <p>Oatmeal with berries and protein shake.</p>
            <span className="calories">450 kcal</span>
          </div>
          <div className="meal-card">
            <h3>Lunch</h3>
            <p>Grilled chicken breast with quinoa and broccoli.</p>
            <span className="calories">600 kcal</span>
          </div>
          <div className="meal-card">
            <h3>Dinner</h3>
            <p>Baked salmon with sweet potato and asparagus.</p>
            <span className="calories">550 kcal</span>
          </div>
        </div>
      </div>
      <style>{`
        .bg-card { background-color: var(--bg-card); }
        .border { border: 1px solid var(--border-color); }
        .rounded-md { border-radius: var(--radius-card); }
        .p-6 { padding: 2rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mb-8 { margin-bottom: 2rem; }
        .max-w-4xl { max-width: 800px; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .text-center { text-align: center; }
        .text-2xl { font-size: 1.5rem; font-weight: 600; margin: 0; }
        .text-secondary { color: var(--text-secondary); }
        
        .grid-meals {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
        }
        
        .meal-card {
          padding: 1.5rem;
          border-radius: var(--radius-btn);
          background-color: var(--bg-color);
          border: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          align-items: center;
        }
        
        .calories {
          margin-top: 0.5rem;
          font-weight: bold;
          color: var(--accent-primary);
        }
      `}</style>
    </ClientLayout>
  );
};
