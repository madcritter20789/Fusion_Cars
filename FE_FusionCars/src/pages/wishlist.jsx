import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CarCard from '../components/CarCard';
import { Heart, Trash2, Share2, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import cars from '../data/cars.json';

/**
 * Wishlist Management Page
 *
 * Features:
 * - View all favorited cars
 * - Remove from wishlist
 * - Compare wishlist items
 * - Share wishlist
 * - Add notes to wishlist items
 * - Empty state handling
 */

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [selectedCars, setSelectedCars] = useState([]);
  const [showNotes, setShowNotes] = useState({});
  const [notes, setNotes] = useState({});
  const [copied, setCopied] = useState(false);

  // Load wishlist from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('wishlist');
    if (saved) {
      try {
        setWishlist(JSON.parse(saved));
      } catch (e) {
        setWishlist([]);
      }
    }
  }, []);

  // Get wishlist cars
  const wishlistCars = cars.cars.filter((car) => wishlist.includes(car.id));

  const toggleWishlistItem = (carId) => {
    setWishlist((prev) => {
      const updated = prev.includes(carId)
        ? prev.filter((id) => id !== carId)
        : [...prev, carId];
      localStorage.setItem('wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleSelect = (carId) => {
    setSelectedCars((prev) =>
      prev.includes(carId)
        ? prev.filter((id) => id !== carId)
        : [...prev, carId]
    );
  };

  const toggleAllSelect = () => {
    if (selectedCars.length === wishlistCars.length) {
      setSelectedCars([]);
    } else {
      setSelectedCars(wishlistCars.map((car) => car.id));
    }
  };

  const handleCompare = () => {
    if (selectedCars.length > 0) {
      const compareIds = selectedCars.slice(0, 3).join(',');
      window.location.href = `/advanced-compare?cars=${compareIds}`;
    }
  };

  const toggleNotes = (carId) => {
    setShowNotes((prev) => ({
      ...prev,
      [carId]: !prev[carId],
    }));
  };

  const updateNotes = (carId, text) => {
    setNotes((prev) => ({
      ...prev,
      [carId]: text,
    }));
  };

  const shareWishlist = () => {
    const wishlistText = wishlistCars
      .map((car) => `${car.brand} ${car.model} (${car.year}) - ₹${car.priceInWords}`)
      .join('\n');

    const message = `Check out my wishlist on Fusion Cars:\n\n${wishlistText}`;

    if (navigator.share) {
      navigator.share({
        title: 'My Fusion Cars Wishlist',
        text: message,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <Head>
        <title>My Wishlist - Fusion Cars</title>
        <meta
          name="description"
          content="View and manage your favorite cars on Fusion Cars. Save, compare, and share your wishlist."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      <div className="min-h-screen bg-primary-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
              <div>
                <h1 className="text-4xl font-bold text-white flex items-center gap-3 mb-2">
                  <Heart size={40} className="text-accent-gold fill-accent-gold" />
                  My Wishlist
                </h1>
                <p className="text-accent-stone">
                  {wishlistCars.length} {wishlistCars.length === 1 ? 'car' : 'cars'} saved
                </p>
              </div>

              {wishlistCars.length > 0 && (
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={shareWishlist}
                    className="flex items-center gap-2 px-6 py-3 bg-accent-gold text-primary-black font-bold rounded-lg hover:bg-yellow-500 transition"
                  >
                    {copied ? (
                      <>
                        <Check size={20} />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Share2 size={20} />
                        Share
                      </>
                    )}
                  </motion.button>

                  {selectedCars.length > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCompare}
                      className="px-6 py-3 bg-primary-charcoal border-2 border-accent-gold text-accent-gold font-bold rounded-lg hover:bg-accent-gold/10 transition"
                    >
                      Compare ({selectedCars.length})
                    </motion.button>
                  )}
                </div>
              )}
            </div>
          </motion.div>

          {wishlistCars.length === 0 ? (
            <EmptyWishlist />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Selection Toolbar */}
              <div className="bg-primary-dark rounded-lg p-4 border border-accent-charcoal flex items-center justify-between flex-wrap gap-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCars.length === wishlistCars.length && wishlistCars.length > 0}
                    onChange={toggleAllSelect}
                    className="w-5 h-5 rounded border-accent-charcoal accent-accent-gold cursor-pointer"
                  />
                  <span className="text-accent-stone font-medium">
                    {selectedCars.length === 0
                      ? 'Select all'
                      : `${selectedCars.length} selected`}
                  </span>
                </label>

                {selectedCars.length > 0 && (
                  <button
                    onClick={() => {
                      selectedCars.forEach((id) => toggleWishlistItem(id));
                      setSelectedCars([]);
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 transition"
                  >
                    <Trash2 size={18} />
                    Remove Selected
                  </button>
                )}
              </div>

              {/* Wishlist Grid */}
              <div className="space-y-4">
                {wishlistCars.map((car, idx) => (
                  <motion.div
                    key={car.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-primary-dark rounded-lg border border-accent-charcoal overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row gap-6 p-6">
                      {/* Checkbox & Image */}
                      <div className="flex items-start gap-4 flex-shrink-0">
                        <input
                          type="checkbox"
                          checked={selectedCars.includes(car.id)}
                          onChange={() => toggleSelect(car.id)}
                          className="w-5 h-5 rounded border-accent-charcoal accent-accent-gold cursor-pointer mt-1"
                        />
                        <Link href={`/inventory/${car.id}`}>
                          <img
                            src={car.image}
                            alt={`${car.brand} ${car.model}`}
                            className="w-48 h-40 object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
                          />
                        </Link>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                          <div>
                            <Link href={`/inventory/${car.id}`}>
                              <h3 className="text-2xl font-bold text-white hover:text-accent-gold transition cursor-pointer">
                                {car.brand} {car.model}
                              </h3>
                            </Link>
                            <p className="text-accent-stone">{car.year} Model</p>
                          </div>
                          <button
                            onClick={() => toggleWishlistItem(car.id)}
                            className="text-red-400 hover:text-red-300 transition"
                            title="Remove from wishlist"
                          >
                            <Trash2 size={24} />
                          </button>
                        </div>

                        {/* Price & Specs */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <SpecBox label="Price" value={`₹${car.priceInWords}`} />
                          <SpecBox label="Fuel" value={car.fuelType} />
                          <SpecBox label="Transmission" value={car.transmission} />
                          <SpecBox label="Mileage" value={`${car.mileage} KMPL`} />
                        </div>

                        {/* Notes Section */}
                        <div className="mb-4">
                          <button
                            onClick={() => toggleNotes(car.id)}
                            className="text-accent-gold text-sm font-medium hover:text-yellow-500 transition mb-2"
                          >
                            {showNotes[car.id] ? '✕ Hide Notes' : '+ Add Notes'}
                          </button>

                          <AnimatePresence>
                            {showNotes[car.id] && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                              >
                                <textarea
                                  value={notes[car.id] || ''}
                                  onChange={(e) => updateNotes(car.id, e.target.value)}
                                  placeholder="Add your notes about this car..."
                                  className="w-full px-3 py-2 bg-primary-charcoal border border-accent-charcoal rounded text-accent-stone text-sm resize-none focus:border-accent-gold outline-none transition"
                                  rows="2"
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 flex-wrap">
                          <Link href={`/inventory/${car.id}`}>
                            <button className="px-6 py-2 bg-accent-gold text-primary-black font-bold rounded-lg hover:bg-yellow-500 transition">
                              View Details
                            </button>
                          </Link>
                          <button className="px-6 py-2 bg-primary-charcoal border border-accent-charcoal text-accent-stone rounded-lg hover:border-accent-gold transition">
                            Book Test Drive
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-primary-dark rounded-lg p-6 border border-accent-charcoal"
              >
                <h3 className="text-xl font-bold text-white mb-4">Wishlist Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <SummaryBox
                    label="Total Cars"
                    value={wishlistCars.length}
                  />
                  <SummaryBox
                    label="Average Price"
                    value={`₹${(
                      wishlistCars.reduce((sum, car) => sum + car.price, 0) /
                      wishlistCars.length
                    ).toLocaleString('en-IN', {
                      maximumFractionDigits: 0,
                    })}`}
                  />
                  <SummaryBox
                    label="Price Range"
                    value={`₹${Math.min(...wishlistCars.map((c) => c.price)).toLocaleString()} - ₹${Math.max(...wishlistCars.map((c) => c.price)).toLocaleString()}`}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

// Empty Wishlist Component
function EmptyWishlist() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-primary-dark rounded-lg border border-accent-charcoal p-12 text-center"
    >
      <div className="mb-6">
        <Heart size={64} className="mx-auto text-accent-charcoal mb-4" />
      </div>

      <h2 className="text-3xl font-bold text-white mb-2">Your wishlist is empty</h2>
      <p className="text-accent-stone mb-8">
        Start building your wishlist by adding your favorite cars from our inventory.
      </p>

      <Link href="/inventory">
        <button className="px-8 py-3 bg-accent-gold text-primary-black font-bold rounded-lg hover:bg-yellow-500 transition">
          Browse Inventory
        </button>
      </Link>
    </motion.div>
  );
}

// Spec Box Component
function SpecBox({ label, value }) {
  return (
    <div className="bg-primary-charcoal rounded-lg p-3 text-center border border-accent-charcoal/30">
      <p className="text-accent-stone text-xs mb-1 uppercase">{label}</p>
      <p className="text-white font-bold">{value}</p>
    </div>
  );
}

// Summary Box Component
function SummaryBox({ label, value }) {
  return (
    <div className="bg-primary-charcoal rounded-lg p-4 border border-accent-charcoal/30">
      <p className="text-accent-stone text-sm mb-1">{label}</p>
      <p className="text-accent-gold text-2xl font-bold">{value}</p>
    </div>
  );
}
