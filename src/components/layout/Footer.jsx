'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Phone, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Footer link sections
  const sections = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '/features' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Use Cases', href: '/use-cases' },
        { name: 'Roadmap', href: '/roadmap' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '/about' },
        { name: 'Blog', href: '/blog' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press', href: '/press' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Documentation', href: '/docs' },
        { name: 'API', href: '/api' },
        { name: 'Status', href: '/status' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
        { name: 'GDPR', href: '/gdpr' },
      ],
    },
  ];

  // Contact info
  const contactMethods = [
    {
      name: 'Email',
      value: 'hello@outreachagent.com',
      icon: <Mail size={16} className="mr-2" />,
    },
    {
      name: 'Chat',
      value: 'Live Support',
      icon: <MessageSquare size={16} className="mr-2" />,
    },
    {
      name: 'Phone',
      value: '+1 (555) 123-4567',
      icon: <Phone size={16} className="mr-2" />,
    },
  ];

  return (
    <footer className="w-full bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 dark:from-primary dark:to-blue-400 bg-clip-text text-transparent">
                Outreach Agent
              </span>
            </Link>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6 max-w-sm">
              Professional outreach automation to help you connect with leads, nurture relationships, and grow your business.
            </p>
            
            {/* Contact information */}
            <div className="space-y-2">
              {contactMethods.map((method) => (
                <div key={method.name} className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                  {method.icon}
                  <span>{method.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer links */}
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 md:mb-0">
            &copy; {currentYear} Outreach Agent. All rights reserved.
          </p>
          <div className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
            <span className="flex items-center">
              Made with <Heart size={14} className="mx-1 text-red-500" /> by the Outreach Team
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}