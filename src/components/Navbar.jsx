'use client';

import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const isActive = (path) => pathname === path;

  return (
    <header className="max-width-container nav-styles bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      <nav className="max-width-child padding-container-x flex-between relative">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold"
        >
          <Link href="/">
            <span className="bg-gradient-to-r from-primary to-primary/70 dark:from-primary dark:to-blue-400 bg-clip-text text-transparent font-extrabold">
              Outreach Agent
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="hidden md:flex items-center gap-8"
        >
          <ul className="flex gap-8">
            {navLinks.map((link) => (
              <motion.li
                key={link.name}
                variants={itemVariants}
                onHoverStart={() => setHoveredLink(link.name)}
                onHoverEnd={() => setHoveredLink(null)}
                className="relative"
              >
                <Link
                  href={link.href}
                  className={`text-zinc-700 dark:text-zinc-300 transition-colors hover:text-primary dark:hover:text-primary py-2 px-1 ${
                    isActive(link.href) ? 'text-primary dark:text-primary font-medium' : ''
                  }`}
                >
                  {link.name}
                  {(hoveredLink === link.name || isActive(link.href)) && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.2,
                        ease: 'easeInOut',
                      }}
                    />
                  )}
                </Link>
              </motion.li>
            ))}
          </ul>

          {/* Auth Links */}
          <motion.div variants={itemVariants} className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-zinc-700 dark:text-zinc-300 hover:text-primary dark:hover:text-primary transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/"
              className="bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Get Started
            </Link>
          </motion.div>

          {/* Desktop Theme Toggle */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <ThemeToggle />
          </motion.div>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMenu}
          className="md:hidden flex-center h-10 w-10 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute top-full left-0 w-full bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 md:hidden z-50"
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="p-4"
              >
                <ul className="flex-col-start gap-4">
                  {navLinks.map((link) => (
                    <motion.li
                      key={link.name}
                      variants={itemVariants}
                      className="w-full"
                    >
                      <Link
                        href={link.href}
                        className={`block w-full py-2 transition-colors ${
                          isActive(link.href)
                            ? 'text-primary font-medium'
                            : 'text-zinc-700 dark:text-zinc-300 hover:text-primary dark:hover:text-primary'
                        }`}
                        onClick={toggleMenu}
                      >
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                  <motion.li
                    variants={itemVariants}
                    className="w-full pt-2"
                  >
                    <Link
                      href="/login"
                      className="block w-full py-2 text-zinc-700 dark:text-zinc-300 hover:text-primary dark:hover:text-primary transition-colors"
                      onClick={toggleMenu}
                    >
                      Log in
                    </Link>
                  </motion.li>
                  <motion.li
                    variants={itemVariants}
                    className="w-full pt-2"
                  >
                    <Link
                      href="/"
                      className="block w-full py-2 px-4 bg-primary text-white rounded-lg text-center"
                      onClick={toggleMenu}
                    >
                      Get Started
                    </Link>
                  </motion.li>
                  <motion.li
                    variants={itemVariants}
                    className="w-full pt-4 flex justify-between items-center border-t border-zinc-200 dark:border-zinc-800"
                  >
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">Theme</span>
                    <ThemeToggle mobile />
                  </motion.li>
                </ul>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;