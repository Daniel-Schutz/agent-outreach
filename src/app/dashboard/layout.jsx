'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Sidebar from '@/components/dashboard/Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-zinc-50 dark:bg-zinc-900">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Main content area */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
} 