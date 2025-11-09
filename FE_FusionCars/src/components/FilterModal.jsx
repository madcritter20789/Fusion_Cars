import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';

/**
 * Filter Modal Component - Popup Filter Design
 *
 * Displays filters in a modal popup with:
 * - Vehicle type selection with icons
 * - Brand dropdown
 * - Registration year filters
 * - Kms driven filters
 * - Fuel type filters
 * - Price range filters
 * - Show Cars button at bottom
 */
export default function FilterModal({
  filters,
  onFilterChange,
  onReset,
  brands,
  fuelTypes,
  transmissions,
  onClose,
}) {
  const [expandedSection, setExpandedSection] = useState({
    vehicleType: true,
    brand: false,
    year: false,
    mileage: false,
    fuel: false,
    price: false,
  });

  const toggleSection = (section) => {
    setExpandedSection((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Vehicle type options
  const vehicleTypes = [
    { name: 'Sedan', icon: '🚗' },
    { name: 'SUV', icon: '🚙' },
    { name: 'Coupe', icon: '🏎️' },
    { name: 'Hatchback', icon: '🚗' },
    { name: 'MUV-MPV', icon: '🚐' },
    { name: 'Convertible', icon: '🏍️' },
    { name: 'Sports', icon: '🏎️' },
  ];

  // Registration year ranges
  const yearRanges = [
    { label: '2000 - 2010', min: 2000, max: 2010 },
    { label: '2011 - 2020', min: 2011, max: 2020 },
    { label: '2021 - 2025', min: 2021, max: 2025 },
    { label: 'All', min: 2000, max: 2025 },
  ];

  // Mileage ranges
  const mileageRanges = [
    { label: 'Brand New', value: 0 },
    { label: '0-5000', value: 5000 },
    { label: '5000-10000', value: 10000 },
    { label: '10000-15000', value: 15000 },
    { label: '15000-20000', value: 20000 },
    { label: '20000 & Above', value: 20001 },
  ];

  // Price ranges
  const priceRanges = [
    { label: 'Less Than 50L', min: 0, max: 5000000 },
    { label: '50L to 1Cr', min: 5000000, max: 10000000 },
    { label: '1Cr to 1.5Cr', min: 10000000, max: 15000000 },
    { label: '1.5Cr & Above', min: 15000000, max: 100000000 },
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="fixed inset-0 overflow-y-auto z-50"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25 }}
        >
          <div className="flex items-start justify-center min-h-screen pt-12 px-4 sm:px-0">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-black">Filters</h2>
                <div className="flex items-center gap-3">
                  <button
                    onClick={onReset}
                    className="px-4 py-2 rounded-full border border-gray-400 text-gray-700 hover:bg-gray-100 transition-colors text-sm font-medium"
                  >
                    Reset
                  </button>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Close filters"
                  >
                    <X className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Vehicle Type */}
                <div>
                  <h3 className="text-lg font-semibold text-black mb-4">Vehicle type</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {vehicleTypes.map((type) => (
                      <button
                        key={type.name}
                        className="p-4 border-2 border-gray-300 rounded-lg hover:border-gray-900 hover:bg-gray-50 transition-all text-center"
                      >
                        <div className="text-3xl mb-2">{type.icon}</div>
                        <div className="text-sm font-medium text-black">{type.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brands Dropdown */}
                <div>
                  <button
                    onClick={() => toggleSection('brand')}
                    className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-black">All Brands</span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-700 transition-transform ${
                        expandedSection.brand ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {expandedSection.brand && (
                    <div className="mt-2 p-4 border border-gray-300 rounded-lg bg-gray-50 max-h-64 overflow-y-auto">
                      {brands.map((brand) => (
                        <label
                          key={brand}
                          className="flex items-center gap-3 py-2 cursor-pointer hover:bg-white px-2 rounded"
                        >
                          <input
                            type="checkbox"
                            checked={filters.brand === brand}
                            onChange={(e) =>
                              onFilterChange('brand', e.target.checked ? brand : '')
                            }
                            className="w-4 h-4 rounded"
                          />
                          <span className="text-gray-700">{brand}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Registration Year */}
                <div>
                  <h3 className="text-lg font-semibold text-black mb-3">Registration Year</h3>
                  <div className="flex flex-wrap gap-2">
                    {yearRanges.map((range, idx) => (
                      <button
                        key={idx}
                        className="px-4 py-2 border border-gray-300 rounded-full hover:border-gray-900 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700 hover:text-black"
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Kms Driven */}
                <div>
                  <h3 className="text-lg font-semibold text-black mb-3">Kms Driven</h3>
                  <div className="flex flex-wrap gap-2">
                    {mileageRanges.map((range, idx) => (
                      <button
                        key={idx}
                        className="px-4 py-2 border border-gray-300 rounded-full hover:border-gray-900 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700 hover:text-black"
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fuel Type */}
                <div>
                  <h3 className="text-lg font-semibold text-black mb-3">Fuel Type</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Petrol', 'Diesel', 'Hybrid', 'Electric'].map((fuel) => (
                      <button
                        key={fuel}
                        onClick={() =>
                          onFilterChange('fuelType', filters.fuelType === fuel ? '' : fuel)
                        }
                        className={`px-4 py-2 rounded-full border transition-colors text-sm font-medium ${
                          filters.fuelType === fuel
                            ? 'border-gray-900 bg-gray-900 text-white'
                            : 'border-gray-300 text-gray-700 hover:border-gray-900'
                        }`}
                      >
                        {fuel}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="text-lg font-semibold text-black mb-3">Price Range</h3>
                  <div className="flex flex-wrap gap-2">
                    {priceRanges.map((range, idx) => (
                      <button
                        key={idx}
                        className="px-4 py-2 border border-gray-300 rounded-full hover:border-gray-900 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700 hover:text-black"
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Show Cars Button */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
                <button
                  onClick={onClose}
                  className="w-full bg-gray-400 text-white py-4 rounded-lg font-semibold hover:bg-gray-500 transition-colors"
                >
                  Show Cars
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
