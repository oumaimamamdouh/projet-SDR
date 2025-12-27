// controllers/ordersController.js - VERSION COMPLÈTE
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');
const rpcClient = require('../utils/rpcClient');

// ==================== CLIENT CONTROLLERS ====================

exports.createOrder = asyncHandler(async (req, res, next) => {
    console.log('📦 Create order request:', { user: req.user, body: req.body });
    
    const { gig_id, package, requirements, deadline, attachments } = req.body;
    const client_id = req.user.id;
    
    if (!gig_id || !package || !requirements || !deadline) {
        return next(new ErrorResponse('Missing required fields', 400));
    }
    
    try {
        const orderData = { gig_id, package, requirements, deadline, attachments: attachments || [] };
        const result = await rpcClient.create_order_client(client_id, orderData);
        
        if (!result.success) return next(new ErrorResponse(result.error, 400));
        
        res.status(201).json({
            success: true,
            data: result.order,
            message: result.message
        });
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

exports.getMyOrders = asyncHandler(async (req, res, next) => {
    const client_id = req.user.id;
    const { status, date_from, date_to, page = 1, limit = 10 } = req.query;
    
    try {
        const filters = {};
        if (status) filters.status = status;
        if (date_from) filters.date_from = date_from;
        if (date_to) filters.date_to = date_to;
        filters.page = parseInt(page);
        filters.limit = parseInt(limit);
        
        const result = await rpcClient.get_my_orders(client_id, filters);
        
        if (!result.success) return next(new ErrorResponse(result.error, 400));
        
        res.status(200).json({
            success: true,
            data: result.orders,
            pagination: result.pagination
        });
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

exports.getOrderById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const user_id = req.user.id;
    
    try {
        const result = await rpcClient.get_order_by_id(id, user_id);
        
        if (!result.success) return next(new ErrorResponse(result.error, 404));
        
        res.status(200).json({
            success: true,
            data: result.order
        });
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

exports.cancelOrder = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const client_id = req.user.id;
    const { reason } = req.body;
    
    try {
        const result = await rpcClient.cancel_order(id, client_id, reason);
        
        if (!result.success) return next(new ErrorResponse(result.error, 400));
        
        res.status(200).json({
            success: true,
            message: result.message
        });
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

exports.requestRevision = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const client_id = req.user.id;
    const { revision_notes } = req.body;
    
    if (!revision_notes) {
        return next(new ErrorResponse('Revision notes are required', 400));
    }
    
    try {
        const result = await rpcClient.request_revision(id, client_id, revision_notes);
        
        if (!result.success) return next(new ErrorResponse(result.error, 400));
        
        res.status(200).json({
            success: true,
            message: result.message
        });
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

exports.acceptDelivery = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const client_id = req.user.id;
    
    try {
        const result = await rpcClient.accept_delivery(id, client_id);
        
        if (!result.success) return next(new ErrorResponse(result.error, 400));
        
        res.status(200).json({
            success: true,
            message: result.message
        });
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

exports.escalateToDispute = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const client_id = req.user.id;
    const { reason, description, evidence } = req.body;
    
    if (!reason) {
        return next(new ErrorResponse('Dispute reason is required', 400));
    }
    
    try {
        const disputeData = { reason, description: description || '', evidence: evidence || [] };
        const result = await rpcClient.escalate_to_dispute(id, client_id, disputeData);
        
        if (!result.success) return next(new ErrorResponse(result.error, 400));
        
        res.status(200).json({
            success: true,
            message: result.message
        });
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

// ==================== FREELANCER CONTROLLERS ====================

exports.getFreelancerOrders = asyncHandler(async (req, res, next) => {
    const freelancer_id = req.user.id;
    const { status, date_from, date_to, page = 1, limit = 10 } = req.query;
    
    try {
        const filters = {};
        if (status) filters.status = status;
        if (date_from) filters.date_from = date_from;
        if (date_to) filters.date_to = date_to;
        filters.page = parseInt(page);
        filters.limit = parseInt(limit);
        
        const result = await rpcClient.get_freelancer_orders(freelancer_id, filters);
        
        if (!result.success) return next(new ErrorResponse(result.error, 400));
        
        res.status(200).json({
            success: true,
            data: result.orders,
            pagination: result.pagination
        });
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

exports.acceptOrder = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const freelancer_id = req.user.id;
    
    try {
        const result = await rpcClient.accept_order(id, freelancer_id);
        
        if (!result.success) return next(new ErrorResponse(result.error, 400));
        
        res.status(200).json({
            success: true,
            message: result.message
        });
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

exports.declineOrder = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const freelancer_id = req.user.id;
    const { reason } = req.body;
    
    try {
        const result = await rpcClient.decline_order(id, freelancer_id, reason);
        
        if (!result.success) return next(new ErrorResponse(result.error, 400));
        
        res.status(200).json({
            success: true,
            message: result.message
        });
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

exports.startOrderWork = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const freelancer_id = req.user.id;
    
    try {
        const result = await rpcClient.start_order_work(id, freelancer_id);
        
        if (!result.success) return next(new ErrorResponse(result.error, 400));
        
        res.status(200).json({
            success: true,
            message: result.message
        });
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

exports.deliverOrder = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const freelancer_id = req.user.id;
    const { message, attachments, notes } = req.body;
    
    if (!message) {
        return next(new ErrorResponse('Delivery message is required', 400));
    }
    
    try {
        const deliveryData = { message, attachments: attachments || [], notes: notes || '' };
        const result = await rpcClient.deliver_order(id, freelancer_id, deliveryData);
        
        if (!result.success) return next(new ErrorResponse(result.error, 400));
        
        res.status(200).json({
            success: true,
            message: result.message
        });
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

exports.updateOrderProgress = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const freelancer_id = req.user.id;
    const { progress, message } = req.body;
    
    if (progress === undefined || !message) {
        return next(new ErrorResponse('Progress and message are required', 400));
    }
    
    const progressValue = parseInt(progress);
    if (isNaN(progressValue) || progressValue < 0 || progressValue > 100) {
        return next(new ErrorResponse('Progress must be a number between 0 and 100', 400));
    }
    
    try {
        const progressData = { progress: progressValue, message };
        const result = await rpcClient.update_order_progress(id, freelancer_id, progressData);
        
        if (!result.success) return next(new ErrorResponse(result.error, 400));
        
        res.status(200).json({
            success: true,
            message: result.message,
            progress: result.progress
        });
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

// ==================== SHARED CONTROLLERS ====================

exports.getOrderTimeline = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    
    try {
        const result = await rpcClient.get_order_timeline(id);
        
        if (!result.success) return next(new ErrorResponse(result.error, 404));
        
        res.status(200).json({
            success: true,
            data: result.timeline,
            status: result.status,
            created_at: result.created_at
        });
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

exports.extendDeadline = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const user_id = req.user.id;
    const { new_deadline } = req.body;
    
    if (!new_deadline) {
        return next(new ErrorResponse('New deadline is required', 400));
    }
    
    try {
        const extensionData = { new_deadline };
        const result = await rpcClient.extend_deadline(id, user_id, extensionData);
        
        if (!result.success) return next(new ErrorResponse(result.error, 400));
        
        res.status(200).json({
            success: true,
            message: result.message,
            new_deadline: result.new_deadline
        });
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

// ==================== ADMIN CONTROLLERS ====================

exports.getAllOrders = asyncHandler(async (req, res, next) => {
    const { status, date_from, date_to, client_id, freelancer_id, search, page = 1, limit = 20 } = req.query;
    
    try {
        const filters = {};
        if (status) filters.status = status;
        if (date_from) filters.date_from = date_from;
        if (date_to) filters.date_to = date_to;
        if (client_id) filters.client_id = client_id;
        if (freelancer_id) filters.freelancer_id = freelancer_id;
        if (search) filters.search = search;
        
        const pagination = { page: parseInt(page), limit: parseInt(limit) };
        const result = await rpcClient.get_all_orders_admin(filters, pagination);
        
        if (!result.success) return next(new ErrorResponse(result.error, 400));
        
        res.status(200).json({
            success: true,
            data: result.orders,
            pagination: result.pagination
        });
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

exports.updateOrderAdmin = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const updateData = req.body;
    
    try {
        const result = await rpcClient.update_order_admin(id, updateData);
        
        if (!result.success) return next(new ErrorResponse(result.error, 400));
        
        res.status(200).json({
            success: true,
            message: result.message
        });
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

exports.resolveDispute = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { resolution, winner, amount_to_client, amount_to_freelancer } = req.body;
    
    if (!resolution || !winner || amount_to_client === undefined || amount_to_freelancer === undefined) {
        return next(new ErrorResponse('All resolution fields are required', 400));
    }
    
    try {
        const resolutionData = {
            resolution,
            winner,
            amount_to_client: parseFloat(amount_to_client),
            amount_to_freelancer: parseFloat(amount_to_freelancer)
        };
        
        const result = await rpcClient.resolve_dispute(id, resolutionData);
        
        if (!result.success) return next(new ErrorResponse(result.error, 400));
        
        res.status(200).json({
            success: true,
            message: result.message
        });
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

// ==================== STATISTICS ====================

exports.getOrderStats = asyncHandler(async (req, res, next) => {
    const user_id = req.user.id;
    const user_role = req.user.role;
    
    try {
        const result = await rpcClient.get_order_stats(user_id, user_role);
        
        if (!result.success) return next(new ErrorResponse(result.error, 400));
        
        res.status(200).json({
            success: true,
            data: result.stats
        });
    } catch (error) {
        return next(new ErrorResponse(error.message, 500));
    }
});

// ==================== TEST ====================

exports.testRpcConnection = asyncHandler(async (req, res, next) => {
    try {
        const result = await rpcClient.testConnection();
        
        res.status(200).json({
            success: true,
            message: 'RPC connection test successful',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});