'use client';

import { useAuth } from '@/context/AuthContext';

/**
 * Component that displays account information using the global auth context
 */
export default function AccountInfo() {
  const { user, accountId, userData } = useAuth();

  return (
    <div className="p-4 bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700">
      <h2 className="text-xl font-semibold mb-4">Account Information</h2>
      
      <div className="space-y-2">
        {user && (
          <>
            <div className="flex justify-between">
              <span className="text-zinc-500 dark:text-zinc-400">Account Name:</span>
              <span className="font-medium">{userData?.account_name || user.name}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-zinc-500 dark:text-zinc-400">Email:</span>
              <span className="font-medium">{userData?.account_email || user.email}</span>
            </div>
            
            {userData?.contact_person_num && (
              <div className="flex justify-between">
                <span className="text-zinc-500 dark:text-zinc-400">Contact Number:</span>
                <span className="font-medium">{userData.contact_person_num}</span>
              </div>
            )}
            
            <div className="flex justify-between">
              <span className="text-zinc-500 dark:text-zinc-400">Role:</span>
              <span className="font-medium">{user.role}</span>
            </div>
          </>
        )}
        
        <div className="flex justify-between">
          <span className="text-zinc-500 dark:text-zinc-400">Account ID:</span>
          <span className="font-mono text-sm bg-zinc-100 dark:bg-zinc-700 px-2 py-1 rounded">
            {accountId || 'Not available'}
          </span>
        </div>
      </div>
    </div>
  );
} 