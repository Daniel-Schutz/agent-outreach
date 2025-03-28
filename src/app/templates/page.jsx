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
  Copy,
  Star,
  StarOff,
  Eye,
  FileText,
  AlertCircle,
  Loader2,
  X
} from 'lucide-react';
import { templatesService } from '@/services/api';

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Form state for new template
  const [newTemplate, setNewTemplate] = useState({
    msgTemplateId: '',
    msg_subject: '',
    msg_body: ''
  });

  // Form error handling
  const [formErrors, setFormErrors] = useState({});

  // Navigation
  const navigation = [
    { name: 'Dashboard', icon: <BarChart3 size={20} />, href: '/dashboard' },
    { name: 'Campaigns', icon: <Mail size={20} />, href: '/campaigns' },
    { name: 'Contacts', icon: <Users size={20} />, href: '/contacts' },
    { name: 'Templates', icon: <MessageSquare size={20} />, href: '/templates' },
    { name: 'Calendar', icon: <Calendar size={20} />, href: '/calendar' },
    { name: 'Settings', icon: <Settings size={20} />, href: '/settings' }
  ];

  // Fetch templates from API
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoading(true);
        const response = await templatesService.getTemplates();
        if (response.success) {
          setTemplates(response.templates || []);
        } else {
          setError(response.error || 'Failed to load templates');
        }
      } catch (error) {
        setError('An unexpected error occurred');
        console.error('Error fetching templates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  // Filter templates based on search query
  const filteredTemplates = templates.filter(template => {
    // Ignore undefined or null templates
    if (!template) return false;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        template.msgTemplateId?.toLowerCase().includes(query) ||
        template.msg_subject?.toLowerCase().includes(query) ||
        template.msg_body?.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  // Toggle favorite status
  const toggleFavorite = async (id) => {
    try {
      const template = templates.find(t => t.id === id);
      if (!template) return;
      
      const updatedTemplate = {
        ...template,
        isFavorite: !template.isFavorite
      };
      
      const response = await templatesService.updateTemplate(id, updatedTemplate);
      
      if (response.success) {
        setTemplates(templates.map(t => 
          t.id === id ? { ...t, isFavorite: !t.isFavorite } : t
        ));
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  // Handle creating a new template
  const handleCreateTemplate = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = {};
    if (!newTemplate.msgTemplateId.trim()) errors.msgTemplateId = 'Template ID is required';
    if (!newTemplate.msg_subject.trim()) errors.msg_subject = 'Subject is required';
    if (!newTemplate.msg_body.trim()) errors.msg_body = 'Body is required';
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    try {
      const templateData = {
        msgTemplateId: newTemplate.msgTemplateId,
        msg_subject: newTemplate.msg_subject,
        msg_body: newTemplate.msg_body
      };
      
      const response = await templatesService.createTemplate(templateData);
      
      if (response.success) {
        // Add the new template to the list
        setTemplates([...templates, response.template]);
        
        // Close modal and reset form
        setIsCreateModalOpen(false);
        setNewTemplate({
          msgTemplateId: '',
          msg_subject: '',
          msg_body: ''
        });
        setFormErrors({});
      } else {
        setFormErrors({ general: response.error || 'Failed to create template' });
      }
    } catch (error) {
      setFormErrors({ general: 'An unexpected error occurred' });
      console.error('Error creating template:', error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTemplate({ ...newTemplate, [name]: value });
    
    // Clear field-specific error when user types
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: undefined });
    }
  };
  
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-6 border-b border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Email Templates</h1>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 dark:text-zinc-500" size={18} />
              <input
                type="text"
                placeholder="Search templates..."
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
              New Template
            </button>
          </div>
        </header>
        
        {/* Templates Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Failed to load templates</h3>
                <p className="text-zinc-600 dark:text-zinc-400 mt-2">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : filteredTemplates.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <FileText className="h-12 w-12 text-zinc-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">No templates found</h3>
                <p className="text-zinc-600 dark:text-zinc-400 mt-2">
                  {searchQuery 
                    ? `No results for "${searchQuery}"`
                    : 'Get started by creating your first email template'}
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setIsCreateModalOpen(true);
                  }} 
                  className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                >
                  Create New Template
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <div 
                  key={template?.id || `temp-${Math.random()}`} 
                  className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-5 border-b border-zinc-200 dark:border-zinc-700">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-50 line-clamp-1">
                          {template?.msgTemplateId || 'Untitled Template'}
                        </h3>
                      </div>
                      <button
                        onClick={() => toggleFavorite(template?.id)}
                        className="text-zinc-400 hover:text-amber-500 dark:text-zinc-500 dark:hover:text-amber-400 transition-colors"
                      >
                        {template?.isFavorite ? (
                          <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                        ) : (
                          <StarOff className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="mb-4">
                      <h4 className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                        Subject
                      </h4>
                      <p className="text-sm text-zinc-700 dark:text-zinc-300 line-clamp-1">
                        {template?.msg_subject || 'No subject'}
                      </p>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                        Body Preview
                      </h4>
                      <p className="text-sm text-zinc-700 dark:text-zinc-300 line-clamp-3 whitespace-pre-line">
                        {template?.msg_body || 'No body content'}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 pt-4 border-t border-zinc-200 dark:border-zinc-700">
                      <div>
                        Last modified: {formatDate(template?.lastModified)}
                      </div>
                      
                      <div className="flex">
                        <button className="p-1 hover:text-primary transition-colors">
                          <Eye size={16} />
                        </button>
                        <button className="p-1 ml-1 hover:text-primary transition-colors">
                          <Edit size={16} />
                        </button>
                        <button className="p-1 ml-1 hover:text-primary transition-colors">
                          <Copy size={16} />
                        </button>
                        <button className="p-1 ml-1 hover:text-red-500 transition-colors">
                          <Trash size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Create Template Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-700">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Create New Template</h2>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-500 dark:text-zinc-500 dark:hover:text-zinc-400"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 130px)' }}>
              <form onSubmit={handleCreateTemplate}>
                {formErrors.general && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-800 rounded-md">
                    {formErrors.general}
                  </div>
                )}
                
                <div className="mb-4">
                  <label htmlFor="msgTemplateId" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Template ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="msgTemplateId"
                    name="msgTemplateId"
                    value={newTemplate.msgTemplateId}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border ${formErrors.msgTemplateId ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-600'} rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary`}
                  />
                  {formErrors.msgTemplateId && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.msgTemplateId}</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="msg_subject" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Email Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="msg_subject"
                    name="msg_subject"
                    value={newTemplate.msg_subject}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border ${formErrors.msg_subject ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-600'} rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary`}
                  />
                  {formErrors.msg_subject && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.msg_subject}</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="msg_body" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Email Body <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="msg_body"
                    name="msg_body"
                    value={newTemplate.msg_body}
                    onChange={handleInputChange}
                    rows={8}
                    className={`w-full px-3 py-2 border ${formErrors.msg_body ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-600'} rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary`}
                  ></textarea>
                  {formErrors.msg_body && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.msg_body}</p>
                  )}
                  <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                    Use variables like {'{{first_name}}'}, {'{{company}}'}, etc. They will be automatically replaced with contact information.
                  </p>
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
                    Create Template
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