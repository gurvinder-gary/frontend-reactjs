import axiosInstance from '../interceptor/axiosInstance';

export const loginUser = async (credentials) => {
  const response = await axiosInstance.post(`/users/login`, credentials);
  return response.data;
};

export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get(`/users/profile`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addProduct = async (productData) => {
  const response = await axiosInstance.post(`/products`, productData);
  return response.data;
};
