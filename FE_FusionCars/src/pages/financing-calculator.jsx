import Head from 'next/head';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdvancedFinancingCalculator from '../components/AdvancedFinancingCalculator';

/**
 * Financing Calculator Page
 *
 * Dedicated page for advanced financing calculations:
 * - Real-time EMI calculations
 * - Payment schedules and breakdowns
 * - Loan comparisons
 * - Affordability analysis
 * - Export & sharing features
 */

export default function FinancingCalculatorPage() {
  const [carPrice, setCarPrice] = useState(5000000); // Default 50 lakhs

  return (
    <>
      <Head>
        <title>Financing Calculator - Fusion Cars</title>
        <meta
          name="description"
          content="Advanced car financing calculator. Calculate EMI, compare interest rates, view payment schedules, and analyze loan affordability."
        />
        <meta
          name="keywords"
          content="financing calculator, EMI calculator, car loan, interest rate, payment schedule"
        />
        <meta property="og:title" content="Financing Calculator - Fusion Cars" />
        <meta
          property="og:description"
          content="Calculate EMI and finance your dream luxury car with our advanced financing calculator."
        />
        <meta property="og:type" content="website" />
      </Head>

      <Navbar />

      <div className="min-h-screen bg-primary-black py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Quick Car Price Selector */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Car Financing Calculator
            </h1>
            <p className="text-accent-stone text-lg mb-6">
              Calculate your monthly EMI, view payment schedules, and compare loan scenarios
            </p>

            <div className="bg-primary-dark rounded-lg p-6 border border-accent-charcoal">
              <label className="block text-accent-platinum font-semibold mb-4">
                Select Car Price (or enter custom amount):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
                {[2000000, 3500000, 5000000, 7500000, 10000000, 15000000].map((price) => (
                  <button
                    key={price}
                    onClick={() => setCarPrice(price)}
                    className={`py-3 px-4 rounded-lg font-semibold transition ${
                      carPrice === price
                        ? 'bg-accent-gold text-primary-black shadow-lg'
                        : 'bg-primary-charcoal text-accent-stone hover:bg-accent-charcoal border border-accent-charcoal'
                    }`}
                  >
                    ₹{(price / 100000).toFixed(0)}L
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-accent-platinum font-medium mb-2">
                  Custom Car Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent-stone">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={carPrice}
                    onChange={(e) => setCarPrice(parseFloat(e.target.value) || 0)}
                    placeholder="Enter car price"
                    className="w-full pl-8 pr-4 py-3 bg-primary-charcoal border border-accent-charcoal rounded-lg text-white placeholder-accent-stone focus:border-accent-gold outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Calculator */}
          <AdvancedFinancingCalculator carPrice={carPrice} />

          {/* FAQ Section */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <FAQItem
                question="What is EMI and how is it calculated?"
                answer="EMI (Equated Monthly Installment) is a fixed amount you pay every month towards your loan. It's calculated using the formula: EMI = [P × R × (1+R)^N] / [(1+R)^N - 1], where P is principal, R is monthly interest rate, and N is number of months."
              />
              <FAQItem
                question="What does DTI Ratio mean?"
                answer="Debt-to-Income (DTI) Ratio is the percentage of your gross monthly income that goes towards debt payments. It's calculated as (EMI / Monthly Income) × 100. Financial experts recommend keeping it below 40% for healthy finances."
              />
              <FAQItem
                question="Why does my EMI remain same throughout the tenure?"
                answer="EMI is designed to remain constant. However, the composition changes - initially more goes towards interest, and later more towards principal repayment. This is shown in the amortization schedule."
              />
              <FAQItem
                question="How can I reduce my EMI?"
                answer="You can reduce EMI by: (1) Increasing your down payment, (2) Extending the loan tenure, or (3) Getting a lower interest rate by improving your credit score or comparing different lenders."
              />
              <FAQItem
                question="What does amortization schedule show?"
                answer="Amortization schedule is a month-by-month breakdown showing how much of your EMI goes towards principal and interest, along with the remaining balance. It helps you understand your loan better."
              />
              <FAQItem
                question="Can I prepay my loan?"
                answer="Most car loans allow prepayment, which can help you save on interest. However, some lenders may charge prepayment penalties. Check with your lender for details."
              />
              <FAQItem
                question="What interest rates are typical for car loans in India?"
                answer="Car loan interest rates in India typically range from 6% to 15% per annum, depending on factors like credit score, lender, loan tenure, and down payment. Newer car loans often have better rates than used car loans."
              />
              <FAQItem
                question="Is the calculated EMI exact?"
                answer="The calculated EMI is indicative and based on the formula provided. Actual EMI may vary based on processing fees, insurance, GST, and other charges that your lender may impose."
              />
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-12 bg-primary-dark rounded-lg p-8 border border-accent-charcoal">
            <h2 className="text-3xl font-bold text-white mb-6">💡 Pro Tips for Smart Car Financing</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TipCard
                title="Increase Down Payment"
                description="A higher down payment reduces your loan amount and thus the EMI. Even a 5% increase can save thousands in interest."
              />
              <TipCard
                title="Compare Interest Rates"
                description="Use our comparison tool to see how different rates affect your total interest. Even 0.5% difference can save significant amount."
              />
              <TipCard
                title="Watch the DTI Ratio"
                description="Keep your EMI below 40% of your monthly income to avoid financial stress and maintain good credit health."
              />
              <TipCard
                title="Consider Longer Tenure"
                description="While longer tenure means more interest, lower EMI allows you to manage finances better. Find the right balance."
              />
              <TipCard
                title="Check Hidden Charges"
                description="Ask your lender about processing fees, documentation charges, and insurance. These can add 2-5% to your total cost."
              />
              <TipCard
                title="Plan Prepayment"
                description="If possible, prepay your loan when you have extra funds. This can significantly reduce total interest paid."
              />
            </div>
          </div>

          {/* Insurance Note */}
          <div className="mt-12 bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
            <h3 className="text-xl font-bold text-blue-400 mb-3">🛡️ Important Note on Insurance</h3>
            <p className="text-accent-stone">
              Your total car cost includes comprehensive insurance (usually 8-12% of car price per year). This calculator shows EMI only.
              Remember to budget for insurance, registration, and maintenance separately.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-primary-dark rounded-lg border border-accent-charcoal overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-primary-charcoal transition"
      >
        <h3 className="text-white font-semibold text-left">{question}</h3>
        <span className={`text-accent-gold text-xl transition ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="px-4 pb-4 pt-0 border-t border-accent-charcoal">
          <p className="text-accent-stone">{answer}</p>
        </div>
      )}
    </div>
  );
}

function TipCard({ title, description }) {
  return (
    <div className="bg-primary-charcoal rounded-lg p-6 border border-accent-charcoal hover:border-accent-gold transition">
      <h3 className="text-accent-gold font-bold mb-2">{title}</h3>
      <p className="text-accent-stone text-sm">{description}</p>
    </div>
  );
}
