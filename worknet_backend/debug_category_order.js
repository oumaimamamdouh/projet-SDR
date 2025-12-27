// debug_category_order.js
const axios = require('axios');
const BASE_URL = 'http://localhost:5000/api';

async function debugCategoryOrder() {
    try {
        // 1. Login as admin
        console.log('🔐 Logging in...');
        const loginResponse = await axios.post(`${BASE_URL}/users/login`, {
            email: 'admin@example.com',
            password: 'pwd12345'
        });
        
        const token = loginResponse.data.token;
        console.log('✅ Login successful');
        
        // 2. Get categories
        console.log('\n📋 Getting categories...');
        const categoriesResponse = await axios.get(`${BASE_URL}/categories`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const categories = categoriesResponse.data.data;
        console.log(`Found ${categories.length} categories`);
        
        // 3. Check the first 2 categories
        const testCategories = categories.slice(0, 2);
        console.log('\n📊 Test categories:');
        testCategories.forEach((cat, index) => {
            console.log(`  ${index + 1}. ID: "${cat._id}"`);
            console.log(`     Type: ${typeof cat._id}`);
            console.log(`     Name: ${cat.name}`);
            console.log(`     Length: ${cat._id.length}`);
        });
        
        // 4. Test direct RPC call
        console.log('\n🔍 Testing direct RPC call...');
        const xmlrpc = require('xmlrpc');
        const client = xmlrpc.createClient({
            host: 'localhost',
            port: 8000,
            path: '/RPC2'
        });
        
        // Test with same IDs via RPC
        const orderedCategories = testCategories.map((cat, index) => ({
            id: cat._id,
            order: index + 100
        }));
        
        console.log('\n📤 Sending to RPC:');
        console.log(JSON.stringify(orderedCategories, null, 2));
        
        const rpcResult = await new Promise((resolve, reject) => {
            client.methodCall('update_category_order', [orderedCategories], (error, value) => {
                if (error) reject(error);
                else resolve(value);
            });
        });
        
        console.log('\n📥 RPC Result:', rpcResult);
        
        // 5. Test via API
        console.log('\n🔍 Testing via API...');
        try {
            const apiResponse = await axios.put(
                `${BASE_URL}/categories/order`,
                { orderedCategories },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('✅ API Success:', apiResponse.data);
        } catch (apiError) {
            console.log('❌ API Error:', apiError.response?.data || apiError.message);
            console.log('Status:', apiError.response?.status);
            console.log('Headers:', apiError.response?.headers);
        }
        
    } catch (error) {
        console.error('❌ Debug failed:', error.message);
    }
}

debugCategoryOrder();