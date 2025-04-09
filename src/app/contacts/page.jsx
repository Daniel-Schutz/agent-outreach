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
  AlertCircle,
  FileSpreadsheet
} from 'lucide-react';
import { contactsService } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import * as XLSX from 'xlsx';

export default function ContactsPage() {
  const { accountId } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isBulkImportModalOpen, setIsBulkImportModalOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Excel Import States
  const [excelData, setExcelData] = useState([]);
  const [excelFile, setExcelFile] = useState(null);
  const [importProgress, setImportProgress] = useState(0);
  const [isImporting, setIsImporting] = useState(false);
  const [importResults, setImportResults] = useState({ success: 0, failed: 0, total: 0 });
  const [importErrors, setImportErrors] = useState([]);
  
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
        console.log('Fetching contacts with account ID:', accountId);
        const response = await contactsService.getContacts();
        
        if (response.success) {
          setContacts(response.contacts || []);
          console.log('Successfully fetched contacts for account ID:', accountId);
        } else {
          setError(response.error || 'Failed to load contacts');
          console.error('Error fetching contacts for account ID:', accountId, response.error);
        }
      } catch (error) {
        setError('An unexpected error occurred');
        console.error('Error fetching contacts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [accountId]);

  // Log accountId to console when contacts page loads
  useEffect(() => {
    console.log('Contacts - Account ID:', accountId);
  }, [accountId]);

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
      console.log('Creating contact with account ID:', accountId);
      const contactData = {
        ...newContact,
        accountId // Include accountId in the contact data
      };
      
      const response = await contactsService.createContact(contactData);
      
      if (response.success) {
        // Add the new contact to the list
        setContacts([...contacts, response.contact]);
        console.log('Successfully created contact for account ID:', accountId);
        
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
        console.error('Error creating contact for account ID:', accountId, response.error);
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

  // Handle Excel file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setExcelFile(file);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Get first sheet
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        // Map data to match our contact schema
        const mappedData = jsonData.map(row => ({
          full_name: row.full_name || row.name || row.fullName || row['Full Name'] || '',
          email: row.email || row.Email || row['Email Address'] || '',
          email_confidence: row.email_confidence || row['Email Confidence'] || '',
          tags: row.tags ? (typeof row.tags === 'string' ? row.tags.split(',') : row.tags) : []
        }));
        
        setExcelData(mappedData);
      } catch (error) {
        console.error('Error parsing Excel file:', error);
        setImportErrors(['Invalid Excel file format. Please check your file and try again.']);
      }
    };
    
    reader.readAsArrayBuffer(file);
  };
  
  // Process bulk import
  const handleBulkImport = async () => {
    if (excelData.length === 0) {
      setImportErrors(['No data found in the Excel file. Please check your file and try again.']);
      return;
    }
    
    setIsImporting(true);
    setImportProgress(0);
    setImportResults({ success: 0, failed: 0, total: excelData.length });
    setImportErrors([]);
    
    const importResults = { success: 0, failed: 0, total: excelData.length };
    const errors = [];
    
    for (let i = 0; i < excelData.length; i++) {
      const contact = excelData[i];
      
      // Validate contact
      if (!contact.full_name || !contact.email) {
        importResults.failed++;
        errors.push(`Row ${i + 1}: Missing required fields (name or email)`);
        setImportProgress(Math.round(((i + 1) / excelData.length) * 100));
        setImportResults({ ...importResults });
        continue;
      }
      
      try {
        // Create contact with accountId
        const response = await contactsService.createContact({
          ...contact,
          accountId
        });
        
        if (response.success) {
          importResults.success++;
          
          // Add to contacts list if created successfully
          if (response.contact) {
            setContacts(prevContacts => [...prevContacts, response.contact]);
          }
        } else {
          importResults.failed++;
          errors.push(`Row ${i + 1} (${contact.email}): ${response.error || 'Unknown error'}`);
        }
      } catch (error) {
        importResults.failed++;
        errors.push(`Row ${i + 1} (${contact.email}): ${error.message || 'Unknown error'}`);
      }
      
      // Update progress
      setImportProgress(Math.round(((i + 1) / excelData.length) * 100));
      setImportResults({ ...importResults });
    }
    
    setImportErrors(errors);
    setIsImporting(false);
  };
  
  // Reset import state
  const resetImport = () => {
    setExcelData([]);
    setExcelFile(null);
    setImportProgress(0);
    setImportResults({ success: 0, failed: 0, total: 0 });
    setImportErrors([]);
  };
  
  // Close import modal and reset state
  const closeBulkImportModal = () => {
    setIsBulkImportModalOpen(false);
    resetImport();
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
            
            <div className="flex space-x-2">
              <button
                onClick={() => setIsBulkImportModalOpen(true)}
                className="flex items-center px-4 py-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors"
              >
                <FileSpreadsheet size={18} className="mr-2" />
                Bulk Import
              </button>
              
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                <PlusCircle size={18} className="mr-2" />
                New Contact
              </button>
            </div>
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
      
      {/* Bulk Import Modal */}
      {isBulkImportModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-700">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Bulk Import Contacts</h2>
              <button 
                onClick={closeBulkImportModal}
                className="text-zinc-400 hover:text-zinc-500 dark:text-zinc-500 dark:hover:text-zinc-400"
                disabled={isImporting}
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 130px)' }}>
              {!excelFile ? (
                <div className="text-center">
                  <FileSpreadsheet className="h-16 w-16 text-zinc-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">Upload Excel File</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                    Upload an Excel file with contact information. The file should have columns for name and email at minimum.
                  </p>
                  
                  <div className="flex flex-col items-center space-y-4">
                    <label 
                      htmlFor="excel-upload" 
                      className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors cursor-pointer"
                    >
                      Choose Excel File
                    </label>
                    <input 
                      id="excel-upload" 
                      type="file" 
                      accept=".xlsx,.xls,.csv" 
                      onChange={handleFileUpload} 
                      className="hidden"
                    />
                    
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Supported formats: .xlsx, .xls, .csv
                    </p>
                  </div>
                </div>
              ) : excelData.length > 0 && !isImporting && importResults.total === 0 ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                      {excelData.length} contacts found
                    </h3>
                    <button
                      onClick={resetImport}
                      className="text-primary hover:text-primary/80 text-sm"
                    >
                      Change File
                    </button>
                  </div>
                  
                  <div className="border border-zinc-200 dark:border-zinc-700 rounded-md overflow-hidden mb-6">
                    <div className="max-h-60 overflow-y-auto">
                      <table className="w-full">
                        <thead className="bg-zinc-50 dark:bg-zinc-700/50 sticky top-0">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">Name</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">Email</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                          {excelData.slice(0, 10).map((contact, index) => (
                            <tr key={index} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/80">
                              <td className="px-4 py-2 text-sm text-zinc-900 dark:text-zinc-100">{contact.full_name}</td>
                              <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-300">{contact.email}</td>
                            </tr>
                          ))}
                          {excelData.length > 10 && (
                            <tr>
                              <td colSpan="2" className="px-4 py-2 text-sm text-zinc-500 dark:text-zinc-400 text-center italic">
                                ...and {excelData.length - 10} more contacts
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-md mb-6">
                    <p className="text-sm text-zinc-700 dark:text-zinc-300">
                      <AlertCircle size={16} className="inline-block mr-2 text-amber-500" />
                      Each contact will be created individually. This process may take some time depending on the number of contacts.
                    </p>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={closeBulkImportModal}
                      className="px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleBulkImport}
                      className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                    >
                      Start Import
                    </button>
                  </div>
                </div>
              ) : isImporting || importResults.total > 0 ? (
                <div>
                  <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-4">
                    {isImporting ? 'Importing Contacts...' : 'Import Complete'}
                  </h3>
                  
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-zinc-600 dark:text-zinc-400 mb-1">
                      <span>{isImporting ? `${importProgress}% complete` : 'Completed'}</span>
                      <span>{importResults.success} of {importResults.total} contacts</span>
                    </div>
                    <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2.5">
                      <div 
                        className="bg-primary h-2.5 rounded-full" 
                        style={{ width: `${importProgress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 mb-6">
                    <div className="flex items-center">
                      <CheckCircle size={16} className="text-green-500 mr-2" />
                      <span className="text-zinc-700 dark:text-zinc-300">
                        {importResults.success} contacts successfully imported
                      </span>
                    </div>
                    
                    {importResults.failed > 0 && (
                      <div className="flex items-center">
                        <XCircle size={16} className="text-red-500 mr-2" />
                        <span className="text-zinc-700 dark:text-zinc-300">
                          {importResults.failed} contacts failed to import
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {importErrors.length > 0 && !isImporting && (
                    <div className="mb-6">
                      <h4 className="text-md font-medium text-zinc-900 dark:text-zinc-100 mb-2">Errors</h4>
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3 max-h-40 overflow-y-auto">
                        <ul className="list-disc list-inside text-sm text-red-700 dark:text-red-300">
                          {importErrors.map((error, index) => (
                            <li key={index}>{error}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-end">
                    {isImporting ? (
                      <button
                        disabled
                        className="px-4 py-2 bg-zinc-300 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 rounded-md cursor-not-allowed"
                      >
                        <Loader2 size={16} className="inline mr-2 animate-spin" />
                        Importing...
                      </button>
                    ) : (
                      <button
                        onClick={closeBulkImportModal}
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                      >
                        Done
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">No valid data found</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                    The uploaded file does not contain valid contact data. Please check your file format and try again.
                  </p>
                  <button
                    onClick={resetImport}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 