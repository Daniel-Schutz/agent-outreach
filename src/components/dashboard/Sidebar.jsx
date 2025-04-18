'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Calendar,
  Home,
  Mail,
  Settings,
  Users,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  CheckSquare
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  // Navigation items
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Contacts', href: '/contacts', icon: Users },
    { name: 'Templates', href: '/templates', icon: MessageSquare },
    { name: 'Campaigns', href: '/campaigns', icon: Mail },
    { name: 'Calendar', href: '/calendar', icon: Calendar }
  ];

  return (
    <div
      className={`bg-white dark:bg-zinc-800 border-r border-zinc-200 dark:border-zinc-700 transition-all duration-300 h-screen ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center border-b border-zinc-200 dark:border-zinc-700 px-4">
        <Link href="/dashboard" className="flex items-center">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white font-bold">
            OA
          </div>
          {!collapsed && (
            <span className="ml-2 text-lg font-semibold bg-gradient-to-r from-primary to-primary/70 dark:from-primary dark:to-blue-400 bg-clip-text text-transparent">
              Outreach Agent
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="p-2 mt-2">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center py-2 px-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700'
                  }`}
                >
                  <Icon size={20} className={isActive ? 'text-primary' : ''} />
                  {!collapsed && <span className="ml-3">{item.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Toggle button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute bottom-4 -right-3 w-6 h-6 bg-zinc-100 dark:bg-zinc-700 rounded-full flex items-center justify-center text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-600"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </div>
  );
} 