import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const LedgerRow = ({
  number,
  title,
  description,
  documentType,
  onClick,
  className,
}) => {
  return (
    <div
      onClick={onClick}
      className={twMerge(
        clsx(
          'ledger-row flex flex-col md:flex-row md:items-center justify-between gap-3 cursor-pointer group px-4 py-4 border-b border-rule dark:border-dark-rule transition-colors duration-150',
          className
        )
      )}
    >
      <div className="flex items-start md:items-center gap-4">
        {number && (
          <span className="font-mono text-sm font-bold text-brass shrink-0 w-8">
            {number}
          </span>
        )}
        <div>
          <h3 className="font-display text-lg font-bold text-ink dark:text-dark-type group-hover:text-seal transition-colors">
            {title}
          </h3>
          {description && (
            <p className="font-body text-sm text-ink-2 dark:text-dark-type/70 mt-0.5 line-clamp-1 max-w-xl">
              {description}
            </p>
          )}
        </div>
      </div>

      {documentType && (
        <div className="md:text-right shrink-0">
          <span className="font-mono text-xs text-ink-3 dark:text-dark-type/60 tracking-wider uppercase border border-rule/60 dark:border-dark-rule px-2 py-1 rounded-[2px] bg-paper dark:bg-dark-surface">
            {documentType}
          </span>
        </div>
      )}
    </div>
  );
};

export default LedgerRow;
