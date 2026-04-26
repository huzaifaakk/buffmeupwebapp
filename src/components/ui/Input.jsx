import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const Input = ({ label, type = 'text', ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="input-group">
      {label && <label className="input-label">{label}</label>}
      <div className="input-wrapper">
        <input
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          className="input-field"
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            className="input-eye-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      <style>{`
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          width: 100%;
          margin-bottom: 1rem;
        }
        .input-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary);
        }
        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .input-field {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-btn);
          border: 1px solid var(--border-color);
          background-color: var(--bg-sidebar); /* Darker background for contrast */
          color: var(--text-primary);
          outline: none;
          transition: border-color 0.2s;
        }
        .input-field:focus {
          border-color: var(--accent-primary);
        }
        .input-eye-btn {
          position: absolute;
          right: 1rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .input-eye-btn:hover {
          color: var(--text-primary);
        }
      `}</style>
    </div>
  );
};
