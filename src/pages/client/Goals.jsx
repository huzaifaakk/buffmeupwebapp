import React, { useState, useEffect } from 'react';
import { ClientLayout } from './Sessions';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { Plus, Target } from 'lucide-react';

export const ClientGoals = () => {
  const { user } = useAuth();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: '', current: '', target: '', unit: 'lbs' });

  const fetchGoals = async () => {
    try {
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setGoals(data || []);
    } catch (err) {
      console.error("Error fetching goals:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchGoals();
  }, [user]);

  const handleAddGoal = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('goals').insert([{
        user_id: user.id,
        title: newGoal.title,
        current_value: parseFloat(newGoal.current),
        target_value: parseFloat(newGoal.target),
        unit: newGoal.unit
      }]);
      
      if (error) throw error;
      setShowModal(false);
      setNewGoal({ title: '', current: '', target: '', unit: 'lbs' });
      fetchGoals();
    } catch (err) {
      console.error("Error adding goal:", err);
      alert("Failed to add goal. Make sure 'goals' table exists.");
    }
  };

  return (
    <ClientLayout activePath="/client/goals">
      <div className="bg-card border rounded-md p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl">Fitness Goals</h2>
          <Button onClick={() => setShowModal(true)}>
            <Plus size={18} className="mr-2" /> Add Goal
          </Button>
        </div>
        
        <div className="goals-grid">
          {loading ? (
            <div className="p-4 text-center">Loading goals...</div>
          ) : goals.length > 0 ? (
            goals.map(goal => {
              const progress = Math.min(100, Math.max(0, (goal.current_value / goal.target_value) * 100));
              return (
                <div key={goal.id} className="goal-card fade-in">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="goal-title">{goal.title}</h3>
                    <Target size={16} className="text-accent-primary" />
                  </div>
                  <div className="goal-progress">
                    <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                  </div>
                  <div className="flex justify-between text-sm text-secondary mt-2">
                    <span>Current: {goal.current_value} {goal.unit}</span>
                    <span>Target: {goal.target_value} {goal.unit}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center border-dashed border-2 rounded-lg text-secondary">
              No goals set yet. Click 'Add Goal' to start tracking!
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content fade-in">
            <h3 className="text-xl mb-4">Set New Goal</h3>
            <form onSubmit={handleAddGoal}>
              <div className="form-group mb-4">
                <label>Goal Title (e.g., Target Weight)</label>
                <input 
                  type="text" 
                  required
                  value={newGoal.title}
                  onChange={e => setNewGoal({...newGoal, title: e.target.value})}
                  className="w-full bg-sidebar border rounded-md p-2 mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="form-group">
                  <label>Current Value</label>
                  <input 
                    type="number" 
                    required
                    value={newGoal.current}
                    onChange={e => setNewGoal({...newGoal, current: e.target.value})}
                    className="w-full bg-sidebar border rounded-md p-2 mt-1"
                  />
                </div>
                <div className="form-group">
                  <label>Target Value</label>
                  <input 
                    type="number" 
                    required
                    value={newGoal.target}
                    onChange={e => setNewGoal({...newGoal, target: e.target.value})}
                    className="w-full bg-sidebar border rounded-md p-2 mt-1"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" className="btn-outline" onClick={() => setShowModal(false)}>Cancel</Button>
                <Button type="submit">Create Goal</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .bg-card { background-color: var(--bg-card); }
        .bg-sidebar { background-color: var(--bg-color); }
        .border { border: 1px solid var(--border-color); }
        .border-2 { border: 2px solid var(--border-color); }
        .rounded-md { border-radius: var(--radius-card); }
        .rounded-lg { border-radius: 1rem; }
        .p-6 { padding: 2rem; }
        .p-8 { padding: 3rem; }
        .p-2 { padding: 0.5rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mb-2 { margin-bottom: 0.5rem; }
        .mt-2 { margin-top: 0.5rem; }
        .mt-1 { margin-top: 0.25rem; }
        .max-w-4xl { max-width: 800px; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .flex { display: flex; }
        .grid { display: grid; }
        .grid-cols-2 { grid-template-columns: 1fr 1fr; }
        .gap-4 { gap: 1rem; }
        .justify-between { justify-content: space-between; }
        .justify-end { justify-content: flex-end; }
        .items-center { align-items: center; }
        .items-start { align-items: flex-start; }
        .text-2xl { font-size: 1.5rem; font-weight: 600; margin: 0; }
        .text-xl { font-size: 1.25rem; font-weight: 600; margin: 0; }
        .text-sm { font-size: 0.875rem; }
        .text-secondary { color: var(--text-secondary); }
        .mr-2 { margin-right: 0.5rem; }
        .w-full { width: 100%; }
        
        .goals-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
        .goal-card { padding: 1.5rem; border: 1px solid var(--border-color); border-radius: var(--radius-btn); background: rgba(255,255,255,0.02); }
        .goal-title { font-size: 1.125rem; margin: 0; }
        .goal-progress { height: 8px; background: var(--bg-color); border-radius: 4px; overflow: hidden; margin-top: 1rem; }
        .progress-bar { height: 100%; background: var(--status-success); border-radius: 4px; }
        
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 100; }
        .modal-content { background: var(--bg-card); padding: 2rem; border-radius: var(--radius-card); width: 100%; max-width: 500px; border: 1px solid var(--border-color); }
        
        label { font-size: 0.875rem; color: var(--text-secondary); }
      `}</style>
    </ClientLayout>
  );
};
