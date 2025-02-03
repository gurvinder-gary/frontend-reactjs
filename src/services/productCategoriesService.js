import axiosInstance from '../interceptor/axiosInstance';

/**
 * Get list of products along with total pages
 * 
 * @param {integer} page 
 * @returns {Object} The response data containing products and total pages info
 */
export const getProductCategories = async () => {
  try {
    const response = await axiosInstance.get(`/categories`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete the product category by category id
 * 
 * @param {string} categoryId 
 * @returns {object}
 */
export const deleteProductCategoryById = async (categoryId) => {
  try {
    const response = await axiosInstance.delete(`/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Add new product category
 * 
 * @param {object} categoryData 
 * @returns {object}
 */
export const addProductCategory = async (categoryData) => {
  try {
    const response = await axiosInstance.post(`/categories`, categoryData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Get specific product category by id
 * 
 * @param {string} categoryId 
 * @returns {object}
 */
export const getProductCategoryById = async (categoryId) => {
  try {
    const response = await axiosInstance.get(`/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Update product category by id
 * 
 * @param {string} categoryId 
 * @param {object} categoryData 
 * @returns {object}
 */
export const updateProductCategoryById = async (categoryId, categoryData) => {
  try {
    const response = await axiosInstance.put(`/categories/${categoryId}`, categoryData);
    return response.data;
  } catch (error) {
    throw error;
  }
}