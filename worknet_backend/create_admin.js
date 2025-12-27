// create_admin.js - Create admin user directly
const mongoose = require('mongoose');
require('dotenv').config();

async function createAdminUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/worknet');
    console.log('✅ Connected to MongoDB');
    
    // Import User model
    const User = require('./models/User');
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@worknet.com' });
    
    if (existingAdmin) {
      console.log('ℹ️  Admin user already exists:');
      console.log(`  Email: ${existingAdmin.email}`);
      console.log(`  Username: ${existingAdmin.username}`);
      console.log(`  Role: ${existingAdmin.role}`);
      
      // Generate token
      const token = existingAdmin.getSignedJwtToken();
      console.log('\n🔑 Admin token:');
      console.log(token);
      
      await mongoose.disconnect();
      return;
    }
    
    // Create admin user
    const adminData = {
      email: 'admin@worknet.com',
      username: 'admin',
      password: 'Admin123!',
      role: 'admin',
      full_name: 'System Administrator',
      is_verified: true,
      is_active: true,
      bio: 'System administrator account'
    };
    
    const adminUser = await User.create(adminData);
    
    console.log('✅ Admin user created successfully:');
    console.log(`  Email: ${adminUser.email}`);
    console.log(`  Username: ${adminUser.username}`);
    console.log(`  Role: ${adminUser.role}`);
    console.log(`  ID: ${adminUser._id}`);
    
    // Generate token
    const token = adminUser.getSignedJwtToken();
    console.log('\n🔑 Admin token:');
    console.log(token);
    console.log('\n📋 Copy this token to your .env file:');
    console.log(`ADMIN_TOKEN=${token}`);
    
    await mongoose.disconnect();
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    process.exit(1);
  }
}

// Also create admin in RPC database through API
async function createAdminInRPC() {
  try {
    const axios = require('axios');
    const API_URL = process.env.API_BASE_URL || 'http://localhost:5000/api';
    
    const adminData = {
      email: 'admin@worknet.com',
      username: 'admin',
      password: 'Admin123!',
      role: 'admin',
      full_name: 'System Administrator',
      is_verified: true
    };
    
    console.log('\n🔄 Also creating admin in RPC database...');
    const response = await axios.post(`${API_URL}/users/register`, adminData);
    
    if (response.data.success) {
      console.log('✅ Admin created in RPC database');
      console.log(`🔑 RPC Admin token: ${response.data.token}`);
    }
    
  } catch (error) {
    console.log('⚠️  Note: Could not create admin in RPC database');
    console.log('   This is normal if admin already exists in RPC');
  }
}

// Run both
createAdminUser().then(() => {
  createAdminInRPC().then(() => {
    console.log('\n🎉 Admin setup complete!');
    console.log('\nNow you can run:');
    console.log('node test_categories_fixed.js');
    process.exit(0);
  });
});