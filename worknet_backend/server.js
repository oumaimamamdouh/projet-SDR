// const express = require('express');
// const cors = require('cors');
// const allowedOrigins = [
//   'http://localhost:3000',
//   'http://localhost:5173',
//   'http://localhost:5174',
//   // Ajoutez d'autres selon vos besoins
// ];
// const helmet = require('helmet');
// const compression = require('compression');
// const rateLimit = require('express-rate-limit');
// require('dotenv').config();

// // Import routes
// const users = require('./routes/users');
// const gigs = require('./routes/gigs');
// const orders = require('./routes/orders');
// const categories = require('./routes/categories'); // Add this import

// // Import middleware
// const errorHandler = require('./middleware/errorHandler');

// // Import RPC client
// const rpcClient = require('./utils/rpcClient');

// const app = express();

// // Security middleware
// app.use(helmet());

// // Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100 // limit each IP to 100 requests per windowMs
// });
// app.use(limiter);

// // Body parsing middleware
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true }));

// // Compression middleware
// app.use(compression());

// // CORS middleware
// app.use(cors({
//   origin: process.env.CLIENT_URL || 'http://localhost:3000',
//   credentials: true
// }));

// // Health check endpoint
// app.get('/api/health', (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: 'WorkNet Backend is running',
//     timestamp: new Date().toISOString()
//   });
// });

// // RPC Health check endpoint
// app.get('/api/health/rpc', async (req, res) => {
//   try {
//     const result = await rpcClient.testConnection();
//     res.status(200).json({
//       success: true,
//       data: result,
//       timestamp: new Date().toISOString()
//     });
//   } catch (error) {
//     res.status(503).json({
//       success: false,
//       error: 'RPC Server unavailable',
//       details: error.message,
//       timestamp: new Date().toISOString()
//     });
//   }
// });

// // Mount routes
// app.use('/api/users', users);
//app.use('/api/auth', require('./routes/auth'));
// app.use('/api/gigs', gigs);
// app.use('/api/orders', orders);
// app.use('/api/categories', categories); // Add this line

// // Error handling middleware (must be last)
// app.use(errorHandler);

// // Handle undefined routes
// app.use('*', (req, res) => {
//   res.status(404).json({
//     success: false,
//     error: 'Route not found'
//   });
// });

// const PORT = process.env.PORT || 5000;

// const server = app.listen(PORT, () => {
//   console.log(`🚀 WorkNet Backend Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
//   console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
//   console.log(`📡 RPC Server: ${process.env.RPC_SERVER_HOST || 'localhost'}:${process.env.RPC_SERVER_PORT || 8000}`);
// });

// // Test RPC connection on startup
// server.on('listening', async () => {
//   console.log('\n🔌 Testing RPC server connection...');
  
//   let rpcTestResult = null;
  
//   try {
//     rpcTestResult = await rpcClient.testConnection();
    
//     if (rpcTestResult.connected) {
//       console.log('✅ RPC Server connection successful');
//       console.log(`📡 Available methods: ${rpcTestResult.methods?.length || 0}`);
      
//       // List first few methods if available
//       if (rpcTestResult.methods && rpcTestResult.methods.length > 0) {
//         console.log('📋 Sample methods:');
//         rpcTestResult.methods.slice(0, 10).forEach((method, index) => {
//           console.log(`   ${index + 1}. ${method}`);
//         });
//         if (rpcTestResult.methods.length > 10) {
//           console.log(`   ... and ${rpcTestResult.methods.length - 10} more`);
//         }
//       }
//     } else {
//       console.log('⚠️  RPC Server connection failed:', rpcTestResult.error);
//       console.log('⚠️  Please ensure Python RPC server is running on port', 
//                   process.env.RPC_SERVER_PORT || 8000);
//       console.log('⚠️  The system will continue but RPC calls will fail');
//     }
//   } catch (error) {
//     console.log('❌ Error testing RPC connection:', error.message);
//     console.log('💡 Tips:');
//     console.log('   1. Make sure Python RPC server is running: python server.py');
//     console.log('   2. Check RPC_SERVER_HOST and RPC_SERVER_PORT in .env file');
//     console.log('   3. Verify firewall settings');
//   }
  
//   console.log('\n📊 System Status:');
//   console.log(`   Node.js Server: ✅ Running on port ${PORT}`);
//   console.log(`   RPC Connection: ${rpcTestResult?.connected ? '✅ Connected' : '❌ Disconnected'}`);
//   console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
//   console.log(`   Client URL: ${process.env.CLIENT_URL || 'http://localhost:3000'}`);
//   console.log('\n🔄 Ready to accept requests...\n');
// });

// // Handle server errors
// server.on('error', (error) => {
//   if (error.code === 'EADDRINUSE') {
//     console.error(`❌ Port ${PORT} is already in use`);
//     console.log('💡 Try:');
//     console.log(`   1. Kill process on port ${PORT}: lsof -ti:${PORT} | xargs kill -9`);
//     console.log(`   2. Use a different port by setting PORT in .env file`);
//     process.exit(1);
//   } else {
//     console.error('❌ Server error:', error);
//   }
// });

// // Graceful shutdown
// process.on('SIGTERM', () => {
//   console.log('🔻 SIGTERM received, shutting down gracefully...');
//   server.close(() => {
//     console.log('👋 Server closed');
//     process.exit(0);
//   });
// });

// process.on('SIGINT', () => {
//   console.log('🔻 SIGINT received, shutting down...');
//   server.close(() => {
//     console.log('👋 Server closed');
//     process.exit(0);
//   });
// });

// // Handle unhandled promise rejections
// process.on('unhandledRejection', (err, promise) => {
//   console.log('❌ Unhandled Rejection at:', promise, 'reason:', err);
  
//   // In production, you might want to log to a service
//   if (process.env.NODE_ENV === 'production') {
//     // Log to error monitoring service
//   }
  
//   // Close server & exit process in production
//   if (process.env.NODE_ENV === 'production') {
//     server.close(() => {
//       process.exit(1);
//     });
//   }
// });

// // Handle uncaught exceptions
// process.on('uncaughtException', (err) => {
//   console.error('❌ Uncaught Exception:', err);
  
//   // In production, restart the process
//   if (process.env.NODE_ENV === 'production') {
//     server.close(() => {
//       process.exit(1);
//     });
//   }
// });

// module.exports = app;


const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Import routes
const users = require('./routes/users');
const gigs = require('./routes/gigs');
const orders = require('./routes/orders');
const categories = require('./routes/category');
const auth = require('./routes/auth');
const reviews = require('./routes/reviews');
// Import middleware
const errorHandler = require('./middleware/errorHandler');
const corsMiddleware = require('./middleware/cors'); // Importez votre middleware CORS

// Import RPC client
const rpcClient = require('./utils/rpcClient');

const app = express();

// ==================== CONFIGURATION CORS ====================
// Utilisez votre middleware CORS personnalisé
app.use(corsMiddleware);

// ==================== SECURITY MIDDLEWARE ====================
app.use(helmet({
  // Désactivez contentSecurityPolicy pour le développement si nécessaire
  contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
  crossOriginEmbedderPolicy: false
}));

// ==================== RATE LIMITING ====================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// ==================== BODY PARSING ====================
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ==================== COMPRESSION ====================
app.use(compression());

// ==================== HEALTH CHECK ENDPOINTS ====================
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'WorkNet Backend is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    clientUrl: process.env.CLIENT_URL || 'http://localhost:5173'
  });
});

app.get('/api/health/rpc', async (req, res) => {
  try {
    const result = await rpcClient.testConnection();
    res.status(200).json({
      success: true,
      data: result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      error: 'RPC Server unavailable',
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// ==================== MOUNT ROUTES ====================
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/gigs', gigs);
app.use('/api/orders', orders);
app.use('/api/categories', categories);
app.use('/api/reviews', reviews); 

// ==================== ERROR HANDLING ====================
app.use(errorHandler);

// ==================== HANDLE UNDEFINED ROUTES ====================
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.originalUrl
  });
});

// ==================== SERVER STARTUP ====================
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 WorkNet Backend Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔗 Health check RPC: http://localhost:${PORT}/api/health/rpc`);
  console.log(`📡 RPC Server: ${process.env.RPC_SERVER_HOST || 'localhost'}:${process.env.RPC_SERVER_PORT || 8000}`);
  console.log(`🌐 Allowed origins: ${process.env.ALLOWED_ORIGINS || 'http://localhost:5173, http://localhost:3000'}`);
});

// ==================== RPC CONNECTION TEST ====================
server.on('listening', async () => {
  console.log('\n🔌 Testing RPC server connection...');
  
  let rpcTestResult = null;
  
  try {
    rpcTestResult = await rpcClient.testConnection();
    
    if (rpcTestResult.connected) {
      console.log('✅ RPC Server connection successful');
      console.log(`📡 Available methods: ${rpcTestResult.methods?.length || 0}`);
      
      if (rpcTestResult.methods && rpcTestResult.methods.length > 0) {
        console.log('📋 Sample methods:');
        rpcTestResult.methods.slice(0, 10).forEach((method, index) => {
          console.log(`   ${index + 1}. ${method}`);
        });
        if (rpcTestResult.methods.length > 10) {
          console.log(`   ... and ${rpcTestResult.methods.length - 10} more`);
        }
      }
    } else {
      console.log('⚠️  RPC Server connection failed:', rpcTestResult.error);
      console.log('⚠️  Please ensure Python RPC server is running on port', 
                  process.env.RPC_SERVER_PORT || 8000);
      console.log('⚠️  The system will continue but RPC calls will fail');
    }
  } catch (error) {
    console.log('❌ Error testing RPC connection:', error.message);
    console.log('💡 Tips:');
    console.log('   1. Make sure Python RPC server is running: python server.py');
    console.log('   2. Check RPC_SERVER_HOST and RPC_SERVER_PORT in .env file');
    console.log('   3. Verify firewall settings');
  }
  
  console.log('\n📊 System Status:');
  console.log(`   Node.js Server: ✅ Running on port ${PORT}`);
  console.log(`   RPC Connection: ${rpcTestResult?.connected ? '✅ Connected' : '❌ Disconnected'}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   Allowed Origins: ${process.env.ALLOWED_ORIGINS || 'http://localhost:5173, http://localhost:3000'}`);
  console.log('\n🔄 Ready to accept requests...\n');
});

// ==================== ERROR HANDLERS ====================
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use`);
    console.log('💡 Try:');
    console.log(`   1. Kill process on port ${PORT}: lsof -ti:${PORT} | xargs kill -9`);
    console.log(`   2. Use a different port by setting PORT in .env file`);
    console.log(`   3. Wait 60 seconds for the port to be released`);
    process.exit(1);
  } else {
    console.error('❌ Server error:', error);
  } 
});

// ==================== GRACEFUL SHUTDOWN ====================
const gracefulShutdown = (signal) => {
  console.log(`\n🔻 ${signal} received, shutting down gracefully...`);
  server.close(() => {
    console.log('👋 HTTP server closed');
    console.log('👋 RPC connections closed');
    process.exit(0);
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error('❌ Could not close connections in time, forcing shutdown');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// ==================== UNHANDLED EXCEPTIONS ====================
process.on('unhandledRejection', (err, promise) => {
  console.log('❌ Unhandled Rejection at:', promise);
  console.log('❌ Reason:', err);
  
  if (process.env.NODE_ENV === 'production') {
    // En production, loguer dans un service de monitoring
    console.error('Production error:', err);
  }
});

process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  
  if (process.env.NODE_ENV === 'production') {
    // En production, redémarrer le processus
    server.close(() => {
      console.log('🔁 Restarting server due to uncaught exception');
      process.exit(1);
    });
  }
});

module.exports = app;