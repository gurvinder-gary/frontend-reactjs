import axiosInstance from '../interceptor/axiosInstance';

/**
 * Get list of products along with total pages
 * 
 * @param {integer} page 
 * @returns {Object} The response data containing products and total pages info
 */
export const getProducts = async (page, selectedCategory) => {
  try {
    const limit = 10;
    const response = await axiosInstance.get(`/products?page=${page}&limit=${limit}&category=${selectedCategory}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete the product based on id
 * 
 * @param {string} productId 
 * @returns {object} response data with message
 */
export const deleteProduct = async (productId) => {
  try {
    const response = await axiosInstance.delete(`/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Create new Product
 * 
 * @param {object} productData 
 * @returns {object} The response data for product created
 */
export const createProduct = async (productData) => {
  try {
    const response = await axiosInstance.post(`/products`, productData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Get product details based on product id
 * 
 * @param {string} productId 
 * @returns {object} The response data with object details
 */

export const getProductById = async (productId) => {
  try {
    const response = await axiosInstance.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Update product details based on product id
 * 
 * @param {string} productId 
 * @param {object} productData 
 * @returns {object}
 */
export const updateProductById = async (productId, productData) => {
  try {
    const response = await axiosInstance.put(`/products/${productId}`, productData);
    return response.data;
  } catch (error) {
    throw error;
  }
}