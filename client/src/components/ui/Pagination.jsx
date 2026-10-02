import React from 'react';
import { clsx } from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  totalItems,
  pageSize,
  onPageChange,
  className,
}) => {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  return (
    <div
      className={clsx(
        'flex flex-col sm:flex-row items-center justify-between gap-4 py-4 font-body',
        className
      )}
    >
      {totalItems !== undefined && (
        <p className="font-mono text-xs text-ink-3 dark:text-dark-type/60">
          Showing{' '}
          <span className="font-semibold text-ink dark:text-dark-type">
            {pageSize ? (currentPage - 1) * pageSize + 1 : currentPage}
          </span>{' '}
          to{' '}
          <span className="font-semibold text-ink dark:text-dark-type">
            {pageSize ? Math.min(currentPage * pageSize, totalItems) : totalItems}
          </span>{' '}
          of{' '}
          <span className="font-semibold text-ink dark:text-dark-type">{totalItems}</span> entries
        </p>
      )}

      <div className="inline-flex items-center gap-1 rounded-[2px] border border-rule bg-paper p-1 dark:border-dark-rule dark:bg-dark-surface">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="inline-flex h-8 w-8 items-center justify-center rounded-[2px] text-ink transition hover:bg-field disabled:cursor-not-allowed disabled:opacity-30 dark:text-dark-type dark:hover:bg-dark-field"
          aria-label="Previous Page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {pages.map((p, idx) =>
          p === '...' ? (
            <span
              key={`ellipsis-${idx}`}
              className="px-2 font-mono text-xs text-ink-3 dark:text-dark-type/40"
            >
              ...
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              className={clsx(
                'inline-flex h-8 min-w-[2rem] items-center justify-center rounded-[2px] px-2 font-mono text-xs font-semibold transition',
                currentPage === p
                  ? 'bg-ink text-paper shadow-sm dark:bg-dark-type dark:text-dark-bg'
                  : 'text-ink hover:bg-field dark:text-dark-type dark:hover:bg-dark-field'
              )}
            >
              {p}
            </button>
          )
        )}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="inline-flex h-8 w-8 items-center justify-center rounded-[2px] text-ink transition hover:bg-field disabled:cursor-not-allowed disabled:opacity-30 dark:text-dark-type dark:hover:bg-dark-field"
          aria-label="Next Page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
