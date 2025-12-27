
// const xmlrpc = require('xmlrpc');
// const logger = console; // Vous pouvez remplacer par votre propre logger

// class RPCClient {
//     constructor() {
//         this.host = process.env.RPC_SERVER_HOST || 'localhost';
//         this.port = process.env.RPC_SERVER_PORT || 8000;
//         this.client = null;
//         this.connect();
//     }

//     connect() {
//         try {
//             // Créer le client RPC
//             this.client = xmlrpc.createClient({
//                 host: this.host,
//                 port: this.port,
//                 path: '/RPC2'
//             });

//             logger.log(`✅ RPC Client connected to ${this.host}:${this.port}`);
            
//             // Tester la connexion
//             this.client.methodCall('system.listMethods', [], (error, methods) => {
//                 if (error) {
//                     logger.error('❌ Failed to connect to RPC server:', error.message);
//                 } else {
//                     logger.log('📡 Available RPC methods:', methods);
//                 }
//             });
//         } catch (error) {
//             logger.error('❌ Error creating RPC client:', error);
//         }
//     }

//     /**
//      * Appel générique à une méthode RPC
//      * @param {string} method - Nom de la méthode RPC
//      * @param {Array} params - Paramètres à envoyer
//      * @returns {Promise} - Promesse avec le résultat
//      */
//     // Add this method to RPCClient class:
//     reconnect() {
//         console.log('Attempting to reconnect to RPC server...');
//         this.connect();
//     }

//     // Modify the call method to handle disconnections:
//     call(method, params = []) {
//         return new Promise((resolve, reject) => {
//             if (!this.client) {
//                 this.reconnect();
//             }

//             // Add timeout
//             const timeout = setTimeout(() => {
//                 reject({
//                     success: false,
//                     error: 'RPC request timeout',
//                     details: 'Server took too long to respond'
//                 });
//             }, 10000); // 10 second timeout

//             logger.log(`📤 RPC Call: ${method}`, params);

//             this.client.methodCall(method, params, (error, value) => {
//                 clearTimeout(timeout);
                
//                 if (error) {
//                     logger.error(`❌ RPC Error (${method}):`, error);
                    
//                     // Auto-reconnect on certain errors
//                     if (error.code === 'ECONNREFUSED' || error.code === 'ECONNRESET') {
//                         this.reconnect();
//                     }
                    
//                     reject({
//                         success: false,
//                         error: `RPC Server Error: ${error.message || 'Connection failed'}`,
//                         details: error
//                     });
//                 } else {
//                     logger.log(`📥 RPC Response (${method}):`, value);
//                     resolve(value);
//                 }
//             });
//         });
//     }
//     // ==================== USER SERVICE METHODS ====================
// //user_service.
//     async loginUser(credentials) {
//         return this.call('login_user', [credentials]);
//     }

//     async logoutUser(userId) {
//         return this.call('logout_user', [userId]);
//     }

//     async refreshToken(refreshToken) {
//         return this.call('refresh_token', [refreshToken]);
//     }

//     async forgotPassword(email) {
//         return this.call('forgot_password', [email]);
//     }

//     async resetPassword(token, newPassword) {
//         return this.call('reset_password', [token, newPassword]);
//     }

//     // User management
//     async createUser(userData) {
//         return this.call('create_user', [userData]);
//     }

//     async authenticateUser(email, password) {
//         return this.call('authenticate_user', [email, password]);
//     }

//     async getUserProfile(userId) {
//         return this.call('get_user_profile', [userId]);
//     }

//     async updateUserProfile(userId, updateData) {
//         return this.call('update_user_profile', [userId, updateData]);
//     }

//     async updateUserAvatar(userId, imageUrl) {
//         return this.call('update_user_avatar', [userId, imageUrl]);
//     }

//     async changePassword(userId, oldPassword, newPassword) {
//         return this.call('change_password', [userId, oldPassword, newPassword]);
//     }

//     async deactivateAccount(userId) {
//         return this.call('deactivate_account', [userId]);
//     }

//     async deleteAccount(userId) {
//         return this.call('delete_account', [userId]);
//     }

//     // Freelancer methods
//     async updateFreelancerSkills(userId, skills) {
//         return this.call('update_freelancer_skills', [userId, skills]);
//     }

//     async updateFreelancerPortfolio(userId, portfolioItems) {
//         return this.call('update_freelancer_portfolio', [userId, portfolioItems]);
//     }

//     async getFreelancerPublicProfile(username) {
//         return this.call('get_freelancer_public_profile', [username]);
//     }

//     async searchFreelancers(filters) {
//         return this.call('search_freelancers', [filters]);
//     }

//     // Client methods
//     async updateClientCompany(userId, companyData) {
//         return this.call('update_client_company', [userId, companyData]);
//     }

//     // Admin methods
//     async getAllUsers(filters = {}, pagination = {}) {
//         return this.call('get_all_users', [filters, pagination]);
//     }

//     async getUserById(userId) {
//         return this.call('get_user_by_id', [userId]);
//     }

//     async updateUserStatus(userId, status) {
//         return this.call('update_user_status', [userId, status]);
//     }

//     async deleteUser(userId) {
//         return this.call('delete_user', [userId]);
//     }

//     async getUserByEmail(email) {
//         return this.call('get_user_by_email', [email]);
//     }

//     // Token methods
//     async validateToken(token) {
//         return this.call('validate_token', [token]);
//     }

//     // ==================== OTHER SERVICES (Placeholders) ====================
//     // Health check
//     async healthCheck() {
//         return this.call('system.listMethods', []);
//     }

//     // Test connection
//     async testConnection() {
//         try {
//             const result = await this.healthCheck();
//             return {
//                 connected: true,
//                 methods: result,
//                 timestamp: new Date().toISOString()
//             };
//         } catch (error) {
//             return {
//                 connected: false,
//                 error: error.message,
//                 timestamp: new Date().toISOString()
//             };
//         }
//     }
// }

// // Créer une instance singleton
// const rpcClient = new RPCClient();

// // Export de l'instance
// module.exports = rpcClient;

const xmlrpc = require('xmlrpc');
const logger = console; // Vous pouvez remplacer par votre propre logger

class RPCClient {
    constructor() {
        this.host = process.env.RPC_SERVER_HOST || 'localhost';
        this.port = process.env.RPC_SERVER_PORT || 8000;
        this.client = null;
        this.connect();
    }

    connect() {
        try {
            // Créer le client RPC
            this.client = xmlrpc.createClient({
                host: this.host,
                port: this.port,
                path: '/RPC2'
            });

            logger.log(`✅ RPC Client connected to ${this.host}:${this.port}`);
            
            // Tester la connexion
            this.client.methodCall('system.listMethods', [], (error, methods) => {
                if (error) {
                    logger.error('❌ Failed to connect to RPC server:', error.message);
                } else {
                    logger.log('📡 Available RPC methods:', methods.length);
                }
            });
        } catch (error) {
            logger.error('❌ Error creating RPC client:', error);
        }
    }

    reconnect() {
        console.log('Attempting to reconnect to RPC server...');
        this.connect();
    }

    call(method, params = []) {
        return new Promise((resolve, reject) => {
            if (!this.client) {
                this.reconnect();
            }

            // Add timeout
            const timeout = setTimeout(() => {
                reject({
                    success: false,
                    error: 'RPC request timeout',
                    details: 'Server took too long to respond'
                });
            }, 10000); // 10 second timeout

            logger.log(`📤 RPC Call: ${method}`, params);

            this.client.methodCall(method, params, (error, value) => {
                clearTimeout(timeout);
                
                if (error) {
                    logger.error(`❌ RPC Error (${method}):`, error);
                    
                    // Auto-reconnect on certain errors
                    if (error.code === 'ECONNREFUSED' || error.code === 'ECONNRESET') {
                        this.reconnect();
                    }
                    
                    reject({
                        success: false,
                        error: `RPC Server Error: ${error.message || 'Connection failed'}`,
                        details: error
                    });
                } else {
                    logger.log(`📥 RPC Response (${method}):`, typeof value === 'object' ? 'Object received' : value);
                    resolve(value);
                }
            });
        });
    }

    // ==================== USER SERVICE METHODS ====================
    async loginUser(credentials) {
        return this.call('login_user', [credentials]);
    }

    async logoutUser(userId) {
        return this.call('logout_user', [userId]);
    }

    async refreshToken(refreshToken) {
        return this.call('refresh_token', [refreshToken]);
    }

    async forgotPassword(email) {
        return this.call('forgot_password', [email]);
    }

    async resetPassword(token, newPassword) {
        return this.call('reset_password', [token, newPassword]);
    }
    /////////////:::::chaymaaaa///////////////////////////

    async createUser(userData) {
        return this.call('create_user', [userData]);
    }

    async authenticateUser(email, password) {
        return this.call('authenticate_user', [email, password]);
    }

    async getUserProfile(userId) {
        return this.call('get_user_profile', [userId]);
    }

    async updateUserProfile(userId, updateData) {
        return this.call('update_user_profile', [userId, updateData]);
    }

    async updateUserAvatar(userId, imageUrl) {
        return this.call('update_user_avatar', [userId, imageUrl]);
    }

    async changePassword(userId, oldPassword, newPassword) {
        return this.call('change_password', [userId, oldPassword, newPassword]);
    }

    async deactivateAccount(userId) {
        return this.call('deactivate_account', [userId]);
    }

    async deleteAccount(userId) {
        return this.call('delete_account', [userId]);
    }

    async updateFreelancerSkills(userId, skills) {
        return this.call('update_freelancer_skills', [userId, skills]);
    }

    async updateFreelancerPortfolio(userId, portfolioItems) {
        return this.call('update_freelancer_portfolio', [userId, portfolioItems]);
    }

    async getFreelancerPublicProfile(username) {
        return this.call('get_freelancer_public_profile', [username]);
    }

    async searchFreelancers(filters) {
        return this.call('search_freelancers', [filters]);
    }

    async updateClientCompany(userId, companyData) {
        return this.call('update_client_company', [userId, companyData]);
    }

    async getAllUsers(filters = {}, pagination = {}) {
        return this.call('get_all_users', [filters, pagination]);
    }

    async getUserById(userId) {
        return this.call('get_user_by_id', [userId]);
    }

    async updateUserStatus(userId, status) {
        return this.call('update_user_status', [userId, status]);
    }

    async deleteUser(userId) {
        return this.call('delete_user', [userId]);
    }

    async getUserByEmail(email) {
        return this.call('get_user_by_email', [email]);
    }

    // ==================== GIG SERVICE METHODS ====================
    async createGig(freelancerId, gigData) {
        return this.call('create_gig', [freelancerId, gigData]);
    }

    async getGigById(gigId) {
        return this.call('get_gig_by_id', [gigId]);
    }

    async getGigBySlug(slug) {
        return this.call('get_gig_by_slug', [slug]);
    }

    async searchGigs(searchQuery, filters) {
        return this.call('search_gigs', [searchQuery, filters]);
    }

    async getAllGigs(filters, pagination) {
        return this.call('get_all_gigs', [filters, pagination]);
    }

    async getFeaturedGigs() {
        return this.call('get_featured_gigs', []);
    }

    async getRelatedGigs(gigId, categoryId) {
        return this.call('get_related_gigs', [gigId, categoryId]);
    }

    async updateGig(gigId, freelancerId, updateData) {
        return this.call('update_gig', [gigId, freelancerId, updateData]);
    }

    async deleteGig(gigId, freelancerId) {
        return this.call('delete_gig', [gigId, freelancerId]);
    }

    async getMyGigs(freelancerId, filters) {
        return this.call('get_my_gigs', [freelancerId, filters]);
    }

    async toggleGigStatus(gigId, freelancerId, status) {
        return this.call('toggle_gig_status', [gigId, freelancerId, status]);
    }

    async updateGigImages(gigId, freelancerId, images) {
        return this.call('update_gig_images', [gigId, freelancerId, images]);
    }

    async getGigAnalytics(gigId, freelancerId) {
        return this.call('get_gig_analytics', [gigId, freelancerId]);
    }

    // Admin gig methods
    async getAllGigsAdmin(filters, pagination) {
        return this.call('get_all_gigs_admin', [filters, pagination]);
    }

    async updateGigStatusAdmin(gigId, status) {
        return this.call('update_gig_status_admin', [gigId, status]);
    }

    async featureGig(gigId, featured) {
        return this.call('feature_gig', [gigId, featured]);
    }
    // ==================== CATEGORY SERVICE METHODS ====================
  // ==================== CATEGORY SERVICE METHODS ====================

    async getAllCategories(filters = {}) {
        return this.call('get_all_categories', []);
    }

    async getCategoryById(categoryId) {
        return this.call('get_category_by_id', [categoryId]);
    }

    async getCategoryBySlug(slug) {
        return this.call('get_category_by_slug', [slug]);
    }

    async getSubcategories(parentId) {
        return this.call('get_subcategories', [parentId]);
    }

    async createCategory(categoryData) {
        return this.call('create_category', [categoryData]);
    }

    async updateCategory(categoryId, updateData) {
        return this.call('update_category', [categoryId, updateData]);
    }

    async deleteCategory(categoryId) {
        return this.call('delete_category', [categoryId]);
    }

    async updateCategoryOrder(orderedCategories) {
        return this.call('update_category_order', [orderedCategories]);
    }

    async toggleCategoryStatus(categoryId) {
        return this.call('toggle_category_status', [categoryId]);
    }
   
    
  
    // async updateCategoryOrder(orderedCategories) {
    //     return this.call('update_category_order', [orderedCategories]);
    // }
    // In rpcClient.js - updateCategoryOrder method (add debugging)
    

    // ==================== REVIEW SERVICE METHODS ====================
    // ==================== REVIEW SERVICE METHODS ====================

    async createReview(orderId, clientId, reviewData) {
        return this.call('create_review', [orderId, clientId, reviewData]);
    }

    async updateReview(reviewId, clientId, updateData) {
        return this.call('update_review', [reviewId, clientId, updateData]);
    }

    async deleteReview(reviewId, clientId) {
        return this.call('delete_review', [reviewId, clientId]);
    }

    async respondToReview(reviewId, freelancerId, response) {
        return this.call('respond_to_review', [reviewId, freelancerId, response]);
    }

    async getGigReviews(gigId, filters = {}) {
        return this.call('get_gig_reviews', [gigId, filters]);
    }

    async getFreelancerReviews(freelancerId, filters = {}) {
        return this.call('get_freelancer_reviews', [freelancerId, filters]);
    }

    async getReviewStats(freelancerId) {
        return this.call('get_review_stats', [freelancerId]);
    }

    async getAllReviews(filters = {}, pagination = {}) {
        return this.call('get_all_reviews', [filters, pagination]);
    }

    async deleteReviewAdmin(reviewId) {
        return this.call('delete_review_admin', [reviewId]);
    }

    async toggleReviewVisibility(reviewId, isPublic) {
        return this.call('toggle_review_visibility', [reviewId, isPublic]);
    }

    // ==================== ORDER SERVICE METHODS ==================== chaymaaaaaaaaaaaaaaa
  create_order_client = async (client_id, order_data) => 
        await this.call('create_order_client', [client_id, order_data]);
    
    get_my_orders = async (client_id, filters) => 
        await this.call('get_my_orders', [client_id, filters]);
    
    get_order_by_id = async (order_id, user_id) => 
        await this.call('get_order_by_id', [order_id, user_id]);
    
    cancel_order = async (order_id, client_id, reason) => 
        await this.call('cancel_order', [order_id, client_id, reason]);
    
    request_revision = async (order_id, client_id, revision_notes) => 
        await this.call('request_revision', [order_id, client_id, revision_notes]);
    
    accept_delivery = async (order_id, client_id) => 
        await this.call('accept_delivery', [order_id, client_id]);
    
    escalate_to_dispute = async (order_id, client_id, dispute_data) => 
        await this.call('escalate_to_dispute', [order_id, client_id, dispute_data]);
    
    // Freelancer
    get_freelancer_orders = async (freelancer_id, filters) => 
        await this.call('get_freelancer_orders', [freelancer_id, filters]);
    
    accept_order = async (order_id, freelancer_id) => 
        await this.call('accept_order', [order_id, freelancer_id]);
    
    decline_order = async (order_id, freelancer_id, reason) => 
        await this.call('decline_order', [order_id, freelancer_id, reason]);
    
    start_order_work = async (order_id, freelancer_id) => 
        await this.call('start_order_work', [order_id, freelancer_id]);
    
    deliver_order = async (order_id, freelancer_id, delivery_data) => 
        await this.call('deliver_order', [order_id, freelancer_id, delivery_data]);
    
    update_order_progress = async (order_id, freelancer_id, progress_data) => 
        await this.call('update_order_progress', [order_id, freelancer_id, progress_data]);
    
    // Shared
    get_order_timeline = async (order_id) => 
        await this.call('get_order_timeline', [order_id]);
    
    extend_deadline = async (order_id, user_id, extension_data) => 
        await this.call('extend_deadline', [order_id, user_id, extension_data]);
    
    // Admin
    get_all_orders_admin = async (filters, pagination) => 
        await this.call('get_all_orders_admin', [filters, pagination]);
    
    update_order_admin = async (order_id, update_data) => 
        await this.call('update_order_admin', [order_id, update_data]);
    
    resolve_dispute = async (order_id, resolution_data) => 
        await this.call('resolve_dispute', [order_id, resolution_data]);
    
    get_order_stats = async (user_id, user_role) => 
        await this.call('get_order_stats', [user_id, user_role]);
////chaymaaaaaaaaaaaaaaaaaaa

    // ==================== FAVORITE SERVICE METHODS ====================
    async addToFavorites(userId, gigId) {
        return this.call('add_gig_to_favorites', [userId, gigId]);
    }

    async removeFromFavorites(userId, gigId) {
        return this.call('remove_gig_from_favorites', [userId, gigId]);
    }

    // ==================== HEALTH CHECK ====================
    async healthCheck() {
        return this.call('system.listMethods', []);
    }

    async testConnection() {
        try {
            const result = await this.healthCheck();
            return {
                connected: true,
                methods: result,
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            return {
                connected: false,
                error: error.message || 'Connection failed',
                timestamp: new Date().toISOString()
            };
        }
    }

   async validateToken(token) {
    try {
        // Call the actual RPC method for token validation
        const result = await this.call('validate_token', [token]);
        
        // Log for debugging
        console.log('🔐 Token validation result:', result);
        
        return result;
    } catch (error) {
        console.error('❌ Token validation error:', error);
        return { 
            success: false, 
            error: 'Token validation failed',
            details: error.message 
        };
    }
}
}

// Créer une instance singleton
const rpcClient = new RPCClient();

// Export de l'instance
module.exports = rpcClient;