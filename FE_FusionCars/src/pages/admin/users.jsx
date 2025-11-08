import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Search, Trash2, Mail, Phone, MapPin } from 'lucide-react';
import { API_ENDPOINTS } from '../../config/api';

/**
 * Admin Users Management Page
 *
 * Manage user accounts with:
 * - User list with search
 * - User details
 * - Delete functionality
 * - Status management
 */
export default function AdminUsers() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);

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
      fetchUsers();
    }
  }, [mounted, router]);

  const fetchUsers = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
      const res = await fetch(`${API_ENDPOINTS.adminUsers}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setUsers(data.data || []);
      setFilteredUsers(data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(query.toLowerCase()) ||
        user.lastName.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase()) ||
        user.phone.includes(query)
    );
    setFilteredUsers(filtered);
  };

  const deleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
      await fetch(`${API_ENDPOINTS.adminUsers}/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchUsers();
      alert('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
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
        <title>Users Management - Admin Dashboard</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-primary-black">
        {/* Header */}
        <header className="bg-primary-dark border-b border-accent-charcoal">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">Users Management</h1>
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
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent-stone" />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-primary-dark border border-accent-charcoal text-white placeholder-accent-stone focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
              />
            </div>
          </div>

          {/* Users Grid */}
          <div className="grid grid-cols-1 gap-4">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <motion.div
                  key={user._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-primary-dark rounded-lg p-6 border border-accent-charcoal hover:border-accent-silver transition"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {user.firstName} {user.lastName}
                      </h3>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-accent-stone">
                          <Mail size={16} />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-accent-stone">
                          <Phone size={16} />
                          <span>{user.phone}</span>
                        </div>
                        {user.address && (
                          <div className="flex items-center gap-2 text-accent-stone">
                            <MapPin size={16} />
                            <span>
                              {user.address}, {user.city}, {user.state}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-4 mt-4">
                        <div>
                          <p className="text-accent-stone text-sm">Joined</p>
                          <p className="text-white font-semibold">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-accent-stone text-sm">Status</p>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                              user.isActive
                                ? 'bg-green-600/20 text-green-300'
                                : 'bg-red-600/20 text-red-300'
                            }`}
                          >
                            {user.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteUser(user._id)}
                      className="p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                      title="Delete user"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-accent-stone text-lg">No users found</p>
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
              <p className="text-sm opacity-90">Total Users</p>
              <p className="text-3xl font-bold mt-2">{users.length}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-green-600 to-green-800 rounded-lg p-6 text-white"
            >
              <p className="text-sm opacity-90">Active Users</p>
              <p className="text-3xl font-bold mt-2">{users.filter((u) => u.isActive).length}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-orange-600 to-orange-800 rounded-lg p-6 text-white"
            >
              <p className="text-sm opacity-90">Inactive Users</p>
              <p className="text-3xl font-bold mt-2">{users.filter((u) => !u.isActive).length}</p>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
}
