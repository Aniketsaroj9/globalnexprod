import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ChevronDown } from 'lucide-react';

export const Select = forwardRef(
  ({ label, error, helperText, options = [], children, className, id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="flex w-full flex-col space-y-1">
        {label && (
          <label
            htmlFor={selectId}
            className="font-body text-xs font-semibold uppercase tracking-wide text-ink-2 dark:text-dark-type/80"
          >
            {label}
          </label>
        )}
        <div className="relative w-full">
          <select
            id={selectId}
            ref={ref}
            className={twMerge(
              clsx(
                'w-full appearance-none rounded-[2px] border-[1.5px] border-rule bg-paper px-3.5 py-2.5 pr-10 font-body text-sm text-ink transition-colors duration-150 focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink dark:border-dark-rule dark:bg-dark-surface dark:text-dark-type dark:focus:border-dark-type dark:focus:ring-dark-type',
                error && 'border-seal focus:border-seal dark:border-seal',
                className
              )
            )}
            {...props}
          >
            {options.length > 0
              ? options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))
              : children}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-ink-3 dark:text-dark-type/60">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
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

Select.displayName = 'Select';
export default Select;
