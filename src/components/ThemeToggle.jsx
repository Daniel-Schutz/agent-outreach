// src/components/theme-toggle.jsx
'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

const ThemeToggle = ({ mobile }) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  if (mobile) {
    return (
      <button
        onClick={toggleTheme}
        className="flex-center gap-2 text-zinc-700 dark:text-zinc-300 transition-colors hover:text-zinc-900 dark:hover:text-white"
      >
        {theme === 'dark' ? (
          <>
            <Sun size={20} />
            <span>Light Mode</span>
          </>
        ) : (
          <>
            <Moon size={20} />
            <span>Dark Mode</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex-center h-10 w-10 rounded-full text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-all"
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;
