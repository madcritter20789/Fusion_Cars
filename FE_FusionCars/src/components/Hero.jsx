import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, Search, X, Star } from 'lucide-react';
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';

/**
 * Luxury Hero Component - ULTRA MODERN REDESIGN
 *
 * Cinematic luxury hero section featuring:
 * - Premium gold/platinum color scheme
 * - Sophisticated parallax animations
 * - Optional video background support
 * - Playfair Display luxury typography
 * - Glass-morphism elements
 * - Elegant CTAs with gold accents
 * - Full-screen immersive experience
 * - Enhanced visual hierarchy
 * - Advanced blur effects
 */
export default function Hero({ videoBackground = null, enableVideo = false }) {
  const [searchQuery, setSearchQuery] = useState('');
  const ref = useRef(null);
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/inventory?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleDiscoverCollection = () => {
    if (searchQuery.trim()) {
      router.push(`/inventory?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push('/inventory');
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] // Luxury easing
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1]
      },
    },
  };

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen bg-luxury-mesh flex items-center overflow-hidden"
      aria-label="Luxury automotive collection - Fusion Cars"
      role="region"
    >
      {/* Optional Video Background */}
      {enableVideo && videoBackground && (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          >
            <source src={videoBackground} type="video/mp4" />
          </video>
          {/* Video overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>
      )}

      {/* Sophisticated animated background orbs */}
      <motion.div
        className="absolute top-20 right-20 w-96 h-96 rounded-full mix-blend-screen filter blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
          y
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-20 left-20 w-80 h-80 rounded-full mix-blend-screen filter blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(229, 193, 88, 0.12) 0%, transparent 70%)',
          y
        }}
        animate={{
          scale: [1, 1.15, 1],
          x: [0, -30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, delay: 2, ease: "easeInOut" }}
        aria-hidden="true"
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(212, 175, 55, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 175, 55, 0.5) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
        aria-hidden="true"
      />

      <motion.div
        className="luxury-container relative z-10 w-full"
        style={{ opacity }}
      >
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen py-24"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Content - Premium Copy */}
          <div className="space-y-6">
            {/* Luxury Badge */}
            <motion.div variants={itemVariants}>
              <span className="premium-badge inline-flex items-center gap-2 text-sm">
                <Star className="w-3 h-3 fill-current" />
                Premium Automotive Collection
              </span>
            </motion.div>

            {/* Cinematic Headline - New Design */}
            <motion.div variants={itemVariants} className="space-y-3">
              {/* Subheading */}
              <p className="text-sm text-neutral-400 uppercase tracking-wide font-light">
                Welcome to the Dream Destination for Superstar Lovers.
              </p>

              {/* Main Heading */}
              <h1 className="font-serif text-white leading-[1.1]" style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
                Supercars for Superstars
              </h1>

              <p className="text-base text-neutral-300 leading-relaxed max-w-xl font-light">
                Curated collection of the world's finest automobiles. Where luxury meets performance, and every journey becomes unforgettable.
              </p>
            </motion.div>

            {/* Premium Search Bar - With Icon Toggle */}
            <motion.div
              variants={itemVariants}
              className="blur-modern rounded-2xl p-0 flex flex-col sm:flex-row gap-0 shadow-luxury-lg overflow-hidden"
            >
              <div className="flex-1 relative flex items-center px-2 py-2">
                <Search className="absolute left-4 w-4 h-4 text-neutral-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search by make, model, or type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                  className="flex-1 pl-10 pr-4 py-3 rounded-lg bg-white/5 text-white placeholder-neutral-400 border border-white/10 focus:outline-none focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/20 transition-all text-sm"
                  aria-label="Search luxury cars"
                />
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-4 text-neutral-400 hover:text-white transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              {/* Desktop Search Button */}
              <motion.button
                onClick={handleDiscoverCollection}
                className="hidden sm:flex sm:w-auto btn-secondary px-6 whitespace-nowrap items-center justify-center gap-2 relative overflow-hidden py-3 text-sm"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Discover our collection"
              >
                <span className="relative z-10">Discover Collection</span>
              </motion.button>

              {/* Mobile-only Search Button */}
              <motion.button
                onClick={handleDiscoverCollection}
                className="sm:hidden w-full btn-secondary px-6 whitespace-nowrap flex items-center justify-center gap-2 relative overflow-hidden py-3 text-sm"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Search luxury cars"
              >
                <Search className="w-4 h-4" />
                <span className="relative z-10">Search</span>
              </motion.button>
            </motion.div>


            {/* Trust Indicators - Refined Metrics */}
            <motion.div
              className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10"
              variants={itemVariants}
            >
              <div className="text-center lg:text-left">
                <p className="text-2xl font-serif font-bold text-gradient-gold mb-1">500+</p>
                <p className="text-xs text-neutral-400 uppercase tracking-wider">Curated Vehicles</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl font-serif font-bold text-gradient-platinum mb-1">15K+</p>
                <p className="text-xs text-neutral-400 uppercase tracking-wider">Satisfied Clients</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl font-serif font-bold text-gradient-gold mb-1">25+</p>
                <p className="text-xs text-neutral-400 uppercase tracking-wider">Years Excellence</p>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Luxury Vehicle Showcase */}
          <motion.div
            className="relative hidden lg:block"
            variants={imageVariants}
          >
            <motion.div
              className="relative h-full min-h-[600px] flex items-center"
              style={{ y }}
            >
              {/* Main Image with Luxury Frame */}
              <div className="relative w-full">
                {/* Gold border accent */}
                <div className="absolute -inset-1 bg-gradient-gold rounded-3xl opacity-20 blur-xl"></div>

                <div className="relative rounded-3xl overflow-hidden shadow-luxury-xl border border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&h=900&fit=crop&q=90"
                    alt="Luxury sports car from Fusion Cars premium collection"
                    className="w-full h-auto object-cover"
                  />

                  {/* Sophisticated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                </div>
              </div>

              {/* Floating Glass Card - Social Proof */}
              <motion.div
                className="absolute -bottom-8 -left-8 right-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <div className="glass rounded-2xl p-6 border border-white/20 shadow-luxury-lg backdrop-blur-2xl">
                  <div className="flex items-center gap-4">
                    {/* Star Rating */}
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-luxury-gold text-luxury-gold" />
                      ))}
                    </div>

                    <div className="flex-1">
                      <p className="text-white font-semibold text-lg">Exceptional Service</p>
                      <p className="text-neutral-300 text-sm">Rated 4.9/5 by 3,500+ clients</p>
                    </div>
                  </div>

                  {/* Client avatars */}
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
                    <div className="flex -space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-luxury-gold to-luxury-gold-dark border-2 border-white/20"></div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-luxury-platinum to-luxury-silver border-2 border-white/20"></div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-luxury-rose-gold to-luxury-bronze border-2 border-white/20"></div>
                    </div>
                    <p className="text-neutral-300 text-sm">Join thousands of satisfied clients</p>
                  </div>
                </div>
              </motion.div>

              {/* Decorative accent elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-24 h-24 border border-luxury-gold/30 rounded-full"
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                aria-hidden="true"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-neutral-400 cursor-pointer hover:text-luxury-gold transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-5 h-8 border-2 border-current rounded-full flex items-start justify-center p-1">
            <motion.div
              className="w-1 h-2 bg-current rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
