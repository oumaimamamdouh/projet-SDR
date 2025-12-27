const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');
const jwt = require('jsonwebtoken');
const rpcClient = require('../utils/rpcClient');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  try {
    const { email, password, username, full_name, role = 'client' } = req.body;
    
    // Validation de base
    const requiredFields = ['email', 'password', 'username', 'full_name'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return next(new ErrorResponse(
        `Missing required fields: ${missingFields.join(', ')}`, 
        400
      ));
    }
    
    console.log('📝 Register attempt:', email);
    console.log('📤 RPC Call: create_user with data:', {
      email,
      username,
      full_name,
      role,
      hasPassword: !!password
    });
    
    // Préparer les données pour le RPC
    const userData = {
      email,
      password,
      username,
      full_name,
      role
    };
    
    // Appel RPC
    const result = await rpcClient.createUser(userData);
    
    console.log('📥 RPC Response (create_user):', result);
    
    // Gestion des différentes structures de réponse
    if (!result) {
      return next(new ErrorResponse('Registration failed: No response from server', 500));
    }
    
    if (result.error) {
      return next(new ErrorResponse(result.error, 400));
    }
    
    if (result.success === false) {
      return next(new ErrorResponse(result.message || 'Registration failed', 400));
    }
    
    // Si la réponse est un objet direct (comme dans vos logs)
    if (result.user) {
      res.status(201).json({
        success: true,
        user: result.user
      });
    } else {
      // Si la réponse est l'objet utilisateur directement
      res.status(201).json({
        success: true,
        user: result
      });
    }
  } catch (error) {
    console.error('❌ Register error:', error);
    
    // Extraire le message d'erreur des logs XML-RPC
    let errorMessage = 'Registration failed';
    if (error.message) {
      errorMessage = error.message;
    } else if (error.error) {
      errorMessage = error.error;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    
    return next(new ErrorResponse(errorMessage, error.statusCode || 500));
  }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return next(new ErrorResponse('Please provide email and password', 400));
  }
  
  try {
    console.log('🔐 Login attempt:', email);
    console.log('📤 RPC Call: login_user with email:', email);
    
    // Deux méthodes possibles selon le service RPC
    let result;
    try {
      // Essayer d'abord avec authenticateUser
      result = await rpcClient.authenticateUser(email, password);
    } catch (authError) {
      console.log('AuthenticateUser failed, trying loginUser...');
      // Essayer avec loginUser
      result = await rpcClient.loginUser({ email, password });
    }
    
    console.log('📥 RPC Response (login):', result);
    
    // Gestion des réponses
    if (!result) {
      return next(new ErrorResponse('Authentication failed: No response from server', 500));
    }
    
    if (result.error) {
      return next(new ErrorResponse(result.error, 401));
    }
    
    if (result.success === false) {
      return next(new ErrorResponse(result.message || 'Invalid credentials', 401));
    }
    
    // Différentes structures de réponse possibles
    let token, user;
    
    if (result.token && result.user) {
      token = result.token;
      user = result.user;
    } else if (result.jwt_token) {
      token = result.jwt_token;
      user = {
        id: result.user_id,
        email: result.email,
        username: result.username,
        full_name: result.full_name,
        role: result.role
      };
    } else if (typeof result === 'string') {
      token = result; // Le token est directement retourné
      user = { email }; // User minimal
    } else {
      token = result;
      user = result;
    }
    
    res.status(200).json({
      success: true,
      token,
      user
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    
    let errorMessage = 'Authentication failed';
    if (error.message) {
      errorMessage = error.message;
    } else if (error.error) {
      errorMessage = error.error;
    }
    
    return next(new ErrorResponse(errorMessage, 401));
  }
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  // Le middleware protect() devrait ajouter req.user
  if (!req.user) {
    return next(new ErrorResponse('User not found in request', 404));
  }
  
  res.status(200).json({
    success: true,
    data: req.user
  });
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
exports.logout = asyncHandler(async (req, res, next) => {
  try {
    if (req.user && req.user.id) {
      await rpcClient.logoutUser(req.user.id);
    }
    
    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('❌ Logout error:', error);
    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  }
});

// @desc    Update user details
// @route   PUT /api/auth/updatedetails
// @access  Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return next(new ErrorResponse('User not authenticated', 401));
    }
    
    const { username, full_name, bio, phone, location } = req.body;
    
    const updateData = {
      username,
      full_name,
      bio,
      phone,
      location
    };
    
    // Filtrer les champs undefined
    Object.keys(updateData).forEach(key => 
      updateData[key] === undefined && delete updateData[key]
    );
    
    const result = await rpcClient.updateUserProfile(req.user.id, updateData);
    
    if (result.error || result.success === false) {
      return next(new ErrorResponse(
        result.error || result.message || 'Update failed', 
        400
      ));
    }
    
    res.status(200).json({
      success: true,
      data: result.user || result
    });
  } catch (error) {
    console.error('❌ Update details error:', error);
    return next(new ErrorResponse(error.message || 'Update failed', 500));
  }
});

// @desc    Update password
// @route   PUT /api/auth/updatepassword
// @access  Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    if (!req.user || !req.user.id) {
      return next(new ErrorResponse('User not authenticated', 401));
    }
    
    if (!currentPassword || !newPassword) {
      return next(new ErrorResponse('Please provide current and new password', 400));
    }
    
    const result = await rpcClient.changePassword(
      req.user.id, 
      currentPassword, 
      newPassword
    );
    
    if (result.error || result.success === false) {
      return next(new ErrorResponse(
        result.error || result.message || 'Password update failed', 
        400
      ));
    }
    
    res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    console.error('❌ Update password error:', error);
    return next(new ErrorResponse(error.message || 'Password update failed', 500));
  }
});

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  
  if (!email) {
    return next(new ErrorResponse('Please provide email', 400));
  }
  
  try {
    console.log('📧 Forgot password request for:', email);
    
    const result = await rpcClient.forgotPassword(email);
    
    console.log('📥 Forgot password response:', result);
    
    if (result.error || result.success === false) {
      return next(new ErrorResponse(
        result.error || result.message || 'Failed to process request', 
        400
      ));
    }
    
    res.status(200).json({
      success: true,
      message: result.message || 'Reset email sent successfully'
    });
  } catch (error) {
    console.error('❌ Forgot password error:', error);
    return next(new ErrorResponse(error.message || 'Failed to process request', 500));
  }
});

// @desc    Reset password
// @route   POST /api/auth/reset-password/:resettoken
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { password } = req.body;
  const { resettoken } = req.params;
  
  if (!password) {
    return next(new ErrorResponse('Please provide new password', 400));
  }
  
  if (!resettoken) {
    return next(new ErrorResponse('Reset token is required', 400));
  }
  
  try {
    console.log('🔄 Reset password with token:', resettoken);
    
    const result = await rpcClient.resetPassword(resettoken, password);
    
    console.log('📥 Reset password response:', result);
    
    if (result.error || result.success === false) {
      return next(new ErrorResponse(
        result.error || result.message || 'Password reset failed', 
        400
      ));
    }
    
    res.status(200).json({
      success: true,
      message: result.message || 'Password reset successfully'
    });
  } catch (error) {
    console.error('❌ Reset password error:', error);
    return next(new ErrorResponse(error.message || 'Password reset failed', 500));
  }
});

// @desc    Refresh token
// @route   POST /api/auth/refresh-token
// @access  Public
exports.refreshToken = asyncHandler(async (req, res, next) => {
  const { refreshToken } = req.body;
  
  if (!refreshToken) {
    return next(new ErrorResponse('Please provide refresh token', 400));
  }
  
  try {
    console.log('🔄 Refresh token request');
    
    const result = await rpcClient.refreshToken(refreshToken);
    
    console.log('📥 Refresh token response:', result);
    
    if (result.error || result.success === false) {
      return next(new ErrorResponse(
        result.error || result.message || 'Token refresh failed', 
        401
      ));
    }
    
    res.status(200).json({
      success: true,
      token: result.token || result,
      user: result.user
    });
  } catch (error) {
    console.error('❌ Refresh token error:', error);
    return next(new ErrorResponse(error.message || 'Token refresh failed', 500));
  }
});

// ========== FONCTION DE TEST SIMPLE ==========
// @desc    Test auth endpoint
// @route   POST /api/auth/test
// @access  Public
exports.test = asyncHandler(async (req, res, next) => {
  const token = jwt.sign(
    {
      user_id: 'test_user_' + Date.now(),
      email: req.body.email || 'test@worknet.com',
      username: 'testuser',
      full_name: 'Test User',
      role: 'client'
    },
    process.env.JWT_SECRET || 'worknet_super_secret_jwt_key_2024_change_in_production',
    { expiresIn: '7d' }
  );
  
  res.status(200).json({
    success: true,
    token,
    user: {
      id: 'test_user_' + Date.now(),
      email: req.body.email || 'test@worknet.com',
      username: 'testuser',
      full_name: 'Test User',
      role: 'client'
    }
  });
});