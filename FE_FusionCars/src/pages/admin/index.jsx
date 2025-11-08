import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import {
  Car,
  Users,
  Calendar,
  TrendingUp,
  DollarSign,
  Star,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  BarChart3,
} from 'lucide-react';
import { API_ENDPOINTS } from '../../config/api';

/**
 * Admin Dashboard
 *
 * Comprehensive admin panel for managing the Fusion Cars platform
 * Features:
 * - Real-time statistics and analytics
 * - Car listing management (CRUD operations)
 * - User management
 * - Booking management
 * - Review moderation
 */

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [cars, setCars] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted (client-side only)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check authentication
  useEffect(() => {
    if (!mounted) return;

    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
    if (!token) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
      fetchDashboardData();
    }
  }, [mounted, router]);

  const fetchDashboardData = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
      if (!token) return;

      // Fetch stats
      const statsRes = await fetch(API_ENDPOINTS.adminDashboard, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const statsData = await statsRes.json();
      setStats(statsData);

      // Fetch cars
      const carsRes = await fetch(`${API_ENDPOINTS.cars}?limit=10`);
      const carsData = await carsRes.json();
      setCars(carsData.data || []);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminToken');
    }
    router.push('/admin/login');
  };

  const deleteCar = async (carId) => {
    if (!confirm('Are you sure you want to delete this car?')) return;

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
      await fetch(`${API_ENDPOINTS.adminCars}/${carId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Refresh data
      fetchDashboardData();
      alert('Car deleted successfully');
    } catch (error) {
      console.error('Error deleting car:', error);
      alert('Failed to delete car');
    }
  };

  const toggleFeatured = async (carId) => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
      await fetch(`${API_ENDPOINTS.adminCars}/${carId}/featured`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Refresh data
      fetchDashboardData();
    } catch (error) {
      console.error('Error toggling featured:', error);
    }
  };

  // Don't render until mounted (prevent hydration mismatch)
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
        <title>Admin Dashboard - Fusion Cars</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-primary-black">
        {/* Header */}
        <header className="bg-primary-dark border-b border-accent-charcoal">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">Fusion Cars Admin</h1>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="bg-primary-dark border-b border-accent-charcoal">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              {['overview', 'cars', 'bookings', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 border-b-2 transition ${
                    activeTab === tab
                      ? 'border-accent-silver text-white'
                      : 'border-transparent text-accent-stone hover:text-white'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
              <button
                onClick={() => router.push('/admin/users')}
                className="py-4 px-2 border-b-2 border-transparent text-accent-stone hover:text-white transition"
              >
                Users
              </button>
              <button
                onClick={() => router.push('/admin/messages')}
                className="py-4 px-2 border-b-2 border-transparent text-accent-stone hover:text-white transition"
              >
                Messages
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'overview' && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                  icon={Car}
                  title="Total Cars"
                  value={stats?.overview?.totalCars || 0}
                  subtitle={`${stats?.overview?.availableCars || 0} available`}
                  color="blue"
                />
                <StatCard
                  icon={DollarSign}
                  title="Revenue (30d)"
                  value={`₹${((stats?.sales?.last30DaysRevenue || 0) / 100000).toFixed(1)}L`}
                  subtitle={`${stats?.sales?.recentSales?.length || 0} sales`}
                  color="green"
                />
                <StatCard
                  icon={Users}
                  title="Total Users"
                  value={stats?.overview?.totalUsers || 0}
                  subtitle="Registered customers"
                  color="purple"
                />
                <StatCard
                  icon={Calendar}
                  title="Bookings"
                  value={stats?.overview?.totalBookings || 0}
                  subtitle={`${stats?.overview?.pendingBookings || 0} pending`}
                  color="orange"
                />
              </div>

              {/* Recent Sales */}
              <div className="bg-primary-dark rounded-lg p-6 border border-accent-charcoal">
                <h2 className="text-xl font-bold text-white mb-4">Recent Sales</h2>
                <div className="space-y-3">
                  {stats?.sales?.recentSales?.slice(0, 5).map((sale) => (
                    <div
                      key={sale._id}
                      className="flex justify-between items-center p-3 bg-primary-charcoal rounded-lg"
                    >
                      <div>
                        <p className="text-white font-semibold">{sale.name}</p>
                        <p className="text-sm text-accent-stone">
                          {new Date(sale.soldDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-accent-silver font-bold">₹{(sale.price / 100000).toFixed(2)}L</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'cars' && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Car Listings</h2>
                <button
                  onClick={() => router.push('/admin/cars/create')}
                  className="flex items-center gap-2 px-4 py-2 bg-accent-silver text-primary-black rounded-lg hover:bg-neutral-light transition"
                >
                  <Plus size={20} />
                  Add New Car
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {cars.map((car) => (
                  <div
                    key={car._id}
                    className="bg-primary-dark rounded-lg p-6 border border-accent-charcoal"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                        <img
                          src={car.image || 'https://via.placeholder.com/150'}
                          alt={car.name}
                          className="w-32 h-24 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="text-xl font-bold text-white">{car.name}</h3>
                          <p className="text-accent-stone">
                            {car.year} | {car.fuelType} | {car.transmission}
                          </p>
                          <p className="text-accent-silver font-bold mt-2">
                            ₹{(car.price / 100000).toFixed(2)} Lakh
                          </p>
                          {car.featured && (
                            <span className="inline-block mt-2 px-2 py-1 bg-yellow-600 text-white text-xs rounded">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleFeatured(car._id)}
                          className="p-2 bg-primary-charcoal text-accent-silver rounded-lg hover:bg-accent-charcoal transition"
                          title="Toggle Featured"
                        >
                          <Star size={20} />
                        </button>
                        <button
                          onClick={() => router.push(`/admin/cars/edit/${car._id}`)}
                          className="p-2 bg-primary-charcoal text-accent-silver rounded-lg hover:bg-accent-charcoal transition"
                          title="Edit"
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => deleteCar(car._id)}
                          className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                          title="Delete"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'bookings' && <BookingsSection stats={stats} />}

          {activeTab === 'reviews' && <ReviewsSection stats={stats} />}
        </main>
      </div>
    </>
  );
}

function StatCard({ icon: Icon, title, value, subtitle, color }) {
  const colorClasses = {
    blue: 'from-blue-600 to-blue-800',
    green: 'from-green-600 to-green-800',
    purple: 'from-purple-600 to-purple-800',
    orange: 'from-orange-600 to-orange-800',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-br ${colorClasses[color]} rounded-lg p-6 text-white`}
    >
      <div className="flex items-center justify-between mb-4">
        <Icon size={32} />
        <BarChart3 size={24} className="opacity-50" />
      </div>
      <h3 className="text-sm font-medium opacity-90">{title}</h3>
      <p className="text-3xl font-bold mt-1">{value}</p>
      <p className="text-sm opacity-75 mt-2">{subtitle}</p>
    </motion.div>
  );
}

function BookingsSection({ stats }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchBookings();
  }, [filter]);

  const fetchBookings = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
      let url = `${API_ENDPOINTS.adminBookings}`;
      if (filter !== 'all') {
        url += `?status=${filter}`;
      }

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setBookings(data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
      await fetch(`${API_ENDPOINTS.adminBookings}/${bookingId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      fetchBookings();
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  if (loading) {
    return <div className="text-white">Loading bookings...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Bookings Management</h2>
        <div className="flex gap-2">
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg transition ${
                filter === status
                  ? 'bg-accent-silver text-primary-black'
                  : 'bg-primary-dark text-white hover:bg-accent-charcoal'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {bookings.map((booking) => (
          <motion.div
            key={booking._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-primary-dark rounded-lg p-6 border border-accent-charcoal"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{booking.customerName}</h3>
                <p className="text-accent-stone text-sm">{booking.customerEmail}</p>
                <p className="text-accent-stone text-sm">{booking.customerPhone}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  booking.status === 'confirmed'
                    ? 'bg-green-600 text-white'
                    : booking.status === 'completed'
                    ? 'bg-blue-600 text-white'
                    : booking.status === 'cancelled'
                    ? 'bg-red-600 text-white'
                    : 'bg-yellow-600 text-white'
                }`}
              >
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-accent-stone text-sm">Booking Type</p>
                <p className="text-white font-semibold">{booking.bookingType}</p>
              </div>
              <div>
                <p className="text-accent-stone text-sm">Booking Date</p>
                <p className="text-white font-semibold">
                  {new Date(booking.bookingDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => updateBookingStatus(booking._id, 'confirmed')}
                className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm"
              >
                <CheckCircle size={16} />
                Confirm
              </button>
              <button
                onClick={() => updateBookingStatus(booking._id, 'completed')}
                className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
              >
                <CheckCircle size={16} />
                Complete
              </button>
              <button
                onClick={() => updateBookingStatus(booking._id, 'cancelled')}
                className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
              >
                <XCircle size={16} />
                Cancel
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ReviewsSection({ stats }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
      const res = await fetch(`${API_ENDPOINTS.adminReviews}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setReviews(data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setLoading(false);
    }
  };

  const updateReviewStatus = async (reviewId, status) => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
      await fetch(`${API_ENDPOINTS.adminReviews}/${reviewId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      fetchReviews();
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  if (loading) {
    return <div className="text-white">Loading reviews...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Review Moderation</h2>

      <div className="grid grid-cols-1 gap-4">
        {reviews.map((review) => (
          <motion.div
            key={review._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-primary-dark rounded-lg p-6 border border-accent-charcoal"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{review.title}</h3>
                <p className="text-accent-stone text-sm">By {review.userName}</p>
                <div className="flex gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
                    />
                  ))}
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  review.status === 'approved'
                    ? 'bg-green-600 text-white'
                    : review.status === 'rejected'
                    ? 'bg-red-600 text-white'
                    : 'bg-yellow-600 text-white'
                }`}
              >
                {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
              </span>
            </div>

            <p className="text-white mb-4">{review.comment}</p>

            <div className="flex gap-2">
              <button
                onClick={() => updateReviewStatus(review._id, 'approved')}
                className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm"
              >
                <CheckCircle size={16} />
                Approve
              </button>
              <button
                onClick={() => updateReviewStatus(review._id, 'rejected')}
                className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
              >
                <XCircle size={16} />
                Reject
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
