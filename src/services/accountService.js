import { api } from './api';

/**
 * Account service for managing account-specific operations
 */
const accountService = {
  /**
   * Get account details from the API
   * 
   * @param {string} accountId - The ID of the account to fetch
   * @returns {Promise<Object>} Account data or error object
   */
  getAccountDetails: async (accountId) => {
    try {
      if (!accountId) {
        throw new Error('Account ID is required');
      }
      
      const response = await api.get(`/api/accounts/${accountId}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching account details:', error);
      
      // For development/testing - return mock data
      if (process.env.NODE_ENV === 'development') {
        return {
          success: true,
          data: {
            id: accountId,
            name: 'Demo Account',
            plan: 'Professional',
            status: 'active',
            createdAt: '2023-01-15T12:00:00Z',
            updatedAt: '2023-08-20T14:30:00Z',
            features: {
              maxUsers: 10,
              maxCampaigns: 50,
              maxContacts: 10000,
              aiEnabled: true
            }
          }
        };
      }
      
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch account details'
      };
    }
  },
  
  /**
   * Update account settings
   * 
   * @param {string} accountId - The ID of the account to update
   * @param {Object} settings - The settings to update
   * @returns {Promise<Object>} Success status and updated data or error
   */
  updateAccountSettings: async (accountId, settings) => {
    try {
      if (!accountId) {
        throw new Error('Account ID is required');
      }
      
      const response = await api.put(`/api/accounts/${accountId}/settings`, settings);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error updating account settings:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to update account settings'
      };
    }
  },
  
  /**
   * Get account usage metrics
   * 
   * @param {string} accountId - The ID of the account
   * @param {Object} options - Query options like timeframe
   * @returns {Promise<Object>} Account usage data or error
   */
  getAccountUsage: async (accountId, options = {}) => {
    try {
      if (!accountId) {
        throw new Error('Account ID is required');
      }
      
      const { timeframe = 'month' } = options;
      const response = await api.get(`/api/accounts/${accountId}/usage?timeframe=${timeframe}`);
      
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching account usage:', error);
      
      // For development/testing - return mock data
      if (process.env.NODE_ENV === 'development') {
        return {
          success: true,
          data: {
            emailsSent: 2450,
            emailsOpened: 1830,
            emailsClicked: 612,
            emailsReplied: 325,
            meetingsBooked: 42,
            contactsAdded: 580,
            usagePercentage: 68,
            periodStart: '2023-08-01T00:00:00Z',
            periodEnd: '2023-08-31T23:59:59Z'
          }
        };
      }
      
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch account usage'
      };
    }
  }
};

export default accountService; 