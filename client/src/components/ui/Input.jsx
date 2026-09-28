import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Input = forwardRef(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col space-y-1">
        {label && (
          <label
            htmlFor={inputId}
            className="font-body text-xs font-semibold text-ink-2 dark:text-dark-type/80 tracking-wide uppercase"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={twMerge(
            clsx(
              'ruled-input w-full font-body text-base text-ink dark:text-dark-type placeholder:text-ink-3 dark:placeholder:text-dark-type/40',
              error && 'border-b-seal focus:border-b-seal bg-seal/5',
              className
            )
          )}
          {...props}
        />
        {error && <span className="font-body text-xs text-seal dark:text-red-400 mt-1">{error}</span>}
        {helperText && !error && (
          <span className="font-mono text-[11px] text-ink-3 dark:text-dark-type/50 mt-1">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
