import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Comparison Charts Component
 *
 * Visual comparison using animated bar charts and radar
 */

export default function ComparisonCharts({ cars }) {
  const [priceChartData, setPriceChartData] = useState([]);
  const [scoreChartData, setScoreChartData] = useState([]);

  useEffect(() => {
    if (cars.length < 2) return;

    // Price comparison data
    setPriceChartData(
      cars.map((car) => ({
        name: `${car.brand} ${car.model}`,
        price: car.price / 100000, // in lakhs
        color: car === cars[0] ? 'from-blue-500' : car === cars[1] ? 'from-purple-500' : 'from-pink-500',
      }))
    );

    // Overall score calculation
    setScoreChartData(
      cars.map((car, index) => {
        let score = 0;
        let factors = 0;

        // Mileage score (higher is better, normalized to 100)
        if (car.mileage) {
          const mileageValue = parseFloat(car.mileage);
          score += Math.min(mileageValue * 5, 100);
          factors += 1;
        }

        // Year score
        const yearScore = Math.min((car.year - 2010) * 2, 100);
        score += yearScore;
        factors += 1;

        // Rating score
        if (car.rating) {
          score += car.rating * 20;
          factors += 1;
        }

        const avgScore = factors > 0 ? Math.round(score / factors) : 0;

        return {
          name: `${car.brand} ${car.model}`,
          score: Math.min(avgScore, 100),
          color: index === 0 ? 'from-green-500' : index === 1 ? 'from-yellow-500' : 'from-orange-500',
        };
      })
    );
  }, [cars]);

  if (cars.length < 2) {
    return null;
  }

  const maxPrice = Math.max(...priceChartData.map((d) => d.price));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12"
    >
      {/* Price Comparison Chart */}
      <div className="bg-primary-dark rounded-lg border border-accent-charcoal p-8">
        <h3 className="text-xl font-bold text-white mb-6">Price Comparison</h3>
        <div className="space-y-6">
          {priceChartData.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-end gap-4">
                <span className="text-accent-silver font-semibold w-32 truncate text-sm">
                  {item.name}
                </span>
                <div className="flex-1">
                  <div className="relative h-8 bg-primary-charcoal rounded-lg overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.price / maxPrice) * 100}%` }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: 'easeOut' }}
                      className={`h-full bg-gradient-to-r ${item.color} to-transparent rounded-lg`}
                    />
                  </div>
                </div>
                <span className="text-accent-gold font-bold w-20 text-right">
                  ₹{item.price.toFixed(2)}L
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Price Stats */}
        <div className="mt-8 pt-6 border-t border-accent-charcoal">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-accent-stone text-sm mb-1">Lowest Price</p>
              <p className="text-accent-gold font-bold">
                ₹{Math.min(...priceChartData.map((d) => d.price)).toFixed(2)}L
              </p>
            </div>
            <div>
              <p className="text-accent-stone text-sm mb-1">Highest Price</p>
              <p className="text-accent-gold font-bold">
                ₹{maxPrice.toFixed(2)}L
              </p>
            </div>
            <div>
              <p className="text-accent-stone text-sm mb-1">Price Difference</p>
              <p className="text-accent-silver font-bold">
                ₹{(maxPrice - Math.min(...priceChartData.map((d) => d.price))).toFixed(2)}L
              </p>
            </div>
            <div>
              <p className="text-accent-stone text-sm mb-1">Average Price</p>
              <p className="text-accent-silver font-bold">
                ₹{(priceChartData.reduce((sum, d) => sum + d.price, 0) / priceChartData.length).toFixed(2)}L
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Overall Score Chart */}
      <div className="bg-primary-dark rounded-lg border border-accent-charcoal p-8">
        <h3 className="text-xl font-bold text-white mb-6">Overall Score</h3>
        <div className="space-y-6">
          {scoreChartData.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-end gap-4">
                <span className="text-accent-silver font-semibold w-32 truncate text-sm">
                  {item.name}
                </span>
                <div className="flex-1">
                  <div className="relative h-8 bg-primary-charcoal rounded-lg overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.score}%` }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: 'easeOut' }}
                      className={`h-full bg-gradient-to-r ${item.color} to-transparent rounded-lg`}
                    />
                  </div>
                </div>
                <span className="text-accent-gold font-bold w-20 text-right">
                  {item.score}/100
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Score Info */}
        <div className="mt-8 pt-6 border-t border-accent-charcoal">
          <p className="text-accent-stone text-xs mb-3">
            Score calculated based on mileage, year, and rating
          </p>
          <div className="flex gap-4">
            {scoreChartData.map((item, index) => (
              <div key={item.name} className="flex-1 text-center">
                <div className={`h-2 rounded-full bg-gradient-to-r ${item.color} mb-2`} />
                <p className="text-accent-stone text-xs">{item.name.split(' ')[0]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
