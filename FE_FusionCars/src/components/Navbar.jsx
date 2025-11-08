import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, Mail, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

/**
 * Luxury Navbar Component - PREMIUM REDESIGN
 *
 * Sophisticated navigation featuring:
 * - Glass-morphism with backdrop blur
 * - Elegant scroll-based transitions
 * - Premium gold accent colors
 * - Refined typography (Montserrat)
 * - Smooth micro-interactions
 * - Luxury CTAs with gold gradient
 * - Floating sticky behavior
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position for glass effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Collection', href: '/inventory' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Compare', href: '/advanced-compare' },
    { name: 'Financing', href: '/financing-calculator' },
    { name: 'Wishlist', href: '/wishlist' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Premium Top Bar - Contact Information */}
      <div className="bg-black/95 backdrop-blur-sm border-b border-white/5 hidden lg:block">
        <div className="luxury-container">
          <div className="flex justify-between items-center py-3 text-sm">
            <div className="flex gap-8 text-neutral-400">
              <a
                href="tel:+915551234567"
                className="flex items-center gap-2 hover:text-luxury-gold transition-colors group"
              >
                <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="font-medium">+91 (555) 123-4567</span>
              </a>
              <a
                href="mailto:info@fusioncars.in"
                className="flex items-center gap-2 hover:text-luxury-gold transition-colors group"
              >
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="font-medium">info@fusioncars.in</span>
              </a>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-neutral-400">Premium Showroom Hours:</span>
              <span className="text-luxury-gold font-semibold">Mon-Sat 9AM-7PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Luxury Navigation */}
      <motion.nav
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass-dark shadow-luxury-lg border-b border-white/10'
            : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="luxury-container">
          <div className="flex justify-between items-center h-24">
            {/* Luxury Logo */}
            <Link href="/" className="flex items-center group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3"
              >
                {/* Logo Icon with Gold Gradient */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-gold rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="relative w-12 h-12 bg-gradient-gold rounded-xl flex items-center justify-center shadow-gold-glow">
                    <span className="text-black font-bold text-xl font-serif">FC</span>
                  </div>
                </div>

                {/* Logo Text */}
                <div className="hidden sm:block">
                  <h1 className="font-serif text-2xl font-bold text-white tracking-tight">
                    Fusion Cars
                  </h1>
                  <p className="text-xs text-luxury-gold uppercase tracking-widest font-semibold">
                    Luxury Collection
                  </p>
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Link
                    href={link.href}
                    className="relative text-white hover:text-luxury-gold transition-colors duration-300 font-medium text-sm uppercase tracking-wider group font-display"
                  >
                    {link.name}

                    {/* Animated underline */}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-gold group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Right Section - CTA & Theme Toggle */}
            <div className="flex items-center gap-5">
              <ThemeToggle />

              {/* Premium CTA Button */}
              <Link href="/contact" className="hidden sm:block">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary px-6 py-3 flex items-center gap-2 text-sm group shadow-gold-glow relative overflow-hidden"
                  aria-label="Schedule consultation"
                >
                  <span className="relative z-10">Book Consultation</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
                </motion.button>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="lg:hidden p-2 text-white hover:text-luxury-gold transition-colors"
                aria-label="Toggle navigation menu"
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Luxury Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              id="mobile-menu"
              className="lg:hidden overflow-hidden glass-dark border-t border-white/10"
            >
              <div className="luxury-container py-8 space-y-6">
                {/* Mobile Nav Links */}
                <div className="space-y-4">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        className="block py-3 text-white hover:text-luxury-gold transition-colors font-medium text-lg border-b border-white/5 hover:border-luxury-gold/30"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="flex items-center justify-between">
                          <span>{link.name}</span>
                          <ChevronRight className="w-5 h-5 opacity-50" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-4"
                >
                  <Link href="/contact">
                    <button
                      className="btn-secondary w-full text-lg py-4 flex items-center justify-center gap-2 relative overflow-hidden"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="relative z-10">Schedule Consultation</span>
                      <ChevronRight className="w-5 h-5 relative z-10" />
                    </button>
                  </Link>
                </motion.div>

                {/* Mobile Contact Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="pt-6 border-t border-white/10 space-y-3"
                >
                  <a
                    href="tel:+915551234567"
                    className="flex items-center gap-3 text-neutral-300 hover:text-luxury-gold transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span>+91 (555) 123-4567</span>
                  </a>
                  <a
                    href="mailto:info@fusioncars.in"
                    className="flex items-center gap-3 text-neutral-300 hover:text-luxury-gold transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>info@fusioncars.in</span>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
