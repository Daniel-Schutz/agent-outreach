'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  
  return (
    <header className="w-full bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-primary to-primary/70 dark:from-primary dark:to-blue-400 bg-clip-text text-transparent font-extrabold">
                Outreach Agent
              </span>
            </Link>
          </motion.div>

          {/* Navigation */}
          <motion.nav 
            className="flex items-center gap-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link 
              href="/login" 
              className={`text-zinc-700 dark:text-zinc-300 hover:text-primary dark:hover:text-primary transition-colors ${
                pathname === '/login' ? 'text-primary dark:text-primary font-medium' : ''
              }`}
            >
              Sign In
            </Link>
            <Link
              href="/"
              className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Sign Up
            </Link>
          </motion.nav>
        </div>
      </div>
    </header>
  );
}