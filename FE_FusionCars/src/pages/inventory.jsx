import Head from 'next/head';
import { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CarCard from '../components/CarCard';
import FilterModal from '../components/FilterModal';
import cars from '../data/cars.json';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';

/**
 * Inventory Page
 *
 * Car listing page with:
 * - Advanced filtering (brand, fuel type, price, transmission)
 * - Sorting options
 * - Responsive grid layout
 * - Search functionality
 * - Accessibility features
 */
export default function Inventory() {
  const [filters, setFilters] = useState({
    brand: '',
    fuelType: '',
    priceRange: [0, 10000000],
    transmission: '',
    search: '',
    yearRange: [2015, 2024],
    mileageRange: [0, 50],
    minRating: '',
  });

  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique values for filters
  const brands = [...new Set(cars.cars.map((car) => car.brand))];
  const fuelTypes = [...new Set(cars.cars.map((car) => car.fuelType))];
  const transmissions = [...new Set(cars.cars.map((car) => car.transmission))];

  // Filter and sort cars
  const filteredCars = useMemo(() => {
    let result = cars.cars.filter((car) => {
      const matchBrand = !filters.brand || car.brand === filters.brand;
      const matchFuel = !filters.fuelType || car.fuelType === filters.fuelType;
      const matchPrice = car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1];
      const matchTransmission = !filters.transmission || car.transmission === filters.transmission;
      const matchYear = car.year >= filters.yearRange[0] && car.year <= filters.yearRange[1];
      const matchMileage = !filters.mileageRange ||
        (car.mileage &&
         parseFloat(car.mileage) >= filters.mileageRange[0] &&
         parseFloat(car.mileage) <= filters.mileageRange[1]);
      const matchRating = !filters.minRating || (car.rating >= filters.minRating);
      const matchSearch =
        car.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        car.brand.toLowerCase().includes(filters.search.toLowerCase());

      return (
        matchBrand &&
        matchFuel &&
        matchPrice &&
        matchTransmission &&
        matchYear &&
        matchMileage &&
        matchRating &&
        matchSearch
      );
    });

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => b.year - a.year);
        break;
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [filters, sortBy]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      brand: '',
      fuelType: '',
      priceRange: [0, 10000000],
      transmission: '',
      search: '',
      yearRange: [2015, 2024],
      mileageRange: [0, 50],
      minRating: '',
    });
  };

  return (
    <>
      <Head>
        <title>Car Inventory - Fusion Cars</title>
        <meta
          name="description"
          content="Browse our complete inventory of premium vehicles. Filter by brand, price, fuel type, and more."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      {/* Page Header with Breadcrumb */}
      <section className="bg-white text-dark py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm">
            <a href="/" className="text-blue-600 hover:underline">Home</a>
            <span className="text-gray-400">›</span>
            <span className="text-gray-700 font-semibold">Collection</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-black leading-tight">
            More Than Cars - <span className="font-bold">It's a Way of Life.</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            We make driving your dream car seamless, swift, and unforgettable.
          </p>
        </div>
      </section>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Filter Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12 pb-6 border-b border-gray-200">
            <p className="text-lg font-semibold text-gray-900">
              Total {filteredCars.length} Results Found
            </p>

            <div className="flex gap-4 w-full sm:w-auto items-center">
              {/* Filter Button */}
              <button
                onClick={() => setShowFilters(true)}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                aria-label="Open filters"
              >
                <Filter className="w-5 h-5" />
                <span>Filters</span>
              </button>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                aria-label="Sort results"
              >
                <option value="featured">Sort by</option>
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {/* Filter Modal */}
          {showFilters && (
            <FilterModal
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={resetFilters}
              brands={brands}
              fuelTypes={fuelTypes}
              transmissions={transmissions}
              onClose={() => setShowFilters(false)}
            />
          )}

          {/* Main Content */}
          {/* Cars Grid */}
          {filteredCars.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {filteredCars.map((car) => (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  layout
                >
                  <CarCard car={car} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-12 bg-white rounded-lg border border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-xl text-gray-600 mb-4">No vehicles match your criteria</p>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetFilters}
                className="px-6 py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors"
              >
                Clear Filters
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
