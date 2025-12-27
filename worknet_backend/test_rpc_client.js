// test_rpc_client.js
const rpcClient = require('./utils/rpcClient');

async function testRPCClient() {
    console.log('🔍 Testing RPC Client Directly...');
    
    try {
        // Test 1: Simple call
        console.log('\n📋 Test 1: Simple update_category_order call');
        const testData = [
            { id: '692dbb7515355c3dedcfb35e', order: 100 },
            { id: '692dbb7515355c3dedcfb35f', order: 200 }
        ];
        
        console.log('📤 Sending:', testData);
        const result = await rpcClient.call('update_category_order', [testData]);
        console.log('📥 Result:', result);
        
        // Test 2: Using the wrapper method
        console.log('\n📋 Test 2: Using updateCategoryOrder wrapper');
        const result2 = await rpcClient.updateCategoryOrder(testData);
        console.log('📥 Result:', result2);
        
        // Test 3: Check if method exists
        console.log('\n📋 Test 3: Checking method availability');
        const methods = await rpcClient.call('system.listMethods', []);
        console.log('Has update_category_order:', methods.includes('update_category_order'));
        console.log('Total methods:', methods.length);
        
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

testRPCClient();