// const axios = require('axios');
// const { v4: uuidv4 } = require('uuid');

// // Configuration
// const BASE_URL = 'http://localhost:5000/api';
// const TEST_USER = {
//     email: 'sadik@example.com',
//     password: 'pwd12345'
// };

// let authToken = '';
// let testGigId = '';
// let testGigSlug = '';
// let testUserId = '';

// // Helper function to create delay
// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// // Test runner
// async function runTests() {
//     console.log('🚀 Starting Gig Endpoints Tests\n');
    
//     try {
//         // Step 1: Login
//         await testLogin();
        
//         // Step 2: Run public gig tests
//         await testPublicEndpoints();
        
//         // Step 3: Run freelancer gig tests
//         await testFreelancerEndpoints();
        
//         // Step 4: Run admin gig tests (if admin token available)
//         // await testAdminEndpoints();
        
//         console.log('\n✅ All tests completed!');
//     } catch (error) {
//         console.error('\n❌ Test suite failed:', error.message);
//         process.exit(1);
//     }
// }

// // Test 1: Login
// async function testLogin() {
//     console.log('🔐 Test 1: User Login');
    
//     try {
//         const response = await axios.post(`${BASE_URL}/users/login`, TEST_USER);
        
//         if (response.data.success && response.data.token) {
//             authToken = response.data.token;
//             testUserId = response.data.data._id;
//             console.log('✅ Login successful');
//             console.log(`   Token: ${authToken.substring(0, 20)}...`);
//             console.log(`   User ID: ${testUserId}`);
//         } else {
//             throw new Error('Login failed - no token received');
//         }
//     } catch (error) {
//         console.error('❌ Login failed:', error.response?.data || error.message);
//         throw error;
//     }
// }

// // Test 2: Public endpoints
// async function testPublicEndpoints() {
//     console.log('\n🌐 Test 2: Public Gig Endpoints');
    
//     // 2.1: Get all gigs
//     await testGetAllGigs();
    
//     // 2.2: Search gigs
//     await testSearchGigs();
    
//     // 2.3: Get featured gigs
//     await testGetFeaturedGigs();
    
//     // 2.4: Get gig by slug (if we have a slug)
//     if (testGigSlug) {
//         await testGetGigBySlug();
//     }
    
//     // 2.5: Get gig reviews (if we have a gig ID)
//     if (testGigId) {
//         await testGetGigReviews();
//     }
// }

// // Test 2.1: Get all gigs
// async function testGetAllGigs() {
//     console.log('\n   📋 2.1: Get all gigs');
    
//     try {
//         const response = await axios.get(`${BASE_URL}/gigs`, {
//             params: {
//                 page: 1,
//                 limit: 5,
//                 sort_by: 'created_at',
//                 sort_order: 'desc'
//             }
//         });
        
//         console.log(`   ✅ Success - Found ${response.data.count} gigs`);
        
//         if (response.data.data && response.data.data.length > 0) {
//             testGigId = response.data.data[0]._id;
//             testGigSlug = response.data.data[0].slug;
//             console.log(`   📌 First gig ID: ${testGigId}`);
//             console.log(`   📌 First gig slug: ${testGigSlug}`);
//         }
//     } catch (error) {
//         console.error('   ❌ Failed:', error.response?.data || error.message);
//     }
// }

// // Test 2.2: Search gigs
// async function testSearchGigs() {
//     console.log('\n   🔍 2.2: Search gigs');
    
//     try {
//         const response = await axios.get(`${BASE_URL}/gigs/search`, {
//             params: {
//                 q: 'design',
//                 page: 1,
//                 limit: 3
//             }
//         });
        
//         console.log(`   ✅ Success - Found ${response.data.count} gigs for "design"`);
//     } catch (error) {
//         console.error('   ❌ Failed:', error.response?.data || error.message);
//     }
// }

// // Test 2.3: Get featured gigs
// async function testGetFeaturedGigs() {
//     console.log('\n   ⭐ 2.3: Get featured gigs');
    
//     try {
//         const response = await axios.get(`${BASE_URL}/gigs/featured`);
        
//         console.log(`   ✅ Success - Found ${response.data.count} featured gigs`);
//     } catch (error) {
//         console.error('   ❌ Failed:', error.response?.data || error.message);
//     }
// }

// // Test 2.4: Get gig by slug
// async function testGetGigBySlug() {
//     console.log(`\n   📄 2.4: Get gig by slug: ${testGigSlug}`);
    
//     try {
//         const response = await axios.get(`${BASE_URL}/gigs/slug/${testGigSlug}`);
        
//         console.log(`   ✅ Success - Found gig: ${response.data.data.title}`);
//     } catch (error) {
//         console.error('   ❌ Failed:', error.response?.data || error.message);
//     }
// }

// // Test 2.5: Get gig by ID
// async function testGetGigById() {
//     console.log(`\n   🆔 2.5: Get gig by ID: ${testGigId}`);
    
//     try {
//         const response = await axios.get(`${BASE_URL}/gigs/${testGigId}`);
        
//         console.log(`   ✅ Success - Found gig: ${response.data.data.title}`);
//     } catch (error) {
//         console.error('   ❌ Failed:', error.response?.data || error.message);
//     }
// }

// // Test 2.6: Get gig reviews
// async function testGetGigReviews() {
//     console.log(`\n   ⭐ 2.6: Get gig reviews for gig: ${testGigId}`);
    
//     try {
//         const response = await axios.get(`${BASE_URL}/gigs/${testGigId}/reviews`, {
//             params: {
//                 page: 1,
//                 limit: 5
//             }
//         });
        
//         console.log(`   ✅ Success - Found ${response.data.count} reviews`);
//     } catch (error) {
//         console.error('   ❌ Failed:', error.response?.data || error.message);
//     }
// }

// // Test 2.7: Get related gigs
// async function testGetRelatedGigs() {
//     console.log(`\n   🔗 2.7: Get related gigs for gig: ${testGigId}`);
    
//     try {
//         const response = await axios.get(`${BASE_URL}/gigs/${testGigId}/related`);
        
//         console.log(`   ✅ Success - Found ${response.data.count} related gigs`);
//     } catch (error) {
//         console.error('   ❌ Failed:', error.response?.data || error.message);
//     }
// }

// // Test 3: Freelancer endpoints
// async function testFreelancerEndpoints() {
//     console.log('\n👨‍💼 Test 3: Freelancer Gig Endpoints');
    
//     // 3.1: Create a new gig
//     await testCreateGig();
    
//     await delay(1000); // Wait for gig to be created
    
//     // 3.2: Get my gigs
//     await testGetMyGigs();
    
//     // 3.3: Update gig
//     if (testGigId) {
//         await testUpdateGig();
//     }
    
//     // 3.4: Toggle gig status
//     if (testGigId) {
//         await testToggleGigStatus();
//     }
    
//     // 3.5: Delete gig (cleanup)
//     if (testGigId) {
//         await testDeleteGig();
//     }
// }

// // Test 3.1: Create gig
// async function testCreateGig() {
//     console.log('\n   🆕 3.1: Create new gig');
    
//     const uniqueTitle = `Test Gig ${uuidv4().substring(0, 8)}`;
    
//     const gigData = {
//         title: uniqueTitle,
//         description: 'This is a test gig created for testing purposes. We provide high-quality services.',
//         category_id: '65d5f8a9b8c9d12345678901', // You need a real category ID
//         base_price: 99.99,
//         delivery_days: 7,
//         pricing_type: 'fixed',
//         revisions_included: 2,
//         currency: 'USD',
//         search_tags: ['test', 'design', 'development'],
//         package_details: 'Basic package includes X, Y, Z',
//         requirements_description: 'Please provide project details',
//         images_url: [
//             'https://example.com/image1.jpg',
//             'https://example.com/image2.jpg'
//         ],
//         status: 'draft'
//     };
    
//     try {
//         const response = await axios.post(`${BASE_URL}/gigs`, gigData, {
//             headers: {
//                 'Authorization': `Bearer ${authToken}`
//             }
//         });
        
//         testGigId = response.data.data._id;
//         testGigSlug = response.data.data.slug;
        
//         console.log(`   ✅ Gig created successfully`);
//         console.log(`   📌 Gig ID: ${testGigId}`);
//         console.log(`   📌 Gig Title: ${response.data.data.title}`);
//         console.log(`   📌 Gig Slug: ${testGigSlug}`);
//     } catch (error) {
//         console.error('   ❌ Failed:', error.response?.data || error.message);
        
//         // If creation fails, try to get an existing gig for the user
//         await testGetMyGigs();
//     }
// }

// // Test 3.2: Get my gigs
// async function testGetMyGigs() {
//     console.log('\n   📚 3.2: Get my gigs');
    
//     try {
//         const response = await axios.get(`${BASE_URL}/gigs/my-gigs`, {
//             headers: {
//                 'Authorization': `Bearer ${authToken}`
//             },
//             params: {
//                 page: 1,
//                 limit: 10
//             }
//         });
        
//         console.log(`   ✅ Success - Found ${response.data.count} of my gigs`);
        
//         // If we don't have a gig ID yet, use the first one
//         if (!testGigId && response.data.data && response.data.data.length > 0) {
//             testGigId = response.data.data[0]._id;
//             testGigSlug = response.data.data[0].slug;
//             console.log(`   📌 Using gig ID: ${testGigId}`);
//         }
//     } catch (error) {
//         console.error('   ❌ Failed:', error.response?.data || error.message);
//     }
// }

// // Test 3.3: Update gig
// async function testUpdateGig() {
//     console.log(`\n   ✏️  3.3: Update gig: ${testGigId}`);
    
//     const updateData = {
//         description: 'Updated description for testing purposes. Now with more features!',
//         base_price: 149.99,
//         delivery_days: 5,
//         search_tags: ['test', 'design', 'development', 'updated']
//     };
    
//     try {
//         const response = await axios.put(`${BASE_URL}/gigs/${testGigId}`, updateData, {
//             headers: {
//                 'Authorization': `Bearer ${authToken}`
//             }
//         });
        
//         console.log(`   ✅ Gig updated successfully`);
//         console.log(`   📌 New price: $${response.data.data.base_price}`);
//         console.log(`   📌 Delivery days: ${response.data.data.delivery_days}`);
//     } catch (error) {
//         console.error('   ❌ Failed:', error.response?.data || error.message);
//     }
// }

// // Test 3.4: Toggle gig status
// async function testToggleGigStatus() {
//     console.log(`\n   🔄 3.4: Toggle gig status: ${testGigId}`);
    
//     try {
//         // First, get current status
//         const getResponse = await axios.get(`${BASE_URL}/gigs/${testGigId}`, {
//             headers: {
//                 'Authorization': `Bearer ${authToken}`
//             }
//         });
        
//         const currentStatus = getResponse.data.data.status;
//         const newStatus = currentStatus === 'active' ? 'paused' : 'active';
        
//         console.log(`   📌 Current status: ${currentStatus}`);
//         console.log(`   📌 Changing to: ${newStatus}`);
        
//         // Update status
//         const response = await axios.patch(`${BASE_URL}/gigs/${testGigId}/status`, {
//             status: newStatus
//         }, {
//             headers: {
//                 'Authorization': `Bearer ${authToken}`
//             }
//         });
        
//         console.log(`   ✅ Status changed to: ${response.data.data.status}`);
        
//         // Change back to original for testing
//         await delay(500);
//         await axios.patch(`${BASE_URL}/gigs/${testGigId}/status`, {
//             status: currentStatus
//         }, {
//             headers: {
//                 'Authorization': `Bearer ${authToken}`
//             }
//         });
        
//     } catch (error) {
//         console.error('   ❌ Failed:', error.response?.data || error.message);
//     }
// }

// // Test 3.5: Update gig images
// async function testUpdateGigImages() {
//     console.log(`\n   🖼️  3.5: Update gig images: ${testGigId}`);
    
//     const newImages = [
//         'https://example.com/updated-image1.jpg',
//         'https://example.com/updated-image2.jpg',
//         'https://example.com/updated-image3.jpg'
//     ];
    
//     try {
//         const response = await axios.put(`${BASE_URL}/gigs/${testGigId}/images`, {
//             images: newImages
//         }, {
//             headers: {
//                 'Authorization': `Bearer ${authToken}`
//             }
//         });
        
//         console.log(`   ✅ Images updated successfully`);
//         console.log(`   📌 Now has ${response.data.data.images_url.length} images`);
//     } catch (error) {
//         console.error('   ❌ Failed:', error.response?.data || error.message);
//     }
// }

// // Test 3.6: Get gig analytics
// async function testGetGigAnalytics() {
//     console.log(`\n   📊 3.6: Get gig analytics: ${testGigId}`);
    
//     try {
//         const response = await axios.get(`${BASE_URL}/gigs/${testGigId}/analytics`, {
//             headers: {
//                 'Authorization': `Bearer ${authToken}`
//             }
//         });
        
//         console.log(`   ✅ Analytics retrieved successfully`);
        
//         if (response.data.data.gig_stats) {
//             const stats = response.data.data.gig_stats;
//             console.log(`   📊 Stats:`);
//             console.log(`      Total Orders: ${stats.total_orders}`);
//             console.log(`      Total Earning: $${stats.total_earning}`);
//             console.log(`      Gig Rating: ${stats.gig_rating}`);
//             console.log(`      Gig Reviews: ${stats.gig_reviews}`);
//         }
//     } catch (error) {
//         console.error('   ❌ Failed:', error.response?.data || error.message);
//     }
// }

// // Test 3.7: Delete gig
// async function testDeleteGig() {
//     console.log(`\n   🗑️  3.7: Delete gig: ${testGigId}`);
    
//     try {
//         // First, change status to draft if needed
//         await axios.patch(`${BASE_URL}/gigs/${testGigId}/status`, {
//             status: 'draft'
//         }, {
//             headers: {
//                 'Authorization': `Bearer ${authToken}`
//             }
//         });
        
//         await delay(500);
        
//         // Then delete
//         const response = await axios.delete(`${BASE_URL}/gigs/${testGigId}`, {
//             headers: {
//                 'Authorization': `Bearer ${authToken}`
//             }
//         });
        
//         console.log(`   ✅ Gig deleted successfully`);
        
//         // Clear test gig ID since it's deleted
//         testGigId = '';
//         testGigSlug = '';
//     } catch (error) {
//         console.error('   ❌ Failed:', error.response?.data?.error || error.message);
//         console.log('   ⚠️  Note: Gigs with orders cannot be deleted');
//     }
// }

// // Test 4: Admin endpoints (optional - requires admin token)
// async function testAdminEndpoints() {
//     console.log('\n👑 Test 4: Admin Gig Endpoints');
    
//     // You need an admin token for these tests
//     const adminToken = process.env.ADMIN_TOKEN || '';
    
//     if (!adminToken) {
//         console.log('   ⚠️  Skipping admin tests - no admin token provided');
//         console.log('   💡 Set ADMIN_TOKEN in environment variables');
//         return;
//     }
    
//     // 4.1: Get all gigs (admin)
//     await testGetAllGigsAdmin(adminToken);
    
//     // 4.2: Feature a gig (if we have a gig ID)
//     if (testGigId) {
//         await testFeatureGig(adminToken);
//     }
// }

// // Test 4.1: Get all gigs (admin)
// async function testGetAllGigsAdmin(adminToken) {
//     console.log('\n   👑 4.1: Get all gigs (admin view)');
    
//     try {
//         const response = await axios.get(`${BASE_URL}/gigs/admin/all`, {
//             headers: {
//                 'Authorization': `Bearer ${adminToken}`
//             },
//             params: {
//                 page: 1,
//                 limit: 10,
//                 sort_by: 'created_at',
//                 sort_order: 'desc'
//             }
//         });
        
//         console.log(`   ✅ Success - Found ${response.data.count} gigs (admin view)`);
//     } catch (error) {
//         console.error('   ❌ Failed:', error.response?.data || error.message);
//     }
// }

// // Test 4.2: Feature a gig
// async function testFeatureGig(adminToken) {
//     console.log(`\n   ⭐ 4.2: Feature gig: ${testGigId}`);
    
//     try {
//         const response = await axios.patch(`${BASE_URL}/gigs/admin/${testGigId}/feature`, {
//             featured: true
//         }, {
//             headers: {
//                 'Authorization': `Bearer ${adminToken}`
//             }
//         });
        
//         console.log(`   ✅ Gig featured successfully`);
        
//         // Unfeature it
//         await delay(500);
//         await axios.patch(`${BASE_URL}/gigs/admin/${testGigId}/feature`, {
//             featured: false
//         }, {
//             headers: {
//                 'Authorization': `Bearer ${adminToken}`
//             }
//         });
        
//     } catch (error) {
//         console.error('   ❌ Failed:', error.response?.data || error.message);
//     }
// }

// // Run comprehensive test
// async function runComprehensiveTest() {
//     console.log('🎯 Running Comprehensive Gig API Test Suite\n');
    
//     // First, ensure we have a user
//     if (!authToken) {
//         try {
//             await testLogin();
//         } catch (error) {
//             console.log('⚠️  Using fallback test data');
//             // For testing without real login
//             testGigId = '65d5f8a9b8c9d123456789ab'; // Example gig ID
//             testUserId = '65d5f8a9b8c9d123456789cd'; // Example user ID
//         }
//     }
    
//     // Test all endpoints
//     const tests = [
//         { name: 'Get all gigs', func: testGetAllGigs },
//         { name: 'Search gigs', func: testSearchGigs },
//         { name: 'Get featured gigs', func: testGetFeaturedGigs },
//         { name: 'Get gig by ID', func: testGetGigById },
//         { name: 'Get gig by slug', func: testGetGigBySlug },
//         { name: 'Get gig reviews', func: testGetGigReviews },
//         { name: 'Get related gigs', func: testGetRelatedGigs },
//         { name: 'Create gig', func: testCreateGig },
//         { name: 'Get my gigs', func: testGetMyGigs },
//         { name: 'Update gig', func: testUpdateGig },
//         { name: 'Toggle gig status', func: testToggleGigStatus },
//         { name: 'Update gig images', func: testUpdateGigImages },
//         { name: 'Get gig analytics', func: testGetGigAnalytics },
//         { name: 'Delete gig', func: testDeleteGig }
//     ];
    
//     let passed = 0;
//     let failed = 0;
    
//     for (const test of tests) {
//         console.log(`\n🔸 Testing: ${test.name}`);
//         try {
//             await test.func();
//             console.log(`   ✅ ${test.name} - PASSED`);
//             passed++;
//         } catch (error) {
//             console.log(`   ❌ ${test.name} - FAILED: ${error.message}`);
//             failed++;
//         }
//         await delay(300); // Small delay between tests
//     }
    
//     console.log('\n📊 Test Summary:');
//     console.log(`   ✅ Passed: ${passed}`);
//     console.log(`   ❌ Failed: ${failed}`);
//     console.log(`   📈 Success Rate: ${((passed / tests.length) * 100).toFixed(1)}%`);
    
//     if (failed === 0) {
//         console.log('\n🎉 All tests passed!');
//     } else {
//         console.log('\n⚠️  Some tests failed. Check the errors above.');
//     }
// }

// // Quick test function
// async function quickTest() {
//     console.log('⚡ Running Quick Test\n');
    
//     const quickTests = [
//         testGetAllGigs,
//         testSearchGigs,
//         testGetFeaturedGigs
//     ];
    
//     for (const test of quickTests) {
//         try {
//             await test();
//         } catch (error) {
//             console.error(`Quick test failed: ${error.message}`);
//         }
//         await delay(200);
//     }
// }

// // Command line interface
// const args = process.argv.slice(2);
// const mode = args[0] || 'full';

// console.log(`Mode: ${mode}\n`);

// switch (mode) {
//     case 'quick':
//         quickTest();
//         break;
//     case 'comprehensive':
//         runComprehensiveTest();
//         break;
//     case 'public':
//         testPublicEndpoints();
//         break;
//     case 'freelancer':
//         testFreelancerEndpoints();
//         break;
//     case 'admin':
//         testAdminEndpoints();
//         break;
//     case 'full':
//     default:
//         runTests();
//         break;
// }




















// const axios = require('axios');
// require('dotenv').config();

// // Configuration
// const BASE_URL = process.env.BASE_URL || 'http://localhost:5000/api';
// const TEST_USER = {
//     freelancer: {
//         email: 'sadik@example.com',
//         password: 'pwd12345',
//         role: 'freelancer'
//     },
//     client: {
//         email: 'abdelali@example.com',
//         password: 'pwd12345',
//         role: 'client'
//     }
// };

// // Test state
// let authTokens = {
//     freelancer: null,
//     client: null
// };
// let testGigId = null;
// let testFreelancerId = '693b300aca697cf585552579'; // Sadik user ID
// let testCategoryId = '692dbb7515355c3dedcfb35e'; // Web Development category

// class GigTester {
//     constructor() {
//         this.axios = axios.create({
//             baseURL: BASE_URL,
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });
//     }

//     // async login(userType) {
//     //     try {
//     //         const user = TEST_USER[userType];
//     //         console.log(`\n🔐 Logging in as ${userType} (${user.email})...`);
            
//     //         const response = await this.axios.post('/users/login', {
//     //             email: user.email,
//     //             password: user.password
//     //         });

//     //         if (response.data.success) {
//     //             authTokens[userType] = response.data.token;
//     //             this.axios.defaults.headers.common['Authorization'] = `Bearer ${authTokens[userType]}`;
//     //             console.log(`✅ ${userType} login successful`);
//     //             return true;
//     //         }
//     //     } catch (error) {
//     //         console.error(`❌ ${userType} login failed:`, error.response?.data || error.message);
//     //         return false;
//     //     }
//     // }
// async login(userType) {
//     try {
//         const user = TEST_USER[userType];
//         console.log(`\n🔐 Logging in as ${userType} (${user.email})...`);
        
//         const response = await this.axios.post('/users/login', {
//             email: user.email,
//             password: user.password
//         });

//         if (response.data.success) {
//             authTokens[userType] = response.data.token;
//             this.axios.defaults.headers.common['Authorization'] = `Bearer ${authTokens[userType]}`;
            
//             // Normalize role in response
//             if (response.data.user && response.data.user.role) {
//                 response.data.user.role = response.data.user.role.toLowerCase();
//             }
            
//             console.log(`✅ ${userType} login successful`);
//             console.log(`   Role: ${response.data.user?.role}`);
//             return true;
//         }
//     } catch (error) {
//         console.error(`❌ ${userType} login failed:`, error.response?.data || error.message);
//         return false;
//     }
// }
//     setAuthToken(userType) {
//         if (authTokens[userType]) {
//             this.axios.defaults.headers.common['Authorization'] = `Bearer ${authTokens[userType]}`;
//         } else {
//             delete this.axios.defaults.headers.common['Authorization'];
//         }
//     }

//     async testPublicEndpoints() {
//         console.log('\n📋 ========== TESTING PUBLIC ENDPOINTS ==========');

//         // 1. Get all gigs
//         console.log('\n1️⃣ Testing GET /api/gigs');
//         try {
//             const response = await this.axios.get('/gigs');
//             console.log(`✅ Success: ${response.data.count} gigs found`);
//             if (response.data.data && response.data.data.length > 0) {
//                 console.log(`   Sample gig: ${response.data.data[0].title}`);
//                 console.log(`   Pagination: Page ${response.data.pagination.page} of ${response.data.pagination.pages}`);
//             }
//         } catch (error) {
//             console.error('❌ Failed:', error.response?.data || error.message);
//         }

//         // 2. Get featured gigs
//         console.log('\n2️⃣ Testing GET /api/gigs/featured');
//         try {
//             const response = await this.axios.get('/gigs/featured');
//             console.log(`✅ Success: ${response.data.count || 0} featured gigs found`);
//         } catch (error) {
//             console.error('❌ Failed:', error.response?.data || error.message);
//         }

//         // 3. Search gigs
//         console.log('\n3️⃣ Testing GET /api/gigs/search?q=python');
//         try {
//             const response = await this.axios.get('/gigs/search', {
//                 params: { q: 'python' }
//             });
//             console.log(`✅ Success: ${response.data.count || 0} gigs found for search "python"`);
//         } catch (error) {
//             console.error('❌ Failed:', error.response?.data || error.message);
//         }

//         // 4. Get gig by ID (using first gig from database)
//         console.log('\n4️⃣ Testing GET /api/gigs/:id');
//         try {
//             // First get a list to find an ID
//             const listResponse = await this.axios.get('/gigs');
//             if (listResponse.data.data && listResponse.data.data.length > 0) {
//                 const gigId = listResponse.data.data[0]._id;
//                 const response = await this.axios.get(`/gigs/${gigId}`);
//                 console.log(`✅ Success: Found gig "${response.data.data.title}"`);
//             }
//         } catch (error) {
//             console.error('❌ Failed:', error.response?.data || error.message);
//         }

//         // 5. Get gig by slug
//         console.log('\n5️⃣ Testing GET /api/gigs/slug/:slug');
//         try {
//             const response = await this.axios.get('/gigs/slug/python-rpc-development-service');
//             console.log(`✅ Success: Found gig "${response.data.data.title}" by slug`);
//         } catch (error) {
//             console.error('❌ Failed:', error.response?.data || error.message);
//         }
//     }

//     // async testFreelancerEndpoints() {
//     //     console.log('\n📋 ========== TESTING FREELANCER ENDPOINTS ==========');
        
//     //     if (!await this.login('freelancer')) {
//     //         console.log('❌ Skipping freelancer tests - login failed');
//     //         return;
//     //     }

//     //     // 1. Create a new gig
//     //     console.log('\n1️⃣ Testing POST /api/gigs (Create new gig)');
//     //     try {
//     //         const gigData = {
//     //             title: 'Test Gig - Node.js API Development',
//     //             description: 'Professional Node.js API development with Express and MongoDB. Building RESTful APIs and microservices.',
//     //             category_id: testCategoryId,
//     //             base_price: 299,
//     //             delivery_days: 7,
//     //             search_tags: ['nodejs', 'express', 'api', 'mongodb', 'backend'],
//     //             pricing_type: 'fixed',
//     //             revisions_included: 2,
//     //             requirements_description: 'Please provide API specifications and requirements',
//     //             currency: 'USD',
//     //             status: 'active'
//     //         };

//     //         const response = await this.axios.post('/gigs', gigData);
//     //         if (response.data.success) {
//     //             testGigId = response.data.data._id;
//     //             console.log(`✅ Success: Created gig "${response.data.data.title}"`);
//     //             console.log(`   Gig ID: ${testGigId}`);
//     //             console.log(`   Slug: ${response.data.data.slug}`);
//     //             console.log(`   Price: $${response.data.data.base_price}`);
//     //         }
//     //     } catch (error) {
//     //         console.error('❌ Failed:', error.response?.data || error.message);
//     //     }
    
// async testFreelancerEndpoints() {
//     console.log('\n📋 ========== TESTING FREELANCER ENDPOINTS ==========');
    
//     if (!await this.login('freelancer')) {
//         console.log('❌ Skipping freelancer tests - login failed');
//         return;
//     }

//     console.log(`User role after login: ${this.axios.defaults.headers.common['Authorization'] ? 'Authenticated' : 'Not authenticated'}`);

//     // 1. Create a new gig
//     console.log('\n1️⃣ Testing POST /api/gigs (Create new gig)');
//     try {
//         const gigData = {
//             title: 'Test Gig - Node.js API Development',
//             description: 'Professional Node.js API development with Express and MongoDB. Building RESTful APIs and microservices.',
//             category_id: testCategoryId,
//             base_price: 299,
//             delivery_days: 7,
//             search_tags: ['nodejs', 'express', 'api', 'mongodb', 'backend'],
//             pricing_type: 'fixed',
//             revisions_included: 2,
//             requirements_description: 'Please provide API specifications and requirements',
//             currency: 'USD',
//             status: 'active'
//         };

//         console.log('Sending gig creation request...');
//         const response = await this.axios.post('/gigs', gigData);
        
//         if (response.data.success) {
//             testGigId = response.data.data._id;
//             console.log(`✅ Success: Created gig "${response.data.data.title}"`);
//             console.log(`   Gig ID: ${testGigId}`);
//             console.log(`   Slug: ${response.data.data.slug}`);
//             console.log(`   Price: $${response.data.data.base_price}`);
//         } else {
//             console.log(`❌ Failed: ${response.data.error}`);
//         }
//     } catch (error) {
//         console.error('❌ Failed:', error.response?.data || error.message);
//         if (error.response?.status === 403) {
//             console.log('⚠️  This suggests a role/permission issue. Check if user has correct role.');
//         }
//     }

//         // 2. Get freelancer's gigs
//         console.log('\n2️⃣ Testing GET /api/gigs/my-gigs');
//         try {
//             const response = await this.axios.get('/gigs/my-gigs');
//             console.log(`✅ Success: ${response.data.count} gigs found`);
//             if (response.data.data && response.data.data.length > 0) {
//                 console.log(`   Your gigs:`);
//                 response.data.data.forEach((gig, index) => {
//                     console.log(`   ${index + 1}. ${gig.title} (${gig.status}) - $${gig.base_price}`);
//                 });
//             }
//         } catch (error) {
//             console.error('❌ Failed:', error.response?.data || error.message);
//         }

//         if (!testGigId) {
//             console.log('❌ Skipping remaining freelancer tests - no gig created');
//             return;
//         }

//         // 3. Update gig
//         console.log('\n3️⃣ Testing PUT /api/gigs/:id (Update gig)');
//         try {
//             const updateData = {
//                 title: 'Updated Test Gig - Node.js API Development',
//                 description: 'Updated: Professional Node.js API development with Express and MongoDB. Building scalable RESTful APIs and microservices.',
//                 base_price: 349,
//                 delivery_days: 5
//             };

//             const response = await this.axios.put(`/gigs/${testGigId}`, updateData);
//             console.log(`✅ Success: Updated gig to "${response.data.data.title}"`);
//             console.log(`   New price: $${response.data.data.base_price}`);
//             console.log(`   Delivery: ${response.data.data.delivery_days} days`);
//         } catch (error) {
//             console.error('❌ Failed:', error.response?.data || error.message);
//         }

//         // 4. Toggle gig status
//         console.log('\n4️⃣ Testing PATCH /api/gigs/:id/status (Toggle status)');
//         try {
//             const response = await this.axios.patch(`/gigs/${testGigId}/status`, {
//                 status: 'paused'
//             });
//             console.log(`✅ Success: Changed gig status to "${response.data.data.status}"`);
//         } catch (error) {
//             console.error('❌ Failed:', error.response?.data || error.message);
//         }

//         // 5. Update gig images
//         console.log('\n5️⃣ Testing PUT /api/gigs/:id/images (Update images)');
//         try {
//             const imageData = {
//                 images: [
//                     'https://example.com/images/gig1.jpg',
//                     'https://example.com/images/gig2.jpg',
//                     'https://example.com/images/gig3.jpg'
//                 ]
//             };

//             const response = await this.axios.put(`/gigs/${testGigId}/images`, imageData);
//             console.log(`✅ Success: Updated gig images`);
//             console.log(`   Images count: ${response.data.data.images_url?.length || 0}`);
//         } catch (error) {
//             console.error('❌ Failed:', error.response?.data || error.message);
//         }

//         // 6. Get related gigs
//         console.log('\n6️⃣ Testing GET /api/gigs/:id/related');
//         try {
//             const response = await this.axios.get(`/gigs/${testGigId}/related`);
//             console.log(`✅ Success: ${response.data.count} related gigs found`);
//         } catch (error) {
//             console.error('❌ Failed:', error.response?.data || error.message);
//         }

//         // 7. Get gig reviews (empty for new gig)
//         console.log('\n7️⃣ Testing GET /api/gigs/:id/reviews');
//         try {
//             const response = await this.axios.get(`/gigs/${testGigId}/reviews`);
//             console.log(`✅ Success: ${response.data.count} reviews found`);
//         } catch (error) {
//             console.error('❌ Failed:', error.response?.data || error.message);
//         }

//         // 8. Get gig analytics
//         console.log('\n8️⃣ Testing GET /api/gigs/:id/analytics');
//         try {
//             const response = await this.axios.get(`/gigs/${testGigId}/analytics`);
//             console.log(`✅ Success: Got gig analytics`);
//             if (response.data.data) {
//                 const stats = response.data.data.gig_stats;
//                 console.log(`   Orders: ${stats.total_orders}`);
//                 console.log(`   Earnings: $${stats.total_earning}`);
//                 console.log(`   Rating: ${stats.gig_rating}`);
//             }
//         } catch (error) {
//             console.error('❌ Failed:', error.response?.data || error.message);
//         }

//         // 9. Change status back to active
//         console.log('\n9️⃣ Testing PATCH /api/gigs/:id/status (Back to active)');
//         try {
//             const response = await this.axios.patch(`/gigs/${testGigId}/status`, {
//                 status: 'active'
//             });
//             console.log(`✅ Success: Changed gig status back to "${response.data.data.status}"`);
//         } catch (error) {
//             console.error('❌ Failed:', error.response?.data || error.message);
//         }

//         // 10. Delete gig (cleanup)
//         console.log('\n🔟 Testing DELETE /api/gigs/:id (Delete gig)');
//         try {
//             const response = await this.axios.delete(`/gigs/${testGigId}`);
//             console.log(`✅ Success: Deleted test gig`);
//             testGigId = null;
//         } catch (error) {
//             console.error('❌ Failed:', error.response?.data || error.message);
//         }
//     }






//     async testClientAccess() {
//         console.log('\n📋 ========== TESTING CLIENT ACCESS ==========');
        
//         if (!await this.login('client')) {
//             console.log('❌ Skipping client tests - login failed');
//             return;
//         }

//         console.log('\n1️⃣ Testing client trying to create gig (should fail)');
//         try {
//             await this.axios.post('/gigs', {
//                 title: 'Client Trying to Create Gig',
//                 description: 'This should fail',
//                 base_price: 100
//             });
//             console.log('❌ Unexpected: Client created a gig (should have failed)');
//         } catch (error) {
//             console.log(`✅ Expected failure: ${error.response?.data?.error || error.message}`);
//         }

//         console.log('\n2️⃣ Testing client trying to access /my-gigs (should fail)');
//         try {
//             await this.axios.get('/gigs/my-gigs');
//             console.log('❌ Unexpected: Client accessed my-gigs (should have failed)');
//         } catch (error) {
//             console.log(`✅ Expected failure: ${error.response?.data?.error || error.message}`);
//         }

//         // Try to access gig that exists
//         console.log('\n3️⃣ Testing client can view gig details');
//         try {
//             const listResponse = await this.axios.get('/gigs', { 
//                 params: { limit: 1 }
//             });
//             if (listResponse.data.data && listResponse.data.data.length > 0) {
//                 const gigId = listResponse.data.data[0]._id;
//                 const response = await this.axios.get(`/gigs/${gigId}`);
//                 console.log(`✅ Success: Client can view gig "${response.data.data.title}"`);
//             }
//         } catch (error) {
//             console.error('❌ Failed:', error.response?.data || error.message);
//         }
//     }

//     async testFilteringAndPagination() {
//         console.log('\n📋 ========== TESTING FILTERING & PAGINATION ==========');
        
//         // Remove auth for public endpoints
//         delete this.axios.defaults.headers.common['Authorization'];

//         // 1. Test pagination
//         console.log('\n1️⃣ Testing pagination (page=1, limit=5)');
//         try {
//             const response = await this.axios.get('/gigs', {
//                 params: { page: 1, limit: 5 }
//             });
//             console.log(`✅ Success: Page ${response.data.pagination.page} of ${response.data.pagination.pages}`);
//             console.log(`   Showing ${response.data.count} of ${response.data.pagination.total} total gigs`);
//             console.log(`   Limit: ${response.data.pagination.limit}`);
//         } catch (error) {
//             console.error('❌ Failed:', error.response?.data || error.message);
//         }

//         // 2. Test price filtering
//         console.log('\n2️⃣ Testing price filtering (min_price=100, max_price=200)');
//         try {
//             const response = await this.axios.get('/gigs', {
//                 params: { min_price: 100, max_price: 200 }
//             });
//             console.log(`✅ Success: Found ${response.data.count} gigs between $100 and $200`);
//             if (response.data.data && response.data.data.length > 0) {
//                 console.log(`   Price range: $${response.data.data[0].base_price} - $${response.data.data[response.data.data.length-1].base_price}`);
//             }
//         } catch (error) {
//             console.error('❌ Failed:', error.response?.data || error.message);
//         }

//         // 3. Test category filtering
//         console.log('\n3️⃣ Testing category filtering');
//         try {
//             const response = await this.axios.get('/gigs', {
//                 params: { category_id: testCategoryId }
//             });
//             console.log(`✅ Success: Found ${response.data.count} gigs in category`);
//         } catch (error) {
//             console.error('❌ Failed:', error.response?.data || error.message);
//         }

//         // 4. Test sorting
//         console.log('\n4️⃣ Testing sorting by price (ascending)');
//         try {
//             const response = await this.axios.get('/gigs', {
//                 params: { sort_by: 'base_price', sort_order: 'asc' }
//             });
//             console.log(`✅ Success: Sorted ${response.data.count} gigs by price ascending`);
//             if (response.data.data && response.data.data.length > 0) {
//                 console.log(`   Cheapest: $${response.data.data[0].base_price}`);
//                 console.log(`   Most expensive: $${response.data.data[response.data.data.length-1].base_price}`);
//             }
//         } catch (error) {
//             console.error('❌ Failed:', error.response?.data || error.message);
//         }

//         // 5. Test search with filters
//         console.log('\n5️⃣ Testing search with multiple filters');
//         try {
//             const response = await this.axios.get('/gigs/search', {
//                 params: {
//                     q: 'python',
//                     min_price: 100,
//                     max_price: 200,
//                     delivery_days: 7
//                 }
//             });
//             console.log(`✅ Success: Found ${response.data.count} Python gigs with filters applied`);
//         } catch (error) {
//             console.error('❌ Failed:', error.response?.data || error.message);
//         }
//     }

//     async testErrorCases() {
//         console.log('\n📋 ========== TESTING ERROR CASES ==========');
        
//         delete this.axios.defaults.headers.common['Authorization'];

//         // 1. Invalid gig ID
//         console.log('\n1️⃣ Testing invalid gig ID');
//         try {
//             await this.axios.get('/gigs/invalid-gig-id');
//             console.log('❌ Unexpected: Invalid ID accepted');
//         } catch (error) {
//             console.log(`✅ Expected error: ${error.response?.status} - ${error.response?.data?.error || 'Not found'}`);
//         }

//         // 2. Non-existent slug
//         console.log('\n2️⃣ Testing non-existent slug');
//         try {
//             await this.axios.get('/gigs/slug/non-existent-slug-12345');
//             console.log('❌ Unexpected: Non-existent slug accepted');
//         } catch (error) {
//             console.log(`✅ Expected error: ${error.response?.status} - ${error.response?.data?.error || 'Not found'}`);
//         }

//         // 3. Unauthorized access to protected endpoint
//         console.log('\n3️⃣ Testing unauthorized access (no token)');
//         try {
//             await this.axios.post('/gigs', {
//                 title: 'Unauthorized Create Attempt'
//             });
//             console.log('❌ Unexpected: Unauthorized request succeeded');
//         } catch (error) {
//             console.log(`✅ Expected error: ${error.response?.status} - ${error.response?.data?.error || 'Unauthorized'}`);
//         }
//     }

//     async runAllTests() {
//         console.log('🚀 Starting Gig API Tests');
//         console.log(`📡 Base URL: ${BASE_URL}`);
//         console.log('='.repeat(50));

//         await this.testPublicEndpoints();
//         await this.testFreelancerEndpoints();
//         await this.testClientAccess();
//         await this.testFilteringAndPagination();
//         await this.testErrorCases();

//         console.log('\n' + '='.repeat(50));
//         console.log('✅ All tests completed!');
//     }
// }

// // Run tests
// async function main() {
//     const tester = new GigTester();
    
//     try {
//         await tester.runAllTests();
//     } catch (error) {
//         console.error('❌ Test suite failed:', error.message);
//         process.exit(1);
//     }
// }

// // Handle command line arguments
// if (require.main === module) {
//     main();
// }

// module.exports = GigTester;


















const axios = require('axios');
require('dotenv').config();

// Configuration
const BASE_URL = process.env.BASE_URL || 'http://localhost:5000/api';
const TEST_USER = {
    freelancer: {
        email: 'oumaimamd30@gmail.com',
        password: '1234567890',
        role: 'freelancer'
    },
    client: {
        email: 'abdelali@example.com',
        password: 'pwd12345',
        role: 'client'
    }
};

// Test state
let authTokens = {
    freelancer: null,
    client: null
};
let testGigId = null;
let testFreelancerId = '693b300aca697cf585552579'; // Sadik user ID
let testCategoryId = '693d85dd79621fddf4d00505'; // Web Development category ID (ACTIVE)

class GigTester {
    constructor() {
        this.axios = axios.create({
            baseURL: BASE_URL,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    async login(userType) {
        try {
            const user = TEST_USER[userType];
            console.log(`\n🔐 Logging in as ${userType} (${user.email})...`);
            
            const response = await this.axios.post('/users/login', {
                email: user.email,
                password: user.password
            });

            if (response.data.success) {
                authTokens[userType] = response.data.token;
                this.axios.defaults.headers.common['Authorization'] = `Bearer ${authTokens[userType]}`;
                
                // Normalize role in response
                if (response.data.user && response.data.user.role) {
                    response.data.user.role = response.data.user.role.toLowerCase();
                }
                
                console.log(`✅ ${userType} login successful`);
                console.log(`   Role: ${response.data.user?.role}`);
                console.log(`   User ID: ${response.data.user?._id || response.data.user?.id}`);
                return true;
            }
        } catch (error) {
            console.error(`❌ ${userType} login failed:`, error.response?.data || error.message);
            return false;
        }
    }

    setAuthToken(userType) {
        if (authTokens[userType]) {
            this.axios.defaults.headers.common['Authorization'] = `Bearer ${authTokens[userType]}`;
        } else {
            delete this.axios.defaults.headers.common['Authorization'];
        }
    }

    async checkExistingGigs() {
        console.log('\n🔍 Checking existing gigs in database...');
        try {
            const response = await this.axios.get('/gigs', {
                params: { limit: 5 }
            });
            console.log(`📊 Found ${response.data.count || 0} gigs in database`);
            
            if (response.data.data && response.data.data.length > 0) {
                console.log('📋 Existing gigs:');
                response.data.data.forEach((gig, index) => {
                    console.log(`   ${index + 1}. ${gig.title} (${gig.status}) - $${gig.base_price}`);
                    console.log(`      ID: ${gig._id}`);
                    console.log(`      Freelancer: ${gig.freelancer_id}`);
                });
            } else {
                console.log('📭 No gigs found in database');
            }
            return response.data.data || [];
        } catch (error) {
            console.error('❌ Error checking gigs:', error.response?.data || error.message);
            return [];
        }
    }

    async testPublicEndpoints() {
        console.log('\n📋 ========== TESTING PUBLIC ENDPOINTS ==========');

        // 1. Get all gigs
        console.log('\n1️⃣ Testing GET /api/gigs');
        try {
            const response = await this.axios.get('/gigs');
            console.log(`✅ Success: ${response.data.count || 0} gigs found`);
            if (response.data.data && response.data.data.length > 0) {
                console.log(`   Sample gig: ${response.data.data[0].title}`);
                console.log(`   Pagination: Page ${response.data.pagination?.page || 1} of ${response.data.pagination?.pages || 1}`);
            }
        } catch (error) {
            console.error('❌ Failed:', error.response?.data || error.message);
        }

        // 2. Get featured gigs
        console.log('\n2️⃣ Testing GET /api/gigs/featured');
        try {
            const response = await this.axios.get('/gigs/featured');
            console.log(`✅ Success: ${response.data.count || 0} featured gigs found`);
        } catch (error) {
            console.error('❌ Failed:', error.response?.data || error.message);
        }

        // 3. Search gigs
        console.log('\n3️⃣ Testing GET /api/gigs/search?q=web');
        try {
            const response = await this.axios.get('/gigs/search', {
                params: { q: 'web' }
            });
            console.log(`✅ Success: ${response.data.count || 0} gigs found for search "web"`);
        } catch (error) {
            console.error('❌ Failed:', error.response?.data || error.message);
        }

        // 4. Get gig by ID
        console.log('\n4️⃣ Testing GET /api/gigs/:id');
        try {
            // First get a list to find an ID
            const listResponse = await this.axios.get('/gigs', { params: { limit: 1 } });
            if (listResponse.data.data && listResponse.data.data.length > 0) {
                const gigId = listResponse.data.data[0]._id;
                const response = await this.axios.get(`/gigs/${gigId}`);
                console.log(`✅ Success: Found gig "${response.data.data?.title || 'Unknown'}"`);
                console.log(`   ID: ${gigId}`);
                console.log(`   Status: ${response.data.data?.status || 'Unknown'}`);
            } else {
                console.log('ℹ️  No gigs found to test ID lookup');
            }
        } catch (error) {
            console.error('❌ Failed:', error.response?.data || error.message);
        }

        // 5. Get gig by slug (if any gigs exist)
        console.log('\n5️⃣ Testing GET /api/gigs/slug/:slug');
        try {
            const listResponse = await this.axios.get('/gigs', { params: { limit: 1 } });
            if (listResponse.data.data && listResponse.data.data.length > 0 && listResponse.data.data[0].slug) {
                const slug = listResponse.data.data[0].slug;
                const response = await this.axios.get(`/gigs/slug/${slug}`);
                console.log(`✅ Success: Found gig "${response.data.data.title}" by slug`);
            } else {
                console.log('ℹ️  No gigs with slugs found to test');
            }
        } catch (error) {
            if (error.response?.status === 404) {
                console.log('ℹ️  No gig found with slug - expected if no gigs exist');
            } else {
                console.error('❌ Failed:', error.response?.data || error.message);
            }
        }
    }

    async testFreelancerEndpoints() {
        console.log('\n📋 ========== TESTING FREELANCER ENDPOINTS ==========');
        
        if (!await this.login('freelancer')) {
            console.log('❌ Skipping freelancer tests - login failed');
            return;
        }

        console.log(`🔑 Authorization header set: ${this.axios.defaults.headers.common['Authorization'] ? 'Yes' : 'No'}`);

        // Check existing gigs first
        const existingGigs = await this.checkExistingGigs();
        
        // If no gigs exist, create a test gig
        let shouldCreateGig = existingGigs.length === 0;
        
        if (!shouldCreateGig) {
            // Check if freelancer already has gigs
            const freelancerGigs = existingGigs.filter(gig => gig.freelancer_id === testFreelancerId);
            if (freelancerGigs.length === 0) {
                shouldCreateGig = true;
            } else {
                // Use existing gig for testing
                testGigId = freelancerGigs[0]._id;
                console.log(`ℹ️  Using existing gig ID: ${testGigId}`);
            }
        }

        // 1. Create a new gig (if needed)
        if (shouldCreateGig) {
            console.log('\n1️⃣ Testing POST /api/gigs (Create new gig)');
            try {
                const gigData = {
                    title: 'Professional Web Development Service',
                    description: 'Expert web development with modern technologies including HTML, CSS, JavaScript, React, and Node.js. Building responsive and scalable web applications.',
                    category_id: testCategoryId,
                    base_price: 299,
                    delivery_days: 7,
                    search_tags: ['web', 'development', 'javascript', 'react', 'nodejs'],
                    pricing_type: 'fixed',
                    revisions_included: 2,
                    requirements_description: 'Please provide project requirements and design specifications',
                    currency: 'USD',
                    status: 'active'
                };

                console.log('📤 Sending gig creation request...');
                const response = await this.axios.post('/gigs', gigData);
                
                if (response.data.success) {
                    testGigId = response.data.data._id;
                    console.log(`✅ Success: Created gig "${response.data.data.title}"`);
                    console.log(`   Gig ID: ${testGigId}`);
                    console.log(`   Slug: ${response.data.data.slug || 'N/A'}`);
                    console.log(`   Price: $${response.data.data.base_price}`);
                    console.log(`   Status: ${response.data.data.status}`);
                } else {
                    console.log(`❌ Failed: ${response.data.error}`);
                }
            } catch (error) {
                console.error('❌ Failed:', error.response?.data || error.message);
                if (error.response?.status === 403) {
                    console.log('⚠️  This suggests a role/permission issue. Check user role in database.');
                    console.log('⚠️  Expected: role: "freelancer"');
                }
            }
        }

        // 2. Get freelancer's gigs
        console.log('\n2️⃣ Testing GET /api/gigs/my-gigs');
        try {
            const response = await this.axios.get('/gigs/my-gigs');
            console.log(`✅ Success: ${response.data.count || 0} gigs found`);
            if (response.data.data && response.data.data.length > 0) {
                console.log(`   Your gigs:`);
                response.data.data.forEach((gig, index) => {
                    console.log(`   ${index + 1}. ${gig.title} (${gig.status}) - $${gig.base_price}`);
                });
            }
        } catch (error) {
            console.error('❌ Failed:', error.response?.data || error.message);
        }

        if (!testGigId) {
            console.log('❌ Skipping remaining freelancer tests - no gig available');
            return;
        }

        // 3. Update gig
        console.log('\n3️⃣ Testing PUT /api/gigs/:id (Update gig)');
        try {
            const updateData = {
                title: 'Updated Web Development Service - Premium Package',
                description: 'Updated: Expert web development with modern technologies. Now offering premium features and faster delivery.',
                base_price: 399,
                delivery_days: 5,
                search_tags: ['web', 'development', 'javascript', 'react', 'nodejs', 'premium']
            };

            const response = await this.axios.put(`/gigs/${testGigId}`, updateData);
            console.log(`✅ Success: Updated gig to "${response.data.data?.title || 'Unknown'}"`);
            console.log(`   New price: $${response.data.data?.base_price || 'Unknown'}`);
            console.log(`   Delivery: ${response.data.data?.delivery_days || 'Unknown'} days`);
        } catch (error) {
            console.error('❌ Failed:', error.response?.data || error.message);
        }

        // 4. Toggle gig status
        console.log('\n4️⃣ Testing PATCH /api/gigs/:id/status (Toggle status)');
        try {
            const response = await this.axios.patch(`/gigs/${testGigId}/status`, {
                status: 'paused'
            });
            console.log(`✅ Success: Changed gig status to "${response.data.data?.status || 'Unknown'}"`);
        } catch (error) {
            console.error('❌ Failed:', error.response?.data || error.message);
        }

        // 5. Update gig images
        console.log('\n5️⃣ Testing PUT /api/gigs/:id/images (Update images)');
        try {
            const imageData = {
                images: [
                    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1551650975-87deedd944c3?w-800&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1547658719-da2b51169166?w-800&auto=format&fit=crop'
                ]
            };

            const response = await this.axios.put(`/gigs/${testGigId}/images`, imageData);
            console.log(`✅ Success: Updated gig images`);
            console.log(`   Images count: ${response.data.data?.images_url?.length || 0}`);
        } catch (error) {
            console.error('❌ Failed:', error.response?.data || error.message);
        }

        // 6. Get related gigs
        console.log('\n6️⃣ Testing GET /api/gigs/:id/related');
        try {
            const response = await this.axios.get(`/gigs/${testGigId}/related`);
            console.log(`✅ Success: ${response.data.count || 0} related gigs found`);
        } catch (error) {
            console.error('❌ Failed:', error.response?.data || error.message);
        }

        // 7. Get gig reviews (empty for new gig)
        console.log('\n7️⃣ Testing GET /api/gigs/:id/reviews');
        try {
            const response = await this.axios.get(`/gigs/${testGigId}/reviews`);
            console.log(`✅ Success: ${response.data.count || 0} reviews found`);
        } catch (error) {
            console.error('❌ Failed:', error.response?.data || error.message);
        }

        // 8. Get gig analytics
        console.log('\n8️⃣ Testing GET /api/gigs/:id/analytics');
        try {
            const response = await this.axios.get(`/gigs/${testGigId}/analytics`);
            if (response.data.success) {
                console.log(`✅ Success: Got gig analytics`);
                if (response.data.data?.gig_stats) {
                    const stats = response.data.data.gig_stats;
                    console.log(`   Orders: ${stats.total_orders || 0}`);
                    console.log(`   Earnings: $${stats.total_earning || 0}`);
                    console.log(`   Rating: ${stats.gig_rating || 0}`);
                }
            } else {
                console.log(`ℹ️  Analytics not available: ${response.data.error || 'No data'}`);
            }
        } catch (error) {
            console.error('❌ Failed:', error.response?.data || error.message);
        }

        // 9. Change status back to active
        console.log('\n9️⃣ Testing PATCH /api/gigs/:id/status (Back to active)');
        try {
            const response = await this.axios.patch(`/gigs/${testGigId}/status`, {
                status: 'active'
            });
            console.log(`✅ Success: Changed gig status back to "${response.data.data?.status || 'Unknown'}"`);
        } catch (error) {
            console.error('❌ Failed:', error.response?.data || error.message);
        }

        // 10. Delete gig (cleanup - optional)
        console.log('\n🔟 Testing DELETE /api/gigs/:id (Delete gig - OPTIONAL)');
        const shouldDelete = false; // Set to true if you want to cleanup
        if (shouldDelete) {
            try {
                const response = await this.axios.delete(`/gigs/${testGigId}`);
                console.log(`✅ Success: Deleted test gig`);
                testGigId = null;
            } catch (error) {
                console.error('❌ Failed:', error.response?.data || error.message);
            }
        } else {
            console.log('ℹ️  Skipping gig deletion (preserving test data)');
        }
    }

    async testClientAccess() {
        console.log('\n📋 ========== TESTING CLIENT ACCESS ==========');
        
        if (!await this.login('client')) {
            console.log('❌ Skipping client tests - login failed');
            return;
        }

        console.log('\n1️⃣ Testing client trying to create gig (should fail)');
        try {
            await this.axios.post('/gigs', {
                title: 'Client Trying to Create Gig',
                description: 'This should fail',
                base_price: 100
            });
            console.log('❌ Unexpected: Client created a gig (should have failed)');
        } catch (error) {
            console.log(`✅ Expected failure: ${error.response?.data?.error || error.message}`);
            console.log(`   Status code: ${error.response?.status || 'N/A'}`);
        }

        console.log('\n2️⃣ Testing client trying to access /my-gigs (should fail)');
        try {
            await this.axios.get('/gigs/my-gigs');
            console.log('❌ Unexpected: Client accessed my-gigs (should have failed)');
        } catch (error) {
            console.log(`✅ Expected failure: ${error.response?.data?.error || error.message}`);
            console.log(`   Status code: ${error.response?.status || 'N/A'}`);
        }

        // Try to access gig that exists
        console.log('\n3️⃣ Testing client can view gig details');
        try {
            const listResponse = await this.axios.get('/gigs', { 
                params: { limit: 1 }
            });
            if (listResponse.data.data && listResponse.data.data.length > 0) {
                const gigId = listResponse.data.data[0]._id;
                const response = await this.axios.get(`/gigs/${gigId}`);
                console.log(`✅ Success: Client can view gig "${response.data.data?.title || 'Unknown'}"`);
                console.log(`   Gig ID: ${gigId}`);
            } else {
                console.log('ℹ️  No gigs available for client to view');
            }
        } catch (error) {
            console.error('❌ Failed:', error.response?.data || error.message);
        }
    }

    async testFilteringAndPagination() {
        console.log('\n📋 ========== TESTING FILTERING & PAGINATION ==========');
        
        // Remove auth for public endpoints
        delete this.axios.defaults.headers.common['Authorization'];

        // 1. Test pagination
        console.log('\n1️⃣ Testing pagination (page=1, limit=5)');
        try {
            const response = await this.axios.get('/gigs', {
                params: { page: 1, limit: 5 }
            });
            console.log(`✅ Success: Page ${response.data.pagination?.page || 1} of ${response.data.pagination?.pages || 1}`);
            console.log(`   Showing ${response.data.count || 0} of ${response.data.pagination?.total || 0} total gigs`);
            console.log(`   Limit: ${response.data.pagination?.limit || 5}`);
        } catch (error) {
            console.error('❌ Failed:', error.response?.data || error.message);
        }

        // 2. Test price filtering
        console.log('\n2️⃣ Testing price filtering (min_price=100, max_price=500)');
        try {
            const response = await this.axios.get('/gigs', {
                params: { min_price: 100, max_price: 500 }
            });
            console.log(`✅ Success: Found ${response.data.count || 0} gigs between $100 and $500`);
            if (response.data.data && response.data.data.length > 0) {
                const prices = response.data.data.map(g => g.base_price);
                const minPrice = Math.min(...prices);
                const maxPrice = Math.max(...prices);
                console.log(`   Price range: $${minPrice} - $${maxPrice}`);
            }
        } catch (error) {
            console.error('❌ Failed:', error.response?.data || error.message);
        }

        // 3. Test category filtering
        console.log('\n3️⃣ Testing category filtering');
        try {
            const response = await this.axios.get('/gigs', {
                params: { category_id: testCategoryId }
            });
            console.log(`✅ Success: Found ${response.data.count || 0} gigs in Web Development category`);
        } catch (error) {
            console.error('❌ Failed:', error.response?.data || error.message);
        }

        // 4. Test sorting
        console.log('\n4️⃣ Testing sorting by price (ascending)');
        try {
            const response = await this.axios.get('/gigs', {
                params: { sort_by: 'base_price', sort_order: 'asc' }
            });
            console.log(`✅ Success: Sorted ${response.data.count || 0} gigs by price ascending`);
            if (response.data.data && response.data.data.length > 0) {
                console.log(`   Cheapest: $${response.data.data[0].base_price}`);
                if (response.data.data.length > 1) {
                    console.log(`   Most expensive: $${response.data.data[response.data.data.length-1].base_price}`);
                }
            }
        } catch (error) {
            console.error('❌ Failed:', error.response?.data || error.message);
        }

        // 5. Test search with filters
        console.log('\n5️⃣ Testing search with multiple filters');
        try {
            const response = await this.axios.get('/gigs/search', {
                params: {
                    q: 'web',
                    min_price: 100,
                    max_price: 500,
                    delivery_days: 7
                }
            });
            console.log(`✅ Success: Found ${response.data.count || 0} web gigs with filters applied`);
        } catch (error) {
            console.error('❌ Failed:', error.response?.data || error.message);
        }
    }

    async testErrorCases() {
        console.log('\n📋 ========== TESTING ERROR CASES ==========');
        
        delete this.axios.defaults.headers.common['Authorization'];

        // 1. Invalid gig ID
        console.log('\n1️⃣ Testing invalid gig ID');
        try {
            await this.axios.get('/gigs/invalid-gig-id-123');
            console.log('❌ Unexpected: Invalid ID accepted');
        } catch (error) {
            console.log(`✅ Expected error: ${error.response?.status || 'N/A'} - ${error.response?.data?.error || 'Not found'}`);
        }

        // 2. Non-existent slug
        console.log('\n2️⃣ Testing non-existent slug');
        try {
            await this.axios.get('/gigs/slug/non-existent-slug-12345');
            console.log('❌ Unexpected: Non-existent slug accepted');
        } catch (error) {
            console.log(`✅ Expected error: ${error.response?.status || 'N/A'} - ${error.response?.data?.error || 'Not found'}`);
        }

        // 3. Unauthorized access to protected endpoint
        console.log('\n3️⃣ Testing unauthorized access (no token)');
        try {
            await this.axios.post('/gigs', {
                title: 'Unauthorized Create Attempt'
            });
            console.log('❌ Unexpected: Unauthorized request succeeded');
        } catch (error) {
            console.log(`✅ Expected error: ${error.response?.status || 'N/A'} - ${error.response?.data?.error || 'Unauthorized'}`);
        }

        // 4. Invalid category ID
        console.log('\n4️⃣ Testing invalid category ID in filter');
        try {
            await this.axios.get('/gigs', {
                params: { category_id: 'invalid-category-id' }
            });
            console.log('❌ Unexpected: Invalid category ID accepted');
        } catch (error) {
            console.log(`✅ Expected error: ${error.response?.status || 'N/A'} - ${error.response?.data?.error || 'Bad request'}`);
        }
    }

    async runAllTests() {
        console.log('🚀 Starting Gig API Tests');
        console.log(`📡 Base URL: ${BASE_URL}`);
        console.log(`👤 Test Freelancer ID: ${testFreelancerId}`);
        console.log(`📁 Test Category ID: ${testCategoryId}`);
        console.log('='.repeat(50));

        await this.testPublicEndpoints();
        await this.testFreelancerEndpoints();
        await this.testClientAccess();
        await this.testFilteringAndPagination();
        await this.testErrorCases();

        console.log('\n' + '='.repeat(50));
        console.log('✅ All tests completed!');
        
        // Summary
        console.log('\n📊 TEST SUMMARY:');
        console.log(`   - Freelancer ID: ${testFreelancerId}`);
        console.log(`   - Test Gig ID: ${testGigId || 'Not created'}`);
        console.log(`   - Category: Web Development (${testCategoryId})`);
        console.log('💡 Tips:');
        console.log('   1. Check MongoDB for created gigs: db.gigs.find().pretty()');
        console.log('   2. Test gig should be in "active" status');
        console.log('   3. Images should be updated in gig document');
    }
}

// Insert sample gigs into MongoDB (run this separately if needed)
async function insertSampleGigs() {
    console.log('📝 Inserting sample gigs into MongoDB...');
    
    // Sample gigs to insert
    const sampleGigs = [
        {
            freelancer_id: '693b300aca697cf585552579', // Sadik
            category_id: '693d85dd79621fddf4d00505', // Web Development
            title: 'Python API Development',
            slug: 'python-api-development',
            description: 'Build robust Python APIs with FastAPI/Flask',
            search_tags: ['python', 'api', 'fastapi', 'flask', 'backend'],
            base_price: 350,
            currency: 'USD',
            pricing_type: 'fixed',
            delivery_days: 14,
            revisions_included: 2,
            images_url: [],
            status: 'active',
            is_featured: false,
            is_urgent: false,
            total_orders: 0,
            total_earning: 0,
            gig_rating: 0,
            gig_reviews: 0,
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            freelancer_id: '693c8b4fdf7597152f275f65', // Test freelancer
            category_id: '693d85dd79621fddf4d00505', // Web Development
            title: 'React Frontend Development',
            slug: 'react-frontend-development',
            description: 'Create beautiful React applications with modern UI',
            search_tags: ['react', 'frontend', 'javascript', 'ui', 'web'],
            base_price: 250,
            currency: 'USD',
            pricing_type: 'fixed',
            delivery_days: 10,
            revisions_included: 3,
            images_url: [],
            status: 'active',
            is_featured: true,
            is_urgent: false,
            total_orders: 0,
            total_earning: 0,
            gig_rating: 0,
            gig_reviews: 0,
            created_at: new Date(),
            updated_at: new Date()
        }
    ];
    
    console.log('Sample gigs ready to insert. Run in MongoDB shell:');
    console.log('```javascript');
    console.log('// Insert sample gigs');
    console.log('db.gigs.insertMany(');
    console.log(JSON.stringify(sampleGigs, null, 2));
    console.log(')');
    console.log('```');
}

// Run tests
async function main() {
    const tester = new GigTester();
    
    try {
        // Check if we should insert sample data first
        const args = process.argv.slice(2);
        if (args.includes('--insert-samples')) {
            await insertSampleGigs();
            return;
        }
        
        await tester.runAllTests();
    } catch (error) {
        console.error('❌ Test suite failed:', error.message);
        console.error('Stack:', error.stack);
        process.exit(1);
    }
}

// Handle command line arguments
if (require.main === module) {
    main();
}

module.exports = GigTester;