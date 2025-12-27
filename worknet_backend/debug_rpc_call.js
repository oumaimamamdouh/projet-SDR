// debug_rpc_call.js
const rpcClient = require('./utils/rpcClient');

async function debugRpcCall() {
    console.log('🔍 Testing RPC call directly...');
    
    const testData = [
        {
            id: '692dbb7515355c3dedcfb360',
            order: 999
        }
    ];
    
    console.log('📤 Calling updateCategoryOrder with:', JSON.stringify(testData, null, 2));
    
    try {
        const result = await rpcClient.updateCategoryOrder(testData);
        console.log('✅ Result:', result);
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

debugRpcCall();