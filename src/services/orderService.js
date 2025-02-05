import axiosInstance from '../interceptor/axiosInstance';

/**
 * Get all orders list with pagination and limit
 * 
 * @param {integer} page 
 * @param {integer} limit 
 * @returns {object}
 */
export const getOrders = async (page, limit) => {
  try {
    const response = await axiosInstance.get(`/orders?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Create new order
 * 
 * @param {object} orderData 
 * @returns {object}
 */
export const createNewOrder = async (orderData) => {
  try {
    const response = await axiosInstance.post(`/orders`, orderData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete the order by order id
 * 
 * @param {string} orderId 
 * @returns {object}
 */
export const deleteOrderById = async (orderId) => {
  try {
    const response = await axiosInstance.delete(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Get the order details based on order id
 * 
 * @param {string} orderId 
 * @returns {object}
 */
export const getOrderDetailById = async (orderId) => {
  try {
    const response = await axiosInstance.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
