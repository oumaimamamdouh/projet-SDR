// backend/testMongoDB.js
const mongoose = require('mongoose');
require('dotenv').config();

async function testMongoDB() {
    console.log('🗄️  اختبار اتصال MongoDB...');
    
    try {
        const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/worknet';
        
        console.log(`🔗 محاولة الاتصال بـ: ${mongoURI}`);
        
        // الاتصال بـ MongoDB
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        });
        
        console.log('✅ اتصال MongoDB ناجح');
        
        // الحصول على قائمة قواعد البيانات
        const adminDb = mongoose.connection.db.admin();
        const dbs = await adminDb.listDatabases();
        
        console.log(`📊 عدد قواعد البيانات: ${dbs.databases.length}`);
        
        // البحث عن قاعدة بيانات worknet
        const worknetDB = dbs.databases.find(db => db.name === 'worknet');
        
        if (worknetDB) {
            console.log('✅ قاعدة بيانات worknet موجودة');
            
            // الحصول على قائمة Collections
            const collections = await mongoose.connection.db.listCollections().toArray();
            console.log(`📁 عدد Collections: ${collections.length}`);
            
            if (collections.length > 0) {
                console.log('📋 Collections المتوفرة:');
                collections.forEach((col, index) => {
                    console.log(`   ${index + 1}. ${col.name}`);
                });
            }
        } else {
            console.log('⚠️  قاعدة بيانات worknet غير موجودة');
            console.log('💡 سيتم إنشاؤها تلقائياً عند أول استخدام');
        }
        
        await mongoose.disconnect();
        return true;
    } catch (error) {
        console.error('❌ خطأ في اتصال MongoDB:', error.message);
        console.log('💡 تأكد من:');
        console.log('   1. MongoDB يعمل: mongod');
        console.log('   2. رابط الاتصال صحيح في ملف .env');
        console.log('   3. المنفذ 27017 مفتوح');
        return false;
    }
}

// تشغيل الاختبار إذا تم تنفيذ الملف مباشرة
if (require.main === module) {
    testMongoDB()
        .then(success => {
            process.exit(success ? 0 : 1);
        })
        .catch(error => {
            console.error('🔥 خطأ غير متوقع:', error);
            process.exit(1);
        });
}

module.exports = testMongoDB;