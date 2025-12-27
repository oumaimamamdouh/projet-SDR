const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

async function checkAdminLogin() {
  console.log('🔍 Checking admin login...\n');
  
  try {
    // Try to login
    const response = await axios.post(`${API_BASE_URL}/users/login`, {
      email: 'admin@example.com',
      password: 'pwd12345'
    });
    
    console.log('📥 Full response:');
    console.log(JSON.stringify(response.data, null, 2));
    
    if (response.data.success) {
      console.log('\n✅ Login successful!');
      console.log(`Token: ${response.data.token.substring(0, 50)}...`);
      console.log(`User data:`, response.data.data);
      
      // Test if we can decode the token
      try {
        const tokenParts = response.data.token.split('.');
        if (tokenParts.length === 3) {
          const payload = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString());
          console.log('\n🔐 Decoded token payload:');
          console.log(JSON.stringify(payload, null, 2));
        }
      } catch (e) {
        console.log('Cannot decode token');
      }
    } else {
      console.log('❌ Login failed:', response.data.error);
    }
    
  } catch (error) {
    console.error('❌ Request error:', error.response?.data || error.message);
  }
}

checkAdminLogin();