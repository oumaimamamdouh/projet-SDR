const rpcClient = require('../utils/rpcClient');

class ReviewController {
    
    // ==================== MÉTHODES CLIENT ====================
    
    async createReview(req, res) {
        try {
            console.log('📦 [ReviewController] createReview');
            
            const clientId = req.user?._id || req.user?.id;
            const { orderId } = req.params;
            const reviewData = req.body;
            
            if (!clientId) {
                return res.status(401).json({
                    success: false,
                    error: 'Authentication required'
                });
            }
            
            if (!orderId) {
                return res.status(400).json({
                    success: false,
                    error: 'Order ID is required'
                });
            }
            
            const result = await rpcClient.createReview(orderId, clientId, reviewData);
            
            if (result.success) {
                res.status(201).json({
                    success: true,
                    data: result.review,
                    message: 'Review created successfully'
                });
            } else {
                res.status(400).json({
                    success: false,
                    error: result.error || 'Failed to create review'
                });
            }
        } catch (error) {
            console.error('❌ [ReviewController] createReview error:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error',
                details: error.message
            });
        }
    }
    
    async updateReview(req, res) {
        try {
            console.log('📦 [ReviewController] updateReview');
            
            const clientId = req.user?._id || req.user?.id;
            const { reviewId } = req.params;
            const updateData = req.body;
            
            if (!clientId) {
                return res.status(401).json({
                    success: false,
                    error: 'Authentication required'
                });
            }
            
            if (!reviewId) {
                return res.status(400).json({
                    success: false,
                    error: 'Review ID is required'
                });
            }
            
            const result = await rpcClient.updateReview(reviewId, clientId, updateData);
            
            if (result.success) {
                res.status(200).json({
                    success: true,
                    data: result.review,
                    message: 'Review updated successfully'
                });
            } else {
                res.status(400).json({
                    success: false,
                    error: result.error || 'Failed to update review'
                });
            }
        } catch (error) {
            console.error('❌ [ReviewController] updateReview error:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error',
                details: error.message
            });
        }
    }
    
    async deleteReview(req, res) {
        try {
            console.log('📦 [ReviewController] deleteReview');
            
            const clientId = req.user?._id || req.user?.id;
            const { reviewId } = req.params;
            
            if (!clientId) {
                return res.status(401).json({
                    success: false,
                    error: 'Authentication required'
                });
            }
            
            if (!reviewId) {
                return res.status(400).json({
                    success: false,
                    error: 'Review ID is required'
                });
            }
            
            const result = await rpcClient.deleteReview(reviewId, clientId);
            
            if (result.success) {
                res.status(200).json({
                    success: true,
                    message: result.message || 'Review deleted successfully'
                });
            } else {
                res.status(400).json({
                    success: false,
                    error: result.error || 'Failed to delete review'
                });
            }
        } catch (error) {
            console.error('❌ [ReviewController] deleteReview error:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error',
                details: error.message
            });
        }
    }
    
    // ==================== MÉTHODES FREELANCER ====================
    
    async respondToReview(req, res) {
        try {
            console.log('📦 [ReviewController] respondToReview');
            
            const freelancerId = req.user?._id || req.user?.id;
            const { reviewId } = req.params;
            const { response } = req.body;
            
            if (!freelancerId) {
                return res.status(401).json({
                    success: false,
                    error: 'Authentication required'
                });
            }
            
            if (!reviewId || !response) {
                return res.status(400).json({
                    success: false,
                    error: 'Review ID and response are required'
                });
            }
            
            const result = await rpcClient.respondToReview(reviewId, freelancerId, response);
            
            if (result.success) {
                res.status(200).json({
                    success: true,
                    message: result.message || 'Response added successfully'
                });
            } else {
                res.status(400).json({
                    success: false,
                    error: result.error || 'Failed to add response'
                });
            }
        } catch (error) {
            console.error('❌ [ReviewController] respondToReview error:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error',
                details: error.message
            });
        }
    }
    
    // ==================== MÉTHODES PUBLIQUES ====================
    
    async getGigReviews(req, res) {
        try {
            const { gigId } = req.params;
            const filters = req.query;
            
            console.log(`📦 [ReviewController] getGigReviews for gig: ${gigId}`);
            
            if (!gigId) {
                return res.status(400).json({
                    success: false,
                    error: 'Gig ID is required'
                });
            }
            
            // Convert query parameters to proper types
            const processedFilters = {};
            if (filters.min_rating) processedFilters.min_rating = parseFloat(filters.min_rating);
            if (filters.has_response) processedFilters.has_response = filters.has_response === 'true';
            if (filters.is_verified) processedFilters.is_verified = filters.is_verified === 'true';
            if (filters.page) processedFilters.page = parseInt(filters.page);
            if (filters.limit) processedFilters.limit = parseInt(filters.limit);
            if (filters.sort_by) processedFilters.sort_by = filters.sort_by;
            
            const result = await rpcClient.getGigReviews(gigId, processedFilters);
            
            if (result.success) {
                res.status(200).json({
                    success: true,
                    data: result.reviews || [],
                    pagination: result.pagination || {
                        page: 1,
                        limit: 10,
                        total: 0,
                        pages: 0
                    }
                });
            } else {
                res.status(400).json({
                    success: false,
                    error: result.error || 'Failed to fetch gig reviews'
                });
            }
        } catch (error) {
            console.error('❌ [ReviewController] getGigReviews error:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error',
                details: error.message
            });
        }
    }
    
    async getFreelancerReviews(req, res) {
        try {
            const { freelancerId } = req.params;
            const filters = req.query;
            
            console.log(`📦 [ReviewController] getFreelancerReviews for freelancer: ${freelancerId}`);
            
            if (!freelancerId) {
                return res.status(400).json({
                    success: false,
                    error: 'Freelancer ID is required'
                });
            }
            
            // Convert query parameters to proper types
            const processedFilters = {};
            if (filters.min_rating) processedFilters.min_rating = parseFloat(filters.min_rating);
            if (filters.has_response) processedFilters.has_response = filters.has_response === 'true';
            if (filters.is_verified) processedFilters.is_verified = filters.is_verified === 'true';
            if (filters.page) processedFilters.page = parseInt(filters.page);
            if (filters.limit) processedFilters.limit = parseInt(filters.limit);
            if (filters.sort_by) processedFilters.sort_by = filters.sort_by;
            
            const result = await rpcClient.getFreelancerReviews(freelancerId, processedFilters);
            
            if (result.success) {
                res.status(200).json({
                    success: true,
                    data: result.reviews || [],
                    pagination: result.pagination || {
                        page: 1,
                        limit: 10,
                        total: 0,
                        pages: 0
                    }
                });
            } else {
                res.status(400).json({
                    success: false,
                    error: result.error || 'Failed to fetch freelancer reviews'
                });
            }
        } catch (error) {
            console.error('❌ [ReviewController] getFreelancerReviews error:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error',
                details: error.message
            });
        }
    }
    
    async getReviewStats(req, res) {
        try {
            const { freelancerId } = req.params;
            
            console.log(`📦 [ReviewController] getReviewStats for freelancer: ${freelancerId}`);
            
            if (!freelancerId) {
                return res.status(400).json({
                    success: false,
                    error: 'Freelancer ID is required'
                });
            }
            
            const result = await rpcClient.getReviewStats(freelancerId);
            
            if (result.success) {
                res.status(200).json({
                    success: true,
                    data: result.stats
                });
            } else {
                res.status(400).json({
                    success: false,
                    error: result.error || 'Failed to fetch review statistics'
                });
            }
        } catch (error) {
            console.error('❌ [ReviewController] getReviewStats error:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error',
                details: error.message
            });
        }
    }
    
    // ==================== MÉTHODES ADMIN ====================
    
    async getAllReviews(req, res) {
        try {
            console.log('📦 [ReviewController] getAllReviews');
            
            const filters = req.query;
            const pagination = {
                page: parseInt(req.query.page) || 1,
                limit: parseInt(req.query.limit) || 50
            };
            
            // Convert query parameters to proper types
            const processedFilters = {};
            
            // ID filters
            if (filters.freelancer_id) processedFilters.freelancer_id = filters.freelancer_id;
            if (filters.client_id) processedFilters.client_id = filters.client_id;
            if (filters.gig_id) processedFilters.gig_id = filters.gig_id;
            if (filters.order_id) processedFilters.order_id = filters.order_id;
            
            // Rating filters
            if (filters.min_rating) processedFilters.min_rating = parseFloat(filters.min_rating);
            if (filters.max_rating) processedFilters.max_rating = parseFloat(filters.max_rating);
            
            // Boolean filters
            if (filters.has_response) processedFilters.has_response = filters.has_response === 'true';
            if (filters.is_public) processedFilters.is_public = filters.is_public === 'true';
            if (filters.is_verified) processedFilters.is_verified = filters.is_verified === 'true';
            
            // Date filters
            if (filters.date_from) processedFilters.date_from = filters.date_from;
            if (filters.date_to) processedFilters.date_to = filters.date_to;
            
            // Sort
            if (filters.sort_by) processedFilters.sort_by = filters.sort_by;
            
            const result = await rpcClient.getAllReviews(processedFilters, pagination);
            
            if (result.success) {
                res.status(200).json({
                    success: true,
                    data: result.reviews || [],
                    pagination: result.pagination || {
                        page: 1,
                        limit: 50,
                        total: 0,
                        pages: 0
                    }
                });
            } else {
                res.status(400).json({
                    success: false,
                    error: result.error || 'Failed to fetch reviews'
                });
            }
        } catch (error) {
            console.error('❌ [ReviewController] getAllReviews error:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error',
                details: error.message
            });
        }
    }
    
    async deleteReviewAdmin(req, res) {
        try {
            console.log('📦 [ReviewController] deleteReviewAdmin');
            
            const { reviewId } = req.params;
            
            if (!reviewId) {
                return res.status(400).json({
                    success: false,
                    error: 'Review ID is required'
                });
            }
            
            const result = await rpcClient.deleteReviewAdmin(reviewId);
            
            if (result.success) {
                res.status(200).json({
                    success: true,
                    message: result.message || 'Review deleted successfully'
                });
            } else {
                res.status(400).json({
                    success: false,
                    error: result.error || 'Failed to delete review'
                });
            }
        } catch (error) {
            console.error('❌ [ReviewController] deleteReviewAdmin error:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error',
                details: error.message
            });
        }
    }
    
    async toggleReviewVisibility(req, res) {
        try {
            console.log('📦 [ReviewController] toggleReviewVisibility');
            
            const { reviewId } = req.params;
            const { is_public } = req.body;
            
            if (!reviewId || is_public === undefined) {
                return res.status(400).json({
                    success: false,
                    error: 'Review ID and is_public are required'
                });
            }
            
            const result = await rpcClient.toggleReviewVisibility(reviewId, is_public);
            
            if (result.success) {
                res.status(200).json({
                    success: true,
                    message: result.message || 'Review visibility updated'
                });
            } else {
                res.status(400).json({
                    success: false,
                    error: result.error || 'Failed to update review visibility'
                });
            }
        } catch (error) {
            console.error('❌ [ReviewController] toggleReviewVisibility error:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error',
                details: error.message
            });
        }
    }
    
    // ==================== MÉTHODES UTILITAIRES ====================
    
    async healthCheck(req, res) {
        try {
            console.log('📦 [ReviewController] healthCheck');
            
            // Simple health check - test connection to RPC
            const testMethods = [
                'create_review',
                'get_gig_reviews',
                'get_freelancer_reviews'
            ];
            
            res.status(200).json({
                success: true,
                service: 'Review Service',
                status: 'operational',
                methods_available: testMethods,
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            console.error('❌ [ReviewController] healthCheck error:', error);
            res.status(500).json({
                success: false,
                service: 'Review Service',
                status: 'degraded',
                error: error.message,
                timestamp: new Date().toISOString()
            });
        }
    }
    
    async validateReviewData(req, res) {
        try {
            console.log('📦 [ReviewController] validateReviewData');
            
            const reviewData = req.body;
            
            // Basic validation
            const errors = [];
            
            if (!reviewData.rating_communication || reviewData.rating_communication < 1 || reviewData.rating_communication > 5) {
                errors.push('rating_communication must be between 1 and 5');
            }
            
            if (!reviewData.rating_quality || reviewData.rating_quality < 1 || reviewData.rating_quality > 5) {
                errors.push('rating_quality must be between 1 and 5');
            }
            
            if (!reviewData.rating_deadline || reviewData.rating_deadline < 1 || reviewData.rating_deadline > 5) {
                errors.push('rating_deadline must be between 1 and 5');
            }
            
            if (!reviewData.comment || reviewData.comment.trim().length < 10) {
                errors.push('comment must be at least 10 characters');
            }
            
            if (!reviewData.gig_id) {
                errors.push('gig_id is required');
            }
            
            if (errors.length > 0) {
                return res.status(400).json({
                    success: false,
                    error: 'Validation failed',
                    details: errors
                });
            }
            
            res.status(200).json({
                success: true,
                message: 'Review data is valid',
                calculated_rating: ((reviewData.rating_communication + reviewData.rating_quality + reviewData.rating_deadline) / 3).toFixed(1)
            });
        } catch (error) {
            console.error('❌ [ReviewController] validateReviewData error:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error',
                details: error.message
            });
        }
    }
}
module.exports = new ReviewController(); 