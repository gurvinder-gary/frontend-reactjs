import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
});

// Request Interceptor to include the token in headers (if needed)
axiosInstance.interceptors.request.use((config) => {
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
