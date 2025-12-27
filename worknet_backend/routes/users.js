const express = require('express');
const router = express.Router();
const { protect , authorize, optionalAuth } = require('../middleware/auth');
const { uploadAvatar, handleUploadError } = require('../middleware/upload');
const {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    refreshToken,
    getFreelancerProfile,
    searchFreelancers,
    updateFreelancerSkills,
    updateClientCompany,
    getUsers,
    getUserById,
    updateUserStatus,
    deleteUser,
    uploadAvatar: uploadAvatarController,
    testRpcConnection
} = require('../controllers/usersController');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);
router.post('/refresh-token', refreshToken);
router.get('/freelancers/:username', getFreelancerProfile);
router.get('/freelancers', searchFreelancers);
router.get('/test-rpc', testRpcConnection);

// Protected routes
router.post('/logout', logoutUser);
router.get('/me', protect, getCurrentUser);
router.put('/me', protect, updateProfile);
router.put('/change-password', protect, changePassword);

// Freelancer specific routes
router.put('/me/skills', protect, authorize('freelancer'), updateFreelancerSkills);

// Client specific routes
router.put('/me/company', protect, authorize('client'), updateClientCompany);

// Upload routes
router.post('/me/avatar',
    protect,
    uploadAvatar,
    handleUploadError,
    uploadAvatarController
);

// Admin routes
router.get('/', protect, authorize('admin'), getUsers);
router.get('/:id', protect, authorize('admin'), getUserById);
router.put('/:id/status', protect, authorize('admin'), updateUserStatus);
router.delete('/:id', protect, authorize('admin'), deleteUser);

module.exports = router;