
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');
const rpcClient = require('../utils/rpcClient');


exports.registerUser = asyncHandler(async (req, res, next) => {
    const userData = req.body;

    // Validate required fields
    if (!userData.email || !userData.password || !userData.username || !userData.full_name) {
        return next(new ErrorResponse('Please provide all required fields', 400));
    }

    // Set default role if not provided
    if (!userData.role) {
        userData.role = 'freelancer';
    }

    // Add default values expected by Python
    userData.rating = 0.0;
    userData.total_reviews = 0;
    userData.completed_orders = 0;
    userData.skills = userData.skills || [];
    userData.languages = userData.languages || [];
    userData.hourly_rate = 0.0;
    userData.response_time = 24;
    userData.is_verified = false;
    userData.is_active = true;

    // Call RPC server
    const result = await rpcClient.createUser(userData);

    if (!result.success) {
        return next(new ErrorResponse(result.error, 400));
    }

    // Wrap user in data property for consistency with other responses
    res.status(201).json({
        success: true,
        data: {
            user: result.user  // Wrap the user in data.user
        }
    });
});



// @desc    Login user
// @route   POST /api/users/login
// @access  Public
// exports.loginUser = asyncHandler(async (req, res, next) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return next(new ErrorResponse('Please provide email and password', 400));
//     }

//     const result = await rpcClient.loginUser({ email, password });

//     if (!result.success) {
//         return next(new ErrorResponse(result.error, 401));
//     }

//     // Set token in cookie (optional)
//     res.cookie('token', result.token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
//     });

//     res.status(200).json({
//         success: true,
//         token: result.token,
//         refreshToken: result.refresh_token,
//         user: result.user
//     });
// });

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
exports.loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorResponse('Please provide email and password', 400));
    }

    const result = await rpcClient.loginUser({ email, password });

    if (!result.success) {
        return next(new ErrorResponse(result.error, 401));
    }

    // Normalize role (ensure consistent case)
    if (result.user && result.user.role) {
        result.user.role = result.user.role.toLowerCase();
    }

    // Set token in cookie (optional)
    res.cookie('token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(200).json({
        success: true,
        token: result.token,
        refreshToken: result.refresh_token,
        user: result.user
    });
});
// @desc    Logout user
// @route   POST /api/users/logout
// @access  Private
// exports.logoutUser = asyncHandler(async (req, res, next) => {

//     if (!req.user) {
//         return next(new ErrorResponse('User not authenticated', 401));
//     }
//     const userId = req.user.id;

//     const result = await rpcClient.logoutUser(userId);

//     if (!result.success) {
//         return next(new ErrorResponse(result.error, 400));
//     }

//     // Clear cookie
//     res.clearCookie('token');

//     res.status(200).json({
//         success: true,
//         message: 'User logged out successfully'
//     });
// });


// exports.logoutUser = asyncHandler(async (req, res, next) => {
//   try {
//     let userId = null;
    
//     // Try to get user ID from token if available
//     if (req.user && req.user.id) {
//       userId = req.user.id;
      
//       // Call RPC to logout if we have a valid user
//       const result = await rpcClient.logoutUser(userId);
      
//       if (!result.success) {
//         console.log('RPC logout failed, but continuing with local logout:', result.error);
//       }
//     } else {
//       console.log('No authenticated user found, performing local logout only');
//     }

//     // Clear cookie regardless
//     res.clearCookie('token');

//     res.status(200).json({
//       success: true,
//       message: 'User logged out successfully'
//     });
//   } catch (error) {
//     // Even if there's an error, we should clear local auth
//     console.error('Logout error (continuing anyway):', error);
    
//     res.clearCookie('token');
    
//     res.status(200).json({
//       success: true,
//       message: 'User logged out successfully'
//     });
//   }
// });


exports.logoutUser = asyncHandler(async (req, res, next) => {
  console.log('🔐 Logout request received');
  console.log('📋 Headers:', req.headers);
  console.log('👤 req.user:', req.user);
  
  try {
    let userId = null;
    
    // Try to get user ID from token if available
    if (req.user && req.user.id) {
      userId = req.user.id;
      console.log('✅ Found user ID from token:', userId);
      
      // Call RPC to logout if we have a valid user
      try {
        const result = await rpcClient.logoutUser(userId);
        console.log('📡 RPC logout response:', result);
        
        if (!result.success) {
          console.log('⚠️ RPC logout failed, but continuing with local logout:', result.error);
        }
      } catch (rpcError) {
        console.log('⚠️ RPC call failed during logout:', rpcError.message);
      }
    } else {
      console.log('ℹ️ No authenticated user found, performing local logout only');
    }

    // Clear cookie regardless
    res.clearCookie('token');
    console.log('🍪 Cookie cleared');

    res.status(200).json({
      success: true,
      message: 'User logged out successfully'
    });
    
    console.log('✅ Logout completed successfully');
    
  } catch (error) {
    console.error('❌ Unexpected logout error:', error);
    
    // Even if there's an error, we should clear local auth
    res.clearCookie('token');
    
    res.status(200).json({
      success: true,
      message: 'User logged out successfully'
    });
  }
});
// @desc    Get current user profile
// @route   GET /api/users/me
// @access  Private
exports.getCurrentUser = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;

    const result = await rpcClient.getUserProfile(userId);

    if (!result.success) {
        return next(new ErrorResponse(result.error, 404));
    }

    res.status(200).json({
        success: true,
        data: result.user
    });
});

// @desc    Update user profile
// @route   PUT /api/users/me
// @access  Private
exports.updateProfile = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const updateData = req.body;

    // Remove fields that shouldn't be updated
    delete updateData.email;
    delete updateData.role;
    delete updateData.password;

    const result = await rpcClient.updateUserProfile(userId, updateData);

    if (!result.success) {
        return next(new ErrorResponse(result.error, 400));
    }

    res.status(200).json({
        success: true,
        data: result.user
    });
});

// @desc    Change password
// @route   PUT /api/users/change-password
// @access  Private
exports.changePassword = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return next(new ErrorResponse('Please provide current and new password', 400));
    }

    const result = await rpcClient.changePassword(userId, currentPassword, newPassword);

    if (!result.success) {
        return next(new ErrorResponse(result.error, 400));
    }

    res.status(200).json({
        success: true,
        message: 'Password changed successfully'
    });
});

// @desc    Forgot password
// @route   POST /api/users/forgot-password
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return next(new ErrorResponse('Please provide email', 400));
    }

    const result = await rpcClient.forgotPassword(email);

    if (!result.success) {
        return next(new ErrorResponse(result.error, 400));
    }

    res.status(200).json({
        success: true,
        message: result.message
    });
});

// @desc    Reset password
// @route   PUT /api/users/reset-password/:token
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
        return next(new ErrorResponse('Please provide new password', 400));
    }

    const result = await rpcClient.resetPassword(token, password);

    if (!result.success) {
        return next(new ErrorResponse(result.error, 400));
    }

    res.status(200).json({
        success: true,
        message: 'Password reset successfully'
    });
});

// @desc    Refresh token
// @route   POST /api/users/refresh-token
// @access  Public
exports.refreshToken = asyncHandler(async (req, res, next) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return next(new ErrorResponse('Please provide refresh token', 400));
    }

    const result = await rpcClient.refreshToken(refreshToken);

    if (!result.success) {
        return next(new ErrorResponse(result.error, 401));
    }

    res.status(200).json({
        success: true,
        token: result.token,
        user: result.user
    });
});

// @desc    Get freelancer public profile
// @route   GET /api/users/freelancers/:username
// @access  Public
exports.getFreelancerProfile = asyncHandler(async (req, res, next) => {
    const { username } = req.params;

    const result = await rpcClient.getFreelancerPublicProfile(username);

    if (!result.success) {
        return next(new ErrorResponse(result.error, 404));
    }

    res.status(200).json({
        success: true,
        data: result.profile
    });
});

// @desc    Search freelancers
// @route   GET /api/users/freelancers
// @access  Public
exports.searchFreelancers = asyncHandler(async (req, res, next) => {
    const filters = req.query;

    const result = await rpcClient.searchFreelancers(filters);

    if (!result.success) {
        return next(new ErrorResponse(result.error, 400));
    }

    res.status(200).json({
        success: true,
        data: result.freelancers,
        pagination: result.pagination
    });
});

// @desc    Update freelancer skills
// @route   PUT /api/users/me/skills
// @access  Private (Freelancer only)
exports.updateFreelancerSkills = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const { skills } = req.body;

    if (!skills || !Array.isArray(skills)) {
        return next(new ErrorResponse('Please provide an array of skills', 400));
    }

    const result = await rpcClient.updateFreelancerSkills(userId, skills);

    if (!result.success) {
        return next(new ErrorResponse(result.error, 400));
    }

    res.status(200).json({
        success: true,
        data: result.skills
    });
});

// @desc    Update client company info
// @route   PUT /api/users/me/company
// @access  Private (Client only)
exports.updateClientCompany = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const companyData = req.body;

    const result = await rpcClient.updateClientCompany(userId, companyData);

    if (!result.success) {
        return next(new ErrorResponse(result.error, 400));
    }

    res.status(200).json({
        success: true,
        data: result.company_data
    });
});

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
    const filters = req.query;
    const pagination = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 20
    };

    const result = await rpcClient.getAllUsers(filters, pagination);

    if (!result.success) {
        return next(new ErrorResponse(result.error, 400));
    }

    res.status(200).json({
        success: true,
        data: result.users,
        pagination: result.pagination
    });
});

// @desc    Get user by ID (Admin only)
// @route   GET /api/users/:id
// @access  Private/Admin
exports.getUserById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const result = await rpcClient.getUserById(id);

    if (!result.success) {
        return next(new ErrorResponse(result.error, 404));
    }

    res.status(200).json({
        success: true,
        data: result.user
    });
});

// @desc    Update user status (Admin only)
// @route   PUT /api/users/:id/status
// @access  Private/Admin
exports.updateUserStatus = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return next(new ErrorResponse('Please provide status', 400));
    }

    const result = await rpcClient.updateUserStatus(id, status);

    if (!result.success) {
        return next(new ErrorResponse(result.error, 400));
    }

    res.status(200).json({
        success: true,
        message: result.message
    });
});

// @desc    Delete user (Admin only)
// @route   DELETE /api/users/:id
// @access  Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const result = await rpcClient.deleteUser(id);

    if (!result.success) {
        return next(new ErrorResponse(result.error, 400));
    }

    res.status(200).json({
        success: true,
        message: 'User deleted successfully'
    });
});

exports.uploadAvatar = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;

    if (!req.file) {
        return next(new ErrorResponse('Please upload an image file', 400));
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    const result = await rpcClient.updateUserAvatar(userId, imageUrl);

    if (!result.success) {
        return next(new ErrorResponse(result.error, 400));
    }

    res.status(200).json({
        success: true,
        data: {
            avatar_url: imageUrl  // CHANGED FROM avatarUrl to avatar_url
        }
    });
});
// @desc    Test RPC connection
// @route   GET /api/users/test-rpc
// @access  Public
exports.testRpcConnection = asyncHandler(async (req, res, next) => {
    const result = await rpcClient.testConnection();

    res.status(200).json({
        success: true,
        data: result
    });
});