'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

const ThemeToggle = ({ mobile }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // When mounted on client, now we can show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (mobile) {
    return (
      <button
        onClick={toggleTheme}
        className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 transition-colors hover:text-zinc-900 dark:hover:text-white"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? (
          <>
            <Sun size={18} />
            <span>Light Mode</span>
          </>
        ) : (
          <>
            <Moon size={18} />
            <span>Dark Mode</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center h-10 w-10 rounded-full text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-primary dark:hover:text-primary transition-all"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun size={20} />
      ) : (
        <Moon size={20} />
      )}
    </button>
  );
};

export default ThemeToggle;