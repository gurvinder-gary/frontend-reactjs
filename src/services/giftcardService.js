import axiosInstance from '../interceptor/axiosInstance';

/**
 * Get the list of gift cards from database
 * 
 * @returns {object}
 */
export const getGiftCardsList = async () => {
  try {
    const response = await axiosInstance.get(`/giftcards`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Delete the gift card based on code
 * 
 * @param {string} code - The unique code of the gift card
 * @returns {object} The response data containing the success.
 * @throws {Error} If the request fails, an error is thrown.
 */
export const deleteGiftCard = async (code) => {
  try {
    const response = await axiosInstance.delete(`/giftcards/${code}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Save the new gift card in database
 * 
 * @param {object} data
 * @returns {object}
 */
export const saveNewGiftCard = async (data) => {
  try {
    const response = await axiosInstance.post(`/giftcards`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Get the GIft card details by code
 * 
 * @param {string} code 
 * @returns {object}
 */
export const getGiftCardByCode = async (code) => {
  try {
    const response = await axiosInstance.get(`/giftcards/${code}`);
    return response.data;
  } catch (error) {
    throw error;
  } 
}

/**
 * Update the gift card data based on code
 * 
 * @param {string} code 
 * @param {object} data 
 * @returns {object}
 */
export const updateGiftCardByCode = async (code, data) => {
  try {
    const response = await axiosInstance.put(`/giftcards/${code}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

