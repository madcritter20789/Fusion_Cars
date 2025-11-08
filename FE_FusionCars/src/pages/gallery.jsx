import Head from 'next/head';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CarImageGallery from '../components/CarImageGallery';
import { useCarImages } from '../hooks/useCarImages';
import { API_ENDPOINTS } from '../config/api';

/**
 * Gallery Page
 *
 * Showcase car galleries with:
 * - All cars with image galleries
 * - High-quality multi-image support
 * - 360° views and video tours
 * - Filtering and sorting
 * - Download and sharing capabilities
 */

export default function GalleryPage() {
  const [cars, setCars] = useState([]);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.cars);
      const data = await response.json();
      setCars(data.data || []);
      if (data.data && data.data.length > 0) {
        setSelectedCarId(data.data[0]._id);
      }
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectedCar = cars.find((c) => c._id === selectedCarId) || cars[0];
  const { images, videos } = useCarImages(selectedCar);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-primary-black flex items-center justify-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-gold mx-auto mb-4" />
            <p className="text-accent-stone">Loading gallery...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Car Gallery - Fusion Cars</title>
        <meta
          name="description"
          content="Browse high-quality multi-image galleries of luxury cars. View 20+ images per car including 360° views and video tours."
        />
        <meta
          name="keywords"
          content="car gallery, car images, luxury car photos, 360 degree view, video tour"
        />
        <meta property="og:title" content="Car Gallery - Fusion Cars" />
        <meta
          property="og:description"
          content="Explore stunning photography of our luxury car collection with 360° views."
        />
      </Head>

      <Navbar />

      <div className="min-h-screen bg-primary-black py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Car Gallery
            </h1>
            <p className="text-accent-stone text-lg">
              Browse high-quality photography of our luxury car collection with 20+ images,
              360° views, and video tours
            </p>
          </div>

          {/* Main Gallery */}
          {selectedCar && (
            <div className="mb-12">
              <div className="bg-primary-dark rounded-lg p-6 md:p-8 border border-accent-charcoal mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {selectedCar.brand} {selectedCar.model}
                </h2>
                <p className="text-accent-stone mb-4">{selectedCar.year} | {selectedCar.fuelType}</p>
                <Link
                  href={`/inventory/${selectedCar._id}`}
                  className="inline-block px-6 py-2 bg-accent-gold text-primary-black font-bold rounded-lg hover:bg-yellow-500 transition"
                >
                  View Full Details
                </Link>
              </div>

              <CarImageGallery car={selectedCar} images={images} videos={videos} />
            </div>
          )}

          {/* Car Selection Grid */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-white mb-6">
              Select a Car to View Gallery
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {cars.map((car) => (
                <button
                  key={car._id}
                  onClick={() => setSelectedCarId(car._id)}
                  className={`rounded-lg overflow-hidden border-2 transition ${
                    selectedCarId === car._id
                      ? 'border-accent-gold shadow-lg'
                      : 'border-accent-charcoal hover:border-accent-gold'
                  }`}
                >
                  <img
                    src={car.image || 'https://via.placeholder.com/300x200'}
                    alt={car.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-3 bg-primary-dark">
                    <h4 className="text-white font-semibold text-sm">{car.brand}</h4>
                    <p className="text-accent-stone text-xs">{car.model}</p>
                    <p className="text-accent-gold text-xs mt-1">
                      {car.year}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Statistics */}
          <div className="mt-16 bg-primary-dark rounded-lg p-8 border border-accent-charcoal">
            <h3 className="text-2xl font-bold text-white mb-6">Gallery Statistics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard label="Total Cars" value={cars.length} icon="🚗" />
              <StatCard label="Images per Car" value="20+" icon="📸" />
              <StatCard label="Video Tours" value="360° + More" icon="🎥" />
            </div>
          </div>

          {/* Gallery Features */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-white mb-6">Gallery Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FeatureCard
                icon="🖼️"
                title="High-Quality Images"
                description="20+ images per car covering all angles and details"
              />
              <FeatureCard
                icon="🔍"
                title="Zoom & Pan"
                description="Interactive zoom controls for detailed inspection"
              />
              <FeatureCard
                icon="🔄"
                title="360° Views"
                description="Interactive 360-degree vehicle views and walkthroughs"
              />
              <FeatureCard
                icon="📥"
                title="Download & Share"
                description="Download high-resolution images or share instantly"
              />
              <FeatureCard
                icon="🎬"
                title="Video Tours"
                description="Professional video walkthroughs and feature reviews"
              />
              <FeatureCard
                icon="📱"
                title="Mobile Optimized"
                description="Fully responsive design for all devices"
              />
            </div>
          </div>

          {/* Image Categories */}
          <div className="mt-12 bg-primary-dark rounded-lg p-8 border border-accent-charcoal">
            <h3 className="text-2xl font-bold text-white mb-6">Image Categories</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <CategoryCard
                name="Exterior"
                description="Full body shots and design details"
                icon="🚗"
              />
              <CategoryCard
                name="Interior"
                description="Seats, dashboard, and cabin features"
                icon="🪑"
              />
              <CategoryCard
                name="Engine"
                description="Engine bay and mechanical details"
                icon="⚙️"
              />
              <CategoryCard
                name="Dashboard"
                description="Control systems and instrument cluster"
                icon="📊"
              />
              <CategoryCard
                name="Wheels"
                description="Tire and wheel designs"
                icon="⭕"
              />
              <CategoryCard
                name="Details"
                description="Headlights, trim, and other features"
                icon="✨"
              />
            </div>
          </div>

          {/* Tips */}
          <div className="mt-12 bg-blue-500/10 border border-blue-500/30 rounded-lg p-8">
            <h3 className="text-xl font-bold text-blue-400 mb-4">💡 Gallery Tips</h3>
            <ul className="text-accent-stone space-y-2">
              <li>• Use zoom controls to inspect fine details and condition</li>
              <li>• Download high-resolution images for comparison or printing</li>
              <li>• Share images with friends and family via social media</li>
              <li>• View 360° tours for complete vehicle inspection</li>
              <li>• Watch video tours to see the car in action</li>
              <li>• Filter by image type to focus on specific areas</li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

// Helper Components

function StatCard({ label, value, icon }) {
  return (
    <div className="bg-primary-charcoal rounded-lg p-6 border border-accent-charcoal text-center">
      <div className="text-4xl mb-2">{icon}</div>
      <p className="text-accent-stone text-sm mb-2">{label}</p>
      <p className="text-2xl font-bold text-accent-gold">{value}</p>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-primary-charcoal rounded-lg p-6 border border-accent-charcoal">
      <div className="text-3xl mb-3">{icon}</div>
      <h4 className="text-white font-semibold mb-2">{title}</h4>
      <p className="text-accent-stone text-sm">{description}</p>
    </div>
  );
}

function CategoryCard({ name, description, icon }) {
  return (
    <div className="bg-primary-charcoal rounded-lg p-4 border border-accent-charcoal hover:border-accent-gold transition">
      <div className="text-2xl mb-2">{icon}</div>
      <h4 className="text-white font-semibold mb-1">{name}</h4>
      <p className="text-accent-stone text-xs">{description}</p>
    </div>
  );
}
