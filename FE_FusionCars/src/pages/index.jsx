import Head from 'next/head';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';
import FeaturedShowcase from '../components/FeaturedShowcase';
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

      {/* Featured Cars Section */}
      <section className="py-10 bg-primary-black" aria-label="Featured vehicles">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Featured Collection
            </h2>
            <p className="text-base text-accent-stone max-w-2xl mx-auto">
              Explore our handpicked selection of premium vehicles
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
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
                className="btn-secondary-silver px-6 py-2.5 font-semibold relative overflow-hidden text-sm"
              >
                <span className="relative z-10">View All Vehicles</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Showcase - Let's Start a Lease */}
      <FeaturedShowcase
        title="Let's Start a Lease"
        subtitle="We are the best when it comes to exotic cars."
        image="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&h=700&fit=crop&q=90"
        buttonText="Explore More"
        buttonLink="/inventory"
      />

      {/* Why Choose Us Section */}
      <section className="py-10 bg-primary-dark" aria-label="Why choose Fusion Cars">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Why Choose Fusion Cars?
            </h2>
            <p className="text-base text-accent-stone max-w-2xl mx-auto">
              We're committed to providing the best experience in the automotive industry
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
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
                  className="bg-primary-charcoal rounded-lg p-5 text-center hover:shadow-lg transition-shadow duration-300 border border-accent-charcoal"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <Icon className="w-12 h-12 text-accent-silver mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-sm text-accent-platinum leading-relaxed">{benefit.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-10 bg-gradient-to-r from-primary-black via-primary-dark to-primary-charcoal text-white" aria-label="Call to action">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Drive Home Your Dream Car?</h2>
            <p className="text-base text-accent-stone mb-6 max-w-2xl mx-auto">
              Book a test drive today and experience the difference with Fusion Cars
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary px-6 py-2.5 text-sm relative overflow-hidden"
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
