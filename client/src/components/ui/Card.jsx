import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Card = ({
  children,
  className,
  hoverable = false,
  bordered = true,
  padding = 'md', // 'none' | 'sm' | 'md' | 'lg'
  ...props
}) => {
  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={twMerge(
        clsx(
          'relative rounded-[2px] bg-paper text-ink shadow-subtle dark:bg-dark-surface dark:text-dark-type transition-all duration-200',
          bordered && 'border-[1.5px] border-rule dark:border-dark-rule',
          hoverable &&
            'hover:-translate-x-[1px] hover:-translate-y-[1px] hover:border-ink hover:shadow-stamp-hover dark:hover:border-dark-type dark:hover:shadow-stamp-hover-dark cursor-pointer',
          paddings[padding],
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className, ...props }) => (
  <div
    className={twMerge(
      clsx(
        'border-b border-rule pb-4 mb-4 dark:border-dark-rule',
        className
      )
    )}
    {...props}
  >
    {children}
  </div>
);

export const CardTitle = ({ children, className, ...props }) => (
  <h3
    className={twMerge(
      clsx(
        'font-display text-xl font-bold tracking-tight text-ink dark:text-dark-type',
        className
      )
    )}
    {...props}
  >
    {children}
  </h3>
);

export const CardFooter = ({ children, className, ...props }) => (
  <div
    className={twMerge(
      clsx(
        'border-t border-rule pt-4 mt-4 flex items-center justify-between dark:border-dark-rule',
        className
      )
    )}
    {...props}
  >
    {children}
  </div>
);

export default Card;
