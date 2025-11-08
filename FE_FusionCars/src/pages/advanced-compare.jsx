import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdvancedCarComparison from '../components/AdvancedCarComparison';

/**
 * Advanced Car Comparison Page
 *
 * Premium feature for comparing cars side-by-side with:
 * - Detailed specifications by category
 * - Comparison highlights and insights
 * - Export functionality (CSV/PDF)
 * - Save comparisons
 * - Advanced filtering and sorting
 */

export default function AdvancedComparePage() {
  return (
    <>
      <Head>
        <title>Advanced Car Comparison - Fusion Cars</title>
        <meta
          name="description"
          content="Advanced car comparison tool. Compare luxury cars side-by-side with detailed specifications, pricing, and performance metrics. Make informed decisions with our premium comparison tool."
        />
        <meta
          name="keywords"
          content="car comparison, compare cars, luxury cars, advanced comparison, car specs, pricing"
        />
        <meta property="og:title" content="Advanced Car Comparison - Fusion Cars" />
        <meta
          property="og:description"
          content="Compare up to 3 luxury cars with detailed specifications, pricing, and performance metrics."
        />
        <meta property="og:type" content="website" />
      </Head>

      <Navbar />

      <div className="min-h-screen bg-primary-black py-16">
        <AdvancedCarComparison />
      </div>

      <Footer />
    </>
  );
}
