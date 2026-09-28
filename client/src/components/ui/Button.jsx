import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'ghost' | 'stamp'
  className,
  disabled,
  isLoading,
  type = 'button',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-body text-sm font-semibold rounded-[2px] transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-seal focus:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const variants = {
    primary:
      'bg-ink text-paper border-[1.5px] border-ink hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-stamp-hover dark:hover:shadow-stamp-hover-dark active:translate-x-0 active:translate-y-0 active:shadow-none dark:bg-dark-type dark:text-dark-bg dark:border-dark-type px-5 py-2.5',
    secondary:
      'bg-transparent text-ink border-[1.5px] border-rule hover:bg-field hover:border-ink dark:text-dark-type dark:border-dark-rule dark:hover:bg-dark-field dark:hover:border-dark-type px-5 py-2.5',
    ghost:
      'bg-transparent text-ink hover:bg-field/60 dark:text-dark-type dark:hover:bg-dark-field/60 px-4 py-2',
    stamp:
      'bg-seal text-paper border-[1.5px] border-seal font-mono uppercase tracking-wider text-xs px-4 py-2 hover:bg-seal/90 shadow-subtle',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={twMerge(clsx(baseStyles, variants[variant], className))}
      {...props}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
