/**
 * Placeholder Image Service
 *
 * Provides fallback placeholder images for various use cases
 * Uses multiple services for reliability and better quality
 */

// Primary placeholder service (lorempicsum.com - high quality)
export const getCarPlaceholder = (width = 400, height = 300) => {
  return `https://lorempicsum.com/api/cars/${width}/${height}`;
};

export const getThumbnailPlaceholder = (width = 100, height = 100) => {
  return `https://lorempicsum.com/api/cars/${width}/${height}`;
};

// Fallback to placeholder.com service (simpler)
export const getFallbackPlaceholder = (width = 400, height = 300) => {
  return `https://via.placeholder.com/${width}x${height}?text=Car+Image`;
};

// Avatar/Profile image placeholders
export const getAvatarPlaceholder = (width = 80, height = 80, initials = "FC") => {
  return `https://ui-avatars.com/api/?name=${initials}&size=${width}&background=D4AF37&color=ffffff&bold=true`;
};

// Gallery image placeholder
export const getGalleryPlaceholder = (width = 500, height = 400) => {
  return `https://lorempicsum.com/api/cars/${width}/${height}`;
};

// Hero background placeholder
export const getHeroPlaceholder = () => {
  return "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&h=900&fit=crop&q=90";
};

// Inspection report placeholder
export const getInspectionPlaceholder = () => {
  return "https://via.placeholder.com/200x150?text=Inspection+Report";
};

// Brand logo placeholder
export const getBrandPlaceholder = (brandName = "Brand") => {
  return `https://ui-avatars.com/api/?name=${brandName}&size=120&background=1a1f3a&color=D4AF37`;
};

// User profile placeholder
export const getUserPlaceholder = (userName = "User") => {
  return `https://ui-avatars.com/api/?name=${userName}&size=100&background=D4AF37&color=ffffff&bold=true`;
};

/**
 * Safe image loader with fallback
 *
 * @param {string} primaryUrl - Primary image URL
 * @param {string} fallbackUrl - Fallback URL (defaults to placeholder)
 * @returns {string} - URL to use for image
 */
export const getImageWithFallback = (primaryUrl, fallbackUrl = null) => {
  if (!primaryUrl) {
    return fallbackUrl || getFallbackPlaceholder();
  }
  return primaryUrl;
};

/**
 * Generate placeholder for any use case
 *
 * @param {string} type - Type of placeholder: 'car', 'avatar', 'hero', 'gallery', 'thumbnail', 'brand', 'user'
 * @param {number} width - Width of image
 * @param {number} height - Height of image
 * @returns {string} - Placeholder URL
 */
export const getPlaceholder = (type = 'car', width = 400, height = 300) => {
  switch (type) {
    case 'car':
      return getCarPlaceholder(width, height);
    case 'thumbnail':
      return getThumbnailPlaceholder(width, height);
    case 'avatar':
      return getAvatarPlaceholder(width, height);
    case 'gallery':
      return getGalleryPlaceholder(width, height);
    case 'hero':
      return getHeroPlaceholder();
    case 'inspection':
      return getInspectionPlaceholder();
    case 'brand':
      return getBrandPlaceholder();
    case 'user':
      return getUserPlaceholder();
    default:
      return getFallbackPlaceholder(width, height);
  }
};

/**
 * Image loading configuration for Next.js
 */
export const imageLoaderConfig = {
  unsplash: {
    loader: ({ src, width, quality }) => {
      const baseUrl = "https://images.unsplash.com";
      const params = new URLSearchParams({
        w: width,
        q: quality || 75,
      });
      return `${src}?${params.toString()}`;
    },
  },
};

export default {
  getCarPlaceholder,
  getThumbnailPlaceholder,
  getFallbackPlaceholder,
  getAvatarPlaceholder,
  getGalleryPlaceholder,
  getHeroPlaceholder,
  getInspectionPlaceholder,
  getBrandPlaceholder,
  getUserPlaceholder,
  getImageWithFallback,
  getPlaceholder,
};
