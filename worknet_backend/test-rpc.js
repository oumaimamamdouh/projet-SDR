// const xmlrpc = require('xmlrpc');

// class RPCTester {
//     constructor() {
//         this.host = process.env.RPC_SERVER_HOST || 'localhost';
//         this.port = process.env.RPC_SERVER_PORT || 8000;
//         this.client = null;
//         this.testResults = [];
//     }

//     connect() {
//         console.log(`\n🔌 Connecting to RPC server at ${this.host}:${this.port}...`);
        
//         try {
//             this.client = xmlrpc.createClient({
//                 host: this.host,
//                 port: this.port,
//                 path: '/RPC2',
//                 timeout: 10000
//             });
            
//             console.log('✅ RPC Client created');
//             return true;
//         } catch (error) {
//             console.log('❌ Failed to create RPC client:', error.message);
//             return false;
//         }
//     }

//     async testMethod(methodName, params = []) {
//         return new Promise((resolve) => {
//             console.log(`\n🧪 Testing: ${methodName}`);
//             console.log(`   Parameters:`, params.length > 0 ? JSON.stringify(params, null, 2) : 'none');
            
//             this.client.methodCall(methodName, params, (error, value) => {
//                 const testResult = {
//                     method: methodName,
//                     timestamp: new Date().toISOString()
//                 };

//                 if (error) {
//                     testResult.status = '❌ FAILED';
//                     testResult.error = error.message || 'Unknown error';
//                     console.log(`   Status: ${testResult.status}`);
//                     console.log(`   Error: ${testResult.error}`);
//                 } else {
//                     testResult.status = '✅ PASSED';
//                     testResult.response = value;
//                     console.log(`   Status: ${testResult.status}`);
                    
//                     if (value && typeof value === 'object') {
//                         console.log(`   Success: ${value.success !== undefined ? value.success : 'N/A'}`);
//                         if (value.error) {
//                             console.log(`   Error message: ${value.error}`);
//                         }
//                         // Show important fields
//                         const importantFields = ['_id', 'user', 'token', 'message', 'count'];
//                         importantFields.forEach(field => {
//                             if (value[field] !== undefined) {
//                                 console.log(`   ${field}: ${typeof value[field] === 'object' ? JSON.stringify(value[field]) : value[field]}`);
//                             }
//                         });
//                     }
//                 }
                
//                 this.testResults.push(testResult);
//                 resolve(testResult);
//             });
//         });
//     }

//     async listMethods() {
//         return new Promise((resolve) => {
//             console.log('\n📋 Listing all RPC methods...');
            
//             this.client.methodCall('system.listMethods', [], (error, methods) => {
//                 if (error) {
//                     console.log('❌ Failed to list methods:', error.message);
//                     resolve([]);
//                 } else {
//                     console.log(`✅ Found ${methods.length} methods`);
                    
//                     // Group methods by service type
//                     const serviceMethods = {};
//                     methods.forEach(method => {
//                         // Extract service name from method (e.g., "create_user" -> "user")
//                         let service = 'other';
//                         if (method.includes('_')) {
//                             const firstPart = method.split('_')[0];
//                             if (['user', 'gig', 'order', 'category', 'favorite', 'message', 'review', 'payment', 'notification', 'system'].includes(firstPart)) {
//                                 service = firstPart;
//                             }
//                         }
                        
//                         if (!serviceMethods[service]) serviceMethods[service] = [];
//                         serviceMethods[service].push(method);
//                     });
                    
//                     // Display by service
//                     Object.entries(serviceMethods).sort((a, b) => b[1].length - a[1].length).forEach(([service, serviceMethods]) => {
//                         if (serviceMethods.length > 0) {
//                             console.log(`\n   ${service.toUpperCase()} (${serviceMethods.length}):`);
//                             serviceMethods.slice(0, 15).forEach(method => {
//                                 console.log(`     • ${method}`);
//                             });
//                             if (serviceMethods.length > 15) {
//                                 console.log(`     ... and ${serviceMethods.length - 15} more`);
//                             }
//                         }
//                     });
                    
//                     resolve(methods);
//                 }
//             });
//         });
//     }

//     async testUserService() {
//         console.log('\n👤 Testing User Service...');
        
//         // Test token validation
//         await this.testMethod('validate_token', ['invalid_token']);
        
//         // Test user creation
//         const testUser = {
//             email: `test${Date.now()}@example.com`,
//             username: `testuser${Date.now()}`,
//             password: 'Test123!',
//             full_name: 'Test User',
//             role: 'freelancer'
//         };
        
//         console.log(`\n📝 Creating test user: ${testUser.email}`);
//         const createResult = await this.testMethod('create_user', [testUser]);
        
//         if (createResult.response && createResult.response.success) {
//             const userId = createResult.response.user._id;
//             console.log(`✅ Test user created with ID: ${userId}`);
            
//             // Test user retrieval
//             await this.testMethod('get_user_by_id', [userId]);
//             await this.testMethod('get_user_by_email', [testUser.email]);
//             await this.testMethod('get_user_profile', [userId]);
            
//             // Test authentication
//             await this.testMethod('authenticate_user', [testUser.email, testUser.password]);
//             await this.testMethod('authenticate_user', [testUser.email, 'wrongpassword']);
            
//             // Test login
//             await this.testMethod('login_user', [{ email: testUser.email, password: testUser.password }]);
            
//             // Test logout
//             await this.testMethod('logout_user', [userId]);
            
//             // Clean up
//             console.log('\n🧹 Cleaning up test user...');
//             await this.testMethod('delete_user', [userId]);
//         }
        
//         // Test other user methods
//         await this.testMethod('get_all_users', [{}, { page: 1, limit: 5 }]);
//         await this.testMethod('search_freelancers', [{}]);
//     }

//     async testOtherServices() {
//         console.log('\n📦 Testing Other Services...');
        
//         // Test category service
//         console.log('\n📁 Category Service:');
//         await this.testMethod('get_all_categories', []);
        
//         // Test gig service  
//         console.log('\n💼 Gig Service:');
//         await this.testMethod('get_all_gigs', []);
//         await this.testMethod('get_featured_gigs', []);
        
//         // Test order service
//         console.log('\n📦 Order Service:');
//         await this.testMethod('get_all_orders', [{}]);
        
//         // Test system methods
//         console.log('\n⚙️ System Methods:');
//         await this.testMethod('system.listMethods', []);
//         await this.testMethod('system.methodHelp', ['system.listMethods']);
//     }

//     async runAllTests() {
//         console.log('='.repeat(70));
//         console.log('🧪 WORKNET RPC SERVER TEST SUITE');
//         console.log('='.repeat(70));
        
//         const startTime = Date.now();
        
//         // Connect to server
//         if (!this.connect()) {
//             console.log('\n❌ Cannot proceed with tests - RPC server not reachable');
//             console.log('💡 Make sure the Python RPC server is running:');
//             console.log(`   python server.py (should be on ${this.host}:${this.port})`);
//             return;
//         }
        
//         // List all methods first
//         console.log('\n📊 STEP 1: Discovering available methods...');
//         const methods = await this.listMethods();
        
//         if (methods.length === 0) {
//             console.log('\n⚠️  No methods found - server may not be responding correctly');
//             return;
//         }
        
//         // Test user service
//         console.log('\n📊 STEP 2: Testing User Service...');
//         await this.testUserService();
        
//         // Test other services
//         console.log('\n📊 STEP 3: Testing Other Services...');
//         await this.testOtherServices();
        
//         // Summary
//         const endTime = Date.now();
//         const duration = ((endTime - startTime) / 1000).toFixed(2);
        
//         console.log('\n' + '='.repeat(70));
//         console.log('📊 TEST SUMMARY');
//         console.log('='.repeat(70));
        
//         const passed = this.testResults.filter(r => r.status === '✅ PASSED').length;
//         const failed = this.testResults.filter(r => r.status === '❌ FAILED').length;
//         const total = this.testResults.length;
        
//         console.log(`Total tests: ${total}`);
//         console.log(`Passed: ${passed} (${total > 0 ? ((passed/total)*100).toFixed(1) : 0}%)`);
//         console.log(`Failed: ${failed} (${total > 0 ? ((failed/total)*100).toFixed(1) : 0}%)`);
//         console.log(`Duration: ${duration} seconds`);
        
//         // Show failed tests
//         if (failed > 0) {
//             console.log('\n❌ FAILED TESTS:');
//             this.testResults
//                 .filter(r => r.status === '❌ FAILED')
//                 .forEach((result, index) => {
//                     console.log(`\n${index + 1}. ${result.method}`);
//                     console.log(`   Error: ${result.error}`);
                    
//                     // Provide troubleshooting tips
//                     if (result.error.includes('not supported')) {
//                         console.log(`   💡 Tip: Method might not be registered in Python server`);
//                     } else if (result.error.includes('ECONN')) {
//                         console.log(`   💡 Tip: Connection issue - check if Python server is running`);
//                     }
//                 });
//         }
        
//         // Group results by service
//         console.log('\n📈 RESULTS BY SERVICE:');
//         const serviceResults = {};
//         this.testResults.forEach(result => {
//             const method = result.method;
//             let service = 'other';
            
//             if (method.startsWith('system.')) service = 'system';
//             else if (method.includes('user')) service = 'user';
//             else if (method.includes('gig')) service = 'gig';
//             else if (method.includes('order')) service = 'order';
//             else if (method.includes('category')) service = 'category';
            
//             if (!serviceResults[service]) serviceResults[service] = { total: 0, passed: 0 };
//             serviceResults[service].total++;
//             if (result.status === '✅ PASSED') serviceResults[service].passed++;
//         });
        
//         Object.entries(serviceResults).forEach(([service, stats]) => {
//             const percentage = stats.total > 0 ? ((stats.passed / stats.total) * 100).toFixed(1) : 0;
//             console.log(`   ${service.padEnd(10)}: ${stats.passed}/${stats.total} (${percentage}%)`);
//         });
        
//         // Recommendations
//         console.log('\n💡 RECOMMENDATIONS:');
//         const successRate = total > 0 ? (passed / total) * 100 : 0;
        
//         if (successRate === 100) {
//             console.log('   ✅ Excellent! All tests passed. Your RPC setup is working perfectly.');
//         } else if (successRate >= 80) {
//             console.log('   ⚠️  Good! Most tests passed. Check the failed tests above.');
//         } else if (successRate >= 50) {
//             console.log('   ⚠️  Fair! Some tests passed. Review your RPC method registrations.');
//         } else {
//             console.log('   ❌ Needs improvement! Many tests failed.');
//             console.log('   1. Check Python RPC server logs for errors');
//             console.log('   2. Verify method names match exactly');
//             console.log('   3. Check database connection in Python server');
//         }
        
//         console.log('\n🔗 RPC Server URL:', `http://${this.host}:${this.port}/RPC2`);
//         console.log('⏰ Test completed at:', new Date().toLocaleString());
//         console.log('='.repeat(70));
//     }

//     async quickTest() {
//         console.log('\n⚡ Quick Connection Test...');
        
//         if (!this.connect()) {
//             console.log('❌ Failed to connect');
//             return false;
//         }
        
//         // Just test a few basic methods
//         await this.testMethod('system.listMethods', []);
//         await this.testMethod('get_all_categories', []);
        
//         const passed = this.testResults.filter(r => r.status === '✅ PASSED').length;
//         return passed === 2;
//     }
// }

// // Run the tests
// if (require.main === module) {
//     const tester = new RPCTester();
    
//     // Handle command line arguments
//     const args = process.argv.slice(2);
    
//     if (args.includes('--help') || args.includes('-h')) {
//         console.log('\nUsage: node test-rpc.js [options]');
//         console.log('\nOptions:');
//         console.log('  --host <host>     RPC server host (default: localhost)');
//         console.log('  --port <port>     RPC server port (default: 8000)');
//         console.log('  --quick           Run only quick connection test');
//         console.log('  --list            List all methods only');
//         console.log('  --help, -h        Show this help');
//         process.exit(0);
//     }
    
//     // Parse command line arguments
//     const hostIndex = args.indexOf('--host');
//     const portIndex = args.indexOf('--port');
    
//     if (hostIndex !== -1) {
//         tester.host = args[hostIndex + 1];
//     }
    
//     if (portIndex !== -1) {
//         tester.port = parseInt(args[portIndex + 1]);
//     }
    
//     console.log(`🎯 Target RPC Server: ${tester.host}:${tester.port}`);
    
//     // Run based on arguments
//     if (args.includes('--list')) {
//         tester.connect();
//         tester.listMethods().then(() => {
//             console.log('\n✅ Method listing complete');
//             process.exit(0);
//         }).catch(error => {
//             console.error('❌ Error:', error);
//             process.exit(1);
//         });
//     } else if (args.includes('--quick')) {
//         console.log('\n🔍 Running quick connection test...');
//         tester.quickTest().then(success => {
//             if (success) {
//                 console.log('\n✅ Quick test passed!');
//                 process.exit(0);
//             } else {
//                 console.log('\n❌ Quick test failed');
//                 process.exit(1);
//             }
//         }).catch(error => {
//             console.error('❌ Error:', error);
//             process.exit(1);
//         });
//     } else {
//         // Run all tests
//         tester.runAllTests().catch(error => {
//             console.error('\n💥 Unexpected error:', error);
//             process.exit(1);
//         });
//     }
// }

// module.exports = RPCTester;

const xmlrpc = require('xmlrpc');

class UserServiceTester {
    constructor() {
        this.host = process.env.RPC_SERVER_HOST || 'localhost';
        this.port = process.env.RPC_SERVER_PORT || 8000;
        this.client = null;
        this.testResults = [];
        this.createdTestUserId = null;
    }

    connect() {
        console.log(`\n🔌 Connecting to RPC server at ${this.host}:${this.port}...`);
        
        try {
            this.client = xmlrpc.createClient({
                host: this.host,
                port: this.port,
                path: '/RPC2',
                timeout: 10000
            });
            
            console.log('✅ RPC Client created');
            return true;
        } catch (error) {
            console.log('❌ Failed to create RPC client:', error.message);
            return false;
        }
    }

    async callMethod(methodName, params = []) {
        return new Promise((resolve, reject) => {
            console.log(`\n📤 Calling: ${methodName}`);
            if (params.length > 0) {
                console.log(`   Params:`, JSON.stringify(params, null, 2));
            }
            
            this.client.methodCall(methodName, params, (error, value) => {
                if (error) {
                    console.log(`   ❌ Error: ${error.message}`);
                    reject(error);
                } else {
                    console.log(`   ✅ Response:`, JSON.stringify(value, null, 2));
                    resolve(value);
                }
            });
        });
    }

    async testUserCreation() {
        console.log('\n👤 TEST 1: User Creation');
        console.log('='.repeat(50));
        
        const testUser = {
            email: `test${Date.now()}@example.com`,
            username: `testuser${Date.now()}`,
            password: 'Test123!',
            full_name: 'Test User',
            role: 'freelancer',
            country: 'Test Country',
            city: 'Test City',
            bio: 'This is a test user'
        };
        
        try {
            const result = await this.callMethod('create_user', [testUser]);
            
            if (result.success) {
                this.createdTestUserId = result.user._id;
                console.log(`✅ User created successfully!`);
                console.log(`   User ID: ${this.createdTestUserId}`);
                console.log(`   Email: ${result.user.email}`);
                console.log(`   Username: ${result.user.username}`);
                return true;
            } else {
                console.log(`❌ User creation failed: ${result.error}`);
                return false;
            }
        } catch (error) {
            console.log(`❌ Error creating user: ${error.message}`);
            return false;
        }
    }

    async testUserRetrieval() {
        if (!this.createdTestUserId) {
            console.log('⚠️  Skipping user retrieval test - no user created');
            return false;
        }
        
        console.log('\n🔍 TEST 2: User Retrieval');
        console.log('='.repeat(50));
        
        // Test get_user_by_id
        console.log('\n📋 Getting user by ID...');
        try {
            const result = await this.callMethod('get_user_by_id', [this.createdTestUserId]);
            if (result.success) {
                console.log(`✅ User retrieved by ID`);
                console.log(`   Name: ${result.user.full_name}`);
                console.log(`   Role: ${result.user.role}`);
            } else {
                console.log(`❌ Failed: ${result.error}`);
            }
        } catch (error) {
            console.log(`❌ Error: ${error.message}`);
        }
        
        // Test get_user_profile (alias for get_user_by_id)
        console.log('\n📋 Getting user profile...');
        try {
            const result = await this.callMethod('get_user_profile', [this.createdTestUserId]);
            if (result.success) {
                console.log(`✅ User profile retrieved`);
            } else {
                console.log(`❌ Failed: ${result.error}`);
            }
        } catch (error) {
            console.log(`❌ Error: ${error.message}`);
        }
    }

    async testAuthentication() {
        if (!this.createdTestUserId) {
            console.log('⚠️  Skipping authentication test - no user created');
            return false;
        }
        
        console.log('\n🔐 TEST 3: Authentication');
        console.log('='.repeat(50));
        
        // Test authenticate_user
        console.log('\n🔑 Testing authenticate_user...');
        try {
            // const result = await this.callMethod('authenticate_user', ['test@example.com', 'Test123!']);
            const result = await this.callMethod('authenticate_user', [testUser.email, 'Test123!']);

            console.log(`Result:`, result.success ? '✅ Success' : `❌ Failed: ${result.error}`);
        } catch (error) {
            console.log(`❌ Error: ${error.message}`);
        }
        
        // Test login_user
        console.log('\n🔑 Testing login_user...');
        try {
            const credentials = {
                email: `test${Date.now()}@example.com`,
                password: 'Test123!'
            };
            const result = await this.callMethod('login_user', [credentials]);
            if (result.success) {
                console.log(`✅ Login successful!`);
                console.log(`   Token received: ${result.token ? 'Yes' : 'No'}`);
                console.log(`   Refresh token: ${result.refresh_token ? 'Yes' : 'No'}`);
            } else {
                console.log(`❌ Login failed: ${result.error}`);
            }
        } catch (error) {
            console.log(`❌ Error: ${error.message}`);
        }
    }

    async testUpdateOperations() {
        if (!this.createdTestUserId) {
            console.log('⚠️  Skipping update test - no user created');
            return false;
        }
        
        console.log('\n🔄 TEST 4: Update Operations');
        console.log('='.repeat(50));
        
        // Test update_user_profile
        console.log('\n📝 Updating user profile...');
        try {
            const updateData = {
                bio: 'Updated bio text',
                city: 'Updated City',
                country: 'Updated Country'
            };
            
            const result = await this.callMethod('update_user_profile', [this.createdTestUserId, updateData]);
            if (result.success) {
                console.log(`✅ Profile updated successfully`);
                console.log(`   New bio: ${result.user.bio}`);
                console.log(`   New city: ${result.user.city}`);
            } else {
                console.log(`❌ Failed: ${result.error}`);
            }
        } catch (error) {
            console.log(`❌ Error: ${error.message}`);
        }
        
        // Test update_user_avatar
        console.log('\n🖼️  Updating user avatar...');
        try {
            const imageUrl = 'https://example.com/avatar.jpg';
            const result = await this.callMethod('update_user_avatar', [this.createdTestUserId, imageUrl]);
            console.log(result.success ? `✅ Avatar updated` : `❌ Failed: ${result.error}`);
        } catch (error) {
            console.log(`❌ Error: ${error.message}`);
        }
        
        // Test change_password
        console.log('\n🔐 Changing password...');
        try {
            const result = await this.callMethod('change_password', [this.createdTestUserId, 'Test123!', 'NewTest123!']);
            console.log(result.success ? `✅ Password changed` : `❌ Failed: ${result.error}`);
        } catch (error) {
            console.log(`❌ Error: ${error.message}`);
        }
    }

    async testAdminOperations() {
        console.log('\n👑 TEST 5: Admin Operations');
        console.log('='.repeat(50));
        
        // Test get_all_users
        console.log('\n👥 Getting all users...');
        try {
            const filters = { role: 'freelancer' };
            const pagination = { page: 1, limit: 5 };
            
            const result = await this.callMethod('get_all_users', [filters, pagination]);
            if (result.success) {
                console.log(`✅ Retrieved ${result.users.length} users`);
                console.log(`   Total users: ${result.pagination.total}`);
                console.log(`   Page: ${result.pagination.page}/${result.pagination.pages}`);
            } else {
                console.log(`❌ Failed: ${result.error}`);
            }
        } catch (error) {
            console.log(`❌ Error: ${error.message}`);
        }
        
        // Test search_freelancers
        console.log('\n🔍 Searching freelancers...');
        try {
            const filters = { skills: ['python', 'javascript'] };
            const result = await this.callMethod('search_freelancers', [filters]);
            if (result.success) {
                console.log(`✅ Found ${result.freelancers.length} freelancers`);
                console.log(`   Pagination: Page ${result.pagination.page}`);
            } else {
                console.log(`❌ Failed: ${result.error}`);
            }
        } catch (error) {
            console.log(`❌ Error: ${error.message}`);
        }
        
        // Test get_freelancer_public_profile
        console.log('\n👤 Getting freelancer public profile...');
        try {
            // This would need an actual username
            const result = await this.callMethod('get_freelancer_public_profile', ['testusername']);
            console.log(result.success ? `✅ Profile retrieved` : `❌ Failed: ${result.error}`);
        } catch (error) {
            console.log(`❌ Error: ${error.message}`);
        }
    }

    async testTokenOperations() {
        console.log('\n🔐 TEST 6: Token Operations');
        console.log('='.repeat(50));
        
        // Test validate_token
        console.log('\n✅ Testing token validation...');
        try {
            const result = await this.callMethod('validate_token', ['invalid_token_string']);
            console.log(`Result:`, result.success ? `✅ Token valid` : `❌ Token invalid: ${result.error}`);
        } catch (error) {
            console.log(`❌ Error: ${error.message}`);
        }
        
        // Test forgot_password
        console.log('\n📧 Testing forgot password...');
        try {
            const result = await this.callMethod('forgot_password', ['test@example.com']);
            console.log(result.success ? `✅ Password reset initiated` : `❌ Failed: ${result.error}`);
        } catch (error) {
            console.log(`❌ Error: ${error.message}`);
        }
        
        // Test refresh_token (would need actual refresh token)
        console.log('\n🔄 Testing refresh token...');
        try {
            const result = await this.callMethod('refresh_token', ['invalid_refresh_token']);
            console.log(result.success ? `✅ Token refreshed` : `❌ Failed: ${result.error}`);
        } catch (error) {
            console.log(`❌ Error: ${error.message}`);
        }
    }

    async testFreelancerOperations() {
        if (!this.createdTestUserId) {
            console.log('⚠️  Skipping freelancer test - no user created');
            return false;
        }
        
        console.log('\n💼 TEST 7: Freelancer Operations');
        console.log('='.repeat(50));
        
        // Test update_freelancer_skills
        console.log('\n🛠️  Updating freelancer skills...');
        try {
            const skills = ['Python', 'JavaScript', 'React', 'Node.js', 'MongoDB'];
            const result = await this.callMethod('update_freelancer_skills', [this.createdTestUserId, skills]);
            console.log(result.success ? `✅ Skills updated: ${result.skills.join(', ')}` : `❌ Failed: ${result.error}`);
        } catch (error) {
            console.log(`❌ Error: ${error.message}`);
        }
        
        // Test update_freelancer_portfolio
        console.log('\n📁 Updating freelancer portfolio...');
        try {
            const portfolioItems = [
                {
                    title: 'Test Project 1',
                    description: 'A test project description',
                    url: 'https://example.com/project1'
                },
                {
                    title: 'Test Project 2', 
                    description: 'Another test project',
                    url: 'https://example.com/project2'
                }
            ];
            const result = await this.callMethod('update_freelancer_portfolio', [this.createdTestUserId, portfolioItems]);
            console.log(result.success ? `✅ Portfolio updated` : `❌ Failed: ${result.error}`);
        } catch (error) {
            console.log(`❌ Error: ${error.message}`);
        }
    }

    async testCleanup() {
        if (!this.createdTestUserId) {
            console.log('⚠️  No test user to cleanup');
            return;
        }
        
        console.log('\n🧹 TEST 8: Cleanup');
        console.log('='.repeat(50));
        
        // Test delete_user (admin)
        console.log('\n🗑️  Deleting test user...');
        try {
            const result = await this.callMethod('delete_user', [this.createdTestUserId]);
            if (result.success) {
                console.log(`✅ Test user deleted successfully`);
                this.createdTestUserId = null;
            } else {
                console.log(`❌ Failed to delete user: ${result.error}`);
            }
        } catch (error) {
            console.log(`❌ Error: ${error.message}`);
        }
        
        // Test delete_account (self)
        console.log('\n🗑️  Testing delete_account...');
        try {
            const result = await this.callMethod('delete_account', [this.createdTestUserId]);
            console.log(result.success ? `✅ Account deleted` : `❌ Failed: ${result.error}`);
        } catch (error) {
            console.log(`❌ Error: ${error.message}`);
        }
        
        // Test deactivate_account
        console.log('\n⏸️  Testing deactivate_account...');
        try {
            const result = await this.callMethod('deactivate_account', [this.createdTestUserId]);
            console.log(result.success ? `✅ Account deactivated` : `❌ Failed: ${result.error}`);
        } catch (error) {
            console.log(`❌ Error: ${error.message}`);
        }
    }

    async runAllUserTests() {
        console.log('='.repeat(70));
        console.log('🧪 USER SERVICE TEST SUITE');
        console.log('='.repeat(70));
        
        const startTime = Date.now();
        
        // Connect to server
        if (!this.connect()) {
            console.log('\n❌ Cannot proceed with tests - RPC server not reachable');
            return;
        }
        
        console.log('\n🚀 Starting User Service Tests...');
        
        // Run tests in sequence
        await this.testUserCreation();
        await this.testUserRetrieval();
        await this.testAuthentication();
        await this.testUpdateOperations();
        await this.testAdminOperations();
        await this.testTokenOperations();
        await this.testFreelancerOperations();
        await this.testCleanup();
        
        // Summary
        const endTime = Date.now();
        const duration = ((endTime - startTime) / 1000).toFixed(2);
        
        console.log('\n' + '='.repeat(70));
        console.log('📊 USER SERVICE TEST COMPLETE');
        console.log('='.repeat(70));
        console.log(`⏱️  Total duration: ${duration} seconds`);
        
        if (this.createdTestUserId) {
            console.log(`⚠️  Note: Test user ${this.createdTestUserId} was created but not deleted`);
            console.log(`   You may want to delete it manually`);
        }
        
        console.log('\n🔗 RPC Server:', `http://${this.host}:${this.port}/RPC2`);
        console.log('✅ User Service Test Complete!');
        console.log('='.repeat(70));
    }

    async runQuickTest() {
        console.log('\n⚡ Quick User Service Test');
        console.log('='.repeat(50));
        
        if (!this.connect()) {
            return false;
        }
        
        try {
            // Just test basic methods
            console.log('\n1️⃣ Testing create_user...');
            const testUser = {
                email: `quicktest${Date.now()}@example.com`,
                username: `quickuser${Date.now()}`,
                password: 'Test123!',
                full_name: 'Quick Test User',
                role: 'client'
            };
            
            const createResult = await this.callMethod('create_user', [testUser]);
            
            if (createResult.success) {
                const userId = createResult.user._id;
                console.log(`✅ User created: ${userId}`);
                
                // Test get_user_by_id
                console.log('\n2️⃣ Testing get_user_by_id...');
                const getResult = await this.callMethod('get_user_by_id', [userId]);
                console.log(getResult.success ? '✅ User retrieved' : '❌ Failed');
                
                // Test get_all_users
                console.log('\n3️⃣ Testing get_all_users...');
                const allUsersResult = await this.callMethod('get_all_users', [{}, { page: 1, limit: 3 }]);
                console.log(allUsersResult.success ? '✅ Users listed' : '❌ Failed');
                
                // Cleanup
                console.log('\n4️⃣ Cleaning up...');
                await this.callMethod('delete_user', [userId]);
                console.log('✅ Test user deleted');
                
                return true;
            } else {
                console.log('❌ User creation failed');
                return false;
            }
        } catch (error) {
            console.log(`❌ Error: ${error.message}`);
            return false;
        }
    }
}

// Run the tests
if (require.main === module) {
    const tester = new UserServiceTester();
    
    // Handle command line arguments
    const args = process.argv.slice(2);
    
    if (args.includes('--help') || args.includes('-h')) {
        console.log('\nUsage: node test-rpc.js [options]');
        console.log('\nOptions:');
        console.log('  --host <host>     RPC server host (default: localhost)');
        console.log('  --port <port>     RPC server port (default: 8000)');
        console.log('  --quick           Run only quick test');
        console.log('  --help, -h        Show this help');
        process.exit(0);
    }
    
    // Parse command line arguments
    const hostIndex = args.indexOf('--host');
    const portIndex = args.indexOf('--port');
    
    if (hostIndex !== -1) {
        tester.host = args[hostIndex + 1];
    }
    
    if (portIndex !== -1) {
        tester.port = parseInt(args[portIndex + 1]);
    }
    
    console.log(`🎯 Target RPC Server: ${tester.host}:${tester.port}`);
    
    // Run based on arguments
    if (args.includes('--quick')) {
        console.log('\n🔍 Running quick user service test...');
        tester.runQuickTest().then(success => {
            if (success) {
                console.log('\n✅ Quick test passed!');
                process.exit(0);
            } else {
                console.log('\n❌ Quick test failed');
                process.exit(1);
            }
        }).catch(error => {
            console.error('❌ Error:', error);
            process.exit(1);
        });
    } else {
        // Run all user tests
        tester.runAllUserTests().catch(error => {
            console.error('\n💥 Unexpected error:', error);
            process.exit(1);
        });
    }
}

module.exports = UserServiceTester;