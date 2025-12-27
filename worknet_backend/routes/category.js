const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// ==================== ROUTES PUBLIQUES ====================
router.get('/health', categoryController.healthCheck);
router.get('/', categoryController.getAllCategories);
router.get('/search', categoryController.searchCategories);
router.get('/tree', categoryController.getCategoryTree);
router.get('/:id', categoryController.getCategoryById);
router.get('/slug/:slug', categoryController.getCategoryBySlug);
router.get('/:parentId/subcategories', categoryController.getSubcategories);

// ==================== ROUTES ADMIN ====================
router.post('/', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);
router.patch('/:id/toggle-status', categoryController.toggleCategoryStatus);
router.put('/order/update', categoryController.updateCategoryOrder);

module.exports = router;