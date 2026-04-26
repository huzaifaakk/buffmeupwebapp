import React from 'react';

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  return (
    <>
      <button className={`btn btn-${variant} ${className}`} {...props}>
        {children}
      </button>
      <style>{`
        .btn {
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-btn);
          font-weight: 600;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .btn-primary {
          background-color: var(--accent-primary);
          color: #fff;
        }
        .btn-primary:hover:not(:disabled) {
          background-color: var(--accent-primary-hover);
          transform: translateY(-1px);
        }
        .btn-outline {
          background-color: transparent;
          border: 1px solid var(--accent-primary);
          color: var(--accent-primary);
        }
        .btn-outline:hover:not(:disabled) {
          background-color: rgba(0, 210, 255, 0.1);
        }
        .btn-danger {
          background-color: var(--status-danger);
          color: #fff;
        }
      `}</style>
    </>
  );
};
