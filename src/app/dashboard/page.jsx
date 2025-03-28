'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowUpRight, 
  ArrowDownRight,
  PlusCircle,
  Bell,
  Search,
  Clock,
  Settings,
  User,
  LogOut,
  ChevronDown,
  Filter,
  Edit,
  Trash,
  Zap,
  Send,
  Play,
  ArrowUp,
  ArrowDown,
  Loader2,
  Users,
  Mail,
  Calendar
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { reportsService, contactsService } from '@/services/api';

export default function DashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    contacts: 0,
    sequences: 0,
    emails: 0,
    meetings: 0,
    responseRate: 0,
    openRate: 0,
  });
  
  // Mock data for dashboard widgets
  const performanceMetrics = [
    { name: 'Open Rate', value: '32.4%', change: '+2.1%', trend: 'up' },
    { name: 'Response Rate', value: '18.9%', change: '+3.7%', trend: 'up' },
    { name: 'Click-through Rate', value: '8.7%', change: '-0.5%', trend: 'down' },
    { name: 'Bounce Rate', value: '2.3%', change: '-0.8%', trend: 'up' },
  ];

  const activeCampaigns = [
    {
      id: 1,
      name: 'Q1 Product Launch',
      status: 'active',
      progress: 67,
      emails: 245,
      responses: 54,
      meetings: 12,
      lastUpdated: '2 hours ago'
    },
    {
      id: 2,
      name: 'Webinar Follow-up',
      status: 'active',
      progress: 42,
      emails: 128,
      responses: 31,
      meetings: 8,
      lastUpdated: '5 hours ago'
    },
    {
      id: 3,
      name: 'Cold Outreach - Tech Companies',
      status: 'active',
      progress: 89,
      emails: 412,
      responses: 87,
      meetings: 19,
      lastUpdated: '1 day ago'
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      task: 'Review campaign performance',
      dueDate: 'Today',
      priority: 'high'
    },
    {
      id: 2,
      task: 'Prepare follow-ups for non-responders',
      dueDate: 'Tomorrow',
      priority: 'medium'
    },
    {
      id: 3,
      task: 'Update email templates',
      dueDate: 'Aug 18',
      priority: 'low'
    },
    {
      id: 4,
      task: 'Schedule meeting with sales team',
      dueDate: 'Aug 20',
      priority: 'medium'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'email_opened',
      contact: 'Sarah Johnson',
      company: 'Acme Inc.',
      time: '10 minutes ago',
      campaign: 'Q1 Product Launch'
    },
    {
      id: 2,
      type: 'email_replied',
      contact: 'Michael Chen',
      company: 'TechFlow',
      time: '1 hour ago',
      campaign: 'Webinar Follow-up'
    },
    {
      id: 3,
      type: 'meeting_booked',
      contact: 'Jessica Williams',
      company: 'Global Solutions',
      time: '3 hours ago',
      campaign: 'Cold Outreach - Tech Companies'
    },
    {
      id: 4,
      type: 'link_clicked',
      contact: 'Robert Davis',
      company: 'Innovate Labs',
      time: '5 hours ago',
      campaign: 'Q1 Product Launch'
    }
  ];

  const notifications = [
    {
      id: 1,
      type: 'campaign_complete',
      message: 'Campaign "Q4 Outreach" completed',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'meeting_scheduled',
      message: 'New meeting with Alex Thompson scheduled',
      time: 'Yesterday',
      read: false
    },
    {
      id: 3,
      type: 'response_rate',
      message: 'Response rate for "Product Launch" exceeds target by 15%',
      time: '2 days ago',
      read: true
    }
  ];

  // User data
  const userData = {
    name: 'Chris Morgan',
    email: 'chris@company.com',
    avatar: '/api/placeholder/32/32',
    role: 'Marketing Manager'
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch stats from API
        const contactStats = await reportsService.getContactStats();
        const sequenceStats = await reportsService.getAllSequenceStats();
        
        if (contactStats.success && sequenceStats.success) {
          setStats({
            contacts: contactStats?.stats?.total_contacts || 0,
            sequences: sequenceStats?.sequences?.length || 0,
            emails: contactStats?.stats?.total_emails_sent || 0,
            meetings: contactStats?.stats?.total_meetings || 0,
            responseRate: contactStats?.stats?.response_rate || 0,
            openRate: contactStats?.stats?.open_rate || 0,
          });
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Mock data for recent contacts
  const recentContacts = [
    { id: 1, name: 'John Smith', email: 'john@example.com', company: 'Acme Inc', status: 'New' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', company: 'XYZ Corp', status: 'In Sequence' },
    { id: 3, name: 'Michael Brown', email: 'michael@example.com', company: 'ABC Ltd', status: 'Responded' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', company: 'Tech Solutions', status: 'Meeting Scheduled' },
  ];

  // Stats cards
  const statsCards = [
    { title: 'Total Contacts', value: stats.contacts, icon: Users, color: 'bg-blue-500' },
    { title: 'Active Sequences', value: stats.sequences, icon: Mail, color: 'bg-purple-500' },
    { title: 'Emails Sent', value: stats.emails, icon: Mail, color: 'bg-green-500' },
    { title: 'Meetings Scheduled', value: stats.meetings, icon: Calendar, color: 'bg-amber-500' },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'email_opened':
        return <Mail size={16} className="text-blue-500" />;
      case 'email_replied':
        return <ArrowUpRight size={16} className="text-green-500" />;
      case 'meeting_booked':
        return <Calendar size={16} className="text-purple-500" />;
      case 'link_clicked':
        return <ArrowUpRight size={16} className="text-blue-500" />;
      default:
        return <Mail size={16} className="text-blue-500" />;
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'campaign_complete':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'meeting_scheduled':
        return <Calendar size={16} className="text-purple-500" />;
      case 'response_rate':
        return <TrendingUp size={16} className="text-blue-500" />;
      default:
        return <Bell size={16} className="text-blue-500" />;
    }
  };

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'medium':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'low':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      default:
        return 'bg-zinc-100 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-300';
    }
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 h-16 flex items-center justify-between px-4 md:px-6 mb-6">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-zinc-800 dark:text-white">Dashboard</h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="w-64 h-9 pl-9 pr-4 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Search
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400"
            />
          </div>

          {/* Create New Button */}
          <button className="hidden md:flex items-center h-9 px-4 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
            <PlusCircle size={16} className="mr-2" />
            <span>Create</span>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700 focus:outline-none"
            >
              <Bell size={20} className="text-zinc-600 dark:text-zinc-300" />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-zinc-800 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700 py-1 z-50">
                <div className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">
                  <h3 className="font-semibold text-zinc-800 dark:text-white">Notifications</h3>
                </div>
                {notifications.length > 0 ? (
                  <div className="max-h-[320px] overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 flex items-start hover:bg-zinc-50 dark:hover:bg-zinc-700 ${
                          !notification.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                        }`}
                      >
                        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 flex-shrink-0">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-zinc-800 dark:text-zinc-200">
                            {notification.message}
                          </p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-6 text-center text-zinc-500 dark:text-zinc-400">
                    <p>No notifications</p>
                  </div>
                )}
                <div className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">
                  <a
                    href="/notifications"
                    className="text-xs text-primary hover:text-primary/80 font-medium"
                  >
                    View all notifications
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="space-y-6">
        {/* Welcome Message */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Welcome back, {userData.name}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 mt-1">
              Here's what's happening with your outreach campaigns today.
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <button className="md:hidden flex items-center h-9 px-4 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
              <PlusCircle size={16} className="mr-2" />
              <span>Create</span>
            </button>
            <button className="flex items-center h-9 px-4 rounded-lg border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
              <Filter size={16} className="mr-2" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Stats cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-28 items-center justify-center">
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statsCards.map((card, index) => (
              <div
                key={index}
                className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 p-4"
              >
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${card.color}`}>
                    <card.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                      {card.title}
                    </p>
                    <p className="text-2xl font-bold text-zinc-900 dark:text-white mt-1">
                      {card.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Performance metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Response rate */}
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-white">
                  Response Rate
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Average across all sequences
                </p>
              </div>
              <div className="flex items-center">
                <span className={`text-sm font-medium flex items-center ${
                  stats.responseRate >= 20 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stats.responseRate >= 20 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                  {stats.responseRate}%
                </span>
              </div>
            </div>
            <div className="h-2 bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary"
                style={{ width: `${stats.responseRate}%` }}
              ></div>
            </div>
            <div className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
              Industry average: 15-25%
            </div>
          </div>

          {/* Open rate */}
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-white">
                  Email Open Rate
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Average across all emails
                </p>
              </div>
              <div className="flex items-center">
                <span className={`text-sm font-medium flex items-center ${
                  stats.openRate >= 30 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stats.openRate >= 30 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                  {stats.openRate}%
                </span>
              </div>
            </div>
            <div className="h-2 bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500"
                style={{ width: `${stats.openRate}%` }}
              ></div>
            </div>
            <div className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
              Industry average: 30-40%
            </div>
          </div>
        </div>

        {/* Continue with the rest of the dashboard content... */}
      </div>
    </div>
  );
}