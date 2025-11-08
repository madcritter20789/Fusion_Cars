import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Check } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';
import { getImageWithFallback, getThumbnailPlaceholder } from '../utils/placeholders';

/**
 * Car Comparison Component
 *
 * Compare up to 3 cars side-by-side
 * Features that beat BigBoyToyz:
 * - Visual comparison with images
 * - Detailed spec comparison
 * - Price comparison with financing
 * - Easy add/remove cars
 */

export default function CarComparison({ initialCars = [] }) {
  const [selectedCars, setSelectedCars] = useState(initialCars.slice(0, 3));
  const [availableCars, setAvailableCars] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

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

  const comparisonSpecs = [
    { label: 'Price', key: 'price', format: (val) => `₹${(val / 100000).toFixed(2)} Lakh` },
    { label: 'Year', key: 'year' },
    { label: 'Fuel Type', key: 'fuelType' },
    { label: 'Transmission', key: 'transmission' },
    { label: 'Mileage', key: 'mileage' },
    { label: 'Engine', key: 'engineCapacity' },
    { label: 'Seating', key: 'seating' },
    { label: 'Color', key: 'color' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Compare Cars
        </h1>
        <p className="text-xl text-accent-stone">
          Compare up to 3 cars side-by-side to make the best decision
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[0, 1, 2].map((index) => (
          <div key={index} className="bg-primary-dark rounded-lg border border-accent-charcoal overflow-hidden">
            {selectedCars[index] ? (
              <CarComparisonCard
                car={selectedCars[index]}
                onRemove={() => removeCar(index)}
              />
            ) : (
              <AddCarCard onClick={() => setShowAddModal(true)} />
            )}
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      {selectedCars.length >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 bg-primary-dark rounded-lg border border-accent-charcoal overflow-hidden"
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-accent-charcoal">
                <th className="px-6 py-4 text-left text-accent-silver font-semibold">
                  Specification
                </th>
                {selectedCars.map((car) => (
                  <th key={car._id} className="px-6 py-4 text-left text-white font-semibold">
                    {car.brand} {car.model}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonSpecs.map((spec) => (
                <tr key={spec.key} className="border-b border-accent-charcoal/50">
                  <td className="px-6 py-4 text-accent-platinum font-medium">
                    {spec.label}
                  </td>
                  {selectedCars.map((car) => (
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
              className="bg-primary-dark rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-accent-charcoal flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Select a Car</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-accent-stone hover:text-white transition"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableCars
                  .filter((car) => !selectedCars.find((c) => c._id === car._id))
                  .map((car) => (
                    <button
                      key={car._id}
                      onClick={() => addCar(car)}
                      className="flex gap-4 p-4 bg-primary-charcoal rounded-lg hover:bg-accent-charcoal transition text-left"
                    >
                      <img
                        src={getImageWithFallback(car.image, getThumbnailPlaceholder(96, 80))}
                        alt={car.name}
                        className="w-24 h-20 object-cover rounded"
                      />
                      <div>
                        <h3 className="text-white font-semibold">{car.name}</h3>
                        <p className="text-accent-stone text-sm">
                          {car.year} | {car.fuelType}
                        </p>
                        <p className="text-accent-silver font-bold mt-1">
                          ₹{(car.price / 100000).toFixed(2)}L
                        </p>
                      </div>
                    </button>
                  ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CarComparisonCard({ car, onRemove }) {
  return (
    <div className="relative">
      <button
        onClick={onRemove}
        className="absolute top-4 right-4 z-10 p-2 bg-red-600 rounded-full hover:bg-red-700 transition"
      >
        <X size={16} className="text-white" />
      </button>

      <img
        src={getImageWithFallback(car.image, `https://lorempicsum.com/api/cars/400/300?random=${car._id}`)}
        alt={car.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{car.name}</h3>
        <p className="text-accent-stone mb-4">
          {car.year} | {car.fuelType} | {car.transmission}
        </p>
        <p className="text-2xl font-bold text-accent-silver mb-4">
          ₹{(car.price / 100000).toFixed(2)} Lakh
        </p>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-accent-stone">Mileage</span>
            <span className="text-white">{car.mileage}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-accent-stone">Engine</span>
            <span className="text-white">{car.engineCapacity}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-accent-stone">Seating</span>
            <span className="text-white">{car.seating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddCarCard({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full h-full min-h-[400px] flex flex-col items-center justify-center gap-4 hover:bg-primary-charcoal transition border-2 border-dashed border-accent-charcoal"
    >
      <Plus size={48} className="text-accent-stone" />
      <span className="text-accent-stone text-lg">Add Car to Compare</span>
    </button>
  );
}
