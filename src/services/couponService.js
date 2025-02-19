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