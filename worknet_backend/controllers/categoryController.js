const rpcClient = require('../utils/rpcClient');

class CategoryController {
    
    // ==================== MÉTHODES PUBLIQUES ====================
    
    async healthCheck(req, res) {
        try {
            console.log('📦 [CategoryController] healthCheck');
            
            const result = await rpcClient.testConnection();
            
            res.status(200).json({
                success: true,
                service: 'Category Service',
                connected: result.connected,
                methods: result.methods ? result.methods.length : 0,
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            console.error('❌ [CategoryController] healthCheck error:', error);
            res.status(500).json({
                success: false,
                service: 'Category Service',
                connected: false,
                error: error.message,
                timestamp: new Date().toISOString()
            });
        }
    }

    async getAllCategories(req, res) {
        try {
            console.log('📦 [CategoryController] getAllCategories');
            
            // CORRECTION: Pas de paramètre à envoyer
            const result = await rpcClient.getAllCategories().catch(error => {
                console.error('❌ RPC call failed:', error);
                return {
                    success: false,
                    error: 'Failed to fetch categories from RPC service',
                    details: error.message
                };
            });
            
            console.log('📥 RPC getAllCategories result:', {
                success: result?.success,
                categoriesCount: result?.categories?.length || 0,
                error: result?.error
            });
            
            if (result.success) {
                res.status(200).json({
                    success: true,
                    data: result.categories || [],
                    total: result.categories ? result.categories.length : 0,
                    message: result.categories?.length === 0 ? 'No categories found' : undefined
                });
            } else {
                // Si erreur RPC, on retourne un tableau vide plutôt qu'une erreur 400
                res.status(200).json({
                    success: true,
                    data: [],
                    total: 0,
                    warning: 'Categories service temporarily unavailable'
                });
            }
        } catch (error) {
            console.error('❌ [CategoryController] getAllCategories error:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error',
                details: error.message
            });
        }
    }

    async searchCategories(req, res) {
        try {
            const { query } = req.query;
            console.log(`📦 [CategoryController] searchCategories: ${query}`);
            
            if (!query || query.trim() === '') {
                return res.status(400).json({
                    success: false,
                    error: 'Search query is required'
                });
            }
            
            // CORRECTION: On récupère toutes les catégories et on filtre côté Node.js
            const result = await rpcClient.getAllCategories().catch(error => {
                console.error('❌ RPC getAllCategories failed in search:', error);
                return {
                    success: false,
                    error: 'Failed to fetch categories for search',
                    details: error.message
                };
            });
            
            if (result.success && result.categories) {
                const searchTerm = query.toLowerCase().trim();
                const filtered = result.categories.filter(category => {
                    const nameMatch = category.name && 
                        category.name.toLowerCase().includes(searchTerm);
                    const descMatch = category.description && 
                        category.description.toLowerCase().includes(searchTerm);
                    const slugMatch = category.slug && 
                        category.slug.toLowerCase().includes(searchTerm);
                    
                    return nameMatch || descMatch || slugMatch;
                });
                
                res.status(200).json({
                    success: true,
                    data: filtered,
                    total: filtered.length,
                    originalTotal: result.categories.length,
                    message: filtered.length === 0 ? 'No categories found for your search' : undefined
                });
            } else {
                res.status(200).json({
                    success: true,
                    data: [],
                    total: 0,
                    message: 'Search service temporarily unavailable'
                });
            }
        } catch (error) {
            console.error('❌ [CategoryController] searchCategories error:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error',
                details: error.message
            });
        }
    }

    async getCategoryById(req, res) {
        try {
            const { id } = req.params;
            console.log(`📦 [CategoryController] getCategoryById: ${id}`);
            
            // VALIDATION: Vérifier le format de l'ID
            const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(id);
            if (!isValidObjectId) {
                console.log(`⚠️ ID format invalid: ${id}`);
                return res.status(400).json({
                    success: false,
                    error: 'Invalid category ID format. Expected 24-character hex string.',
                    suggestion: 'Check the category ID and try again'
                });
            }
            
            const result = await rpcClient.getCategoryById(id).catch(error => {
                console.error('❌ RPC getCategoryById failed:', error);
                return {
                    success: false,
                    error: 'Failed to fetch category from RPC service',
                    details: error.message
                };
            });
            
            console.log('📥 RPC getCategoryById result:', {
                success: result?.success,
                hasCategory: !!result?.category,
                categoryName: result?.category?.name,
                error: result?.error
            });
            
            if (result.success && result.category) {
                res.status(200).json({
                    success: true,
                    data: result.category
                });
            } else {
                res.status(404).json({
                    success: false,
                    error: result.error || 'Category not found',
                    suggestion: 'The category may have been deleted or the ID is incorrect'
                });
            }
        } catch (error) {
            console.error('❌ [CategoryController] getCategoryById error:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error',
                details: error.message
            });
        }
    }

    async getCategoryBySlug(req, res) {
        try {
            const { slug } = req.params;
            console.log(`📦 [CategoryController] getCategoryBySlug: ${slug}`);
            
            if (!slug || slug.trim() === '') {
                return res.status(400).json({
                    success: false,
                    error: 'Category slug is required'
                });
            }
            
            const result = await rpcClient.getCategoryBySlug(slug).catch(error => {
                console.error('❌ RPC getCategoryBySlug failed:', error);
                return {
                    success: false,
                    error: 'Failed to fetch category by slug',
                    details: error.message
                };
            });
            
            console.log('📥 RPC getCategoryBySlug result:', {
                success: result?.success,
                hasCategory: !!result?.category,
                categoryName: result?.category?.name,
                error: result?.error
            });
            
            if (result.success && result.category) {
                res.status(200).json({
                    success: true,
                    data: result.category
                });
            } else {
                res.status(404).json({
                    success: false,
                    error: result.error || 'Category not found',
                    suggestion: 'Check the slug or try searching for the category'
                });
            }
        } catch (error) {
            console.error('❌ [CategoryController] getCategoryBySlug error:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error',
                details: error.message
            });
        }
    }

    async getSubcategories(req, res) {
        try {
            const { parentId } = req.params;
            console.log(`📦 [CategoryController] getSubcategories for parent: ${parentId}`);
            
            // VALIDATION: Vérifier que parentId est fourni
            if (!parentId || parentId === 'undefined' || parentId === 'null') {
                return res.status(400).json({
                    success: false,
                    error: 'Parent category ID is required'
                });
            }
            
            // VÉRIFICATION: Format de l'ID
            const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(parentId);
            if (!isValidObjectId) {
                console.log(`⚠️ Parent ID format may be invalid: ${parentId}`);
                // On essaie quand même, car le service Python peut gérer d'autres formats
            }
            
            // CORRECTION: Un seul paramètre à envoyer
            const result = await rpcClient.getSubcategories(parentId).catch(error => {
                console.error('❌ RPC getSubcategories failed:', error);
                return {
                    success: false,
                    error: 'Failed to fetch subcategories from RPC service',
                    details: error.message
                };
            });
            
            console.log('📥 RPC getSubcategories result:', {
                success: result?.success,
                subcategoriesCount: result?.subcategories?.length || 0,
                error: result?.error
            });
            
            if (result.success) {
                res.status(200).json({
                    success: true,
                    data: result.subcategories || [],
                    total: result.subcategories ? result.subcategories.length : 0,
                    message: result.subcategories?.length === 0 ? 'No subcategories found' : undefined
                });
            } else {
                // Si "not found", on retourne un tableau vide
                if (result.error && result.error.toLowerCase().includes('not found')) {
                    res.status(200).json({
                        success: true,
                        data: [],
                        total: 0,
                        message: 'No subcategories found for this category'
                    });
                } else {
                    res.status(400).json({
                        success: false,
                        error: result.error || 'Failed to fetch subcategories'
                    });
                }
            }
        } catch (error) {
            console.error('❌ [CategoryController] getSubcategories error:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error',
                details: error.message
            });
        }
    }

    async getCategoryTree(req, res) {
        try {
            console.log('📦 [CategoryController] getCategoryTree');
            
            const result = await rpcClient.getAllCategories().catch(error => {
                console.error('❌ RPC getAllCategories failed in getCategoryTree:', error);
                return {
                    success: false,
                    error: 'Failed to fetch categories for tree',
                    details: error.message
                };
            });
            
            if (result.success && result.categories) {
                // Construire l'arbre de catégories
                const categories = result.categories;
                const categoryMap = {};
                const roots = [];
                
                // Première passe: créer le map
                categories.forEach(category => {
                    category.children = [];
                    categoryMap[category._id] = category;
                });
                
                // Deuxième passe: construire l'arbre
                categories.forEach(category => {
                    if (category.parent_category_id && categoryMap[category.parent_category_id]) {
                        categoryMap[category.parent_category_id].children.push(category);
                    } else {
                        roots.push(category);
                    }
                });
                
                // Trier les enfants par sort_order
                roots.forEach(root => {
                    if (root.children && root.children.length > 0) {
                        root.children.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
                    }
                });
                
                // Trier les racines par sort_order
                roots.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
                
                res.status(200).json({
                    success: true,
                    data: roots,
                    total: roots.length,
                    totalCategories: categories.length
                });
            } else {
                res.status(200).json({
                    success: true,
                    data: [],
                    total: 0,
                    message: 'Category tree service temporarily unavailable'
                });
            }
        } catch (error) {
            console.error('❌ [CategoryController] getCategoryTree error:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error',
                details: error.message
            });
        }
    }

    async getCategoryHierarchy(req, res) {
        try {
            console.log('📦 [CategoryController] getCategoryHierarchy');
            
            const { maxDepth = 3 } = req.query;
            
            const result = await rpcClient.getAllCategories().catch(error => {
                console.error('❌ RPC getAllCategories failed in getCategoryHierarchy:', error);
                return {
                    success: false,
                    error: 'Failed to fetch categories for hierarchy',
                    details: error.message
                };
            });
            
            if (result.success && result.categories) {
                // Fonction récursive pour construire la hiérarchie
                const buildHierarchy = (parentId = null, depth = 0) => {
                    if (depth > maxDepth) return [];
                    
                    const children = result.categories.filter(cat => 
                        cat.parent_category_id === parentId || 
                        (!cat.parent_category_id && !parentId)
                    );
                    
                    return children.map(child => ({
                        ...child,
                        children: buildHierarchy(child._id, depth + 1),
                        hasChildren: result.categories.some(cat => cat.parent_category_id === child._id)
                    })).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
                };
                
                const hierarchy = buildHierarchy();
                
                res.status(200).json({
                    success: true,
                    data: hierarchy,
                    maxDepth: parseInt(maxDepth),
                    totalCategories: result.categories.length
                });
            } else {
                res.status(200).json({
                    success: true,
                    data: [],
                    message: 'Hierarchy service temporarily unavailable'
                });
            }
        } catch (error) {
            console.error('❌ [CategoryController] getCategoryHierarchy error:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error',
                details: error.message
            });
        }
    }

    // ==================== MÉTHODES ADMIN ====================

    async createCategory(req, res) {
        try {
            console.log('📦 [CategoryController] createCategory');
            
            const { 
                name, 
                description = '', 
                icon_url = '', 
                is_active = true,
                sort_order = 0,
                parent_category_id = null 
            } = req.body;
            
            // Validation
            if (!name || name.trim() === '') {
                return res.status(400).json({
                    success: false,
                    error: 'Category name is required'
                });
            }
            
            // Préparer les données pour le service Python
            const categoryData = {
                name: name.trim(),
                description: description.trim(),
                icon_url: icon_url.trim(),
                is_active: Boolean(is_active),
                sort_order: parseInt(sort_order) || 0,
                parent_category_id: parent_category_id || null
            };
            
            console.log('📤 Sending to Python service:', categoryData);
            
            const result = await rpcClient.createCategory(categoryData).catch(error => {
                console.error('❌ RPC createCategory failed:', error);
                return {
                    success: false,
                    error: 'Failed to create category in RPC service',
                    details: error.message
                };
            });
            
            console.log('📥 RPC createCategory result:', {
                success: result?.success,
                hasCategory: !!result?.category,
                error: result?.error
            });
            
            if (result.success) {
                res.status(201).json({
                    success: true,
                    data: result.category,
                    message: result.message || 'Category created successfully'
                });
            } else {
                // Vérifier si c'est une erreur de duplication
                if (result.error && (
                    result.error.includes('already exists') || 
                    result.error.includes('duplicate')
                )) {
                    res.status(409).json({
                        success: false,
                        error: result.error || 'Category with this name already exists'
                    });
                } else {
                    res.status(400).json({
                        success: false,
                        error: result.error || 'Failed to create category'
                    });
                }
            }
        } catch (error) {
            console.error('❌ [CategoryController] createCategory error:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error',
                details: error.message
            });
        }
    }

    async updateCategory(req, res) {
        try {
            const { id } = req.params;
            console.log(`📦 [CategoryController] updateCategory: ${id}`);
            
            // Validation de l'ID
            const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(id);
            if (!isValidObjectId) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid category ID format'
                });
            }
            
            const updateData = req.body;
            
            // Validation des données
            if (Object.keys(updateData).length === 0) {
                return res.status(400).json({
                    success: false,
                    error: 'No update data provided'
                });
            }
            
            // Nettoyer les données
            const cleanedData = {};
            
            if (updateData.name !== undefined) cleanedData.name = updateData.name.trim();
            if (updateData.description !== undefined) cleanedData.description = updateData.description.trim();
            if (updateData.icon_url !== undefined) cleanedData.icon_url = updateData.icon_url.trim();
            if (updateData.is_active !== undefined) cleanedData.is_active = Boolean(updateData.is_active);
            if (updateData.sort_order !== undefined) cleanedData.sort_order = parseInt(updateData.sort_order) || 0;
            if (updateData.parent_category_id !== undefined) {
                cleanedData.parent_category_id = updateData.parent_category_id || null;
            }
            
            console.log('📤 Updating category with data:', cleanedData);
            
            const result = await rpcClient.updateCategory(id, cleanedData).catch(error => {
                console.error('❌ RPC updateCategory failed:', error);
                return {
                    success: false,
                    error: 'Failed to update category in RPC service',
                    details: error.message
                };
            });
            
            console.log('📥 RPC updateCategory result:', {
                success: result?.success,
                hasCategory: !!result?.category,
                error: result?.error
            });
            
            if (result.success) {
                res.status(200).json({
                    success: true,
                    data: result.category,
                    message: result.message || 'Category updated successfully'
                });
            } else {
                res.status(400).json({
                    success: false,
                    error: result.error || 'Failed to update category'
                });
            }
        } catch (error) {
            console.error('❌ [CategoryController] updateCategory error:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error',
                details: error.message
            });
        }
    }

    async deleteCategory(req, res) {
        try {
            const { id } = req.params;
            console.log(`📦 [CategoryController] deleteCategory: ${id}`);
            
            // Validation de l'ID
            const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(id);
            if (!isValidObjectId) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid category ID format'
                });
            }
            
            const result = await rpcClient.deleteCategory(id).catch(error => {
                console.error('❌ RPC deleteCategory failed:', error);
                return {
                    success: false,
                    error: 'Failed to delete category in RPC service',
                    details: error.message
                };
            });
            
            console.log('📥 RPC deleteCategory result:', {
                success: result?.success,
                message: result?.message,
                error: result?.error
            });
            
            if (result.success) {
                res.status(200).json({
                    success: true,
                    message: result.message || 'Category deleted successfully'
                });
            } else {
                // Vérifier si c'est une erreur de sous-catégories
                if (result.error && result.error.includes('subcategories')) {
                    res.status(409).json({
                        success: false,
                        error: result.error,
                        suggestion: 'Delete or move all subcategories before deleting this category'
                    });
                } else {
                    res.status(400).json({
                        success: false,
                        error: result.error || 'Failed to delete category'
                    });
                }
            }
        } catch (error) {
            console.error('❌ [CategoryController] deleteCategory error:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error',
                details: error.message
            });
        }
    }

    async toggleCategoryStatus(req, res) {
        try {
            const { id } = req.params;
            console.log(`📦 [CategoryController] toggleCategoryStatus: ${id}`);
            
            // Validation de l'ID
            const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(id);
            if (!isValidObjectId) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid category ID format'
                });
            }
            
            const result = await rpcClient.toggleCategoryStatus(id).catch(error => {
                console.error('❌ RPC toggleCategoryStatus failed:', error);
                return {
                    success: false,
                    error: 'Failed to toggle category status in RPC service',
                    details: error.message
                };
            });
            
            console.log('📥 RPC toggleCategoryStatus result:', {
                success: result?.success,
                is_active: result?.is_active,
                error: result?.error
            });
            
            if (result.success) {
                res.status(200).json({
                    success: true,
                    is_active: result.is_active,
                    message: result.message || `Category is now ${result.is_active ? 'active' : 'inactive'}`
                });
            } else {
                res.status(400).json({
                    success: false,
                    error: result.error || 'Failed to toggle category status'
                });
            }
        } catch (error) {
            console.error('❌ [CategoryController] toggleCategoryStatus error:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error',
                details: error.message
            });
        }
    }

    async updateCategoryOrder(req, res) {
        try {
            console.log('📦 [CategoryController] updateCategoryOrder');
            
            const { orderedCategories } = req.body;
            
            // Validation
            if (!Array.isArray(orderedCategories)) {
                return res.status(400).json({
                    success: false,
                    error: 'orderedCategories must be an array'
                });
            }
            
            if (orderedCategories.length === 0) {
                return res.status(400).json({
                    success: false,
                    error: 'orderedCategories array cannot be empty'
                });
            }
            
            // Formater les données pour le service Python
            const formattedCategories = orderedCategories.map((item, index) => {
                // Extraire l'ID de différents champs possibles
                const id = item.id || item._id || item.category_id;
                
                // Valider l'ID
                if (!id || !/^[0-9a-fA-F]{24}$/.test(id.toString())) {
                    throw new Error(`Invalid category ID at position ${index}: ${id}`);
                }
                
                return {
                    id: id.toString(),
                    order: item.order || item.sort_order || index
                };
            });
            
            console.log('📤 Updating category order:', formattedCategories.length, 'categories');
            
            const result = await rpcClient.updateCategoryOrder(formattedCategories).catch(error => {
                console.error('❌ RPC updateCategoryOrder failed:', error);
                return {
                    success: false,
                    error: 'Failed to update category order in RPC service',
                    details: error.message
                };
            });
            
            console.log('📥 RPC updateCategoryOrder result:', {
                success: result?.success,
                message: result?.message,
                error: result?.error
            });
            
            if (result.success) {
                res.status(200).json({
                    success: true,
                    message: result.message || 'Category order updated successfully',
                    updatedCount: formattedCategories.length
                });
            } else {
                res.status(400).json({
                    success: false,
                    error: result.error || 'Failed to update category order'
                });
            }
        } catch (error) {
            console.error('❌ [CategoryController] updateCategoryOrder error:', error);
            
            if (error.message.includes('Invalid category ID')) {
                res.status(400).json({
                    success: false,
                    error: error.message
                });
            } else {
                res.status(500).json({
                    success: false,
                    error: 'Internal server error',
                    details: error.message
                });
            }
        }
    }

    async bulkUpdateCategories(req, res) {
        try {
            console.log('📦 [CategoryController] bulkUpdateCategories');
            
            const { updates } = req.body;
            
            if (!Array.isArray(updates) || updates.length === 0) {
                return res.status(400).json({
                    success: false,
                    error: 'Updates must be a non-empty array'
                });
            }
            
            const results = [];
            const errors = [];
            
            // Traiter chaque mise à jour séquentiellement
            for (const update of updates) {
                try {
                    const { id, ...updateData } = update;
                    
                    if (!id) {
                        errors.push({ id: 'missing', error: 'Missing category ID' });
                        continue;
                    }
                    
                    const result = await rpcClient.updateCategory(id, updateData);
                    results.push({ id, success: result.success, data: result.category });
                    
                    if (!result.success) {
                        errors.push({ id, error: result.error });
                    }
                    
                } catch (error) {
                    errors.push({ id: update.id || 'unknown', error: error.message });
                }
            }
            
            res.status(200).json({
                success: errors.length === 0,
                results,
                errors: errors.length > 0 ? errors : undefined,
                total: updates.length,
                succeeded: results.filter(r => r.success).length,
                failed: errors.length
            });
            
        } catch (error) {
            console.error('❌ [CategoryController] bulkUpdateCategories error:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error',
                details: error.message
            });
        }
    }

    // ==================== MÉTHODES UTILITAIRES ====================
    
    async getCategoriesStats(req, res) {
        try {
            console.log('📦 [CategoryController] getCategoriesStats');
            
            const result = await rpcClient.getAllCategories().catch(error => {
                console.error('❌ RPC getAllCategories failed in getCategoriesStats:', error);
                return {
                    success: false,
                    error: 'Failed to fetch categories for statistics',
                    details: error.message
                };
            });
            
            if (result.success && result.categories) {
                const categories = result.categories;
                
                const stats = {
                    total: categories.length,
                    active: categories.filter(c => c.is_active === true).length,
                    inactive: categories.filter(c => c.is_active === false).length,
                    withParent: categories.filter(c => c.parent_category_id).length,
                    rootCategories: categories.filter(c => !c.parent_category_id).length,
                    hasIcon: categories.filter(c => c.icon_url && c.icon_url.trim() !== '').length,
                    hasDescription: categories.filter(c => c.description && c.description.trim() !== '').length,
                    // Par niveau de profondeur
                    byDepth: {}
                };
                
                // Calculer la profondeur pour chaque catégorie
                const calculateDepth = (categoryId, visited = new Set()) => {
                    if (visited.has(categoryId)) return 0; // Éviter les cycles
                    visited.add(categoryId);
                    
                    const category = categories.find(c => c._id === categoryId);
                    if (!category || !category.parent_category_id) return 0;
                    
                    return 1 + calculateDepth(category.parent_category_id, visited);
                };
                
                categories.forEach(category => {
                    const depth = calculateDepth(category._id);
                    stats.byDepth[depth] = (stats.byDepth[depth] || 0) + 1;
                });
                
                res.status(200).json({
                    success: true,
                    data: stats,
                    timestamp: new Date().toISOString()
                });
            } else {
                res.status(200).json({
                    success: true,
                    data: {
                        total: 0,
                        active: 0,
                        inactive: 0,
                        message: 'Statistics service temporarily unavailable'
                    }
                });
            }
        } catch (error) {
            console.error('❌ [CategoryController] getCategoriesStats error:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error',
                details: error.message
            });
        }
    }

    async validateCategorySlug(req, res) {
        try {
            const { slug } = req.params;
            const { excludeId } = req.query;
            
            console.log(`📦 [CategoryController] validateCategorySlug: ${slug}, exclude: ${excludeId}`);
            
            if (!slug || slug.trim() === '') {
                return res.status(400).json({
                    success: false,
                    error: 'Slug is required',
                    valid: false
                });
            }
            
            // Valider le format du slug
            const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
            if (!slugRegex.test(slug)) {
                return res.status(200).json({
                    success: true,
                    valid: false,
                    error: 'Slug must contain only lowercase letters, numbers, and hyphens',
                    suggestion: slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
                });
            }
            
            const result = await rpcClient.getAllCategories().catch(error => {
                console.error('❌ RPC getAllCategories failed in validateCategorySlug:', error);
                return {
                    success: false,
                    error: 'Failed to validate slug',
                    details: error.message
                };
            });
            
            if (result.success && result.categories) {
                const existingCategory = result.categories.find(cat => 
                    cat.slug === slug && 
                    (!excludeId || cat._id !== excludeId)
                );
                
                const valid = !existingCategory;
                
                res.status(200).json({
                    success: true,
                    valid,
                    exists: !!existingCategory,
                    existingCategory: existingCategory ? {
                        id: existingCategory._id,
                        name: existingCategory.name
                    } : null,
                    suggestion: !valid ? `${slug}-${Date.now().toString(36)}` : null
                });
            } else {
                res.status(200).json({
                    success: true,
                    valid: true,
                    warning: 'Unable to validate slug due to service issues'
                });
            }
        } catch (error) {
            console.error('❌ [CategoryController] validateCategorySlug error:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error',
                details: error.message
            });
        }
    }
}

module.exports = new CategoryController();