// backend/test-complete-flow.js
const axios = require('axios');
const xmlrpc = require('xmlrpc');

// Configuration
const BASE_URL = 'http://localhost:5000/api';
const RPC_HOST = 'localhost';
const RPC_PORT = 8000;

// Test Data
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

// 6 Different Gig Types
const testGigs = [
    {
        title: 'Professional Website Development',
        description: 'I will create a modern, responsive website using React.js, Node.js, and MongoDB. Perfect for businesses looking to establish online presence.',
        category_id: null, // Will be set from DB
        pricing_type: 'fixed',
        price: 999,
        delivery_days: 14,
        tags: ['web-development', 'react', 'nodejs', 'mongodb', 'responsive'],
        requirements: ['Business requirements document', 'Design references', 'Content'],
        status: 'active'
    },
    {
        title: 'Logo & Brand Identity Design',
        description: 'Professional logo design and complete brand identity package including business cards, letterhead, and social media kit.',
        category_id: null,
        pricing_type: 'package',
        price: 299,
        delivery_days: 7,
        tags: ['logo-design', 'branding', 'graphic-design', 'illustration'],
        requirements: ['Company name', 'Industry', 'Color preferences', 'Competitor references'],
        status: 'active'
    },
    {
        title: 'Mobile App Development (React Native)',
        description: 'Cross-platform mobile app development for iOS and Android using React Native with clean code and best practices.',
        category_id: null,
        pricing_type: 'fixed',
        price: 2500,
        delivery_days: 30,
        tags: ['mobile-app', 'react-native', 'ios', 'android', 'cross-platform'],
        requirements: ['App concept', 'Features list', 'Target audience', 'Design mockups'],
        status: 'active'
    },
    {
        title: 'SEO Optimization Service',
        description: 'Complete SEO audit and optimization for your website to improve Google rankings and organic traffic.',
        category_id: null,
        pricing_type: 'hourly',
        price: 50,
        delivery_days: 21,
        tags: ['seo', 'digital-marketing', 'google-rankings', 'optimization'],
        requirements: ['Website URL', 'Target keywords', 'Competitor analysis'],
        status: 'paused'
    },
    {
        title: 'E-commerce Store Setup',
        description: 'Complete Shopify/WordPress WooCommerce store setup with payment integration, product listings, and security.',
        category_id: null,
        pricing_type: 'fixed',
        price: 1500,
        delivery_days: 21,
        tags: ['ecommerce', 'shopify', 'woocommerce', 'payment-gateway'],
        requirements: ['Product list', 'Payment method preferences', 'Shipping requirements'],
        status: 'active'
    },
    {
        title: 'Social Media Marketing Package',
        description: 'Monthly social media management for Instagram, Facebook, and LinkedIn including content creation and analytics.',
        category_id: null,
        pricing_type: 'monthly',
        price: 499,
        delivery_days: 30,
        tags: ['social-media', 'marketing', 'content-creation', 'analytics'],
        requirements: ['Social media accounts', 'Brand guidelines', 'Target audience'],
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
        path: '/RPC2'
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
                
                resolve(true);
            }
        });
    });
}

async function registerFreelancer() {
    console.log('\n👤 Registering new freelancer...');
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`, testFreelancer);
        console.log('✅ Registration successful:', response.data.message);
        userId = response.data.data?.id || response.data.data?.user_id;
        return true;
    } catch (error) {
        console.log('❌ Registration failed:', error.response?.data?.error || error.message);
        
        // Try to login if user already exists
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
        
        authToken = response.data.data?.token || response.data.token;
        userId = response.data.data?.id || response.data.data?.user_id;
        
        console.log('✅ Login successful');
        console.log(`   Token: ${authToken.substring(0, 20)}...`);
        console.log(`   User ID: ${userId}`);
        
        return true;
    } catch (error) {
        console.log('❌ Login failed:', error.response?.data?.error || error.message);
        return false;
    }
}

async function getFreelancerProfile() {
    console.log('\n📋 Getting freelancer profile...');
    try {
        const response = await axios.get(`${BASE_URL}/users/profile`, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        
        console.log('✅ Profile retrieved:');
        console.log('   ID:', response.data.data.id);
        console.log('   Username:', response.data.data.username);
        console.log('   Email:', response.data.data.email);
        console.log('   Role:', response.data.data.role);
        
        return true;
    } catch (error) {
        console.log('❌ Failed to get profile:', error.response?.data?.error || error.message);
        return false;
    }
}

async function getCategories() {
    console.log('\n📁 Getting categories...');
    try {
        const response = await axios.get(`${BASE_URL}/categories`);
        
        if (response.data.data && response.data.data.length > 0) {
            console.log(`✅ Found ${response.data.data.length} categories`);
            
            // Map category names to IDs
            response.data.data.forEach(category => {
                const name = category.name?.toLowerCase();
                if (name.includes('web')) categoryIds.web = category._id || category.id;
                if (name.includes('design')) categoryIds.design = category._id || category.id;
                if (name.includes('mobile')) categoryIds.mobile = category._id || category.id;
                if (name.includes('marketing')) categoryIds.marketing = category._id || category.id;
            });
            
            // Assign category IDs to gigs
            testGigs[0].category_id = categoryIds.web || response.data.data[0]._id;
            testGigs[1].category_id = categoryIds.design || response.data.data[0]._id;
            testGigs[2].category_id = categoryIds.mobile || response.data.data[0]._id;
            testGigs[3].category_id = categoryIds.marketing || response.data.data[0]._id;
            testGigs[4].category_id = categoryIds.web || response.data.data[0]._id;
            testGigs[5].category_id = categoryIds.marketing || response.data.data[0]._id;
            
            console.log('📊 Category mapping:');
            console.log('   Web Development:', testGigs[0].category_id);
            console.log('   Design:', testGigs[1].category_id);
            console.log('   Mobile:', testGigs[2].category_id);
            console.log('   Marketing:', testGigs[3].category_id);
            
            return true;
        } else {
            console.log('⚠️ No categories found, using dummy IDs');
            // Use dummy IDs for testing
            testGigs.forEach(gig => {
                gig.category_id = '65a1b2c3d4e5f67890123456';
            });
            return false;
        }
    } catch (error) {
        console.log('❌ Failed to get categories:', error.message);
        testGigs.forEach(gig => {
            gig.category_id = '65a1b2c3d4e5f67890123456';
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
        console.log(`     Price: $${gig.price} | Delivery: ${gig.days || gig.delivery_days} days`);
        
        try {
            const response = await axios.post(`${BASE_URL}/gigs`, gig, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            
            const gigId = response.data.data?._id || response.data.data?.id;
            if (gigId) {
                createdGigs.push({
                    id: gigId,
                    title: gig.title,
                    price: gig.price,
                    status: gig.status
                });
                successCount++;
                console.log(`     ✅ Created successfully (ID: ${gigId.substring(0, 8)}...)`);
            } else {
                console.log(`     ❌ No gig ID returned`);
            }
        } catch (error) {
            console.log(`     ❌ Failed: ${error.response?.data?.error || error.message}`);
        }
    }
    
    console.log(`\n📊 Creation summary: ${successCount}/${testGigs.length} gigs created successfully`);
    return successCount > 0;
}

async function getMyGigs() {
    console.log('\n📊 Getting my gigs...');
    try {
        const response = await axios.get(`${BASE_URL}/gigs/me`, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        
        const gigs = response.data.data || [];
        console.log(`✅ Found ${gigs.length} gigs`);
        
        if (gigs.length > 0) {
            console.log('\n📋 Gig List:');
            gigs.forEach((gig, index) => {
                console.log(`   ${index + 1}. ${gig.title}`);
                console.log(`      Status: ${gig.status} | Price: $${gig.price} | ID: ${gig._id?.substring(0, 8) || gig.id?.substring(0, 8)}...`);
            });
        }
        
        // Update createdGigs with full data
        if (createdGigs.length === 0 && gigs.length > 0) {
            createdGigs = gigs.map(gig => ({
                id: gig._id || gig.id,
                title: gig.title,
                price: gig.price,
                status: gig.status
            }));
        }
        
        return true;
    } catch (error) {
        console.log('❌ Failed to get gigs:', error.response?.data?.error || error.message);
        return false;
    }
}

async function testGigOperations() {
    console.log('\n🔧 Testing gig operations...');
    
    if (createdGigs.length === 0) {
        console.log('⚠️ No gigs available for testing');
        return false;
    }
    
    const testGig = createdGigs[0]; // Use first gig for testing
    let operationsPassed = 0;
    const totalOperations = 3;
    
    // 1. Get gig by ID
    console.log(`\n   1. Getting gig by ID: ${testGig.id.substring(0, 8)}...`);
    try {
        const response = await axios.get(`${BASE_URL}/gigs/${testGig.id}`);
        console.log(`      ✅ Gig details: ${response.data.data?.title}`);
        operationsPassed++;
    } catch (error) {
        console.log(`      ❌ Failed: ${error.response?.data?.error || error.message}`);
    }
    
    // 2. Update gig
    console.log(`\n   2. Updating gig: ${testGig.title}`);
    try {
        const updateData = {
            title: `${testGig.title} - UPDATED`,
            description: `${testGig.description || 'Description'}. Updated with additional features and improvements.`,
            price: testGig.price + 100,
            delivery_days: (testGig.delivery_days || 14) + 3
        };
        
        const response = await axios.put(`${BASE_URL}/gigs/${testGig.id}`, updateData, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        
        console.log(`      ✅ Updated: New price $${response.data.data?.price}`);
        operationsPassed++;
    } catch (error) {
        console.log(`      ❌ Failed: ${error.response?.data?.error || error.message}`);
    }
    
    // 3. Toggle gig status
    console.log(`\n   3. Toggling gig status`);
    try {
        const currentStatus = testGig.status;
        const newStatus = currentStatus === 'active' ? 'paused' : 'active';
        
        const response = await axios.patch(`${BASE_URL}/gigs/${testGig.id}/status`, 
            { status: newStatus },
            { headers: { Authorization: `Bearer ${authToken}` } }
        );
        
        console.log(`      ✅ Status changed from ${currentStatus} to ${newStatus}`);
        operationsPassed++;
    } catch (error) {
        console.log(`      ❌ Failed: ${error.response?.data?.error || error.message}`);
    }
    
    console.log(`\n   📊 Operations: ${operationsPassed}/${totalOperations} passed`);
    return operationsPassed === totalOperations;
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
    }
    
    console.log(`\n📊 Deletion summary: ${deletedCount}/${createdGigs.length} gigs deleted`);
    createdGigs = [];
    return deletedCount > 0;
}

async function testRPCGigFunctions() {
    console.log('\n🧪 Testing RPC gig functions...');
    
    const client = createRPCClient();
    const tests = [
        { method: 'get_all_gigs', params: [], description: 'Get all gigs' },
        { method: 'get_featured_gigs', params: [], description: 'Get featured gigs' },
        { method: 'get_all_categories', params: [], description: 'Get all categories' },
        { method: 'search_gigs', params: ['website', { limit: 3 }], description: 'Search gigs' }
    ];
    
    let passed = 0;
    
    for (const test of tests) {
        try {
            const result = await new Promise((resolve, reject) => {
                client.methodCall(test.method, test.params, (error, value) => {
                    if (error) reject(error);
                    else resolve(value);
                });
            });
            
            const resultInfo = Array.isArray(result) ? 
                `${result.length} items` : 
                (typeof result === 'object' ? 'object returned' : 'value returned');
            
            console.log(`   ✅ ${test.description}: ${resultInfo}`);
            passed++;
        } catch (error) {
            console.log(`   ❌ ${test.description}: ${error.message}`);
        }
    }
    
    console.log(`\n📊 RPC Tests: ${passed}/${tests.length} passed`);
    return passed === tests.length;
}

async function testAdvancedGigFeatures() {
    console.log('\n🚀 Testing advanced gig features...');
    
    if (createdGigs.length < 2) {
        console.log('⚠️ Need at least 2 gigs for advanced testing');
        return false;
    }
    
    let featuresTested = 0;
    const totalFeatures = 4;
    
    // 1. Test gig filtering by status
    console.log('\n   1. Filtering gigs by status...');
    try {
        const response = await axios.get(`${BASE_URL}/gigs/me?status=active`, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        
        const activeGigs = response.data.data?.filter(g => g.status === 'active') || [];
        console.log(`      ✅ Found ${activeGigs.length} active gigs`);
        featuresTested++;
    } catch (error) {
        console.log(`      ❌ Filter failed: ${error.message}`);
    }
    
    // 2. Test gig search
    console.log('\n   2. Searching gigs...');
    try {
        const response = await axios.get(`${BASE_URL}/gigs/search?q=website&limit=5`);
        console.log(`      ✅ Search results: ${response.data.data?.length || 0} gigs found`);
        featuresTested++;
    } catch (error) {
        console.log(`      ❌ Search failed: ${error.message}`);
    }
    
    // 3. Test getting featured gigs
    console.log('\n   3. Getting featured gigs...');
    try {
        const response = await axios.get(`${BASE_URL}/gigs/featured`);
        console.log(`      ✅ Featured gigs: ${response.data.data?.length || 0} found`);
        featuresTested++;
    } catch (error) {
        console.log(`      ❌ Featured gigs failed: ${error.message}`);
    }
    
    // 4. Test different status changes
    console.log('\n   4. Testing multiple status changes...');
    if (createdGigs.length >= 3) {
        const statusTests = [
            { gig: createdGigs[1], newStatus: 'draft' },
            { gig: createdGigs[2], newStatus: 'inactive' }
        ];
        
        for (const test of statusTests) {
            try {
                await axios.patch(`${BASE_URL}/gigs/${test.gig.id}/status`, 
                    { status: test.newStatus },
                    { headers: { Authorization: `Bearer ${authToken}` } }
                );
                console.log(`      ✅ ${test.gig.title.substring(0, 20)}... → ${test.newStatus}`);
            } catch (error) {
                console.log(`      ❌ Status change failed: ${error.message}`);
            }
        }
        featuresTested++;
    }
    
    console.log(`\n📊 Advanced Features: ${featuresTested}/${totalFeatures} tested`);
    return featuresTested >= 2;
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
    
    const results = {
        apiConnection: false,
        rpcConnection: false,
        registration: false,
        login: false,
        profile: false,
        categories: false,
        createGigs: false,
        listGigs: false,
        gigOperations: false,
        advancedFeatures: false,
        deleteGigs: false,
        rpcTest: false
    };
    
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
    
    Object.entries(results).forEach(([key, value]) => {
        total++;
        if (value) passed++;
        
        const emoji = value ? '✅' : '❌';
        const status = value ? 'PASSED' : 'FAILED';
        console.log(`${emoji} ${testNames[key] || key}: ${status}`);
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
    
    // Show summary statistics
    if (createdGigs.length > 0) {
        console.log('\n📈 TEST SUMMARY:');
        console.log(`   • Gigs created: ${testGigs.length} different types`);
        console.log(`   • Gigs deleted: ${testGigs.length - createdGigs.length}`);
        console.log(`   • Categories used: ${Object.keys(categoryIds).length}`);
        console.log(`   • Test duration: ${new Date().toLocaleTimeString()}`);
    }
    
    return passed === total;
}

// Run the test
if (require.main === module) {
    console.log('🚀 WORKNET FREELANCER FLOW TEST');
    console.log('📅', new Date().toLocaleString());
    console.log('='.repeat(60));
    
    runCompleteTest()
        .then(success => {
            process.exit(success ? 0 : 1);
        })
        .catch(error => {
            console.error('🔥 Fatal test error:', error);
            process.exit(1);
        });
}

module.exports = { runCompleteTest };