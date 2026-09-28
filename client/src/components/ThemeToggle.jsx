import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="p-2 border border-rule dark:border-dark-rule rounded-[2px] bg-paper dark:bg-dark-surface text-ink dark:text-dark-type hover:border-ink dark:hover:border-dark-type transition-colors cursor-pointer flex items-center gap-2 text-xs font-mono"
    >
      {theme === 'light' ? (
        <>
          <Moon className="w-4 h-4 text-ink-2" />
          <span className="hidden sm:inline">DARK MODE</span>
        </>
      ) : (
        <>
          <Sun className="w-4 h-4 text-brass" />
          <span className="hidden sm:inline">LIGHT MODE</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
