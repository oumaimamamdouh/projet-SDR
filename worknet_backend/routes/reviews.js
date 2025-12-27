const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Middleware d'authentification - IMPORT CORRECT
const { protect, authorize } = require('../middleware/auth');

// ==================== ROUTES PUBLIQUES ====================
router.get('/health', reviewController.healthCheck);
router.get('/gig/:gigId', reviewController.getGigReviews);
router.get('/freelancer/:freelancerId', reviewController.getFreelancerReviews);
router.get('/stats/:freelancerId', reviewController.getReviewStats);
router.post('/validate', reviewController.validateReviewData);

// ==================== ROUTES CLIENT (authentifiées) ====================
router.post('/order/:orderId', protect, authorize(['client']), reviewController.createReview); // ⬅️ CHANGEZ
router.put('/:reviewId', protect, authorize(['client']), reviewController.updateReview);       // ⬅️ CHANGEZ
router.delete('/:reviewId', protect, authorize(['client']), reviewController.deleteReview);    // ⬅️ CHANGEZ

// ==================== ROUTES FREELANCER (authentifiées) ====================
router.post('/:reviewId/respond', protect, authorize(['freelancer']), reviewController.respondToReview); // ⬅️ CHANGEZ

// ==================== ROUTES ADMIN ====================
router.get('/admin/all', protect, authorize(['admin']), reviewController.getAllReviews);                   // ⬅️ CHANGEZ
router.delete('/admin/:reviewId', protect, authorize(['admin']), reviewController.deleteReviewAdmin);      // ⬅️ CHANGEZ
router.put('/admin/:reviewId/visibility', protect, authorize(['admin']), reviewController.toggleReviewVisibility); // ⬅️ CHANGEZ

module.exports = router;