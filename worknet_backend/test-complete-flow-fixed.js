// backend/test-complete-flow-fixed.js
const axios = require('axios');
const xmlrpc = require('xmlrpc');

// Configuration
const BASE_URL = 'http://localhost:5000/api';
const RPC_HOST = 'localhost';
const RPC_PORT = 8000;

// Test Data - Fixed
const testFreelancer = {
    username: `freelancer_${Date.now()}`,
    email: `freelancer${Date.now()}@test.com`,
    password: 'TestPass123!',
    role: 'freelancer',
    full_name: 'Test Freelancer',
    phone: '+212612345678',
    country: 'Morocco',
    bio: 'Experienced freelancer for testing purposes'
};

// 6 Different Gig Types - FIXED: using base_price instead of price
const testGigs = [
    {
        title: 'Professional Website Development',
        description: 'I will create a modern, responsive website using React.js, Node.js, and MongoDB.',
        category_id: null,
        pricing_type: 'fixed',
        base_price: 999, // CHANGED: price → base_price
        delivery_days: 14,
        tags: ['web-development', 'react', 'nodejs'],
        requirements: ['Business requirements', 'Design references'],
        status: 'active'
    },
    {
        title: 'Logo & Brand Identity Design',
        description: 'Professional logo design and complete brand identity package.',
        category_id: null,
        pricing_type: 'package',
        base_price: 299, // CHANGED: price → base_price
        delivery_days: 7,
        tags: ['logo-design', 'branding', 'graphic-design'],
        requirements: ['Company name', 'Industry'],
        status: 'active'
    },
    {
        title: 'Mobile App Development (React Native)',
        description: 'Cross-platform mobile app development for iOS and Android.',
        category_id: null,
        pricing_type: 'fixed',
        base_price: 2500, // CHANGED: price → base_price
        delivery_days: 30,
        tags: ['mobile-app', 'react-native'],
        requirements: ['App concept', 'Features list'],
        status: 'active'
    },
    {
        title: 'SEO Optimization Service',
        description: 'Complete SEO audit and optimization for your website.',
        category_id: null,
        pricing_type: 'hourly',
        base_price: 50, // CHANGED: price → base_price
        delivery_days: 21,
        tags: ['seo', 'digital-marketing'],
        requirements: ['Website URL', 'Target keywords'],
        status: 'paused'
    },
    {
        title: 'E-commerce Store Setup',
        description: 'Complete Shopify store setup with payment integration.',
        category_id: null,
        pricing_type: 'fixed',
        base_price: 1500, // CHANGED: price → base_price
        delivery_days: 21,
        tags: ['ecommerce', 'shopify'],
        requirements: ['Product list', 'Payment method'],
        status: 'active'
    },
    {
        title: 'Social Media Marketing Package',
        description: 'Monthly social media management for Instagram, Facebook.',
        category_id: null,
        pricing_type: 'monthly',
        base_price: 499, // CHANGED: price → base_price
        delivery_days: 30,
        tags: ['social-media', 'marketing'],
        requirements: ['Social media accounts'],
        status: 'active'
    }
];

let authToken = '';
let userId = '';
let createdGigs = [];
let categoryIds = {};

// RPC Client Helper
function createRPCClient() {
    return xmlrpc.createClient({
        host: RPC_HOST,
        port: RPC_PORT,
        path: '/RPC2',
        timeout: 10000
    });
}

// ==================== API TEST FUNCTIONS ====================

async function testAPIConnection() {
    console.log('🔗 Testing Backend API connection...');
    try {
        const response = await axios.get(`${BASE_URL}/health`);
        console.log(`✅ Backend API connected: ${response.data.message}`);
        return true;
    } catch (error) {
        console.log('❌ Backend API not connected:', error.message);
        return false;
    }
}

async function testRPCConnection() {
    console.log('🔗 Testing RPC Server connection...');
    return new Promise((resolve) => {
        const client = createRPCClient();
        client.methodCall('system.listMethods', [], (error, methods) => {
            if (error) {
                console.log('❌ RPC Server not connected:', error.message);
                resolve(false);
            } else {
                console.log(`✅ RPC Server connected: ${methods.length} methods available`);
                
                // Show gig-related methods
                const gigMethods = methods.filter(m => m.includes('gig'));
                console.log(`📊 ${gigMethods.length} gig-related methods found`);
                
                // Log specific gig methods
                console.log('🎯 Key gig methods available:');
                const keyMethods = [
                    'create_gig', 'get_all_gigs', 'get_my_gigs', 
                    'get_gig_by_id', 'update_gig', 'delete_gig'
                ];
                keyMethods.forEach(method => {
                    if (methods.includes(method)) {
                        console.log(`   ✅ ${method}`);
                    } else {
                        console.log(`   ❌ ${method} (MISSING!)`);
                    }
                });
                
                resolve(true);
            }
        });
    });
}

async function registerFreelancer() {
    console.log('\n👤 Registering new freelancer...');
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`, testFreelancer);
        
        // Debug response
        console.log('📥 Registration response:', JSON.stringify(response.data, null, 2));
        
        // Try different response structures
        userId = response.data.data?.id || 
                 response.data.data?.user_id || 
                 response.data.id || 
                 response.data.user_id;
        
        console.log('✅ Registration successful');
        console.log(`   User ID extracted: ${userId || 'NOT FOUND'}`);
        console.log(`   Message: ${response.data.message || 'No message'}`);
        
        return true;
    } catch (error) {
        console.log('❌ Registration failed:', error.response?.data?.error || error.message);
        console.log('📋 Full error:', JSON.stringify(error.response?.data, null, 2));
        
        // Try to login if user already exists
        console.log('🔄 Trying login instead...');
        return await loginFreelancer();
    }
}

async function loginFreelancer() {
    console.log('\n🔐 Logging in...');
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, {
            email: testFreelancer.email,
            password: testFreelancer.password
        });
        
        // Debug response
        console.log('📥 Login response:', JSON.stringify(response.data, null, 2));
        
        authToken = response.data.data?.token || 
                    response.data.data?.access_token || 
                    response.data.token || 
                    response.data.access_token;
        
        userId = response.data.data?.id || 
                 response.data.data?.user_id || 
                 response.data.id || 
                 response.data.user_id;
        
        if (!authToken) {
            console.log('❌ No token found in response');
            return false;
        }
        
        console.log('✅ Login successful');
        console.log(`   Token: ${authToken.substring(0, 30)}...`);
        console.log(`   User ID: ${userId || 'NOT FOUND'}`);
        
        return true;
    } catch (error) {
        console.log('❌ Login failed:', error.response?.data?.error || error.message);
        console.log('📋 Full error:', JSON.stringify(error.response?.data, null, 2));
        return false;
    }
}

async function getFreelancerProfile() {
    console.log('\n📋 Getting freelancer profile...');
    
    // Try different endpoints for profile
    const endpoints = [
        '/users/me',           // Common endpoint
        `/users/${userId}`,    // By ID
        '/users/profile'       // Profile endpoint
    ];
    
    for (const endpoint of endpoints) {
        console.log(`   Trying ${endpoint}...`);
        try {
            const response = await axios.get(`${BASE_URL}${endpoint}`, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            
            console.log(`✅ Profile retrieved from ${endpoint}:`);
            const userData = response.data.data || response.data;
            console.log('   ID:', userData.id || userData._id);
            console.log('   Username:', userData.username);
            console.log('   Email:', userData.email);
            console.log('   Role:', userData.role);
            
            // Update userId if found
            if (!userId && userData.id) {
                userId = userData.id;
                console.log(`   Updated User ID: ${userId}`);
            }
            
            return true;
        } catch (error) {
            console.log(`   ❌ ${endpoint}: ${error.response?.status} - ${error.response?.data?.error || error.message}`);
        }
    }
    
    console.log('⚠️ Could not retrieve profile from any endpoint');
    return false;
}

async function getCategories() {
    console.log('\n📁 Getting categories...');
    try {
        const response = await axios.get(`${BASE_URL}/categories`);
        
        console.log('📥 Categories response:', JSON.stringify(response.data, null, 2));
        
        const categories = response.data.data || response.data;
        
        if (categories && categories.length > 0) {
            console.log(`✅ Found ${categories.length} categories`);
            
            // Map category names to IDs
            categories.forEach(category => {
                const name = (category.name || '').toLowerCase();
                const id = category._id || category.id;
                
                if (name.includes('web')) categoryIds.web = id;
                if (name.includes('design') || name.includes('graphic')) categoryIds.design = id;
                if (name.includes('mobile') || name.includes('app')) categoryIds.mobile = id;
                if (name.includes('market') || name.includes('seo')) categoryIds.marketing = id;
            });
            
            // Assign category IDs to gigs
            testGigs[0].category_id = categoryIds.web || categories[0]._id;
            testGigs[1].category_id = categoryIds.design || categories[0]._id;
            testGigs[2].category_id = categoryIds.mobile || categories[0]._id;
            testGigs[3].category_id = categoryIds.marketing || categories[0]._id;
            testGigs[4].category_id = categoryIds.web || categories[0]._id;
            testGigs[5].category_id = categoryIds.marketing || categories[0]._id;
            
            console.log('📊 Category mapping:');
            console.log('   Web Development:', testGigs[0].category_id);
            console.log('   Design:', testGigs[1].category_id);
            console.log('   Mobile:', testGigs[2].category_id);
            console.log('   Marketing:', testGigs[3].category_id);
            
            return true;
        } else {
            console.log('⚠️ No categories found, using dummy IDs');
            // Use dummy IDs for testing
            const dummyId = '65a1b2c3d4e5f67890123456';
            testGigs.forEach(gig => {
                gig.category_id = dummyId;
            });
            return false;
        }
    } catch (error) {
        console.log('❌ Failed to get categories:', error.message);
        console.log('📋 Error details:', error.response?.data);
        
        // Use dummy IDs
        const dummyId = '65a1b2c3d4e5f67890123456';
        testGigs.forEach(gig => {
            gig.category_id = dummyId;
        });
        return false;
    }
}

async function createMultipleGigs() {
    console.log('\n💼 Creating 6 different gigs...');
    
    createdGigs = [];
    let successCount = 0;
    
    for (let i = 0; i < testGigs.length; i++) {
        const gig = testGigs[i];
        console.log(`\n   ${i + 1}. Creating: ${gig.title}`);
        console.log(`     Base Price: $${gig.base_price} | Delivery: ${gig.delivery_days} days`);
        
        try {
            const response = await axios.post(`${BASE_URL}/gigs`, gig, {
                headers: { 
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            });
            
            console.log('📥 Gig creation response:', JSON.stringify(response.data, null, 2));
            
            const gigData = response.data.data || response.data;
            const gigId = gigData._id || gigData.id;
            
            if (gigId) {
                createdGigs.push({
                    id: gigId,
                    title: gig.title,
                    base_price: gig.base_price,
                    status: gig.status
                });
                successCount++;
                console.log(`     ✅ Created successfully (ID: ${gigId.substring(0, 8)}...)`);
            } else {
                console.log(`     ❌ No gig ID returned in response`);
            }
        } catch (error) {
            console.log(`     ❌ Failed: ${error.response?.data?.error || error.message}`);
            console.log(`     📋 Error details:`, error.response?.data);
            
            // Try with minimal data
            if (error.response?.data?.error?.includes('base_price')) {
                console.log(`     🛠️  Trying with minimal data...`);
                try {
                    const minimalGig = {
                        title: gig.title,
                        description: gig.description,
                        category_id: gig.category_id,
                        pricing_type: gig.pricing_type,
                        base_price: gig.base_price,
                        delivery_days: gig.delivery_days
                    };
                    
                    const retryResponse = await axios.post(`${BASE_URL}/gigs`, minimalGig, {
                        headers: { 
                            Authorization: `Bearer ${authToken}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    
                    const retryData = retryResponse.data.data || retryResponse.data;
                    const retryId = retryData._id || retryData.id;
                    
                    if (retryId) {
                        createdGigs.push({
                            id: retryId,
                            title: gig.title,
                            base_price: gig.base_price,
                            status: gig.status
                        });
                        successCount++;
                        console.log(`     ✅ Created with minimal data (ID: ${retryId.substring(0, 8)}...)`);
                    }
                } catch (retryError) {
                    console.log(`     ❌ Retry also failed: ${retryError.message}`);
                }
            }
        }
        
        // Small delay between requests
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log(`\n📊 Creation summary: ${successCount}/${testGigs.length} gigs created successfully`);
    return successCount > 0;
}

async function getMyGigs() {
    console.log('\n📊 Getting my gigs...');
    
    // Try different endpoints
    const endpoints = [
        '/gigs/me',
        `/gigs?freelancer_id=${userId}`,
        '/gigs'
    ];
    
    for (const endpoint of endpoints) {
        console.log(`   Trying endpoint: ${endpoint}`);
        try {
            const response = await axios.get(`${BASE_URL}${endpoint}`, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            
            const gigs = response.data.data || response.data;
            
            if (Array.isArray(gigs)) {
                console.log(`✅ Found ${gigs.length} gigs from ${endpoint}`);
                
                if (gigs.length > 0) {
                    console.log('\n📋 Gig List:');
                    gigs.slice(0, 5).forEach((gig, index) => {
                        const gigId = gig._id || gig.id;
                        console.log(`   ${index + 1}. ${gig.title}`);
                        console.log(`      Status: ${gig.status} | Price: $${gig.base_price || gig.price} | ID: ${gigId?.substring(0, 8)}...`);
                    });
                    
                    if (gigs.length > 5) {
                        console.log(`   ... and ${gigs.length - 5} more`);
                    }
                }
                
                // Update createdGigs with full data
                if (createdGigs.length === 0 && gigs.length > 0) {
                    createdGigs = gigs.map(gig => ({
                        id: gig._id || gig.id,
                        title: gig.title,
                        base_price: gig.base_price || gig.price,
                        status: gig.status
                    }));
                }
                
                return true;
            } else {
                console.log(`   ❌ Response from ${endpoint} is not an array`);
            }
        } catch (error) {
            console.log(`   ❌ ${endpoint}: ${error.response?.status} - ${error.response?.data?.error || error.message}`);
        }
    }
    
    console.log('⚠️ Could not get gigs from any endpoint');
    return false;
}

async function testGigOperations() {
    console.log('\n🔧 Testing gig operations...');
    
    if (createdGigs.length === 0) {
        console.log('⚠️ No gigs available for testing');
        return false;
    }
    
    const testGig = createdGigs[0];
    let operationsPassed = 0;
    const totalOperations = 3;
    
    // 1. Get gig by ID
    console.log(`\n   1. Getting gig by ID: ${testGig.id.substring(0, 8)}...`);
    try {
        const response = await axios.get(`${BASE_URL}/gigs/${testGig.id}`);
        const gigData = response.data.data || response.data;
        console.log(`      ✅ Gig details: ${gigData.title}`);
        console.log(`         Price: $${gigData.base_price || gigData.price}`);
        console.log(`         Status: ${gigData.status}`);
        operationsPassed++;
    } catch (error) {
        console.log(`      ❌ Failed: ${error.response?.data?.error || error.message}`);
    }
    
    // 2. Update gig
    console.log(`\n   2. Updating gig: ${testGig.title}`);
    try {
        const updateData = {
            title: `${testGig.title} - UPDATED`,
            description: `Updated description for ${testGig.title}. Added new features and improvements.`,
            base_price: (testGig.base_price || 0) + 100,
            delivery_days: 10
        };
        
        const response = await axios.put(`${BASE_URL}/gigs/${testGig.id}`, updateData, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        
        const updatedGig = response.data.data || response.data;
        console.log(`      ✅ Updated: New price $${updatedGig.base_price || updatedGig.price}`);
        operationsPassed++;
    } catch (error) {
        console.log(`      ❌ Failed: ${error.response?.data?.error || error.message}`);
    }
    
    // 3. Toggle gig status
    console.log(`\n   3. Toggling gig status`);
    try {
        // First get current status
        const getResponse = await axios.get(`${BASE_URL}/gigs/${testGig.id}`);
        const currentGig = getResponse.data.data || getResponse.data;
        const currentStatus = currentGig.status;
        const newStatus = currentStatus === 'active' ? 'paused' : 'active';
        
        const updateResponse = await axios.patch(`${BASE_URL}/gigs/${testGig.id}/status`, 
            { status: newStatus },
            { headers: { Authorization: `Bearer ${authToken}` } }
        );
        
        console.log(`      ✅ Status changed from "${currentStatus}" to "${newStatus}"`);
        operationsPassed++;
    } catch (error) {
        console.log(`      ❌ Failed: ${error.response?.data?.error || error.message}`);
        console.log(`      📋 Error details:`, error.response?.data);
    }
    
    console.log(`\n   📊 Operations: ${operationsPassed}/${totalOperations} passed`);
    return operationsPassed > 0;
}

async function testAdvancedGigFeatures() {
    console.log('\n🚀 Testing advanced gig features...');
    
    if (createdGigs.length < 2) {
        console.log('⚠️ Need at least 2 gigs for advanced testing');
        return false;
    }
    
    let featuresTested = 0;
    
    // 1. Test search
    console.log('\n   1. Searching gigs...');
    try {
        const response = await axios.get(`${BASE_URL}/gigs/search?q=website&limit=5`);
        const results = response.data.data || response.data;
        console.log(`      ✅ Search results: ${Array.isArray(results) ? results.length : 'N/A'} gigs found`);
        featuresTested++;
    } catch (error) {
        console.log(`      ❌ Search failed: ${error.message}`);
    }
    
    // 2. Test featured gigs
    console.log('\n   2. Getting featured gigs...');
    try {
        const response = await axios.get(`${BASE_URL}/gigs/featured`);
        const featured = response.data.data || response.data;
        console.log(`      ✅ Featured gigs: ${Array.isArray(featured) ? featured.length : 'N/A'} found`);
        featuresTested++;
    } catch (error) {
        console.log(`      ❌ Featured gigs failed: ${error.message}`);
    }
    
    // 3. Test filtering by status
    console.log('\n   3. Filtering gigs by status...');
    try {
        const response = await axios.get(`${BASE_URL}/gigs?status=active`);
        const activeGigs = response.data.data || response.data;
        if (Array.isArray(activeGigs)) {
            const activeCount = activeGigs.filter(g => g.status === 'active').length;
            console.log(`      ✅ Found ${activeCount} active gigs`);
            featuresTested++;
        }
    } catch (error) {
        console.log(`      ❌ Filter failed: ${error.message}`);
    }
    
    console.log(`\n📊 Advanced Features: ${featuresTested}/3 tested`);
    return featuresTested > 0;
}

async function deleteAllGigs() {
    console.log('\n🗑️ Deleting all created gigs...');
    
    if (createdGigs.length === 0) {
        console.log('   No gigs to delete');
        return true;
    }
    
    let deletedCount = 0;
    
    for (const gig of createdGigs) {
        try {
            await axios.delete(`${BASE_URL}/gigs/${gig.id}`, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            console.log(`   ✅ Deleted: ${gig.title.substring(0, 30)}...`);
            deletedCount++;
        } catch (error) {
            console.log(`   ❌ Failed to delete ${gig.title}: ${error.response?.data?.error || error.message}`);
        }
        
        // Small delay
        await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    console.log(`\n📊 Deletion summary: ${deletedCount}/${createdGigs.length} gigs deleted`);
    createdGigs = [];
    return deletedCount > 0;
}

async function testRPCGigFunctions() {
    console.log('\n🧪 Testing RPC gig functions directly...');
    
    return new Promise((resolve) => {
        const client = createRPCClient();
        
        // Test 1: Get all gigs
        client.methodCall('get_all_gigs', [], (error, result) => {
            if (error) {
                console.log('   ❌ get_all_gigs failed:', error.message);
                resolve(false);
                return;
            }
            
            console.log(`   ✅ get_all_gigs: ${Array.isArray(result) ? result.length + ' gigs' : 'object returned'}`);
            
            // Test 2: Create a test gig via RPC
            if (userId) {
                const testGigData = {
                    title: 'RPC Test Gig',
                    description: 'Created via RPC for testing',
                    category_id: testGigs[0].category_id,
                    pricing_type: 'fixed',
                    base_price: 100,
                    delivery_days: 7,
                    freelancer_id: userId,
                    status: 'active'
                };
                
                client.methodCall('create_gig', [userId, testGigData], (createError, createResult) => {
                    if (createError) {
                        console.log('   ❌ create_gig failed:', createError.message);
                        console.log('   💡 Make sure RPC server has proper MongoDB connection');
                    } else {
                        console.log('   ✅ create_gig: Success');
                        console.log(`      Gig ID: ${createResult}`);
                    }
                    
                    // Test 3: Get categories
                    client.methodCall('get_all_categories', [], (catError, categories) => {
                        if (catError) {
                            console.log('   ❌ get_all_categories failed:', catError.message);
                        } else {
                            console.log(`   ✅ get_all_categories: ${Array.isArray(categories) ? categories.length + ' categories' : 'object returned'}`);
                        }
                        
                        resolve(true);
                    });
                });
            } else {
                console.log('   ⚠️ Skipping create_gig (no user ID)');
                
                client.methodCall('get_all_categories', [], (catError, categories) => {
                    if (catError) {
                        console.log('   ❌ get_all_categories failed:', catError.message);
                        resolve(false);
                    } else {
                        console.log(`   ✅ get_all_categories: ${Array.isArray(categories) ? categories.length + ' categories' : 'object returned'}`);
                        resolve(true);
                    }
                });
            }
        });
    });
}

// ==================== MAIN TEST FLOW ====================

async function runCompleteTest() {
    console.log('🚀 Starting Complete Freelancer Flow Test\n');
    console.log('='.repeat(60));
    console.log('📋 TEST PLAN:');
    console.log('1. 🔗 Test Backend Connection');
    console.log('2. 🔗 Test RPC Connection');
    console.log('3. 👤 Register Freelancer');
    console.log('4. 🔐 Login');
    console.log('5. 📋 Get Profile');
    console.log('6. 📁 Get Categories');
    console.log('7. 💼 Create 6 Different Gigs');
    console.log('8. 📊 List My Gigs');
    console.log('9. 🔧 Test Gig Operations (Get/Update/Toggle)');
    console.log('10. 🚀 Test Advanced Features');
    console.log('11. 🗑️ Delete All Gigs');
    console.log('12. 🧪 Test RPC Functions');
    console.log('='.repeat(60));
    
    const results = {};
    
    try {
        // Step 1
        console.log('\n1. 🔗 Testing Backend Connection');
        results.apiConnection = await testAPIConnection();
        if (!results.apiConnection) {
            console.log('❌ Test stopped: Backend not connected');
            return showResults(results);
        }
        
        // Step 2
        console.log('\n2. 🔗 Testing RPC Connection');
        results.rpcConnection = await testRPCConnection();
        
        // Step 3
        console.log('\n3. 👤 Registering Freelancer');
        results.registration = await registerFreelancer();
        
        // Step 4
        console.log('\n4. 🔐 Logging In');
        results.login = await loginFreelancer();
        if (!results.login) {
            console.log('❌ Test stopped: Cannot login');
            return showResults(results);
        }
        
        // Step 5
        console.log('\n5. 📋 Getting Profile');
        results.profile = await getFreelancerProfile();
        
        // Step 6
        console.log('\n6. 📁 Getting Categories');
        results.categories = await getCategories();
        
        // Step 7
        console.log('\n7. 💼 Creating 6 Different Gigs');
        results.createGigs = await createMultipleGigs();
        
        // Step 8
        console.log('\n8. 📊 Listing My Gigs');
        results.listGigs = await getMyGigs();
        
        // Step 9
        console.log('\n9. 🔧 Testing Gig Operations');
        results.gigOperations = await testGigOperations();
        
        // Step 10
        console.log('\n10. 🚀 Testing Advanced Features');
        results.advancedFeatures = await testAdvancedGigFeatures();
        
        // Step 11
        console.log('\n11. 🗑️ Deleting All Gigs');
        results.deleteGigs = await deleteAllGigs();
        
        // Step 12
        if (results.rpcConnection) {
            console.log('\n12. 🧪 Testing RPC Functions');
            results.rpcTest = await testRPCGigFunctions();
        }
        
    } catch (error) {
        console.error('🔥 Unexpected error:', error);
        console.error('Stack:', error.stack);
    }
    
    return showResults(results);
}

function showResults(results) {
    console.log('\n📊 ============ FINAL RESULTS ============');
    
    const testNames = {
        apiConnection: 'Backend Connection',
        rpcConnection: 'RPC Connection',
        registration: 'Registration',
        login: 'Login',
        profile: 'Profile',
        categories: 'Categories',
        createGigs: 'Create Gigs (6)',
        listGigs: 'List Gigs',
        gigOperations: 'Gig Operations',
        advancedFeatures: 'Advanced Features',
        deleteGigs: 'Delete Gigs',
        rpcTest: 'RPC Tests'
    };
    
    let passed = 0;
    let total = 0;
    
    Object.keys(testNames).forEach(key => {
        if (results[key] !== undefined) {
            total++;
            if (results[key]) passed++;
            
            const emoji = results[key] ? '✅' : '❌';
            const status = results[key] ? 'PASSED' : 'FAILED';
            console.log(`${emoji} ${testNames[key]}: ${status}`);
        }
    });
    
    console.log('='.repeat(45));
    console.log(`🎯 RESULT: ${passed}/${total} (${Math.round((passed/total)*100)}%)`);
    
    if (passed === total) {
        console.log('🎉 EXCELLENT! All tests passed!');
        console.log('💪 Your system is fully functional!');
    } else if (passed >= total * 0.7) {
        console.log('👍 GOOD! Most tests passed');
        console.log('🔧 Some features need attention');
    } else {
        console.log('⚠️ NEEDS WORK: Several tests failed');
        console.log('🚨 Review the errors above');
    }
    
    console.log('='.repeat(45));
    
    // Show summary
    console.log('\n📈 TEST SUMMARY:');
    console.log(`   • Gigs attempted: ${testGigs.length}`);
    console.log(`   • Gigs created: ${createdGigs.length}`);
    console.log(`   • User ID: ${userId || 'Not found'}`);
    console.log(`   • Token: ${authToken ? 'Present' : 'Missing'}`);
    console.log(`   • Test completed: ${new Date().toLocaleTimeString()}`);
    
    return passed === total;
}

// Run the test
if (require.main === module) {
    console.log('🚀 WORKNET FREELANCER FLOW TEST - FIXED VERSION');
    console.log('📅', new Date().toLocaleString());
    console.log('='.repeat(60));
    
    runCompleteTest()
        .then(success => {
            const exitCode = success ? 0 : 1;
            setTimeout(() => {
                process.exit(exitCode);
            }, 2000);
        })
        .catch(error => {
            console.error('🔥 Fatal test error:', error);
            process.exit(1);
        });
}

module.exports = { runCompleteTest };