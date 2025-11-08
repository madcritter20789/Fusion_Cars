import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Check, Download, Heart, BarChart3, Filter, ChevronDown } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';
import ComparisonCharts from './ComparisonCharts';

/**
 * Advanced Car Comparison Component
 *
 * Premium comparison tool with:
 * - Up to 3 cars side-by-side
 * - Detailed specifications by category
 * - Comparison highlights (best price, mileage, rating)
 * - Visual spec charts
 * - Export to PDF/CSV
 * - Save comparisons
 */

export default function AdvancedCarComparison({ initialCars = [] }) {
  const [selectedCars, setSelectedCars] = useState(initialCars.slice(0, 3));
  const [availableCars, setAvailableCars] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({
    basic: true,
    performance: true,
    comfort: true,
    safety: true,
    documents: false,
    inspection: false,
  });
  const [compareMode, setCompareMode] = useState('detailed'); // 'detailed' or 'highlights'
  const [sortBy, setSortBy] = useState('price'); // price, year, mileage, rating
  const [filterBrand, setFilterBrand] = useState('');
  const [filterFuel, setFilterFuel] = useState('');

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.cars);
      const data = await response.json();
      setAvailableCars(data.data || []);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const addCar = (car) => {
    if (selectedCars.length < 3) {
      setSelectedCars([...selectedCars, car]);
      setShowAddModal(false);
    }
  };

  const removeCar = (index) => {
    setSelectedCars(selectedCars.filter((_, i) => i !== index));
  };

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Filter and sort available cars
  const filteredAvailableCars = useMemo(() => {
    let filtered = availableCars.filter(
      (car) => !selectedCars.find((c) => c._id === car._id)
    );

    if (filterBrand) {
      filtered = filtered.filter((car) =>
        car.brand.toLowerCase().includes(filterBrand.toLowerCase())
      );
    }

    if (filterFuel) {
      filtered = filtered.filter((car) => car.fuelType === filterFuel);
    }

    // Sort
    if (sortBy === 'price') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'year') {
      filtered.sort((a, b) => b.year - a.year);
    } else if (sortBy === 'mileage') {
      filtered.sort((a, b) => parseFloat(b.mileage) - parseFloat(a.mileage));
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return filtered;
  }, [availableCars, selectedCars, filterBrand, filterFuel, sortBy]);

  // Get unique brands
  const brands = useMemo(() => {
    return [...new Set(availableCars.map((c) => c.brand))].sort();
  }, [availableCars]);

  // Calculate highlights
  const highlights = useMemo(() => {
    if (selectedCars.length < 2) return {};

    return {
      lowestPrice: selectedCars.reduce((min, car) =>
        car.price < min.price ? car : min
      ),
      highestPrice: selectedCars.reduce((max, car) =>
        car.price > max.price ? car : max
      ),
      bestMileage: selectedCars.reduce((best, car) =>
        parseFloat(car.mileage) > parseFloat(best.mileage) ? car : best
      ),
      highestYear: selectedCars.reduce((newest, car) =>
        car.year > newest.year ? car : newest
      ),
      bestRating: selectedCars.reduce((best, car) =>
        (car.rating || 0) > (best.rating || 0) ? car : best
      ),
    };
  }, [selectedCars]);

  const exportComparison = (format) => {
    if (selectedCars.length < 2) {
      alert('Please select at least 2 cars to compare');
      return;
    }

    if (format === 'csv') {
      exportToCSV();
    } else if (format === 'pdf') {
      exportToPDF();
    }
  };

  const exportToCSV = () => {
    const specs = getAllSpecifications();
    let csv = 'Specification,' + selectedCars.map((c) => `${c.brand} ${c.model}`).join(',') + '\n';

    specs.forEach((spec) => {
      const row = [spec.label];
      selectedCars.forEach((car) => {
        row.push(spec.format ? spec.format(car[spec.key]) : car[spec.key] || 'N/A');
      });
      csv += row.join(',') + '\n';
    });

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv));
    element.setAttribute('download', 'car-comparison.csv');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const exportToPDF = () => {
    // Basic PDF export - in production, use a library like jsPDF
    const content = selectedCars
      .map((car) => `${car.brand} ${car.model} - ₹${(car.price / 100000).toFixed(2)} Lakh`)
      .join('\n');

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', 'car-comparison.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const saveComparison = () => {
    const comparison = {
      cars: selectedCars.map((c) => c._id),
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem('savedComparison', JSON.stringify(comparison));
    alert('Comparison saved successfully!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Advanced Car Comparison
        </h1>
        <p className="text-xl text-accent-stone">
          Compare up to 3 cars with detailed specifications and insights
        </p>
      </div>

      {/* View Mode Selector */}
      <div className="flex gap-4 mb-8 justify-center">
        <button
          onClick={() => setCompareMode('detailed')}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            compareMode === 'detailed'
              ? 'bg-accent-gold text-primary-black'
              : 'bg-primary-dark border border-accent-charcoal text-white hover:border-accent-gold'
          }`}
        >
          <BarChart3 className="inline mr-2" size={20} />
          Detailed Specs
        </button>
        <button
          onClick={() => setCompareMode('highlights')}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            compareMode === 'highlights'
              ? 'bg-accent-gold text-primary-black'
              : 'bg-primary-dark border border-accent-charcoal text-white hover:border-accent-gold'
          }`}
        >
          <Check className="inline mr-2" size={20} />
          Key Highlights
        </button>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="bg-primary-dark rounded-lg border border-accent-charcoal overflow-hidden hover:border-accent-gold transition"
          >
            {selectedCars[index] ? (
              <CarComparisonCard
                car={selectedCars[index]}
                onRemove={() => removeCar(index)}
                isHighlighted={highlights}
              />
            ) : (
              <AddCarCard onClick={() => setShowAddModal(true)} />
            )}
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      {selectedCars.length >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-4 mb-8 justify-center"
        >
          <button
            onClick={() => exportComparison('csv')}
            className="px-4 py-2 bg-primary-dark border border-accent-charcoal text-white rounded-lg hover:border-accent-gold transition flex items-center gap-2"
          >
            <Download size={18} />
            Export CSV
          </button>
          <button
            onClick={() => exportComparison('pdf')}
            className="px-4 py-2 bg-primary-dark border border-accent-charcoal text-white rounded-lg hover:border-accent-gold transition flex items-center gap-2"
          >
            <Download size={18} />
            Export PDF
          </button>
          <button
            onClick={saveComparison}
            className="px-4 py-2 bg-primary-dark border border-accent-charcoal text-white rounded-lg hover:border-accent-gold transition flex items-center gap-2"
          >
            <Heart size={18} />
            Save Comparison
          </button>
        </motion.div>
      )}

      {/* Comparison Content */}
      {selectedCars.length >= 2 && (
        <>
          {compareMode === 'highlights' ? (
            <>
              <ComparisonCharts cars={selectedCars} />
              <HighlightsComparison cars={selectedCars} highlights={highlights} />
            </>
          ) : (
            <>
              <ComparisonCharts cars={selectedCars} />
              <DetailedComparison cars={selectedCars} expandedCategories={expandedCategories} toggleCategory={toggleCategory} />
            </>
          )}
        </>
      )}

      {/* Add Car Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-primary-dark rounded-lg max-w-4xl w-full max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-accent-charcoal flex justify-between items-center sticky top-0 bg-primary-dark">
                <h2 className="text-2xl font-bold text-white">Select a Car</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-accent-stone hover:text-white transition"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Filters */}
              <div className="p-6 border-b border-accent-charcoal bg-primary-charcoal flex flex-wrap gap-4">
                <div className="flex-1 min-w-48">
                  <label className="block text-accent-stone text-sm mb-2">Brand</label>
                  <input
                    type="text"
                    placeholder="Search brand..."
                    value={filterBrand}
                    onChange={(e) => setFilterBrand(e.target.value)}
                    className="w-full px-4 py-2 bg-primary-dark border border-accent-charcoal rounded text-white placeholder-accent-stone focus:border-accent-gold outline-none"
                  />
                </div>
                <div className="flex-1 min-w-48">
                  <label className="block text-accent-stone text-sm mb-2">Fuel Type</label>
                  <select
                    value={filterFuel}
                    onChange={(e) => setFilterFuel(e.target.value)}
                    className="w-full px-4 py-2 bg-primary-dark border border-accent-charcoal rounded text-white focus:border-accent-gold outline-none"
                  >
                    <option value="">All Fuel Types</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Electric">Electric</option>
                    <option value="CNG">CNG</option>
                  </select>
                </div>
                <div className="flex-1 min-w-48">
                  <label className="block text-accent-stone text-sm mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-2 bg-primary-dark border border-accent-charcoal rounded text-white focus:border-accent-gold outline-none"
                  >
                    <option value="price">Price (Low to High)</option>
                    <option value="year">Year (Newest First)</option>
                    <option value="mileage">Mileage (Best First)</option>
                    <option value="rating">Rating (Highest First)</option>
                  </select>
                </div>
              </div>

              {/* Car List */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredAvailableCars.length > 0 ? (
                  filteredAvailableCars.map((car) => (
                    <motion.button
                      key={car._id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => addCar(car)}
                      className="flex gap-4 p-4 bg-primary-charcoal rounded-lg hover:bg-accent-charcoal transition text-left border border-accent-charcoal hover:border-accent-gold"
                    >
                      <img
                        src={car.image || 'https://via.placeholder.com/100'}
                        alt={car.name}
                        className="w-24 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{car.name}</h3>
                        <p className="text-accent-stone text-sm">
                          {car.year} | {car.fuelType}
                        </p>
                        <p className="text-accent-silver font-bold mt-1">
                          ₹{(car.price / 100000).toFixed(2)}L
                        </p>
                        {car.rating && (
                          <p className="text-accent-gold text-xs mt-1">
                            ⭐ {car.rating.toFixed(1)} ({car.reviews || 0} reviews)
                          </p>
                        )}
                      </div>
                    </motion.button>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8 text-accent-stone">
                    No cars match your filters
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CarComparisonCard({ car, onRemove, isHighlighted }) {
  const isBestPrice = isHighlighted.lowestPrice?._id === car._id;
  const isBestMileage = isHighlighted.bestMileage?._id === car._id;
  const isBestRating = isHighlighted.bestRating?._id === car._id;

  return (
    <div className="relative">
      {/* Best badges */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2 z-10">
        {isBestPrice && (
          <span className="px-2 py-1 bg-accent-gold text-primary-black text-xs font-bold rounded">
            Best Price
          </span>
        )}
        {isBestMileage && (
          <span className="px-2 py-1 bg-green-600 text-white text-xs font-bold rounded">
            Best Mileage
          </span>
        )}
        {isBestRating && (
          <span className="px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded">
            Best Rated
          </span>
        )}
      </div>

      <button
        onClick={onRemove}
        className="absolute top-4 right-4 z-10 p-2 bg-red-600 rounded-full hover:bg-red-700 transition"
      >
        <X size={16} className="text-white" />
      </button>

      <img
        src={car.image || 'https://via.placeholder.com/400x300'}
        alt={car.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{car.name}</h3>
        <p className="text-accent-stone mb-4 text-sm">
          {car.year} | {car.fuelType} | {car.transmission}
        </p>
        <p className="text-2xl font-bold text-accent-silver mb-4">
          ₹{(car.price / 100000).toFixed(2)} Lakh
        </p>

        {car.rating && (
          <div className="mb-4 pb-4 border-b border-accent-charcoal">
            <p className="text-accent-gold font-semibold">
              ⭐ {car.rating.toFixed(1)} / 5.0
            </p>
            <p className="text-accent-stone text-xs">({car.reviews || 0} reviews)</p>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-accent-stone">Mileage</span>
            <span className="text-white font-semibold">{car.mileage}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-accent-stone">Engine</span>
            <span className="text-white font-semibold">{car.engineCapacity}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-accent-stone">Seating</span>
            <span className="text-white font-semibold">{car.seating}</span>
          </div>
          {car.horsepower && (
            <div className="flex justify-between text-sm">
              <span className="text-accent-stone">Power</span>
              <span className="text-white font-semibold">{car.horsepower} hp</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AddCarCard({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full h-full min-h-[400px] flex flex-col items-center justify-center gap-4 hover:bg-primary-charcoal transition border-2 border-dashed border-accent-charcoal hover:border-accent-gold"
    >
      <Plus size={48} className="text-accent-stone" />
      <span className="text-accent-stone text-lg">Add Car to Compare</span>
    </button>
  );
}

function HighlightsComparison({ cars, highlights }) {
  const highlightItems = [
    { label: 'Lowest Price', car: highlights.lowestPrice },
    { label: 'Highest Price', car: highlights.highestPrice },
    { label: 'Best Mileage', car: highlights.bestMileage },
    { label: 'Newest Year', car: highlights.highestYear },
    { label: 'Best Rating', car: highlights.bestRating },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
    >
      {highlightItems.map((item) => (
        <div
          key={item.label}
          className="bg-primary-dark rounded-lg border border-accent-charcoal p-6"
        >
          <h3 className="text-accent-gold text-sm font-bold mb-3">{item.label}</h3>
          <p className="text-white font-semibold text-lg mb-2">{item.car?.name}</p>
          <p className="text-accent-stone text-sm mb-4">{item.car?.year}</p>
          {item.label === 'Lowest Price' || item.label === 'Highest Price' ? (
            <p className="text-accent-silver font-bold">
              ₹{(item.car?.price / 100000).toFixed(2)}L
            </p>
          ) : item.label === 'Best Mileage' ? (
            <p className="text-accent-silver font-bold">{item.car?.mileage}</p>
          ) : item.label === 'Best Rating' ? (
            <p className="text-accent-silver font-bold">⭐ {item.car?.rating?.toFixed(1)}</p>
          ) : (
            <p className="text-accent-silver font-bold">{item.car?.year}</p>
          )}
        </div>
      ))}
    </motion.div>
  );
}

function DetailedComparison({ cars, expandedCategories, toggleCategory }) {
  const specs = getAllSpecifications();
  const categories = groupSpecsByCategory(specs);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      {Object.entries(categories).map(([category, categorySpecs]) => (
        <motion.div
          key={category}
          className="bg-primary-dark rounded-lg border border-accent-charcoal overflow-hidden"
        >
          <button
            onClick={() => toggleCategory(category)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-primary-charcoal transition"
          >
            <h3 className="text-lg font-bold text-accent-gold capitalize">
              {category} Specifications
            </h3>
            <motion.div
              animate={{ rotate: expandedCategories[category] ? 180 : 0 }}
            >
              <ChevronDown size={20} className="text-accent-stone" />
            </motion.div>
          </button>

          <AnimatePresence>
            {expandedCategories[category] && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <table className="w-full">
                  <tbody>
                    {categorySpecs.map((spec) => (
                      <tr key={spec.key} className="border-t border-accent-charcoal/50 hover:bg-primary-charcoal">
                        <td className="px-6 py-4 text-accent-platinum font-medium min-w-48">
                          {spec.label}
                        </td>
                        {cars.map((car) => (
                          <td key={car._id} className="px-6 py-4 text-white">
                            {spec.format ? spec.format(car[spec.key]) : car[spec.key] || 'N/A'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  );
}

// Helper functions
function getAllSpecifications() {
  return [
    { label: 'Price', key: 'price', format: (val) => `₹${(val / 100000).toFixed(2)} Lakh`, category: 'basic' },
    { label: 'Year', key: 'year', category: 'basic' },
    { label: 'Body Type', key: 'bodyType', category: 'basic' },
    { label: 'Color', key: 'color', category: 'basic' },
    { label: 'Fuel Type', key: 'fuelType', category: 'basic' },
    { label: 'Transmission', key: 'transmission', category: 'basic' },
    { label: 'Condition', key: 'condition', category: 'basic' },

    { label: 'Mileage', key: 'mileage', category: 'performance' },
    { label: 'Engine Capacity', key: 'engineCapacity', category: 'performance' },
    { label: 'Horsepower', key: 'horsepower', format: (val) => val ? `${val} hp` : 'N/A', category: 'performance' },
    { label: 'Torque', key: 'torque', category: 'performance' },
    { label: 'KMs Driven', key: 'kmsDriven', format: (val) => `${val?.toLocaleString()} km`, category: 'performance' },

    { label: 'Seating', key: 'seating', category: 'comfort' },
    { label: 'Doors', key: 'doors', category: 'comfort' },
    { label: 'Comfort Features', key: 'comfortFeatures', format: (val) => val?.join(', ') || 'N/A', category: 'comfort' },

    { label: 'Safety Features', key: 'safetyFeatures', format: (val) => val?.join(', ') || 'N/A', category: 'safety' },

    { label: 'Registration', key: 'registrationNumber', category: 'documents' },
    { label: 'Registration State', key: 'registrationState', category: 'documents' },
    { label: 'Insurance Valid', key: 'insuranceValid', format: (val) => val ? 'Yes' : 'No', category: 'documents' },

    { label: 'Inspection Score', key: 'inspectionReport', format: (val) => val?.overallScore ? `${val.overallScore}/100` : 'N/A', category: 'inspection' },
    { label: 'Previous Owners', key: 'owners', category: 'inspection' },
  ];
}

function groupSpecsByCategory(specs) {
  return specs.reduce((acc, spec) => {
    const category = spec.category || 'basic';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(spec);
    return acc;
  }, {});
}
