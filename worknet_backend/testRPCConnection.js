// const rpcClient = require('./rpcClient');

// async function testAllRPCConnections() {
//     console.log('🔧 بدء اختبار جميع اتصالات RPC...\n');
    
//     const tests = [
//         // اختبار الاتصال الأساسي
//         {
//             name: 'الاتصال الأساسي مع RPC Server',
//             test: async () => {
//                 try {
//                     const result = await rpcClient.testConnection();
//                     console.log('✅ RPC Server متصل:', result.connected);
//                     console.log('📡 عدد الـ methods المتاحة:', result.methods?.length || 0);
//                     return true;
//                 } catch (error) {
//                     console.log('❌ خطأ في الاتصال:', error.message);
//                     return false;
//                 }
//             }
//         },
        
//         // اختبار وظائف المستخدمين
//         {
//             name: 'اختبار وظائف المستخدمين',
//             test: async () => {
//                 try {
//                     // 1. جلب جميع المستخدمين
//                     const users = await rpcClient.call('get_all_users');
//                     console.log(`👤 عدد المستخدمين في DB: ${users?.length || 0}`);
                    
//                     // 2. إنشاء مستخدم تجريبي
//                     const testUser = {
//                         username: `test_user_${Date.now()}`,
//                         email: `test${Date.now()}@test.com`,
//                         password: 'test123',
//                         role: 'client',
//                         full_name: 'Test User'
//                     };
                    
//                     console.log('📝 محاولة إنشاء مستخدم تجريبي...');
//                     const newUserId = await rpcClient.call('create_user', testUser);
//                     console.log('✅ تم إنشاء مستخدم جديد:', newUserId);
                    
//                     // 3. جلب بيانات المستخدم
//                     if (newUserId) {
//                         const userData = await rpcClient.call('get_user_by_id', newUserId);
//                         console.log('📋 بيانات المستخدم:', userData?.email);
//                     }
                    
//                     return true;
//                 } catch (error) {
//                     console.log('⚠️  مشكلة في وظائف المستخدمين:', error.message);
//                     return false;
//                 }
//             }
//         },
        
//         // اختبار وظائف الـ Gigs
//         {
//             name: 'اختبار وظائف الـ Gigs',
//             test: async () => {
//                 try {
//                     // 1. جلب جميع الـ Gigs
//                     const gigs = await rpcClient.call('get_all_gigs');
//                     console.log(`💼 عدد الـ Gigs المتاحة: ${gigs?.length || 0}`);
                    
//                     // 2. جلب الفئات
//                     const categories = await rpcClient.call('get_all_categories');
//                     console.log(`📁 عدد الفئات: ${categories?.length || 0}`);
                    
//                     return true;
//                 } catch (error) {
//                     console.log('⚠️  مشكلة في وظائف الـ Gigs:', error.message);
//                     return false;
//                 }
//             }
//         },
        
//         // اختبار وظائف الطلبات
//         {
//             name: 'اختبار وظائف الطلبات',
//             test: async () => {
//                 try {
//                     const orders = await rpcClient.call('get_all_orders_admin', {}, { limit: 5 });
//                     console.log(`📦 عدد الطلبات: ${orders?.length || 0}`);
                    
//                     return true;
//                 } catch (error) {
//                     console.log('⚠️  مشكلة في وظائف الطلبات:', error.message);
//                     return false;
//                 }
//             }
//         }
//     ];
    
//     let passedTests = 0;
//     let failedTests = 0;
    
//     for (const test of tests) {
//         console.log(`\n🔍 جارٍ ${test.name}...`);
//         try {
//             const result = await test.test();
//             if (result) {
//                 passedTests++;
//                 console.log(`✅ ${test.name}: ناجح`);
//             } else {
//                 failedTests++;
//                 console.log(`❌ ${test.name}: فشل`);
//             }
//         } catch (error) {
//             failedTests++;
//             console.log(`❌ ${test.name}: خطأ - ${error.message}`);
//         }
//     }
    
//     console.log('\n📊 ============ ملخص الاختبارات ============');
//     console.log(`✅ الاختبارات الناجحة: ${passedTests}`);
//     console.log(`❌ الاختبارات الفاشلة: ${failedTests}`);
//     console.log(`📈 النسبة: ${Math.round((passedTests / tests.length) * 100)}%`);
//     console.log('========================================\n');
    
//     return passedTests === tests.length;
// }

// // تشغيل الاختبارات إذا تم تشغيل الملف مباشرة
// if (require.main === module) {
//     testAllRPCConnections().then(success => {
//         if (success) {
//             console.log('🎉 جميع الاختبارات نجحت! النظام جاهز للعمل.');
//             process.exit(0);
//         } else {
//             console.log('⚠️  هناك مشاكل في النظام. راجع الأخطاء أعلاه.');
//             process.exit(1);
//         }
//     }).catch(error => {
//         console.error('❌ خطأ غير متوقع:', error);
//         process.exit(1);
//     });
// }

// module.exports = testAllRPCConnections;


// backend/testRPCConnection.js
const rpcClient = require('./utils/rpcClient');

async function testRPCConnection() {
    console.log('🔧 اختبار اتصال RPC Server...\n');
    
    try {
        // 1. اختبار الاتصال الأساسي
        console.log('1. 🔌 اختبار Ping إلى RPC Server...');
        const pingResult = await rpcClient.ping();
        
        if (pingResult.success) {
            console.log(`✅ Ping ناجح: ${pingResult.message}`);
        } else {
            console.log(`❌ Ping فاشل: ${pingResult.error}`);
            console.log('💡 تأكد من تشغيل Python RPC Server: python server.py');
            return false;
        }
        
        // 2. جلب قائمة الـ methods المتاحة
        console.log('\n2. 📋 جلب قائمة الـ Methods المتاحة...');
        const methodsResult = await rpcClient.getAvailableMethods();
        
        if (methodsResult.success) {
            console.log(`✅ تم العثور على ${methodsResult.methods.length} method`);
            
            // عرض أول 10 methods
            console.log('📝 عينة من الـ Methods:');
            methodsResult.methods.slice(0, 10).forEach((method, index) => {
                console.log(`   ${index + 1}. ${method}`);
            });
            
            if (methodsResult.methods.length > 10) {
                console.log(`   ... و ${methodsResult.methods.length - 10} أخرى`);
            }
        } else {
            console.log(`❌ فشل جلب الـ Methods: ${methodsResult.error}`);
            return false;
        }
        
        // 3. اختبار بعض الـ Methods الأساسية
        console.log('\n3. 🧪 اختبار بعض الـ Functions الأساسية...');
        
        const testMethods = [
            { name: 'get_all_users', params: [] },
            { name: 'get_all_categories', params: [] },
            { name: 'get_all_gigs', params: [] }
        ];
        
        let passedTests = 0;
        
        for (const test of testMethods) {
            // تحقق إذا كان method موجود في القائمة
            if (methodsResult.methods.includes(test.name)) {
                try {
                    console.log(`   🔍 اختبار ${test.name}...`);
                    const result = await rpcClient.call(test.name, ...test.params);
                    console.log(`   ✅ ${test.name}: ناجح (${Array.isArray(result) ? result.length + ' عنصر' : 'تم الاسترجاع'})`);
                    passedTests++;
                } catch (error) {
                    console.log(`   ❌ ${test.name}: فشل - ${error.message}`);
                }
            } else {
                console.log(`   ⚠️  ${test.name}: غير متوفر في RPC Server`);
            }
        }
        
        // 4. اختبار إنشاء مستخدم تجريبي
        console.log('\n4. 👤 اختبار إنشاء مستخدم تجريبي...');
        if (methodsResult.methods.includes('create_user')) {
            try {
                const testUser = {
                    username: `testuser_${Date.now()}`,
                    email: `test${Date.now()}@worknet.com`,
                    password: 'TestPass123!',
                    role: 'client',
                    full_name: 'Test User'
                };
                
                const userId = await rpcClient.call('create_user', testUser);
                console.log(`   ✅ تم إنشاء مستخدم جديد: ${userId}`);
                console.log(`   📧 البريد: ${testUser.email}`);
                console.log(`   🔑 كلمة المرور: ${testUser.password}`);
                passedTests++;
            } catch (error) {
                console.log(`   ❌ فشل إنشاء المستخدم: ${error.message}`);
                console.log('   💡 قد يكون هناك مشكلة في اتصال MongoDB أو في الـ schema');
            }
        }
        
        // 5. النتائج النهائية
        console.log('\n📊 ============ ملخص النتائج ============');
        console.log(`✅ الاتصال مع RPC Server: ${pingResult.success ? 'ناجح' : 'فاشل'}`);
        console.log(`📋 عدد الـ Methods المتاحة: ${methodsResult.success ? methodsResult.methods.length : 'غير معروف'}`);
        console.log(`🧪 الاختبارات الناجحة: ${passedTests} من ${testMethods.length + 1}`);
        console.log('========================================\n');
        
        if (pingResult.success && methodsResult.success && passedTests > 0) {
            console.log('🎉 اتصال RPC يعمل بشكل صحيح!');
            return true;
        } else {
            console.log('⚠️  هناك مشاكل في اتصال RPC. راجع الأخطاء أعلاه.');
            return false;
        }
        
    } catch (error) {
        console.error('❌ خطأ غير متوقع:', error);
        return false;
    }
}

// تشغيل الاختبار إذا تم تنفيذ الملف مباشرة
if (require.main === module) {
    console.log('🚀 بدء اختبار اتصال RPC Server...');
    
    testRPCConnection()
        .then(success => {
            if (success) {
                console.log('\n✅ جميع الاختبارات نجحت! النظام جاهز للعمل.');
                process.exit(0);
            } else {
                console.log('\n❌ هناك مشاكل في النظام. يرجى التحقق من:');
                console.log('   1. تأكد من تشغيل Python RPC Server');
                console.log('   2. تأكد من اتصال MongoDB');
                console.log('   3. تحقق من ملف .env للتأكد من الإعدادات');
                process.exit(1);
            }
        })
        .catch(error => {
            console.error('🔥 خطأ حرج:', error);
            process.exit(1);
        });
}

module.exports = testRPCConnection;