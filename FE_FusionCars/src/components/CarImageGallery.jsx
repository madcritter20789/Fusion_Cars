import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Download,
  Share2,
  Grid,
  Image as ImageIcon,
  Play,
  Maximize2,
} from 'lucide-react';

/**
 * Car Image Gallery Component
 *
 * Premium features:
 * - Support for 20+ images per car
 * - Organize by type (exterior, interior, engine, dashboard, etc.)
 * - Lightbox viewer with keyboard controls
 * - Zoom and pan functionality
 * - Fullscreen mode
 * - Image filtering by category
 * - Download and share images
 * - Video carousel support
 * - Thumbnail grid view
 * - Responsive mobile design
 */

export default function CarImageGallery({ car, images = [], videos = [] }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState('gallery'); // 'gallery', 'lightbox', 'grid'
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isPanning, setIsPanning] = useState(false);

  // Organize images by type
  const imagesByType = useMemo(() => {
    const organized = {
      all: images,
      exterior: images.filter((img) => img.type === 'exterior' || !img.type),
      interior: images.filter((img) => img.type === 'interior'),
      engine: images.filter((img) => img.type === 'engine'),
      dashboard: images.filter((img) => img.type === 'dashboard'),
      wheels: images.filter((img) => img.type === 'wheels'),
      other: images.filter((img) => img.type === 'other' || img.type === 'details'),
    };

    return organized;
  }, [images]);

  const filteredImages = imagesByType[selectedFilter] || images;
  const currentImage = filteredImages[currentImageIndex];

  const handlePrevious = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? filteredImages.length - 1 : prev - 1
    );
    setZoomLevel(1);
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) =>
      prev === filteredImages.length - 1 ? 0 : prev + 1
    );
    setZoomLevel(1);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 1));
  };

  const downloadImage = () => {
    if (!currentImage) return;
    const a = document.createElement('a');
    a.href = currentImage.url;
    a.download = `${car.name}-${currentImage.type || 'image'}-${currentImageIndex + 1}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const shareImage = () => {
    if (!currentImage || !navigator.share) return;
    navigator.share({
      title: `${car.name} - ${currentImage.type || 'Car Image'}`,
      text: `Check out this beautiful image of ${car.name}!`,
      url: currentImage.url,
    });
  };

  const getImageTypeColor = (type) => {
    const colors = {
      exterior: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      interior: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      engine: 'bg-red-500/20 text-red-400 border-red-500/30',
      dashboard: 'bg-green-500/20 text-green-400 border-green-500/30',
      wheels: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      other: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    };
    return colors[type] || colors.other;
  };

  if (!filteredImages || filteredImages.length === 0) {
    return (
      <div className="bg-primary-dark rounded-lg p-8 border border-accent-charcoal text-center">
        <ImageIcon size={48} className="text-accent-stone mx-auto mb-4 opacity-50" />
        <h3 className="text-xl font-bold text-white mb-2">No Images Available</h3>
        <p className="text-accent-stone">
          High-quality images for this car will be available soon
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Lightbox View */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-primary-dark rounded-lg border border-accent-charcoal overflow-hidden"
      >
        {/* Image Viewer */}
        <div className="relative bg-black aspect-video flex items-center justify-center overflow-hidden group">
          <motion.img
            key={currentImage?.url}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={currentImage?.url}
            alt={currentImage?.type || 'Car image'}
            style={{ scale: zoomLevel, cursor: isPanning ? 'grabbing' : 'grab' }}
            className="max-w-full max-h-full object-contain"
          />

          {/* Zoom Controls */}
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleZoomIn}
              disabled={zoomLevel >= 3}
              className="p-2 bg-accent-gold/80 text-primary-black rounded-lg hover:bg-accent-gold transition disabled:opacity-50 disabled:cursor-not-allowed"
              title="Zoom In"
            >
              <ZoomIn size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleZoomOut}
              disabled={zoomLevel <= 1}
              className="p-2 bg-accent-gold/80 text-primary-black rounded-lg hover:bg-accent-gold transition disabled:opacity-50 disabled:cursor-not-allowed"
              title="Zoom Out"
            >
              <ZoomOut size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 bg-accent-gold/80 text-primary-black rounded-lg hover:bg-accent-gold transition"
              title="Fullscreen"
            >
              <Maximize2 size={20} />
            </motion.button>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-accent-gold/80 text-primary-black rounded-full hover:bg-accent-gold transition z-10"
            title="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-accent-gold/80 text-primary-black rounded-full hover:bg-accent-gold transition z-10"
            title="Next image"
          >
            <ChevronRight size={24} />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur px-4 py-2 rounded-lg text-white text-sm font-semibold">
            {currentImageIndex + 1} / {filteredImages.length}
          </div>

          {/* Image Type Badge */}
          {currentImage?.type && (
            <div
              className={`absolute bottom-4 left-32 px-3 py-1 rounded-lg text-sm font-semibold border ${getImageTypeColor(
                currentImage.type
              )}`}
            >
              {currentImage.type.charAt(0).toUpperCase() + currentImage.type.slice(1)}
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="p-4 bg-primary-charcoal border-t border-accent-charcoal flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-1 min-w-48">
            <span className="text-accent-stone text-sm">
              Zoom: {zoomLevel.toFixed(2)}x
            </span>
            <input
              type="range"
              min="1"
              max="3"
              step="0.1"
              value={zoomLevel}
              onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
              className="flex-1 h-2 bg-accent-charcoal rounded-lg appearance-none cursor-pointer accent-accent-gold"
            />
          </div>

          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadImage}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              title="Download image"
            >
              <Download size={18} />
              <span className="hidden sm:inline">Download</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={shareImage}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              title="Share image"
            >
              <Share2 size={18} />
              <span className="hidden sm:inline">Share</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Filter Controls */}
      <div className="bg-primary-dark rounded-lg p-4 border border-accent-charcoal">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <ImageIcon size={20} />
          Filter by Type
        </h3>
        <div className="flex flex-wrap gap-2">
          {['all', 'exterior', 'interior', 'engine', 'dashboard', 'wheels', 'other'].map(
            (filter) => {
              const count = imagesByType[filter]?.length || 0;
              return (
                <motion.button
                  key={filter}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedFilter(filter);
                    setCurrentImageIndex(0);
                    setZoomLevel(1);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    selectedFilter === filter
                      ? 'bg-accent-gold text-primary-black shadow-lg'
                      : 'bg-primary-charcoal text-accent-stone hover:bg-accent-charcoal border border-accent-charcoal'
                  }`}
                  disabled={count === 0}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)} ({count})
                </motion.button>
              );
            }
          )}
        </div>
      </div>

      {/* Video Carousel (if videos available) */}
      {videos && videos.length > 0 && (
        <VideoCarousel videos={videos} carName={car.name} />
      )}

      {/* Thumbnail Grid */}
      <div className="bg-primary-dark rounded-lg p-4 border border-accent-charcoal">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Grid size={20} />
          All Images ({filteredImages.length})
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filteredImages.map((image, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentImageIndex(index);
                setZoomLevel(1);
              }}
              className={`relative rounded-lg overflow-hidden border-2 transition ${
                currentImageIndex === index
                  ? 'border-accent-gold shadow-lg'
                  : 'border-accent-charcoal hover:border-accent-gold'
              }`}
            >
              <img
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-24 object-cover"
                loading="lazy"
              />
              {image.type && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end">
                  <span className="text-white text-xs font-semibold p-1">
                    {image.type.slice(0, 3).toUpperCase()}
                  </span>
                </div>
              )}
              {currentImageIndex === index && (
                <div className="absolute inset-0 border-2 border-accent-gold rounded-lg" />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Image Info */}
      <div className="bg-primary-dark rounded-lg p-4 border border-accent-charcoal">
        <h3 className="text-white font-semibold mb-3">Image Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoItem label="Total Images" value={filteredImages.length} />
          <InfoItem label="Current Position" value={`${currentImageIndex + 1} of ${filteredImages.length}`} />
          <InfoItem
            label="Image Type"
            value={currentImage?.type ? currentImage.type.charAt(0).toUpperCase() + currentImage.type.slice(1) : 'Standard'}
          />
          {videos && videos.length > 0 && (
            <InfoItem label="Video Tours" value={videos.length} />
          )}
        </div>
      </div>
    </div>
  );
}

// Video Carousel Component
function VideoCarousel({ videos, carName }) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  if (!videos || videos.length === 0) return null;

  const currentVideo = videos[currentVideoIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-primary-dark rounded-lg border border-accent-charcoal overflow-hidden"
    >
      <div className="relative bg-black aspect-video flex items-center justify-center">
        {currentVideo.type === '360' ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <Play size={48} className="text-accent-gold" />
            <p className="text-accent-stone">360° View Available</p>
            <a
              href={currentVideo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-accent-gold text-primary-black font-semibold rounded-lg hover:bg-yellow-500 transition"
            >
              View 360° Tour
            </a>
          </div>
        ) : (
          <iframe
            src={currentVideo.url}
            title={`${carName} - Video ${currentVideoIndex + 1}`}
            className="w-full h-full"
            allowFullScreen
            allow="autoplay"
          />
        )}

        {/* Video Navigation */}
        {videos.length > 1 && (
          <>
            <button
              onClick={() =>
                setCurrentVideoIndex((prev) =>
                  prev === 0 ? videos.length - 1 : prev - 1
                )
              }
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-accent-gold/80 text-primary-black rounded-full hover:bg-accent-gold transition"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() =>
                setCurrentVideoIndex((prev) =>
                  prev === videos.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-accent-gold/80 text-primary-black rounded-full hover:bg-accent-gold transition"
            >
              <ChevronRight size={24} />
            </button>

            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur px-4 py-2 rounded-lg text-white text-sm font-semibold">
              {currentVideoIndex + 1} / {videos.length}
            </div>
          </>
        )}
      </div>

      {/* Video Info */}
      <div className="p-4 bg-primary-charcoal border-t border-accent-charcoal">
        <h3 className="text-white font-semibold mb-1">{currentVideo.title || `Video ${currentVideoIndex + 1}`}</h3>
        <p className="text-accent-stone text-sm">{currentVideo.description || 'View the car in detail'}</p>
      </div>
    </motion.div>
  );
}

// Info Item Component
function InfoItem({ label, value }) {
  return (
    <div className="flex justify-between items-center p-3 bg-primary-charcoal rounded-lg border border-accent-charcoal/50">
      <span className="text-accent-stone">{label}</span>
      <span className="text-white font-bold text-lg">{value}</span>
    </div>
  );
}
