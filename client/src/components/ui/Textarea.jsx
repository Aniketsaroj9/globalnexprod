import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Textarea = forwardRef(
  ({ label, error, helperText, maxLength, value, className, id, rows = 4, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const charCount = typeof value === 'string' ? value.length : 0;

    return (
      <div className="flex w-full flex-col space-y-1">
        <div className="flex items-center justify-between">
          {label && (
            <label
              htmlFor={textareaId}
              className="font-body text-xs font-semibold uppercase tracking-wide text-ink-2 dark:text-dark-type/80"
            >
              {label}
            </label>
          )}
          {maxLength && (
            <span className="font-mono text-[10px] text-ink-3 dark:text-dark-type/50">
              {charCount}/{maxLength}
            </span>
          )}
        </div>
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          maxLength={maxLength}
          value={value}
          className={twMerge(
            clsx(
              'w-full rounded-[2px] border-[1.5px] border-rule bg-paper p-3 font-body text-sm text-ink placeholder:text-ink-3/60 transition-colors duration-150 focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink dark:border-dark-rule dark:bg-dark-surface dark:text-dark-type dark:placeholder:text-dark-type/40 dark:focus:border-dark-type dark:focus:ring-dark-type',
              error && 'border-seal focus:border-seal dark:border-seal',
              className
            )
          )}
          {...props}
        />
        {error && <span className="mt-1 font-body text-xs text-seal dark:text-red-400">{error}</span>}
        {helperText && !error && (
          <span className="mt-1 font-mono text-[11px] text-ink-3 dark:text-dark-type/50">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
export default Textarea;
