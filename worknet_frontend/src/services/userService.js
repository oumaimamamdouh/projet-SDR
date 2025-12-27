import axiosInstance from './api/axiosConfig';
import { ENDPOINTS } from './api/endpoints';

export const userService = {
  // Get user profile
  getProfile: async () => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.USERS.PROFILE);
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  },

  // Update profile
  updateProfile: async (userData) => {
    try {
      const response = await axiosInstance.put(ENDPOINTS.USERS.UPDATE, userData);
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await axiosInstance.post(ENDPOINTS.USERS.CHANGE_PASSWORD, {
        currentPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  },

  // Upload avatar
  uploadAvatar: async (formData) => {
    try {
      const response = await axiosInstance.post(ENDPOINTS.USERS.UPLOAD_AVATAR, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading avatar:', error);
      throw error;
    }
  },

  // Get user by ID
  getUserById: async (id) => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.USERS.GET_BY_ID(id));
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },
};