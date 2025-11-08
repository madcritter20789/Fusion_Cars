import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Search, Trash2, Mail, Phone, CheckCircle, Clock } from 'lucide-react';
import { API_ENDPOINTS } from '../../config/api';

/**
 * Admin Contact Messages Management Page
 *
 * Manage contact form submissions with:
 * - Message list with search
 * - Message details
 * - Status management
 * - Delete functionality
 */
export default function AdminMessages() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
    if (!token) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
      fetchMessages();
    }
  }, [mounted, router]);

  useEffect(() => {
    filterMessages();
  }, [filter, searchQuery, messages]);

  const fetchMessages = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
      const res = await fetch(`${API_ENDPOINTS.adminMessages}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setMessages(data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setLoading(false);
    }
  };

  const filterMessages = () => {
    let filtered = messages;

    // Filter by status
    if (filter !== 'all') {
      filtered = filtered.filter((msg) => msg.status === filter);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (msg) =>
          msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          msg.phone.includes(searchQuery) ||
          msg.subject.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredMessages(filtered);
  };

  const updateMessageStatus = async (messageId, status) => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
      await fetch(`${API_ENDPOINTS.adminMessages}/${messageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      fetchMessages();
      if (selectedMessage?._id === messageId) {
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error('Error updating message:', error);
      alert('Failed to update message');
    }
  };

  const deleteMessage = async (messageId) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
      await fetch(`${API_ENDPOINTS.adminMessages}/${messageId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchMessages();
      setSelectedMessage(null);
      alert('Message deleted successfully');
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Failed to delete message');
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminToken');
    }
    router.push('/admin/login');
  };

  if (!mounted || !isAuthenticated || loading) {
    return (
      <div className="min-h-screen bg-primary-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Messages Management - Admin Dashboard</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-primary-black">
        {/* Header */}
        <header className="bg-primary-dark border-b border-accent-charcoal">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">Contact Messages</h1>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Messages List */}
            <div className="lg:col-span-2">
              {/* Search and Filter */}
              <div className="space-y-4 mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent-stone" />
                  <input
                    type="text"
                    placeholder="Search by name, email, phone, or subject..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-primary-dark border border-accent-charcoal text-white placeholder-accent-stone focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                  />
                </div>

                {/* Status Filter */}
                <div className="flex gap-2">
                  {['all', 'pending', 'read', 'responded'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilter(status)}
                      className={`px-4 py-2 rounded-lg transition ${
                        filter === status
                          ? 'bg-accent-silver text-primary-black'
                          : 'bg-primary-dark text-white hover:bg-accent-charcoal border border-accent-charcoal'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Messages List */}
              <div className="space-y-3">
                {filteredMessages.length > 0 ? (
                  filteredMessages.map((msg) => (
                    <motion.div
                      key={msg._id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      onClick={() => setSelectedMessage(msg)}
                      className={`p-4 rounded-lg border cursor-pointer transition ${
                        selectedMessage?._id === msg._id
                          ? 'bg-primary-dark border-gold'
                          : 'bg-primary-dark border-accent-charcoal hover:border-accent-silver'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-white font-semibold">{msg.name}</h3>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            msg.status === 'responded'
                              ? 'bg-green-600/20 text-green-300'
                              : msg.status === 'read'
                              ? 'bg-blue-600/20 text-blue-300'
                              : 'bg-yellow-600/20 text-yellow-300'
                          }`}
                        >
                          {msg.status.charAt(0).toUpperCase() + msg.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-accent-stone text-sm mb-2">{msg.subject}</p>
                      <p className="text-accent-stone text-sm line-clamp-2">{msg.message}</p>
                      <p className="text-accent-charcoal text-xs mt-2">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </p>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-accent-stone">No messages found</p>
                  </div>
                )}
              </div>
            </div>

            {/* Message Details Panel */}
            {selectedMessage ? (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-primary-dark rounded-lg p-6 border border-accent-charcoal h-fit sticky top-8"
              >
                <h2 className="text-xl font-bold text-white mb-4">Message Details</h2>

                <div className="space-y-4">
                  <div>
                    <p className="text-accent-stone text-sm">Name</p>
                    <p className="text-white font-semibold">{selectedMessage.name}</p>
                  </div>

                  <div>
                    <p className="text-accent-stone text-sm">Email</p>
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-accent-silver" />
                      <a
                        href={`mailto:${selectedMessage.email}`}
                        className="text-gold hover:text-gold-light transition"
                      >
                        {selectedMessage.email}
                      </a>
                    </div>
                  </div>

                  <div>
                    <p className="text-accent-stone text-sm">Phone</p>
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-accent-silver" />
                      <a
                        href={`tel:${selectedMessage.phone}`}
                        className="text-gold hover:text-gold-light transition"
                      >
                        {selectedMessage.phone}
                      </a>
                    </div>
                  </div>

                  <div>
                    <p className="text-accent-stone text-sm">Subject</p>
                    <p className="text-white font-semibold">{selectedMessage.subject}</p>
                  </div>

                  <div>
                    <p className="text-accent-stone text-sm">Date</p>
                    <p className="text-white">
                      {new Date(selectedMessage.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-accent-stone text-sm">Message</p>
                    <p className="text-white bg-primary-charcoal rounded p-3 mt-2">
                      {selectedMessage.message}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-accent-charcoal">
                    <p className="text-accent-stone text-sm mb-3">Status</p>
                    <div className="space-y-2">
                      <button
                        onClick={() => updateMessageStatus(selectedMessage._id, 'read')}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                      >
                        <Clock size={16} />
                        Mark as Read
                      </button>
                      <button
                        onClick={() => updateMessageStatus(selectedMessage._id, 'responded')}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm"
                      >
                        <CheckCircle size={16} />
                        Mark as Responded
                      </button>
                      <button
                        onClick={() => deleteMessage(selectedMessage._id)}
                        className="w-full px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-primary-dark rounded-lg p-6 border border-accent-charcoal h-fit sticky top-8 text-center">
                <p className="text-accent-stone">Select a message to view details</p>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-6 text-white"
            >
              <p className="text-sm opacity-90">Total Messages</p>
              <p className="text-3xl font-bold mt-2">{messages.length}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-lg p-6 text-white"
            >
              <p className="text-sm opacity-90">Pending</p>
              <p className="text-3xl font-bold mt-2">
                {messages.filter((m) => m.status === 'pending').length}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-green-600 to-green-800 rounded-lg p-6 text-white"
            >
              <p className="text-sm opacity-90">Responded</p>
              <p className="text-3xl font-bold mt-2">
                {messages.filter((m) => m.status === 'responded').length}
              </p>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
}
