// test-category-order.js
const rpcClient = require('./utils/rpcClient');

async function test() {
    const testData = [
        { 
            id: '692dbb7515355c3dedcfb35e', 
            order: 100 
        },
        { 
            id: '693d7eff1a768746c8c8fb5a', 
            order: 200 
        }
    ];
    
    console.log('🧪 Testing updateCategoryOrder directly...');
    console.log('Test data:', JSON.stringify(testData, null, 2));
    
    try {
        const result = await rpcClient.updateCategoryOrder(testData);
        console.log('✅ Result:', result);
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

test();