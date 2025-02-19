import axiosInstance from '../interceptor/axiosInstance';

/**
 * Get the list of coupons from database
 * 
 * @param {integer} page 
 * @param {integer} limit 
 * @returns {object}
 */
export const getCouponsList = async (page, limit) => {
  try {
    const response = await axiosInstance.get(`/coupons?page=${page}&limit=${limit}&showAll=true`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Activate or deactivate the coupon based on coupon id
 * 
 * @param {string} couponId
 * @param {string} type
 * @returns {object}
 */
export const activateDeactivateCoupon = async (couponId, type) => {
  try {
    const response = await axiosInstance.patch(`/coupons/${couponId}/${type}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Save the new coupon in database
 * 
 * @param {object} data
 * @returns {object}
 */
export const saveNewCoupon = async (data) => {
  try {
    const response = await axiosInstance.post(`/coupons`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Get the coupon details by code
 * 
 * @param {string} code 
 * @returns {object}
 */
export const getCouponByCode = async (code) => {
  try {
    const response = await axiosInstance.get(`/coupons/${code}`);
    return response.data;
  } catch (error) {
    throw error;
  } 
}

/**
 * Update the coupon based on coupon id
 * 
 * @param {string} couponId 
 * @param {object} data 
 * @returns {object}
 */
export const updateCouponByID = async (couponId, data) => {
  try {
    const response = await axiosInstance.put(`/coupons/${couponId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
