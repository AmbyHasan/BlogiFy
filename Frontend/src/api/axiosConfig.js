import axios from 'axios';
import store from '../store/store.js';

// Create axios instance with base URL
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

// Request interceptor to add token to Authorization header
axiosInstance.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state?.auth?.accesstoken;
        
        // Add Authorization header if token exists
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
