import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

export function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  className = '' 
}) {
  if (totalPages <= 1) return null;

  const pages = [];
  
  // Logic to show limited pages with ellipses
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = startPage + maxVisiblePages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className={`flex items-center justify-center space-x-2 my-6 ${className}`}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-secondary)] hover:text-[var(--primary)] hover:border-[var(--primary)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all duration-300 font-medium ${
              currentPage === 1
                ? 'bg-[var(--primary)] border-[var(--primary)] text-white shadow-lg shadow-[var(--primary-glow)]'
                : 'border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-secondary)] hover:text-[var(--primary)] hover:border-[var(--primary)]'
            }`}
          >
            1
          </button>
          {startPage > 2 && (
            <div className="w-10 h-10 flex items-center justify-center text-[var(--text-tertiary)]">
              <MoreHorizontal className="w-5 h-5" />
            </div>
          )}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all duration-300 font-medium ${
            currentPage === page
              ? 'bg-[var(--primary)] border-[var(--primary)] text-[var(--bg-color)] shadow-lg shadow-[var(--primary-glow)]'
              : 'border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-secondary)] hover:text-[var(--primary)] hover:border-[var(--primary)]'
          }`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <div className="w-10 h-10 flex items-center justify-center text-[var(--text-tertiary)]">
              <MoreHorizontal className="w-5 h-5" />
            </div>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all duration-300 font-medium ${
              currentPage === totalPages
                ? 'bg-[var(--primary)] border-[var(--primary)] text-white shadow-lg shadow-[var(--primary-glow)]'
                : 'border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-secondary)] hover:text-[var(--primary)] hover:border-[var(--primary)]'
            }`}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-secondary)] hover:text-[var(--primary)] hover:border-[var(--primary)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
