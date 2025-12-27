// test_auth_debug.js
const axios = require('axios');
require('dotenv').config();

const BASE_URL = process.env.BASE_URL || 'http://localhost:5000/api';

async function debugAuth() {
    console.log('🔍 Debugging Authentication Issues\n');
    
    // 1. Login as freelancer
    console.log('1. Logging in as freelancer...');
    try {
        const loginResponse = await axios.post(`${BASE_URL}/users/login`, {
            email: 'sadik@example.com',
            password: 'pwd12345'
        });
        
        console.log('✅ Login response:');
        console.log('   Success:', loginResponse.data.success);
        console.log('   Token:', loginResponse.data.token ? 'Yes' : 'No');
        console.log('   User role:', loginResponse.data.user?.role);
        console.log('   User ID:', loginResponse.data.user?._id);
        
        // 2. Decode the token to see what's inside
        const token = loginResponse.data.token;
        if (token) {
            const jwt = require('jsonwebtoken');
            const decoded = jwt.decode(token);
            console.log('\n🔐 Decoded JWT token:');
            console.log(JSON.stringify(decoded, null, 2));
            
            // 3. Try to create a gig
            console.log('\n2. Testing gig creation...');
            const gigData = {
                title: 'Debug Test Gig',
                description: 'Testing authentication',
                category_id: '692dbb7515355c3dedcfb35e',
                base_price: 100,
                delivery_days: 5,
                status: 'active'
            };
            
            const createResponse = await axios.post(`${BASE_URL}/gigs`, gigData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            console.log('✅ Gig creation response:');
            console.log('   Success:', createResponse.data.success);
            if (createResponse.data.data) {
                console.log('   Gig created:', createResponse.data.data.title);
            }
        }
    } catch (error) {
        console.error('❌ Error:', error.response?.data || error.message);
        
        if (error.response) {
            console.log('Status:', error.response.status);
            console.log('Error data:', error.response.data);
            
            // Check headers
            console.log('\n📋 Response headers:');
            console.log(JSON.stringify(error.response.headers, null, 2));
        }
    }
}

// Run debug
debugAuth();