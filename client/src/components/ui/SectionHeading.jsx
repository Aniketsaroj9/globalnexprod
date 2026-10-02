import React from 'react';
import { clsx } from 'clsx';
import Badge from './Badge';

export const SectionHeading = ({
  badge,
  badgeVariant = 'stamp',
  title,
  subtitle,
  align = 'left', // 'left' | 'center'
  className,
}) => {
  return (
    <div
      className={clsx(
        'mb-10 flex flex-col',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className
      )}
    >
      {badge && (
        <div className="mb-3">
          <Badge variant={badgeVariant}>{badge}</Badge>
        </div>
      )}
      <h2 className="font-display text-3xl font-bold tracking-fraunces-h1 text-ink sm:text-4xl dark:text-dark-type">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-2xl font-body text-base text-ink-3 dark:text-dark-type/70">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
