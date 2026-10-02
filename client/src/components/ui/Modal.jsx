import React, { useEffect } from 'react';
import { clsx } from 'clsx';
import { X } from 'lucide-react';

export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-lg',
  className,
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Box */}
      <div
        className={clsx(
          'relative w-full rounded-[2px] border-[1.5px] border-rule bg-paper p-6 text-ink shadow-2xl transition-all dark:border-dark-rule dark:bg-dark-surface dark:text-dark-type',
          maxWidth,
          className
        )}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between border-b border-rule pb-4 dark:border-dark-rule">
          <div>
            {title && (
              <h3 className="font-display text-lg font-bold text-ink dark:text-dark-type">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="mt-0.5 font-mono text-xs text-ink-3 dark:text-dark-type/60">
                {subtitle}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-[2px] p-1 text-ink-3 transition hover:bg-field hover:text-ink dark:text-dark-type/60 dark:hover:bg-dark-field dark:hover:text-dark-type"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
