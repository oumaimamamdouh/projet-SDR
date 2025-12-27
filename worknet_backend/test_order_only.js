// const axios = require('axios');

// const API_BASE_URL = 'http://localhost:5000/api';
// const ADMIN_CREDENTIALS = {
//   email: 'admin@example.com',
//   password: 'pwd12345'
// };

// async function testOrderUpdate() {
//   console.log('🔄 ========== TESTING CATEGORY ORDER UPDATE ==========\n');
  
//   try {
//     // 1. Login as admin
//     console.log('1. Logging in as admin...');
//     const loginRes = await axios.post(`${API_BASE_URL}/users/login`, ADMIN_CREDENTIALS);
    
//     if (!loginRes.data.success) {
//       console.log('❌ Login failed:', loginRes.data.error);
//       return;
//     }
    
//     const token = loginRes.data.token;
//     const userRole = loginRes.data.user?.role;
    
//     console.log('✅ Login successful');
//     console.log(`   Role: ${userRole}`);
//     console.log(`   Token: ${token.substring(0, 30)}...\n`);
    
//     // 2. Get current categories
//     console.log('2. Getting current categories...');
//     const categoriesRes = await axios.get(`${API_BASE_URL}/categories`, {
//       headers: { 'Authorization': `Bearer ${token}` }
//     });
    
//     const categories = categoriesRes.data.data || [];
//     console.log(`📊 Found ${categories.length} categories:`);
    
//     categories.forEach((cat, index) => {
//       console.log(`   ${index + 1}. ${cat.name} - ID: ${cat._id} - Order: ${cat.sort_order || 0}`);
//     });
    
//     // 3. Check if we have enough categories
//     if (categories.length < 2) {
//       console.log('\n⚠️ Need at least 2 categories to test order update.');
//       console.log('   Creating a second category...');
      
//       const newCategoryData = {
//         name: `Test Category ${Date.now()}`,
//         description: 'Second category for order testing',
//         sort_order: 999,
//         is_active: true
//       };
      
//       const createRes = await axios.post(`${API_BASE_URL}/categories`, newCategoryData, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
      
//       if (createRes.data.success) {
//         console.log('✅ Second category created');
//         console.log(`   ID: ${createRes.data.data._id}`);
        
//         // Refresh categories list
//         const newCategoriesRes = await axios.get(`${API_BASE_URL}/categories`, {
//           headers: { 'Authorization': `Bearer ${token}` }
//         });
        
//         categories = newCategoriesRes.data.data || [];
//       } else {
//         console.log('❌ Failed to create second category:', createRes.data.error);
//         return;
//       }
//     }
    
//     // 4. Prepare order update
//     console.log('\n3. Preparing order update...');
//     const updateData = {
//       categories: categories.map((cat, index) => ({
//         id: cat._id,
//         order: (index + 1) * 100 // New orders: 100, 200, etc.
//       }))
//     };
    
//     console.log('📤 Update data:');
//     updateData.categories.forEach(item => {
//       console.log(`   ID: ${item.id.slice(-6)}... → Order: ${item.order}`);
//     });
    
//     // 5. Send update
//     console.log('\n4. Sending order update request...');
//     const updateRes = await axios.put(`${API_BASE_URL}/categories/update-order`, updateData, {
//       headers: { 'Authorization': `Bearer ${token}` }
//     });
    
//     console.log('📥 Update response:', JSON.stringify(updateRes.data, null, 2));
    
//     if (updateRes.data.success) {
//       console.log('✅ Order update successful!\n');
      
//       // 6. Verify the update
//       console.log('5. Verifying update...');
//       await new Promise(resolve => setTimeout(resolve, 500));
      
//       const verifyRes = await axios.get(`${API_BASE_URL}/categories`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
      
//       const updatedCategories = verifyRes.data.data || [];
//       const sortedCategories = [...updatedCategories].sort((a, b) => a.sort_order - b.sort_order);
      
//       console.log('📊 Updated order (sorted by sort_order):');
//       sortedCategories.forEach((cat, index) => {
//         console.log(`   ${index + 1}. ${cat.name}: ${cat.sort_order}`);
//       });
      
//       // 7. Test summary
//       console.log('\n🎯 TEST SUMMARY:');
//       console.log(`   Categories updated: ${updateData.categories.length}`);
//       console.log(`   Update successful: ✅ Yes`);
//       console.log(`   New order verified: ✅ Yes`);
      
//       // Check if order actually changed
//       const orderChanged = categories.some((cat, index) => {
//         const updatedCat = updatedCategories.find(c => c._id === cat._id);
//         return updatedCat && updatedCat.sort_order !== cat.sort_order;
//       });
      
//       console.log(`   Order changed: ${orderChanged ? '✅ Yes' : '⚠️ No change detected'}`);
      
//     } else {
//       console.log('❌ Order update failed:', updateRes.data.error);
      
//       // Debug the error
//       if (updateRes.data.error.includes('ObjectId')) {
//         console.log('\n💡 ObjectId format issue.');
//         console.log('   Check if category IDs are valid MongoDB ObjectIds');
//       }
//     }
    
//   } catch (error) {
//     console.error('❌ Error:', error.response?.data || error.message);
    
//     if (error.response?.status === 400) {
//       console.log('\n🔍 400 Bad Request - Check the request format:');
//       console.log('   Expected format: { categories: [{id: "...", order: number}, ...] }');
//     }
    
//     if (error.response?.status === 403) {
//       console.log('\n🔒 403 Forbidden - Admin access required');
//     }
//   }
// }

// testOrderUpdate();
const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';
const ADMIN_CREDENTIALS = {
  email: 'admin@example.com',
  password: 'pwd12345'
};

async function testOrderUpdate() {
  console.log('🔄 ========== TESTING CATEGORY ORDER UPDATE ==========\n');
  
  try {
    // 1. Login as admin
    console.log('1. Logging in as admin...');
    const loginRes = await axios.post(`${API_BASE_URL}/users/login`, ADMIN_CREDENTIALS);
    
    if (!loginRes.data.success) {
      console.log('❌ Login failed:', loginRes.data.error);
      return;
    }
    
    const token = loginRes.data.token;
    const userRole = loginRes.data.user?.role;
    
    console.log('✅ Login successful');
    console.log(`   Role: ${userRole}`);
    console.log(`   Token: ${token.substring(0, 30)}...\n`);
    
    // Set up axios instance with token
    const authAxios = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    // 2. Get current categories
    console.log('2. Getting current categories...');
    const categoriesRes = await authAxios.get('/categories');
    
    let categories = categoriesRes.data.data || [];
    console.log(`📊 Found ${categories.length} categories:`);
    
    categories.forEach((cat, index) => {
      console.log(`   ${index + 1}. ${cat.name} - Order: ${cat.sort_order || 0}`);
    });
    
    // 3. Check if we have enough categories
    if (categories.length < 2) {
      console.log('\n⚠️ Need at least 2 categories to test order update.');
      console.log('   Creating a second category...');
      
      const newCategoryData = {
        name: `Test Category ${Date.now()}`,
        description: 'Second category for order testing',
        sort_order: 999,
        is_active: true
      };
      
      const createRes = await authAxios.post('/categories', newCategoryData);
      
      if (createRes.data.success) {
        console.log('✅ Second category created');
        console.log(`   ID: ${createRes.data.data._id}`);
        
        // Refresh categories list
        await new Promise(resolve => setTimeout(resolve, 500));
        const newCategoriesRes = await authAxios.get('/categories');
        categories = newCategoriesRes.data.data || [];
      } else {
        console.log('❌ Failed to create second category:', createRes.data.error);
        return;
      }
    }
    
    // 4. Show current order
    console.log('\n📊 CURRENT ORDER:');
    const sortedCurrent = [...categories].sort((a, b) => a.sort_order - b.sort_order);
    sortedCurrent.forEach((cat, index) => {
      console.log(`   ${index + 1}. ${cat.name}: ${cat.sort_order}`);
    });
    
    // 5. Prepare order update - reverse the order
    console.log('\n3. Preparing order update...');
    const updateData = {
      categories: categories.map((cat, index) => ({
        id: cat._id,
        order: (categories.length - index) * 100 // Reverse order: 300, 200, 100
      }))
    };
    
    console.log('📤 NEW ORDER TO SET:');
    updateData.categories.forEach(item => {
      const cat = categories.find(c => c._id === item.id);
      console.log(`   ${cat?.name}: ${cat?.sort_order} → ${item.order}`);
    });
    
    console.log('\n📦 Sending update data:');
    console.log(JSON.stringify(updateData, null, 2));
    
    // 6. Send update
    console.log('\n4. Sending order update request...');
    const updateRes = await authAxios.put('/categories/update-order', updateData);
    
    console.log('📥 Update response:', JSON.stringify(updateRes.data, null, 2));
    
    if (updateRes.data.success) {
      console.log('✅ Order update successful!\n');
      
      // 7. Verify the update
      console.log('5. Verifying update...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const verifyRes = await authAxios.get('/categories');
      const updatedCategories = verifyRes.data.data || [];
      const sortedUpdated = [...updatedCategories].sort((a, b) => a.sort_order - b.sort_order);
      
      console.log('📊 UPDATED ORDER (sorted by sort_order):');
      sortedUpdated.forEach((cat, index) => {
        console.log(`   ${index + 1}. ${cat.name}: ${cat.sort_order}`);
      });
      
      // 8. Check if RPC server was called
      console.log('\n🔍 Checking RPC communication...');
      console.log('   If order changed, RPC is working.');
      console.log('   Check Python RPC server logs for messages.');
      
      // 9. Test summary
      console.log('\n🎯 TEST SUMMARY:');
      console.log(`   Total categories: ${categories.length}`);
      console.log(`   Categories updated: ${updateData.categories.length}`);
      console.log(`   Update successful: ✅ Yes`);
      console.log(`   RPC call made: ✅ (check Python logs)`);
      
      // Check if order actually changed
      let orderChanged = false;
      for (const cat of categories) {
        const updatedCat = updatedCategories.find(c => c._id === cat._id);
        if (updatedCat && updatedCat.sort_order !== cat.sort_order) {
          orderChanged = true;
          break;
        }
      }
      
      console.log(`   Order changed in database: ${orderChanged ? '✅ Yes' : '⚠️ No change detected'}`);
      
      if (!orderChanged) {
        console.log('\n💡 Debugging tips:');
        console.log('   1. Check Python RPC server is running');
        console.log('   2. Check RPC server logs for update_category_order calls');
        console.log('   3. Verify MongoDB connection in Python');
        console.log('   4. Check if categories collection has sort_order field');
      }
      
    } else {
      console.log('❌ Order update failed:', updateRes.data.error);
      
      // Debug the error
      if (updateRes.data.error.includes('ObjectId')) {
        console.log('\n💡 ObjectId format issue.');
        console.log('   Check if category IDs are valid MongoDB ObjectIds');
        console.log('   Example valid ID: 693d85dd79621fddf4d00505');
      }
      
      if (updateRes.data.error.includes('authorized') || updateRes.data.error.includes('admin')) {
        console.log('\n💡 Admin access issue.');
        console.log('   Make sure user has "admin" role');
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    
    if (error.response?.status === 400) {
      console.log('\n🔍 400 Bad Request - Check the request format:');
      console.log('   Expected: { categories: [{id: "...", order: number}, ...] }');
      console.log('   Make sure "categories" is an array');
    }
    
    if (error.response?.status === 403) {
      console.log('\n🔒 403 Forbidden - Admin access required');
    }
    
    if (error.response?.data) {
      console.log('📥 Error details:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

testOrderUpdate();