import { useMemo } from 'react';

/**
 * Hook for managing car images and galleries
 * Provides utilities for image organization, filtering, and caching
 */

export function useCarImages(carData = {}) {
  // Generate mock image gallery for demonstration
  const generateMockImages = (carName, imageCount = 15) => {
    const imageTypes = ['exterior', 'interior', 'engine', 'dashboard', 'wheels', 'other'];
    const images = [];

    for (let i = 0; i < imageCount; i++) {
      const type = imageTypes[i % imageTypes.length];
      images.push({
        id: i + 1,
        url: getRandomCarImage(type),
        type: type,
        title: `${carName} - ${type.charAt(0).toUpperCase() + type.slice(1)} View ${Math.floor(i / 6) + 1}`,
        description: `High-quality ${type} image of ${carName}`,
        timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
      });
    }

    return images;
  };

  // Mock gallery data - in production, this would come from API or car.images
  const allImages = useMemo(() => {
    return generateMockImages(carData.name || 'Luxury Car', 20);
  }, [carData.name]);

  // Mock video gallery
  const allVideos = useMemo(() => {
    return [
      {
        id: 1,
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        type: 'walkthrough',
        title: '360° Exterior Walkthrough',
        description: 'Complete exterior view of the vehicle',
      },
      {
        id: 2,
        url: 'https://www.youtube.com/embed/9bZkp7q19f0',
        type: 'interior',
        title: 'Interior Tour & Features',
        description: 'Explore the luxury interior and features',
      },
      {
        id: 3,
        type: '360',
        url: '#',
        title: '360° Interactive View',
        description: 'View the car from every angle',
      },
    ];
  }, []);

  // Get images by type
  const getImagesByType = (type) => {
    if (type === 'all') return allImages;
    return allImages.filter((img) => img.type === type);
  };

  // Get image statistics
  const statistics = useMemo(() => {
    const stats = {
      total: allImages.length,
      byType: {},
    };

    const types = ['exterior', 'interior', 'engine', 'dashboard', 'wheels', 'other'];
    types.forEach((type) => {
      stats.byType[type] = allImages.filter((img) => img.type === type).length;
    });

    return stats;
  }, [allImages]);

  // Preload images for better performance
  const preloadImages = (indices = []) => {
    if (indices.length === 0) {
      // Preload all images
      indices = Array.from({ length: allImages.length }, (_, i) => i);
    }

    indices.forEach((index) => {
      if (allImages[index]) {
        const img = new Image();
        img.src = allImages[index].url;
      }
    });
  };

  // Get image URL with caching support
  const getImageUrl = (index) => {
    if (index < 0 || index >= allImages.length) return null;
    return allImages[index].url;
  };

  // Check if image exists
  const imageExists = (index) => {
    return index >= 0 && index < allImages.length;
  };

  return {
    images: allImages,
    videos: allVideos,
    statistics,
    getImagesByType,
    getImageUrl,
    imageExists,
    preloadImages,
  };
}

/**
 * Get random car image (using Unsplash for demonstration)
 */
function getRandomCarImage(type = 'exterior') {
  const imageQueries = {
    exterior: [
      'luxury-car-side',
      'sports-car-front',
      'premium-vehicle',
      'car-exterior-design',
    ],
    interior: [
      'car-interior-luxury',
      'dashboard-modern',
      'car-seats-leather',
      'interior-design-car',
    ],
    engine: [
      'car-engine',
      'motor-technology',
      'engine-performance',
      'vehicle-mechanics',
    ],
    dashboard: [
      'car-dashboard',
      'steering-wheel',
      'control-panel',
      'digital-display',
    ],
    wheels: ['car-wheels', 'tire-alloy', 'wheel-design', 'vehicle-suspension'],
    other: [
      'car-details',
      'headlight-design',
      'car-lighting',
      'vehicle-features',
    ],
  };

  const queries = imageQueries[type] || imageQueries.exterior;
  const randomQuery = queries[Math.floor(Math.random() * queries.length)];
  const randomWidth = 800 + Math.floor(Math.random() * 400);
  const randomHeight = 600 + Math.floor(Math.random() * 200);

  return `https://images.unsplash.com/photo-${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 9)}?w=${randomWidth}&h=${randomHeight}&fit=crop&q=80`;
}

/**
 * Hook for image filtering and sorting
 */
export function useImageFilter(images = [], initialFilter = 'all', sortBy = 'default') {
  const filtered = useMemo(() => {
    let result = images;

    // Apply filter
    if (initialFilter !== 'all') {
      result = result.filter((img) => img.type === initialFilter);
    }

    // Apply sorting
    if (sortBy === 'recent') {
      result = [...result].sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
    } else if (sortBy === 'oldest') {
      result = [...result].sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );
    } else if (sortBy === 'alphabetical') {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [images, initialFilter, sortBy]);

  return filtered;
}

/**
 * Hook for image caching and optimization
 */
export function useImageOptimization(imageUrl = '') {
  // Generate srcset for responsive images
  const generateSrcSet = () => {
    if (!imageUrl) return '';

    const sizes = [400, 600, 800, 1024, 1440];
    return sizes
      .map((size) => {
        const url = imageUrl.includes('?')
          ? `${imageUrl}&w=${size}`
          : `${imageUrl}?w=${size}`;
        return `${url} ${size}w`;
      })
      .join(', ');
  };

  // Get optimized image URL
  const getOptimizedUrl = (width = 800, height = 600) => {
    if (!imageUrl) return '';

    if (imageUrl.includes('?')) {
      return `${imageUrl}&w=${width}&h=${height}&fit=crop`;
    }
    return `${imageUrl}?w=${width}&h=${height}&fit=crop`;
  };

  return {
    srcSet: generateSrcSet(),
    optimizedUrl: getOptimizedUrl(),
    getOptimizedUrl,
  };
}
