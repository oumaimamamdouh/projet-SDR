// const express = require('express');
// const router = express.Router();
// const {
//     getAllGigs,
//     getGigById,
//     getGigBySlug,
//     searchGigs,
//     getFeaturedGigs,
//     getRelatedGigs,
//     getGigReviews,
//     createGig,
//     updateGig,
//     deleteGig,
//     getMyGigs,
//     toggleGigStatus,
//     updateGigImages,
//     getGigAnalytics,
//     getAllGigsAdmin,
//     updateGigStatusAdmin,
//     featureGig
// } = require('../controllers/gigsController');

// const { protect, authorize, optionalAuth } = require('../middleware/auth');

// // ==================== PUBLIC ROUTES ====================
// router.get('/', getAllGigs);
// router.get('/search', searchGigs);
// router.get('/featured', getFeaturedGigs);
// router.get('/slug/:slug', getGigBySlug);
// router.get('/:id', getGigById);
// router.get('/:id/related', getRelatedGigs);
// router.get('/:id/reviews', getGigReviews);

// // ==================== PRIVATE ROUTES (FREELANCER) ====================
// router.use(protect); // All routes below require authentication

// // Gig management routes (freelancer only)
// router.post('/', authorize('freelancer'), createGig);
// router.get('/my-gigs', authorize('freelancer'), getMyGigs);

// // Routes for specific gig operations (freelancer - owner)
// router.route('/:id')
//     .put(authorize('freelancer'), updateGig)
//     .delete(authorize('freelancer'), deleteGig);

// router.put('/:id/images', authorize('freelancer'), updateGigImages);
// router.patch('/:id/status', authorize('freelancer'), toggleGigStatus);
// router.get('/:id/analytics', authorize('freelancer'), getGigAnalytics);

// // ==================== ADMIN ROUTES ============ ========
// router.get('/admin/all', authorize('admin'), getAllGigsAdmin);
// router.patch('/admin/:id/status', authorize('admin'), updateGigStatusAdmin);
// router.patch('/admin/:id/feature', authorize('admin'), featureGig);

// module.exports = router;















// const express = require('express');
// const router = express.Router();
// const {
//     getAllGigs,
//     getGigById,
//     getGigBySlug,
//     searchGigs,
//     getFeaturedGigs,
//     getRelatedGigs,
//     getGigReviews,
//     createGig,
//     updateGig,
//     deleteGig,
//     getMyGigs,
//     toggleGigStatus,
//     updateGigImages,
//     getGigAnalytics,
//     getAllGigsAdmin,
//     updateGigStatusAdmin,
//     featureGig
// } = require('../controllers/gigsController');

// const { protect, authorize, optionalAuth } = require('../middleware/auth');

// // ==================== PUBLIC ROUTES ====================
// router.get('/', getAllGigs);
// router.get('/search', searchGigs);
// router.get('/featured', getFeaturedGigs);
// router.get('/slug/:slug', getGigBySlug);
// router.get('/:id', getGigById);
// router.get('/:id/related', getRelatedGigs);
// router.get('/:id/reviews', getGigReviews);

// // ==================== PRIVATE ROUTES ====================
// router.use(protect); // All routes below require authentication

// // Gig management routes (freelancer only)
// router.post('/', authorize('freelancer', 'Freelancer'), createGig);
// router.get('/my-gigs', authorize('freelancer', 'Freelancer'), getMyGigs);

// // Routes for specific gig operations (freelancer - owner)
// router.route('/:id')
//     .put(authorize('freelancer', 'Freelancer'), updateGig)
//     .delete(authorize('freelancer', 'Freelancer'), deleteGig);

// router.put('/:id/images', authorize('freelancer', 'Freelancer'), updateGigImages);
// router.patch('/:id/status', authorize('freelancer', 'Freelancer'), toggleGigStatus);
// router.get('/:id/analytics', authorize('freelancer', 'Freelancer'), getGigAnalytics);

// // ==================== ADMIN ROUTES ====================
// router.get('/admin/all', authorize('admin', 'Admin'), getAllGigsAdmin);
// router.patch('/admin/:id/status', authorize('admin', 'Admin'), updateGigStatusAdmin);
// router.patch('/admin/:id/feature', authorize('admin', 'Admin'), featureGig);

// module.exports = router;



// const express = require('express');
// const router = express.Router();
// const {
//     getAllGigs,
//     getGigById,
//     getGigBySlug,
//     searchGigs,
//     getFeaturedGigs,
//     getRelatedGigs,
//     getGigReviews,
//     createGig,
//     updateGig,
//     deleteGig,
//     getMyGigs,
//     toggleGigStatus,
//     updateGigImages,
//     getGigAnalytics,
//     getAllGigsAdmin,
//     updateGigStatusAdmin,
//     featureGig
// } = require('../controllers/gigsController');

// const { protect, authorize, optionalAuth } = require('../middleware/auth');

// // ==================== PUBLIC ROUTES ====================
// // Specific routes should come before wildcard routes
// router.get('/', getAllGigs);
// router.get('/search', searchGigs);
// router.get('/featured', getFeaturedGigs);
// router.get('/slug/:slug', getGigBySlug);
// router.get('/:id/related', getRelatedGigs);
// router.get('/:id/reviews', getGigReviews);
// // Wildcard route should be LAST
// router.get('/:id', getGigById);

// // ==================== PRIVATE ROUTES ====================
// // All routes below require authentication
// router.use(protect);

// // Gig management routes (freelancer only)
// // Specific routes first
// router.post('/', authorize('freelancer', 'Freelancer'), createGig);
// router.get('/my-gigs', authorize('freelancer', 'Freelancer'), getMyGigs); // This is specific, comes first

// // Routes for specific gig operations (freelancer - owner)
// // These use :id parameter, so they come after specific routes
// router.route('/:id')
//     .put(authorize('freelancer', 'Freelancer'), updateGig)
//     .delete(authorize('freelancer', 'Freelancer'), deleteGig);

// router.put('/:id/images', authorize('freelancer', 'Freelancer'), updateGigImages);
// router.patch('/:id/status', authorize('freelancer', 'Freelancer'), toggleGigStatus);
// router.get('/:id/analytics', authorize('freelancer', 'Freelancer'), getGigAnalytics);

// // ==================== ADMIN ROUTES ====================
// // Admin routes - note they have '/admin/' prefix so they're specific
// router.get('/admin/all', authorize('admin', 'Admin'), getAllGigsAdmin);
// router.patch('/admin/:id/status', authorize('admin', 'Admin'), updateGigStatusAdmin);
// router.patch('/admin/:id/feature', authorize('admin', 'Admin'), featureGig);

// module.exports = router;

const express = require('express');
const router = express.Router();
const {
    getAllGigs,
    getGigById,
    getGigBySlug,
    searchGigs,
    getFeaturedGigs,
    getRelatedGigs,
    getGigReviews,
    createGig,
    updateGig,
    deleteGig,
    getMyGigs,
    toggleGigStatus,
    updateGigImages,
    getGigAnalytics,
    getAllGigsAdmin,
    updateGigStatusAdmin,
    featureGig
} = require('../controllers/gigsController');

const { protect, authorize, optionalAuth } = require('../middleware/auth');

// ==================== ROUTES IN ORDER OF SPECIFICITY ====================

// 1. MOST SPECIFIC ROUTES FIRST (no parameters)
router.get('/', getAllGigs);
router.get('/search', searchGigs);
router.get('/featured', getFeaturedGigs);

// 2. SPECIFIC ROUTES WITH FIXED PATHS
router.get('/slug/:slug', getGigBySlug);
router.get('/my-gigs', protect, authorize('freelancer', 'Freelancer'), getMyGigs); // <-- PROTECTED, BEFORE :id

// 3. ROUTES WITH ONE PARAMETER (less specific)
router.get('/:id/related', getRelatedGigs);
router.get('/:id/reviews', getGigReviews);

// 4. WILDCARD ROUTE (least specific) - COMES LAST
router.get('/:id', getGigById);

// ==================== PROTECTED ROUTES ====================
// Apply protect middleware to all routes below
router.use(protect);

// Freelancer routes (no :id parameter)
router.post('/', authorize('freelancer', 'Freelancer'), createGig);

// Freelancer routes with :id parameter
router.route('/:id')
    .put(authorize('freelancer', 'Freelancer'), updateGig)
    .delete(authorize('freelancer', 'Freelancer'), deleteGig);

router.put('/:id/images', authorize('freelancer', 'Freelancer'), updateGigImages);
router.patch('/:id/status', authorize('freelancer', 'Freelancer'), toggleGigStatus);
router.get('/:id/analytics', authorize('freelancer', 'Freelancer'), getGigAnalytics);

// Admin routes
router.get('/admin/all', authorize('admin', 'Admin'), getAllGigsAdmin);
router.patch('/admin/:id/status', authorize('admin', 'Admin'), updateGigStatusAdmin);
router.patch('/admin/:id/feature', authorize('admin', 'Admin'), featureGig);

module.exports = router;