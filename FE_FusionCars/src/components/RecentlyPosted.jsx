import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, Star, ChevronLeft } from 'lucide-react';

/**
 * Recently Posted Cars Component
 *
 * Displays recent car listings in a grid with:
 * - Car images
 * - Basic details (price, mileage, etc.)
 * - Interactive cards
 * - Responsive carousel for mobile
 */
export default function RecentlyPosted() {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars?limit=6`);
        if (response.ok) {
          const data = await response.json();
          setCars(data.cars || []);
        }
      } catch (error) {
        console.error('Failed to fetch cars:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, cars.length - 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, cars.length - 1)) % Math.max(1, cars.length - 1));
  };

  return (
    <section className="luxury-section bg-black relative overflow-hidden">
      <div className="luxury-container">
        {/* Header */}
        <motion.div
          className="flex justify-between items-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">
              Recently Posted
            </h2>
            <p className="text-neutral-400">Discover our latest luxury automotive additions</p>
          </div>
          <Link href="/inventory">
            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
            >
              <span>View All</span>
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Cars Grid/Carousel */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="aspect-video bg-white/5 rounded-2xl animate-pulse"
                variants={itemVariants}
              />
            ))}
          </div>
        ) : cars.length > 0 ? (
          <>
            {/* Desktop Grid */}
            <motion.div
              className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {cars.map((car) => (
                <CarCard key={car._id} car={car} variants={itemVariants} />
              ))}
            </motion.div>

            {/* Mobile Carousel */}
            <div className="lg:hidden">
              <div className="relative overflow-hidden">
                <motion.div
                  className="flex gap-6"
                  initial={false}
                  animate={{
                    x: -currentIndex * (typeof window !== 'undefined' && window.innerWidth < 640 ? window.innerWidth - 40 : window.innerWidth / 2),
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  {cars.map((car) => (
                    <div key={car._id} className="w-full sm:w-1/2 flex-shrink-0">
                      <CarCard car={car} />
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Navigation buttons */}
              <div className="flex gap-4 mt-8 justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all flex items-center justify-center"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all flex items-center justify-center"
                  aria-label="Next"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-neutral-400 text-lg">No cars found</p>
          </div>
        )}

        {/* Mobile View All Button */}
        <div className="lg:hidden mt-8">
          <Link href="/inventory" className="w-full">
            <button className="w-full py-4 rounded-full bg-white text-black font-semibold hover:bg-neutral-100 transition-all">
              View All Cars
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

/**
 * Car Card Component
 */
function CarCard({ car, variants }) {
  return (
    <motion.div variants={variants}>
      <Link href={`/inventory/${car._id}`}>
        <div className="group cursor-pointer overflow-hidden">
          {/* Image Container */}
          <div className="relative overflow-hidden rounded-2xl h-64 md:h-72 mb-4">
            <img
              src={car.images?.[0] || 'https://via.placeholder.com/400x300?text=Car+Image'}
              alt={`${car.make} ${car.model}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <button className="btn-secondary-white px-6 py-2">
                View Details
              </button>
            </div>

            {/* Badge */}
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 text-white text-xs font-semibold uppercase">
              {car.condition || 'Premium'}
            </div>
          </div>

          {/* Car Details */}
          <div className="space-y-3">
            {/* Title */}
            <h3 className="text-xl font-serif font-bold text-white group-hover:text-luxury-gold transition-colors">
              {car.make} {car.model}
            </h3>

            {/* Specs - 3 columns */}
            <div className="grid grid-cols-3 gap-2 py-3 border-t border-white/10">
              <div className="text-center">
                <p className="text-luxury-gold font-bold text-sm">{car.year}</p>
                <p className="text-xs text-neutral-400">Year</p>
              </div>
              <div className="text-center">
                <p className="text-luxury-gold font-bold text-sm">{car.mileage || 'N/A'}</p>
                <p className="text-xs text-neutral-400">Mileage</p>
              </div>
              <div className="text-center">
                <p className="text-luxury-gold font-bold text-sm">{car.transmission || 'Auto'}</p>
                <p className="text-xs text-neutral-400">Type</p>
              </div>
            </div>

            {/* Price and Rating */}
            <div className="flex justify-between items-end pt-2">
              <div>
                <p className="text-luxury-gold text-2xl font-bold">
                  ₹{car.price ? (car.price / 100000).toFixed(1) : 'N/A'}L
                </p>
                <p className="text-xs text-neutral-400">Starting Price</p>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-luxury-gold text-luxury-gold"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
