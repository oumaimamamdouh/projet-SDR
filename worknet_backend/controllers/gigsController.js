const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');
const rpcClient = require('../utils/rpcClient');

// @desc    Get all gigs
// @route   GET /api/gigs
// @access  Public
exports.getAllGigs = asyncHandler(async (req, res, next) => {
    const { 
        page = 1, 
        limit = 12, 
        sort_by = 'created_at', 
        sort_order = 'desc',
        status = 'active',
        category_id,
        freelancer_id,
        min_price,
        max_price,
        is_featured,
        is_urgent,
        min_rating
    } = req.query;

    const filters = {
        status,
        category_id,
        freelancer_id,
        min_price,
        max_price,
        is_featured,
        is_urgent,
        min_rating
    };

    const pagination = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort_by,
        sort_order
    };

    // Remove undefined filters
    Object.keys(filters).forEach(key => {
        if (filters[key] === undefined || filters[key] === '') {
            delete filters[key];
        }
    });

    const result = await rpcClient.call('get_all_gigs', [filters, pagination]);
    
    if (!result.success) {
        return next(new ErrorResponse(result.error, 400));
    }

    res.status(200).json({
        success: true,
        count: result.gigs ? result.gigs.length : 0,
        pagination: result.pagination,
        data: result.gigs
    });
});

// @desc    Get single gig by ID
// @route   GET /api/gigs/:id
// @access  Public
exports.getGigById = asyncHandler(async (req, res, next) => {
    const result = await rpcClient.call('get_gig_by_id', [req.params.id]);
    
    if (!result.success) {
        return next(new ErrorResponse(result.error, 404));
    }

    res.status(200).json({
        success: true,
        data: result.gig
    });
});

// @desc    Get gig by slug
// @route   GET /api/gigs/slug/:slug
// @access  Public
exports.getGigBySlug = asyncHandler(async (req, res, next) => {
    const result = await rpcClient.call('get_gig_by_slug', [req.params.slug]);
    
    if (!result.success) {
        return next(new ErrorResponse(result.error, 404));
    }

    res.status(200).json({
        success: true,
        data: result.gig
    });
});

// @desc    Search gigs
// @route   GET /api/gigs/search
// @access  Public
exports.searchGigs = asyncHandler(async (req, res, next) => {
    const { 
        q, 
        page = 1, 
        limit = 12,
        category_id,
        min_price,
        max_price,
        delivery_days,
        pricing_type,
        is_urgent,
        sort_by = 'created_at',
        sort_order = 'desc'
    } = req.query;

    const search_query = q || null;
    const filters = {
        page: parseInt(page),
        limit: parseInt(limit),
        category_id,
        min_price,
        max_price,
        delivery_days,
        pricing_type,
        is_urgent,
        sort_by,
        sort_order
    };

    // Remove undefined filters
    Object.keys(filters).forEach(key => {
        if (filters[key] === undefined || filters[key] === '') {
            delete filters[key];
        }
    });

    const result = await rpcClient.call('search_gigs', [search_query, filters]);
    
    if (!result.success) {
        return next(new ErrorResponse(result.error, 400));
    }

    res.status(200).json({
        success: true,
        count: result.gigs ? result.gigs.length : 0,
        pagination: result.pagination,
        data: result.gigs
    });
});

// @desc    Get featured gigs
// @route   GET /api/gigs/featured
// @access  Public
exports.getFeaturedGigs = asyncHandler(async (req, res, next) => {
    const result = await rpcClient.call('get_featured_gigs', []);
    
    if (!result.success) {
        return next(new ErrorResponse(result.error, 400));
    }

    res.status(200).json({
        success: true,
        count: result.gigs ? result.gigs.length : 0,
        data: result.gigs
    });
});

// @desc    Get related gigs
// @route   GET /api/gigs/:id/related
// @access  Public
exports.getRelatedGigs = asyncHandler(async (req, res, next) => {
    const { category_id } = req.query;
    const result = await rpcClient.call('get_related_gigs', [req.params.id, category_id]);
    
    if (!result.success) {
        return next(new ErrorResponse(result.error, 400));
    }

    res.status(200).json({
        success: true,
        count: result.gigs ? result.gigs.length : 0,
        data: result.gigs
    });
});

// @desc    Get gig reviews
// @route   GET /api/gigs/:id/reviews
// @access  Public
exports.getGigReviews = asyncHandler(async (req, res, next) => {
    const { page = 1, limit = 10, sort = 'newest' } = req.query;
    
    const filters = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort
    };

    const result = await rpcClient.call('get_gig_reviews', [req.params.id, filters]);
    
    if (!result.success) {
        return next(new ErrorResponse(result.error, 400));
    }

    res.status(200).json({
        success: true,
        count: result.reviews ? result.reviews.length : 0,
        pagination: result.pagination,
        data: result.reviews
    });
});

// @desc    Create new gig
// @route   POST /api/gigs
// @access  Private (Freelancer)
// exports.createGig = asyncHandler(async (req, res, next) => {
//     if (!req.user || req.user.role !== 'freelancer') {
//         return next(new ErrorResponse('Only freelancers can create gigs', 403));
//     }

//     const gigData = {
//         ...req.body,
//         freelancer_id: req.user.id
//     };

//     const result = await rpcClient.call('create_gig', [req.user.id, gigData]);
    
//     if (!result.success) {
//         return next(new ErrorResponse(result.error, 400));
//     }

//     res.status(201).json({
//         success: true,
//         data: result.gig
//     });
// });
// @desc    Create new gig
// @route   POST /api/gigs
// @access  Private (Freelancer)
exports.createGig = asyncHandler(async (req, res, next) => {
    if (!req.user || (req.user.role !== 'freelancer' && req.user.role !== 'Freelancer')) {
        return next(new ErrorResponse('Only freelancers can create gigs', 403));
    }

    const gigData = {
        ...req.body,
        freelancer_id: req.user.id
    };

    const result = await rpcClient.call('create_gig', [req.user.id, gigData]);
    
    if (!result.success) {
        return next(new ErrorResponse(result.error, 400));
    }

    res.status(201).json({
        success: true,
        data: result.gig
    });
});
// @desc    Update gig
// @route   PUT /api/gigs/:id
// @access  Private (Freelancer - Owner)
exports.updateGig = asyncHandler(async (req, res, next) => {
    if (!req.user || req.user.role !== 'freelancer') {
        return next(new ErrorResponse('Only freelancers can update gigs', 403));
    }

    const result = await rpcClient.call('update_gig', [req.params.id, req.user.id, req.body]);
    
    if (!result.success) {
        return next(new ErrorResponse(result.error, 400));
    }

    res.status(200).json({
        success: true,
        data: result.gig
    });
});

// @desc    Delete gig
// @route   DELETE /api/gigs/:id
// @access  Private (Freelancer - Owner)
exports.deleteGig = asyncHandler(async (req, res, next) => {
    if (!req.user || req.user.role !== 'freelancer') {
        return next(new ErrorResponse('Only freelancers can delete gigs', 403));
    }

    const result = await rpcClient.call('delete_gig', [req.params.id, req.user.id]);
    
    if (!result.success) {
        return next(new ErrorResponse(result.error, 400));
    }

    res.status(200).json({
        success: true,
        data: {}
    });
});


exports.getMyGigs = asyncHandler(async (req, res, next) => {
    console.log('🔍 getMyGigs called');
    console.log('👤 req.user:', req.user);
    console.log('📋 req.user.id:', req.user?.id);
    console.log('🎭 req.user.role:', req.user?.role);
    
    if (!req.user || (req.user.role !== 'freelancer' && req.user.role !== 'Freelancer')) {
        console.log('❌ User not authorized as freelancer');
        return next(new ErrorResponse('Only freelancers can view their gigs', 403));
    }

    const { 
        page = 1, 
        limit = 20,
        status,
        category_id
    } = req.query;

    console.log('📊 Query params:', req.query);

    const filters = {
        page: parseInt(page),
        limit: parseInt(limit),
        status,
        category_id
    };

    // Remove undefined filters
    Object.keys(filters).forEach(key => {
        if (filters[key] === undefined || filters[key] === '') {
            delete filters[key];
        }
    });

    console.log('📤 Calling RPC with:', {
        freelancerId: req.user.id,
        filters: filters
    });

    const result = await rpcClient.call('get_my_gigs', [req.user.id, filters]);
    
    console.log('📥 RPC response:', result);
    
    if (!result.success) {
        return next(new ErrorResponse(result.error, 400));
    }

    res.status(200).json({
        success: true,
        count: result.gigs ? result.gigs.length : 0,
        pagination: result.pagination,
        data: result.gigs
    });
});
// @desc    Toggle gig status
// @route   PATCH /api/gigs/:id/status
// @access  Private (Freelancer - Owner)
exports.toggleGigStatus = asyncHandler(async (req, res, next) => {
    if (!req.user || req.user.role !== 'freelancer') {
        return next(new ErrorResponse('Only freelancers can update gig status', 403));
    }

    const { status } = req.body;
    
    if (!status) {
        return next(new ErrorResponse('Please provide status', 400));
    }

    const result = await rpcClient.call('toggle_gig_status', [req.params.id, req.user.id, status]);
    
    if (!result.success) {
        return next(new ErrorResponse(result.error, 400));
    }

    res.status(200).json({
        success: true,
        data: result.gig
    });
});

// @desc    Update gig images
// @route   PUT /api/gigs/:id/images
// @access  Private (Freelancer - Owner)
exports.updateGigImages = asyncHandler(async (req, res, next) => {
    if (!req.user || req.user.role !== 'freelancer') {
        return next(new ErrorResponse('Only freelancers can update gig images', 403));
    }

    const { images } = req.body;
    
    if (!images || !Array.isArray(images)) {
        return next(new ErrorResponse('Please provide an array of images', 400));
    }

    const result = await rpcClient.call('update_gig_images', [req.params.id, req.user.id, images]);
    
    if (!result.success) {
        return next(new ErrorResponse(result.error, 400));
    }

    res.status(200).json({
        success: true,
        data: result.gig
    });
});

// @desc    Get gig analytics
// @route   GET /api/gigs/:id/analytics
// @access  Private (Freelancer - Owner)
exports.getGigAnalytics = asyncHandler(async (req, res, next) => {
    if (!req.user || req.user.role !== 'freelancer') {
        return next(new ErrorResponse('Only freelancers can view gig analytics', 403));
    }

    const result = await rpcClient.call('get_gig_analytics', [req.params.id, req.user.id]);
    
    if (!result.success) {
        return next(new ErrorResponse(result.error, 400));
    }

    res.status(200).json({
        success: true,
        data: result.analytics
    });
});

// ==================== ADMIN ROUTES ====================

// @desc    Get all gigs (Admin)
// @route   GET /api/gigs/admin/all
// @access  Private (Admin)
exports.getAllGigsAdmin = asyncHandler(async (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return next(new ErrorResponse('Not authorized', 403));
    }

    const { 
        page = 1, 
        limit = 50, 
        sort_by = 'created_at', 
        sort_order = 'desc',
        status,
        freelancer_id,
        category_id,
        is_featured,
        search
    } = req.query;

    const filters = {
        status,
        freelancer_id,
        category_id,
        is_featured,
        search
    };

    const pagination = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort_by,
        sort_order
    };

    // Remove undefined filters
    Object.keys(filters).forEach(key => {
        if (filters[key] === undefined || filters[key] === '') {
            delete filters[key];
        }
    });

    const result = await rpcClient.call('get_all_gigs_admin', [filters, pagination]);
    
    if (!result.success) {
        return next(new ErrorResponse(result.error, 400));
    }

    res.status(200).json({
        success: true,
        count: result.gigs ? result.gigs.length : 0,
        pagination: result.pagination,
        data: result.gigs
    });
});

// @desc    Update gig status (Admin)
// @route   PATCH /api/gigs/admin/:id/status
// @access  Private (Admin)
exports.updateGigStatusAdmin = asyncHandler(async (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return next(new ErrorResponse('Not authorized', 403));
    }

    const { status } = req.body;
    
    if (!status) {
        return next(new ErrorResponse('Please provide status', 400));
    }

    const result = await rpcClient.call('update_gig_status_admin', [req.params.id, status]);
    
    if (!result.success) {
        return next(new ErrorResponse(result.error, 400));
    }

    res.status(200).json({
        success: true,
        data: result.gig
    });
});

// @desc    Feature/Unfeature gig (Admin)
// @route   PATCH /api/gigs/admin/:id/feature
// @access  Private (Admin)
exports.featureGig = asyncHandler(async (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return next(new ErrorResponse('Not authorized', 403));
    }

    const { featured } = req.body;
    
    if (featured === undefined) {
        return next(new ErrorResponse('Please provide featured status', 400));
    }

    const result = await rpcClient.call('feature_gig', [req.params.id, featured]);
    
    if (!result.success) {
        return next(new ErrorResponse(result.error, 400));
    }

    res.status(200).json({
        success: true,
        data: result.message
    });
});