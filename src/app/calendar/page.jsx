'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
  Users, 
  MessageSquare, 
  Mail, 
  Calendar as CalendarIcon, 
  Settings,
  Search,
  PlusCircle,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Clock,
  Video,
  Phone,
  MapPin,
  User,
  Calendar as CalendarIcon2,
  Filter,
  CheckSquare,
  XSquare,
  AlertCircle,
  ExternalLink,
  Check,
  Pause,
  FileEdit,
  Eye,
  X,
  Save,
  Trash2,
  Send,
  Loader2
} from 'lucide-react';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState('week'); // week, month, day
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [editedSubject, setEditedSubject] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock data for scheduled emails
  const scheduledEmails = [
    {
      id: 1,
      subject: 'Introduction to Our Services',
      recipient: {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@acmeinc.com',
        company: 'Acme Inc.'
      },
      scheduledDate: '2023-08-17',
      scheduledTime: '10:00 AM',
      status: 'scheduled',
      campaign: 'New Product Introduction',
      content: `
Hi Sarah,

I hope this email finds you well. I wanted to introduce you to our latest service offerings that might be relevant to Acme Inc's current initiatives.

Our team has developed several solutions specifically designed for companies in your industry, and I'd love to discuss how they might benefit your operations.

Would you be open to a brief call next week to explore this further?

Best regards,
Chris Morgan
      `.trim(),
      type: 'initial'
    },
    {
      id: 2,
      subject: 'Follow-up on our previous conversation',
      recipient: {
        name: 'Michael Chen',
        email: 'michael.chen@techflow.io',
        company: 'TechFlow'
      },
      scheduledDate: '2023-08-17',
      scheduledTime: '1:00 PM',
      status: 'scheduled',
      campaign: 'Q3 Follow-up Sequence',
      content: `
Hello Michael,

I'm following up on our conversation from last week regarding the implementation timeline.

As mentioned, we're able to expedite the process and can get you started within two weeks. I've attached a revised proposal that reflects the updated schedule.

Please let me know if this works for your team or if you'd like to discuss any adjustments.

Thanks,
Chris Morgan
      `.trim(),
      type: 'follow-up'
    },
    {
      id: 3,
      subject: 'Custom demo proposal for Global Solutions',
      recipient: {
        name: 'Jessica Williams',
        email: 'j.williams@globalsolutions.com',
        company: 'Global Solutions'
      },
      scheduledDate: '2023-08-18',
      scheduledTime: '11:00 AM',
      status: 'draft',
      campaign: 'Enterprise Outreach',
      content: `
Dear Jessica,

Based on our conversation yesterday, I'd like to offer a customized demonstration of our platform focused specifically on the reporting features you mentioned would be most valuable to Global Solutions.

I've set aside time next Thursday at 2 PM for a personalized walkthrough with our product specialist. Would that time work for you and your team?

If so, I'll send over a calendar invite with all the details. If not, please suggest a few alternative times that might work better.

Looking forward to your response,
Chris Morgan
      `.trim(),
      type: 'demo'
    },
    {
      id: 4,
      subject: 'Contract review & next steps',
      recipient: {
        name: 'Robert Davis',
        email: 'r.davis@innovatelabs.com',
        company: 'Innovate Labs'
      },
      scheduledDate: '2023-08-19',
      scheduledTime: '2:00 PM',
      status: 'sent',
      campaign: 'Contract Signing Process',
      content: `
Hi Robert,

Thank you for your time during our meeting yesterday. As promised, I've attached the contract documents we discussed for your review.

I've highlighted the key sections we modified based on your feedback, particularly around the implementation timeline and support terms.

Please take your time to review these changes. Once you're comfortable with everything, you can sign electronically using the secure link on the first page.

If you have any questions or need clarification on any points, don't hesitate to reach out.

Kind regards,
Chris Morgan
      `.trim(),
      type: 'contract'
    },
    {
      id: 5,
      subject: 'Initial outreach - New features announcement',
      recipient: {
        name: 'Amanda Rodriguez',
        email: 'a.rodriguez@futurecorp.com',
        company: 'Future Corp'
      },
      scheduledDate: '2023-08-21',
      scheduledTime: '9:00 AM',
      status: 'scheduled',
      campaign: 'Product Update Announcement',
      content: `
Hello Amanda,

I hope you're doing well. I wanted to reach out because we've just launched several new features that I believe would be valuable for Future Corp, especially considering your recent expansion.

Highlights include:
- Advanced data analytics dashboard
- Streamlined approval workflows
- Enhanced security protocols
- Custom reporting options

I'd love to give you a quick overview of these features and how they could benefit your team specifically. Would you have 15 minutes for a call this week or next?

Best regards,
Chris Morgan
      `.trim(),
      type: 'initial'
    }
  ];

  // Navigation
  const navigation = [
    { name: 'Dashboard', icon: <BarChart3 size={20} />, href: '/dashboard' },
    { name: 'Campaigns', icon: <Mail size={20} />, href: '/campaigns' },
    { name: 'Contacts', icon: <Users size={20} />, href: '/contacts' },
    { name: 'Templates', icon: <MessageSquare size={20} />, href: '/templates' },
    { name: 'Calendar', icon: <CalendarIcon size={20} />, href: '/calendar' },
    { name: 'Settings', icon: <Settings size={20} />, href: '/settings' }
  ];

  // Get current month and year
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();

  // Navigation to previous/next period
  const navigatePrevious = () => {
    const newDate = new Date(currentDate);
    if (currentView === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    } else if (currentView === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else if (currentView === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const navigateNext = () => {
    const newDate = new Date(currentDate);
    if (currentView === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    } else if (currentView === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else if (currentView === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  // Get email type icon & color
  const getEmailTypeInfo = (type) => {
    switch (type) {
      case 'initial':
        return { 
          color: 'text-blue-500',
          label: 'Initial Outreach'
        };
      case 'follow-up':
        return { 
          color: 'text-purple-500',
          label: 'Follow-up'
        };
      case 'demo':
        return { 
          color: 'text-green-500',
          label: 'Demo Request'
        };
      case 'contract':
        return { 
          color: 'text-amber-500',
          label: 'Contract'
        };
      default:
        return { 
          color: 'text-zinc-500',
          label: 'Email'
        };
    }
  };

  // Get email status badge
  const getEmailStatusBadge = (status) => {
    switch (status) {
      case 'scheduled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            <Clock size={12} className="mr-1" />
            Scheduled
          </span>
        );
      case 'sent':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            <Check size={12} className="mr-1" />
            Sent
          </span>
        );
      case 'draft':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
            <FileEdit size={12} className="mr-1" />
            Draft
          </span>
        );
      case 'paused':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-300">
            <Pause size={12} className="mr-1" />
            Paused
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-300">
            {status}
          </span>
        );
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  // Filter emails for the current view's timespan
  const filteredEmails = scheduledEmails.filter(email => {
    const emailDate = new Date(email.scheduledDate);
    
    if (currentView === 'day') {
      return emailDate.toDateString() === currentDate.toDateString();
    } else if (currentView === 'week') {
      // Start of week (Sunday)
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      
      // End of week (Saturday)
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      
      return emailDate >= startOfWeek && emailDate <= endOfWeek;
    }
    
    // Month view (default)
    return emailDate.getMonth() === currentDate.getMonth() && 
           emailDate.getFullYear() === currentDate.getFullYear();
  }).sort((a, b) => {
    // Sort by date, then by scheduled time
    const dateA = new Date(a.scheduledDate);
    const dateB = new Date(b.scheduledDate);
    
    if (dateA.getTime() !== dateB.getTime()) {
      return dateA - dateB;
    }
    
    // If same date, sort by time
    const timeA = new Date(`${a.scheduledDate} ${a.scheduledTime}`);
    const timeB = new Date(`${b.scheduledDate} ${b.scheduledTime}`);
    return timeA - timeB;
  });

  // Open email edit modal
  const openEmailModal = (email) => {
    setSelectedEmail(email);
    setEditedSubject(email.subject);
    setEditedContent(email.content);
    setIsEditModalOpen(true);
  };

  // Save email changes
  const saveEmailChanges = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, you would save to API here
      // For now, just update the local state
      const updatedEmails = scheduledEmails.map(email => {
        if (email.id === selectedEmail.id) {
          return {
            ...email,
            subject: editedSubject,
            content: editedContent
          };
        }
        return email;
      });
      
      // This would normally update the state from an API fetch
      // But for demo we'll just close the modal
      setIsLoading(false);
      setIsEditModalOpen(false);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-6 border-b border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Email Calendar</h1>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 dark:text-zinc-500" size={18} />
              <input
                type="text"
                placeholder="Search emails..."
                className="pl-10 pr-4 py-2 border border-zinc-200 dark:border-zinc-700 rounded-md bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              <PlusCircle size={18} className="mr-2" />
              Schedule Email
            </button>
          </div>
        </header>
        
        {/* Calendar navigation */}
        <div className="bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <button 
              onClick={navigatePrevious}
              className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-3 py-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-md"
            >
              Today
            </button>
            <button 
              onClick={navigateNext}
              className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
            >
              <ChevronRight size={20} />
            </button>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 ml-2">
              {currentView === 'day' 
                ? formatDate(currentDate.toISOString().split('T')[0])
                : `${currentMonth} ${currentYear}`}
            </h2>
          </div>
          
          <div className="flex space-x-1 bg-zinc-100 dark:bg-zinc-700 p-1 rounded-md">
            <button
              onClick={() => setCurrentView('day')}
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                currentView === 'day'
                  ? 'bg-white dark:bg-zinc-600 text-zinc-900 dark:text-zinc-50 shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-50'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setCurrentView('week')}
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                currentView === 'week'
                  ? 'bg-white dark:bg-zinc-600 text-zinc-900 dark:text-zinc-50 shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-50'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setCurrentView('month')}
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                currentView === 'month'
                  ? 'bg-white dark:bg-zinc-600 text-zinc-900 dark:text-zinc-50 shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-50'
              }`}
            >
              Month
            </button>
          </div>
          
          <div>
            <button className="flex items-center px-3 py-1.5 bg-white dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-600 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-600 text-sm font-medium">
              <Filter size={16} className="mr-2" />
              Filter
            </button>
          </div>
        </div>
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* List view for scheduled emails */}
          <div className="flex flex-col space-y-4">
            {filteredEmails.length > 0 ? (
              filteredEmails.map((email) => {
                const typeInfo = getEmailTypeInfo(email.type);
                
                return (
                  <div 
                    key={email.id}
                    onClick={() => openEmailModal(email)}
                    className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
                  >
                    <div className="flex">
                      {/* Time sidebar */}
                      <div className="w-32 bg-zinc-50 dark:bg-zinc-700/30 p-4 flex flex-col items-center justify-center border-r border-zinc-200 dark:border-zinc-700">
                        <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                          {formatDate(email.scheduledDate).split(',')[0]}
                        </div>
                        <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 my-1">
                          {email.scheduledTime.split(' ')[0]}
                        </div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                          {email.scheduledTime}
                        </div>
                      </div>
                      
                      {/* Email details */}
                      <div className="flex-1 p-4">
                        <div className="flex justify-between">
                          <div>
                            <div className="flex items-center mb-1">
                              <Mail size={16} className={typeInfo.color} />
                              <span className={`ml-2 font-medium ${typeInfo.color} text-sm`}>
                                {typeInfo.label}
                              </span>
                            </div>
                            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                              {email.subject}
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-300 text-sm mb-2">
                              {email.recipient.name} • {email.recipient.company}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            {getEmailStatusBadge(email.status)}
                          </div>
                        </div>
                        
                        <div className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
                          <p className="line-clamp-2">
                            {email.content.substring(0, 150)}...
                          </p>
                        </div>
                        
                        <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-700">
                          <div className="flex items-center">
                            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                              Campaign: {email.campaign}
                            </span>
                            <div className="ml-auto flex space-x-2">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openEmailModal(email);
                                }}
                                className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                              >
                                <Eye size={16} />
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openEmailModal(email);
                                }}
                                className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                              >
                                <FileEdit size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="rounded-full bg-zinc-100 dark:bg-zinc-800 p-3 mb-4">
                  <Mail className="h-8 w-8 text-zinc-400 dark:text-zinc-500" />
                </div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-1">No emails scheduled</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-center max-w-md mb-4">
                  You don&apos;t have any emails scheduled for this time period.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
      
      {/* Email Edit Modal */}
      {isEditModalOpen && selectedEmail && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg w-full max-w-4xl h-[80vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                {getEmailStatusBadge(selectedEmail.status)}
                <span className="ml-2">Email to {selectedEmail.recipient.name}</span>
              </h2>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                Scheduled for
              </label>
              <div className="text-zinc-900 dark:text-zinc-50">
                {formatDate(selectedEmail.scheduledDate)} at {selectedEmail.scheduledTime}
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                Recipient
              </label>
              <div className="text-zinc-900 dark:text-zinc-50">
                {selectedEmail.recipient.name} ({selectedEmail.recipient.email}) - {selectedEmail.recipient.company}
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="subject" className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                value={editedSubject}
                onChange={(e) => setEditedSubject(e.target.value)}
                className="w-full p-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div className="flex-1 overflow-hidden mb-4">
              <label htmlFor="content" className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                Email Content
              </label>
              <textarea
                id="content"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full h-full p-3 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
            
            <div className="flex justify-between mt-2">
              <div className="flex space-x-3">
                <button
                  className="px-3 py-2 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-md hover:bg-red-200 dark:hover:bg-red-900/50 flex items-center"
                >
                  <Trash2 size={16} className="mr-1.5" />
                  Delete
                </button>
                {selectedEmail.status === 'scheduled' && (
                  <button
                    className="px-3 py-2 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-md hover:bg-amber-200 dark:hover:bg-amber-900/50 flex items-center"
                  >
                    <Send size={16} className="mr-1.5" />
                    Send Now
                  </button>
                )}
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-700"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEmailChanges}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 flex items-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={16} className="mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 