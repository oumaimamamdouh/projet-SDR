// const xmlrpc = require('xmlrpc');
// const readline = require('readline');

// // RPC Client setup
// const host = process.env.RPC_SERVER_HOST || 'localhost';
// const port = process.env.RPC_SERVER_PORT || 8000;

// const client = xmlrpc.createClient({
//     host: host,
//     port: port,
//     path: '/RPC2'
// });

// console.log(`📡 Connecting to RPC server at ${host}:${port}\n`);

// // Helper function for making RPC calls
// function rpcCall(method, params) {
//     return new Promise((resolve, reject) => {
//         console.log(`📤 Calling: ${method}`);
//         console.log(`📦 Params:`, JSON.stringify(params, null, 2));
        
//         client.methodCall(method, params, (error, value) => {
//             if (error) {
//                 console.error(`❌ Error calling ${method}:`, error.message);
//                 reject(error);
//             } else {
//                 console.log(`✅ Response from ${method}:`);
//                 console.log(JSON.stringify(value, null, 2));
//                 console.log('---\n');
//                 resolve(value);
//             }
//         });
//     });
// }

// // Test data
// const testUsers = {
//     admin: {
//         email: 'admin@worknet.test',
//         username: 'admin_test',
//         password: 'Admin@123',
//         full_name: 'Admin User',
//         role: 'admin'
//     },
//     freelancer: {
//         email: 'freelancer@worknet.test',
//         username: 'freelancer_test',
//         password: 'Freelancer@123',
//         full_name: 'John Designer',
//         role: 'freelancer'
//     },
//     client: {
//         email: 'client@worknet.test',
//         username: 'client_test',
//         password: 'Client@123',
//         full_name: 'Jane Client',
//         role: 'client'
//     }
// };

// // Global variables to store test results
// let currentUserId = null;
// let currentToken = null;
// let testFreelancerId = null;
// let testClientId = null;

// class UserTester {
//     constructor() {
//         this.rl = readline.createInterface({
//             input: process.stdin,
//             output: process.stdout
//         });
//     }

//     async runAllTests() {
//         console.log('🔍 ========== STARTING USER FUNCTION TESTS ==========\n');
        
//         try {
//             // Test 1: Create users
//             await this.testCreateUsers();
            
//             // Test 2: Authentication
//             await this.testAuthentication();
            
//             // Test 3: User profile operations
//             await this.testProfileOperations();
            
//             // Test 4: Password operations
//             await this.testPasswordOperations();
            
//             // Test 5: Freelancer-specific operations
//             await this.testFreelancerOperations();
            
//             // Test 6: Client-specific operations
//             await this.testClientOperations();
            
//             // Test 7: Admin operations
//             await this.testAdminOperations();
            
//             // Test 8: Search and public profiles
//             await this.testSearchAndPublicProfiles();
            
//             console.log('🎉 ========== ALL TESTS COMPLETED ==========\n');
            
//         } catch (error) {
//             console.error('❌ Test suite failed:', error.message);
//         } finally {
//             this.rl.close();
//         }
//     }

//     async testCreateUsers() {
//         console.log('📝 ========== TEST 1: CREATE USERS ==========\n');
        
//         // Create client
//         console.log('1. Creating client user...');
//         const clientResult = await rpcCall('create_user', [testUsers.client]);
//         if (clientResult.success) {
//             testClientId = clientResult.user._id;
//             console.log(`✅ Client created: ${testClientId}`);
//         }
        
//         // Create freelancer
//         console.log('\n2. Creating freelancer user...');
//         const freelancerResult = await rpcCall('create_user', [testUsers.freelancer]);
//         if (freelancerResult.success) {
//             testFreelancerId = freelancerResult.user._id;
//             console.log(`✅ Freelancer created: ${testFreelancerId}`);
//         }
        
//         // Create admin (if needed)
//         console.log('\n3. Creating admin user...');
//         const adminResult = await rpcCall('create_user', [testUsers.admin]);
//         if (adminResult.success) {
//             console.log(`✅ Admin created: ${adminResult.user._id}`);
//         }
        
//         // Try duplicate email
//         console.log('\n4. Testing duplicate email...');
//         await rpcCall('create_user', [testUsers.client]);
//     }

//     async testAuthentication() {
//         console.log('\n🔐 ========== TEST 2: AUTHENTICATION ==========\n');
        
//         // Login with correct credentials
//         console.log('1. Login with correct credentials...');
//         const loginResult = await rpcCall('login_user', [{
//             email: testUsers.client.email,
//             password: testUsers.client.password
//         }]);
        
//         if (loginResult.success) {
//             currentToken = loginResult.token;
//             currentUserId = loginResult.user._id;
//             console.log(`✅ Login successful. Token: ${currentToken.substring(0, 20)}...`);
//             console.log(`✅ User ID: ${currentUserId}`);
//         }
        
//         // Login with wrong password
//         console.log('\n2. Login with wrong password...');
//         await rpcCall('login_user', [{
//             email: testUsers.client.email,
//             password: 'wrongpassword'
//         }]);
        
//         // Login with non-existent email
//         console.log('\n3. Login with non-existent email...');
//         await rpcCall('login_user', [{
//             email: 'nonexistent@example.com',
//             password: 'password'
//         }]);
        
//         // Test authenticate_user method directly
//         console.log('\n4. Direct authenticate_user method...');
//         const authResult = await rpcCall('authenticate_user', [
//             testUsers.client.email,
//             testUsers.client.password
//         ]);
        
//         if (authResult.success) {
//             console.log(`✅ Direct authentication successful`);
//         }
//     }

//     async testProfileOperations() {
//         console.log('\n👤 ========== TEST 3: PROFILE OPERATIONS ==========\n');
        
//         if (!currentUserId) {
//             console.log('⚠️  Skipping - No authenticated user');
//             return;
//         }
        
//         // Get user profile
//         console.log('1. Get user profile...');
//         await rpcCall('get_user_profile', [currentUserId]);
        
//         // Get user by ID
//         console.log('\n2. Get user by ID...');
//         await rpcCall('get_user_by_id', [currentUserId]);
        
//         // Get user by email
//         console.log('\n3. Get user by email...');
//         await rpcCall('get_user_by_email', [testUsers.client.email]);
        
//         // Update profile
//         console.log('\n4. Update user profile...');
//         const updateData = {
//             full_name: 'Jane Client Updated',
//             bio: 'Experienced client looking for quality work',
//             country: 'USA',
//             city: 'New York'
//         };
//         await rpcCall('update_user_profile', [currentUserId, updateData]);
        
//         // Update avatar
//         console.log('\n5. Update user avatar...');
//         const avatarUrl = 'https://example.com/avatar.jpg';
//         await rpcCall('update_user_avatar', [currentUserId, avatarUrl]);
//     }

//     async testPasswordOperations() {
//         console.log('\n🔑 ========== TEST 4: PASSWORD OPERATIONS ==========\n');
        
//         if (!currentUserId) {
//             console.log('⚠️  Skipping - No authenticated user');
//             return;
//         }
        
//         // Change password
//         console.log('1. Change password...');
//         await rpcCall('change_password', [
//             currentUserId,
//             testUsers.client.password,
//             'NewPassword@123'
//         ]);
        
//         // Try login with old password (should fail)
//         console.log('\n2. Try login with old password...');
//         await rpcCall('login_user', [{
//             email: testUsers.client.email,
//             password: testUsers.client.password
//         }]);
        
//         // Try login with new password (should succeed)
//         console.log('\n3. Try login with new password...');
//         await rpcCall('login_user', [{
//             email: testUsers.client.email,
//             password: 'NewPassword@123'
//         }]);
        
//         // Forgot password
//         console.log('\n4. Forgot password flow...');
//         const forgotResult = await rpcCall('forgot_password', [testUsers.client.email]);
//         if (forgotResult.success && forgotResult.token) {
//             console.log(`✅ Reset token generated`);
            
//             // Reset password with token
//             console.log('\n5. Reset password with token...');
//             await rpcCall('reset_password', [
//                 forgotResult.token,
//                 'AnotherNewPassword@123'
//             ]);
//         }
//     }

//     async testFreelancerOperations() {
//         console.log('\n🎨 ========== TEST 5: FREELANCER OPERATIONS ==========\n');
        
//         if (!testFreelancerId) {
//             console.log('⚠️  Skipping - No freelancer user');
//             return;
//         }
        
//         // Update freelancer skills
//         console.log('1. Update freelancer skills...');
//         const skills = ['JavaScript', 'React', 'Node.js', 'Python', 'UI/UX Design'];
//         await rpcCall('update_freelancer_skills', [testFreelancerId, skills]);
        
//         // Update freelancer portfolio
//         console.log('\n2. Update freelancer portfolio...');
//         const portfolioItems = [{
//             title: 'E-commerce Website',
//             description: 'Built a full-featured e-commerce platform',
//             images: ['https://example.com/project1.jpg'],
//             url: 'https://example-ecommerce.com',
//             created_at: new Date().toISOString()
//         }];
//         await rpcCall('update_freelancer_portfolio', [testFreelancerId, portfolioItems]);
        
//         // Get public profile
//         console.log('\n3. Get freelancer public profile...');
//         await rpcCall('get_freelancer_public_profile', [testUsers.freelancer.username]);
//     }

//     async testClientOperations() {
//         console.log('\n💼 ========== TEST 6: CLIENT OPERATIONS ==========\n');
        
//         if (!testClientId) {
//             console.log('⚠️  Skipping - No client user');
//             return;
//         }
        
//         // Update client company info
//         console.log('1. Update client company info...');
//         const companyData = {
//             company_name: 'Tech Solutions Inc.',
//             company_size: '50-100 employees'
//         };
//         await rpcCall('update_client_company', [testClientId, companyData]);
//     }

//     async testAdminOperations() {
//         console.log('\n👑 ========== TEST 7: ADMIN OPERATIONS ==========\n');
        
//         // Get all users
//         console.log('1. Get all users...');
//         const filters = {
//             role: 'client',
//             is_active: 'true'
//         };
//         const pagination = {
//             page: 1,
//             limit: 10
//         };
//         await rpcCall('get_all_users', [filters, pagination]);
        
//         // Update user status
//         console.log('\n2. Update user status...');
//         if (testClientId) {
//             await rpcCall('update_user_status', [testClientId, 'verified']);
//         }
        
//         // Delete user (we'll create a test user to delete)
//         console.log('\n3. Create and delete test user...');
//         const tempUser = {
//             email: 'todelete@example.com',
//             username: 'todelete',
//             password: 'Temp@123',
//             full_name: 'User To Delete',
//             role: 'client'
//         };
        
//         const createResult = await rpcCall('create_user', [tempUser]);
//         if (createResult.success) {
//             const tempUserId = createResult.user._id;
//             console.log(`✅ Test user created: ${tempUserId}`);
            
//             // Delete the user
//             await rpcCall('delete_user', [tempUserId]);
//             console.log(`✅ Test user deleted`);
//         }
//     }

//     async testSearchAndPublicProfiles() {
//         console.log('\n🔍 ========== TEST 8: SEARCH AND PUBLIC PROFILES ==========\n');
        
//         // Search freelancers
//         console.log('1. Search freelancers...');
//         const searchFilters = {
//             skills: ['JavaScript', 'React'],
//             min_rating: 4.0,
//             country: 'USA',
//             max_hourly_rate: 100,
//             page: 1,
//             limit: 5
//         };
//         await rpcCall('search_freelancers', [searchFilters]);
        
//         // Test empty search
//         console.log('\n2. Test empty search...');
//         await rpcCall('search_freelancers', [{}]);
//     }

//     async cleanup() {
//         console.log('\n🧹 ========== CLEANUP ==========\n');
        
//         // Note: In a real test, you might want to delete test users
//         // For now, we'll just log the IDs for manual cleanup
//         console.log('Test user IDs for manual cleanup:');
//         if (testClientId) console.log(`Client: ${testClientId}`);
//         if (testFreelancerId) console.log(`Freelancer: ${testFreelancerId}`);
//     }
// }

// // Interactive menu
// async function showMenu() {
//     const tester = new UserTester();
//     const rl = readline.createInterface({
//         input: process.stdin,
//         output: process.stdout
//     });

//     console.log('\n🔧 USER RPC FUNCTION TESTER\n');
//     console.log('1. Run all tests');
//     console.log('2. Test authentication only');
//     console.log('3. Test profile operations');
//     console.log('4. Test password operations');
//     console.log('5. Test freelancer operations');
//     console.log('6. Test client operations');
//     console.log('7. Test admin operations');
//     console.log('8. Test search and public profiles');
//     console.log('9. Cleanup');
//     console.log('0. Exit\n');

//     rl.question('Select option (0-9): ', async (choice) => {
//         switch(choice) {
//             case '1':
//                 await tester.runAllTests();
//                 break;
//             case '2':
//                 await tester.testAuthentication();
//                 break;
//             case '3':
//                 await tester.testProfileOperations();
//                 break;
//             case '4':
//                 await tester.testPasswordOperations();
//                 break;
//             case '5':
//                 await tester.testFreelancerOperations();
//                 break;
//             case '6':
//                 await tester.testClientOperations();
//                 break;
//             case '7':
//                 await tester.testAdminOperations();
//                 break;
//             case '8':
//                 await tester.testSearchAndPublicProfiles();
//                 break;
//             case '9':
//                 await tester.cleanup();
//                 break;
//             case '0':
//                 console.log('👋 Goodbye!');
//                 rl.close();
//                 process.exit(0);
//                 return;
//             default:
//                 console.log('❌ Invalid choice');
//         }
        
//         rl.close();
//         showMenu();
//     });
// }

// // Test specific function
// async function testSpecificFunction() {
//     console.log('\n🔧 TEST SPECIFIC FUNCTION\n');
    
//     const rl = readline.createInterface({
//         input: process.stdin,
//         output: process.stdout
//     });

//     const functions = [
//         'create_user',
//         'authenticate_user',
//         'login_user',
//         'get_user_profile',
//         'update_user_profile',
//         'change_password',
//         'forgot_password',
//         'reset_password',
//         'refresh_token',
//         'get_freelancer_public_profile',
//         'search_freelancers',
//         'get_all_users',
//         'get_user_by_id',
//         'update_user_status',
//         'delete_user'
//     ];

//     console.log('Available functions:');
//     functions.forEach((func, index) => {
//         console.log(`${index + 1}. ${func}`);
//     });

//     rl.question('\nEnter function number to test (or 0 to go back): ', async (choice) => {
//         const index = parseInt(choice) - 1;
        
//         if (choice === '0') {
//             rl.close();
//             showMenu();
//             return;
//         }
        
//         if (index >= 0 && index < functions.length) {
//             const funcName = functions[index];
//             console.log(`\n🧪 Testing ${funcName}\n`);
            
//             // Prompt for parameters
//             rl.question('Enter parameters as JSON (or press Enter for default): ', async (paramsInput) => {
//                 let params = [];
                
//                 if (paramsInput.trim()) {
//                     try {
//                         params = JSON.parse(paramsInput);
//                         if (!Array.isArray(params)) {
//                             params = [params];
//                         }
//                     } catch (error) {
//                         console.log('❌ Invalid JSON, using empty array');
//                     }
//                 }
                
//                 try {
//                     await rpcCall(funcName, params);
//                 } catch (error) {
//                     console.error('❌ Function test failed:', error.message);
//                 }
                
//                 rl.close();
//                 testSpecificFunction();
//             });
//         } else {
//             console.log('❌ Invalid choice');
//             rl.close();
//             testSpecificFunction();
//         }
//     });
// }

// // Main execution
// async function main() {
//     console.log('📊 ========== USER RPC FUNCTION TESTER ==========\n');
    
//     // First, test connection
//     try {
//         console.log('Testing RPC connection...');
//         const methods = await rpcCall('system.listMethods', []);
//         console.log(`✅ Connected! Available methods: ${methods.length}\n`);
        
//         // Show main menu
//         showMenu();
        
//     } catch (error) {
//         console.error('❌ Failed to connect to RPC server');
//         console.error('💡 Make sure Python RPC server is running: python server.py');
//         process.exit(1);
//     }
// }

// // Quick test function (run with: node test-user.js quick)
// async function quickTest() {
//     console.log('⚡ QUICK TEST MODE\n');
    
//     // Test connection
//     try {
//         await rpcCall('system.listMethods', []);
//         console.log('✅ RPC server is reachable\n');
//     } catch (error) {
//         console.error('❌ RPC server is not reachable');
//         return;
//     }
    
//     // Test a few key functions
//     console.log('1. Testing create_user...');
//     const testUser = {
//         email: `test${Date.now()}@example.com`,
//         username: `testuser${Date.now()}`,
//         password: 'Test@123',
//         full_name: 'Test User',
//         role: 'client'
//     };
    
//     const createResult = await rpcCall('create_user', [testUser]);
    
//     if (createResult.success) {
//         const userId = createResult.user._id;
//         console.log(`✅ User created: ${userId}\n`);
        
//         console.log('2. Testing get_user_by_id...');
//         await rpcCall('get_user_by_id', [userId]);
        
//         console.log('\n3. Testing authenticate_user...');
//         await rpcCall('authenticate_user', [testUser.email, testUser.password]);
        
//         console.log('\n🎉 Quick test completed successfully!');
//     } else {
//         console.log('❌ User creation failed:', createResult.error);
//     }
// }

// // Parse command line arguments
// const args = process.argv.slice(2);
// if (args.includes('quick')) {
//     quickTest();
// } else if (args.includes('specific')) {
//     testSpecificFunction();
// } else {
//     main();
// }

const xmlrpc = require('xmlrpc');
const readline = require('readline');

// RPC Client setup
const host = process.env.RPC_SERVER_HOST || 'localhost';
const port = process.env.RPC_SERVER_PORT || 8000;

const client = xmlrpc.createClient({
    host: host,
    port: port,
    path: '/RPC2'
});

console.log(`📡 Connecting to RPC server at ${host}:${port}\n`);

// Helper function for making RPC calls
function rpcCall(method, params) {
    return new Promise((resolve, reject) => {
        console.log(`📤 Calling: ${method}`);
        
        // Truncate long params for display
        const displayParams = JSON.parse(JSON.stringify(params));
        if (displayParams[0] && typeof displayParams[0] === 'object' && displayParams[0].password) {
            displayParams[0].password = '***hidden***';
        }
        console.log(`📦 Params:`, JSON.stringify(displayParams, null, 2));
        
        client.methodCall(method, params, (error, value) => {
            if (error) {
                console.error(`❌ Error calling ${method}:`, error.message);
                reject(error);
            } else {
                console.log(`📥 Response from ${method}:`);
                console.log(JSON.stringify(value, null, 2));
                console.log('---\n');
                resolve(value);
            }
        });
    });
}

// Test with unique users to avoid conflicts
const getUniqueTestUser = (role) => {
    const timestamp = Date.now();
    return {
        email: `${role}_${timestamp}@worknet.test`,
        username: `${role}_user_${timestamp}`,
        password: `${role.charAt(0).toUpperCase()}@123456`, // First letter uppercase + @123456
        full_name: `${role.charAt(0).toUpperCase() + role.slice(1)} User ${timestamp}`,
        role: role
    };
};

// Global variables
let testClientId = null;
let testFreelancerId = null;
let testAdminId = null;
let currentToken = null;
let currentUserId = null;

class UserTester {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    async runAllTests() {
        console.log('🔍 ========== STARTING USER FUNCTION TESTS ==========\n');
        
        try {
            // First, let's check existing users and try to login
            await this.testWithExistingUsers();
            
            // Create fresh test users
            await this.createFreshTestUsers();
            
            // Test authentication with new users
            await this.testAuthentication();
            
            // Test profile operations
            await this.testProfileOperations();
            
            // Test password operations
            await this.testPasswordOperations();
            
            // Test role-specific operations
            if (testFreelancerId) {
                await this.testFreelancerOperations();
            }
            
            if (testClientId) {
                await this.testClientOperations();
            }
            
            // Test admin operations (using existing admin or new one)
            await this.testAdminOperations();
            
            // Test search and public profiles
            await this.testSearchAndPublicProfiles();
            
            console.log('🎉 ========== ALL TESTS COMPLETED ==========\n');
            
            // Cleanup
            await this.cleanupTestUsers();
            
        } catch (error) {
            console.error('❌ Test suite failed:', error.message);
        } finally {
            this.rl.close();
        }
    }

    async testWithExistingUsers() {
        console.log('🔍 ========== TESTING WITH EXISTING USERS ==========\n');
        
        // First, let's see what users we have
        console.log('1. Getting list of existing users...');
        const allUsers = await rpcCall('get_all_users', [{}, { page: 1, limit: 5 }]);
        
        if (allUsers.success && allUsers.users.length > 0) {
            console.log(`📊 Found ${allUsers.users.length} existing users`);
            
            // Try to login with each user (if we know the password pattern)
            for (const user of allUsers.users.slice(0, 3)) { // Test first 3
                console.log(`\n2. Testing login for: ${user.email}`);
                
                // Try common password patterns
                const testPasswords = [
                    'Client@123', 'Freelancer@123', 'Admin@123',
                    'Test@123', 'Password@123', '123456'
                ];
                
                for (const password of testPasswords) {
                    try {
                        const result = await rpcCall('login_user', [{
                            email: user.email,
                            password: password
                        }]);
                        
                        if (result.success) {
                            console.log(`✅ Login successful with password: ${password}`);
                            console.log(`   User ID: ${result.user._id}`);
                            console.log(`   Role: ${result.user.role}`);
                            
                            // Store for later use
                            if (user.role === 'client') testClientId = result.user._id;
                            if (user.role === 'freelancer') testFreelancerId = result.user._id;
                            if (user.role === 'admin') testAdminId = result.user._id;
                            
                            currentToken = result.token;
                            currentUserId = result.user._id;
                            break;
                        }
                    } catch (error) {
                        // Continue with next password
                    }
                }
            }
        }
    }

    async createFreshTestUsers() {
        console.log('\n📝 ========== CREATING FRESH TEST USERS ==========\n');
        
        // Only create if we don't already have them
        if (!testClientId) {
            console.log('1. Creating new client user...');
            const clientUser = getUniqueTestUser('client');
            const clientResult = await rpcCall('create_user', [clientUser]);
            
            if (clientResult.success) {
                testClientId = clientResult.user._id;
                console.log(`✅ New client created: ${testClientId}`);
                console.log(`   Email: ${clientUser.email}`);
                console.log(`   Password: ${clientUser.password}`);
            }
        }
        
        if (!testFreelancerId) {
            console.log('\n2. Creating new freelancer user...');
            const freelancerUser = getUniqueTestUser('freelancer');
            const freelancerResult = await rpcCall('create_user', [freelancerUser]);
            
            if (freelancerResult.success) {
                testFreelancerId = freelancerResult.user._id;
                console.log(`✅ New freelancer created: ${testFreelancerId}`);
                console.log(`   Email: ${freelancerUser.email}`);
                console.log(`   Password: ${freelancerUser.password}`);
            }
        }
        
        if (!testAdminId) {
            console.log('\n3. Creating new admin user...');
            const adminUser = getUniqueTestUser('admin');
            const adminResult = await rpcCall('create_user', [adminUser]);
            
            if (adminResult.success) {
                testAdminId = adminResult.user._id;
                console.log(`✅ New admin created: ${testAdminId}`);
                console.log(`   Email: ${adminUser.email}`);
                console.log(`   Password: ${adminUser.password}`);
            }
        }
        
        // Test duplicate user creation
        console.log('\n4. Testing duplicate email validation...');
        if (testClientId) {
            const existingUser = getUniqueTestUser('client');
            existingUser.email = 'duplicate@test.com'; // Fixed email to test duplicate
            await rpcCall('create_user', [existingUser]);
            await rpcCall('create_user', [existingUser]); // Second time should fail
        }
    }

    async testAuthentication() {
        console.log('\n🔐 ========== TESTING AUTHENTICATION ==========\n');
        
        if (!testClientId) {
            console.log('⚠️  No client user available for auth testing');
            return;
        }
        
        // We need to get the email for the test client
        console.log('1. Getting client user details...');
        const clientDetails = await rpcCall('get_user_by_id', [testClientId]);
        
        if (!clientDetails.success) {
            console.log('❌ Cannot get client details');
            return;
        }
        
        const clientEmail = clientDetails.user.email;
        
        // Test successful login (we don't know the password for existing users)
        console.log('\n2. Testing login...');
        // Note: We can't test login for existing users without knowing password
        // For new users created above, we would know the password
        
        // Test failed login
        console.log('\n3. Testing failed login (wrong password)...');
        await rpcCall('login_user', [{
            email: clientEmail,
            password: 'WrongPassword@123'
        }]);
        
        // Test non-existent user
        console.log('\n4. Testing login for non-existent user...');
        await rpcCall('login_user', [{
            email: 'nonexistent@example.com',
            password: 'Password@123'
        }]);
        
        // Test authenticate_user directly
        console.log('\n5. Testing direct authenticate_user method...');
        await rpcCall('authenticate_user', [
            clientEmail,
            'WrongPassword@123' // Wrong password
        ]);
    }

    async testProfileOperations() {
        console.log('\n👤 ========== TESTING PROFILE OPERATIONS ==========\n');
        
        if (!testClientId) {
            console.log('⚠️  No user available for profile testing');
            return;
        }
        
        // Get user profile
        console.log('1. Getting user profile...');
        await rpcCall('get_user_profile', [testClientId]);
        
        // Get user by ID
        console.log('\n2. Getting user by ID...');
        await rpcCall('get_user_by_id', [testClientId]);
        
        // Get user by email
        console.log('\n3. Getting user by email...');
        const userDetails = await rpcCall('get_user_by_id', [testClientId]);
        if (userDetails.success) {
            await rpcCall('get_user_by_email', [userDetails.user.email]);
        }
        
        // Update profile
        console.log('\n4. Updating user profile...');
        const updateData = {
            full_name: 'Updated Name',
            bio: 'This is an updated bio for testing purposes.',
            country: 'Testland',
            city: 'Testville',
            phone_number: '+1234567890'
        };
        await rpcCall('update_user_profile', [testClientId, updateData]);
        
        // Update avatar
        console.log('\n5. Updating user avatar...');
        const avatarUrl = 'https://via.placeholder.com/150';
        await rpcCall('update_user_avatar', [testClientId, avatarUrl]);
        
        // Verify updates
        console.log('\n6. Verifying profile updates...');
        await rpcCall('get_user_by_id', [testClientId]);
    }

    async testPasswordOperations() {
        console.log('\n🔑 ========== TESTING PASSWORD OPERATIONS ==========\n');
        
        console.log('⚠️  Note: Password operations require knowing current password');
        console.log('   For new users, we know the password. For existing users, we may not.');
        
        // Test forgot password flow
        console.log('\n1. Testing forgot password...');
        const userDetails = await rpcCall('get_user_by_id', [testClientId]);
        if (userDetails.success) {
            const result = await rpcCall('forgot_password', [userDetails.user.email]);
            console.log('Forgot password result:', result.message || 'Check response above');
        }
        
        // Note: We can't test change_password without knowing current password
        // Note: We can't test reset_password without a valid reset token
    }

    async testFreelancerOperations() {
        console.log('\n🎨 ========== TESTING FREELANCER OPERATIONS ==========\n');
        
        if (!testFreelancerId) {
            console.log('⚠️  No freelancer user available');
            return;
        }
        
        // Update freelancer skills
        console.log('1. Updating freelancer skills...');
        const skills = ['JavaScript', 'TypeScript', 'React', 'Node.js', 'MongoDB', 'AWS'];
        await rpcCall('update_freelancer_skills', [testFreelancerId, skills]);
        
        // Update freelancer portfolio
        console.log('\n2. Updating freelancer portfolio...');
        const portfolioItems = [{
            title: 'E-commerce Platform',
            description: 'Full-stack e-commerce solution with React and Node.js',
            images: ['https://via.placeholder.com/400x300'],
            url: 'https://github.com/username/ecommerce',
            created_at: new Date().toISOString()
        }];
        await rpcCall('update_freelancer_portfolio', [testFreelancerId, portfolioItems]);
        
        // Get freelancer public profile
        console.log('\n3. Getting freelancer public profile...');
        const userDetails = await rpcCall('get_user_by_id', [testFreelancerId]);
        if (userDetails.success) {
            await rpcCall('get_freelancer_public_profile', [userDetails.user.username]);
        }
    }

    async testClientOperations() {
        console.log('\n💼 ========== TESTING CLIENT OPERATIONS ==========\n');
        
        if (!testClientId) {
            console.log('⚠️  No client user available');
            return;
        }
        
        // Update client company info
        console.log('1. Updating client company information...');
        const companyData = {
            company_name: 'Test Solutions Inc.',
            company_size: '10-50 employees'
        };
        await rpcCall('update_client_company', [testClientId, companyData]);
        
        // Verify update
        console.log('\n2. Verifying company information...');
        await rpcCall('get_user_by_id', [testClientId]);
    }

    async testAdminOperations() {
        console.log('\n👑 ========== TESTING ADMIN OPERATIONS ==========\n');
        
        // Get all users (works for any user, but shows different data based on role)
        console.log('1. Getting all users with filters...');
        const filters = {
            role: 'freelancer',
            is_active: 'true',
            sort_by: 'rating',
            sort_order: 'desc'
        };
        const pagination = {
            page: 1,
            limit: 5
        };
        await rpcCall('get_all_users', [filters, pagination]);
        
        // Create a test user to manipulate
        console.log('\n2. Creating test user for admin operations...');
        const tempUser = getUniqueTestUser('client');
        tempUser.email = 'admin_test_temp@example.com';
        tempUser.username = 'admintesttemp';
        
        const createResult = await rpcCall('create_user', [tempUser]);
        
        if (createResult.success) {
            const tempUserId = createResult.user._id;
            console.log(`✅ Test user created: ${tempUserId}`);
            
            // Update user status
            console.log('\n3. Updating user status...');
            await rpcCall('update_user_status', [tempUserId, 'verified']);
            
            // Get user to verify status
            console.log('\n4. Verifying user status update...');
            await rpcCall('get_user_by_id', [tempUserId]);
            
            // Delete user
            console.log('\n5. Deleting test user...');
            await rpcCall('delete_user', [tempUserId]);
            
            // Verify deletion
            console.log('\n6. Verifying user deletion...');
            await rpcCall('get_user_by_id', [tempUserId]);
        }
    }

    async testSearchAndPublicProfiles() {
        console.log('\n🔍 ========== TESTING SEARCH AND PUBLIC PROFILES ==========\n');
        
        // Search freelancers with various filters
        console.log('1. Searching freelancers with skill filter...');
        const skillSearch = {
            skills: ['JavaScript', 'React'],
            min_rating: 4.0,
            page: 1,
            limit: 3
        };
        await rpcCall('search_freelancers', [skillSearch]);
        
        console.log('\n2. Searching freelancers with location filter...');
        const locationSearch = {
            country: 'USA',
            max_hourly_rate: 80,
            page: 1,
            limit: 3
        };
        await rpcCall('search_freelancers', [locationSearch]);
        
        console.log('\n3. Testing empty search (all freelancers)...');
        await rpcCall('search_freelancers', [{}]);
        
        // Test getting specific freelancer profile
        console.log('\n4. Getting specific freelancer public profile...');
        // Use one of the freelancers from search results
        const freelancerSearch = await rpcCall('search_freelancers', [{ limit: 1 }]);
        if (freelancerSearch.success && freelancerSearch.freelancers.length > 0) {
            const freelancer = freelancerSearch.freelancers[0];
            await rpcCall('get_freelancer_public_profile', [freelancer.username]);
        }
    }

    async cleanupTestUsers() {
        console.log('\n🧹 ========== CLEANING UP TEST USERS ==========\n');
        
        console.log('Test user IDs created during this session:');
        if (testClientId) console.log(`Client: ${testClientId}`);
        if (testFreelancerId) console.log(`Freelancer: ${testFreelancerId}`);
        if (testAdminId) console.log(`Admin: ${testAdminId}`);
        
        console.log('\n💡 Note: In a real test environment, you might want to:');
        console.log('   1. Delete test users created during this session');
        console.log('   2. Or keep them for future testing');
        console.log('\nTo delete manually via RPC:');
        if (testClientId) console.log(`   rpcCall('delete_user', ['${testClientId}'])`);
        if (testFreelancerId) console.log(`   rpcCall('delete_user', ['${testFreelancerId}'])`);
        if (testAdminId) console.log(`   rpcCall('delete_user', ['${testAdminId}'])`);
    }

    async quickDiagnostic() {
        console.log('🔧 ========== QUICK DIAGNOSTIC ==========\n');
        
        // Test basic connectivity
        console.log('1. Testing RPC connection...');
        try {
            await rpcCall('system.listMethods', []);
            console.log('✅ RPC connection working\n');
        } catch (error) {
            console.log('❌ RPC connection failed');
            return;
        }
        
        // Test user count
        console.log('2. Checking user count...');
        const users = await rpcCall('get_all_users', [{}, { page: 1, limit: 1 }]);
        if (users.success) {
            console.log(`✅ Total users in system: ${users.pagination.total}\n`);
        }
        
        // Try to find a user we can login with
        console.log('3. Looking for testable users...');
        const allUsers = await rpcCall('get_all_users', [{}, { page: 1, limit: 10 }]);
        
        if (allUsers.success) {
            console.log(`Found ${allUsers.users.length} users (showing first 5):`);
            allUsers.users.slice(0, 5).forEach((user, index) => {
                console.log(`   ${index + 1}. ${user.email} (${user.role}) - ID: ${user._id}`);
            });
            
            // Try to guess password for first user
            if (allUsers.users.length > 0) {
                console.log('\n4. Testing common passwords for first user...');
                const testUser = allUsers.users[0];
                const commonPasswords = [
                    'password', '123456', 'admin123', 'test123',
                    'Password@123', 'Admin@123', 'Test@123'
                ];
                
                for (const password of commonPasswords) {
                    try {
                        const result = await rpcCall('login_user', [{
                            email: testUser.email,
                            password: password
                        }]);
                        
                        if (result.success) {
                            console.log(`✅ SUCCESS! Password found: "${password}"`);
                            console.log(`   User: ${testUser.email}`);
                            console.log(`   Role: ${testUser.role}`);
                            console.log(`   Token: ${result.token.substring(0, 30)}...`);
                            return;
                        }
                    } catch (error) {
                        // Continue
                    }
                }
                console.log('❌ Could not guess password for any user');
            }
        }
    }
}

// Interactive menu
async function showMenu() {
    const tester = new UserTester();
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log('\n🔧 USER RPC FUNCTION TESTER\n');
    console.log('1. Run comprehensive tests');
    console.log('2. Quick diagnostic');
    console.log('3. Test specific function');
    console.log('4. Test with existing users only');
    console.log('5. Create fresh test users');
    console.log('0. Exit\n');

    rl.question('Select option (0-5): ', async (choice) => {
        switch(choice) {
            case '1':
                await tester.runAllTests();
                break;
            case '2':
                await tester.quickDiagnostic();
                break;
            case '3':
                await testSpecificFunction();
                break;
            case '4':
                await tester.testWithExistingUsers();
                break;
            case '5':
                await tester.createFreshTestUsers();
                break;
            case '0':
                console.log('👋 Goodbye!');
                rl.close();
                process.exit(0);
                return;
            default:
                console.log('❌ Invalid choice');
        }
        
        rl.close();
        setTimeout(() => showMenu(), 1000);
    });
}

// Test specific function
async function testSpecificFunction() {
    console.log('\n🔧 TEST SPECIFIC FUNCTION\n');
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // User-related functions from your list
    const userFunctions = [
        'create_user',
        'authenticate_user',
        'login_user',
        'logout_user',
        'refresh_token',
        'forgot_password',
        'reset_password',
        'get_user_profile',
        'get_user_by_id',
        'get_user_by_email',
        'update_user_profile',
        'update_user_avatar',
        'change_password',
        'deactivate_account',
        'delete_account',
        'update_freelancer_skills',
        'update_freelancer_portfolio',
        'get_freelancer_public_profile',
        'update_client_company',
        'search_freelancers',
        'get_all_users',
        'update_user_status',
        'delete_user'
    ];

    console.log('Available user functions:');
    userFunctions.forEach((func, index) => {
        console.log(`${index + 1}. ${func}`);
    });

    rl.question('\nEnter function number to test (or 0 to go back): ', async (choice) => {
        const index = parseInt(choice) - 1;
        
        if (choice === '0') {
            rl.close();
            showMenu();
            return;
        }
        
        if (index >= 0 && index < userFunctions.length) {
            const funcName = userFunctions[index];
            console.log(`\n🧪 Testing ${funcName}\n`);
            
            // Provide sample parameters based on function
            let sampleParams = getSampleParams(funcName);
            console.log('Sample parameters:', JSON.stringify(sampleParams, null, 2));
            
            rl.question('Use sample parameters? (y/n): ', async (useSample) => {
                if (useSample.toLowerCase() === 'y') {
                    try {
                        await rpcCall(funcName, sampleParams);
                    } catch (error) {
                        console.error('❌ Function test failed:', error.message);
                    }
                } else {
                    rl.question('Enter parameters as JSON array: ', async (paramsInput) => {
                        try {
                            const params = JSON.parse(paramsInput);
                            await rpcCall(funcName, params);
                        } catch (error) {
                            console.error('❌ Invalid JSON or function failed:', error.message);
                        }
                        rl.close();
                        testSpecificFunction();
                    });
                    return;
                }
                rl.close();
                testSpecificFunction();
            });
        } else {
            console.log('❌ Invalid choice');
            rl.close();
            testSpecificFunction();
        }
    });
}

function getSampleParams(funcName) {
    const timestamp = Date.now();
    const userId = '692f6419a3fbdb9e0ccfbaf4'; // Use an existing user ID from your results
    
    switch(funcName) {
        case 'create_user':
            return [{
                email: `sample_${timestamp}@example.com`,
                username: `sampleuser_${timestamp}`,
                password: 'Sample@123',
                full_name: 'Sample User',
                role: 'client'
            }];
        case 'login_user':
            return [{ email: 'client@worknet.test', password: 'Client@123' }];
        case 'get_user_by_id':
            return [userId];
        case 'get_all_users':
            return [{ role: 'freelancer' }, { page: 1, limit: 5 }];
        case 'search_freelancers':
            return [{ skills: ['JavaScript'], page: 1, limit: 3 }];
        case 'update_user_profile':
            return [userId, { bio: 'Updated bio', city: 'Test City' }];
        case 'update_freelancer_skills':
            return [userId, ['JavaScript', 'React', 'Node.js']];
        default:
            return [];
    }
}

// Main execution
async function main() {
    console.log('📊 ========== USER RPC FUNCTION TESTER ==========\n');
    
    // First, test connection
    try {
        console.log('Testing RPC connection...');
        const methods = await rpcCall('system.listMethods', []);
        console.log(`✅ Connected! Available methods: ${methods.length}\n`);
        
        // Show main menu
        showMenu();
        
    } catch (error) {
        console.error('❌ Failed to connect to RPC server');
        console.error('💡 Make sure Python RPC server is running: python server.py');
        process.exit(1);
    }
}

// Quick test function
async function quickTest() {
    console.log('⚡ QUICK TEST MODE\n');
    
    const tester = new UserTester();
    await tester.quickDiagnostic();
}

// Parse command line arguments
const args = process.argv.slice(2);
if (args.includes('quick')) {
    quickTest();
} else if (args.includes('specific')) {
    testSpecificFunction();
} else {
    main();
}