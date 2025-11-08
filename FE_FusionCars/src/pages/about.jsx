import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { CheckCircle, Users, Trophy, Zap } from 'lucide-react';
import { getImageWithFallback, getAvatarPlaceholder } from '../utils/placeholders';

/**
 * About Page
 *
 * Company information page with:
 * - Company story and mission
 * - Core values
 * - Team highlights
 * - Company statistics
 * - Accessibility features
 */
export default function About() {
  const values = [
    {
      icon: Trophy,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our business and customer service.',
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We listen and deliver what you need.',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We embrace modern technology and innovative solutions for better experiences.',
    },
    {
      icon: CheckCircle,
      title: 'Integrity',
      description: 'We operate with honesty, transparency, and ethical business practices.',
    },
  ];

  const stats = [
    { number: '25+', label: 'Years in Business' },
    { number: '10K+', label: 'Happy Customers' },
    { number: '500+', label: 'Premium Vehicles' },
    { number: '98%', label: 'Customer Satisfaction' },
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
        <title>About Us - Fusion Cars</title>
        <meta
          name="description"
          content="Learn about Fusion Cars - your trusted premium vehicle dealership with 25+ years of excellence."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      {/* Hero Section */}
      <section className="bg-primary-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">About Fusion Cars</h1>
          <p className="text-xl text-neutral-light">
            Your trusted partner in premium automotive excellence
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-primary-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src={getImageWithFallback(
                  'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&h=400&fit=crop',
                  'https://lorempicsum.com/api/cars/500/400?random=1'
                )}
                alt="Fusion Cars headquarters"
                className="rounded-lg shadow-lg w-full"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">Our Story</h2>
              <p className="text-lg text-accent-stone mb-4 leading-relaxed">
                Founded in 1999, Fusion Cars began with a simple vision: to provide premium vehicles
                and exceptional service to customers who appreciate quality and reliability.
              </p>
              <p className="text-lg text-accent-stone mb-4 leading-relaxed">
                Over 25 years, we have grown from a small dealership to one of the most trusted
                names in the automotive industry. Our success is built on trust, transparency, and
                genuine care for our customers.
              </p>
              <p className="text-lg text-accent-stone leading-relaxed">
                Today, we continue to innovate and expand our offerings while maintaining the core
                values that made us successful. We're not just selling cars; we're building
                relationships.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-primary-black rounded-lg p-8 shadow-lg"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-accent-stone leading-relaxed">
                To deliver premium vehicles and exceptional service that exceed customer expectations,
                ensuring every client experiences luxury, reliability, and trust in their automotive
                journey.
              </p>
            </motion.div>

            <motion.div
              className="bg-primary-black rounded-lg p-8 shadow-lg"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-accent-stone leading-relaxed">
                To be the leading premium vehicle dealership, recognized for innovation, customer
                satisfaction, and integrity. We envision a future where quality vehicles and excellent
                service are accessible to everyone.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-primary-black" aria-label="Our core values">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our Core Values</h2>
            <p className="text-xl text-accent-stone max-w-2xl mx-auto">
              These principles guide everything we do
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-primary-dark rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <Icon className="w-12 h-12 text-accent-blue mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-accent-stone">{value.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-primary-charcoal text-white" aria-label="Company statistics">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={itemVariants}>
                <p className="text-4xl md:text-5xl font-bold text-accent-blue mb-2">{stat.number}</p>
                <p className="text-lg text-accent-stone">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-primary-black" aria-label="Our team">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-xl text-accent-stone max-w-2xl mx-auto">
              Dedicated professionals committed to your success
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { name: 'Raj Sharma', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop' },
              { name: 'Priya Mehta', role: 'Head of Operations', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop' },
              { name: 'Arjun Singh', role: 'Chief Sales Officer', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop' },
            ].map((member, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <img
                  src={getImageWithFallback(member.image, getAvatarPlaceholder(300, 300, member.name))}
                  alt={member.name}
                  className="w-48 h-48 rounded-lg mx-auto mb-4 object-cover shadow-lg"
                  loading="lazy"
                />
                <h3 className="text-xl font-bold text-white">{member.name}</h3>
                <p className="text-accent-stone">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent-blue text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4">Join Our Family</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience the difference that 25+ years of excellence can make
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-accent-blue px-8 py-4 rounded-lg font-bold text-lg hover:bg-neutral-light transition-colors duration-300"
            aria-label="Contact us"
          >
            Get in Touch
          </motion.button>
        </div>
      </section>

      <Footer />
    </>
  );
}
