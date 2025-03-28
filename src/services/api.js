import axios from 'axios';

// Base URL for Anvil API from environment variable
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://outreach-agent.anvil.app/_/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to include auth token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Authentication endpoints
export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/api/auth/login', { email, password });
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Login failed',
      };
    }
  },

  logout: async () => {
    try {
      await api.post('/api/auth/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Logout failed',
      };
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post('/api/auth/register', userData);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Registration failed',
      };
    }
  },

  getCurrentUser: () => {
    const userString = localStorage.getItem('user');
    if (userString) {
      return JSON.parse(userString);
    }
    return null;
  },

  isAuthenticated: () => {
    return localStorage.getItem('token') !== null;
  },
};

// Contacts API
export const contactsService = {
  getContacts: async (params = {}) => {
    try {
      const response = await api.get('/api/get_contacts', { params });
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch contacts',
      };
    }
  },

  getContact: async (id) => {
    try {
      const response = await api.get(`/api/contacts/get_${id}`);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch contact',
      };
    }
  },

  createContact: async (contactData) => {
    try {
      const response = await api.post('/api/post_contacts', contactData);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to create contact',
      };
    }
  },

  updateContact: async (id, contactData) => {
    try {
      const response = await api.put(`/api/contacts/put_${id}`, contactData);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to update contact',
      };
    }
  },

  importContacts: async (contactsData) => {
    try {
      const response = await api.post('/api/contacts/import', contactsData);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to import contacts',
      };
    }
  },

  getContactSequences: async (contactId) => {
    try {
      const response = await api.get(`/api/contacts/${contactId}/sequences`);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch contact sequences',
      };
    }
  },
};

// Templates API
export const templatesService = {
  getTemplates: async (params = {}) => {
    try {
      const response = await api.get('/api/get_templates', { params });
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch templates',
      };
    }
  },
  
  getTemplate: async (id) => {
    try {
      const response = await api.get(`/api/templates/get_${id}`);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch template',
      };
    }
  },
  
  createTemplate: async (templateData) => {
    try {
      const response = await api.post('/api/post_templates', templateData);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to create template',
      };
    }
  },
  
  updateTemplate: async (id, templateData) => {
    try {
      const response = await api.put(`/api/templates/put_${id}`, templateData);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to update template',
      };
    }
  },
  
  previewTemplate: async (previewData) => {
    try {
      const response = await api.post('/api/templates/preview', previewData);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to preview template',
      };
    }
  },
};

// Sequences API
export const sequencesService = {
  getSequences: async (params = {}) => {
    try {
      const response = await api.get('/api/get_sequences', { params });
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch sequences',
      };
    }
  },
  
  getSequence: async (id) => {
    try {
      const response = await api.get(`/api/sequences/get_${id}`);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch sequence',
      };
    }
  },
  
  createSequence: async (sequenceData) => {
    try {
      const response = await api.post('/api/post_sequences', sequenceData);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to create sequence',
      };
    }
  },
  
  updateSequence: async (id, sequenceData) => {
    try {
      const response = await api.put(`/api/sequences/put_${id}`, sequenceData);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to update sequence',
      };
    }
  },
  
  addSequenceStep: async (sequenceId, stepData) => {
    try {
      const response = await api.post(`/api/sequences/${sequenceId}/steps`, stepData);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to add sequence step',
      };
    }
  },
  
  updateSequenceStep: async (sequenceId, stepId, stepData) => {
    try {
      const response = await api.put(`/api/sequences/${sequenceId}/steps/put_${stepId}`, stepData);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to update sequence step',
      };
    }
  },
  
  deleteSequenceStep: async (sequenceId, stepId) => {
    try {
      const response = await api.delete(`/api/sequences/${sequenceId}/steps/delete_${stepId}`);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to delete sequence step',
      };
    }
  },
  
  reorderSequenceSteps: async (sequenceId, stepOrder) => {
    try {
      const response = await api.post(`/api/sequences/${sequenceId}/reorder`, { step_order: stepOrder });
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to reorder sequence steps',
      };
    }
  },
  
  getSequenceStats: async (sequenceId) => {
    try {
      const response = await api.get(`/api/sequences/${sequenceId}/stats`);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch sequence stats',
      };
    }
  },
};

// Thread management API
export const threadsService = {
  assignContactToSequence: async (contactId, sequenceId) => {
    try {
      const response = await api.post(`/api/contacts/${contactId}/assign`, { sequence_id: sequenceId });
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to assign contact to sequence',
      };
    }
  },
  
  pauseThread: async (threadId) => {
    try {
      const response = await api.post(`/api/threads/${threadId}/pause`);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to pause thread',
      };
    }
  },
  
  resumeThread: async (threadId) => {
    try {
      const response = await api.post(`/api/threads/${threadId}/resume`);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to resume thread',
      };
    }
  },
  
  stopThread: async (threadId, reason) => {
    try {
      const response = await api.post(`/api/threads/${threadId}/stop`, { reason });
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to stop thread',
      };
    }
  },
  
  advanceThread: async (threadId, responseType) => {
    try {
      const response = await api.post(`/api/threads/${threadId}/advance`, { response_type: responseType });
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to advance thread',
      };
    }
  },
  
  markNoResponse: async (threadId) => {
    try {
      const response = await api.post(`/api/threads/${threadId}/no-response`);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to mark as no response',
      };
    }
  },
};

// Email API
export const emailService = {
  sendEmail: async (emailData) => {
    try {
      const response = await api.post('/api/emails', emailData);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to send email',
      };
    }
  },
  
  sendTestEmail: async (testEmailData) => {
    try {
      const response = await api.post('/api/emails/test', testEmailData);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to send test email',
      };
    }
  },
  
  recordEmailResponse: async (messageId, isPositive = true) => {
    try {
      const response = await api.post(`/api/emails/${messageId}/response`, { is_positive: isPositive });
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to record email response',
      };
    }
  },
};

// Meetings API
export const meetingsService = {
  getMeetings: async (daysAhead = 7) => {
    try {
      const response = await api.get('/api/get_meetings', { params: { days_ahead: daysAhead } });
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch meetings',
      };
    }
  },
  
  scheduleMeeting: async (meetingData) => {
    try {
      const response = await api.post('/api/post_meetings', meetingData);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to schedule meeting',
      };
    }
  },
  
  updateMeetingStatus: async (meetingId, statusData) => {
    try {
      const response = await api.put(`/api/meetings/put_${meetingId}`, statusData);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to update meeting status',
      };
    }
  },
};

// System settings API
export const systemService = {
  getSystemSettings: async () => {
    try {
      const response = await api.get('/api/system/get_settings');
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch system settings',
      };
    }
  },
  
  updateSystemSetting: async (settingName, settingValue) => {
    try {
      const response = await api.put('/api/system/put_settings', { 
        setting_name: settingName, 
        setting_value: settingValue 
      });
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to update system setting',
      };
    }
  },
  
  checkHealth: async () => {
    try {
      const response = await api.get('/api/system/health');
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Health check failed',
      };
    }
  },
};

// Reports API
export const reportsService = {
  getAllSequenceStats: async () => {
    try {
      const response = await api.get('/api/reports/sequences');
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch sequence stats',
      };
    }
  },
  
  getContactStats: async () => {
    try {
      const response = await api.get('/api/reports/contacts');
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch contact stats',
      };
    }
  },
  
  getPerformanceMetrics: async (days = 30, interval = 'day') => {
    try {
      const response = await api.get('/api/reports/performance', { 
        params: { days, interval } 
      });
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch performance metrics',
      };
    }
  },
};

export default api; 