import axios from 'axios';

// Create an instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Base URL for all requests
  headers: {
    'Content-Type': 'application/json'
    // Do not set Authorization header here, as it might be dynamic
  }
});

export default axiosInstance;

axiosInstance.interceptors.request.use(
    config => {
      // Get the token from local storage or any other storage
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  

  axiosInstance.interceptors.response.use(
    response => response,
    error => {
      if (error.response) {
        // Server responded with a status other than 2xx
        if (error.response.status === 401 || error.response.status === 403) {
          // Token might be expired or invalid
          // Remove the token from storage
          localStorage.removeItem('authToken');
  
          // Redirect to the login page
          window.location.href = '/login'; // Or use a router method to redirect
        }
      }
      return Promise.reject(error);
    }
  );
    