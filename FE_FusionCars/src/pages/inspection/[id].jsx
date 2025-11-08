import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import InspectionReport from '../../components/InspectionReport';
import { Download, Share2, ArrowLeft, Calendar, User, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import cars from '../../data/cars.json';

/**
 * Inspection Detail Page
 *
 * Comprehensive vehicle inspection report page featuring:
 * - Detailed inspection metrics
 * - Vehicle history tracking
 * - Condition scoring
 * - Service records
 * - Damage history
 * - PDF export
 * - Share functionality
 */

export default function InspectionDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [copied, setCopied] = useState(false);

  // Find car in the database
  const car = cars.cars.find((c) => c.id === parseInt(id));

  if (!car) {
    return (
      <>
        <Head>
          <title>Inspection Not Found - Fusion Cars</title>
        </Head>
        <Navbar />
        <div className="min-h-screen bg-primary-black flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Inspection Not Found</h1>
            <p className="text-accent-stone mb-8">
              The inspection report you're looking for doesn't exist.
            </p>
            <button
              onClick={() => router.push('/inventory')}
              className="px-6 py-3 bg-accent-gold text-primary-black font-bold rounded-lg hover:bg-yellow-500 transition"
            >
              Back to Inventory
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const shareInspection = () => {
    const message = `Check out the inspection report for ${car.brand} ${car.model} (${car.year}) on Fusion Cars`;

    if (navigator.share) {
      navigator.share({
        title: `${car.brand} ${car.model} Inspection Report`,
        text: message,
      });
    } else {
      navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <Head>
        <title>
          {car.brand} {car.model} Inspection Report - Fusion Cars
        </title>
        <meta
          name="description"
          content={`Complete inspection report for ${car.brand} ${car.model} ${car.year}. View detailed vehicle history, condition scoring, and service records.`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      <div className="min-h-screen bg-primary-black py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-accent-gold hover:text-yellow-500 transition mb-6 font-semibold"
            >
              <ArrowLeft size={20} />
              Back
            </button>

            <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                  <FileText size={40} className="text-accent-gold" />
                  Inspection Report
                </h1>
                <p className="text-accent-stone text-lg">
                  {car.brand} {car.model} ({car.year})
                </p>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={shareInspection}
                  className="flex items-center gap-2 px-6 py-3 bg-primary-charcoal border border-accent-gold text-accent-gold rounded-lg hover:bg-accent-gold/10 transition font-bold"
                >
                  <Share2 size={20} />
                  {copied ? 'Copied!' : 'Share'}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-accent-gold text-primary-black rounded-lg hover:bg-yellow-500 transition font-bold"
                >
                  <Download size={20} />
                  Export PDF
                </motion.button>
              </div>
            </div>

            {/* Report Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InfoCard
                icon={<Calendar size={24} className="text-accent-gold" />}
                label="Inspection Date"
                value={new Date().toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              />
              <InfoCard
                icon={<User size={24} className="text-accent-gold" />}
                label="Inspector"
                value="Expert Inspector"
              />
              <InfoCard
                icon={<FileText size={24} className="text-accent-gold" />}
                label="Report Status"
                value="Certified"
              />
            </div>
          </motion.div>

          {/* Main Inspection Report Component */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <InspectionReport car={car} />
          </motion.div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 space-y-6"
          >
            {/* Inspection Warranty */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-green-400 mb-3">
                ✓ Inspection Warranty
              </h3>
              <p className="text-accent-stone">
                This vehicle has been thoroughly inspected by certified professionals and meets our quality standards. We stand behind every inspection with our satisfaction guarantee.
              </p>
            </div>

            {/* What's Included */}
            <div className="bg-primary-dark rounded-lg p-6 border border-accent-charcoal">
              <h3 className="text-xl font-bold text-white mb-4">What's Included in This Report</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Overall Condition Score',
                  'Exterior Inspection',
                  'Interior Assessment',
                  'Mechanical Check',
                  'Service History Review',
                  'Damage Documentation',
                  'Repair Records',
                  'Certification',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-accent-stone">
                    <span className="text-accent-gold font-bold">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-accent-blue/10 border border-accent-blue/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-accent-blue mb-3">Next Steps</h3>
              <ol className="space-y-2 text-accent-stone list-decimal list-inside">
                <li>Review the detailed inspection report above</li>
                <li>Check the condition scores for different categories</li>
                <li>Review the complete service and damage history</li>
                <li>Download and share the report with your trusted mechanic</li>
                <li>Contact us for any questions or clarifications</li>
              </ol>
            </div>

            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-accent-gold/20 to-accent-gold/5 rounded-lg p-8 border border-accent-gold/30 text-center"
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                Questions About This Vehicle?
              </h3>
              <p className="text-accent-stone mb-6">
                Our expert team is here to help you make an informed decision.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <button className="px-8 py-3 bg-accent-gold text-primary-black font-bold rounded-lg hover:bg-yellow-500 transition">
                  Schedule a Call
                </button>
                <button className="px-8 py-3 bg-primary-charcoal border border-accent-gold text-accent-gold font-bold rounded-lg hover:bg-accent-gold/10 transition">
                  Send a Message
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Back to Vehicle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 pt-8 border-t border-accent-charcoal text-center"
          >
            <p className="text-accent-stone mb-4">Ready to view more details about this vehicle?</p>
            <button
              onClick={() => router.push(`/inventory/${car.id}`)}
              className="px-8 py-3 bg-accent-gold text-primary-black font-bold rounded-lg hover:bg-yellow-500 transition"
            >
              View Full Vehicle Details
            </button>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}

// Info Card Component
function InfoCard({ icon, label, value }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-primary-dark rounded-lg p-4 border border-accent-charcoal flex items-start gap-4"
    >
      <div className="flex-shrink-0 mt-1">{icon}</div>
      <div>
        <p className="text-accent-stone text-sm mb-1">{label}</p>
        <p className="text-white font-bold text-lg">{value}</p>
      </div>
    </motion.div>
  );
}
