import React from 'react';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumb = ({ items = [], className }) => {
  return (
    <nav aria-label="Breadcrumb" className={clsx('py-3 font-mono text-xs', className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-ink-3 dark:text-dark-type/60">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1 transition hover:text-ink dark:hover:text-dark-type"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="inline-flex items-center gap-1.5">
              <ChevronRight className="h-3 w-3 text-rule dark:text-dark-rule" />
              {isLast || !item.href ? (
                <span className="font-semibold text-ink dark:text-dark-type" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="transition hover:text-ink dark:hover:text-dark-type"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
