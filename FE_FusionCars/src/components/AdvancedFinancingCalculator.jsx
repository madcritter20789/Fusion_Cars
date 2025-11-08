import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator,
  TrendingDown,
  Calendar,
  DollarSign,
  Download,
  Share2,
  BarChart3,
  PieChart,
  ChevronDown,
  AlertCircle,
} from 'lucide-react';

/**
 * Advanced Financing Calculator Component
 *
 * Premium features:
 * - Real-time EMI calculation with exact formulas
 * - Multiple loan scenarios comparison
 * - Amortization schedule (payment breakdown)
 * - Visual charts (pie, bar)
 * - Loan comparison tool
 * - Affordability analysis
 * - Export & share functionality
 */

export default function AdvancedFinancingCalculator({ carPrice = 0 }) {
  const [loanAmount, setLoanAmount] = useState(carPrice ? carPrice * 0.8 : 0);
  const [downPayment, setDownPayment] = useState(carPrice ? carPrice * 0.2 : 0);
  const [interestRate, setInterestRate] = useState(9.5);
  const [tenure, setTenure] = useState(60);
  const [chartType, setChartType] = useState('pie'); // 'pie' or 'bar'
  const [expandedScheduleYear, setExpandedScheduleYear] = useState(null);
  const [showComparison, setShowComparison] = useState(false);
  const [compareRates, setCompareRates] = useState([9.5, 8.5, 7.5]);

  // EMI Calculation
  const calculateEMI = (principal, rate, months) => {
    if (principal <= 0 || months <= 0) return 0;
    const ratePerMonth = rate / 12 / 100;
    if (ratePerMonth === 0) return Math.round(principal / months);
    return Math.round(
      (principal * ratePerMonth * Math.pow(1 + ratePerMonth, months)) /
        (Math.pow(1 + ratePerMonth, months) - 1)
    );
  };

  const emi = calculateEMI(loanAmount, interestRate, tenure);
  const totalAmount = emi * tenure;
  const totalInterest = totalAmount - loanAmount;
  const interestPercentage = loanAmount > 0 ? (totalInterest / loanAmount) * 100 : 0;

  // Amortization Schedule
  const amortizationSchedule = useMemo(() => {
    const schedule = [];
    let remainingBalance = loanAmount;
    const ratePerMonth = interestRate / 12 / 100;

    for (let month = 1; month <= tenure; month++) {
      const interestPayment = Math.round(remainingBalance * ratePerMonth);
      const principalPayment = emi - interestPayment;
      remainingBalance -= principalPayment;

      schedule.push({
        month,
        emi,
        principalPayment,
        interestPayment,
        remainingBalance: Math.max(remainingBalance, 0),
      });
    }

    return schedule;
  }, [loanAmount, interestRate, tenure, emi]);

  // Year-wise breakdown
  const yearlyBreakdown = useMemo(() => {
    const yearly = [];
    let year = 1;
    let totalPrincipal = 0;
    let totalInterestYear = 0;
    let startMonth = 0;

    while (startMonth < tenure) {
      const endMonth = Math.min(startMonth + 12, tenure);
      const yearSchedule = amortizationSchedule.slice(startMonth, endMonth);

      const yearPrincipal = yearSchedule.reduce((sum, item) => sum + item.principalPayment, 0);
      const yearInterest = yearSchedule.reduce((sum, item) => sum + item.interestPayment, 0);

      totalPrincipal += yearPrincipal;
      totalInterestYear += yearInterest;

      yearly.push({
        year,
        principal: yearPrincipal,
        interest: yearInterest,
        totalPayment: yearPrincipal + yearInterest,
        cumulativePrincipal: totalPrincipal,
        cumulativeInterest: totalInterestYear,
      });

      startMonth = endMonth;
      year++;
    }

    return yearly;
  }, [amortizationSchedule, tenure]);

  // Comparison data for different interest rates
  const comparisonData = useMemo(() => {
    return compareRates.map((rate) => ({
      rate,
      emi: calculateEMI(loanAmount, rate, tenure),
      totalInterest: calculateEMI(loanAmount, rate, tenure) * tenure - loanAmount,
      totalAmount: calculateEMI(loanAmount, rate, tenure) * tenure,
    }));
  }, [loanAmount, tenure, compareRates]);

  // Affordability check
  const monthlyIncome = loanAmount * 0.15; // Estimated based on loan
  const dtiRatio = (emi / monthlyIncome) * 100;
  const isAffordable = dtiRatio <= 40;

  const handleDownPaymentChange = (value) => {
    const dp = parseFloat(value) || 0;
    const dp_clamped = Math.max(0, Math.min(dp, carPrice));
    setDownPayment(dp_clamped);
    setLoanAmount(carPrice - dp_clamped);
  };

  const handleLoanAmountChange = (value) => {
    const loan = parseFloat(value) || 0;
    const loan_clamped = Math.max(0, Math.min(loan, carPrice));
    setLoanAmount(loan_clamped);
    setDownPayment(carPrice - loan_clamped);
  };

  const exportCalculation = (format) => {
    let content = '';

    if (format === 'csv') {
      // CSV Export
      content = 'Financing Calculator Report\n';
      content += `Generated: ${new Date().toLocaleString()}\n\n`;
      content += `Car Price,₹${carPrice.toLocaleString()}\n`;
      content += `Down Payment,₹${downPayment.toLocaleString()} (${((downPayment / carPrice) * 100).toFixed(0)}%)\n`;
      content += `Loan Amount,₹${loanAmount.toLocaleString()}\n`;
      content += `Interest Rate,${interestRate}% per annum\n`;
      content += `Tenure,${tenure} months (${(tenure / 12).toFixed(1)} years)\n\n`;
      content += `Monthly EMI,₹${emi.toLocaleString()}\n`;
      content += `Total Interest,₹${totalInterest.toLocaleString()}\n`;
      content += `Total Amount,₹${totalAmount.toLocaleString()}\n\n`;
      content += 'Month,EMI,Principal,Interest,Remaining Balance\n';

      amortizationSchedule.forEach((item) => {
        content += `${item.month},₹${item.emi},₹${item.principalPayment},₹${item.interestPayment},₹${item.remainingBalance}\n`;
      });

      downloadFile(content, 'financing-calculation.csv', 'text/csv');
    } else if (format === 'json') {
      // JSON Export
      const data = {
        generatedAt: new Date().toISOString(),
        carPrice,
        downPayment,
        loanAmount,
        interestRate,
        tenure,
        results: {
          monthlyEMI: emi,
          totalInterest,
          totalAmount,
          interestPercentage,
        },
        amortizationSchedule,
        yearlyBreakdown,
      };

      content = JSON.stringify(data, null, 2);
      downloadFile(content, 'financing-calculation.json', 'application/json');
    }
  };

  const downloadFile = (content, filename, type) => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:' + type + ';charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-primary-dark rounded-lg p-6 md:p-8 border border-accent-charcoal">
        <div className="flex items-center gap-3 mb-2">
          <Calculator className="text-accent-silver" size={32} />
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Advanced Financing Calculator
          </h2>
        </div>
        <p className="text-accent-stone mt-2">
          Calculate loans, compare rates, and view detailed payment schedules
        </p>
      </div>

      {/* Main Calculator Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-1 bg-primary-dark rounded-lg p-6 border border-accent-charcoal space-y-6"
        >
          <h3 className="text-xl font-bold text-white">Loan Details</h3>

          {/* Car Price */}
          <div>
            <label className="block text-accent-platinum font-medium mb-2">Car Price</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent-stone">
                ₹
              </span>
              <input
                type="number"
                value={carPrice}
                disabled
                className="w-full pl-8 pr-4 py-3 bg-primary-charcoal border border-accent-charcoal rounded-lg text-white"
              />
            </div>
          </div>

          {/* Down Payment */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-accent-platinum font-medium">Down Payment</label>
              <span className="text-accent-gold font-bold">
                {carPrice > 0 ? ((downPayment / carPrice) * 100).toFixed(0) : 0}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max={carPrice}
              step="10000"
              value={downPayment}
              onChange={(e) => handleDownPaymentChange(e.target.value)}
              className="w-full h-2 bg-primary-charcoal rounded-lg appearance-none cursor-pointer accent-accent-gold"
            />
            <div className="mt-2 relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent-stone">
                ₹
              </span>
              <input
                type="number"
                value={downPayment}
                onChange={(e) => handleDownPaymentChange(e.target.value)}
                className="w-full pl-8 pr-4 py-2 bg-primary-charcoal border border-accent-charcoal rounded-lg text-white"
              />
            </div>
          </div>

          {/* Loan Amount */}
          <div>
            <label className="block text-accent-platinum font-medium mb-2">Loan Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent-stone">
                ₹
              </span>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => handleLoanAmountChange(e.target.value)}
                className="w-full pl-8 pr-4 py-3 bg-primary-charcoal border border-accent-charcoal rounded-lg text-white"
              />
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-accent-platinum font-medium">Interest Rate (% p.a.)</label>
              <span className="text-accent-gold font-bold">{interestRate.toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min="6"
              max="15"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              className="w-full h-2 bg-primary-charcoal rounded-lg appearance-none cursor-pointer accent-accent-gold"
            />
            <div className="mt-2 text-xs text-accent-stone">
              Market rate range: 6% - 15% p.a.
            </div>
          </div>

          {/* Tenure */}
          <div>
            <label className="block text-accent-platinum font-medium mb-3">Loan Tenure</label>
            <div className="grid grid-cols-4 gap-2">
              {[12, 24, 36, 48, 60, 72, 84, 96].map((months) => (
                <motion.button
                  key={months}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTenure(months)}
                  className={`py-2 px-2 rounded-lg font-medium text-sm transition ${
                    tenure === months
                      ? 'bg-accent-gold text-primary-black shadow-lg'
                      : 'bg-primary-charcoal text-accent-stone hover:bg-accent-charcoal border border-accent-charcoal'
                  }`}
                >
                  {months / 12}Y
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* EMI Card */}
          <motion.div
            key={emi}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="bg-gradient-to-br from-accent-gold to-yellow-500 rounded-lg p-8 text-primary-black shadow-xl"
          >
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={28} />
              <h3 className="text-lg font-semibold">Monthly EMI</h3>
            </div>
            <p className="text-5xl font-bold">₹{emi.toLocaleString()}</p>
            <p className="text-sm mt-2 opacity-90">
              for {(tenure / 12).toFixed(1)} years ({tenure} months)
            </p>
          </motion.div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricCard
              label="Total Interest"
              value={`₹${totalInterest.toLocaleString()}`}
              subtext={`${interestPercentage.toFixed(1)}% of loan`}
              icon={<TrendingDown size={20} />}
              color="orange"
            />
            <MetricCard
              label="Total Amount"
              value={`₹${totalAmount.toLocaleString()}`}
              subtext="Principal + Interest"
              icon={<Calendar size={20} />}
              color="blue"
            />
            <MetricCard
              label="Principal"
              value={`₹${loanAmount.toLocaleString()}`}
              subtext={`${((loanAmount / carPrice) * 100).toFixed(0)}% of price`}
              color="green"
            />
            <MetricCard
              label="DTI Ratio"
              value={`${dtiRatio.toFixed(1)}%`}
              subtext={isAffordable ? 'Affordable ✓' : 'High ⚠'}
              color={isAffordable ? 'green' : 'red'}
            />
          </div>

          {/* Payment Breakdown Visualization */}
          <div className="bg-primary-dark rounded-lg p-6 border border-accent-charcoal">
            <h4 className="text-white font-semibold mb-4">Payment Composition</h4>

            {/* Stacked Bar Chart */}
            <div className="h-12 flex rounded-lg overflow-hidden mb-4 shadow-lg">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(loanAmount / totalAmount) * 100}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="bg-gradient-to-r from-accent-silver to-gray-300"
              />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(totalInterest / totalAmount) * 100}%` }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                className="bg-gradient-to-r from-orange-400 to-red-500"
              />
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-accent-silver rounded" />
                <div>
                  <p className="text-accent-stone text-sm">Principal</p>
                  <p className="text-white font-bold">₹{loanAmount.toLocaleString()}</p>
                  <p className="text-accent-stone text-xs">
                    {((loanAmount / totalAmount) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-orange-500 rounded" />
                <div>
                  <p className="text-accent-stone text-sm">Interest</p>
                  <p className="text-white font-bold">₹{totalInterest.toLocaleString()}</p>
                  <p className="text-accent-stone text-xs">
                    {((totalInterest / totalAmount) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Affordability Alert */}
      {!isAffordable && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 flex items-start gap-3"
        >
          <AlertCircle className="text-red-500 flex-shrink-0 mt-1" size={20} />
          <div>
            <h4 className="text-red-400 font-semibold">High Debt-to-Income Ratio</h4>
            <p className="text-red-300 text-sm mt-1">
              Your EMI is {dtiRatio.toFixed(1)}% of estimated income. Financial experts recommend keeping it below 40%.
              Consider increasing down payment or extending tenure.
            </p>
          </div>
        </motion.div>
      )}

      {/* Yearly Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-primary-dark rounded-lg p-6 border border-accent-charcoal"
      >
        <h3 className="text-xl font-bold text-white mb-4">Year-Wise Breakdown</h3>

        <div className="space-y-2">
          {yearlyBreakdown.map((year) => (
            <motion.div key={year.year}>
              <button
                onClick={() =>
                  setExpandedScheduleYear(expandedScheduleYear === year.year ? null : year.year)
                }
                className="w-full flex items-center justify-between p-4 bg-primary-charcoal rounded-lg hover:bg-accent-charcoal transition border border-accent-charcoal/50"
              >
                <div className="flex items-center gap-4 flex-1 text-left">
                  <span className="text-accent-gold font-bold w-12">Year {year.year}</span>
                  <div className="flex-1">
                    <div className="h-2 bg-accent-charcoal rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent-silver to-accent-gold"
                        style={{ width: `${(year.principal / year.totalPayment) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">₹{year.totalPayment.toLocaleString()}</p>
                    <p className="text-accent-stone text-xs">
                      Principal: ₹{year.principal.toLocaleString()}
                    </p>
                  </div>
                </div>
                <motion.div animate={{ rotate: expandedScheduleYear === year.year ? 180 : 0 }}>
                  <ChevronDown className="text-accent-stone" size={20} />
                </motion.div>
              </button>

              {/* Monthly Breakdown for this Year */}
              <AnimatePresence>
                {expandedScheduleYear === year.year && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-primary-charcoal border-l-2 border-accent-gold"
                  >
                    <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
                      {amortizationSchedule
                        .slice((year.year - 1) * 12, year.year * 12)
                        .map((item, idx) => (
                          <div
                            key={item.month}
                            className="text-xs p-2 bg-primary-dark rounded border border-accent-charcoal/30 flex justify-between"
                          >
                            <span className="text-accent-stone">
                              Month {(year.year - 1) * 12 + idx + 1}
                            </span>
                            <span className="text-accent-silver">
                              P: ₹{item.principalPayment.toLocaleString()}
                            </span>
                            <span className="text-orange-400">
                              I: ₹{item.interestPayment.toLocaleString()}
                            </span>
                            <span className="text-accent-gold">
                              Bal: ₹{item.remainingBalance.toLocaleString()}
                            </span>
                          </div>
                        ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Comparison Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-primary-dark rounded-lg p-6 border border-accent-charcoal"
      >
        <button
          onClick={() => setShowComparison(!showComparison)}
          className="flex items-center justify-between w-full mb-4"
        >
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <BarChart3 size={24} />
            Compare Interest Rates
          </h3>
          <motion.div animate={{ rotate: showComparison ? 180 : 0 }}>
            <ChevronDown className="text-accent-stone" size={20} />
          </motion.div>
        </button>

        <AnimatePresence>
          {showComparison && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {comparisonData.map((data, idx) => (
                  <motion.div
                    key={data.rate}
                    whileHover={{ scale: 1.05 }}
                    className={`p-4 rounded-lg border-2 transition ${
                      data.rate === interestRate
                        ? 'bg-accent-gold/20 border-accent-gold'
                        : 'bg-primary-charcoal border-accent-charcoal'
                    }`}
                  >
                    <p className="text-accent-platinum font-semibold mb-2">
                      @ {data.rate.toFixed(1)}% Interest
                    </p>
                    <div className="space-y-1 text-sm">
                      <p className="text-white">
                        <span className="text-accent-stone">EMI: </span>
                        <span className="font-bold">₹{data.emi.toLocaleString()}</span>
                      </p>
                      <p className="text-white">
                        <span className="text-accent-stone">Total Interest: </span>
                        <span className="font-bold text-orange-400">
                          ₹{data.totalInterest.toLocaleString()}
                        </span>
                      </p>
                      <p className="text-white">
                        <span className="text-accent-stone">Total Amount: </span>
                        <span className="font-bold text-accent-silver">
                          ₹{data.totalAmount.toLocaleString()}
                        </span>
                      </p>
                    </div>
                    {data.rate === interestRate && (
                      <p className="text-xs text-accent-gold mt-2 font-semibold">✓ Selected Rate</p>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Savings Calculation */}
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <p className="text-green-400 font-semibold mb-2">Potential Savings</p>
                <p className="text-accent-silver text-sm">
                  Lowering rate from {interestRate.toFixed(1)}% to 7.5% could save you{' '}
                  <span className="text-green-400 font-bold">
                    ₹{(comparisonData[0].totalInterest - comparisonData[2].totalInterest).toLocaleString()}
                  </span>{' '}
                  in interest
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Export Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-primary-dark rounded-lg p-6 border border-accent-charcoal"
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Download size={24} />
          Export & Share
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => exportCalculation('csv')}
            className="py-3 px-4 bg-accent-gold text-primary-black font-semibold rounded-lg hover:bg-yellow-500 transition flex items-center justify-center gap-2"
          >
            <Download size={18} />
            <span className="hidden sm:inline">Export CSV</span>
            <span className="sm:hidden">CSV</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => exportCalculation('json')}
            className="py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            <Download size={18} />
            <span className="hidden sm:inline">Export JSON</span>
            <span className="sm:hidden">JSON</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.print()}
            className="py-3 px-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2"
          >
            <Download size={18} />
            <span className="hidden sm:inline">Print</span>
            <span className="sm:hidden">Print</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const text = `Check out my financing calculation: EMI ₹${emi.toLocaleString()} for ₹${loanAmount.toLocaleString()} loan at ${interestRate}%`;
              navigator.clipboard.writeText(text);
              alert('Copied to clipboard!');
            }}
            className="py-3 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
          >
            <Share2 size={18} />
            <span className="hidden sm:inline">Copy</span>
            <span className="sm:hidden">Copy</span>
          </motion.button>
        </div>

        <p className="text-xs text-accent-stone mt-4">
          * This is an indicative calculation. Actual EMI may vary based on lender policies, processing fees, and other charges.
        </p>
      </motion.div>
    </div>
  );
}

// Metric Card Component
function MetricCard({ label, value, subtext, icon, color = 'gray' }) {
  const colorMap = {
    orange: 'bg-orange-500/10 border-orange-500/30 text-orange-400',
    blue: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    green: 'bg-green-500/10 border-green-500/30 text-green-400',
    red: 'bg-red-500/10 border-red-500/30 text-red-400',
    gray: 'bg-accent-charcoal border-accent-charcoal text-accent-stone',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`rounded-lg p-4 border flex flex-col justify-between ${colorMap[color]}`}
    >
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <p className="text-xs font-medium">{label}</p>
      </div>
      <p className="text-xl font-bold text-white">{value}</p>
      {subtext && <p className="text-xs mt-1 opacity-80">{subtext}</p>}
    </motion.div>
  );
}
