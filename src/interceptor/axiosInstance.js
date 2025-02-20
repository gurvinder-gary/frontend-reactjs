import axios from 'axios';

const axiosInstance = axios.create();


const API_BASE_URL_NODE = process.env.REACT_APP_API_BASE_URL;
const API_BASE_URL_GO = process.env.REACT_APP_API_BASE_URL_GO;

// Request Interceptor to include the token in headers (if needed)
axiosInstance.interceptors.request.use((config) => {
  if (config.url.startsWith('/coupons')) {
    config.baseURL = API_BASE_URL_GO; // Requests related to coupons go to Go backend
  } else {
    config.baseURL = API_BASE_URL_NODE; // All other requests go to Node.js backend
  }

  const token = localStorage.getItem('token'); // or cookies/session storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response Interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response, // Return the response if no error
  (error) => {
    if (error.response && error.response.status === 401) {
      window.dispatchEvent(new Event('unauthorized-access'));
    }

    return Promise.reject(error); // Continue with the error if it's not 401
  }
);

export default axiosInstance;
