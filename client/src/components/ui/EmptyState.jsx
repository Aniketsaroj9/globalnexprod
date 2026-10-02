import React from 'react';
import { clsx } from 'clsx';
import { FileQuestion } from 'lucide-react';
import Button from './Button';

export const EmptyState = ({
  icon: Icon = FileQuestion,
  title = 'No records found',
  description = 'There are currently no entries to display in this ledger section.',
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center rounded-[2px] border border-dashed border-rule bg-paper/50 p-12 text-center dark:border-dark-rule dark:bg-dark-surface/40',
        className
      )}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-rule bg-paper text-ink-3 shadow-subtle dark:border-dark-rule dark:bg-dark-surface dark:text-dark-type/60">
        <Icon className="h-6 w-6 stroke-[1.5]" />
      </div>
      <h3 className="font-display text-lg font-bold text-ink dark:text-dark-type">{title}</h3>
      <p className="mt-1.5 max-w-sm font-body text-sm text-ink-3 dark:text-dark-type/70">
        {description}
      </p>
      {actionLabel && onAction && (
        <div className="mt-6">
          <Button variant="secondary" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
