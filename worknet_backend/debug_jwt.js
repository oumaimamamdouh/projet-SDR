// debug_jwt.js
const jwt = require('jsonwebtoken');

// Get a token from your login response
const sampleToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjkzYjMwMGFjYTY5N2NmNTg1NTUyNTc5IiwiZW1haWwiOiJzYWRpa0BleGFtcGxlLmNvbSIsInJvbGUiOiJmcmVlbGFuY2VyIiwiZXhwIjoxNzQxNzA1MzUyfQ.NKzJ5oJuvU9PvOWkf7ZKtIdY3IFpg41OXg8nUL95GxY';

try {
    const decoded = jwt.decode(sampleToken);
    console.log('Decoded JWT payload:', JSON.stringify(decoded, null, 2));
    console.log('\nKeys in payload:', Object.keys(decoded));
    console.log('user_id:', decoded.user_id);
    console.log('role:', decoded.role);
} catch (error) {
    console.error('Error decoding token:', error.message);
}