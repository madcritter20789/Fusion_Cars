import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

/**
 * Testimonials Component
 *
 * Displays customer reviews and testimonials:
 * - Star ratings
 * - Customer names and reviews
 * - Smooth carousel animation
 * - Accessible aria labels for ratings
 */
export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      role: 'Business Owner',
      content:
        'Fusion Cars provided an exceptional experience. The vehicle quality is outstanding and the customer service is top-notch. Highly recommended!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
    },
    {
      id: 2,
      name: 'Priya Sharma',
      role: 'Architect',
      content:
        'Amazing collection and very helpful staff. They understood exactly what I needed and found the perfect car within my budget.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
    },
    {
      id: 3,
      name: 'Arun Verma',
      role: 'Software Engineer',
      content:
        'Best dealership in town! Fair pricing, transparent documentation, and excellent after-sales support. Will definitely buy from them again.',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop',
    },
    {
      id: 4,
      name: 'Sneha Patel',
      role: 'Marketing Manager',
      content:
        'The entire process was smooth and hassle-free. From test drive to final purchase, everything was professionally handled.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507591413556-6812c9d1c72e?w=80&h=80&fit=crop',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1" aria-label={`${rating} out of 5 stars`} role="img">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating) ? 'fill-accent-silver text-accent-silver' : 'text-accent-charcoal'
            }`}
            aria-hidden="true"
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 bg-primary-black" aria-label="Customer testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Real reviews from real customers who trust Fusion Cars for their vehicle needs.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial) => (
            <motion.article
              key={testimonial.id}
              className="bg-primary-charcoal rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-accent-charcoal"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              {/* Stars */}
              <div className="mb-4">{renderStars(testimonial.rating)}</div>

              {/* Review Text */}
              <p className="text-accent-platinum mb-6 line-clamp-4 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border border-accent-silver/30"
                  loading="lazy"
                />
                <div>
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="text-sm text-accent-stone">{testimonial.role}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-primary-dark to-primary-charcoal text-white rounded-lg p-8 text-center border border-accent-silver/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-4">Join Thousands of Satisfied Customers</h3>
          <p className="mb-6 text-accent-stone">Experience the Fusion Cars difference today</p>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary px-8 py-3 text-lg relative overflow-hidden"
            aria-label="Book a test drive now"
          >
            <span className="relative z-10">Book Test Drive Now</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
