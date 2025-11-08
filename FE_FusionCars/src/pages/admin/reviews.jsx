import { useState, useMemo } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle,
  XCircle,
  Clock,
  Star,
  Trash2,
  MessageSquare,
  Flag,
  Search,
  Filter,
  Edit,
} from 'lucide-react';

/**
 * Admin Review Moderation Panel
 *
 * Comprehensive review management for admins:
 * - View pending reviews
 * - Approve/reject reviews
 * - Delete inappropriate reviews
 * - Filter by status, rating, car
 * - Search reviews
 * - Bulk moderation actions
 * - Review details and user info
 */

export default function ReviewsAdmin() {
  const [reviews, setReviews] = useState(generateMockReviews());
  const [filterStatus, setFilterStatus] = useState('all'); // all, pending, approved, rejected
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReviews, setSelectedReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [sortBy, setSortBy] = useState('recent');

  // Filter and sort reviews
  const filteredReviews = useMemo(() => {
    let result = reviews;

    // Filter by status
    if (filterStatus !== 'all') {
      result = result.filter((r) => r.status === filterStatus);
    }

    // Search
    if (searchQuery) {
      result = result.filter(
        (r) =>
          r.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.carName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    switch (sortBy) {
      case 'rating-high':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'rating-low':
        result.sort((a, b) => a.rating - b.rating);
        break;
      case 'helpful':
        result.sort((a, b) => (b.helpful - b.notHelpful) - (a.helpful - a.notHelpful));
        break;
      default:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  }, [reviews, filterStatus, searchQuery, sortBy]);

  // Stats
  const stats = useMemo(() => {
    return {
      total: reviews.length,
      pending: reviews.filter((r) => r.status === 'pending').length,
      approved: reviews.filter((r) => r.status === 'approved').length,
      rejected: reviews.filter((r) => r.status === 'rejected').length,
    };
  }, [reviews]);

  const updateReviewStatus = (reviewId, status) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId ? { ...r, status, updatedAt: new Date().toISOString() } : r
      )
    );
  };

  const deleteReview = (reviewId) => {
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    setSelectedReview(null);
  };

  const toggleSelectReview = (reviewId) => {
    setSelectedReviews((prev) =>
      prev.includes(reviewId)
        ? prev.filter((id) => id !== reviewId)
        : [...prev, reviewId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedReviews.length === filteredReviews.length) {
      setSelectedReviews([]);
    } else {
      setSelectedReviews(filteredReviews.map((r) => r.id));
    }
  };

  const bulkApprove = () => {
    selectedReviews.forEach((id) => updateReviewStatus(id, 'approved'));
    setSelectedReviews([]);
  };

  const bulkReject = () => {
    selectedReviews.forEach((id) => updateReviewStatus(id, 'rejected'));
    setSelectedReviews([]);
  };

  const bulkDelete = () => {
    setReviews((prev) => prev.filter((r) => !selectedReviews.includes(r.id)));
    setSelectedReviews([]);
  };

  return (
    <>
      <Head>
        <title>Review Moderation - Admin Panel</title>
        <meta name="description" content="Manage and moderate customer reviews" />
      </Head>

      <div className="min-h-screen bg-primary-black py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-2">Review Moderation</h1>
            <p className="text-accent-stone">Manage and moderate customer reviews</p>
          </motion.div>

          {/* Statistics Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
          >
            <StatCard
              icon={<MessageSquare className="text-accent-gold" />}
              label="Total Reviews"
              value={stats.total}
            />
            <StatCard
              icon={<Clock className="text-yellow-500" />}
              label="Pending"
              value={stats.pending}
              highlight
            />
            <StatCard
              icon={<CheckCircle className="text-green-500" />}
              label="Approved"
              value={stats.approved}
            />
            <StatCard
              icon={<XCircle className="text-red-500" />}
              label="Rejected"
              value={stats.rejected}
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Reviews List */}
            <div className="lg:col-span-2 space-y-4">
              {/* Filter & Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-primary-dark rounded-lg p-6 border border-accent-charcoal space-y-4"
              >
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-accent-stone" size={20} />
                  <input
                    type="text"
                    placeholder="Search reviews, authors, cars..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-primary-charcoal border border-accent-charcoal rounded-lg text-white placeholder-accent-stone focus:border-accent-gold outline-none transition"
                  />
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-accent-stone text-sm mb-2">Status</label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full px-4 py-2 bg-primary-charcoal border border-accent-charcoal rounded text-white focus:border-accent-gold outline-none"
                    >
                      <option value="all">All Reviews</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-accent-stone text-sm mb-2">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-4 py-2 bg-primary-charcoal border border-accent-charcoal rounded text-white focus:border-accent-gold outline-none"
                    >
                      <option value="recent">Most Recent</option>
                      <option value="rating-high">Highest Rated</option>
                      <option value="rating-low">Lowest Rated</option>
                      <option value="helpful">Most Helpful</option>
                    </select>
                  </div>
                </div>
              </motion.div>

              {/* Bulk Actions */}
              {selectedReviews.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-accent-gold/10 border border-accent-gold rounded-lg p-4 flex items-center justify-between flex-wrap gap-4"
                >
                  <span className="text-accent-gold font-bold">
                    {selectedReviews.length} selected
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={bulkApprove}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition font-bold text-sm"
                    >
                      Approve All
                    </button>
                    <button
                      onClick={bulkReject}
                      className="px-4 py-2 bg-yellow-500 text-primary-black rounded hover:bg-yellow-600 transition font-bold text-sm"
                    >
                      Reject All
                    </button>
                    <button
                      onClick={bulkDelete}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition font-bold text-sm"
                    >
                      Delete All
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Reviews List */}
              <AnimatePresence>
                {filteredReviews.length > 0 ? (
                  <div className="space-y-3">
                    {/* Select All */}
                    {filteredReviews.length > 0 && (
                      <label className="flex items-center gap-3 p-4 bg-primary-dark rounded-lg border border-accent-charcoal cursor-pointer">
                        <input
                          type="checkbox"
                          checked={
                            selectedReviews.length === filteredReviews.length &&
                            filteredReviews.length > 0
                          }
                          onChange={toggleSelectAll}
                          className="w-5 h-5 rounded border-accent-charcoal accent-accent-gold cursor-pointer"
                        />
                        <span className="text-accent-stone font-medium">
                          {selectedReviews.length === 0
                            ? 'Select all'
                            : `${selectedReviews.length} selected`}
                        </span>
                      </label>
                    )}

                    {filteredReviews.map((review, idx) => (
                      <ReviewListItem
                        key={review.id}
                        review={review}
                        isSelected={selectedReviews.includes(review.id)}
                        onSelect={() => toggleSelectReview(review.id)}
                        onApprove={() => updateReviewStatus(review.id, 'approved')}
                        onReject={() => updateReviewStatus(review.id, 'rejected')}
                        onDelete={() => deleteReview(review.id)}
                        onClick={() => setSelectedReview(review)}
                        idx={idx}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-primary-dark rounded-lg border border-accent-charcoal">
                    <MessageSquare size={48} className="mx-auto text-accent-charcoal mb-4" />
                    <p className="text-accent-stone">No reviews found</p>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Review Details Sidebar */}
            <div className="lg:col-span-1">
              {selectedReview ? (
                <ReviewDetailPanel
                  review={selectedReview}
                  onApprove={() => {
                    updateReviewStatus(selectedReview.id, 'approved');
                    setSelectedReview(null);
                  }}
                  onReject={() => {
                    updateReviewStatus(selectedReview.id, 'rejected');
                    setSelectedReview(null);
                  }}
                  onDelete={() => {
                    deleteReview(selectedReview.id);
                  }}
                  onClose={() => setSelectedReview(null)}
                />
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="sticky top-8 bg-primary-dark rounded-lg p-6 border border-accent-charcoal text-center"
                >
                  <MessageSquare size={48} className="mx-auto text-accent-charcoal mb-4" />
                  <p className="text-accent-stone">Select a review to view details</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Stat Card Component
function StatCard({ icon, label, value, highlight }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-lg p-6 border ${
        highlight
          ? 'bg-yellow-500/10 border-yellow-500/30'
          : 'bg-primary-dark border-accent-charcoal'
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-accent-stone text-sm mb-1">{label}</p>
          <p className="text-4xl font-bold text-white">{value}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </motion.div>
  );
}

// Review List Item Component
function ReviewListItem({
  review,
  isSelected,
  onSelect,
  onApprove,
  onReject,
  onDelete,
  onClick,
  idx,
}) {
  const statusColors = {
    pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    approved: 'bg-green-500/20 text-green-400 border-green-500/30',
    rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  const statusIcons = {
    pending: <Clock size={16} />,
    approved: <CheckCircle size={16} />,
    rejected: <XCircle size={16} />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05 }}
      onClick={onClick}
      className={`p-4 rounded-lg border cursor-pointer transition ${
        isSelected
          ? 'bg-accent-gold/10 border-accent-gold'
          : 'bg-primary-dark border-accent-charcoal hover:border-accent-gold'
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          onClick={(e) => e.stopPropagation()}
          className="w-5 h-5 rounded border-accent-charcoal accent-accent-gold cursor-pointer mt-1 flex-shrink-0"
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <p className="text-white font-bold">{review.author}</p>
              <p className="text-accent-stone text-sm">{review.carName}</p>
            </div>
            <div className={`flex items-center gap-1 px-2 py-1 rounded border text-xs font-bold flex-shrink-0 ${statusColors[review.status]}`}>
              {statusIcons[review.status]}
              {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < review.rating ? 'fill-accent-gold text-accent-gold' : 'text-accent-charcoal'}
              />
            ))}
            <span className="text-accent-stone text-xs ml-2">
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Review Text Preview */}
          <p className="text-accent-stone text-sm line-clamp-2">{review.text}</p>

          {/* Quick Actions */}
          <div className="flex gap-2 mt-3">
            {review.status !== 'approved' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onApprove();
                }}
                className="px-3 py-1 bg-green-500 text-white rounded text-xs font-bold hover:bg-green-600 transition"
              >
                Approve
              </button>
            )}
            {review.status !== 'rejected' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onReject();
                }}
                className="px-3 py-1 bg-yellow-500 text-primary-black rounded text-xs font-bold hover:bg-yellow-600 transition"
              >
                Reject
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="px-3 py-1 bg-red-500 text-white rounded text-xs font-bold hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Review Detail Panel Component
function ReviewDetailPanel({ review, onApprove, onReject, onDelete, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="sticky top-8 bg-primary-dark rounded-lg p-6 border border-accent-charcoal space-y-6"
    >
      {/* Header */}
      <div>
        <h3 className="text-xl font-bold text-white mb-2">Review Details</h3>
        <p className="text-accent-stone text-sm">Full review information</p>
      </div>

      {/* Author Info */}
      <div className="space-y-3">
        <div>
          <p className="text-accent-stone text-sm mb-1">Author</p>
          <p className="text-white font-semibold">{review.author}</p>
        </div>

        <div>
          <p className="text-accent-stone text-sm mb-1">Email</p>
          <p className="text-accent-platinum break-all">{review.email}</p>
        </div>

        <div>
          <p className="text-accent-stone text-sm mb-1">Vehicle</p>
          <p className="text-white font-semibold">{review.carName}</p>
        </div>
      </div>

      {/* Rating */}
      <div>
        <p className="text-accent-stone text-sm mb-2">Rating</p>
        <div className="flex items-center gap-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={20}
              className={i < review.rating ? 'fill-accent-gold text-accent-gold' : 'text-accent-charcoal'}
            />
          ))}
          <span className="text-accent-gold font-bold ml-2">{review.rating}/5</span>
        </div>
      </div>

      {/* Review Text */}
      <div>
        <p className="text-accent-stone text-sm mb-2">Review</p>
        <p className="text-accent-platinum text-sm p-3 bg-primary-charcoal rounded border border-accent-charcoal/50">
          {review.text}
        </p>
      </div>

      {/* Engagement Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-primary-charcoal rounded p-3 text-center border border-accent-charcoal/50">
          <p className="text-accent-stone text-xs mb-1">Helpful</p>
          <p className="text-accent-gold font-bold">{review.helpful}</p>
        </div>
        <div className="bg-primary-charcoal rounded p-3 text-center border border-accent-charcoal/50">
          <p className="text-accent-stone text-xs mb-1">Not Helpful</p>
          <p className="text-accent-gold font-bold">{review.notHelpful}</p>
        </div>
      </div>

      {/* Status Info */}
      <div>
        <p className="text-accent-stone text-sm mb-2">Current Status</p>
        <div className={`px-3 py-2 rounded text-sm font-bold text-center ${
          review.status === 'pending'
            ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
            : review.status === 'approved'
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
        }`}>
          {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2 pt-4 border-t border-accent-charcoal">
        {review.status !== 'approved' && (
          <button
            onClick={onApprove}
            className="w-full px-4 py-2 bg-green-500 text-white rounded font-bold hover:bg-green-600 transition flex items-center justify-center gap-2"
          >
            <CheckCircle size={18} />
            Approve Review
          </button>
        )}

        {review.status !== 'rejected' && (
          <button
            onClick={onReject}
            className="w-full px-4 py-2 bg-yellow-500 text-primary-black rounded font-bold hover:bg-yellow-600 transition flex items-center justify-center gap-2"
          >
            <XCircle size={18} />
            Reject Review
          </button>
        )}

        <button
          onClick={onDelete}
          className="w-full px-4 py-2 bg-red-500 text-white rounded font-bold hover:bg-red-600 transition flex items-center justify-center gap-2"
        >
          <Trash2 size={18} />
          Delete Review
        </button>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="w-full px-4 py-2 bg-primary-charcoal border border-accent-charcoal text-accent-stone rounded font-bold hover:border-accent-gold transition"
      >
        Close
      </button>
    </motion.div>
  );
}

// Generate Mock Reviews
function generateMockReviews() {
  const cars = [
    'BMW X5',
    'Mercedes-Benz C-Class',
    'Audi A6',
    'Tesla Model 3',
    'Range Rover',
  ];

  const reviews = [];

  for (let i = 1; i <= 12; i++) {
    reviews.push({
      id: i,
      author: `Customer ${i}`,
      email: `customer${i}@email.com`,
      carName: cars[Math.floor(Math.random() * cars.length)],
      rating: Math.floor(Math.random() * 5) + 1,
      title: ['Great car', 'Good quality', 'Satisfied', 'Excellent', 'Very good'][
        Math.floor(Math.random() * 5)
      ],
      text: `This is a detailed review of the vehicle. The condition is excellent, the service is outstanding, and the team was very helpful throughout the process. Highly recommended!`,
      status: ['pending', 'approved', 'rejected'][Math.floor(Math.random() * 3)],
      helpful: Math.floor(Math.random() * 20),
      notHelpful: Math.floor(Math.random() * 5),
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  return reviews;
}
