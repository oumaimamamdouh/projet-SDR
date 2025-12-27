import axiosInstance from './api/axiosConfig';
import { ENDPOINTS } from './api/endpoints';
export const messageService = {
  // Get conversation
  getConversation: async (userId) => {
    try {
      const response = await axiosInstance.get(`/api/messages/conversation/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching conversation:', error);
      throw error;
    }
  },

  // Send message
  sendMessage: async (messageData) => {
    try {
      const response = await axiosInstance.post('/api/messages', messageData);
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  // Get conversations list
  getConversations: async () => {
    try {
      const response = await axiosInstance.get('/api/messages/conversations');
      return response.data;
    } catch (error) {
      console.error('Error fetching conversations:', error);
      throw error;
    }
  },
};
// Exporter par défaut
export default new messageService();