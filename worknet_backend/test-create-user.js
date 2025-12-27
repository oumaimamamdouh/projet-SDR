const rpcClient = require('./utils/rpcClient');

async function testCreateUser() {
    console.log('🧪 Testing create_user method...');
    
    try {
        const testUser = {
            email: 'oumaimatest' + Date.now() + '@example.com', // Email unique
            password: 'password123',
            username: 'oumaima_test' + Date.now(), // Username unique
            full_name: 'Test User',
            role: 'freelancer'
        };
        
        console.log('📤 Creating user:', testUser.email);
        const result = await rpcClient.createUser(testUser);
        
        if (result.success) {
            console.log('✅ User created successfully!');
            console.log('👤 User ID:', result.user._id);
            console.log('📧 Email:', result.user.email);
            
            // Test login
            console.log('\n🔐 Testing login...');
            const loginResult = await rpcClient.loginUser({
                email: testUser.email,
                password: 'password123'
            });
            
            if (loginResult.success) {
                console.log('✅ Login successful!');
                console.log('🔑 Token:', loginResult.token.substring(0, 30) + '...');
                console.log('👤 User role:', loginResult.user.role);
            } else {
                console.log('❌ Login failed:', loginResult.error);
            }
        } else {
            console.log('❌ User creation failed:', result.error);
        }
        
    } catch (error) {
        console.error('💥 Error:', error.message || error);
    }
}

testCreateUser();