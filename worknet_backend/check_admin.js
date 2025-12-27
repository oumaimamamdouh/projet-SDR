// check_admin.js - Run this to verify admin user exists
const mongoose = require('mongoose');
require('dotenv').config();

async function checkAdminUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/worknet');
    
    const User = require('./models/User');
    
    // Find admin users
    const adminUsers = await User.find({ role: 'admin' });
    
    if (adminUsers.length === 0) {
      console.log('❌ No admin users found in MongoDB');
      console.log('\nTo create an admin user, you can:');
      console.log('1. Register normally through the frontend');
      console.log('2. Use this script to create one:');
      
      // Create admin user
      const adminData = {
        email: 'admin@worknet.com',
        username: 'admin',
        password: 'Admin123!', // Change this!
        role: 'admin',
        full_name: 'Administrator',
        is_verified: true
      };
      
      const createAdmin = await User.create(adminData);
      console.log(`✅ Admin user created: ${createAdmin.email}`);
    } else {
      console.log(`✅ Found ${adminUsers.length} admin user(s):`);
      adminUsers.forEach(user => {
        console.log(`  - ${user.email} (${user.username}) - ${user.role}`);
      });
      
      // Generate a token for the first admin
      const token = adminUsers[0].getSignedJwtToken();
      console.log(`\n🔑 Admin token for testing:`);
      console.log(token);
    }
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkAdminUser();