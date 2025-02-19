'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  // Animation variants remain the same
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
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

  return (
    <header className="max-width-container nav-styles bg-background/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      <nav className="max-width-child padding-container-x flex-between relative">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold text-zinc-900 dark:text-white"
        >
          <span className="bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent font-extrabold">
            Logo
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="hidden md:flex items-center gap-8"
        >
          <ul className="flex gap-8">
            {navLinks.map((link, index) => (
              <motion.li
                key={link.name}
                variants={itemVariants}
                onHoverStart={() => setHoveredLink(link.name)}
                onHoverEnd={() => setHoveredLink(null)}
                className="relative"
              >
                <a
                  href={link.href}
                  className="text-zinc-700 dark:text-zinc-300 transition-colors hover:text-zinc-900 dark:hover:text-white py-2 px-1"
                >
                  {link.name}
                  {hoveredLink === link.name && (
                    <motion.div
                      layoutId="underline"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-zinc-900 dark:bg-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.2,
                        ease: 'easeInOut',
                      }}
                    />
                  )}
                </a>
              </motion.li>
            ))}
          </ul>

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
          className="md:hidden flex-center h-10 w-10 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
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
              className="absolute top-full left-0 w-full bg-white dark:bg-zinc-900/95 backdrop-blur-lg border-b border-zinc-200 md:hidden overflow-hidden"
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="p-4"
              >
                <ul className="flex-col-start gap-4">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.name}
                      variants={itemVariants}
                      className="w-full"
                    >
                      <a
                        href={link.href}
                        className="block w-full py-2 text-zinc-700 dark:text-zinc-300 transition-colors hover:text-zinc-900 dark:hover:text-white"
                        onClick={toggleMenu}
                      >
                        {link.name}
                      </a>
                    </motion.li>
                  ))}
                  {/* <motion.li
                    variants={itemVariants}
                    className="w-full pt-4 border-t border-zinc-200 dark:border-zinc-800"
                  >
                    <ThemeToggle mobile />
                  </motion.li> */}
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
