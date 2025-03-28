'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search,
  PlusCircle,
  Filter,
  ChevronDown,
  MoreHorizontal,
  Edit,
  Trash,
  Zap,
  Clock,
  ArrowUpRight,
  CheckCircle,
  AlertCircle,
  PauseCircle,
  Play,
  X,
  Loader2,
  Mail
} from 'lucide-react';
import { templatesService, contactsService, emailService } from '@/services/api';

export default function CampaignsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Mock data for campaigns
  const campaigns = [
    {
      id: 1,
      name: 'Initial Sequence',
      status: 'active',
      type: 'sequence',
      progress: 67,
      emails: 245,
      responses: 54,
      meetings: 12,
      startDate: '2023-08-01',
      lastUpdated: '2 hours ago',
      sequence: [
        { stage: 1, name: 'Initial Outreach', delay: '0 days' },
        { stage: 2, name: 'Follow-up 1', delay: '3 days' },
        { stage: 3, name: 'Call Prospect', delay: '5 days' }
      ]
    },
    {
      id: 2,
      name: 'Long Term F/U',
      status: 'active',
      type: 'sequence',
      progress: 42,
      emails: 128,
      responses: 31,
      meetings: 8,
      startDate: '2023-07-15',
      lastUpdated: '5 hours ago',
      sequence: [
        { stage: 1, name: 'F/U Long Outreach', delay: '0 days' },
        { stage: 2, name: 'F/U 2 - Different Angle', delay: '14 days' },
        { stage: 3, name: 'F/U 3 - Ask for Other Contact', delay: '21 days' }
      ]
    },
    {
      id: 3,
      name: 'Follow-Up Sequence',
      status: 'paused',
      type: 'sequence',
      progress: 89,
      emails: 412,
      responses: 87,
      meetings: 19,
      startDate: '2023-06-20',
      lastUpdated: '1 day ago',
      sequence: [
        { stage: 1, name: 'Asked to Check Back', delay: '0 days' },
        { stage: 2, name: 'Need More Time', delay: '14 days' },
        { stage: 3, name: 'When is a better time?', delay: '28 days' }
      ]
    },
    {
      id: 4,
      name: 'One-Off Email Blast',
      status: 'completed',
      type: 'one-time',
      progress: 100,
      emails: 500,
      responses: 112,
      meetings: 27,
      startDate: '2023-05-10',
      lastUpdated: '3 days ago'
    }
  ];

  // Fetch templates and contacts when modal opens
  useEffect(() => {
    if (isCreateModalOpen) {
      fetchTemplatesAndContacts();
    }
  }, [isCreateModalOpen]);

  // Fetch templates and contacts
  const fetchTemplatesAndContacts = async () => {
    setLoading(true);
    try {
      // Fetch templates
      const templatesResponse = await templatesService.getTemplates();
      if (templatesResponse.success) {
        setTemplates(templatesResponse.templates || []);
      }
      
      // Fetch contacts
      const contactsResponse = await contactsService.getContacts();
      if (contactsResponse.success) {
        setContacts(contactsResponse.contacts || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle contact selection/deselection
  const toggleContactSelection = (contactId) => {
    if (!contactId) return; // Prevent toggle if contactId is undefined
    
    setSelectedContacts(prevSelected => {
      // Check if this contact is already selected
      if (prevSelected.includes(contactId)) {
        // If selected, remove it from the array
        return prevSelected.filter(id => id !== contactId);
      } else {
        // If not selected, add it to the array
        return [...prevSelected, contactId];
      }
    });
  };

  // Handle individual checkbox change - independent from parent div click
  const handleCheckboxChange = (e, contactId) => {
    e.stopPropagation(); // Prevent div click handler from firing
    if (!contactId) return; // Safety check
    
    toggleContactSelection(contactId);
  };

  // Handle template selection
  const handleTemplateChange = (e) => {
    setSelectedTemplate(e.target.value);
  };

  // Handle campaign creation
  const handleCreateCampaign = async () => {
    // Validate form
    const errors = {};
    if (!selectedTemplate) errors.template = 'Please select a template';
    if (selectedContacts.length === 0) errors.contacts = 'Please select at least one contact';
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setLoading(true);
    try {
      // Send emails to all selected contacts
      for (const contactId of selectedContacts) {
        const contact = contacts.find(c => c.id === contactId);
        if (contact) {
          const emailData = {
            templateId: selectedTemplate,
            contactId: contactId,
            email: contact.email
          };
          
          await emailService.sendEmail(emailData);
        }
      }
      
      // Show success message
      setSuccessMessage('Campaign started successfully! Emails are being sent.');
      
      // Reset form after short delay
      setTimeout(() => {
        setIsCreateModalOpen(false);
        setSelectedTemplate('');
        setSelectedContacts([]);
        setFormErrors({});
        setSuccessMessage('');
      }, 2000);
    } catch (error) {
      console.error('Error creating campaign:', error);
      setFormErrors({ general: 'Failed to create campaign. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Filter campaigns
  const filteredCampaigns = activeFilter === 'all'
    ? campaigns
    : campaigns.filter(campaign => campaign.status === activeFilter);

  // Get campaign status badge
  const getCampaignStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return (
          <span className="flex items-center text-sm font-medium text-green-600 dark:text-green-400">
            <Play size={14} className="mr-1" />
            Active
          </span>
        );
      case 'paused':
        return (
          <span className="flex items-center text-sm font-medium text-amber-600 dark:text-amber-400">
            <PauseCircle size={14} className="mr-1" />
            Paused
          </span>
        );
      case 'completed':
        return (
          <span className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
            <CheckCircle size={14} className="mr-1" />
            Completed
          </span>
        );
      case 'draft':
        return (
          <span className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-400">
            <Clock size={14} className="mr-1" />
            Draft
          </span>
        );
      default:
        return (
          <span className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-400">
            {status}
          </span>
        );
    }
  };

  return (
    <div>
      {/* Page header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Campaigns</h1>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 dark:text-zinc-500" size={18} />
            <input
              type="text"
              placeholder="Search campaigns..."
              className="pl-10 pr-4 py-2 border border-zinc-200 dark:border-zinc-700 rounded-md bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            <PlusCircle size={18} className="mr-2" />
            New Campaign
          </button>
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium ${
              activeFilter === 'all'
                ? 'bg-primary text-white'
                : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700'
            }`}
          >
            All Campaigns
          </button>
          <button
            onClick={() => setActiveFilter('active')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium ${
              activeFilter === 'active'
                ? 'bg-primary text-white'
                : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setActiveFilter('paused')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium ${
              activeFilter === 'paused'
                ? 'bg-primary text-white'
                : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700'
            }`}
          >
            Paused
          </button>
          <button
            onClick={() => setActiveFilter('completed')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium ${
              activeFilter === 'completed'
                ? 'bg-primary text-white'
                : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700'
            }`}
          >
            Completed
          </button>
        </div>
        
        <div className="flex items-center">
          <button className="flex items-center px-3 py-1.5 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-700 text-sm font-medium">
            <Filter size={16} className="mr-2" />
            Filter
            <ChevronDown size={16} className="ml-2" />
          </button>
        </div>
      </div>
      
      {/* Campaigns list */}
      <div className="bg-white dark:bg-zinc-800 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50">
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Campaign
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Metrics
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              {filteredCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/80">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                          {campaign.name}
                        </div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                          Started {campaign.startDate}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-zinc-900 dark:text-zinc-100 capitalize">
                      {campaign.type === 'sequence' ? 'Email Sequence' : 'One-Time Campaign'}
                    </div>
                    {campaign.type === 'sequence' && (
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">
                        {campaign.sequence.length} steps
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getCampaignStatusBadge(campaign.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2.5 mb-1">
                      <div
                        className="bg-primary h-2.5 rounded-full"
                        style={{ width: `${campaign.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      {campaign.progress}% complete
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-4">
                      <div>
                        <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                          {campaign.emails}
                        </div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                          Emails
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                          {campaign.responses}
                        </div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                          Responses
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                          {campaign.meetings}
                        </div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                          Meetings
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
                      {campaign.lastUpdated}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      {campaign.status === 'active' && (
                        <button className="p-1 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300">
                          <PauseCircle size={18} />
                        </button>
                      )}
                      {campaign.status === 'paused' && (
                        <button className="p-1 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300">
                          <Play size={18} />
                        </button>
                      )}
                      <button className="p-1 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300">
                        <Zap size={18} />
                      </button>
                      <button className="p-1 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300">
                        <Edit size={18} />
                      </button>
                      <button className="p-1 text-zinc-500 hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400">
                        <Trash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Create Campaign Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg w-full max-w-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Create New Campaign</h2>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                <X size={24} />
              </button>
            </div>
            
            {loading && (
              <div className="absolute inset-0 bg-white/80 dark:bg-zinc-800/80 flex items-center justify-center z-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
            
            {successMessage && (
              <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                  <p className="text-green-800 dark:text-green-200">{successMessage}</p>
                </div>
              </div>
            )}
            
            {formErrors.general && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
                  <p className="text-red-800 dark:text-red-200">{formErrors.general}</p>
                </div>
              </div>
            )}
            
            <div className="space-y-6">
              {/* Template Selection */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Select Email Template
                </label>
                <select 
                  className={`w-full p-2 border ${formErrors.template ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-600'} rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100`}
                  value={selectedTemplate}
                  onChange={handleTemplateChange}
                >
                  <option value="">Select a template</option>
                  {templates && templates.map(template => (
                    <option key={template?.id || `template-${Math.random()}`} value={template?.id}>
                      {template?.msgTemplateId || 'Untitled Template'}
                    </option>
                  ))}
                </select>
                {formErrors.template && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.template}</p>
                )}
              </div>
              
              {/* Contact Selection */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Select Contacts
                </label>
                <div className={`border ${formErrors.contacts ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-600'} rounded-md p-1 max-h-60 overflow-y-auto`}>
                  {!contacts || contacts.length === 0 ? (
                    <div className="p-4 text-center text-zinc-500 dark:text-zinc-400">
                      No contacts available
                    </div>
                  ) : (
                    contacts.map((contact, index) => {
                      // Check if contact has a valid ID
                      const contactId = contact?.id;
                      const isSelected = contactId ? selectedContacts.includes(contactId) : false;
                      
                      return (
                        <div 
                          key={contactId || `contact-${index}`} 
                          className="flex items-center p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-md cursor-pointer"
                          onClick={() => {
                            if (contactId) toggleContactSelection(contactId);
                          }}
                        >
                          <div className="flex items-center w-full">
                            <div className="mr-3">
                              <input 
                                type="checkbox" 
                                className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-600 text-primary focus:ring-primary cursor-pointer"
                                checked={isSelected}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  if (contactId) toggleContactSelection(contactId);
                                }}
                                id={`contact-checkbox-${contactId || index}`}
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                {contact?.full_name || 'Unknown'}
                              </p>
                              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                {contact?.email || 'No email'}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
                {formErrors.contacts && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.contacts}</p>
                )}
                <div className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 flex items-center">
                  <Mail size={14} className="mr-1" />
                  {selectedContacts.length} contact(s) selected
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 text-zinc-700 dark:text-zinc-300 mr-2"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCampaign}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 flex items-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Start Campaign
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 