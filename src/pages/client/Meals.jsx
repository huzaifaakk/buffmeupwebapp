import React from 'react';
import { ClientLayout } from './Sessions';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export const ClientMeals = () => {
  const { profile } = useAuth();
  
  const hasPhysicalData = profile?.age && profile?.height && profile?.weight;
  
  let targetCalories = 2000; // Default
  if (hasPhysicalData) {
    const weightKg = profile.weight / 2.205; // lbs to kg
    const heightCm = profile.height;
    const age = profile.age;
    
    // Generic BMR estimation using Mifflin-St Jeor without gender
    const bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age);
    // Multiply by generic activity factor 1.55 for TDEE
    targetCalories = Math.round(bmr * 1.55);
  }

  // Calculate generic meal split (30% breakfast, 40% lunch, 30% dinner)
  const breakfastCals = Math.round(targetCalories * 0.3);
  const lunchCals = Math.round(targetCalories * 0.4);
  const dinnerCals = Math.round(targetCalories * 0.3);

  return (
    <ClientLayout activePath="/client/meals">
      <div className="bg-card border rounded-md p-6 max-w-4xl mx-auto text-center fade-in">
        <h2 className="text-2xl mb-4">Meal Suggestions</h2>
        
        {!hasPhysicalData ? (
          <div className="incomplete-profile-warning">
            <p className="text-secondary mb-4">We need a bit more information to generate personalized meal plans for you.</p>
            <p className="mb-8 font-medium">Please update your Age, Height, and Weight in your profile.</p>
            <Link to="/client/profile" className="btn-primary">Update Profile</Link>
          </div>
        ) : (
          <>
            <p className="text-secondary mb-2">AI-powered meal suggestions based on your profile.</p>
            <div className="daily-target mb-8">
              <h3>Estimated Daily Target</h3>
              <div className="target-value">{targetCalories} kcal</div>
            </div>
            
            <div className="grid-meals">
              <div className="meal-card">
                <h3>Breakfast</h3>
                <p>Oatmeal with berries and a protein shake.</p>
                <span className="calories">{breakfastCals} kcal</span>
              </div>
              <div className="meal-card">
                <h3>Lunch</h3>
                <p>Grilled chicken breast with quinoa and broccoli.</p>
                <span className="calories">{lunchCals} kcal</span>
              </div>
              <div className="meal-card">
                <h3>Dinner</h3>
                <p>Baked salmon with sweet potato and asparagus.</p>
                <span className="calories">{dinnerCals} kcal</span>
              </div>
            </div>
          </>
        )}
      </div>
      <style>{`
        .bg-card { background-color: var(--bg-card); }
        .border { border: 1px solid var(--border-color); }
        .rounded-md { border-radius: var(--radius-card); }
        .p-6 { padding: 2rem; }
        .mb-2 { margin-bottom: 0.5rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mb-8 { margin-bottom: 2rem; }
        .max-w-4xl { max-width: 800px; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .text-center { text-align: center; }
        .text-2xl { font-size: 1.5rem; font-weight: 600; margin: 0; }
        .text-secondary { color: var(--text-secondary); }
        .font-medium { font-weight: 500; }
        
        .incomplete-profile-warning {
          padding: 3rem 2rem;
          background-color: var(--bg-color);
          border-radius: var(--radius-card);
          border: 1px dashed var(--border-color);
        }
        
        .btn-primary {
          display: inline-block;
          background-color: var(--accent-primary);
          color: var(--bg-color);
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-btn);
          font-weight: 600;
          transition: background-color 0.2s;
        }
        .btn-primary:hover {
          background-color: var(--accent-primary-hover);
          text-decoration: none;
          color: var(--bg-color);
        }
        
        .daily-target {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem 2rem;
          background-color: rgba(0, 210, 255, 0.1);
          border-radius: var(--radius-card);
          border: 1px solid rgba(0, 210, 255, 0.2);
        }
        .daily-target h3 { font-size: 0.875rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px; }
        .target-value { font-size: 2rem; font-weight: 700; color: var(--accent-primary); font-family: var(--font-display); }

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
          transition: transform 0.2s;
        }
        .meal-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent-primary);
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
