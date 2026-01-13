import axios from 'axios';
import { Platform } from 'react-native';

// Determine the base URL based on the environment
const getBaseUrl = () => {
  // Use production URL if available, otherwise fallback to local dev
  return 'https://edoskill360.onrender.com/api';
};

export const API_URL = getBaseUrl();

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for cookies
});

export default api;
