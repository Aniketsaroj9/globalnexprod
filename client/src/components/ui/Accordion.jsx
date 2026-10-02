import React, { useState } from 'react';
import { clsx } from 'clsx';
import { ChevronDown } from 'lucide-react';

export const AccordionItem = ({
  title,
  children,
  isOpen,
  onToggle,
  subtitle,
  className,
}) => {
  return (
    <div
      className={clsx(
        'border-b border-rule transition-colors last:border-b-0 dark:border-dark-rule',
        className
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 text-left font-body text-base font-semibold text-ink transition hover:text-seal focus:outline-none dark:text-dark-type dark:hover:text-red-400"
        aria-expanded={isOpen}
      >
        <span className="flex flex-col pr-4">
          <span>{title}</span>
          {subtitle && (
            <span className="mt-0.5 font-mono text-xs font-normal text-ink-3 dark:text-dark-type/60">
              {subtitle}
            </span>
          )}
        </span>
        <ChevronDown
          className={clsx(
            'h-5 w-5 shrink-0 text-ink-3 transition-transform duration-200 dark:text-dark-type/60',
            isOpen && 'rotate-180 text-seal dark:text-red-400'
          )}
        />
      </button>
      {isOpen && (
        <div className="pb-4 font-body text-sm leading-relaxed text-ink-2 dark:text-dark-type/80">
          {children}
        </div>
      )}
    </div>
  );
};

export const Accordion = ({ items = [], allowMultiple = false, className }) => {
  const [openIndexes, setOpenIndexes] = useState([0]);

  const handleToggle = (index) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className={clsx('divide-y divide-rule dark:divide-dark-rule', className)}>
      {items.map((item, idx) => (
        <AccordionItem
          key={idx}
          title={item.title}
          subtitle={item.subtitle}
          isOpen={openIndexes.includes(idx)}
          onToggle={() => handleToggle(idx)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;
