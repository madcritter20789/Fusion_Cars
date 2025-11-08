import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  FileText,
  CheckCircle,
  AlertCircle,
  XCircle,
  ChevronDown,
  Calendar,
  User,
  Gauge,
} from 'lucide-react';

/**
 * Inspection Report Component
 *
 * Comprehensive vehicle history and condition tracking:
 * - Complete inspection reports
 * - Condition scoring system
 * - Damage and repair history
 * - Service records
 * - Multiple inspection categories
 * - PDF export functionality
 * - Visual condition indicators
 */

export default function InspectionReport({ car }) {
  const [expandedSection, setExpandedSection] = useState(null);
  const [reportType, setReportType] = useState('overview'); // overview, detailed, history

  // Generate mock inspection data
  const inspectionData = {
    overall: {
      score: car.inspectionScore || 85,
      status: car.inspectionScore >= 80 ? 'Excellent' : car.inspectionScore >= 70 ? 'Good' : 'Fair',
      date: car.inspectionDate || new Date().toISOString(),
      inspector: car.inspectorName || 'Expert Inspector',
    },
    exterior: {
      paint: 92,
      body: 88,
      windows: 95,
      lights: 90,
      tires: 85,
      chrome: 88,
    },
    interior: {
      seats: 90,
      dashboard: 88,
      carpets: 82,
      steering: 94,
      controls: 91,
      headliner: 85,
    },
    mechanical: {
      engine: 89,
      transmission: 87,
      suspension: 86,
      brakes: 93,
      battery: 90,
      cooling: 85,
    },
    damage: [
      {
        id: 1,
        type: 'Minor',
        area: 'Right rear bumper',
        severity: 'Light scratches',
        repaired: true,
      },
      {
        id: 2,
        type: 'Minor',
        area: 'Front left door',
        severity: 'Small dent',
        repaired: false,
      },
    ],
    serviceHistory: [
      { date: '2024-08-15', type: 'Regular Maintenance', mileage: 45000, cost: 5000 },
      { date: '2024-05-20', type: 'Oil & Filter Change', mileage: 42000, cost: 2500 },
      { date: '2024-02-10', type: 'Brake Inspection', mileage: 40000, cost: 3500 },
      { date: '2023-11-05', type: 'Tire Rotation', mileage: 38000, cost: 1500 },
    ],
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 80) return 'text-blue-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getScoreBgColor = (score) => {
    if (score >= 90) return 'bg-green-500/20';
    if (score >= 80) return 'bg-blue-500/20';
    if (score >= 70) return 'bg-yellow-500/20';
    return 'bg-orange-500/20';
  };

  const exportPDF = () => {
    const content = generatePDFContent(inspectionData);
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `${car.brand}-${car.model}-inspection-report.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const generatePDFContent = (data) => {
    return `
VEHICLE INSPECTION REPORT
${car.brand} ${car.model} (${car.year})

OVERALL INSPECTION SCORE: ${data.overall.score}/100 - ${data.overall.status}
Inspection Date: ${new Date(data.overall.date).toLocaleDateString()}
Inspector: ${data.overall.inspector}

EXTERIOR CONDITION:
- Paint Quality: ${data.exterior.paint}/100
- Body Condition: ${data.exterior.body}/100
- Windows: ${data.exterior.windows}/100
- Lights: ${data.exterior.lights}/100
- Tires: ${data.exterior.tires}/100
- Chrome & Trim: ${data.exterior.chrome}/100

INTERIOR CONDITION:
- Seats: ${data.interior.seats}/100
- Dashboard: ${data.interior.dashboard}/100
- Carpets: ${data.interior.carpets}/100
- Steering Wheel: ${data.interior.steering}/100
- Controls: ${data.interior.controls}/100
- Headliner: ${data.interior.headliner}/100

MECHANICAL CONDITION:
- Engine: ${data.mechanical.engine}/100
- Transmission: ${data.mechanical.transmission}/100
- Suspension: ${data.mechanical.suspension}/100
- Brakes: ${data.mechanical.brakes}/100
- Battery: ${data.mechanical.battery}/100
- Cooling System: ${data.mechanical.cooling}/100

REPORTED DAMAGE:
${data.damage.map(d => `- ${d.type}: ${d.area} (${d.severity}) - ${d.repaired ? 'Repaired' : 'Not Repaired'}`).join('\n')}

SERVICE HISTORY:
${data.serviceHistory.map(s => `- ${s.date}: ${s.type} (${s.mileage} km) - ₹${s.cost}`).join('\n')}

This is a certified inspection report.
    `;
  };

  return (
    <div className="space-y-6">
      {/* Report Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-primary-dark rounded-lg p-6 md:p-8 border border-accent-charcoal"
      >
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white flex items-center gap-3 mb-2">
              <FileText size={32} className="text-accent-gold" />
              Vehicle Inspection Report
            </h2>
            <p className="text-accent-stone">{car.brand} {car.model} ({car.year})</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={exportPDF}
            className="flex items-center gap-2 px-6 py-3 bg-accent-gold text-primary-black font-bold rounded-lg hover:bg-yellow-500 transition"
          >
            <Download size={20} />
            Export PDF
          </motion.button>
        </div>

        {/* Overall Score Card */}
        <div className={`rounded-lg p-6 border border-accent-charcoal ${getScoreBgColor(inspectionData.overall.score)}`}>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-accent-stone mb-2">Overall Inspection Score</p>
              <p className={`text-5xl font-bold ${getScoreColor(inspectionData.overall.score)}`}>
                {inspectionData.overall.score}
              </p>
              <p className="text-accent-platinum font-semibold mt-2">{inspectionData.overall.status}</p>
            </div>
            <div className="text-right">
              <p className="text-accent-stone text-sm">Inspection Date</p>
              <p className="text-white font-semibold flex items-center gap-2 justify-end">
                <Calendar size={16} />
                {new Date(inspectionData.overall.date).toLocaleDateString()}
              </p>
              <p className="text-accent-stone text-sm mt-3">Inspector</p>
              <p className="text-white font-semibold flex items-center gap-2 justify-end">
                <User size={16} />
                {inspectionData.overall.inspector}
              </p>
            </div>
          </div>
        </div>

        {/* Report Type Selector */}
        <div className="flex gap-2 mt-6">
          {['overview', 'detailed', 'history'].map((type) => (
            <button
              key={type}
              onClick={() => setReportType(type)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                reportType === type
                  ? 'bg-accent-gold text-primary-black'
                  : 'bg-primary-charcoal text-accent-stone hover:bg-accent-charcoal'
              }`}
            >
              {type === 'overview' && 'Overview'}
              {type === 'detailed' && 'Detailed'}
              {type === 'history' && 'History'}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Overview Report */}
      {reportType === 'overview' && <OverviewReport data={inspectionData} getScoreColor={getScoreColor} />}

      {/* Detailed Report */}
      {reportType === 'detailed' && (
        <DetailedReport data={inspectionData} expandedSection={expandedSection} setExpandedSection={setExpandedSection} />
      )}

      {/* History Report */}
      {reportType === 'history' && <HistoryReport data={inspectionData} />}

      {/* Inspection Notes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-primary-dark rounded-lg p-6 border border-accent-charcoal"
      >
        <h3 className="text-xl font-bold text-white mb-4">Inspection Notes</h3>
        <div className="space-y-3">
          <NoteCard
            icon={<CheckCircle className="text-green-400" />}
            title="Good Condition"
            items={['Engine runs smoothly', 'Transmission shifts properly', 'No unusual noises']}
          />
          <NoteCard
            icon={<AlertCircle className="text-yellow-400" />}
            title="Minor Issues"
            items={['Small scratch on rear bumper', 'Minor dent on left door']}
          />
          <NoteCard
            icon={<XCircle className="text-orange-400" />}
            title="Recommended Service"
            items={['Tire rotation due soon', 'Brake fluid check recommended']}
          />
        </div>
      </motion.div>

      {/* Certification */}
      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 text-center">
        <CheckCircle className="text-green-400 mx-auto mb-2" size={32} />
        <h4 className="text-white font-bold mb-1">Certified Pre-Inspection</h4>
        <p className="text-accent-stone text-sm">
          This vehicle has been thoroughly inspected and meets our quality standards
        </p>
      </div>
    </div>
  );
}

// Overview Report Component
function OverviewReport({ data, getScoreColor }) {
  const categories = [
    { name: 'Exterior', scores: data.exterior },
    { name: 'Interior', scores: data.interior },
    { name: 'Mechanical', scores: data.mechanical },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-primary-dark rounded-lg p-6 border border-accent-charcoal"
    >
      <h3 className="text-xl font-bold text-white mb-6">Condition Overview</h3>
      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category.name}>
            <h4 className="text-accent-platinum font-semibold mb-3">{category.name}</h4>
            <div className="space-y-2">
              {Object.entries(category.scores).map(([key, score]) => (
                <div key={key} className="flex items-center gap-4">
                  <span className="text-accent-stone min-w-32 capitalize">{key}:</span>
                  <div className="flex-1 h-2 bg-primary-charcoal rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${score}%` }}
                      transition={{ duration: 1 }}
                      className={`h-full ${
                        score >= 90 ? 'bg-green-500' : score >= 80 ? 'bg-blue-500' : 'bg-yellow-500'
                      }`}
                    />
                  </div>
                  <span className={`font-bold min-w-12 text-right ${getScoreColor(score)}`}>{score}%</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// Detailed Report Component
function DetailedReport({ data, expandedSection, setExpandedSection }) {
  const sections = [
    { id: 'exterior', title: 'Exterior Condition', data: data.exterior, icon: '🚗' },
    { id: 'interior', title: 'Interior Condition', data: data.interior, icon: '🪑' },
    { id: 'mechanical', title: 'Mechanical Condition', data: data.mechanical, icon: '⚙️' },
  ];

  return (
    <div className="space-y-3">
      {sections.map((section) => (
        <motion.div
          key={section.id}
          className="bg-primary-dark rounded-lg border border-accent-charcoal overflow-hidden"
        >
          <button
            onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
            className="w-full p-4 flex items-center justify-between hover:bg-primary-charcoal transition"
          >
            <h3 className="text-white font-semibold flex items-center gap-2">
              <span className="text-2xl">{section.icon}</span>
              {section.title}
            </h3>
            <motion.div animate={{ rotate: expandedSection === section.id ? 180 : 0 }}>
              <ChevronDown className="text-accent-stone" />
            </motion.div>
          </button>

          <AnimatePresence>
            {expandedSection === section.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-4 pb-4 border-t border-accent-charcoal"
              >
                <div className="space-y-3 pt-4">
                  {Object.entries(section.data).map(([key, score]) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-primary-charcoal rounded-lg">
                      <span className="text-accent-stone capitalize">{key}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 h-1.5 bg-accent-charcoal rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              score >= 90 ? 'bg-green-500' : score >= 80 ? 'bg-blue-500' : 'bg-yellow-500'
                            }`}
                            style={{ width: `${score}%` }}
                          />
                        </div>
                        <span className="font-bold min-w-12 text-right text-accent-gold">{score}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

// History Report Component
function HistoryReport({ data }) {
  return (
    <div className="space-y-6">
      {/* Damage History */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-primary-dark rounded-lg p-6 border border-accent-charcoal"
      >
        <h3 className="text-xl font-bold text-white mb-4">Damage History</h3>
        {data.damage.length > 0 ? (
          <div className="space-y-3">
            {data.damage.map((damage) => (
              <div key={damage.id} className="p-4 bg-primary-charcoal rounded-lg border border-accent-charcoal/50">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-white font-semibold">{damage.area}</p>
                    <p className="text-accent-stone text-sm">{damage.severity}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded text-xs font-bold ${
                      damage.repaired
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {damage.repaired ? 'Repaired' : 'Not Repaired'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-accent-stone">No damage reported</p>
        )}
      </motion.div>

      {/* Service History */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-primary-dark rounded-lg p-6 border border-accent-charcoal"
      >
        <h3 className="text-xl font-bold text-white mb-4">Service History</h3>
        <div className="space-y-3">
          {data.serviceHistory.map((service, idx) => (
            <div key={idx} className="p-4 bg-primary-charcoal rounded-lg border border-accent-charcoal/50 flex justify-between items-start">
              <div>
                <p className="text-white font-semibold">{service.type}</p>
                <p className="text-accent-stone text-sm">{new Date(service.date).toLocaleDateString()}</p>
                <p className="text-accent-stone text-sm">{service.mileage} km</p>
              </div>
              <span className="text-accent-gold font-bold">₹{service.cost.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// Note Card Component
function NoteCard({ icon, title, items }) {
  return (
    <div className="p-4 bg-primary-charcoal rounded-lg border border-accent-charcoal/50 flex gap-4">
      <div className="flex-shrink-0 mt-1">{icon}</div>
      <div className="flex-1">
        <h4 className="text-white font-semibold mb-2">{title}</h4>
        <ul className="text-accent-stone text-sm space-y-1">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <span className="w-1 h-1 bg-accent-stone rounded-full" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
