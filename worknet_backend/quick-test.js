const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function quickTest() {
  try {
    console.log('🚀 Testing WorkNet API...\n');

    // 1. Test health endpoint
    console.log('1. Testing health endpoint...');
    const health = await axios.get(`${API_BASE}/health`);
    console.log('✅', health.data.message);

    // 2. Test user registration
    console.log('\n2. Testing user registration...');
    const uniqueId = Date.now();
    const userData = {
      email: `user${uniqueId}@example.com`,
      username: `user${uniqueId}`,
      password: 'password123',
      full_name: `Test User ${uniqueId}`,
      role: 'client'
    };

    const register = await axios.post(`${API_BASE}/users/register`, userData);
    console.log('✅ User registered:', register.data.user.username);

    // 3. Test user login
    console.log('\n3. Testing user login...');
    const login = await axios.post(`${API_BASE}/users/login`, {
      email: userData.email,
      password: userData.password
    });
    console.log('✅ User logged in:', login.data.user.username);
    const token = login.data.token;

    // 4. Test get current user (protected route)
    console.log('\n4. Testing protected route...');
    const me = await axios.get(`${API_BASE}/users/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Protected route accessed:', me.data.data.username);

    // 5. Test freelancer search
    console.log('\n5. Testing freelancer search...');
    const freelancers = await axios.get(`${API_BASE}/users/freelancers`);
    console.log('✅ Freelancer search:', freelancers.data.count, 'found');

    console.log('\n🎉 ALL TESTS PASSED! Your API is fully functional!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

quickTest();