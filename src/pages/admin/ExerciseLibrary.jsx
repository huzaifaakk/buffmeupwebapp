import React from 'react';
import { SidebarLayout } from '../../components/ui/Layouts';
import { adminLinks } from './Dashboard';
import { Button } from '../../components/ui/Button';

export const AdminExerciseLibrary = () => {
  return (
    <div>
      <SidebarLayout title="Exercise Library" links={adminLinks}>
        <div className="bg-card border rounded-md overflow-hidden fade-in">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl">Global Exercises</h2>
            <Button>Add Exercise</Button>
          </div>
          <div className="p-4">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Exercise Name</th>
                  <th>Muscle Group</th>
                  <th>Equipment</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Barbell Squat</td>
                  <td>Legs</td>
                  <td>Barbell</td>
                  <td><button className="btn-text">Edit</button></td>
                </tr>
                <tr>
                  <td>Bench Press</td>
                  <td>Chest</td>
                  <td>Barbell</td>
                  <td><button className="btn-text">Edit</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </SidebarLayout>
      <style>{`
        .bg-card { background-color: var(--bg-card); }
        .border { border: 1px solid var(--border-color); }
        .border-b { border-bottom: 1px solid var(--border-color); }
        .rounded-md { border-radius: var(--radius-card); }
        .overflow-hidden { overflow: hidden; }
        .p-4 { padding: 1.5rem; }
        .flex { display: flex; }
        .justify-between { justify-content: space-between; }
        .items-center { align-items: center; }
        .text-xl { font-size: 1.25rem; font-weight: 600; margin: 0; }
        .data-table { width: 100%; border-collapse: collapse; }
        .data-table th, .data-table td { padding: 1rem 1.5rem; text-align: left; border-bottom: 1px solid var(--border-color); }
        .data-table th { background-color: rgba(0, 0, 0, 0.2); color: var(--text-secondary); font-weight: 500; font-size: 0.875rem; }
        .btn-text { color: var(--accent-primary); background: none; border: none; cursor: pointer; }
        .btn-text:hover { text-decoration: underline; }
      `}</style>
    </div>
  );
};
