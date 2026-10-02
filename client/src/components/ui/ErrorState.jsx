import React from 'react';
import { clsx } from 'clsx';
import { AlertCircle, RefreshCw } from 'lucide-react';
import Button from './Button';

export const ErrorState = ({
  title = 'Failed to load information',
  message = 'An error occurred while connecting to the archival ledger.',
  onRetry,
  className,
}) => {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center rounded-[2px] border border-seal/40 bg-seal/5 p-8 text-center dark:border-seal/60 dark:bg-seal/10',
        className
      )}
    >
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-seal/10 text-seal dark:bg-seal/20">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h3 className="font-display text-base font-bold text-ink dark:text-dark-type">{title}</h3>
      <p className="mt-1 max-w-md font-body text-xs text-ink-3 dark:text-dark-type/80">{message}</p>
      {onRetry && (
        <div className="mt-4">
          <Button variant="secondary" onClick={onRetry} className="gap-2 text-xs py-2 px-3">
            <RefreshCw className="h-3.5 w-3.5" />
            Retry Request
          </Button>
        </div>
      )}
    </div>
  );
};

export default ErrorState;
