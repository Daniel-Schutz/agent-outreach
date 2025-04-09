'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import accountService from '@/services/accountService';
import { Loader2, ArrowUp, ArrowDown } from 'lucide-react';

/**
 * Component that displays account usage metrics
 * Uses the global auth context to get the accountId
 */
export default function AccountUsage() {
  const { accountId } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usageData, setUsageData] = useState(null);
  const [timeframe, setTimeframe] = useState('month');
  
  useEffect(() => {
    const fetchUsageData = async () => {
      if (!accountId) {
        setError('No account ID available');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const response = await accountService.getAccountUsage(accountId, { timeframe });
        
        if (response.success) {
          setUsageData(response.data);
          setError(null);
        } else {
          setError(response.error || 'Failed to load account usage data');
        }
      } catch (err) {
        setError('An unexpected error occurred');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsageData();
  }, [accountId, timeframe]);
  
  const getPercentageColor = (percentage) => {
    if (percentage >= 90) return 'text-red-500';
    if (percentage >= 75) return 'text-amber-500';
    return 'text-green-500';
  };
  
  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };
  
  if (loading) {
    return (
      <div className="p-4 bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 flex items-center justify-center h-40">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-4 bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700">
        <div className="text-red-500 text-center py-4">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-primary text-white rounded-md text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  
  if (!usageData) {
    return (
      <div className="p-4 bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700">
        <p className="text-center py-4 text-zinc-500 dark:text-zinc-400">
          No usage data available
        </p>
      </div>
    );
  }
  
  return (
    <div className="p-4 bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Account Usage</h2>
        
        <div className="flex space-x-2">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="text-sm border border-zinc-300 dark:border-zinc-600 rounded-md px-2 py-1 bg-white dark:bg-zinc-800"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-3 bg-zinc-50 dark:bg-zinc-700 rounded-md">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Emails Sent</p>
          <p className="text-xl font-semibold mt-1">{formatNumber(usageData.emailsSent)}</p>
        </div>
        
        <div className="p-3 bg-zinc-50 dark:bg-zinc-700 rounded-md">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Open Rate</p>
          <p className="text-xl font-semibold mt-1">
            {((usageData.emailsOpened / usageData.emailsSent) * 100).toFixed(1)}%
          </p>
        </div>
        
        <div className="p-3 bg-zinc-50 dark:bg-zinc-700 rounded-md">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Reply Rate</p>
          <p className="text-xl font-semibold mt-1">
            {((usageData.emailsReplied / usageData.emailsSent) * 100).toFixed(1)}%
          </p>
        </div>
        
        <div className="p-3 bg-zinc-50 dark:bg-zinc-700 rounded-md">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Meetings Booked</p>
          <p className="text-xl font-semibold mt-1">{formatNumber(usageData.meetingsBooked)}</p>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-zinc-50 dark:bg-zinc-700 rounded-md">
        <div className="flex justify-between items-center mb-1">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Usage</p>
          <p className={`text-sm font-medium ${getPercentageColor(usageData.usagePercentage)}`}>
            {usageData.usagePercentage}%
          </p>
        </div>
        <div className="w-full bg-zinc-200 dark:bg-zinc-600 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${getPercentageColor(usageData.usagePercentage)} bg-current`}
            style={{ width: `${usageData.usagePercentage}%` }}
          ></div>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
          Period: {new Date(usageData.periodStart).toLocaleDateString()} - {new Date(usageData.periodEnd).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
} 