import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus } from 'lucide-react';
import cars from '../data/cars.json';

/**
 * Car Details Comparison Component
 *
 * Compare the current car with up to 2 other cars (max 3 total including current)
 * Features:
 * - Modal-based interface
 * - Easy add/remove cars
 * - Detailed spec comparison
 * - Search and filter available cars
 */

export default function CarDetailsComparison({ currentCar, onClose, isOpen }) {
  const [selectedCars, setSelectedCars] = useState([currentCar]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCars, setFilteredCars] = useState([]);

  useEffect(() => {
    // Filter cars excluding the current car and already selected cars
    const available = cars.cars.filter(
      (car) => car.id !== currentCar.id && !selectedCars.some((c) => c.id === car.id)
    );

    if (searchQuery) {
      setFilteredCars(
        available.filter(
          (car) =>
            car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
            car.year.toString().includes(searchQuery)
        )
      );
    } else {
      setFilteredCars(available);
    }
  }, [searchQuery, selectedCars, currentCar.id]);

  const addCar = (car) => {
    if (selectedCars.length < 3) {
      setSelectedCars([...selectedCars, car]);
    }
  };

  const removeCar = (carId) => {
    if (carId !== currentCar.id) {
      setSelectedCars(selectedCars.filter((car) => car.id !== carId));
    }
  };

  const comparisonSpecs = [
    { label: 'Price', key: 'priceInWords' },
    { label: 'Year', key: 'year' },
    { label: 'Fuel Type', key: 'fuelType' },
    { label: 'Transmission', key: 'transmission' },
    { label: 'Mileage', key: 'mileage' },
    { label: 'Engine Capacity', key: 'engineCapacity' },
    { label: 'Seating', key: 'seating' },
    { label: 'Color', key: 'color' },
    { label: 'Body Type', key: 'bodyType' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-primary-dark rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-accent-charcoal flex justify-between items-center sticky top-0 bg-primary-dark z-10">
              <div>
                <h2 className="text-2xl font-bold text-white">Compare Cars</h2>
                <p className="text-accent-stone text-sm mt-1">
                  Compare up to 3 cars including the current one
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-accent-stone hover:text-white transition p-2 hover:bg-primary-charcoal rounded-lg"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* Comparison Cards */}
              <div>
                <h3 className="text-white font-bold mb-4">Selected Cars ({selectedCars.length}/3)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[0, 1, 2].map((index) => (
                    <div key={index}>
                      {selectedCars[index] ? (
                        <ComparisonCard
                          car={selectedCars[index]}
                          isCurrent={selectedCars[index].id === currentCar.id}
                          onRemove={() => removeCar(selectedCars[index].id)}
                        />
                      ) : (
                        selectedCars.length < 3 && (
                          <AddCarCard onClick={() => setShowAddModal(true)} />
                        )
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Comparison Table */}
              {selectedCars.length >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-white font-bold">Detailed Comparison</h3>
                  <div className="overflow-x-auto rounded-lg border border-accent-charcoal">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-accent-charcoal bg-primary-charcoal">
                          <th className="px-6 py-4 text-left text-accent-silver font-semibold whitespace-nowrap">
                            Specification
                          </th>
                          {selectedCars.map((car) => (
                            <th
                              key={car.id}
                              className="px-6 py-4 text-left text-white font-semibold whitespace-nowrap"
                            >
                              <div className="flex items-center gap-2">
                                <span className={car.id === currentCar.id ? 'text-accent-gold' : ''}>
                                  {car.brand} {car.model}
                                </span>
                                {car.id === currentCar.id && (
                                  <span className="text-xs bg-accent-gold/20 text-accent-gold px-2 py-1 rounded">
                                    Current
                                  </span>
                                )}
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {comparisonSpecs.map((spec, idx) => (
                          <tr
                            key={spec.key}
                            className={`border-b border-accent-charcoal/50 ${
                              idx % 2 === 0 ? 'bg-primary-charcoal/30' : ''
                            }`}
                          >
                            <td className="px-6 py-4 text-accent-platinum font-medium whitespace-nowrap">
                              {spec.label}
                            </td>
                            {selectedCars.map((car) => (
                              <td key={car.id} className="px-6 py-4 text-white">
                                {car[spec.key] || 'N/A'}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {/* Add Car Modal */}
              {showAddModal && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="fixed inset-0 bg-black/40 flex items-center justify-center z-[60] p-4"
                  onClick={() => setShowAddModal(false)}
                >
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="bg-primary-dark rounded-lg max-w-4xl w-full max-h-[70vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-6 border-b border-accent-charcoal flex justify-between items-center sticky top-0 bg-primary-dark">
                      <h2 className="text-2xl font-bold text-white">Select a Car to Compare</h2>
                      <button
                        onClick={() => setShowAddModal(false)}
                        className="text-accent-stone hover:text-white transition"
                      >
                        <X size={24} />
                      </button>
                    </div>

                    {/* Search */}
                    <div className="p-6 border-b border-accent-charcoal">
                      <input
                        type="text"
                        placeholder="Search by brand, model, or year..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-3 bg-primary-charcoal text-white rounded-lg border border-accent-charcoal focus:outline-none focus:border-accent-gold transition"
                      />
                    </div>

                    {/* Car List */}
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredCars.length > 0 ? (
                        filteredCars.map((car) => (
                          <motion.button
                            key={car.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => addCar(car)}
                            className="flex gap-4 p-4 bg-primary-charcoal rounded-lg hover:bg-accent-charcoal transition text-left border border-accent-charcoal/50 hover:border-accent-gold"
                          >
                            <img
                              src={car.image}
                              alt={`${car.brand} ${car.model}`}
                              className="w-24 h-20 object-cover rounded"
                              onError={(e) => {
                                e.target.src = `https://lorempicsum.com/api/cars/96/80?random=${car.id}`;
                              }}
                            />
                            <div className="flex-1">
                              <h3 className="text-white font-semibold">
                                {car.brand} {car.model}
                              </h3>
                              <p className="text-accent-stone text-sm">
                                {car.year} | {car.fuelType} | {car.transmission}
                              </p>
                              <p className="text-accent-gold font-bold mt-1">
                                ₹{car.priceInWords}
                              </p>
                            </div>
                            <div className="flex items-center">
                              <Plus size={20} className="text-accent-gold" />
                            </div>
                          </motion.button>
                        ))
                      ) : (
                        <div className="col-span-1 md:col-span-2 text-center py-8">
                          <p className="text-accent-stone">
                            {searchQuery ? 'No cars found matching your search' : 'All available cars are already selected'}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ComparisonCard({ car, isCurrent, onRemove }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative rounded-lg overflow-hidden border-2 transition ${
        isCurrent ? 'border-accent-gold bg-primary-charcoal/50' : 'border-accent-charcoal'
      }`}
    >
      {/* Remove Button */}
      {!isCurrent && (
        <button
          onClick={onRemove}
          className="absolute top-3 right-3 z-10 p-2 bg-red-600 rounded-full hover:bg-red-700 transition"
        >
          <X size={16} className="text-white" />
        </button>
      )}

      {/* Image */}
      <img
        src={car.image}
        alt={`${car.brand} ${car.model}`}
        className="w-full h-40 object-cover"
        onError={(e) => {
          e.target.src = `https://lorempicsum.com/api/cars/400/300?random=${car.id}`;
        }}
      />

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-bold text-white">{car.brand}</h3>
            <p className="text-accent-stone text-sm">{car.model}</p>
          </div>
          {isCurrent && (
            <span className="text-xs bg-accent-gold text-primary-black px-2 py-1 rounded font-bold">
              Current
            </span>
          )}
        </div>

        <p className="text-accent-gold font-bold mb-3">₹{car.priceInWords}</p>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-accent-stone">Year</span>
            <span className="text-white font-medium">{car.year}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-accent-stone">Fuel</span>
            <span className="text-white font-medium">{car.fuelType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-accent-stone">Transmission</span>
            <span className="text-white font-medium">{car.transmission}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-accent-stone">Mileage</span>
            <span className="text-white font-medium">{car.mileage}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function AddCarCard({ onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full h-full min-h-[300px] flex flex-col items-center justify-center gap-4 hover:bg-primary-charcoal/50 transition border-2 border-dashed border-accent-charcoal rounded-lg hover:border-accent-gold"
    >
      <Plus size={40} className="text-accent-stone" />
      <span className="text-accent-stone text-center">
        <div className="font-semibold">Add Car</div>
        <div className="text-xs">to Compare</div>
      </span>
    </motion.button>
  );
}
