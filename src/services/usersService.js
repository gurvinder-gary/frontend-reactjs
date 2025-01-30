import axiosInstance from '../interceptor/axiosInstance';

/**
 * Logs in a user by sending a POST request with the given credentials.
 * 
 * @param {Object} credentials - The user's login credentials (e.g., username and password).
 * @returns {Object} The response data containing user information or authentication token.
 */
export const loginUser = async (credentials) => {
  const response = await axiosInstance.post(`/users/login`, credentials);
  return response.data;
};

/**
 * Retrieves the profile information of the currently logged-in user.
 * 
 * @returns {Object} The response data containing the user's profile details.
 * @throws {Error} If the request fails, an error is thrown.
 */
export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get(`/users/profile`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Registers a new user by sending a POST request with the provided registration data.
 * 
 * @param {Object} registerData - The data required for user registration (e.g., username, password, email).
 * @returns {Object} The response data containing the result of the registration process.
 * @throws {Error} If the request fails, an error is thrown.
 */
export const registerUser = async (registerData) => {
  try {
    const response = await axiosInstance.post(`/users/register`, registerData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

