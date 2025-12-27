// simple_test_order.js
const axios = require('axios');

async function test() {
    const BASE_URL = 'http://localhost:5000/api';
    
    // Login
    console.log('🔐 Logging in...');
    const loginRes = await axios.post(`${BASE_URL}/users/login`, {
        email: 'admin@example.com',
        password: 'pwd12345'
    });
    
    const token = loginRes.data.token;
    console.log('✅ Login successful');
    
    // Simple test data
    const testData = {
        orderedCategories: [
            {
                id: '692dbb7515355c3dedcfb360', // Graphic Design
                order: 999
            }
        ]
    };
    
    console.log('\n📤 Sending to API:');
    console.log(JSON.stringify(testData, null, 2));
    
    try {
        const response = await axios.put(
            `${BASE_URL}/categories/order`,
            testData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log('\n✅ Success:', response.data);
    } catch (error) {
        console.log('\n❌ Error:', error.response?.data);
    }
}

test();