import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Footer Component
 *
 * Main footer section with:
 * - Company information
 * - Quick links
 * - Contact details
 * - Social media links
 * - Newsletter subscription
 * - Accessible structure and navigation
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Our Showrooms',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Wallpapers', href: '/gallery' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'Gallery', href: '/gallery' },
      ],
    },
    {
      title: 'Why Us',
      links: [
        { name: 'The Team', href: '/about' },
        { name: 'Career', href: '/about' },
        { name: 'BBT Squad', href: '/about' },
        { name: 'Premium Service', href: '/about' },
      ],
    },
    {
      title: 'Services',
      links: [
        { name: 'Explore Collection', href: '/inventory' },
        { name: 'Car Financing', href: '/financing-calculator' },
        { name: 'Car Comparison', href: '/advanced-compare' },
        { name: 'Wishlist', href: '/wishlist' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
  ];

  return (
    <footer className="bg-primary-black text-white py-16" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <motion.div
          className="mb-12 pb-12 border-b border-accent-charcoal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
          <p className="text-accent-stone mb-6">Subscribe to get updates on new arrivals and special offers</p>
          <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-lg text-primary-black focus:outline-none focus:ring-2 focus:ring-accent-silver"
              aria-label="Email address for newsletter subscription"
              required
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-accent-silver text-primary-black px-8 py-3 rounded-lg font-semibold hover:bg-neutral-light transition-colors duration-300 shadow-lg"
              aria-label="Subscribe to newsletter"
            >
              Subscribe
            </motion.button>
          </form>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
              <div className="w-10 h-10 bg-accent-silver rounded-lg flex items-center justify-center">
                <span className="text-primary-black font-bold">FC</span>
              </div>
              Fusion Cars
            </h4>
            <p className="text-accent-stone mb-6">
              Your trusted partner for premium vehicles and exceptional service.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="text-accent-stone hover:text-accent-silver transition-colors duration-300"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h4 className="font-bold text-lg mb-6">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-accent-stone hover:text-accent-silver transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold text-lg mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-accent-silver mt-1 flex-shrink-0" />
                <div>
                  <p className="text-accent-stone">+91 (555) 123-4567</p>
                  <p className="text-accent-stone">+91 (555) 987-6543</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-accent-silver mt-1 flex-shrink-0" />
                <div>
                  <p className="text-accent-stone">hello@fusioncars.in</p>
                  <p className="text-accent-stone">support@fusioncars.in</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent-silver mt-1 flex-shrink-0" />
                <p className="text-accent-stone">123 Motors Avenue, Tech City, India 560001</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-accent-charcoal pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-accent-stone text-sm">
              © {currentYear} Fusion Cars. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="text-accent-stone hover:text-accent-silver transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-accent-stone hover:text-accent-silver transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-accent-stone hover:text-accent-silver transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
