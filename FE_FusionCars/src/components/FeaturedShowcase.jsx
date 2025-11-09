import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

/**
 * Featured Showcase Component - Premium Car Display
 *
 * Displays a featured car with:
 * - Large hero image
 * - Text overlay with badge
 * - CTA button
 * - Elegant typography
 */
export default function FeaturedShowcase({
  title = "Let's Start a Lease",
  subtitle = "We are the best when it comes to exotic cars.",
  image = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&h=700&fit=crop&q=90",
  buttonText = "Explore More",
  buttonLink = "/inventory"
}) {
  return (
    <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden bg-black">
      {/* Featured Image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="luxury-container w-full">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-white text-sm font-semibold uppercase tracking-wider border border-white/20">
                Let's Start a Lease
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl lg:text-7xl font-serif text-white font-bold leading-tight mb-6"
            >
              {subtitle}
            </motion.h2>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link href={buttonLink}>
                <button className="btn-secondary-white flex items-center gap-3 py-4 px-8 text-lg hover:scale-105 transition-transform">
                  <span className="relative z-10">{buttonText}</span>
                  <ChevronRight className="w-6 h-6 relative z-10" />
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative accent - bottom right circle */}
      <motion.div
        className="absolute bottom-4 right-4 w-20 h-20 rounded-full bg-luxury-gold/20 border border-luxury-gold/40"
        animate={{ scale: [1, 1.1, 1], rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity }}
        aria-hidden="true"
      />
    </section>
  );
}
