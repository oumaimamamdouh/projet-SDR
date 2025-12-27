// test_token_validation.js
const rpcClient = require('./utils/rpcClient');
const jwt = require('jsonwebtoken');

async function testTokenValidation() {
    console.log('🔐 Testing Token Validation via RPC');
    console.log('====================================');
    
    // First, get a real token by logging in
    console.log('\n1. Logging in to get a real token...');
    try {
        const loginResult = await rpcClient.loginUser({
            email: 'sadik@example.com',
            password: 'pwd12345'  // Use the actual password
        });
        
        if (loginResult.success) {
            console.log('✅ Login successful');
            const token = loginResult.token;
            
            console.log('\n2. Validating token via RPC...');
            const validationResult = await rpcClient.validateToken(token);
            
            if (validationResult.success) {
                console.log('✅ Token validation successful!');
                console.log('📋 Decoded payload:', validationResult.payload);
                console.log('   User ID:', validationResult.payload.user_id);
                console.log('   Email:', validationResult.payload.email);
                console.log('   Role:', validationResult.payload.role);
                
                // Test with invalid token
                console.log('\n3. Testing with invalid token...');
                const invalidResult = await rpcClient.validateToken('invalid_token_here');
                console.log('Invalid token result:', invalidResult);
                
            } else {
                console.log('❌ Token validation failed:', validationResult.error);
            }
        } else {
            console.log('❌ Login failed:', loginResult.error);
        }
    } catch (error) {
        console.error('❌ Test error:', error);
    }
}

testTokenValidation();