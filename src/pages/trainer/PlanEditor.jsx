import React from 'react';
import { SidebarLayout } from '../../components/ui/Layouts';
import { trainerLinks } from './Dashboard';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export const TrainerPlanEditor = () => {
  return (
    <div>
      <SidebarLayout title="Edit Plan" links={trainerLinks}>
        <div className="bg-card border rounded-md p-4 fade-in">
          <Input label="Plan Name" defaultValue="Hypertrophy Block 1" />
          <Input label="Description" defaultValue="8 week block focusing on volume." />
          
          <h3 className="text-xl mt-6 mb-4">Exercises</h3>
          <div className="border rounded-md p-4 mb-4 bg-sidebar">
            <p className="text-secondary mb-2">Day 1: Lower Body</p>
            <div className="flex justify-between items-center bg-card p-2 border rounded-md mb-2">
              <span>Barbell Squat (4x10)</span>
              <button className="btn-text text-danger">Remove</button>
            </div>
            <Button className="mt-2 text-sm">Add Exercise</Button>
          </div>
          
          <div className="mt-6">
            <Button>Save Plan</Button>
          </div>
        </div>
      </SidebarLayout>
      <style>{`
        .bg-card { background-color: var(--bg-card); }
        .bg-sidebar { background-color: var(--bg-color); }
        .border { border: 1px solid var(--border-color); }
        .rounded-md { border-radius: var(--radius-card); }
        .p-4 { padding: 1.5rem; }
        .p-2 { padding: 0.5rem 1rem; }
        .mt-6 { margin-top: 1.5rem; }
        .mt-2 { margin-top: 0.5rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mb-2 { margin-bottom: 0.5rem; }
        .text-xl { font-size: 1.25rem; font-weight: 600; margin: 0; }
        .text-sm { font-size: 0.875rem; padding: 0.25rem 0.75rem; }
        .text-secondary { color: var(--text-secondary); }
        .flex { display: flex; }
        .justify-between { justify-content: space-between; }
        .items-center { align-items: center; }
        .btn-text { background: none; border: none; cursor: pointer; }
        .text-danger { color: var(--status-danger); }
      `}</style>
    </div>
  );
};
