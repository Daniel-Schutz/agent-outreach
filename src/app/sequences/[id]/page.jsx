'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Loader2, 
  AlertCircle,
  Calendar,
  Mail,
  MessageSquare,
  Clock,
  X
} from 'lucide-react';
import { campaignsService } from '@/services/api';
import { useAuth } from '@/context/AuthContext';

export default function SequenceDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { accountId } = useAuth();
  
  const [sequence, setSequence] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false);

  useEffect(() => {
    const fetchSequenceMessages = async () => {
      try {
        setLoading(true);
        console.log('Fetching messages for sequence ID:', id);
        
        const response = await campaignsService.getSequenceMessages(id);
        
        console.log('API Response:', response);
        
        if (response.success) {
          // Ensure messages is an array
          const messagesList = Array.isArray(response.messages) ? 
            response.messages.filter(msg => msg !== undefined) : [];
          
          setMessages(messagesList);
          
          // If we have sequence data in the response, set it
          if (response.sequence) {
            setSequence(response.sequence);
          }
          
          console.log('Successfully fetched messages for sequence ID:', id);
        } else {
          setError(response.error || 'Failed to load messages');
          console.error('Error fetching messages for sequence ID:', id, response.error);
        }
      } catch (error) {
        setError('An unexpected error occurred');
        console.error('Error fetching sequence messages:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSequenceMessages();
    }
  }, [id, accountId]);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch (e) {
      return dateString;
    }
  };

  // Handle showing message details
  const handleShowMessageDetails = (message) => {
    setSelectedMessage(message);
    setShowMessageModal(true);
  };

  return (
    <div>
      {/* Page header */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => router.back()}
          className="mr-4 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          {sequence?.sequence_name || `Sequence #${id}`}
        </h1>
      </div>
      
      {/* Sequence details card */}
      {sequence && (
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 p-4 mb-6">
          <h2 className="text-lg font-medium mb-2">Sequence Details</h2>
          <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
            <p><strong>Description:</strong> {sequence.sequence_desc || 'No description'}</p>
          </div>
        </div>
      )}
      
      {/* Messages list */}
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 overflow-hidden">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-700">
          <h2 className="text-lg font-medium">Messages</h2>
        </div>
        
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
              <p className="text-zinc-600 dark:text-zinc-400">Loading messages...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <p className="text-red-500">{error}</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="p-8 text-center">
              <MessageSquare className="h-8 w-8 text-zinc-400 mx-auto mb-2" />
              <p className="text-zinc-600 dark:text-zinc-400">No messages found for this sequence.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-700">
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Message ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Thread ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    To
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    From
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Body
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Sent Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                {messages.map((message, index) => (
                  <tr 
                    key={message.messageId || `msg-${index}`}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-800/80"
                  >
                    <td className="px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100">
                      {message.messageId || 'N/A'}
                    </td>
                    <td className="px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100">
                      {message.threadId || 'N/A'}
                    </td>
                    <td className="px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100">
                      {message.msg_to || 'N/A'}
                    </td>
                    <td className="px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100">
                      {message.msg_from || 'N/A'}
                    </td>
                    <td className="px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100">
                      {message.subject || 'N/A'}
                    </td>
                    <td 
                      className="px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 truncate max-w-xs cursor-pointer hover:text-primary hover:underline"
                      onClick={() => handleShowMessageDetails(message)}
                    >
                      {message.body || 'No content'}
                    </td>
                    <td className="px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100">
                      {formatDate(message.send_date)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      
      {/* Message Details Modal */}
      {showMessageModal && selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Message Details</h3>
              <button 
                onClick={() => setShowMessageModal(false)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">Subject</h4>
                <p className="text-zinc-900 dark:text-zinc-100">{selectedMessage.subject || 'N/A'}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">From</h4>
                <p className="text-zinc-900 dark:text-zinc-100">{selectedMessage.msg_from || 'N/A'}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">To</h4>
                <p className="text-zinc-900 dark:text-zinc-100">{selectedMessage.msg_to || 'N/A'}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">Date</h4>
                <p className="text-zinc-900 dark:text-zinc-100">{formatDate(selectedMessage.send_date)}</p>
              </div>
              
              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700">
                <h4 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2">Message Body</h4>
                <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-md whitespace-pre-wrap text-zinc-900 dark:text-zinc-100 text-sm">
                  {selectedMessage.body || 'No content'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 