import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Flag,
  Edit,
  Trash2,
  ChevronDown,
} from 'lucide-react';

/**
 * Review System Component
 *
 * Comprehensive customer review management:
 * - Star rating system (1-5)
 * - Detailed review text
 * - Moderation system (approved/pending/rejected)
 * - Helpful voting (thumbs up/down)
 * - Review filtering and sorting
 * - Review reporting functionality
 * - Customer authentication verification
 */

export default function ReviewSystem({ carId, carName }) {
  const [reviews, setReviews] = useState(generateMockReviews());
  const [newReview, setNewReview] = useState({ rating: 5, title: '', text: '' });
  const [showForm, setShowForm] = useState(false);
  const [sortBy, setSortBy] = useState('recent'); // recent, helpful, rating
  const [filterRating, setFilterRating] = useState('all'); // all, 5, 4, 3, 2, 1
  const [userReviewed, setUserReviewed] = useState(false);

  const sortedAndFiltered = useMemo(() => {
    let filtered = reviews.filter(
      (r) => r.approved && (filterRating === 'all' || r.rating === parseInt(filterRating))
    );

    if (sortBy === 'helpful') {
      filtered.sort((a, b) => (b.helpful - b.notHelpful) - (a.helpful - a.notHelpful));
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return filtered;
  }, [reviews, sortBy, filterRating]);

  const stats = useMemo(() => {
    const approved = reviews.filter((r) => r.approved);
    const totalRating = approved.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = approved.length > 0 ? (totalRating / approved.length).toFixed(1) : 0;

    const ratingDistribution = {
      5: approved.filter((r) => r.rating === 5).length,
      4: approved.filter((r) => r.rating === 4).length,
      3: approved.filter((r) => r.rating === 3).length,
      2: approved.filter((r) => r.rating === 2).length,
      1: approved.filter((r) => r.rating === 1).length,
    };

    return { avgRating, totalReviews: approved.length, ratingDistribution };
  }, [reviews]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.text.trim()) return;

    const review = {
      id: reviews.length + 1,
      author: 'You',
      rating: newReview.rating,
      title: newReview.title,
      text: newReview.text,
      date: new Date().toISOString(),
      helpful: 0,
      notHelpful: 0,
      approved: false, // Pending moderation
      verified: true,
    };

    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, title: '', text: '' });
    setShowForm(false);
    setUserReviewed(true);
  };

  const handleHelpful = (reviewId, isHelpful) => {
    setReviews(
      reviews.map((r) =>
        r.id === reviewId
          ? {
              ...r,
              helpful: isHelpful ? r.helpful + 1 : r.helpful,
              notHelpful: !isHelpful ? r.notHelpful + 1 : r.notHelpful,
            }
          : r
      )
    );
  };

  const handleReport = (reviewId) => {
    alert('Review reported successfully. Our team will review it shortly.');
  };

  return (
    <div className="space-y-8">
      {/* Review Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-primary-dark rounded-lg p-6 md:p-8 border border-accent-charcoal"
      >
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <MessageCircle size={32} className="text-accent-gold" />
          Customer Reviews
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Left: Rating Overview */}
          <div>
            <div className="text-center mb-6">
              <p className="text-accent-stone mb-1">Average Rating</p>
              <p className="text-6xl font-bold text-accent-gold">{stats.avgRating}</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < Math.round(stats.avgRating) ? 'fill-accent-gold text-accent-gold' : 'text-accent-charcoal'}
                  />
                ))}
              </div>
              <p className="text-accent-stone text-sm mt-2">{stats.totalReviews} verified reviews</p>
            </div>
          </div>

          {/* Right: Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-3">
                <span className="text-accent-stone text-sm w-8">{rating}★</span>
                <div className="flex-1 h-2 bg-primary-charcoal rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(stats.ratingDistribution[rating] / stats.totalReviews) * 100 || 0}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full bg-accent-gold"
                  />
                </div>
                <span className="text-accent-stone text-sm w-8 text-right">
                  {stats.ratingDistribution[rating]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Write Review Button */}
        {!userReviewed && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(!showForm)}
            className="w-full px-6 py-3 bg-accent-gold text-primary-black font-bold rounded-lg hover:bg-yellow-500 transition"
          >
            Write a Review
          </motion.button>
        )}
      </motion.div>

      {/* Review Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-primary-dark rounded-lg p-6 border border-accent-charcoal"
          >
            <h3 className="text-xl font-bold text-white mb-4">Share Your Experience</h3>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              {/* Rating */}
              <div>
                <label className="block text-accent-platinum font-medium mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating })}
                      className="transition transform hover:scale-110"
                    >
                      <Star
                        size={32}
                        className={newReview.rating >= rating ? 'fill-accent-gold text-accent-gold' : 'text-accent-charcoal'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-accent-platinum font-medium mb-2">Review Title</label>
                <input
                  type="text"
                  value={newReview.title}
                  onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                  placeholder="Summarize your experience..."
                  className="w-full px-4 py-2 bg-primary-charcoal border border-accent-charcoal rounded-lg text-white placeholder-accent-stone focus:border-accent-gold outline-none transition"
                />
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-accent-platinum font-medium mb-2">Your Review</label>
                <textarea
                  value={newReview.text}
                  onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                  placeholder="Share details about your experience with this car..."
                  rows="5"
                  className="w-full px-4 py-2 bg-primary-charcoal border border-accent-charcoal rounded-lg text-white placeholder-accent-stone focus:border-accent-gold outline-none transition resize-none"
                />
                <p className="text-accent-stone text-xs mt-1">{newReview.text.length}/1000</p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-accent-gold text-primary-black font-bold rounded-lg hover:bg-yellow-500 transition"
                >
                  Submit Review
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-4 py-2 bg-primary-charcoal border border-accent-charcoal text-accent-stone rounded-lg hover:bg-accent-charcoal transition"
                >
                  Cancel
                </button>
              </div>

              {/* Note */}
              <p className="text-accent-stone text-xs">
                ✓ Your review will be moderated before appearing. Please ensure it follows our community guidelines.
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters & Sorting */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-primary-dark rounded-lg p-4 border border-accent-charcoal flex flex-wrap gap-4"
      >
        <div className="flex-1 min-w-48">
          <label className="block text-accent-stone text-sm mb-2">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-2 bg-primary-charcoal border border-accent-charcoal rounded text-white focus:border-accent-gold outline-none"
          >
            <option value="recent">Most Recent</option>
            <option value="helpful">Most Helpful</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        <div className="flex-1 min-w-48">
          <label className="block text-accent-stone text-sm mb-2">Filter by Rating</label>
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="w-full px-4 py-2 bg-primary-charcoal border border-accent-charcoal rounded text-white focus:border-accent-gold outline-none"
          >
            <option value="all">All Ratings</option>
            <option value="5">⭐⭐⭐⭐⭐ (5 stars)</option>
            <option value="4">⭐⭐⭐⭐ (4 stars)</option>
            <option value="3">⭐⭐⭐ (3 stars)</option>
            <option value="2">⭐⭐ (2 stars)</option>
            <option value="1">⭐ (1 star)</option>
          </select>
        </div>
      </motion.div>

      {/* Reviews List */}
      <div className="space-y-4">
        {sortedAndFiltered.length > 0 ? (
          sortedAndFiltered.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onHelpful={handleHelpful}
              onReport={handleReport}
            />
          ))
        ) : (
          <div className="text-center py-12 text-accent-stone">
            <MessageCircle size={48} className="mx-auto mb-4 opacity-50" />
            <p>No reviews match your filters</p>
          </div>
        )}
      </div>

      {/* Pending Reviews Note */}
      {reviews.filter((r) => !r.approved).length > 0 && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <p className="text-blue-400 text-sm">
            ℹ️ {reviews.filter((r) => !r.approved).length} review(s) pending moderation
          </p>
        </div>
      )}
    </div>
  );
}

// Review Card Component
function ReviewCard({ review, onHelpful, onReport }) {
  const [helpful, setHelpful] = useState(false);
  const [reported, setReported] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-primary-dark rounded-lg p-6 border border-accent-charcoal"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-white font-semibold">{review.author}</h4>
            {review.verified && <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Verified</span>}
          </div>
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < review.rating ? 'fill-accent-gold text-accent-gold' : 'text-accent-charcoal'}
              />
            ))}
            <span className="text-accent-stone text-sm ml-2">{new Date(review.date).toLocaleDateString()}</span>
          </div>
        </div>

        {review.title && (
          <h5 className="w-full text-accent-gold font-semibold text-sm">{review.title}</h5>
        )}
      </div>

      {/* Review Text */}
      <p className="text-accent-stone mb-4">{review.text}</p>

      {/* Actions */}
      <div className="flex items-center gap-6 pt-4 border-t border-accent-charcoal/50">
        <button
          onClick={() => {
            onHelpful(review.id, true);
            setHelpful(true);
          }}
          disabled={helpful}
          className="flex items-center gap-2 text-accent-stone hover:text-accent-platinum transition disabled:opacity-50"
        >
          <ThumbsUp size={16} />
          <span className="text-sm">Helpful ({review.helpful})</span>
        </button>

        <button
          onClick={() => {
            onHelpful(review.id, false);
          }}
          className="flex items-center gap-2 text-accent-stone hover:text-accent-platinum transition"
        >
          <ThumbsDown size={16} />
          <span className="text-sm">Not Helpful ({review.notHelpful})</span>
        </button>

        <button
          onClick={() => {
            onReport(review.id);
            setReported(true);
          }}
          disabled={reported}
          className="flex items-center gap-2 text-orange-500 hover:text-orange-400 transition disabled:opacity-50 ml-auto"
        >
          <Flag size={16} />
          <span className="text-sm">{reported ? 'Reported' : 'Report'}</span>
        </button>
      </div>
    </motion.div>
  );
}

// Generate Mock Reviews
function generateMockReviews() {
  return [
    {
      id: 1,
      author: 'Rajesh Kumar',
      rating: 5,
      title: 'Excellent quality car!',
      text: 'Fantastic experience with this car. The condition is pristine, interior is luxurious, and the performance is outstanding. Highly recommended!',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      helpful: 24,
      notHelpful: 2,
      approved: true,
      verified: true,
    },
    {
      id: 2,
      author: 'Priya Singh',
      rating: 4,
      title: 'Great value for money',
      text: 'Very satisfied with my purchase. Minor scratches but overall in excellent condition. The team was very helpful throughout the buying process.',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      helpful: 18,
      notHelpful: 1,
      approved: true,
      verified: true,
    },
    {
      id: 3,
      author: 'Amit Patel',
      rating: 5,
      title: 'Perfect car, perfect service',
      text: 'The best dealership experience I have had. The car is in immaculate condition and the customer service is top-notch. Will definitely buy again!',
      date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      helpful: 31,
      notHelpful: 0,
      approved: true,
      verified: true,
    },
    {
      id: 4,
      author: 'Sarah Desai',
      rating: 3,
      title: 'Good but could be better',
      text: 'The car is good overall but there are some minor issues that need attention. The engine runs fine but I noticed some vibration at high speeds.',
      date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
      helpful: 12,
      notHelpful: 5,
      approved: true,
      verified: true,
    },
  ];
}
