/**
 * Centralized API configuration.
 * All components should import API_URL from here instead of
 * reading import.meta.env.VITE_API_URL directly.
 */
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
