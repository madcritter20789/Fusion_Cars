import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

/**
 * About Us Section Component
 *
 * Split layout with:
 * - Car image on left
 * - About text and CTA on right
 * - Modern, elegant design
 */
export default function AboutUsSection() {
  return (
    <section className="relative w-full bg-black overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px] md:min-h-[500px]">
        {/* Left Side - Car Image */}
        <motion.div
          className="relative h-[350px] md:h-[400px] lg:h-auto overflow-hidden"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img
            src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=500&fit=crop&q=90"
            alt="Luxury sports car"
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent"></div>
        </motion.div>

        {/* Right Side - Content */}
        <motion.div
          className="flex items-center justify-center p-6 sm:p-8 lg:p-12"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-md space-y-6">
            {/* Overline */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                Luxury Finds
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight"
            >
              We are the best when it comes to exotic cars.
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="text-base text-gray-300 leading-relaxed"
            >
              At Fusion Cars, we believe that luxury is not just about owning a car, it's about owning an experience. Our curated collection of exotic and premium vehicles represents the pinnacle of automotive excellence.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Link href="/about">
                <button className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-black rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors group">
                  <span>About Us</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </motion.div>

            {/* Stats or Additional Info */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
              className="pt-6 border-t border-white/10 flex gap-8"
            >
              <div>
                <p className="text-2xl font-bold text-white">500+</p>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Vehicles</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">25+</p>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Years</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
