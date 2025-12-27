import axiosInstance from './api/axiosConfig';
import { ENDPOINTS } from './api/endpoints';

export const notificationService = {
  // Get notifications
  getNotifications: async () => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.NOTIFICATIONS.BASE);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      throw error;
    }
  },

  // Get unread notifications
  getUnreadNotifications: async () => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.NOTIFICATIONS.UNREAD);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch unread notifications:', error);
      throw error;
    }
  },

  // Mark as read
  markAsRead: async (notificationId) => {
    try {
      const response = await axiosInstance.put(ENDPOINTS.NOTIFICATIONS.MARK_AS_READ(notificationId));
      return response.data;
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
      throw error;
    }
  },

  // Mark all as read
  markAllAsRead: async () => {
    try {
      const response = await axiosInstance.put(ENDPOINTS.NOTIFICATIONS.MARK_ALL_READ);
      return response.data;
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
      throw error;
    }
  },

  // Delete notification
  deleteNotification: async (notificationId) => {
    try {
      const response = await axiosInstance.delete(`${ENDPOINTS.NOTIFICATIONS.BASE}/${notificationId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete notification:', error);
      throw error;
    }
  },
};