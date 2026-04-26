import React, { useState } from 'react';
import { SidebarLayout } from '../../components/ui/Layouts';
import { trainerLinks } from './Dashboard';
import { Button } from '../../components/ui/Button';

export const TrainerPlans = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <SidebarLayout title="Workout Plans" links={trainerLinks}>
        <div className="bg-card border rounded-md overflow-hidden fade-in">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl">Your Templates</h2>
            <Button onClick={() => setShowModal(true)}>Create New Plan</Button>
          </div>
          <div className="p-4 text-center text-secondary">
            You haven't created any workout templates yet.
          </div>
        </div>

        {showModal && (
          <div className="modal-overlay fade-in" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <h2 className="text-xl mb-4">Create New Plan</h2>
              <form className="flex flex-col gap-4">
                <input type="text" placeholder="Plan Name (e.g. Summer Shred)" className="modal-input" />
                <textarea placeholder="Description" className="modal-input" rows={3}></textarea>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
                  <Button onClick={() => { alert('Plan Created!'); setShowModal(false); }}>Save Plan</Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </SidebarLayout>
      <style>{`
        .bg-card { background-color: var(--bg-card); }
        .border { border: 1px solid var(--border-color); }
        .border-b { border-bottom: 1px solid var(--border-color); }
        .rounded-md { border-radius: var(--radius-card); }
        .overflow-hidden { overflow: hidden; }
        .p-4 { padding: 1.5rem; }
        .flex { display: flex; }
        .flex-col { flex-direction: column; }
        .gap-2 { gap: 0.5rem; }
        .gap-4 { gap: 1rem; }
        .justify-between { justify-content: space-between; }
        .justify-end { justify-content: flex-end; }
        .items-center { align-items: center; }
        .text-xl { font-size: 1.25rem; font-weight: 600; margin: 0; }
        .mb-4 { margin-bottom: 1.5rem; }
        .mt-4 { margin-top: 1rem; }
        .text-center { text-align: center; }
        .text-secondary { color: var(--text-secondary); }
        
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal-content {
          background-color: var(--bg-card);
          padding: 2rem;
          border-radius: var(--radius-card);
          width: 100%;
          max-width: 500px;
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-md);
        }
        .modal-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-btn);
          border: 1px solid var(--border-color);
          background-color: var(--bg-sidebar);
          color: var(--text-primary);
          outline: none;
        }
        .modal-input:focus {
          border-color: var(--accent-primary);
        }
      `}</style>
    </div>
  );
};
