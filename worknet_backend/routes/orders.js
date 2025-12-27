// routes/orders.js - VERSION SIMPLIFIÉE ET SÛRE
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const ordersController = require('../controllers/ordersController');

// ==================== PUBLIC ROUTES ====================
router.get('/test-rpc', ordersController.testRpcConnection);

// ==================== AUTHENTICATED ROUTES ====================
router.use(protect);

// ==================== STATS ROUTE ====================
router.get('/stats', ordersController.getOrderStats);

// ==================== CLIENT ROUTES ====================
router.post('/', authorize('client'), ordersController.createOrder);
router.get('/my-orders', authorize('client'), ordersController.getMyOrders);
router.get('/:id', ordersController.getOrderById);
router.put('/:id/cancel', authorize('client'), ordersController.cancelOrder);
router.put('/:id/request-revision', authorize('client'), ordersController.requestRevision);
router.put('/:id/accept-delivery', authorize('client'), ordersController.acceptDelivery);
router.put('/:id/escalate-dispute', authorize('client'), ordersController.escalateToDispute);

// ==================== FREELANCER ROUTES ====================
router.get('/freelancer/my-orders', authorize('freelancer'), ordersController.getFreelancerOrders);
router.put('/:id/accept', authorize('freelancer'), ordersController.acceptOrder);
router.put('/:id/decline', authorize('freelancer'), ordersController.declineOrder);
router.put('/:id/start-work', authorize('freelancer'), ordersController.startOrderWork);
router.put('/:id/deliver', authorize('freelancer'), ordersController.deliverOrder);
router.put('/:id/progress', authorize('freelancer'), ordersController.updateOrderProgress);

// ==================== SHARED ROUTES ====================
router.get('/:id/timeline', ordersController.getOrderTimeline);
router.put('/:id/extend-deadline', ordersController.extendDeadline);

// ==================== ADMIN ROUTES ====================
router.get('/', authorize('admin'), ordersController.getAllOrders);
router.put('/:id/admin', authorize('admin'), ordersController.updateOrderAdmin);
router.put('/:id/resolve-dispute', authorize('admin'), ordersController.resolveDispute);

module.exports = router;