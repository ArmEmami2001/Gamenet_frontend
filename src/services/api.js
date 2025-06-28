import axios from 'axios';

// File: src/services/api.js
const api = axios.create({
  baseURL: 'http://127.0.0.1:8001/api', // Make sure this is your Django backend URL
});

api.interceptors.request.use(
  (config) => {
    const storageItem = localStorage.getItem('authTokens');
    if (storageItem) {
        try {
            const token = JSON.parse(storageItem)?.access;
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        } catch (e) {
            console.error("Could not parse auth tokens from localStorage", e);
        }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;