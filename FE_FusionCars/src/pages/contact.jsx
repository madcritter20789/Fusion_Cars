import Head from 'next/head';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

/**
 * Contact Page
 *
 * Contact information and form with:
 * - Contact form with validation
 * - Company information
 * - Map integration
 * - Multiple contact methods
 * - Form submission handling
 * - Accessibility features
 */
export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      // Form is valid - here you would typically send data to a backend
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } else {
      setErrors(newErrors);
    }
  };

  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+91 (555) 123-4567', '+91 (555) 987-6543'],
      description: 'Available Mon-Sat, 9 AM - 6 PM IST',
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['hello@fusioncars.in', 'support@fusioncars.in'],
      description: 'We respond within 24 hours',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['123 Motors Avenue, Tech City', 'India 560001'],
      description: 'Open Mon-Sun, 10 AM - 8 PM',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon-Fri: 9 AM - 6 PM', 'Sat: 10 AM - 5 PM'],
      description: 'Closed on Sundays & Public Holidays',
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
        <title>Contact Us - Fusion Cars</title>
        <meta
          name="description"
          content="Get in touch with Fusion Cars. We're here to help with any questions about our vehicles and services."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      {/* Hero Section */}
      <section className="bg-primary-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">Get in Touch</h1>
          <p className="text-xl text-neutral-light">
            We're here to help and answer any question you might have
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-primary-black" aria-label="Contact methods">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-primary-dark rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <Icon className="w-12 h-12 text-accent-blue mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">{method.title}</h3>
                  {method.details.map((detail, idx) => (
                    <p key={idx} className="text-sm font-semibold text-accent-silver">
                      {detail}
                    </p>
                  ))}
                  <p className="text-xs text-accent-stone mt-2">{method.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-primary-dark" aria-label="Contact form section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              className="bg-primary-black rounded-lg p-8 shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Send us a Message</h2>

              {submitted && (
                <motion.div
                  className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  role="status"
                  aria-live="polite"
                >
                  <p className="font-semibold">Thank you! Your message has been sent successfully.</p>
                  <p className="text-sm">We'll get back to you soon.</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-accent-silver mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-primary-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue text-white ${
                      errors.name ? 'border-red-500' : 'border-accent-charcoal'
                    }`}
                    aria-label="Full name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-red-500 text-sm mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-accent-silver mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-primary-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue text-white ${
                      errors.email ? 'border-red-500' : 'border-accent-charcoal'
                    }`}
                    aria-label="Email address"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-red-500 text-sm mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-accent-silver mb-2"
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-primary-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue text-white ${
                      errors.phone ? 'border-red-500' : 'border-accent-charcoal'
                    }`}
                    aria-label="Phone number"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="text-red-500 text-sm mt-1">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-accent-silver mb-2"
                  >
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-primary-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue text-white ${
                      errors.subject ? 'border-red-500' : 'border-accent-charcoal'
                    }`}
                    aria-label="Subject"
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                  >
                    <option value="">Select a subject</option>
                    <option value="test-drive">Test Drive Request</option>
                    <option value="purchase">Purchase Inquiry</option>
                    <option value="support">Support</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.subject && (
                    <p id="subject-error" className="text-red-500 text-sm mt-1">
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-accent-silver mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    className={`w-full px-4 py-3 bg-primary-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue text-white resize-none ${
                      errors.message ? 'border-red-500' : 'border-accent-charcoal'
                    }`}
                    aria-label="Message"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  ></textarea>
                  {errors.message && (
                    <p id="message-error" className="text-red-500 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary-white w-full py-3 rounded-lg font-bold text-lg relative overflow-hidden"
                  aria-label="Send message"
                >
                  <span className="relative z-10">Send Message</span>
                </motion.button>
              </form>
            </motion.div>

            {/* Map & Info */}
            <motion.div
              className="flex flex-col gap-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {/* Map Placeholder */}
              <div className="rounded-lg overflow-hidden shadow-lg h-96 bg-primary-dark flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-accent-blue mx-auto mb-4" />
                  <p className="text-accent-stone">
                    Interactive map would be displayed here
                  </p>
                  <p className="text-sm text-accent-silver mt-2">
                    123 Motors Avenue, Tech City, India 560001
                  </p>
                </div>
              </div>

              {/* Additional Info */}
              <motion.div
                className="bg-primary-black rounded-lg p-8 shadow-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-white mb-4">Why Contact Us?</h3>
                <ul className="space-y-3">
                  <li className="flex gap-2">
                    <span className="text-accent-blue font-bold">✓</span>
                    <span className="text-accent-stone">Expert advice on vehicle selection</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-blue font-bold">✓</span>
                    <span className="text-accent-stone">Test drive scheduling</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-blue font-bold">✓</span>
                    <span className="text-accent-stone">Financing and payment options</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-blue font-bold">✓</span>
                    <span className="text-accent-stone">Trade-in valuations</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-blue font-bold">✓</span>
                    <span className="text-accent-stone">After-sales support</span>
                  </li>
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
