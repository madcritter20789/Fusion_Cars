import { motion } from 'framer-motion';

/**
 * Modern Skeleton Loader Components
 *
 * Sophisticated loading states with shimmer animations
 * for various UI elements
 */

// Card Skeleton
export function CardSkeleton() {
  return (
    <div className="bg-primary-dark rounded-2xl overflow-hidden border border-white/5 h-full">
      {/* Image Skeleton */}
      <div className="h-64 bg-gradient-to-br from-neutral-900 to-neutral-800 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 shimmer"
          animate={{
            backgroundPosition: ['200% 0', '-200% 0'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Content Skeleton */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <div className="space-y-3">
          <div className="h-3 w-20 bg-neutral-800 rounded shimmer" />
          <div className="h-8 w-3/4 bg-neutral-800 rounded shimmer" />
          <div className="h-4 w-1/2 bg-neutral-800 rounded shimmer" />
        </div>

        {/* Divider */}
        <div className="h-px bg-neutral-800 my-4" />

        {/* Specs Grid */}
        <div className="grid grid-cols-3 gap-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 bg-neutral-800 rounded-lg shimmer" />
          ))}
        </div>

        {/* Features */}
        <div className="flex gap-2 pt-4">
          <div className="h-7 w-24 bg-neutral-800 rounded-full shimmer" />
          <div className="h-7 w-28 bg-neutral-800 rounded-full shimmer" />
        </div>

        {/* Buttons */}
        <div className="space-y-2.5 pt-4">
          <div className="h-12 bg-neutral-800 rounded-lg shimmer" />
          <div className="h-12 bg-neutral-800 rounded-lg shimmer" />
        </div>
      </div>
    </div>
  );
}

// List Skeleton
export function ListSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(count)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <CardSkeleton />
        </motion.div>
      ))}
    </div>
  );
}

// Text Skeleton
export function TextSkeleton({ lines = 3, className = '' }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {[...Array(lines)].map((_, i) => (
        <div
          key={i}
          className={`h-4 bg-neutral-800 rounded shimmer ${
            i === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        />
      ))}
    </div>
  );
}

// Hero Skeleton
export function HeroSkeleton() {
  return (
    <div className="min-h-screen bg-luxury-mesh flex items-center">
      <div className="luxury-container w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-24">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="h-8 w-48 bg-neutral-800 rounded-full shimmer" />
            <div className="space-y-4">
              <div className="h-20 w-full bg-neutral-800 rounded shimmer" />
              <div className="h-20 w-4/5 bg-neutral-800 rounded shimmer" />
            </div>
            <div className="h-6 w-full bg-neutral-800 rounded shimmer" />
            <div className="h-6 w-3/4 bg-neutral-800 rounded shimmer" />
            <div className="flex gap-4 pt-4">
              <div className="h-14 flex-1 bg-neutral-800 rounded-lg shimmer" />
              <div className="h-14 flex-1 bg-neutral-800 rounded-lg shimmer" />
            </div>
          </div>

          {/* Right Content */}
          <div className="hidden lg:block">
            <div className="h-[600px] bg-neutral-800 rounded-3xl shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default {
  Card: CardSkeleton,
  List: ListSkeleton,
  Text: TextSkeleton,
  Hero: HeroSkeleton,
};
