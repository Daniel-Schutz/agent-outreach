'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
  Users, 
  MessageSquare, 
  Mail, 
  Calendar, 
  Settings,
  Search,
  PlusCircle,
  Filter,
  ChevronDown,
  MoreHorizontal,
  Edit,
  Trash,
  Tag,
  CheckCircle,
  XCircle,
  Download,
  Upload,
  Clock,
  Loader2,
  X,
  AlertCircle
} from 'lucide-react';
import { contactsService } from '@/services/api';

export default function ContactsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Form state for new contact
  const [newContact, setNewContact] = useState({
    full_name: '',
    email: '',
    email_confidence: '',
    tags: []
  });

  // Form error handling
  const [formErrors, setFormErrors] = useState({});

  // Status tabs for filtering
  const statusTabs = [
    { id: 'all', name: 'All Contacts' },
    { id: 'in sequence', name: 'In Sequence' },
    { id: 'contacted', name: 'Contacted' },
    { id: 'not contacted', name: 'Not Contacted' },
    { id: 'no response', name: 'No Response' },
    { id: 'do not contact', name: 'Do Not Contact' }
  ];

  // Fetch contacts from API
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const response = await contactsService.getContacts();
        
        if (response.success) {
          setContacts(response.contacts || []);
        } else {
          setError(response.error || 'Failed to load contacts');
        }
      } catch (error) {
        setError('An unexpected error occurred');
        console.error('Error fetching contacts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  // Filter contacts based on active tab and search query
  const filteredContacts = contacts.filter(contact => {
    // Verificar se o contato existe
    if (!contact) return false;
    
    // Filter by tab
    if (activeTab !== 'all' && contact.contactStatus?.toLowerCase() !== activeTab.toLowerCase()) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        contact.full_name?.toLowerCase().includes(query) ||
        contact.email?.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  // Handle creating a new contact
  const handleCreateContact = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = {};
    if (!newContact.full_name.trim()) errors.full_name = 'Full name is required';
    if (!newContact.email.trim()) errors.email = 'Email is required';
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    try {
      const response = await contactsService.createContact(newContact);
      
      if (response.success) {
        // Add the new contact to the list
        setContacts([...contacts, response.contact]);
        
        // Close modal and reset form
        setIsCreateModalOpen(false);
        setNewContact({
          full_name: '',
          email: '',
          email_confidence: '',
          tags: []
        });
        setFormErrors({});
      } else {
        setFormErrors({ general: response.error || 'Failed to create contact' });
      }
    } catch (error) {
      setFormErrors({ general: 'An unexpected error occurred' });
      console.error('Error creating contact:', error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
    
    // Clear field-specific error when user types
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: undefined });
    }
  };

  // Tags input handling
  const [tagInput, setTagInput] = useState('');
  
  const handleAddTag = () => {
    if (tagInput.trim() && !newContact.tags.includes(tagInput.trim())) {
      setNewContact({
        ...newContact,
        tags: [...newContact.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };
  
  const handleRemoveTag = (tag) => {
    setNewContact({
      ...newContact,
      tags: newContact.tags.filter(t => t !== tag)
    });
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'in sequence':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            In Sequence
          </span>
        );
      case 'contacted':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            Contacted
          </span>
        );
      case 'not contacted':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
            Not Contacted
          </span>
        );
      case 'no response':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
            No Response
          </span>
        );
      case 'do not contact':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            Do Not Contact
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
            {status || 'Unknown'}
          </span>
        );
    }
  };

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-6 border-b border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Contacts</h1>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 dark:text-zinc-500" size={18} />
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-zinc-200 dark:border-zinc-700 rounded-md bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              <PlusCircle size={18} className="mr-2" />
              New Contact
            </button>
          </div>
        </header>
        
        {/* Status Tabs */}
        <div className="flex overflow-x-auto py-4 px-6 border-b border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
          {statusTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`mr-4 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-600'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
        
        {/* Contacts Table */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Failed to load contacts</h3>
                <p className="text-zinc-600 dark:text-zinc-400 mt-2">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : filteredContacts.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Users className="h-12 w-12 text-zinc-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">No contacts found</h3>
                <p className="text-zinc-600 dark:text-zinc-400 mt-2">
                  {searchQuery 
                    ? `No results for "${searchQuery}"`
                    : activeTab !== 'all'
                      ? `No contacts with status "${statusTabs.find(t => t.id === activeTab)?.name || activeTab}"`
                      : 'Get started by adding your first contact'}
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setActiveTab('all');
                    setIsCreateModalOpen(true);
                  }} 
                  className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                >
                  Create New Contact
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-zinc-50 dark:bg-zinc-700/50">
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      Full Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      Email Confidence
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                  {filteredContacts.map((contact, index) => (
                    <tr key={contact?.id || index} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/80">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900 dark:text-white">
                        {contact?.full_name || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-300">
                        {contact?.email || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-300">
                        {contact?.email_confidence || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button className="p-1 text-zinc-500 hover:text-primary dark:text-zinc-400 dark:hover:text-primary-light transition-colors">
                            <Edit size={16} />
                          </button>
                          <button className="p-1 text-zinc-500 hover:text-red-500 dark:text-zinc-400 dark:hover:text-red-400 transition-colors">
                            <Trash size={16} />
                          </button>
                          <button className="p-1 text-zinc-500 hover:text-primary dark:text-zinc-400 dark:hover:text-primary-light transition-colors">
                            <MoreHorizontal size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      
      {/* Create Contact Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-700">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Add New Contact</h2>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-500 dark:text-zinc-500 dark:hover:text-zinc-400"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 130px)' }}>
              <form onSubmit={handleCreateContact}>
                {formErrors.general && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-800 rounded-md">
                    {formErrors.general}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="full_name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="full_name"
                      name="full_name"
                      value={newContact.full_name}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border ${formErrors.full_name ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-600'} rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                    {formErrors.full_name && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.full_name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={newContact.email}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border ${formErrors.email ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-600'} rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                    )}
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email_confidence" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Email Confidence
                  </label>
                  <input
                    type="text"
                    id="email_confidence"
                    name="email_confidence"
                    value={newContact.email_confidence}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div className="flex justify-end pt-4 border-t border-zinc-200 dark:border-zinc-700">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    Create Contact
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 