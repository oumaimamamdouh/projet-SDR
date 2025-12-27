import {
  mockUsers,
  mockGigs,
  mockCategories,
  mockOrders,
  mockMessages,
  mockNotifications
} from '../mockData';

// Simuler un délai réseau
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  // Auth
  login: async (email, password) => {
    await delay(500);
    const user = Object.values(mockUsers).find(u => u.email === email);
    if (user && password === "password123") {
      return {
        success: true,
        user,
        token: "mock-jwt-token-" + user._id
      };
    }
    return { success: false, error: "Email ou mot de passe incorrect" };
  },

  register: async (userData) => {
    await delay(500);
    return {
      success: true,
      user: { ...userData, _id: "new-" + Date.now() },
      token: "mock-jwt-token-new"
    };
  },

  // Gigs
  getGigs: async (filters = {}) => {
    await delay(300);
    let filteredGigs = [...mockGigs];
    
    if (filters.category) {
      filteredGigs = filteredGigs.filter(g => 
        g.category_name?.toLowerCase().includes(filters.category.toLowerCase())
      );
    }
    
    if (filters.search) {
      filteredGigs = filteredGigs.filter(g =>
        g.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        g.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        g.search_tags?.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()))
      );
    }
    
    return { success: true, gigs: filteredGigs };
  },

  getGigById: async (id) => {
    await delay(200);
    const gig = mockGigs.find(g => g._id === id);
    return gig 
      ? { success: true, gig } 
      : { success: false, error: "Service non trouvé" };
  },

  createGig: async (gigData) => {
    await delay(500);
    const newGig = {
      _id: "gig-" + Date.now(),
      ...gigData,
      freelancer_id: mockUsers.freelancer._id,
      freelancer_name: mockUsers.freelancer.full_name,
      status: "active",
      created_at: new Date().toISOString(),
      total_orders: 0,
      gig_rating: 0,
      gig_reviews: 0
    };
    return { success: true, gig: newGig };
  },

  updateGig: async (id, gigData) => {
    await delay(500);
    return { success: true, gig: { ...gigData, _id: id } };
  },

  // Orders
  getOrders: async (userId, role) => {
    await delay(300);
    let orders = [...mockOrders];
    
    if (role === "freelancer") {
      orders = orders.filter(o => o.freelancer_id === userId);
    } else if (role === "client") {
      orders = orders.filter(o => o.client_id === userId);
    }
    
    return { success: true, orders };
  },

  getOrderById: async (id) => {
    await delay(200);
    const order = mockOrders.find(o => o._id === id);
    return order 
      ? { success: true, order } 
      : { success: false, error: "Commande non trouvée" };
  },

  createOrder: async (orderData) => {
    await delay(500);
    const newOrder = {
      _id: "order-" + Date.now(),
      ...orderData,
      order_number: `ORD-${new Date().getFullYear()}-${String(Math.random()).slice(2, 6)}`,
      created_at: new Date().toISOString(),
      status: "pending"
    };
    return { success: true, order: newOrder };
  },

  // Messages
  getMessages: async (userId, otherUserId = null) => {
    await delay(300);
    let messages = [...mockMessages];
    
    if (otherUserId) {
      messages = messages.filter(m => 
        (m.sender_id === userId && m.receiver_id === otherUserId) ||
        (m.sender_id === otherUserId && m.receiver_id === userId)
      );
    } else {
      messages = messages.filter(m => 
        m.sender_id === userId || m.receiver_id === userId
      );
    }
    
    // Grouper par conversation
    const conversations = {};
    messages.forEach(msg => {
      const otherId = msg.sender_id === userId ? msg.receiver_id : msg.sender_id;
      if (!conversations[otherId]) {
        conversations[otherId] = {
          user: msg.sender_id === userId 
            ? { _id: msg.receiver_id, name: msg.receiver_name }
            : { _id: msg.sender_id, name: msg.sender_name },
          lastMessage: msg,
          unread: msg.receiver_id === userId && !msg.is_read ? 1 : 0
        };
      }
    });
    
    return { 
      success: true, 
      messages,
      conversations: Object.values(conversations) 
    };
  },

  sendMessage: async (messageData) => {
    await delay(200);
    const newMessage = {
      _id: "msg-" + Date.now(),
      ...messageData,
      created_at: new Date().toISOString(),
      is_read: false
    };
    return { success: true, message: newMessage };
  },

  // Categories
  getCategories: async () => {
    await delay(200);
    return { success: true, categories: mockCategories };
  },

  // Notifications
  getNotifications: async (userId) => {
    await delay(200);
    const notifications = mockNotifications.filter(n => n.user_id === userId);
    return { success: true, notifications };
  },

  markNotificationAsRead: async (notificationId) => {
    await delay(100);
    return { success: true };
  },

  // User Profile
  getUserProfile: async (userId) => {
    await delay(200);
    const user = Object.values(mockUsers).find(u => u._id === userId);
    return user 
      ? { success: true, user } 
      : { success: false, error: "Utilisateur non trouvé" };
  },

  updateUserProfile: async (userId, userData) => {
    await delay(500);
    return { success: true, user: { ...userData, _id: userId } };
  }
};

// Hook pour utiliser l'API mockée
export const useMockApi = () => {
  return mockApi;
};