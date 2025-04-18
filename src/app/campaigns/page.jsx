'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  Mail,
  ChevronLeft,
  Plus,
  Trash2
} from 'lucide-react';
import { templatesService, contactsService, emailService, campaignsService, sequencesService } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import Sidebar from '@/components/dashboard/Sidebar';

export default function CampaignsPage() {
  const { accountId } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Campaigns data
  const [campaigns, setCampaigns] = useState([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState(true);
  const [campaignsError, setCampaignsError] = useState(null);
  
  // Form state for new sequence
  const [newSequence, setNewSequence] = useState({
    sequence_name: '',
    sequence_desc: ''
  });

  // New state for sequence steps (emails)
  const [sequenceSteps, setSequenceSteps] = useState([
    { template_id: '', send_after_days: 0 }
  ]);

  // Fetch campaigns when component mounts
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoadingCampaigns(true);
        console.log('Fetching sequences with account ID:', accountId);
        
        // Get API URL from environment or use default
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://outreach-agent.anvil.app/_/api';
        
        // Make direct fetch request to API
        const response = await fetch(`${API_URL}/api/get_sequences?accountId=${accountId}`);
        const data = await response.json();
        
        console.log('API Response:', data);
        
        if (data.success) {
          // Ensure sequences is an array, even if the API returns null or undefined
          const sequences = Array.isArray(data.sequences) ? 
            data.sequences.filter(seq => seq !== undefined) : [];
          
          console.log('Filtered sequences:', sequences);
          setCampaigns(sequences);
          console.log('Successfully fetched sequences for account ID:', accountId);
        } else {
          setCampaignsError(data.error || 'Failed to load sequences');
          console.error('Error fetching sequences for account ID:', accountId, data.error);
        }
      } catch (error) {
        setCampaignsError('An unexpected error occurred');
        console.error('Error fetching sequences:', error);
      } finally {
        setLoadingCampaigns(false);
      }
    };

    fetchCampaigns();
  }, [accountId]);

  // Fetch templates and contacts when modal opens
  useEffect(() => {
    if (isCreateModalOpen) {
      fetchTemplatesAndContacts();
    }
  }, [isCreateModalOpen, accountId]);

  // Fetch templates and contacts
  const fetchTemplatesAndContacts = async () => {
    setLoading(true);
    try {
      // Get API URL from environment or use default
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://outreach-agent.anvil.app/_/api';
      
      // Fetch templates
      const templatesResponse = await fetch(`${API_URL}/api/get_templates?accountId=${accountId}`);
      const templatesData = await templatesResponse.json();
      
      if (templatesData.success) {
        setTemplates(templatesData.templates || []);
      }
      
      // Fetch contacts
      const contactsResponse = await fetch(`${API_URL}/api/get_contacts?accountId=${accountId}`);
      const contactsData = await contactsResponse.json();
      
      if (contactsData.success) {
        setContacts(contactsData.contacts || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle contact selection/deselection
  const toggleContactSelection = (contactId) => {
    if (!contactId) {
      console.log('Contact without valid ID');
      return;
    }
    
    console.log('Selecting contact:', contactId);
    
    setSelectedContacts(prevSelected => {
      if (prevSelected.includes(contactId)) {
        return prevSelected.filter(id => id !== contactId);
      } else {
        return [...prevSelected, contactId];
      }
    });
    
    // Clear contact selection error
    if (formErrors.contacts) {
      setFormErrors(prev => ({ ...prev, contacts: undefined }));
    }
  };

  // Handle template selection for a specific step
  const handleTemplateChange = (e, index) => {
    const newSteps = [...sequenceSteps];
    newSteps[index].template_id = e.target.value;
    setSequenceSteps(newSteps);
    
    // Clear template selection error
    if (formErrors.template) {
      setFormErrors(prev => ({ ...prev, template: undefined }));
    }
  };

  // Handle days input for a specific step
  const handleDaysChange = (e, index) => {
    const newSteps = [...sequenceSteps];
    newSteps[index].send_after_days = parseInt(e.target.value) || 0;
    setSequenceSteps(newSteps);
  };

  // Add a new sequence step
  const addSequenceStep = () => {
    setSequenceSteps([...sequenceSteps, { template_id: '', send_after_days: 0 }]);
  };

  // Remove a sequence step
  const removeSequenceStep = (index) => {
    if (sequenceSteps.length > 1) {
      const newSteps = [...sequenceSteps];
      newSteps.splice(index, 1);
      setSequenceSteps(newSteps);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSequence({ ...newSequence, [name]: value });
    
    // Clear field-specific error when user types
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: undefined });
    }
  };

  // Handle campaign creation
  const handleCreateCampaign = async () => {
    // Validate form
    const errors = {};
    if (selectedContacts.length === 0) errors.contacts = 'Please select at least one contact';
    if (!newSequence.sequence_name.trim()) errors.sequence_name = 'Sequence name is required';
    
    // Validate sequence steps
    let hasValidStep = false;
    sequenceSteps.forEach((step, index) => {
      if (step.template_id) hasValidStep = true;
    });
    
    if (!hasValidStep) errors.template = 'Please select at least one template';
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setLoading(true);
    try {
      // Prepare data for API
      const templates_id = sequenceSteps
        .filter(step => step.template_id)
        .map(step => step.template_id);
      
      const send_after_days = sequenceSteps
        .filter(step => step.template_id)
        .map(step => step.send_after_days);
      
      // Get API URL from environment or use default
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://outreach-agent.anvil.app/_/api';
      
      // Create request payload
      const payload = {
        accountId,
        contacts_id: selectedContacts,
        template_id: templates_id,
        send_after_days: send_after_days,
        sequence_name: newSequence.sequence_name,
        sequence_desc: newSequence.sequence_desc
      };
      
      console.log('Sending sequence data:', payload);
      
      // Make direct fetch request to API
      const response = await fetch(`${API_URL}/api/post_sequences`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Show success message
        setSuccessMessage('Sequence started successfully! Emails are being created.');
        
        // Add the new campaign to the list
        if (data.sequence) {
          setCampaigns(prevCampaigns => [...prevCampaigns, data.sequence]);
        }
        
        // Reset form after short delay
        setTimeout(() => {
          setIsCreateModalOpen(false);
          setSequenceSteps([{ template_id: '', send_after_days: 0 }]);
          setSelectedContacts([]);
          setNewSequence({
            sequence_name: '',
            sequence_desc: ''
          });
          setFormErrors({});
          setSuccessMessage('');
        }, 2000);
      } else {
        setFormErrors({ general: data.error || 'Failed to create sequence. Please try again.' });
      }
    } catch (error) {
      console.error('Error creating sequence:', error);
      setFormErrors({ general: 'An unexpected error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Filter campaigns based on search query
  const filteredCampaigns = searchQuery
    ? campaigns.filter(campaign => 
        campaign.sequence_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.sequence_desc?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : campaigns;

  // Log accountId to console when sequences page loads
  useEffect(() => {
    console.log('Sequences - Account ID:', accountId);
  }, [accountId]);

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-6 border-b border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
              Sequences
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 dark:text-zinc-500" size={18} />
              <input
                type="text"
                placeholder="Search sequences..."
                className="pl-10 pr-4 py-2 border border-zinc-200 dark:border-zinc-700 rounded-md bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              <PlusCircle size={18} className="mr-2" />
              New Sequence
            </button>
          </div>
        </header>
        
        {/* Campaigns list */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="bg-white dark:bg-zinc-800 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700">
            <div className="overflow-x-auto">
              {loadingCampaigns ? (
                <div className="flex justify-center items-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
                  <p className="text-zinc-600 dark:text-zinc-400">Loading sequences...</p>
                </div>
              ) : campaignsError ? (
                <div className="p-8 text-center">
                  <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <p className="text-red-500">{campaignsError}</p>
                </div>
              ) : campaigns.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-zinc-600 dark:text-zinc-400">No sequences found.</p>
                  <button 
                    onClick={() => setIsCreateModalOpen(true)}
                    className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                  >
                    Create First Sequence
                  </button>
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                        Sequence Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                        Model Instructions
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                    {filteredCampaigns.filter(campaign => campaign !== undefined).map((campaign) => (
                      <tr 
                        key={campaign.sequenceId || `seq-${Math.random()}`} 
                        className="hover:bg-zinc-50 dark:hover:bg-zinc-800/80 cursor-pointer"
                        onClick={() => router.push(`/sequences/${campaign.sequenceId}`)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                {campaign.sequence_name || 'Unnamed Sequence'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-zinc-700 dark:text-zinc-300">
                            {campaign.sequence_desc || 'No description available'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <button 
                              className="p-1 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle edit action
                              }}
                            >
                              <Edit size={18} />
                            </button>
                            <button 
                              className="p-1 text-zinc-500 hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle delete action
                              }}
                            >
                              <Trash size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </main>
        
        {/* Create Campaign Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg w-full max-w-3xl overflow-y-auto max-h-[90vh]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Create New Sequence</h2>
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
                {/* Sequence Name */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Sequence Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="sequence_name"
                    value={newSequence.sequence_name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border ${formErrors.sequence_name ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-600'} rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary`}
                    placeholder="Enter sequence name"
                  />
                  {formErrors.sequence_name && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.sequence_name}</p>
                  )}
                </div>
                
                {/* Sequence Description */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Model Instructions
                  </label>
                  <textarea
                    name="sequence_desc"
                    value={newSequence.sequence_desc}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter instructions for the AI to follow when creating emails"
                  ></textarea>
                </div>
                
                {/* Contact Selection */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Select Contacts <span className="text-red-500">*</span>
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
                            onClick={() => toggleContactSelection(contactId)}
                          >
                            <div className="flex items-center w-full">
                              <div className="mr-3" onClick={(e) => e.stopPropagation()}>
                                <input 
                                  type="checkbox" 
                                  className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-600 text-primary focus:ring-primary cursor-pointer"
                                  checked={isSelected}
                                  onChange={(e) => toggleContactSelection(contactId)}
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
                
                {/* Sequence Steps (Email Templates and Timing) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Email Sequence <span className="text-red-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={addSequenceStep}
                      className="text-primary hover:text-primary/80 flex items-center text-sm font-medium"
                    >
                      <Plus size={16} className="mr-1" />
                      Add Email
                    </button>
                  </div>
                  
                  {formErrors.template && (
                    <p className="mb-2 text-sm text-red-500">{formErrors.template}</p>
                  )}
                  
                  <div className="space-y-3">
                    {sequenceSteps.map((step, index) => (
                      <div 
                        key={index}
                        className="flex items-start space-x-3 p-3 bg-zinc-50 dark:bg-zinc-700/50 rounded-md"
                      >
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            <span className="bg-primary/10 text-primary text-xs font-medium rounded-full px-2 py-0.5 mr-2">
                              Email {index + 1}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-12 gap-3">
                            <div className="col-span-8">
                              <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                                Template
                              </label>
                              <select 
                                className="w-full p-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm"
                                value={step.template_id}
                                onChange={(e) => handleTemplateChange(e, index)}
                              >
                                <option value="">Select a template</option>
                                {templates && templates.map(template => (
                                  <option key={template?.msgTemplateId || `template-${Math.random()}`} value={template?.msgTemplateId}>
                                    {template?.templateName || 'Untitled Template'}
                                  </option>
                                ))}
                              </select>
                            </div>
                            
                            <div className="col-span-4">
                              <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                                Send after (days)
                              </label>
                              <input
                                type="number"
                                min="0"
                                className="w-full p-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm"
                                value={step.send_after_days}
                                onChange={(e) => handleDaysChange(e, index)}
                              />
                            </div>
                          </div>
                        </div>
                        
                        <button
                          type="button"
                          onClick={() => removeSequenceStep(index)}
                          className="mt-7 text-zinc-400 hover:text-red-500 dark:text-zinc-500 dark:hover:text-red-400 p-1 rounded-full"
                          disabled={sequenceSteps.length <= 1}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
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
                      Start Sequence
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 