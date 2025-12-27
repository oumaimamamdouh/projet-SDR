// middleware/auth.js - VERSION CORRIGÉE
const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');
const rpcClient = require('../utils/rpcClient');

// @desc   Protect routes - verify JWT token
exports.protect = asyncHandler(async (req, res, next) => {
    let token;

    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // Make sure token exists
    if (!token) {
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }

    try {
        // Verify token using RPC server
        const result = await rpcClient.validateToken(token);
        
        console.log('🔐 [AUTH] RPC validateToken result:', {
            success: result.success,
            payload_keys: result.payload ? Object.keys(result.payload) : 'no payload'
        });
        
        if (!result.success) {
            return next(new ErrorResponse('Invalid token', 401));
        }

        // CORRECTION MAJEURE: Le RPC retourne 'id' pas 'user_id'
        const payload = result.payload || {};
        
        // Débogage de la structure du payload
        console.log('📦 [AUTH] Payload structure:', {
            has_id: !!payload.id,
            has_user_id: !!payload.user_id,
            id: payload.id,
            user_id: payload.user_id,
            role: payload.role,
            role_type: typeof payload.role
        });

        // CORRECTION: Utiliser payload.id au lieu de payload.user_id
        // Et s'assurer que role est une string
        req.user = {
            id: payload.id || payload.user_id,  // Prendre 'id' d'abord, sinon 'user_id'
            email: payload.email || '',
            role: String(payload.role || ''),   // S'assurer que role est une string
            username: payload.username || ''
        };

        console.log('✅ [AUTH] Authenticated user:', req.user);
        next();
    } catch (error) {
        console.error('❌ [AUTH] Error in protect middleware:', error);
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }
});

// @desc   Authorize by role - VERSION CORRIGÉE avec sécurité
exports.authorize = (...roles) => {
    return (req, res, next) => {
        console.log('🔐 [AUTHORIZE] Checking authorization for roles:', roles);
        console.log('   Current user:', req.user);
        
        if (!req.user) {
            console.log('❌ [AUTHORIZE] No user in request');
            return next(new ErrorResponse('User not authenticated', 401));
        }

        // S'assurer que req.user.role existe et est une string
        const userRole = req.user.role;
        console.log('   User role:', userRole, 'Type:', typeof userRole);
        
        if (!userRole) {
            console.log('❌ [AUTHORIZE] User has no role defined');
            return next(new ErrorResponse('User role not defined', 403));
        }

        // Normalize user role - s'assurer que c'est une string
        const normalizedUserRole = String(userRole).toLowerCase().trim();
        console.log('   Normalized user role:', normalizedUserRole);

        // Normalize required roles
        const normalizedRoles = roles.map(role => {
            const normalized = String(role).toLowerCase().trim();
            console.log(`   Required role: "${role}" -> "${normalized}"`);
            return normalized;
        });

        console.log('   Checking if', normalizedUserRole, 'is in', normalizedRoles);

        if (!normalizedRoles.includes(normalizedUserRole)) {
            console.log('❌ [AUTHORIZE] Role not authorized');
            return next(
                new ErrorResponse(
                    `User role "${req.user.role}" is not authorized to access this route. Required: ${roles.join(', ')}`,
                    403
                )
            );
        }
        
        console.log('✅ [AUTHORIZE] Role authorized');
        next();
    };
};

// @desc   Optional auth - set user if token exists - VERSION CORRIGÉE
exports.optionalAuth = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];

        try {
            const result = await rpcClient.validateToken(token);
            
            if (result.success && result.payload) {
                req.user = {
                    id: result.payload.id || result.payload.user_id,
                    email: result.payload.email || '',
                    role: String(result.payload.role || ''),
                    username: result.payload.username || ''
                };
                console.log('✅ [OPTIONAL AUTH] User set from token:', req.user);
            }
        } catch (error) {
            console.log('ℹ️ [OPTIONAL AUTH] Token invalid, continuing without user...');
        }
    }

    next();
});

// @desc   Client only middleware
exports.clientOnly = exports.authorize('client');

// @desc   Freelancer only middleware
exports.freelancerOnly = exports.authorize('freelancer');

// @desc   Admin only middleware
exports.adminOnly = exports.authorize('admin');

// @desc   Client or Admin middleware
exports.clientOrAdmin = exports.authorize('client', 'admin');

// @desc   Freelancer or Admin middleware
exports.freelancerOrAdmin = exports.authorize('freelancer', 'admin');