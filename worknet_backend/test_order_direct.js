// test_order_direct.js
const xmlrpc = require('xmlrpc');

const client = xmlrpc.createClient({
    host: 'localhost',
    port: 8000,
    path: '/RPC2'
});

async function testOrderUpdate() {
    try {
        // Login first
        const loginResult = await new Promise((resolve, reject) => {
            client.methodCall('login_user', [{
                email: 'admin@example.com',
                password: 'pwd12345'
            }], (error, value) => {
                if (error) reject(error);
                else resolve(value);
            });
        });
        
        console.log('Login result:', loginResult.success ? '✅' : '❌');
        
        if (!loginResult.success) {
            console.log('Cannot proceed without login');
            return;
        }
        
        // Get categories first
        const categoriesResult = await new Promise((resolve, reject) => {
            client.methodCall('get_all_categories', [], (error, value) => {
                if (error) reject(error);
                else resolve(value);
            });
        });
        
        console.log(`\nFound ${categoriesResult.categories?.length || 0} categories`);
        
        if (categoriesResult.categories && categoriesResult.categories.length >= 2) {
            // Test with first 2 categories
            const testCategories = categoriesResult.categories.slice(0, 2);
            const orderedCategories = testCategories.map((cat, index) => ({
                id: cat._id,
                order: index + 100  // Use high numbers to avoid conflicts
            }));
            
            console.log('\nTesting with:', orderedCategories);
            
            // Call update_category_order
            const orderResult = await new Promise((resolve, reject) => {
                client.methodCall('update_category_order', [orderedCategories], (error, value) => {
                    if (error) reject(error);
                    else resolve(value);
                });
            });
            
            console.log('\nOrder update result:', orderResult);
        }
        
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

testOrderUpdate();