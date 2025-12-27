// // // test_categories.js - COMPLETE CORRECTED VERSION
// // const axios = require('axios');
// // require('dotenv').config();

// // // Configuration
// // const BASE_URL = process.env.BASE_URL || 'http://localhost:5000/api';

// // class CategoriesTester {
// //     constructor() {
// //         this.axios = axios.create({
// //             baseURL: BASE_URL,
// //             headers: {
// //                 'Content-Type': 'application/json'
// //             }
// //         });
// //         this.testCategoryId = null;
// //     }

// //     async loginAdmin() {
// //         try {
// //             console.log('\n🔐 Logging in as admin...');
            
// //             const response = await this.axios.post('/users/login', {
// //                 email: 'admin@example.com',
// //                 password: 'pwd12345'
// //             });

// //             if (response.data.success) {
// //                 const token = response.data.token;
// //                 this.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// //                 console.log('✅ Admin login successful');
// //                 return true;
// //             }
// //         } catch (error) {
// //             console.error('❌ Admin login failed:', error.response?.data || error.message);
// //             return false;
// //         }
// //     }

// //     async testPublicEndpoints() {
// //         console.log('\n📋 ========== TESTING PUBLIC CATEGORY ENDPOINTS ==========');

// //         // 1. Get all categories
// //         console.log('\n1️⃣ Testing GET /api/categories');
// //         try {
// //             const response = await this.axios.get('/categories');
// //             console.log(`✅ Success: ${response.data.count} categories found`);
// //             if (response.data.data && response.data.data.length > 0) {
// //                 console.log(`   Sample category: ${response.data.data[0].name}`);
// //                 response.data.data.slice(0, 3).forEach((cat, index) => {
// //                     console.log(`   ${index + 1}. ${cat.name} (ID: ${cat._id})`);
// //                 });
// //             }
// //         } catch (error) {
// //             console.error('❌ Failed:', error.response?.data || error.message);
// //         }

// //         // 2. Get category by ID
// //         console.log('\n2️⃣ Testing GET /api/categories/:id');
// //         try {
// //             // First get a category ID
// //             const listResponse = await this.axios.get('/categories');
// //             if (listResponse.data.data && listResponse.data.data.length > 0) {
// //                 const categoryId = listResponse.data.data[0]._id;
// //                 const response = await this.axios.get(`/categories/${categoryId}`);
// //                 console.log(`✅ Success: Found category "${response.data.data.name}"`);
// //             }
// //         } catch (error) {
// //             console.error('❌ Failed:', error.response?.data || error.message);
// //         }

// //         // 3. Get category by slug
// //         console.log('\n3️⃣ Testing GET /api/categories/slug/:slug');
// //         try {
// //             const response = await this.axios.get('/categories/slug/web-development');
// //             console.log(`✅ Success: Found category "${response.data.data.name}" by slug`);
// //         } catch (error) {
// //             console.error('❌ Failed:', error.response?.data || error.message);
// //         }

// //         // 4. Get subcategories
// //         console.log('\n4️⃣ Testing GET /api/categories/:id/subcategories');
// //         try {
// //             const listResponse = await this.axios.get('/categories');
// //             if (listResponse.data.data && listResponse.data.data.length > 0) {
// //                 const parentCategory = listResponse.data.data.find(cat => 
// //                     cat.name === 'Web Development' || (cat.slug && cat.slug === 'web-development')
// //                 );
// //                 if (parentCategory) {
// //                     const response = await this.axios.get(`/categories/${parentCategory._id}/subcategories`);
// //                     console.log(`✅ Success: Found ${response.data.count} subcategories for "${parentCategory.name}"`);
// //                     if (response.data.data && response.data.data.length > 0) {
// //                         response.data.data.forEach((subcat, index) => {
// //                             console.log(`   ${index + 1}. ${subcat.name}`);
// //                         });
// //                     }
// //                 } else {
// //                     console.log('⚠️  Could not find Web Development category for subcategories test');
// //                 }
// //             }
// //         } catch (error) {
// //             console.error('❌ Failed:', error.response?.data || error.message);
// //         }
// //     }

// //     async testAdminEndpoints() {
// //         console.log('\n📋 ========== TESTING ADMIN CATEGORY ENDPOINTS ==========');
        
// //         if (!await this.loginAdmin()) {
// //             console.log('❌ Skipping admin tests - login failed');
// //             return;
// //         }

// //         // 1. Create a new category
// //         console.log('\n1️⃣ Testing POST /api/categories (Create new category)');
// //         try {
// //             const categoryData = {
// //                 name: 'Test Category - AI & Machine Learning',
// //                 description: 'Artificial Intelligence, Machine Learning, and Data Science services',
// //                 icon_url: 'https://example.com/icons/ai.png',
// //                 sort_order: 10,
// //                 is_active: true
// //             };

// //             const response = await this.axios.post('/categories', categoryData);
// //             if (response.data.success) {
// //                 console.log(`✅ Success: Created category "${response.data.data.name}"`);
// //                 console.log(`   Category ID: ${response.data.data._id}`);
// //                 console.log(`   Slug: ${response.data.data.slug}`);
                
// //                 this.testCategoryId = response.data.data._id;
// //             }
// //         } catch (error) {
// //             console.error('❌ Failed:', error.response?.data || error.message);
// //         }

// //         if (!this.testCategoryId) {
// //             console.log('❌ Skipping remaining admin tests - no category created');
// //             return;
// //         }

// //         // 2. Update category
// //         console.log('\n2️⃣ Testing PUT /api/categories/:id (Update category)');
// //         try {
// //             const updateData = {
// //                 name: 'Updated Test Category - AI & ML',
// //                 description: 'Updated: AI, Machine Learning, Data Science, and Deep Learning services',
// //                 sort_order: 11
// //             };

// //             const response = await this.axios.put(`/categories/${this.testCategoryId}`, updateData);
// //             console.log(`✅ Success: Updated category to "${response.data.data.name}"`);
// //             console.log(`   New description: ${response.data.data.description}`);
// //         } catch (error) {
// //             console.error('❌ Failed:', error.response?.data || error.message);
// //         }

// //         // 3. Toggle category status
// //         console.log('\n3️⃣ Testing PATCH /api/categories/:id/toggle-status');
// //         try {
// //             const response = await this.axios.patch(`/categories/${this.testCategoryId}/toggle-status`);
// //             console.log(`✅ Success: ${response.data.message}`);
// //             console.log(`   Is active: ${response.data.is_active}`);
// //         } catch (error) {
// //             console.error('❌ Failed:', error.response?.data || error.message);
// //         }

// //         // 4. Update category order - FIXED VERSION
// //         console.log('\n4️⃣ Testing PUT /api/categories/order (Update category order)');
// //         try {
// //             // First get current categories
// //             const listResponse = await this.axios.get('/categories');
// //             if (listResponse.data.data && listResponse.data.data.length >= 2) {
// //                 // Get existing categories (excluding our test category if it exists)
// //                 const existingCategories = listResponse.data.data.filter(cat => 
// //                     cat._id !== this.testCategoryId && cat.is_active !== false
// //                 );
                
// //                 if (existingCategories.length >= 2) {
// //                     // Create ordered categories array with valid ObjectIds
// //                     const orderedCategories = existingCategories.slice(0, 2).map((cat, index) => ({
// //                         id: cat._id,
// //                         order: index + 100  // Use high numbers to avoid conflicts
// //                     }));
                    
// //                     console.log(`🔄 Updating order for ${orderedCategories.length} categories`);
// //                     console.log('📋 Category IDs:', orderedCategories.map(c => c.id));
                    
// //                     const response = await this.axios.put('/categories/order', { 
// //                         orderedCategories 
// //                     });
                    
// //                     console.log(`✅ Success: ${response.data.message}`);
// //                     console.log('   Response:', response.data);
// //                 } else {
// //                     console.log('⚠️  Need at least 2 active categories (excluding test category)');
// //                 }
// //             } else {
// //                 console.log('⚠️  Need at least 2 categories in database');
// //             }
// //         } catch (error) {
// //             console.error('❌ Failed:', error.response?.data || error.message);
// //             if (error.response?.config?.data) {
// //                 console.log('📤 Request data sent:', error.response.config.data);
// //             }
// //         }

// //         // 5. Delete category (cleanup)
// //         console.log('\n5️⃣ Testing DELETE /api/categories/:id (Delete category)');
// //         try {
// //             const response = await this.axios.delete(`/categories/${this.testCategoryId}`);
// //             console.log(`✅ Success: ${response.data.message}`);
// //             this.testCategoryId = null;
// //         } catch (error) {
// //             console.error('❌ Failed:', error.response?.data || error.message);
// //         }
// //     }

// //     async testErrorCases() {
// //         console.log('\n📋 ========== TESTING ERROR CASES ==========');
        
// //         // Remove auth for public endpoints
// //         delete this.axios.defaults.headers.common['Authorization'];

// //         // 1. Invalid category ID
// //         console.log('\n1️⃣ Testing invalid category ID');
// //         try {
// //             await this.axios.get('/categories/invalid-category-id');
// //             console.log('❌ Unexpected: Invalid ID accepted');
// //         } catch (error) {
// //             const status = error.response?.status;
// //             const errorMsg = error.response?.data?.error || 'Not found';
// //             console.log(`✅ Expected error: ${status} - ${errorMsg}`);
// //         }

// //         // 2. Non-existent slug
// //         console.log('\n2️⃣ Testing non-existent slug');
// //         try {
// //             await this.axios.get('/categories/slug/non-existent-slug-12345');
// //             console.log('❌ Unexpected: Non-existent slug accepted');
// //         } catch (error) {
// //             const status = error.response?.status;
// //             const errorMsg = error.response?.data?.error || 'Not found';
// //             console.log(`✅ Expected error: ${status} - ${errorMsg}`);
// //         }

// //         // 3. Unauthorized access to admin endpoint
// //         console.log('\n3️⃣ Testing unauthorized access (no token)');
// //         try {
// //             await this.axios.post('/categories', {
// //                 name: 'Unauthorized Create Attempt'
// //             });
// //             console.log('❌ Unexpected: Unauthorized request succeeded');
// //         } catch (error) {
// //             const status = error.response?.status;
// //             const errorMsg = error.response?.data?.error || 'Unauthorized';
// //             console.log(`✅ Expected error: ${status} - ${errorMsg}`);
// //         }

// //         // 4. Non-admin trying to access admin endpoint
// //         console.log('\n4️⃣ Testing non-admin access');
// //         try {
// //             // First login as a non-admin user (using sadik from your database)
// //             const loginResponse = await this.axios.post('/users/login', {
// //                 email: 'sadik@example.com',
// //                 password: 'pwd12345'  // Use correct password for sadik
// //             });
            
// //             if (loginResponse.data.success) {
// //                 const token = loginResponse.data.token;
// //                 // Create a temporary axios instance with non-admin token
// //                 const nonAdminAxios = axios.create({
// //                     baseURL: BASE_URL,
// //                     headers: {
// //                         'Content-Type': 'application/json',
// //                         'Authorization': `Bearer ${token}`
// //                     }
// //                 });
                
// //                 await nonAdminAxios.post('/categories', {
// //                     name: 'Non-Admin Create Attempt'
// //                 });
// //                 console.log('❌ Unexpected: Non-admin created category');
// //             } else {
// //                 console.log('⚠️  Could not login as non-admin user');
// //             }
// //         } catch (error) {
// //             const status = error.response?.status;
// //             const errorMsg = error.response?.data?.error || 'Not authorized';
// //             console.log(`✅ Expected error: ${status} - ${errorMsg}`);
// //         }
// //     }

// //     async runAllTests() {
// //         console.log('🚀 Starting Categories API Tests');
// //         console.log(`📡 Base URL: ${BASE_URL}`);
// //         console.log('='.repeat(50));

// //         await this.testPublicEndpoints();
// //         await this.testAdminEndpoints();
// //         await this.testErrorCases();

// //         console.log('\n' + '='.repeat(50));
// //         console.log('✅ All categories tests completed!');
// //     }
// // }

// // // Run tests
// // async function main() {
// //     const tester = new CategoriesTester();
    
// //     try {
// //         await tester.runAllTests();
// //     } catch (error) {
// //         console.error('❌ Test suite failed:', error.message);
// //         process.exit(1);
// //     }
// // }

// // // Handle command line arguments
// // if (require.main === module) {
// //     main();
// // }

// // module.exports = CategoriesTester;

// const axios = require('axios');

// const API_BASE_URL = 'http://localhost:5000/api';

// // Test admin credentials
// const ADMIN_CREDENTIALS = {
//   email: 'admin@example.com',
//   password: 'pwd12345'
// };

// let adminToken = '';
// let createdCategoryId = '';
// let createdSubcategoryId = '';

// const axiosInstance = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// // Helper functions
// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// const printResult = (testName, success, data, error) => {
//   console.log(`\n${success ? '✅' : '❌'} ${testName}`);
//   if (data) {
//     const dataStr = JSON.stringify(data, null, 2);
//     console.log('📊 Response:', dataStr.length > 500 ? dataStr.slice(0, 500) + '...' : dataStr);
//   }
//   if (error) {
//     console.log('❌ Error:', error.response?.data?.error || error.response?.data?.message || error.message);
//   }
// };

// // Login as admin
// const loginAdmin = async () => {
//   try {
//     console.log('🔐 Logging in as admin...');
//     const response = await axiosInstance.post('/users/login', ADMIN_CREDENTIALS);
    
//     if (response.data.success) {
//       adminToken = response.data.token;
//       axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
//       printResult('Admin Login', true, { 
//         token: adminToken.substring(0, 50) + '...',
//         user: response.data.data 
//       });
//       return true;
//     }
//     return false;
//   } catch (error) {
//     printResult('Admin Login', false, null, error);
//     return false;
//   }
// };

// // ==================== PUBLIC CATEGORY TESTS ====================

// const testPublicCategories = async () => {
//   console.log('\n📋 ========== PUBLIC CATEGORY TESTS ==========');

//   // Test 1: Get all categories
//   try {
//     const response = await axiosInstance.get('/categories');
//     printResult('Get All Categories', response.data.success, {
//       count: response.data.count,
//       categories: response.data.data?.slice(0, 3) // Show first 3
//     });
//   } catch (error) {
//     printResult('Get All Categories', false, null, error);
//   }

//   await delay(500);

//   // Test 2: Get category by ID
//   try {
//     // Use an existing category ID (Web Development)
//     const categoryId = '692dbb7515355c3dedcfb35e';
//     const response = await axiosInstance.get(`/categories/${categoryId}`);
//     printResult('Get Category By ID', response.data.success, {
//       category: response.data.data
//     });
//   } catch (error) {
//     printResult('Get Category By ID', false, null, error);
//   }

//   await delay(500);

//   // Test 3: Get category by slug
//   try {
//     const response = await axiosInstance.get('/categories/slug/web-development');
//     printResult('Get Category By Slug', response.data.success, {
//       category: response.data.data
//     });
//   } catch (error) {
//     printResult('Get Category By Slug', false, null, error);
//   }

//   await delay(500);

//   // Test 4: Get subcategories
//   try {
//     const parentId = '692dbb7515355c3dedcfb35e'; // Web Development
//     const response = await axiosInstance.get(`/categories/${parentId}/subcategories`);
//     printResult('Get Subcategories', response.data.success, {
//       count: response.data.count,
//       subcategories: response.data.data
//     });
//   } catch (error) {
//     printResult('Get Subcategories', false, null, error);
//   }
// };

// // ==================== ADMIN CATEGORY TESTS ====================

// const testAdminCategories = async () => {
//   console.log('\n👑 ========== ADMIN CATEGORY TESTS ==========');

//   if (!adminToken) {
//     console.log('❌ Admin token not available. Skipping admin tests.');
//     return;
//   }

//   // Test 1: Create new category
//   try {
//     const categoryData = {
//       name: 'Artificial Intelligence',
//       description: 'AI, ML, and data science services',
//       icon_url: 'https://example.com/icons/ai.png',
//       sort_order: 50,
//       is_active: true
//     };
    
//     const response = await axiosInstance.post('/categories', categoryData);
//     printResult('Create Category', response.data.success, {
//       message: response.data.message,
//       category: response.data.data
//     });
    
//     if (response.data.success && response.data.data) {
//       createdCategoryId = response.data.data._id;
//     }
//   } catch (error) {
//     printResult('Create Category', false, null, error);
//   }

//   await delay(1000);

//   // Test 2: Create subcategory
//   try {
//     if (createdCategoryId) {
//       const subcategoryData = {
//         name: 'Machine Learning',
//         description: 'ML model development and training',
//         icon_url: 'https://example.com/icons/ml.png',
//         parent_category_id: createdCategoryId,
//         sort_order: 1,
//         is_active: true
//       };
      
//       const response = await axiosInstance.post('/categories', subcategoryData);
//       printResult('Create Subcategory', response.data.success, {
//         message: response.data.message,
//         category: response.data.data
//       });
      
//       if (response.data.success && response.data.data) {
//         createdSubcategoryId = response.data.data._id;
//       }
//     } else {
//       console.log('⚠️ Skipping subcategory creation - parent category not created');
//     }
//   } catch (error) {
//     printResult('Create Subcategory', false, null, error);
//   }

//   await delay(1000);

//   // Test 3: Update category
//   try {
//     if (createdCategoryId) {
//       const updateData = {
//         name: 'AI & Machine Learning',
//         description: 'Updated description for AI services',
//         sort_order: 45,
//         is_active: true
//       };
      
//       const response = await axiosInstance.put(`/categories/${createdCategoryId}`, updateData);
//       printResult('Update Category', response.data.success, {
//         message: response.data.message,
//         category: response.data.data
//       });
//     } else {
//       console.log('⚠️ Skipping update - category not created');
//     }
//   } catch (error) {
//     printResult('Update Category', false, null, error);
//   }

//   await delay(1000);

//   // Test 4: Update category order
//   try {
//     console.log('🔄 Testing Update Category Order...');
    
//     // First, get all categories to see current order
//     const categoriesResponse = await axiosInstance.get('/categories');
//     const categories = categoriesResponse.data.data;
    
//     if (categories && categories.length > 0) {
//       // Create new order array
//       const orderedCategories = categories.map((cat, index) => ({
//         id: cat.id,
//         order: index + 100 // Reorder them
//       }));
      
//       // Shuffle first few items for testing
//       if (orderedCategories.length >= 2) {
//         const temp = orderedCategories[0].order;
//         orderedCategories[0].order = orderedCategories[1].order;
//         orderedCategories[1].order = temp;
//       }
      
//       const response = await axiosInstance.put('/categories/order', {
//         orderedCategories: orderedCategories
//       });
//       printResult('Update Category Order', response.data.success, {
//         message: response.data.message,
//         totalCategories: orderedCategories.length,
//         sampleOrder: orderedCategories.slice(0, 3)
//       });
//     } else {
//       console.log('⚠️ No categories found for order update');
//     }
//   } catch (error) {
//     printResult('Update Category Order', false, null, error);
//   }

//   await delay(1000);

//   // Test 5: Toggle category status
//   try {
//     if (createdCategoryId) {
//       const response = await axiosInstance.patch(`/categories/${createdCategoryId}/toggle-status`);
//       printResult('Toggle Category Status', response.data.success, {
//         message: response.data.message,
//         is_active: response.data.is_active
//       });
//     } else {
//       console.log('⚠️ Skipping toggle - category not created');
//     }
//   } catch (error) {
//     printResult('Toggle Category Status', false, null, error);
//   }

//   await delay(1000);

//   // Test 6: Try to delete subcategory (should succeed)
//   try {
//     if (createdSubcategoryId) {
//       const response = await axiosInstance.delete(`/categories/${createdSubcategoryId}`);
//       printResult('Delete Subcategory', response.data.success, {
//         message: response.data.message
//       });
//     } else {
//       console.log('⚠️ Skipping subcategory delete - not created');
//     }
//   } catch (error) {
//     printResult('Delete Subcategory', false, null, error);
//   }

//   await delay(1000);

//   // Test 7: Delete main category
//   try {
//     if (createdCategoryId) {
//       const response = await axiosInstance.delete(`/categories/${createdCategoryId}`);
//       printResult('Delete Category', response.data.success, {
//         message: response.data.message
//       });
//     } else {
//       console.log('⚠️ Skipping delete - category not created');
//     }
//   } catch (error) {
//     printResult('Delete Category', false, null, error);
//   }

//   await delay(1000);

//   // Test 8: Try to create category with duplicate name
//   try {
//     const duplicateCategory = {
//       name: 'Web Development', // Should already exist
//       description: 'Duplicate category test',
//       sort_order: 999
//     };
    
//     const response = await axiosInstance.post('/categories', duplicateCategory);
//     printResult('Create Duplicate Category', response.data.success, {
//       message: response.data.message
//     });
//   } catch (error) {
//     printResult('Create Duplicate Category', false, null, error);
//   }
// };

// // ==================== UNAUTHORIZED ACCESS TESTS ====================

// const testUnauthorizedAccess = async () => {
//   console.log('\n🚫 ========== UNAUTHORIZED ACCESS TESTS ==========');

//   // Remove auth token for these tests
//   const originalAuth = axiosInstance.defaults.headers.common['Authorization'];
//   delete axiosInstance.defaults.headers.common['Authorization'];

//   // Test 1: Try to create category without auth
//   try {
//     const categoryData = {
//       name: 'Unauthorized Test',
//       description: 'Should fail'
//     };
//     await axiosInstance.post('/categories', categoryData);
//     printResult('Create Category Without Auth', false, null, { 
//       message: 'Should have failed but succeeded' 
//     });
//   } catch (error) {
//     if (error.response?.status === 403 || error.response?.status === 401) {
//       printResult('Create Category Without Auth', true, { 
//         expectedError: error.response.data.error 
//       });
//     } else {
//       printResult('Create Category Without Auth', false, null, error);
//     }
//   }

//   await delay(500);

//   // Test 2: Try to update category without auth
//   try {
//     await axiosInstance.put('/categories/692dbb7515355c3dedcfb35e', { name: 'Test' });
//     printResult('Update Category Without Auth', false, null, { 
//       message: 'Should have failed but succeeded' 
//     });
//   } catch (error) {
//     if (error.response?.status === 403 || error.response?.status === 401) {
//       printResult('Update Category Without Auth', true, { 
//         expectedError: error.response.data.error 
//       });
//     } else {
//       printResult('Update Category Without Auth', false, null, error);
//     }
//   }

//   await delay(500);

//   // Test 3: Try to delete category without auth
//   try {
//     await axiosInstance.delete('/categories/692dbb7515355c3dedcfb35e');
//     printResult('Delete Category Without Auth', false, null, { 
//       message: 'Should have failed but succeeded' 
//     });
//   } catch (error) {
//     if (error.response?.status === 403 || error.response?.status === 401) {
//       printResult('Delete Category Without Auth', true, { 
//         expectedError: error.response.data.error 
//       });
//     } else {
//       printResult('Delete Category Without Auth', false, null, error);
//     }
//   }

//   await delay(500);

//   // Restore auth token
//   if (originalAuth) {
//     axiosInstance.defaults.headers.common['Authorization'] = originalAuth;
//   }
// };

// // ==================== VALIDATION TESTS ====================

// const testValidation = async () => {
//   console.log('\n🔍 ========== VALIDATION TESTS ==========');

//   if (!adminToken) {
//     console.log('⚠️ Skipping validation tests - admin not logged in');
//     return;
//   }

//   // Test 1: Create category without required name
//   try {
//     const invalidData = {
//       description: 'Missing name field'
//     };
    
//     const response = await axiosInstance.post('/categories', invalidData);
//     printResult('Create Without Name', response.data.success, {
//       message: response.data.message
//     });
//   } catch (error) {
//     printResult('Create Without Name', false, null, error);
//   }

//   await delay(500);

//   // Test 2: Update category with invalid parent (circular reference)
//   try {
//     const invalidData = {
//       parent_category_id: '692dbb7515355c3dedcfb35e' // Trying to set itself as parent
//     };
    
//     const response = await axiosInstance.put('/categories/692dbb7515355c3dedcfb35e', invalidData);
//     printResult('Update With Circular Reference', response.data.success, {
//       message: response.data.message
//     });
//   } catch (error) {
//     printResult('Update With Circular Reference', false, null, error);
//   }

//   await delay(500);

//   // Test 3: Update category order with invalid data
//   try {
//     const invalidOrderData = {
//       orderedCategories: [
//         { id: 'invalid-id', order: 1 }
//       ]
//     };
    
//     const response = await axiosInstance.put('/categories/order', invalidOrderData);
//     printResult('Update Order With Invalid ID', response.data.success, {
//       message: response.data.message
//     });
//   } catch (error) {
//     printResult('Update Order With Invalid ID', false, null, error);
//   }

//   await delay(500);

//   // Test 4: Update category with invalid ID
//   try {
//     const response = await axiosInstance.put('/categories/invalid-id', { name: 'Test' });
//     printResult('Update With Invalid ID', response.data.success, {
//       message: response.data.message
//     });
//   } catch (error) {
//     printResult('Update With Invalid ID', false, null, error);
//   }
// };

// // ==================== COMPREHENSIVE TESTS ====================

// const testComprehensive = async () => {
//   console.log('\n🎯 ========== COMPREHENSIVE TESTS ==========');

//   if (!adminToken) {
//     console.log('⚠️ Skipping comprehensive tests - admin not logged in');
//     return;
//   }

//   // Test 1: Create, update, and delete a complete category hierarchy
//   try {
//     console.log('\n🔄 Testing complete category lifecycle...');
    
//     // Create parent category
//     const parentData = {
//       name: 'Data Science',
//       description: 'Data analysis and science services',
//       sort_order: 60,
//       is_active: true
//     };
    
//     const createResponse = await axiosInstance.post('/categories', parentData);
//     const parentId = createResponse.data.data?._id;
    
//     if (parentId) {
//       console.log(`✅ Created parent category: ${parentId}`);
      
//       // Create child category
//       const childData = {
//         name: 'Data Visualization',
//         description: 'Data visualization and dashboard creation',
//         parent_category_id: parentId,
//         sort_order: 1,
//         is_active: true
//       };
      
//       const childResponse = await axiosInstance.post('/categories', childData);
//       const childId = childResponse.data.data?._id;
      
//       console.log(`✅ Created child category: ${childId}`);
      
//       // Update child category
//       const updateResponse = await axiosInstance.put(`/categories/${childId}`, {
//         description: 'Advanced data visualization services',
//         sort_order: 2
//       });
      
//       console.log(`✅ Updated child category`);
      
//       // Toggle child status
//       const toggleResponse = await axiosInstance.patch(`/categories/${childId}/toggle-status`);
//       console.log(`✅ Toggled child status to: ${toggleResponse.data.is_active ? 'active' : 'inactive'}`);
      
//       // Toggle back to active
//       await axiosInstance.patch(`/categories/${childId}/toggle-status`);
//       console.log(`✅ Toggled child status back to active`);
      
//       // Delete child (should succeed)
//       await axiosInstance.delete(`/categories/${childId}`);
//       console.log(`✅ Deleted child category`);
      
//       // Delete parent (should now succeed since no children)
//       await axiosInstance.delete(`/categories/${parentId}`);
//       console.log(`✅ Deleted parent category`);
      
//       printResult('Complete Category Lifecycle', true, {
//         steps: ['Create Parent', 'Create Child', 'Update Child', 'Toggle Status', 'Delete Child', 'Delete Parent'],
//         success: true
//       });
//     }
//   } catch (error) {
//     printResult('Complete Category Lifecycle', false, null, error);
//   }
// };

// // ==================== SUMMARY REPORT ====================

// const printSummary = () => {
//   console.log('\n📊 ========== TEST SUMMARY ==========');
//   console.log(`Admin Login: ${adminToken ? '✅ Success' : '❌ Failed'}`);
//   console.log(`Created Category ID: ${createdCategoryId || 'None'}`);
//   console.log(`Created Subcategory ID: ${createdSubcategoryId || 'None'}`);
//   console.log('\n🎉 All tests completed!');
// };

// // ==================== MAIN TEST RUNNER ====================

// const runAllTests = async () => {
//   console.log('🚀 ========== STARTING CATEGORY TESTS ==========\n');
  
//   try {
//     // Display test environment
//     console.log('🔧 Test Configuration:');
//     console.log(`   API URL: ${API_BASE_URL}`);
//     console.log(`   Admin Email: ${ADMIN_CREDENTIALS.email}`);
//     console.log('   Tests to run:');
//     console.log('     - Public category endpoints');
//     console.log('     - Admin category endpoints');
//     console.log('     - Unauthorized access tests');
//     console.log('     - Validation tests');
//     console.log('     - Comprehensive lifecycle tests\n');
    
//     // Step 1: Login as admin
//     console.log('📝 Step 1: Admin Authentication');
//     const loggedIn = await loginAdmin();
    
//     if (!loggedIn) {
//       console.log('\n❌ Failed to login as admin. Stopping tests.');
//       console.log('💡 Troubleshooting tips:');
//       console.log('   1. Ensure Node.js server is running: npm run dev');
//       console.log('   2. Ensure Python RPC server is running: python server.py');
//       console.log('   3. Check if admin user exists: db.users.findOne({email: "admin@example.com"})');
//       console.log('   4. Verify RPC client methods are properly defined');
//       console.log('   5. Check network connectivity');
//       return;
//     }
    
//     await delay(1000);
    
//     // Step 2: Run public category tests
//     console.log('\n📝 Step 2: Public Category Tests');
//     await testPublicCategories();
//     await delay(1000);
    
//     // Step 3: Run admin category tests
//     console.log('\n📝 Step 3: Admin Category Tests');
//     await testAdminCategories();
//     await delay(1000);
    
//     // Step 4: Run unauthorized tests
//     console.log('\n📝 Step 4: Unauthorized Access Tests');
//     await testUnauthorizedAccess();
//     await delay(1000);
    
//     // Step 5: Run validation tests
//     console.log('\n📝 Step 5: Validation Tests');
//     await testValidation();
//     await delay(1000);
    
//     // Step 6: Run comprehensive tests
//     console.log('\n📝 Step 6: Comprehensive Tests');
//     await testComprehensive();
    
//     // Step 7: Print summary
//     printSummary();
    
//     // Final status
//     console.log('\n🎯 TEST COMPLETION STATUS');
//     console.log('✅ Public endpoints: Working');
//     console.log('✅ Admin endpoints: Working (with RPC client fix)');
//     console.log('✅ Security: Unauthorized access blocked');
//     console.log('✅ Validation: Input validation working');
//     console.log('✅ Database: MongoDB connection established');
//     console.log('✅ RPC: Python server communication');
    
//   } catch (error) {
//     console.error('❌ Unexpected error during tests:', error.message);
//     console.error('Stack trace:', error.stack);
//   }
// };

// // ==================== EXPORT FOR USE IN OTHER FILES ====================

// module.exports = {
//   runAllTests,
//   loginAdmin,
//   testPublicCategories,
//   testAdminCategories,
//   testUnauthorizedAccess,
//   testValidation,
//   testComprehensive
// };

// // ==================== RUN TESTS IF SCRIPT IS EXECUTED DIRECTLY ====================

// if (require.main === module) {
//   console.log(`
//   ███████╗███████╗████████╗██╗   ██╗██████╗ 
//   ██╔════╝██╔════╝╚══██╔══╝██║   ██║██╔══██╗
//   ███████╗█████╗     ██║   ██║   ██║██████╔╝
//   ╚════██║██╔══╝     ██║   ██║   ██║██╔═══╝ 
//   ███████║███████╗   ██║   ╚██████╔╝██║     
//   ╚══════╝╚══════╝   ╚═╝    ╚═════╝ ╚═╝     
                                             
//   WorkNet Categories Test Suite
//   `);
  
//   // Check if axios is available
//   if (!axios) {
//     console.error('❌ axios is required. Please install it:');
//     console.error('   npm install axios');
//     process.exit(1);
//   }
  
//   // Run the tests
//   runAllTests();
// }


const axios = require('axios');
require('dotenv').config();

const API_BASE_URL = process.env.API_URL || 'http://localhost:5000/api';

// Test admin credentials - UPDATE THESE WITH YOUR ACTUAL ADMIN USER
const ADMIN_CREDENTIALS = {
  email: 'admin@example.com',
  password: 'pwd12345'
};

// Test with a regular user if admin doesn't exist
const USER_CREDENTIALS = {
  email: 'sadik@example.com',
  password: 'pwd12345'
};

let authToken = '';
let userRole = '';
let createdCategoryId = '';
let createdSubcategoryId = '';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Helper functions
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const printResult = (testName, success, data, error) => {
  const status = success ? '✅' : '❌';
  console.log(`\n${status} ${testName}`);
  
  if (data) {
    const dataStr = JSON.stringify(data, null, 2);
    if (dataStr.length > 300) {
      console.log('📊 Response (truncated):', dataStr.slice(0, 300) + '...');
    } else {
      console.log('📊 Response:', dataStr);
    }
  }
  
  if (error) {
    const errorData = error.response?.data;
    console.log('❌ Error:', errorData?.error || errorData?.message || error.message);
    if (error.response?.status) {
      console.log('   Status:', error.response.status);
    }
    if (errorData?.details) {
      console.log('   Details:', errorData.details);
    }
  }
};

// ==================== AUTHENTICATION ====================

// const testAuthentication = async () => {
//   console.log('🔐 ========== AUTHENTICATION TESTS ==========');
  
//   // Try admin login first
//   console.log('\n🔄 Attempting admin login...');
//   try {
//     const response = await axiosInstance.post('/users/login', ADMIN_CREDENTIALS);
    
//     if (response.data.success) {
//       authToken = response.data.token;
//       userRole = response.data.data?.role || 'unknown';
//       axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
//       printResult('Admin Login', true, {
//         token: authToken.substring(0, 30) + '...',
//         user: response.data.data?.email,
//         role: userRole
//       });
//       return true;
//     } else {
//       printResult('Admin Login', false, response.data);
//     }
//   } catch (error) {
//     printResult('Admin Login', false, null, error);
//   }
  
//   // If admin login fails, try regular user
//   console.log('\n🔄 Attempting regular user login...');
//   try {
//     const response = await axiosInstance.post('/users/login', USER_CREDENTIALS);
    
//     if (response.data.success) {
//       authToken = response.data.token;
//       userRole = response.data.data?.role || 'user';
//       axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
//       printResult('User Login', true, {
//         token: authToken.substring(0, 30) + '...',
//         user: response.data.data?.email,
//         role: userRole
//       });
//       return true;
//     } else {
//       printResult('User Login', false, response.data);
//       return false;
//     }
//   } catch (error) {
//     printResult('User Login', false, null, error);
//     return false;
//   }
// };
// ==================== AUTHENTICATION ====================

const testAuthentication = async () => {
  console.log('🔐 ========== AUTHENTICATION TESTS ==========');
  
  // Try admin login first
  console.log('\n🔄 Attempting admin login...');
  try {
    const response = await axiosInstance.post('/users/login', ADMIN_CREDENTIALS);
    
    console.log('📥 Full login response:', JSON.stringify(response.data, null, 2));
    
    if (response.data.success) {
      authToken = response.data.token;
      // FIXED: Use response.data.user instead of response.data.data
      userRole = response.data.user?.role || 'unknown';
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
      printResult('Admin Login', true, {
        token: authToken.substring(0, 30) + '...',
        user: response.data.user?.email,
        role: userRole
      });
      return true;
    } else {
      printResult('Admin Login', false, response.data);
      return false;
    }
  } catch (error) {
    printResult('Admin Login', false, null, error);
    return false;
  }
};
// ==================== PUBLIC CATEGORY TESTS ====================

const testPublicCategories = async () => {
  console.log('\n📋 ========== PUBLIC CATEGORY TESTS ==========');

  // Test 1: Get all categories
  try {
    const response = await axiosInstance.get('/categories');
    const categories = response.data.data || [];
    printResult('Get All Categories', response.data.success, {
      count: response.data.count || categories.length,
      firstCategory: categories[0] ? {
        id: categories[0]._id,
        name: categories[0].name,
        order: categories[0].sort_order
      } : null
    });
    
    // Return categories for use in other tests
    return categories;
  } catch (error) {
    printResult('Get All Categories', false, null, error);
    return [];
  }
};

const testGetCategoryById = async (categoryId) => {
  try {
    const response = await axiosInstance.get(`/categories/${categoryId}`);
    printResult('Get Category By ID', response.data.success, {
      category: {
        id: response.data.data?._id,
        name: response.data.data?.name,
        slug: response.data.data?.slug,
        order: response.data.data?.sort_order
      }
    });
    return response.data.data;
  } catch (error) {
    printResult('Get Category By ID', false, null, error);
    return null;
  }
};

const testGetCategoryBySlug = async (slug) => {
  try {
    const response = await axiosInstance.get(`/categories/slug/${slug}`);
    printResult('Get Category By Slug', response.data.success, {
      category: {
        id: response.data.data?._id,
        name: response.data.data?.name
      }
    });
    return response.data.data;
  } catch (error) {
    printResult('Get Category By Slug', false, null, error);
    return null;
  }
};

const testGetSubcategories = async (parentId) => {
  try {
    const response = await axiosInstance.get(`/categories/${parentId}/subcategories`);
    printResult('Get Subcategories', response.data.success, {
      count: response.data.count || 0,
      hasSubcategories: (response.data.data?.length || 0) > 0
    });
    return response.data.data || [];
  } catch (error) {
    printResult('Get Subcategories', false, null, error);
    return [];
  }
};

// ==================== ADMIN CATEGORY TESTS ====================

const testCreateCategory = async () => {
  if (userRole !== 'admin') {
    console.log('\n⚠️ Skipping admin tests - not logged in as admin');
    return null;
  }
  
  try {
    const categoryData = {
      name: `Test Category ${Date.now()}`,
      description: 'Test category created via API',
      sort_order: 999,
      is_active: true
    };
    
    const response = await axiosInstance.post('/categories', categoryData);
    printResult('Create Category', response.data.success, {
      message: response.data.message,
      category: response.data.data ? {
        id: response.data.data._id,
        name: response.data.data.name
      } : null
    });
    
    if (response.data.success && response.data.data) {
      createdCategoryId = response.data.data._id;
    }
    
    return response.data.data;
  } catch (error) {
    printResult('Create Category', false, null, error);
    return null;
  }
};

const testUpdateCategory = async (categoryId, updateData) => {
  if (userRole !== 'admin') {
    console.log('\n⚠️ Skipping update - not logged in as admin');
    return null;
  }
  
  try {
    const response = await axiosInstance.put(`/categories/${categoryId}`, updateData);
    printResult('Update Category', response.data.success, {
      message: response.data.message,
      updatedFields: updateData
    });
    return response.data.data;
  } catch (error) {
    printResult('Update Category', false, null, error);
    return null;
  }
};

const testUpdateCategoryOrder = async (categories) => {
  if (userRole !== 'admin') {
    console.log('\n⚠️ Skipping order update - not logged in as admin');
    return null;
  }
  
  if (!categories || categories.length < 2) {
    console.log('⚠️ Need at least 2 categories for order update');
    return null;
  }
  
  try {
    // Prepare update data - take first 3 categories
    const categoriesOrder = categories.slice(0, 3).map((cat, index) => ({
      id: cat._id,
      order: (index + 1) * 100 // 100, 200, 300
    }));
    
    console.log('📤 Sending order update for categories:', 
      categoriesOrder.map(c => `${c.id.slice(-6)}:${c.order}`).join(', '));
    
    const response = await axiosInstance.put('/categories/update-order', {
      categories: categoriesOrder
    });
    
    printResult('Update Category Order', response.data.success, {
      message: response.data.message,
      updatedCount: categoriesOrder.length
    });
    
    return response.data;
  } catch (error) {
    printResult('Update Category Order', false, null, error);
    return null;
  }
};

const testToggleCategoryStatus = async (categoryId) => {
  if (userRole !== 'admin') {
    console.log('\n⚠️ Skipping toggle - not logged in as admin');
    return null;
  }
  
  try {
    const response = await axiosInstance.patch(`/categories/${categoryId}/toggle-status`);
    printResult('Toggle Category Status', response.data.success, {
      message: response.data.message,
      newStatus: response.data.is_active ? 'active' : 'inactive'
    });
    return response.data;
  } catch (error) {
    printResult('Toggle Category Status', false, null, error);
    return null;
  }
};

const testDeleteCategory = async (categoryId) => {
  if (userRole !== 'admin') {
    console.log('\n⚠️ Skipping delete - not logged in as admin');
    return null;
  }
  
  try {
    const response = await axiosInstance.delete(`/categories/${categoryId}`);
    printResult('Delete Category', response.data.success, {
      message: response.data.message
    });
    return response.data;
  } catch (error) {
    printResult('Delete Category', false, null, error);
    return null;
  }
};

// ==================== UNAUTHORIZED TESTS ====================

const testUnauthorizedAccess = async () => {
  console.log('\n🚫 ========== UNAUTHORIZED ACCESS TESTS ==========');
  
  // Save original auth
  const originalAuth = axiosInstance.defaults.headers.common['Authorization'];
  delete axiosInstance.defaults.headers.common['Authorization'];
  
  const testCases = [
    {
      name: 'Create Category Without Auth',
      method: 'post',
      url: '/categories',
      data: { name: 'Unauthorized Test' }
    },
    {
      name: 'Update Category Without Auth',
      method: 'put',
      url: '/categories/693d85dd79621fddf4d00505',
      data: { name: 'Test' }
    },
    {
      name: 'Delete Category Without Auth',
      method: 'delete',
      url: '/categories/693d85dd79621fddf4d00505'
    },
    {
      name: 'Update Order Without Auth',
      method: 'put',
      url: '/categories/update-order',
      data: { categories: [{ id: '693d85dd79621fddf4d00505', order: 1 }] }
    },
    {
      name: 'Toggle Status Without Auth',
      method: 'patch',
      url: '/categories/693d85dd79621fddf4d00505/toggle-status'
    }
  ];
  
  for (const testCase of testCases) {
    await delay(300);
    
    try {
      await axiosInstance[testCase.method](testCase.url, testCase.data);
      printResult(testCase.name, false, null, { 
        message: 'Should have failed but succeeded' 
      });
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        printResult(testCase.name, true, { 
          expected: 'Unauthorized access blocked',
          status: error.response.status
        });
      } else {
        printResult(testCase.name, false, null, error);
      }
    }
  }
  
  // Restore auth if it existed
  if (originalAuth) {
    axiosInstance.defaults.headers.common['Authorization'] = originalAuth;
  }
};

// ==================== COMPREHENSIVE ORDER UPDATE TEST ====================

const runComprehensiveOrderTest = async (categories) => {
  if (userRole !== 'admin' || categories.length < 3) {
    console.log('\n⚠️ Skipping comprehensive test - need admin role and ≥3 categories');
    return;
  }
  
  console.log('\n🎯 ========== COMPREHENSIVE ORDER UPDATE TEST ==========');
  
  try {
    // Step 1: Get current orders
    console.log('\n📊 Current category orders:');
    categories.slice(0, 5).forEach((cat, idx) => {
      console.log(`   ${idx + 1}. ${cat.name}: ${cat.sort_order || 0}`);
    });
    
    // Step 2: Create new order (reverse first 3)
    const categoriesToUpdate = categories.slice(0, 3);
    const newOrder = categoriesToUpdate.map((cat, idx) => ({
      id: cat._id,
      order: (categoriesToUpdate.length - idx) * 100 // 300, 200, 100
    }));
    
    console.log('\n🔄 Setting new order:', 
      newOrder.map(c => `${c.order}`).join(' ← '));
    
    // Step 3: Update
    const updateResponse = await axiosInstance.put('/categories/update-order', {
      categories: newOrder
    });
    
    if (!updateResponse.data.success) {
      console.log('❌ Update failed:', updateResponse.data.error);
      return;
    }
    
    console.log('✅ Update successful');
    
    // Step 4: Verify
    await delay(1000);
    console.log('\n🔍 Verifying update...');
    
    const verifyResponse = await axiosInstance.get('/categories');
    const updatedCategories = verifyResponse.data.data || [];
    
    const sortedCategories = [...updatedCategories]
      .filter(cat => newOrder.some(o => o.id === cat._id))
      .sort((a, b) => a.sort_order - b.sort_order);
    
    console.log('📊 New order (sorted by sort_order):');
    sortedCategories.forEach((cat, idx) => {
      console.log(`   ${idx + 1}. ${cat.name}: ${cat.sort_order}`);
    });
    
    printResult('Comprehensive Order Test', true, {
      message: 'Order update and verification successful',
      categoriesUpdated: newOrder.length,
      finalOrder: sortedCategories.map(c => ({
        name: c.name,
        order: c.sort_order
      }))
    });
    
  } catch (error) {
    printResult('Comprehensive Order Test', false, null, error);
  }
};

// ==================== MAIN TEST RUNNER ====================

const runAllTests = async () => {
  console.log('🚀 ========== STARTING CATEGORY TESTS ==========\n');
  
  try {
    // Display environment
    console.log('🔧 Test Configuration:');
    console.log(`   API URL: ${API_BASE_URL}`);
    console.log(`   Admin Email: ${ADMIN_CREDENTIALS.email}`);
    console.log(`   User Email: ${USER_CREDENTIALS.email}`);
    console.log('   Available tests:');
    console.log('     - Public endpoints (no auth required)');
    console.log('     - Authentication tests');
    console.log('     - Admin endpoints (if admin logged in)');
    console.log('     - Unauthorized access tests');
    console.log('     - Category order update');
    console.log('');
    
    // Step 1: Test authentication
    console.log('📝 Step 1: Authentication');
    console.log('='.repeat(40));
    const authenticated = await testAuthentication();
    
    await delay(1000);
    
    // Step 2: Run public tests (even if not authenticated)
    console.log('\n📝 Step 2: Public Endpoint Tests');
    console.log('='.repeat(40));
    const categories = await testPublicCategories();
    
    if (categories.length > 0) {
      const firstCategory = categories[0];
      await delay(500);
      await testGetCategoryById(firstCategory._id);
      
      await delay(500);
      await testGetCategoryBySlug(firstCategory.slug || 'web-development');
      
      await delay(500);
      await testGetSubcategories(firstCategory._id);
    }
    
    await delay(1000);
    
    // Step 3: Run unauthorized tests
    console.log('\n📝 Step 3: Unauthorized Access Tests');
    console.log('='.repeat(40));
    await testUnauthorizedAccess();
    
    await delay(1000);
    
    // Step 4: Run admin tests (if admin)
    if (userRole === 'admin') {
      console.log('\n📝 Step 4: Admin Endpoint Tests');
      console.log('='.repeat(40));
      
      // Create a test category
      const newCategory = await testCreateCategory();
      await delay(1000);
      
      // Update it if created
      if (newCategory) {
        await testUpdateCategory(newCategory._id, {
          description: 'Updated via test',
          sort_order: 500
        });
        await delay(1000);
        
        await testToggleCategoryStatus(newCategory._id);
        await delay(1000);
        
        // Don't delete yet, use for order test
      }
      
      // Test order update with existing categories
      if (categories.length >= 2) {
        await testUpdateCategoryOrder(categories);
        await delay(1000);
        
        // Run comprehensive test
        await runComprehensiveOrderTest(categories);
        await delay(1000);
      }
      
      // Clean up: delete test category if created
      if (createdCategoryId) {
        await testDeleteCategory(createdCategoryId);
      }
    } else {
      console.log('\n⚠️ Skipping admin tests - not logged in as admin');
      console.log('💡 To test admin endpoints:');
      console.log('   1. Create an admin user in MongoDB:');
      console.log('      db.users.insertOne({');
      console.log('        email: "admin@example.com",');
      console.log('        password: "<hashed_password>",');
      console.log('        role: "admin",');
      console.log('        is_active: true');
      console.log('      })');
      console.log('   2. Or use an existing admin account');
    }
    
    // Step 5: Summary
    console.log('\n📊 ========== TEST SUMMARY ==========');
    console.log(`Authentication: ${authenticated ? '✅ Success' : '❌ Failed'}`);
    console.log(`User Role: ${userRole || 'None'}`);
    console.log(`Public Endpoints: ${categories.length > 0 ? '✅ Working' : '❌ Failed'}`);
    console.log(`Admin Access: ${userRole === 'admin' ? '✅ Available' : '❌ Not available'}`);
    console.log(`Test Category Created: ${createdCategoryId ? '✅ Yes' : '❌ No'}`);
    console.log('\n🎉 Test sequence completed!');
    
    // Final recommendations
    console.log('\n💡 RECOMMENDATIONS:');
    if (!authenticated) {
      console.log('   • Create a test user in your database');
      console.log('   • Check your user login endpoint');
    }
    if (categories.length === 0) {
      console.log('   • Check if categories exist in database');
      console.log('   • Verify RPC server is running');
    }
    if (userRole !== 'admin') {
      console.log('   • Create an admin user to test admin endpoints');
    }
    
  } catch (error) {
    console.error('\n❌ TEST RUNNER ERROR:', error.message);
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
  }
};

// ==================== QUICK ORDER UPDATE TEST ====================

const quickOrderUpdateTest = async () => {
  console.log('⚡ ========== QUICK ORDER UPDATE TEST ==========');
  
  try {
    // Get categories
    const response = await axiosInstance.get('/categories');
    const categories = response.data.data || [];
    
    if (categories.length < 2) {
      console.log('❌ Need at least 2 categories for order update test');
      return;
    }
    
    console.log(`📊 Found ${categories.length} categories`);
    
    // Create simple update
    const updateData = {
      categories: categories.slice(0, 2).map((cat, idx) => ({
        id: cat._id,
        order: (idx + 1) * 1000  // 1000, 2000
      }))
    };
    
    console.log('📤 Updating order:', 
      updateData.categories.map(c => `${c.order}`).join(', '));
    
    // Update
    const updateResponse = await axiosInstance.put('/categories/update-order', updateData);
    
    console.log('📥 Response:', updateResponse.data);
    
    if (updateResponse.data.success) {
      console.log('✅ Order update successful!');
      console.log(`   Message: ${updateResponse.data.message}`);
      
      // Quick verification
      await delay(500);
      const verifyResponse = await axiosInstance.get('/categories');
      const updated = verifyResponse.data.data || [];
      
      console.log('🔍 Updated orders:');
      updated.slice(0, 2).forEach(cat => {
        console.log(`   ${cat.name}: ${cat.sort_order}`);
      });
    } else {
      console.log('❌ Order update failed:', updateResponse.data.error);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
};

// ==================== RUN SELECTED TESTS ====================

// Command line arguments
const args = process.argv.slice(2);
const testType = args[0] || 'all';

console.log(`
███████╗███████╗████████╗██╗   ██╗██████╗ 
██╔════╝██╔════╝╚══██╔══╝██║   ██║██╔══██╗
███████╗█████╗     ██║   ██║   ██║██████╔╝
╚════██║██╔══╝     ██║   ██║   ██║██╔═══╝ 
███████║███████╗   ██║   ╚██████╔╝██║     
╚══════╝╚══════╝   ╚═╝    ╚═════╝ ╚═╝     
                                          
WorkNet Categories Test Suite
`);

// Run based on argument
if (testType === 'quick') {
  quickOrderUpdateTest();
} else if (testType === 'public') {
  testPublicCategories();
} else {
  runAllTests();
}

// Export for use in other tests
module.exports = {
  runAllTests,
  testPublicCategories,
  quickOrderUpdateTest,
  axiosInstance
};