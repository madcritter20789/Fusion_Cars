import Head from 'next/head';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';
import FeaturedShowcase from '../components/FeaturedShowcase';
import RecentlyPosted from '../components/RecentlyPosted';
import CarCard from '../components/CarCard';
import cars from '../data/cars.json';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Zap, Shield, Award } from 'lucide-react';

/**
 * Home Page
 *
 * Main landing page displaying:
 * - Hero section with CTA
 * - Featured cars
 * - Why choose us section
 * - Customer testimonials
 * - Newsletter signup
 * - SEO optimized with meta tags
 * - Accessible HTML structure
 */
export default function Home() {
  const featuredCars = cars.cars.filter((car) => car.featured).slice(0, 3);

  const benefits = [
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Handpicked vehicles with excellent condition and performance.',
    },
    {
      icon: Shield,
      title: 'Certified Safe',
      description: 'All vehicles undergo rigorous safety inspections and testing.',
    },
    {
      icon: Zap,
      title: 'Fast Service',
      description: 'Quick paperwork, easy financing, and hassle-free transactions.',
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

  return (
    <>
      <Head>
        <title>Fusion Cars - Premium Vehicle Dealership</title>
        <meta
          name="description"
          content="Discover premium vehicles at Fusion Cars. Luxury sedans, sports cars, SUVs, and more. Test drive today!"
        />
        <meta name="keywords" content="cars, vehicles, dealership, luxury, test drive" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Fusion Cars - Premium Vehicle Dealership" />
        <meta
          property="og:description"
          content="Discover premium vehicles at Fusion Cars. Luxury sedans, sports cars, SUVs, and more."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://fusioncars.in" />
      </Head>

      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Recently Posted Cars - New Section */}
      <RecentlyPosted />

      {/* Featured Showcase - New Section */}
      <FeaturedShowcase
        title="Let's Start a Lease"
        subtitle="We are the best when it comes to exotic cars."
        image="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&h=700&fit=crop&q=90"
        buttonText="Explore More"
        buttonLink="/inventory"
      />

      {/* Featured Cars Section */}
      <section className="py-16 bg-primary-black" aria-label="Featured vehicles">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Featured Collection
            </h2>
            <p className="text-xl text-accent-stone max-w-2xl mx-auto">
              Explore our handpicked selection of premium vehicles
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featuredCars.map((car) => (
              <motion.div key={car.id} variants={itemVariants}>
                <CarCard car={car} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link href="/inventory">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary-silver px-8 py-4 font-semibold relative overflow-hidden"
              >
                <span className="relative z-10">View All Vehicles</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-primary-dark" aria-label="Why choose Fusion Cars">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose Fusion Cars?
            </h2>
            <p className="text-xl text-accent-stone max-w-2xl mx-auto">
              We're committed to providing the best experience in the automotive industry
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-primary-charcoal rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300 border border-accent-charcoal"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <Icon className="w-16 h-16 text-accent-silver mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-3">{benefit.title}</h3>
                  <p className="text-accent-platinum leading-relaxed">{benefit.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-black via-primary-dark to-primary-charcoal text-white" aria-label="Call to action">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Drive Home Your Dream Car?</h2>
            <p className="text-xl text-accent-stone mb-8 max-w-2xl mx-auto">
              Book a test drive today and experience the difference with Fusion Cars
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary px-8 py-4 text-lg relative overflow-hidden"
              aria-label="Book a test drive"
            >
              <span className="relative z-10">Schedule Test Drive</span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
