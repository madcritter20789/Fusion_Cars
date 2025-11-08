import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CarImageGallery from '../../components/CarImageGallery';
import InspectionReport from '../../components/InspectionReport';
import ReviewSystem from '../../components/ReviewSystem';
import { Heart, MessageCircle, Download, Share2, Phone, Mail } from 'lucide-react';
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

      <div className="min-h-screen bg-primary-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-accent-stone mb-8"
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

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
          >
            {/* Left: Gallery */}
            <div className="lg:col-span-2">
              <CarImageGallery car={car} />
            </div>

            {/* Right: Quick Info */}
            <div className="space-y-6">
              {/* Title & Price */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-primary-dark rounded-lg p-6 border border-accent-charcoal"
              >
                <p className="text-accent-gold text-sm uppercase tracking-widest mb-2">
                  {car.brand}
                </p>
                <h1 className="text-3xl font-bold text-white mb-1">{car.model}</h1>
                <p className="text-accent-stone mb-4">{car.year} Model</p>

                <div className="border-t border-accent-charcoal pt-4 mb-4">
                  <p className="text-accent-stone text-sm mb-1">Price</p>
                  <p className="text-3xl font-bold text-accent-gold">₹{car.priceInWords}</p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`w-full py-3 px-4 rounded-lg font-bold transition flex items-center justify-center gap-2 ${
                      isFavorite
                        ? 'bg-accent-gold/20 text-accent-gold border border-accent-gold'
                        : 'bg-accent-gold text-primary-black hover:bg-yellow-500'
                    }`}
                  >
                    <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
                    {isFavorite ? 'Added to Wishlist' : 'Add to Wishlist'}
                  </button>

                  <button className="w-full py-3 px-4 bg-primary-charcoal border border-accent-gold text-accent-gold rounded-lg font-bold hover:bg-accent-gold/10 transition">
                    Book Test Drive
                  </button>

                  <button className="w-full py-3 px-4 bg-primary-charcoal border border-accent-charcoal text-accent-platinum rounded-lg font-bold hover:border-accent-gold transition flex items-center justify-center gap-2">
                    <Share2 size={20} />
                    Share
                  </button>
                </div>
              </motion.div>

              {/* Contact Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-primary-dark rounded-lg p-6 border border-accent-charcoal"
              >
                <h3 className="text-white font-bold mb-4">Contact Us</h3>
                <div className="space-y-3">
                  <a
                    href="tel:+919876543210"
                    className="flex items-center gap-3 text-accent-stone hover:text-accent-gold transition"
                  >
                    <Phone size={20} />
                    <span>+91 98765 43210</span>
                  </a>
                  <a
                    href="mailto:info@fusioncars.com"
                    className="flex items-center gap-3 text-accent-stone hover:text-accent-gold transition"
                  >
                    <Mail size={20} />
                    <span>info@fusioncars.com</span>
                  </a>
                </div>
              </motion.div>

              {/* Key Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-primary-dark rounded-lg p-6 border border-accent-charcoal"
              >
                <h3 className="text-white font-bold mb-4">Key Features</h3>
                <ul className="space-y-2 text-accent-stone text-sm">
                  <li>✓ {car.transmission} Transmission</li>
                  <li>✓ {car.fuelType} Fuel</li>
                  <li>✓ {car.mileage} KMPL Mileage</li>
                  <li>✓ {car.year} Model Year</li>
                  <li>✓ Full Service History</li>
                  <li>✓ Genuine Documentation</li>
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
            {/* Tab Navigation */}
            <div className="flex gap-4 overflow-x-auto pb-4">
              {[
                { id: 'gallery', label: 'Gallery' },
                { id: 'overview', label: 'Overview' },
                { id: 'inspection', label: 'Inspection Report' },
                { id: 'reviews', label: 'Customer Reviews' },
                { id: 'specifications', label: 'Specifications' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-lg font-bold whitespace-nowrap transition ${
                    activeTab === tab.id
                      ? 'bg-accent-gold text-primary-black'
                      : 'bg-primary-dark text-accent-stone border border-accent-charcoal hover:border-accent-gold'
                  }`}
                >
                  {tab.label}
                </button>
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
      <div className="bg-primary-dark rounded-lg p-6 border border-accent-charcoal">
        <h3 className="text-2xl font-bold text-white mb-4">Vehicle Summary</h3>
        <p className="text-accent-stone mb-4">
          Experience luxury with this premium {car.year} {car.brand} {car.model}. With meticulous maintenance and comprehensive service history, this vehicle offers the perfect blend of performance and reliability.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-primary-charcoal p-4 rounded-lg">
            <p className="text-accent-stone text-sm mb-1">Fuel Efficiency</p>
            <p className="text-2xl font-bold text-accent-gold">{car.mileage} KMPL</p>
          </div>
          <div className="bg-primary-charcoal p-4 rounded-lg">
            <p className="text-accent-stone text-sm mb-1">Transmission</p>
            <p className="text-2xl font-bold text-accent-gold">{car.transmission}</p>
          </div>
          <div className="bg-primary-charcoal p-4 rounded-lg">
            <p className="text-accent-stone text-sm mb-1">Fuel Type</p>
            <p className="text-2xl font-bold text-accent-gold">{car.fuelType}</p>
          </div>
          <div className="bg-primary-charcoal p-4 rounded-lg">
            <p className="text-accent-stone text-sm mb-1">Body Type</p>
            <p className="text-2xl font-bold text-accent-gold">{car.bodyType || 'Sedan'}</p>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="bg-primary-dark rounded-lg p-6 border border-accent-charcoal">
        <h3 className="text-2xl font-bold text-white mb-4">Why Choose This Vehicle?</h3>
        <ul className="space-y-3">
          {[
            'Complete service history with authorized service center',
            'Zero accident history - thoroughly inspected',
            'All original documents and spare keys included',
            'Premium interior with latest technology',
            'Extended warranty available',
            'Professional detailing and certification',
          ].map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-accent-stone">
              <span className="text-accent-gold font-bold mt-1">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
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
      <div className="bg-primary-dark rounded-lg p-6 border border-accent-charcoal">
        <h3 className="text-xl font-bold text-white mb-4">Basic Information</h3>
        <div className="space-y-3">
          <SpecRow label="Brand" value={car.brand} />
          <SpecRow label="Model" value={car.model} />
          <SpecRow label="Year" value={car.year} />
          <SpecRow label="Registration" value={car.registration || 'Available'} />
          <SpecRow label="Body Type" value={car.bodyType || 'Sedan'} />
        </div>
      </div>

      {/* Engine & Performance */}
      <div className="bg-primary-dark rounded-lg p-6 border border-accent-charcoal">
        <h3 className="text-xl font-bold text-white mb-4">Engine & Performance</h3>
        <div className="space-y-3">
          <SpecRow label="Engine Displacement" value={car.engineCc || '2000 CC'} />
          <SpecRow label="Fuel Type" value={car.fuelType} />
          <SpecRow label="Transmission" value={car.transmission} />
          <SpecRow label="Mileage" value={`${car.mileage} KMPL`} />
          <SpecRow label="Power" value={car.power || '180 BHP'} />
        </div>
      </div>

      {/* Comfort Features */}
      <div className="bg-primary-dark rounded-lg p-6 border border-accent-charcoal">
        <h3 className="text-xl font-bold text-white mb-4">Comfort Features</h3>
        <div className="space-y-2 text-accent-stone text-sm">
          {[
            'Leather Interior',
            'Automatic Climate Control',
            'Power Windows',
            'Power Steering',
            'Cruise Control',
            'Touchscreen Infotainment',
          ].map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-accent-gold">✓</span>
              {feature}
            </div>
          ))}
        </div>
      </div>

      {/* Safety Features */}
      <div className="bg-primary-dark rounded-lg p-6 border border-accent-charcoal">
        <h3 className="text-xl font-bold text-white mb-4">Safety Features</h3>
        <div className="space-y-2 text-accent-stone text-sm">
          {[
            'ABS (Anti-lock Braking System)',
            'Dual Front Airbags',
            'Power Steering',
            'Impact-Absorbing Bumpers',
            'Child Safety Locks',
            'Brake Assist',
          ].map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-accent-gold">✓</span>
              {feature}
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
      <div className="bg-primary-dark rounded-lg p-6 border border-accent-charcoal">
        <h3 className="text-2xl font-bold text-white mb-4">Image Gallery</h3>
        <p className="text-accent-stone mb-6">
          Browse through our extensive collection of high-quality images of this vehicle
        </p>
        <CarImageGallery car={car} />
      </div>
    </motion.div>
  );
}

// Specification Row Component
function SpecRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-accent-charcoal/30">
      <span className="text-accent-stone text-sm">{label}</span>
      <span className="text-white font-semibold">{value}</span>
    </div>
  );
}
