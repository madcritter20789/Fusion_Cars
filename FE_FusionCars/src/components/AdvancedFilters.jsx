import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, Sliders, TrendingDown, DollarSign, Zap } from 'lucide-react';

/**
 * Advanced Filters Component
 *
 * Comprehensive filtering system featuring:
 * - Brand filtering
 * - Price range slider
 * - Fuel type selection
 * - Transmission type
 * - Year range
 * - Mileage range
 * - Rating filter
 * - Reset all filters
 * - Mobile-friendly
 */

export default function AdvancedFilters({
  filters,
  onFilterChange,
  onReset,
  brands,
  fuelTypes,
  transmissions,
  showMobile = false,
  onClose,
}) {
  const [expandedSection, setExpandedSection] = useState({
    brand: true,
    price: true,
    fuel: true,
    transmission: false,
    year: false,
    rating: false,
  });

  const toggleSection = (section) => {
    setExpandedSection((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handlePriceChange = (index, value) => {
    const newRange = [...filters.priceRange];
    newRange[index] = parseInt(value);
    onFilterChange('priceRange', newRange);
  };

  const handleYearChange = (index, value) => {
    const newRange = [...(filters.yearRange || [2015, 2024])];
    newRange[index] = parseInt(value);
    onFilterChange('yearRange', newRange);
  };

  const handleMileageChange = (index, value) => {
    const newRange = [...(filters.mileageRange || [0, 100000])];
    newRange[index] = parseInt(value);
    onFilterChange('mileageRange', newRange);
  };

  const handleRatingChange = (value) => {
    onFilterChange('minRating', filters.minRating === value ? '' : value);
  };

  return (
    <motion.div
      className={`${showMobile ? 'fixed inset-0 z-50' : ''}`}
      initial={showMobile ? { opacity: 0 } : {}}
      animate={showMobile ? { opacity: 1 } : {}}
    >
      {/* Mobile Overlay */}
      {showMobile && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Filters Panel */}
      <motion.div
        className={`${
          showMobile
            ? 'fixed top-0 left-0 right-0 bottom-0 w-full max-w-sm bg-primary-dark z-50 overflow-y-auto rounded-r-3xl'
            : 'bg-primary-dark rounded-lg p-6'
        } border border-accent-charcoal`}
        initial={showMobile ? { x: '-100%' } : {}}
        animate={showMobile ? { x: 0 } : {}}
        transition={{ type: 'spring', damping: 25 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Sliders size={24} className="text-accent-gold" />
            Filters
          </h2>
          {showMobile && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-primary-charcoal rounded-lg transition"
            >
              <X size={24} className="text-accent-stone" />
            </button>
          )}
        </div>

        <div className="space-y-4">
          {/* Search */}
          <FilterSection title="Search" isExpanded={true}>
            <input
              type="text"
              placeholder="Car name or brand..."
              value={filters.search || ''}
              onChange={(e) => onFilterChange('search', e.target.value)}
              className="w-full px-4 py-2 bg-primary-charcoal border border-accent-charcoal rounded-lg text-white placeholder-accent-stone focus:border-accent-gold outline-none transition"
            />
          </FilterSection>

          {/* Brand Filter */}
          <FilterSection
            title="Brand"
            isExpanded={expandedSection.brand}
            onToggle={() => toggleSection('brand')}
            icon={<span className="text-accent-gold">🚗</span>}
          >
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {brands.map((brand) => (
                <label key={brand} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.brand === brand}
                    onChange={() =>
                      onFilterChange('brand', filters.brand === brand ? '' : brand)
                    }
                    className="w-4 h-4 rounded border-accent-charcoal accent-accent-gold cursor-pointer"
                  />
                  <span className="text-accent-stone hover:text-accent-gold transition">
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Price Range Filter */}
          <FilterSection
            title="Price Range"
            isExpanded={expandedSection.price}
            onToggle={() => toggleSection('price')}
            icon={<DollarSign size={18} className="text-accent-gold" />}
          >
            <div className="space-y-4">
              <div>
                <label className="block text-accent-stone text-sm mb-2">
                  Min: ₹{(filters.priceRange[0] / 100000).toFixed(1)}L
                </label>
                <input
                  type="range"
                  min="0"
                  max="10000000"
                  step="100000"
                  value={filters.priceRange[0]}
                  onChange={(e) => handlePriceChange(0, e.target.value)}
                  className="w-full accent-accent-gold cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-accent-stone text-sm mb-2">
                  Max: ₹{(filters.priceRange[1] / 100000).toFixed(1)}L
                </label>
                <input
                  type="range"
                  min="0"
                  max="10000000"
                  step="100000"
                  value={filters.priceRange[1]}
                  onChange={(e) => handlePriceChange(1, e.target.value)}
                  className="w-full accent-accent-gold cursor-pointer"
                />
              </div>

              <div className="bg-primary-charcoal rounded-lg p-3 text-center">
                <p className="text-accent-gold font-bold">
                  ₹{(filters.priceRange[0] / 100000).toFixed(1)}L - ₹
                  {(filters.priceRange[1] / 100000).toFixed(1)}L
                </p>
              </div>
            </div>
          </FilterSection>

          {/* Fuel Type Filter */}
          <FilterSection
            title="Fuel Type"
            isExpanded={expandedSection.fuel}
            onToggle={() => toggleSection('fuel')}
            icon={<Zap size={18} className="text-accent-gold" />}
          >
            <div className="space-y-2">
              {fuelTypes.map((fuel) => (
                <label key={fuel} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.fuelType === fuel}
                    onChange={() =>
                      onFilterChange('fuelType', filters.fuelType === fuel ? '' : fuel)
                    }
                    className="w-4 h-4 rounded border-accent-charcoal accent-accent-gold cursor-pointer"
                  />
                  <span className="text-accent-stone hover:text-accent-gold transition">
                    {fuel}
                  </span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Transmission Filter */}
          <FilterSection
            title="Transmission"
            isExpanded={expandedSection.transmission}
            onToggle={() => toggleSection('transmission')}
            icon={<span className="text-accent-gold">⚙️</span>}
          >
            <div className="space-y-2">
              {transmissions.map((trans) => (
                <label key={trans} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.transmission === trans}
                    onChange={() =>
                      onFilterChange(
                        'transmission',
                        filters.transmission === trans ? '' : trans
                      )
                    }
                    className="w-4 h-4 rounded border-accent-charcoal accent-accent-gold cursor-pointer"
                  />
                  <span className="text-accent-stone hover:text-accent-gold transition">
                    {trans}
                  </span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Year Range Filter */}
          <FilterSection
            title="Year"
            isExpanded={expandedSection.year}
            onToggle={() => toggleSection('year')}
            icon={<span className="text-accent-gold">📅</span>}
          >
            <div className="space-y-4">
              <div>
                <label className="block text-accent-stone text-sm mb-2">
                  From: {filters.yearRange?.[0] || 2015}
                </label>
                <input
                  type="range"
                  min="2000"
                  max="2024"
                  value={filters.yearRange?.[0] || 2015}
                  onChange={(e) => handleYearChange(0, e.target.value)}
                  className="w-full accent-accent-gold cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-accent-stone text-sm mb-2">
                  To: {filters.yearRange?.[1] || 2024}
                </label>
                <input
                  type="range"
                  min="2000"
                  max="2024"
                  value={filters.yearRange?.[1] || 2024}
                  onChange={(e) => handleYearChange(1, e.target.value)}
                  className="w-full accent-accent-gold cursor-pointer"
                />
              </div>
            </div>
          </FilterSection>

          {/* Rating Filter */}
          <FilterSection
            title="Minimum Rating"
            isExpanded={expandedSection.rating}
            onToggle={() => toggleSection('rating')}
            icon={<span className="text-accent-gold">⭐</span>}
          >
            <div className="space-y-2">
              {[5, 4, 3].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleRatingChange(rating)}
                  className={`w-full p-3 rounded-lg transition flex items-center gap-2 ${
                    filters.minRating === rating
                      ? 'bg-accent-gold text-primary-black'
                      : 'bg-primary-charcoal text-accent-stone hover:border-accent-gold border border-accent-charcoal/50'
                  }`}
                >
                  {[...Array(rating)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                  <span className="ml-auto">{rating}+ Stars</span>
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Mileage Range Filter */}
          <FilterSection
            title="Mileage (KMPL)"
            isExpanded={expandedSection.year}
            onToggle={() => toggleSection('year')}
            icon={<TrendingDown size={18} className="text-accent-gold" />}
          >
            <div className="space-y-4">
              <div>
                <label className="block text-accent-stone text-sm mb-2">
                  Min: {filters.mileageRange?.[0] || 0} KMPL
                </label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="1"
                  value={filters.mileageRange?.[0] || 0}
                  onChange={(e) => handleMileageChange(0, e.target.value)}
                  className="w-full accent-accent-gold cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-accent-stone text-sm mb-2">
                  Max: {filters.mileageRange?.[1] || 50} KMPL
                </label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="1"
                  value={filters.mileageRange?.[1] || 50}
                  onChange={(e) => handleMileageChange(1, e.target.value)}
                  className="w-full accent-accent-gold cursor-pointer"
                />
              </div>
            </div>
          </FilterSection>

          {/* Reset Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onReset}
            className="w-full mt-6 px-6 py-3 bg-primary-charcoal border-2 border-accent-charcoal text-accent-stone rounded-lg font-bold hover:border-accent-gold hover:text-accent-gold transition"
          >
            Reset All Filters
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Filter Section Component
function FilterSection({ title, isExpanded, onToggle, icon, children }) {
  return (
    <motion.div
      className="border border-accent-charcoal rounded-lg overflow-hidden"
      initial={false}
    >
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between hover:bg-primary-charcoal transition"
      >
        <h3 className="text-accent-platinum font-semibold flex items-center gap-2">
          {icon}
          {title}
        </h3>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-accent-stone"
        >
          ▼
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-4 pb-4 border-t border-accent-charcoal/30"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
