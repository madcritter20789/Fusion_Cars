import { motion } from 'framer-motion';
import { Heart, Gauge, Fuel, Calendar, Star, ArrowRight, Eye } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

/**
 * Luxury CarCard Component - PREMIUM REDESIGN
 *
 * Sophisticated vehicle card featuring:
 * - Elegant gold accents and borders
 * - Glass-morphism overlays
 * - Premium hover lift effects
 * - Sophisticated image treatments
 * - Refined typography hierarchy
 * - Luxury badge system
 * - Smooth micro-interactions
 */
export default function CarCard({ car }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Link href={`/inventory/${car.id || '#'}`}>
      <motion.article
        className="group relative bg-primary-dark rounded-2xl overflow-hidden border border-white/5 hover:border-luxury-gold/30 transition-all duration-500 h-full flex flex-col cursor-pointer card-3d spotlight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          y: -16,
          rotateX: 1,
          rotateY: -1,
          transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        style={{
          boxShadow: isHovered
            ? '0 25px 70px rgba(0, 0, 0, 0.5), 0 0 50px rgba(212, 175, 55, 0.2), 0 10px 30px rgba(212, 175, 55, 0.1)'
            : '0 4px 20px rgba(0, 0, 0, 0.25)',
        }}
        aria-label={`${car.brand} ${car.model} - ${car.priceInWords}`}
      >
        {/* Premium Image Container */}
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-neutral-900 to-black">
          {/* Car Image with Modern Blur Background */}
          <motion.div
            className="absolute inset-0 blur-2xl scale-110 opacity-50"
            style={{
              backgroundImage: `url(${car.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            animate={{
              scale: isHovered ? 1.15 : 1.1,
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Car Image */}
          <motion.img
            src={car.image}
            alt={`${car.brand} ${car.model} - Premium luxury vehicle`}
            className="relative w-full h-full object-cover z-10"
            animate={{
              scale: isHovered ? 1.08 : 1,
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            loading="lazy"
          />

          {/* Enhanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-20"></div>

          {/* Gold Shine Effect on Hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-luxury-gold/5 to-transparent z-20"
            initial={{ x: '-100%', opacity: 0 }}
            animate={{
              x: isHovered ? '100%' : '-100%',
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />

          {/* Featured Badge - Premium Gold */}
          {car.featured && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-4 right-4 px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider premium-badge flex items-center gap-1.5 z-30 glow-pulse"
            >
              <Star className="w-3 h-3 fill-current" />
              Featured
            </motion.div>
          )}

          {/* Wishlist Button - Glass Effect */}
          <motion.button
            onClick={toggleFavorite}
            className="absolute top-4 left-4 blur-modern p-2.5 rounded-full shadow-luxury hover:shadow-luxury-lg transition-all border border-white/20 z-30"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            aria-label={
              isFavorite
                ? `Remove ${car.brand} ${car.model} from favorites`
                : `Add ${car.brand} ${car.model} to favorites`
            }
            aria-pressed={isFavorite}
          >
            <Heart
              className={`w-5 h-5 transition-all duration-300 ${
                isFavorite
                  ? 'fill-luxury-gold text-luxury-gold scale-110'
                  : 'text-white/80'
              }`}
            />
          </motion.button>

          {/* Rating Badge - Bottom Left */}
          <div className="absolute bottom-4 left-4 blur-modern rounded-full px-3 py-1.5 flex items-center gap-2 border border-white/20 backdrop-blur-xl z-30">
            <Star className="w-4 h-4 fill-luxury-gold text-luxury-gold" />
            <span className="text-white font-bold text-sm">{car.rating}</span>
            <span className="text-white/60 text-xs">({car.reviews})</span>
          </div>

          {/* View Details Overlay - Shows on Hover */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-25"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="flex items-center gap-2 text-white font-semibold text-lg shimmer"
              initial={{ y: 10, opacity: 0 }}
              animate={{
                y: isHovered ? 0 : 10,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ delay: 0.1 }}
            >
              <Eye className="w-5 h-5" />
              View Details
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col flex-grow bg-gradient-to-b from-primary-dark to-primary-black">
          {/* Brand & Price Row */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-luxury-gold font-semibold text-xs uppercase tracking-widest mb-2">
                {car.brand}
              </p>
              <h3 className="text-2xl font-serif font-bold text-white mb-1 leading-tight group-hover:text-luxury-gold transition-colors">
                {car.model}
              </h3>
              <p className="text-neutral-400 text-sm flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" />
                {car.year} Model
              </p>
            </div>

            {/* Price Badge */}
            <div className="text-right">
              <p className="text-luxury-gold text-2xl font-bold font-serif">
                ₹{car.priceInWords}
              </p>
              <p className="text-neutral-500 text-xs uppercase tracking-wide">
                Starting Price
              </p>
            </div>
          </div>

          {/* Luxury Divider */}
          <div className="luxury-divider my-4"></div>

          {/* Key Specifications - Premium Grid */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {/* Fuel Type */}
            <div className="glass-light rounded-lg p-3 text-center border border-white/5 hover:border-luxury-gold/30 transition-colors">
              <Fuel className="w-5 h-5 text-luxury-gold mx-auto mb-2" />
              <p className="text-xs font-semibold text-white mb-0.5">
                {car.fuelType}
              </p>
              <p className="text-xs text-neutral-500 uppercase tracking-wide">
                Fuel
              </p>
            </div>

            {/* Transmission */}
            <div className="glass-light rounded-lg p-3 text-center border border-white/5 hover:border-luxury-gold/30 transition-colors">
              <Gauge className="w-5 h-5 text-luxury-platinum mx-auto mb-2" />
              <p className="text-xs font-semibold text-white mb-0.5">
                {car.transmission}
              </p>
              <p className="text-xs text-neutral-500 uppercase tracking-wide">
                Trans
              </p>
            </div>

            {/* Mileage */}
            <div className="glass-light rounded-lg p-3 text-center border border-white/5 hover:border-luxury-gold/30 transition-colors">
              <Gauge className="w-5 h-5 text-luxury-silver mx-auto mb-2" />
              <p className="text-xs font-semibold text-white mb-0.5">
                {car.mileage}
              </p>
              <p className="text-xs text-neutral-500 uppercase tracking-wide">
                Kmpl
              </p>
            </div>
          </div>

          {/* Premium Features */}
          {car.features && car.features.length > 0 && (
            <div className="mb-5">
              <p className="text-xs font-bold text-neutral-400 mb-3 uppercase tracking-widest">
                Highlights
              </p>
              <div className="flex flex-wrap gap-2">
                {car.features.slice(0, 2).map((feature, index) => (
                  <span
                    key={index}
                    className="glass-light text-white px-3 py-1.5 rounded-full text-xs font-medium border border-white/10 hover:border-luxury-gold/50 transition-colors"
                  >
                    {feature}
                  </span>
                ))}
                {car.features.length > 2 && (
                  <span className="text-xs text-luxury-gold font-semibold px-3 py-1.5 flex items-center gap-1">
                    <span>+{car.features.length - 2} more</span>
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Premium Action Buttons */}
          <div className="flex flex-col gap-2.5 mt-auto pt-4 border-t border-white/5 w-full">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full btn-primary py-3 px-4 text-sm sm:text-base font-bold flex items-center justify-center gap-2 group/btn whitespace-nowrap overflow-hidden text-ellipsis"
              onClick={(e) => e.preventDefault()}
              aria-label={`View details for ${car.brand} ${car.model}`}
              title="View Details"
            >
              <span className="whitespace-nowrap overflow-hidden text-ellipsis flex-1">View Details</span>
              <ArrowRight className="w-4 h-4 flex-shrink-0 group-hover/btn:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full btn-secondary py-3 px-4 text-sm sm:text-base font-bold whitespace-nowrap overflow-hidden text-ellipsis"
              onClick={(e) => e.preventDefault()}
              aria-label={`Schedule test drive for ${car.brand} ${car.model}`}
              title="Book Test Drive"
            >
              Book Test Drive
            </motion.button>
          </div>
        </div>

        {/* Subtle gold glow effect on hover */}
        <motion.div
          className="absolute -inset-0.5 bg-gradient-gold rounded-2xl blur-xl -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.15 : 0 }}
          transition={{ duration: 0.4 }}
        />
      </motion.article>
    </Link>
  );
}
