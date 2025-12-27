// import axiosInstance from './api/axiosConfig';
// import { ENDPOINTS } from './api/endpoints';

// export const orderService = {
//   // Get all orders
//   getAllOrders: async () => {
//     try {
//       const response = await axiosInstance.get(ENDPOINTS.ORDERS.GET_ALL);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//       throw error;
//     }
//   },

//   // Create order
//   createOrder: async (orderData) => {
//     try {
//       const response = await axiosInstance.post(ENDPOINTS.ORDERS.CREATE, orderData);
//       return response.data;
//     } catch (error) {
//       console.error('Error creating order:', error);
//       throw error;
//     }
//   },

//   // Get order by ID
//   getOrderById: async (id) => {
//     try {
//       const response = await axiosInstance.get(ENDPOINTS.ORDERS.GET_BY_ID(id));
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching order:', error);
//       throw error;
//     }
//   },

//   // Update order
//   updateOrder: async (id, orderData) => {
//     try {
//       const response = await axiosInstance.put(ENDPOINTS.ORDERS.UPDATE(id), orderData);
//       return response.data;
//     } catch (error) {
//       console.error('Error updating order:', error);
//       throw error;
//     }
//   },

//   // Get my orders (client)
//   getMyOrders: async () => {
//     try {
//       const response = await axiosInstance.get(ENDPOINTS.ORDERS.MY_ORDERS);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching my orders:', error);
//       throw error;
//     }
//   },

//   // Get my seller orders (freelancer)
//   getMySellerOrders: async () => {
//     try {
//       const response = await axiosInstance.get(ENDPOINTS.ORDERS.MY_SELLER_ORDERS);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching seller orders:', error);
//       throw error;
//     }
//   },
// };

// // Exporter par défaut
// export default new orderService();
import axiosInstance from './api/axiosConfig';
import { ENDPOINTS } from './api/endpoints';

class OrderService {
  async getMyOrders() {
    try {
      const response = await axiosInstance.get(ENDPOINTS.MY_ORDERS);
      return response.data;
    } catch (error) {
      console.error('❌ Get my orders error:', error);
      throw error;
    }
  }

  async createOrder(orderData) {
    try {
      const response = await axiosInstance.post(ENDPOINTS.CREATE_ORDER, orderData);
      return response.data;
    } catch (error) {
      console.error('❌ Create order error:', error);
      throw error;
    }
  }

  async updateOrder(id, orderData) {
    try {
      const response = await axiosInstance.put(ENDPOINTS.UPDATE_ORDER(id), orderData);
      return response.data;
    } catch (error) {
      console.error('❌ Update order error:', error);
      throw error;
    }
  }

  async getOrderById(id) {
    try {
      const response = await axiosInstance.get(ENDPOINTS.ORDER_DETAIL(id));
      return response.data;
    } catch (error) {
      console.error('❌ Get order by ID error:', error);
      throw error;
    }
  }
}

const orderService = new OrderService();
export default orderService;