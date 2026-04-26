import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle = ({ className = '' }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme} 
      className={`theme-toggle-btn ${className}`}
      aria-label="Toggle dark mode"
      title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      <style>{`
        .theme-toggle-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          color: var(--text-secondary);
          transition: all 0.2s;
        }
        .theme-toggle-btn:hover {
          background-color: rgba(0, 210, 255, 0.1);
          color: var(--accent-primary);
        }
      `}</style>
    </button>
  );
};
