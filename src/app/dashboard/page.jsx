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
  Calendar,
  UserCircle,
  TrendingUp,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import AccountInfo from '@/components/AccountInfo';

export default function DashboardPage() {
  const { user, accountId, userData, logout } = useAuth();
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
  
  // Log accountId to console when dashboard loads
  useEffect(() => {
    console.log('Dashboard - Account ID:', accountId);
    if (userData) {
      console.log('Dashboard - User Data:', userData);
    }
  }, [accountId, userData]);
  
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

  // User data - Use real data from API if available, fallback to demo data
  console.log('User Data:', userData, user);
  const userDisplayData = userData ? {
    name: userData.account_name || user?.name || 'Anonymous User',
    email: userData.account_email || user?.email || 'no-email@example.com',
    role: 'Account Manager',
    contactPersonNum: userData.contact_person_num || '0'
  } : {
    name: user?.name || 'Demo User',
    email: user?.email || 'demo@example.com',
    role: 'Marketing Manager'
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Usando valores simulados em vez de chamadas de API
        setStats({
          contacts: 150,
          sequences: 5,
          emails: 1200,
          meetings: 25,
          responseRate: 18,
          openRate: 32,
        });
      } catch (error) {
        console.error('Error setting dashboard data:', error);
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
    { title: 'Emails Scheduled', value: stats.meetings, icon: Calendar, color: 'bg-amber-500' },
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
    <div className="p-4 md:p-6">
      {/* Dashboard content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statsCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm p-6 border border-zinc-200 dark:border-zinc-700"
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
          </motion.div>
        ))}
      </div>
      
      {/* ... rest of dashboard content ... */}
    </div>
  );
}