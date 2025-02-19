'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeProvider({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Prevent rendering anything until mounted
  }

  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      {children}
    </NextThemeProvider>
  );
}
