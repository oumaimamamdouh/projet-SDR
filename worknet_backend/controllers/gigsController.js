const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');
const rpcClient = require('../utils/rpcClient');
const { cleanObject } = require('../utils/cleanObject');

// ===================== PUBLIC =====================

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

    const filters = cleanObject({
        status,
        category_id,
        freelancer_id,
        min_price,
        max_price,
        is_featured,
        is_urgent,
        min_rating
    });

    const pagination = {
        page: Number(page),
        limit: Number(limit),
        sort_by,
        sort_order
    };

    const result = await rpcClient.call('get_all_gigs', [filters, pagination]);

    if (!result || !result.success) {
        return next(new ErrorResponse(result?.error || 'RPC error', 500));
    }

    res.status(200).json({
        success: true,
        count: result.gigs?.length || 0,
        pagination: result.pagination,
        data: result.gigs
    });
});

exports.getGigById = asyncHandler(async (req, res, next) => {
    const result = await rpcClient.call('get_gig_by_id', [req.params.id]);

    if (!result || !result.success) {
        return next(new ErrorResponse('Gig not found', 404));
    }

    res.status(200).json({ success: true, data: result.gig });
});

// ===================== FREELANCER =====================

exports.createGig = asyncHandler(async (req, res, next) => {
    const role = req.user?.role?.toLowerCase();
    if (role !== 'freelancer') {
        return next(new ErrorResponse('Only freelancers can create gigs', 403));
    }

    const gigData = {
        ...req.body,
        freelancer_id: req.user.id
    };

    const result = await rpcClient.call('create_gig', [req.user.id, gigData]);

    if (!result || !result.success) {
        return next(new ErrorResponse(result?.error || 'Create failed', 400));
    }

    res.status(201).json({ success: true, data: result.gig });
});

exports.getMyGigs = asyncHandler(async (req, res, next) => {
    const role = req.user?.role?.toLowerCase();
    if (role !== 'freelancer') {
        return next(new ErrorResponse('Only freelancers allowed', 403));
    }

    const { page = 1, limit = 20, status, category_id } = req.query;

    const filters = cleanObject({
        page: Number(page),
        limit: Number(limit),
        status,
        category_id
    });

    const result = await rpcClient.call('get_my_gigs', [req.user.id, filters]);

    if (!result || !result.success) {
        return next(new ErrorResponse(result?.error || 'RPC error', 400));
    }

    res.status(200).json({
        success: true,
        count: result.gigs?.length || 0,
        pagination: result.pagination,
        data: result.gigs
    });
});
