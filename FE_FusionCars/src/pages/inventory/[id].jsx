import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CarImageGallery from '../../components/CarImageGallery';
import InspectionReport from '../../components/InspectionReport';
import ReviewSystem from '../../components/ReviewSystem';
import CarDetailsComparison from '../../components/CarDetailsComparison';
import { Heart, MessageCircle, Download, Share2, Phone, Mail, Sliders } from 'lucide-react';
import { motion } from 'framer-motion';
import cars from '../../data/cars.json';

/**
 * Car Detail Page
 *
 * Comprehensive vehicle details with:
 * - Multi-image gallery
 * - Inspection reports
 * - Customer reviews
 * - Detailed specifications
 * - Pricing information
 * - Contact options
 */

export default function CarDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [activeTab, setActiveTab] = useState('overview');
  const [isFavorite, setIsFavorite] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  // Find car in the database
  const car = cars.cars.find((c) => c.id === parseInt(id));

  if (!car) {
    return (
      <>
        <Head>
          <title>Car Not Found - Fusion Cars</title>
        </Head>
        <Navbar />
        <div className="min-h-screen bg-primary-black flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Car Not Found</h1>
            <p className="text-accent-stone mb-8">The vehicle you're looking for doesn't exist.</p>
            <button
              onClick={() => router.push('/inventory')}
              className="px-6 py-3 bg-accent-gold text-primary-black font-bold rounded-lg hover:bg-yellow-500 transition"
            >
              Back to Inventory
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{car.brand} {car.model} - Fusion Cars</title>
        <meta
          name="description"
          content={`${car.brand} ${car.model} ${car.year} - Detailed inspection report, customer reviews, and specifications available. Priced at ₹${car.priceInWords}.`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      <div className="min-h-screen bg-primary-black py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-accent-stone text-sm mb-6"
          >
            <button
              onClick={() => router.push('/inventory')}
              className="hover:text-accent-gold transition"
            >
              Inventory
            </button>
            <span>/</span>
            <span className="text-accent-gold">{car.brand} {car.model}</span>
          </motion.div>

          {/* Hero Section - Full Width Gallery with Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 sm:mb-12"
          >
            {/* Main Gallery */}
            <div className="mb-6">
              <CarImageGallery car={car} />
            </div>
          </motion.div>

          {/* Header Section - Compact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 sm:mb-12"
          >
            {/* Left: Car Title & Quick Specs */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title & Price Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-primary-dark rounded-2xl p-6 sm:p-8 border border-accent-charcoal/50"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="text-accent-gold text-xs uppercase tracking-widest mb-2 font-semibold">
                      {car.brand}
                    </p>
                    <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">
                      {car.model}
                    </h1>
                  </div>
                  <div className="text-right">
                    <p className="text-accent-stone text-xs uppercase tracking-wide mb-1">Price</p>
                    <p className="text-3xl sm:text-4xl font-bold text-accent-gold">
                      ₹{car.priceInWords}
                    </p>
                  </div>
                </div>

                <p className="text-accent-stone text-sm mb-6">{car.year} Model • {car.bodyType || 'Premium Sedan'}</p>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-4 gap-3 mb-6 py-4 border-y border-accent-charcoal/50">
                  <div className="text-center">
                    <p className="text-accent-stone text-xs uppercase mb-1">Fuel</p>
                    <p className="text-white font-semibold text-sm">{car.fuelType}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-accent-stone text-xs uppercase mb-1">Trans</p>
                    <p className="text-white font-semibold text-sm">{car.transmission}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-accent-stone text-xs uppercase mb-1">KMPL</p>
                    <p className="text-white font-semibold text-sm">{car.mileage}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-accent-stone text-xs uppercase mb-1">Rating</p>
                    <p className="text-accent-gold font-semibold text-sm">⭐ {car.rating}</p>
                  </div>
                </div>

                {/* Action Buttons - Grid Layout */}
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`py-3 px-4 rounded-xl font-bold transition flex items-center justify-center gap-2 text-sm ${
                      isFavorite
                        ? 'bg-accent-gold/20 text-accent-gold border border-accent-gold'
                        : 'bg-accent-gold text-primary-black hover:bg-yellow-500'
                    }`}
                  >
                    <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
                    <span>{isFavorite ? 'Wishlisted' : 'Wishlist'}</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="py-3 px-4 bg-primary-charcoal border border-accent-gold text-accent-gold rounded-xl font-bold hover:bg-accent-gold/10 transition text-sm"
                  >
                    Test Drive
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowComparison(true)}
                    className="py-3 px-4 bg-primary-charcoal border border-accent-charcoal text-accent-stone rounded-xl font-bold hover:border-accent-gold hover:text-accent-gold transition flex items-center justify-center gap-2 text-sm"
                  >
                    <Sliders size={16} />
                    Compare
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="py-3 px-4 bg-primary-charcoal border border-accent-charcoal text-accent-stone rounded-xl font-bold hover:border-accent-gold hover:text-accent-gold transition flex items-center justify-center gap-2 text-sm"
                  >
                    <Share2 size={16} />
                    Share
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Right: Contact & Features */}
            <div className="space-y-6">
              {/* Contact Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-accent-gold/10 to-accent-gold/5 rounded-2xl p-6 border border-accent-gold/30"
              >
                <h3 className="text-white font-bold mb-4 text-lg">Get In Touch</h3>
                <div className="space-y-3">
                  <a
                    href="tel:+919876543210"
                    className="flex items-center gap-3 text-accent-stone hover:text-accent-gold transition group"
                  >
                    <div className="p-2.5 bg-accent-gold/20 rounded-lg group-hover:bg-accent-gold/30 transition">
                      <Phone size={18} className="text-accent-gold" />
                    </div>
                    <div>
                      <p className="text-xs text-accent-stone uppercase">Phone</p>
                      <p className="text-white font-semibold">+91 98765 43210</p>
                    </div>
                  </a>
                  <a
                    href="mailto:info@fusioncars.com"
                    className="flex items-center gap-3 text-accent-stone hover:text-accent-gold transition group"
                  >
                    <div className="p-2.5 bg-accent-gold/20 rounded-lg group-hover:bg-accent-gold/30 transition">
                      <Mail size={18} className="text-accent-gold" />
                    </div>
                    <div>
                      <p className="text-xs text-accent-stone uppercase">Email</p>
                      <p className="text-white font-semibold text-sm">info@fusioncars.com</p>
                    </div>
                  </a>
                </div>
              </motion.div>

              {/* Quick Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-primary-dark rounded-2xl p-6 border border-accent-charcoal"
              >
                <h3 className="text-white font-bold mb-4 text-lg">Highlights</h3>
                <ul className="space-y-2.5 text-sm">
                  <li className="flex items-start gap-2.5">
                    <span className="text-accent-gold mt-1">✓</span>
                    <span className="text-accent-stone">Full Service History</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-accent-gold mt-1">✓</span>
                    <span className="text-accent-stone">Zero Accident</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-accent-gold mt-1">✓</span>
                    <span className="text-accent-stone">Genuine Documents</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-accent-gold mt-1">✓</span>
                    <span className="text-accent-stone">Professionally Detailed</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </motion.div>

          {/* Tabs Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            {/* Tab Navigation - Modern Design */}
            <div className="flex gap-2 overflow-x-auto pb-4 border-b border-accent-charcoal/30">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'specifications', label: 'Specifications' },
                { id: 'gallery', label: 'Gallery' },
                { id: 'inspection', label: 'Inspection' },
                { id: 'reviews', label: 'Reviews' },
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 font-semibold whitespace-nowrap transition relative text-sm ${
                    activeTab === tab.id
                      ? 'text-accent-gold'
                      : 'text-accent-stone hover:text-accent-gold'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-gold to-accent-platinum"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'gallery' && <GalleryTab car={car} />}
            {activeTab === 'overview' && <OverviewTab car={car} />}
            {activeTab === 'inspection' && <InspectionReport car={car} />}
            {activeTab === 'reviews' && <ReviewSystem carId={car.id} carName={`${car.brand} ${car.model}`} />}
            {activeTab === 'specifications' && <SpecificationsTab car={car} />}
          </motion.div>
        </div>
      </div>

      {/* Comparison Modal */}
      <CarDetailsComparison
        currentCar={car}
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
      />

      <Footer />
    </>
  );
}

// Overview Tab Component
function OverviewTab({ car }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Vehicle Summary */}
      <div className="bg-primary-dark rounded-2xl p-8 border border-accent-charcoal">
        <h3 className="text-2xl font-bold text-white mb-4">About This Vehicle</h3>
        <p className="text-accent-stone mb-6 leading-relaxed">
          Experience luxury with this premium {car.year} {car.brand} {car.model}. With meticulous maintenance and comprehensive service history, this vehicle offers the perfect blend of performance and reliability.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-primary-charcoal/50 p-5 rounded-xl border border-accent-charcoal/50 hover:border-accent-gold/30 transition">
            <p className="text-accent-stone text-xs uppercase tracking-wider mb-2">Fuel Efficiency</p>
            <p className="text-2xl font-bold text-accent-gold">{car.mileage} KMPL</p>
          </div>
          <div className="bg-primary-charcoal/50 p-5 rounded-xl border border-accent-charcoal/50 hover:border-accent-gold/30 transition">
            <p className="text-accent-stone text-xs uppercase tracking-wider mb-2">Transmission</p>
            <p className="text-2xl font-bold text-accent-gold">{car.transmission}</p>
          </div>
          <div className="bg-primary-charcoal/50 p-5 rounded-xl border border-accent-charcoal/50 hover:border-accent-gold/30 transition">
            <p className="text-accent-stone text-xs uppercase tracking-wider mb-2">Fuel Type</p>
            <p className="text-2xl font-bold text-accent-gold">{car.fuelType}</p>
          </div>
          <div className="bg-primary-charcoal/50 p-5 rounded-xl border border-accent-charcoal/50 hover:border-accent-gold/30 transition">
            <p className="text-accent-stone text-xs uppercase tracking-wider mb-2">Body Type</p>
            <p className="text-2xl font-bold text-accent-gold">{car.bodyType || 'Sedan'}</p>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="bg-primary-dark rounded-2xl p-8 border border-accent-charcoal">
        <h3 className="text-2xl font-bold text-white mb-6">Why Choose This Vehicle?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'Complete service history with authorized service center',
            'Zero accident history - thoroughly inspected',
            'All original documents and spare keys included',
            'Premium interior with latest technology',
            'Extended warranty available',
            'Professional detailing and certification',
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 p-4 bg-primary-charcoal/30 rounded-xl border border-accent-charcoal/50 hover:border-accent-gold/20 transition">
              <span className="text-accent-gold font-bold text-lg mt-0.5 flex-shrink-0">✓</span>
              <span className="text-accent-stone text-sm leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Specifications Tab Component
function SpecificationsTab({ car }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {/* Basic Information */}
      <div className="bg-primary-dark rounded-2xl p-8 border border-accent-charcoal">
        <h3 className="text-xl font-bold text-white mb-6">Basic Information</h3>
        <div className="space-y-4">
          <SpecRow label="Brand" value={car.brand} />
          <SpecRow label="Model" value={car.model} />
          <SpecRow label="Year" value={car.year} />
          <SpecRow label="Registration" value={car.registration || 'Available'} />
          <SpecRow label="Body Type" value={car.bodyType || 'Sedan'} />
        </div>
      </div>

      {/* Engine & Performance */}
      <div className="bg-primary-dark rounded-2xl p-8 border border-accent-charcoal">
        <h3 className="text-xl font-bold text-white mb-6">Engine & Performance</h3>
        <div className="space-y-4">
          <SpecRow label="Engine Displacement" value={car.engineCc || '2000 CC'} />
          <SpecRow label="Fuel Type" value={car.fuelType} />
          <SpecRow label="Transmission" value={car.transmission} />
          <SpecRow label="Mileage" value={`${car.mileage} KMPL`} />
          <SpecRow label="Power" value={car.power || '180 BHP'} />
        </div>
      </div>

      {/* Comfort Features */}
      <div className="bg-primary-dark rounded-2xl p-8 border border-accent-charcoal">
        <h3 className="text-xl font-bold text-white mb-6">Comfort Features</h3>
        <div className="space-y-3 text-accent-stone text-sm">
          {[
            'Leather Interior',
            'Automatic Climate Control',
            'Power Windows',
            'Power Steering',
            'Cruise Control',
            'Touchscreen Infotainment',
          ].map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="text-accent-gold font-bold text-lg">✓</span>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Features */}
      <div className="bg-primary-dark rounded-2xl p-8 border border-accent-charcoal">
        <h3 className="text-xl font-bold text-white mb-6">Safety Features</h3>
        <div className="space-y-3 text-accent-stone text-sm">
          {[
            'ABS (Anti-lock Braking System)',
            'Dual Front Airbags',
            'Power Steering',
            'Impact-Absorbing Bumpers',
            'Child Safety Locks',
            'Brake Assist',
          ].map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="text-accent-gold font-bold text-lg">✓</span>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Gallery Tab Component
function GalleryTab({ car }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <CarImageGallery car={car} />
    </motion.div>
  );
}

// Specification Row Component
function SpecRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-accent-charcoal/30 last:border-b-0">
      <span className="text-accent-stone text-sm font-medium">{label}</span>
      <span className="text-white font-semibold text-lg">{value}</span>
    </div>
  );
}
