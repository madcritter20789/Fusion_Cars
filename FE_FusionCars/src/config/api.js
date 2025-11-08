/**
 * API Configuration
 *
 * Centralized API URL configuration
 * Uses environment variable or falls back to localhost
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  // Auth
  login: `${API_BASE_URL}/auth/login`,
  register: `${API_BASE_URL}/auth/register`,
  adminLogin: `${API_BASE_URL}/auth/admin/login`,
  adminRegister: `${API_BASE_URL}/auth/admin/register`,

  // Cars
  cars: `${API_BASE_URL}/cars`,
  featuredCars: `${API_BASE_URL}/cars/featured`,
  carStats: `${API_BASE_URL}/cars/stats/overview`,

  // Admin
  adminDashboard: `${API_BASE_URL}/admin/dashboard/stats`,
  adminCars: `${API_BASE_URL}/admin/cars`,
  adminBookings: `${API_BASE_URL}/admin/bookings`,
  adminReviews: `${API_BASE_URL}/admin/reviews`,
  adminUsers: `${API_BASE_URL}/admin/users`,

  // Reviews
  reviews: `${API_BASE_URL}/reviews`,

  // Wishlist
  wishlist: `${API_BASE_URL}/wishlist`,

  // Bookings
  bookings: `${API_BASE_URL}/bookings`,

  // Contact
  contact: `${API_BASE_URL}/contact`,
};

export default API_BASE_URL;
