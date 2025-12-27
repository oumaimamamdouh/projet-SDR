const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function debugProtectedRoute() {
  try {
    console.log('🔍 Debugging Protected Route...\n');

    // 1. Register a new user
    const uniqueId = Date.now();
    const testUser = {
      email: `debug${uniqueId}@example.com`,
      username: `debuguser${uniqueId}`,
      password: 'password123',
      full_name: `Debug User ${uniqueId}`,
      role: 'client'
    };

    console.log('1. Registering user...');
    const register = await axios.post(`${API_BASE}/users/register`, testUser);
    console.log('✅ User registered, ID:', register.data.user._id);

    // 2. Login to get token
    console.log('\n2. Logging in...');
    const login = await axios.post(`${API_BASE}/users/login`, {
      email: testUser.email,
      password: testUser.password
    });
    const token = login.data.token;
    console.log('✅ Token received');

    // 3. Decode the token to see what's inside
    console.log('\n3. Decoding token...');
    const jwt = require('jsonwebtoken');
    const decoded = jwt.decode(token);
    console.log('🔍 Token payload:', decoded);
    console.log('🔍 User ID in token:', decoded.id);
    console.log('🔍 Actual user ID:', register.data.user._id);
    console.log('🔍 IDs match:', decoded.id === register.data.user._id.toString());

    // 4. Test protected route
    console.log('\n4. Testing protected route...');
    const meResponse = await axios.get(`${API_BASE}/users/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Protected route SUCCESS!');
    console.log('   User:', meResponse.data.data.username);

  } catch (error) {
    console.log('\n❌ Protected route FAILED:');
    if (error.response) {
      console.log('   Status:', error.response.status);
      console.log('   Error:', error.response.data);
    } else {
      console.log('   Error:', error.message);
    }
  }
}

debugProtectedRoute();