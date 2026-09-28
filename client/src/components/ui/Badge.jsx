import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Badge = ({
  children,
  variant = 'stamp', // 'stamp' | 'brass' | 'veridian' | 'neutral'
  className,
}) => {
  const baseStyles =
    'inline-flex items-center px-2 py-0.5 rounded-[2px] font-mono text-[11px] font-bold uppercase tracking-wider border';

  const variants = {
    stamp:
      'border-seal text-seal bg-seal/5 dark:border-seal dark:text-seal dark:bg-seal/10',
    brass:
      'border-brass text-brass bg-brass/10 dark:border-brass dark:text-brass dark:bg-brass/10',
    veridian:
      'border-veridian text-veridian bg-veridian/10 dark:border-veridian dark:text-veridian dark:bg-veridian/10',
    neutral:
      'border-rule text-ink-2 bg-paper dark:border-dark-rule dark:text-dark-type dark:bg-dark-surface',
  };

  return (
    <span className={twMerge(clsx(baseStyles, variants[variant], className))}>
      {children}
    </span>
  );
};

export default Badge;
