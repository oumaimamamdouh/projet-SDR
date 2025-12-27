// import axiosInstance from './api/axiosConfig';
// import { API_ENDPOINTS } from './api/endpoints';

// export const gigService = {
//   // Get all gigs with pagination and filters
//   getAllGigs: async (params = {}) => {
//     try {
//       const response = await axiosInstance.get(API_ENDPOINTS.GIGS.BASE, { params });
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error;
//     }
//   },
  
//   // Search gigs
//   searchGigs: async (query, filters = {}) => {
//     try {
//       const response = await axiosInstance.get(API_ENDPOINTS.GIGS.SEARCH, {
//         params: { q: query, ...filters },
//       });
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error;
//     }
//   },
  
//   // Get popular gigs
//   getPopularGigs: async (limit = 10) => {
//     try {
//       const response = await axiosInstance.get(API_ENDPOINTS.GIGS.POPULAR, {
//         params: { limit },
//       });
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error;
//     }
//   },
  
//   // Get recommended gigs
//   getRecommendedGigs: async () => {
//     try {
//       const response = await axiosInstance.get(API_ENDPOINTS.GIGS.RECOMMENDED);
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error;
//     }
//   },
  
//   // Get gig by ID
//   getGigById: async (gigId) => {
//     try {
//       const response = await axiosInstance.get(API_ENDPOINTS.GIGS.BY_ID(gigId));
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error;
//     }
//   },
  
//   // Get gigs by category
//   getGigsByCategory: async (categoryId, params = {}) => {
//     try {
//       const response = await axiosInstance.get(API_ENDPOINTS.GIGS.BY_CATEGORY(categoryId), { params });
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error;
//     }
//   },
  
//   // Get gigs by user
//   getGigsByUser: async (userId) => {
//     try {
//       const response = await axiosInstance.get(API_ENDPOINTS.GIGS.BY_USER(userId));
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error;
//     }
//   },
  
//   // Get my gigs (current user)
//   getMyGigs: async () => {
//     try {
//       const response = await axiosInstance.get(API_ENDPOINTS.GIGS.BASE);
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error;
//     }
//   },
  
//   // Create gig
//   createGig: async (gigData) => {
//     try {
//       const response = await axiosInstance.post(API_ENDPOINTS.GIGS.CREATE, gigData);
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error;
//     }
//   },
  
//   // Update gig
//   updateGig: async (gigId, gigData) => {
//     try {
//       const response = await axiosInstance.put(API_ENDPOINTS.GIGS.UPDATE(gigId), gigData);
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error;
//     }
//   },
  
//   // Delete gig
//   deleteGig: async (gigId) => {
//     try {
//       const response = await axiosInstance.delete(API_ENDPOINTS.GIGS.DELETE(gigId));
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error;
//     }
//   },
  
//   // Upload gig image
//   uploadGigImage: async (gigId, file) => {
//     try {
//       const formData = new FormData();
//       formData.append('image', file);
      
//       const response = await axiosInstance.post(
//         API_ENDPOINTS.GIGS.UPLOAD_IMAGE(gigId),
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );
      
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error;
//     }
//   },
  
//   // Get featured gigs
//   getFeaturedGigs: async () => {
//     try {
//       const response = await axiosInstance.get(API_ENDPOINTS.GIGS.FEATURED);
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error;
//     }
//   },
// };
import axiosInstance from './api/axiosConfig';

const gigService = {
  // Récupérer tous les gigs
  async getAllGigs(filters = {}) {
    try {
      const params = new URLSearchParams();
      
      // Ajouter les filtres
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          params.append(key, value);
        }
      });
      
      const response = await axiosInstance.get(`/gigs?${params}`);
      
      if (response.data.success) {
        return {
          success: true,
          gigs: response.data.data,
          count: response.data.count,
          pagination: response.data.pagination
        };
      }
      throw new Error(response.data.error || 'Failed to fetch gigs');
    } catch (error) {
      console.error('Get gigs error:', error);
      return {
        success: false,
        error: error.response?.data?.error || error.message,
        gigs: []
      };
    }
  },

  // Rechercher des gigs
  async searchGigs(query, filters = {}) {
    try {
      const params = new URLSearchParams();
      params.append('q', query);
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          params.append(key, value);
        }
      });
      
      const response = await axiosInstance.get(`/gigs/search?${params}`);
      
      if (response.data.success) {
        return {
          success: true,
          gigs: response.data.data,
          count: response.data.count,
          pagination: response.data.pagination
        };
      }
      throw new Error(response.data.error || 'Search failed');
    } catch (error) {
      console.error('Search gigs error:', error);
      return {
        success: false,
        error: error.response?.data?.error || error.message,
        gigs: []
      };
    }
  },

  // Récupérer un gig par ID
  async getGigById(id) {
    try {
      const response = await axiosInstance.get(`/gigs/${id}`);
      
      if (response.data.success) {
        return {
          success: true,
          gig: response.data.data
        };
      }
      throw new Error(response.data.error || 'Gig not found');
    } catch (error) {
      console.error('Get gig error:', error);
      return {
        success: false,
        error: error.response?.data?.error || error.message
      };
    }
  },

  // Récupérer les gigs du freelance connecté
  async getMyGigs(filters = {}) {
    try {
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          params.append(key, value);
        }
      });
      
      const response = await axiosInstance.get(`/gigs/my-gigs?${params}`);
      
      if (response.data.success) {
        return {
          success: true,
          gigs: response.data.data,
          count: response.data.count,
          pagination: response.data.pagination
        };
      }
      throw new Error(response.data.error || 'Failed to fetch your gigs');
    } catch (error) {
      console.error('Get my gigs error:', error);
      return {
        success: false,
        error: error.response?.data?.error || error.message,
        gigs: []
      };
    }
  },

  // Créer un nouveau gig
  async createGig(gigData) {
    try {
      const response = await axiosInstance.post('/gigs', gigData);
      
      if (response.data.success) {
        return {
          success: true,
          gig: response.data.data,
          message: 'Gig créé avec succès'
        };
      }
      throw new Error(response.data.error || 'Failed to create gig');
    } catch (error) {
      console.error('Create gig error:', error);
      return {
        success: false,
        error: error.response?.data?.error || error.message
      };
    }
  },

  // Mettre à jour un gig
  async updateGig(id, gigData) {
    try {
      const response = await axiosInstance.put(`/gigs/${id}`, gigData);
      
      if (response.data.success) {
        return {
          success: true,
          gig: response.data.data,
          message: 'Gig mis à jour avec succès'
        };
      }
      throw new Error(response.data.error || 'Failed to update gig');
    } catch (error) {
      console.error('Update gig error:', error);
      return {
        success: false,
        error: error.response?.data?.error || error.message
      };
    }
  },

  // Supprimer un gig
  async deleteGig(id) {
    try {
      const response = await axiosInstance.delete(`/gigs/${id}`);
      
      if (response.data.success) {
        return {
          success: true,
          message: 'Gig supprimé avec succès'
        };
      }
      throw new Error(response.data.error || 'Failed to delete gig');
    } catch (error) {
      console.error('Delete gig error:', error);
      return {
        success: false,
        error: error.response?.data?.error || error.message
      };
    }
  },

  // Changer le statut d'un gig
  async toggleGigStatus(id, status) {
    try {
      const response = await axiosInstance.patch(`/gigs/${id}/status`, { status });
      
      if (response.data.success) {
        return {
          success: true,
          gig: response.data.data,
          message: 'Statut mis à jour avec succès'
        };
      }
      throw new Error(response.data.error || 'Failed to update status');
    } catch (error) {
      console.error('Toggle gig status error:', error);
      return {
        success: false,
        error: error.response?.data?.error || error.message
      };
    }
  },

  // Récupérer les gigs en vedette
  async getFeaturedGigs() {
    try {
      const response = await axiosInstance.get('/gigs/featured');
      
      if (response.data.success) {
        return {
          success: true,
          gigs: response.data.data,
          count: response.data.count
        };
      }
      throw new Error(response.data.error || 'Failed to fetch featured gigs');
    } catch (error) {
      console.error('Get featured gigs error:', error);
      return {
        success: false,
        error: error.response?.data?.error || error.message,
        gigs: []
      };
    }
  },

  // Récupérer les gigs similaires
  async getRelatedGigs(id, categoryId) {
    try {
      const url = categoryId 
        ? `/gigs/${id}/related?category_id=${categoryId}`
        : `/gigs/${id}/related`;
      
      const response = await axiosInstance.get(url);
      
      if (response.data.success) {
        return {
          success: true,
          gigs: response.data.data,
          count: response.data.count
        };
      }
      throw new Error(response.data.error || 'Failed to fetch related gigs');
    } catch (error) {
      console.error('Get related gigs error:', error);
      return {
        success: false,
        error: error.response?.data?.error || error.message,
        gigs: []
      };
    }
  }
};

export default gigService;