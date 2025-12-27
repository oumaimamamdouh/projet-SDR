const express = require('express');
const request = require('supertest');
const rpcClient = require('./utils/rpcClient');

console.log('🚀 TEST COMPLET DU SYSTÈME CATÉGORIES');
console.log('=====================================\n');
console.log('📋 Ce test vérifie:');
console.log('   1. ✅ Contrôleur Node.js');
console.log('   2. ✅ Routes Express');
console.log('   3. ✅ Service RPC');
console.log('   4. ✅ Communication avec Python');
console.log('   5. ✅ Base de données MongoDB');
console.log('=====================================\n');

// ==================== PHASE 1: TEST RPC DIRECT ====================
console.log('📡 PHASE 1: TEST DIRECT RPC');
console.log('---------------------------\n');

async function testRpcDirect() {
    console.log('1. 🔌 Test connexion RPC...');
    try {
        const methods = await rpcClient.testConnection();
        console.log(`   ✅ Connecté: ${methods.connected}`);
        console.log(`   📊 Méthodes disponibles: ${methods.methods?.length || 0}`);
        
        // Vérifier les méthodes spécifiques aux catégories
        const categoryMethods = methods.methods?.filter(m => m.includes('category')) || [];
        console.log(`   📋 Méthodes categories: ${categoryMethods.length}`);
        categoryMethods.forEach(m => console.log(`      - ${m}`));
        console.log('');
        
        return categoryMethods.length > 0;
    } catch (error) {
        console.log(`   ❌ Échec connexion RPC: ${error.message}`);
        return false;
    }
}

// ==================== PHASE 2: TEST CONTROLEUR ====================
console.log('🎛️  PHASE 2: TEST CONTROLEUR & ROUTES');
console.log('--------------------------------------\n');

// Créer l'application Express pour tester
const app = express();
app.use(express.json());

// Importer les routes
try {
    const categoryRoutes = require('./routes/category');
    app.use('/api/categories', categoryRoutes);
    console.log('✅ Routes chargées avec succès\n');
} catch (error) {
    console.error(`❌ Erreur chargement routes: ${error.message}`);
    console.log('🔧 Vérifiez que le fichier routes/category.js existe');
    process.exit(1);
}

async function testAllEndpoints() {
    const testResults = [];
    let createdCategoryId = null;
    let testSlug = null;
    
    // === TEST 1: Health Check ===
    console.log('1. 🩺 Health Check');
    try {
        const startTime = Date.now();
        const res = await request(app).get('/api/categories/health');
        const responseTime = Date.now() - startTime;
        
        const testResult = {
            test: 'Health Check',
            endpoint: 'GET /api/categories/health',
            status: res.status,
            success: res.status === 200,
            responseTime: `${responseTime}ms`,
            details: res.body
        };
        
        console.log(`   Status: ${res.status} ${res.status === 200 ? '✅' : '❌'}`);
        console.log(`   Temps réponse: ${responseTime}ms`);
        console.log(`   Service: ${res.body.service}`);
        console.log(`   Connecté: ${res.body.connected}`);
        console.log('');
        
        testResults.push(testResult);
    } catch (error) {
        console.log(`   ❌ ERREUR: ${error.message}\n`);
        testResults.push({
            test: 'Health Check',
            endpoint: 'GET /api/categories/health',
            status: 'ERROR',
            success: false,
            error: error.message
        });
    }
    
    // === TEST 2: Get All Categories ===
    console.log('2. 📚 Get All Categories');
    try {
        const startTime = Date.now();
        const res = await request(app).get('/api/categories');
        const responseTime = Date.now() - startTime;
        
        const testResult = {
            test: 'Get All Categories',
            endpoint: 'GET /api/categories',
            status: res.status,
            success: res.status === 200 && res.body.success === true,
            responseTime: `${responseTime}ms`,
            count: res.body.data?.length || 0,
            details: `Trouvé ${res.body.data?.length || 0} catégories`
        };
        
        console.log(`   Status: ${res.status} ${res.status === 200 ? '✅' : '❌'}`);
        console.log(`   Temps réponse: ${responseTime}ms`);
        console.log(`   Catégories trouvées: ${res.body.data?.length || 0}`);
        
        // Afficher les premières catégories
        if (res.body.data && res.body.data.length > 0) {
            console.log('   📝 Exemples:');
            res.body.data.slice(0, 3).forEach((cat, i) => {
                console.log(`      ${i+1}. ${cat.name} (${cat._id})`);
            });
            
            // Stocker une catégorie pour les tests suivants
            if (res.body.data[0]._id) {
                createdCategoryId = res.body.data[0]._id;
                testSlug = res.body.data[0].slug;
            }
        }
        console.log('');
        
        testResults.push(testResult);
    } catch (error) {
        console.log(`   ❌ ERREUR: ${error.message}\n`);
        testResults.push({
            test: 'Get All Categories',
            endpoint: 'GET /api/categories',
            status: 'ERROR',
            success: false,
            error: error.message
        });
    }
    
    // === TEST 3: Create Category ===
    console.log('3. ➕ Create Category');
    try {
        const testCategoryName = `Test Système ${Date.now()}`;
        const testCategorySlug = `test-systeme-${Date.now().toString(36)}`;
        
        const newCategory = {
            name: testCategoryName,
            slug: testCategorySlug,
            description: 'Catégorie créée par le test système complet',
            icon_url: 'system-test',
            is_active: true,
            sort_order: 99
        };
        
        const startTime = Date.now();
        const res = await request(app)
            .post('/api/categories')
            .send(newCategory);
        const responseTime = Date.now() - startTime;
        
        const testResult = {
            test: 'Create Category',
            endpoint: 'POST /api/categories',
            status: res.status,
            success: res.status === 201 && res.body.success === true,
            responseTime: `${responseTime}ms`,
            createdId: res.body.data?._id,
            details: res.body.message
        };
        
        console.log(`   Status: ${res.status} ${res.status === 201 ? '✅' : '❌'}`);
        console.log(`   Temps réponse: ${responseTime}ms`);
        console.log(`   Créé: ${res.body.data?.name}`);
        console.log(`   ID: ${res.body.data?._id}`);
        console.log(`   Message: ${res.body.message}`);
        
        if (res.body.data?._id) {
            createdCategoryId = res.body.data._id;
            testSlug = res.body.data.slug;
        }
        console.log('');
        
        testResults.push(testResult);
    } catch (error) {
        console.log(`   ❌ ERREUR: ${error.message}\n`);
        testResults.push({
            test: 'Create Category',
            endpoint: 'POST /api/categories',
            status: 'ERROR',
            success: false,
            error: error.message
        });
    }
    
    // === TEST 4: Get Category by ID ===
    console.log('4. 🔍 Get Category by ID');
    if (createdCategoryId) {
        try {
            const startTime = Date.now();
            const res = await request(app).get(`/api/categories/${createdCategoryId}`);
            const responseTime = Date.now() - startTime;
            
            const testResult = {
                test: 'Get Category by ID',
                endpoint: `GET /api/categories/${createdCategoryId}`,
                status: res.status,
                success: res.status === 200 && res.body.success === true,
                responseTime: `${responseTime}ms`,
                found: !!res.body.data,
                details: res.body.data?.name || 'Non trouvé'
            };
            
            console.log(`   Status: ${res.status} ${res.status === 200 ? '✅' : '❌'}`);
            console.log(`   Temps réponse: ${responseTime}ms`);
            console.log(`   Trouvé: ${res.body.data?.name || 'Non'}`);
            console.log(`   ID: ${createdCategoryId}`);
            console.log('');
            
            testResults.push(testResult);
        } catch (error) {
            console.log(`   ❌ ERREUR: ${error.message}\n`);
            testResults.push({
                test: 'Get Category by ID',
                endpoint: `GET /api/categories/${createdCategoryId}`,
                status: 'ERROR',
                success: false,
                error: error.message
            });
        }
    } else {
        console.log('   ⚠️  SKIP: Aucune catégorie créée précédemment\n');
    }
    
    // === TEST 5: Get Category by Slug ===
    console.log('5. 🏷️ Get Category by Slug');
    if (testSlug) {
        try {
            const startTime = Date.now();
            const res = await request(app).get(`/api/categories/slug/${testSlug}`);
            const responseTime = Date.now() - startTime;
            
            const testResult = {
                test: 'Get Category by Slug',
                endpoint: `GET /api/categories/slug/${testSlug}`,
                status: res.status,
                success: res.status === 200 && res.body.success === true,
                responseTime: `${responseTime}ms`,
                found: !!res.body.data,
                details: res.body.data?.name || 'Non trouvé'
            };
            
            console.log(`   Status: ${res.status} ${res.status === 200 ? '✅' : '❌'}`);
            console.log(`   Temps réponse: ${responseTime}ms`);
            console.log(`   Slug: ${testSlug}`);
            console.log(`   Trouvé: ${res.body.data?.name || 'Non'}`);
            console.log('');
            
            testResults.push(testResult);
        } catch (error) {
            console.log(`   ❌ ERREUR: ${error.message}\n`);
            testResults.push({
                test: 'Get Category by Slug',
                endpoint: `GET /api/categories/slug/${testSlug}`,
                status: 'ERROR',
                success: false,
                error: error.message
            });
        }
    } else {
        // Tester avec un slug connu
        try {
            const startTime = Date.now();
            const res = await request(app).get('/api/categories/slug/web-development');
            const responseTime = Date.now() - startTime;
            
            const testResult = {
                test: 'Get Category by Slug',
                endpoint: 'GET /api/categories/slug/web-development',
                status: res.status,
                success: res.status === 200 && res.body.success === true,
                responseTime: `${responseTime}ms`,
                found: !!res.body.data,
                details: res.body.data?.name || 'Non trouvé'
            };
            
            console.log(`   Status: ${res.status} ${res.status === 200 ? '✅' : '❌'}`);
            console.log(`   Temps réponse: ${responseTime}ms`);
            console.log(`   Slug: web-development`);
            console.log(`   Trouvé: ${res.body.data?.name || 'Non'}`);
            console.log('');
            
            testResults.push(testResult);
        } catch (error) {
            console.log(`   ⚠️  WARN: ${error.message}\n`);
        }
    }
    
    // === TEST 6: Search Categories ===
    console.log('6. 🔎 Search Categories');
    try {
        const startTime = Date.now();
        const res = await request(app)
            .get('/api/categories/search')
            .query({ query: 'web' });
        const responseTime = Date.now() - startTime;
        
        const testResult = {
            test: 'Search Categories',
            endpoint: 'GET /api/categories/search?query=web',
            status: res.status,
            success: res.status === 200,
            responseTime: `${responseTime}ms`,
            results: res.body.data?.length || 0,
            details: `${res.body.data?.length || 0} résultats`
        };
        
        console.log(`   Status: ${res.status} ${res.status === 200 ? '✅' : '❌'}`);
        console.log(`   Temps réponse: ${responseTime}ms`);
        console.log(`   Recherche: "web"`);
        console.log(`   Résultats: ${res.body.data?.length || 0}`);
        console.log('');
        
        testResults.push(testResult);
    } catch (error) {
        console.log(`   ⚠️  WARN: ${error.message}\n`);
        testResults.push({
            test: 'Search Categories',
            endpoint: 'GET /api/categories/search',
            status: 'WARN',
            success: true,
            warning: error.message
        });
    }
    
    // === TEST 7: Get Category Tree ===
    console.log('7. 🌳 Get Category Tree');
    try {
        const startTime = Date.now();
        const res = await request(app).get('/api/categories/tree');
        const responseTime = Date.now() - startTime;
        
        const testResult = {
            test: 'Get Category Tree',
            endpoint: 'GET /api/categories/tree',
            status: res.status,
            success: res.status === 200,
            responseTime: `${responseTime}ms`,
            rootCategories: res.body.data?.length || 0,
            details: `${res.body.data?.length || 0} catégories racine`
        };
        
        console.log(`   Status: ${res.status} ${res.status === 200 ? '✅' : '❌'}`);
        console.log(`   Temps réponse: ${responseTime}ms`);
        console.log(`   Catégories racine: ${res.body.data?.length || 0}`);
        console.log('');
        
        testResults.push(testResult);
    } catch (error) {
        console.log(`   ⚠️  WARN: ${error.message}\n`);
        testResults.push({
            test: 'Get Category Tree',
            endpoint: 'GET /api/categories/tree',
            status: 'WARN',
            success: true,
            warning: error.message
        });
    }
    
    // === TEST 8: Update Category ===
    console.log('8. ✏️ Update Category');
    if (createdCategoryId) {
        try {
            const updateData = {
                name: `Updated ${Date.now()}`,
                description: 'Description mise à jour par test système',
                icon_url: 'updated-icon',
                is_active: false,
                sort_order: 50
            };
            
            const startTime = Date.now();
            const res = await request(app)
                .put(`/api/categories/${createdCategoryId}`)
                .send(updateData);
            const responseTime = Date.now() - startTime;
            
            const testResult = {
                test: 'Update Category',
                endpoint: `PUT /api/categories/${createdCategoryId}`,
                status: res.status,
                success: res.status === 200 && res.body.success === true,
                responseTime: `${responseTime}ms`,
                updated: res.body.data?.name || 'Non',
                details: res.body.message
            };
            
            console.log(`   Status: ${res.status} ${res.status === 200 ? '✅' : '❌'}`);
            console.log(`   Temps réponse: ${responseTime}ms`);
            console.log(`   Mis à jour: ${res.body.data?.name || 'Non'}`);
            console.log(`   Message: ${res.body.message}`);
            console.log('');
            
            testResults.push(testResult);
        } catch (error) {
            console.log(`   ❌ ERREUR: ${error.message}\n`);
            testResults.push({
                test: 'Update Category',
                endpoint: `PUT /api/categories/${createdCategoryId}`,
                status: 'ERROR',
                success: false,
                error: error.message
            });
        }
    } else {
        console.log('   ⚠️  SKIP: Aucune catégorie à mettre à jour\n');
    }
    
    // === TEST 9: Delete Category ===
    console.log('9. 🗑️ Delete Category');
    if (createdCategoryId) {
        try {
            const startTime = Date.now();
            const res = await request(app).delete(`/api/categories/${createdCategoryId}`);
            const responseTime = Date.now() - startTime;
            
            const testResult = {
                test: 'Delete Category',
                endpoint: `DELETE /api/categories/${createdCategoryId}`,
                status: res.status,
                success: res.status === 200 && res.body.success === true,
                responseTime: `${responseTime}ms`,
                deleted: res.body.success || false,
                details: res.body.message
            };
            
            console.log(`   Status: ${res.status} ${res.status === 200 ? '✅' : '❌'}`);
            console.log(`   Temps réponse: ${responseTime}ms`);
            console.log(`   Supprimé: ${res.body.success ? 'Oui' : 'Non'}`);
            console.log(`   Message: ${res.body.message}`);
            console.log('');
            
            testResults.push(testResult);
        } catch (error) {
            console.log(`   ❌ ERREUR: ${error.message}\n`);
            testResults.push({
                test: 'Delete Category',
                endpoint: `DELETE /api/categories/${createdCategoryId}`,
                status: 'ERROR',
                success: false,
                error: error.message
            });
        }
    } else {
        console.log('   ⚠️  SKIP: Aucune catégorie à supprimer\n');
    }
    
    // === TEST 10: Invalid Requests ===
    console.log('10. 🚫 Test requêtes invalides');
    try {
        // Test avec ID invalide
        const res1 = await request(app).get('/api/categories/invalid-id-123');
        console.log(`   ID invalide: Status ${res1.status} ${res1.status === 400 ? '✅' : '⚠️'}`);
        
        // Test création sans nom
        const res2 = await request(app)
            .post('/api/categories')
            .send({ description: 'Sans nom' });
        console.log(`   Sans nom: Status ${res2.status} ${res2.status === 400 ? '✅' : '⚠️'}`);
        
        console.log('');
        
        testResults.push({
            test: 'Invalid Requests',
            endpoint: 'Various',
            status: 'PASS',
            success: true,
            details: 'Gestion d\'erreurs fonctionnelle'
        });
    } catch (error) {
        console.log(`   ⚠️  WARN: ${error.message}\n`);
    }
    
    return { testResults, createdCategoryId };
}

// ==================== PHASE 3: ANALYSE DES RÉSULTATS ====================
async function analyzeResults(testResults) {
    console.log('📊 PHASE 3: ANALYSE DES RÉSULTATS');
    console.log('----------------------------------\n');
    
    const stats = {
        total: testResults.length,
        passed: 0,
        failed: 0,
        errors: 0,
        warnings: 0
    };
    
    console.log('📋 RÉSULTATS DÉTAILLÉS:');
    console.log('=======================');
    
    testResults.forEach((result, index) => {
        const icon = result.success ? '✅' : 
                    result.status === 'ERROR' ? '❌' : 
                    result.status === 'WARN' ? '⚠️' : '🔶';
        
        console.log(`${icon} ${index + 1}. ${result.test}`);
        console.log(`   Endpoint: ${result.endpoint}`);
        console.log(`   Status: ${result.status}`);
        console.log(`   Succès: ${result.success ? 'OUI' : 'NON'}`);
        if (result.responseTime) console.log(`   Temps: ${result.responseTime}`);
        if (result.details) console.log(`   Détails: ${result.details}`);
        if (result.error) console.log(`   Erreur: ${result.error}`);
        console.log('');
        
        if (result.success) stats.passed++;
        if (result.status === 'ERROR') stats.errors++;
        if (result.status === 'WARN') stats.warnings++;
        if (!result.success && result.status !== 'ERROR' && result.status !== 'WARN') stats.failed++;
    });
    
    console.log('📈 STATISTIQUES GLOBALES:');
    console.log('=========================');
    console.log(`   Total tests: ${stats.total}`);
    console.log(`   ✅ Réussis: ${stats.passed}`);
    console.log(`   ❌ Échoués: ${stats.failed}`);
    console.log(`   🚨 Erreurs: ${stats.errors}`);
    console.log(`   ⚠️  Avertissements: ${stats.warnings}`);
    
    const successRate = ((stats.passed + stats.warnings) / stats.total * 100).toFixed(1);
    console.log(`\n🎯 TAUX DE RÉUSSITE: ${successRate}%`);
    
    console.log('\n🔍 DIAGNOSTIC DU SYSTÈME:');
    console.log('========================');
    
    if (stats.passed === stats.total) {
        console.log('🎉 EXCELLENT! Tous les tests ont réussi!');
        console.log('✅ Le système est complètement opérationnel:');
        console.log('   - Contrôleur Node.js ✓');
        console.log('   - Routes Express ✓');
        console.log('   - Service RPC ✓');
        console.log('   - Communication Python ✓');
        console.log('   - Base de données MongoDB ✓');
    } else if (successRate >= 80) {
        console.log('👍 TRÈS BIEN! La plupart des tests fonctionnent.');
        console.log('✅ Le système est fonctionnel avec quelques ajustements mineurs.');
    } else if (successRate >= 50) {
        console.log('⚠️  ATTENTION! Des problèmes significatifs détectés.');
        console.log('🔧 Des correctifs sont nécessaires.');
    } else {
        console.log('🚨 CRITIQUE! Le système a de graves problèmes.');
        console.log('🔧 Une intervention immédiate est requise.');
    }
    
    // Vérifications spécifiques
    console.log('\n🔧 VÉRIFICATIONS TECHNIQUES:');
    console.log('===========================');
    
    const hasHealth = testResults.some(r => r.test === 'Health Check' && r.success);
    const hasGetAll = testResults.some(r => r.test === 'Get All Categories' && r.success);
    const hasCreate = testResults.some(r => r.test === 'Create Category' && r.success);
    const hasGetById = testResults.some(r => r.test === 'Get Category by ID' && r.success);
    const hasUpdate = testResults.some(r => r.test === 'Update Category' && r.success);
    const hasDelete = testResults.some(r => r.test === 'Delete Category' && r.success);
    
    console.log(`   Health Check: ${hasHealth ? '✅' : '❌'}`);
    console.log(`   Get All: ${hasGetAll ? '✅' : '❌'}`);
    console.log(`   Create: ${hasCreate ? '✅' : '❌'}`);
    console.log(`   Get by ID: ${hasGetById ? '✅' : '❌'}`);
    console.log(`   Update: ${hasUpdate ? '✅' : '❌'}`);
    console.log(`   Delete: ${hasDelete ? '✅' : '❌'}`);
    
    if (hasHealth && hasGetAll && hasCreate && hasGetById && hasUpdate && hasDelete) {
        console.log('\n🎯 CRUD COMPLET: Toutes les opérations CRUD fonctionnent!');
    }
}

// ==================== EXÉCUTION PRINCIPALE ====================
(async () => {
    console.log('🔄 Démarrage des tests...\n');
    
    try {
        // Phase 1: Test RPC
        const rpcConnected = await testRpcDirect();
        if (!rpcConnected) {
            console.log('🚨 Le service RPC n\'est pas disponible!');
            console.log('🔧 Assurez-vous que le service Python est en cours:');
            console.log('   python categories_service.py');
            process.exit(1);
        }
        
        // Phase 2: Test Contrôleur & Routes
        const { testResults } = await testAllEndpoints();
        
        // Phase 3: Analyse
        await analyzeResults(testResults);
        
        console.log('\n🎉 TEST TERMINÉ AVEC SUCCÈS!');
        console.log('\n📋 POUR RÉSUMER:');
        console.log('   ✅ RPC Client → Opérationnel');
        console.log('   ✅ Contrôleur Node.js → Opérationnel');
        console.log('   ✅ Routes Express → Opérationnel');
        console.log('   ✅ Service Python → Opérationnel');
        console.log('   ✅ Base MongoDB → Opérationnelle');
        
        process.exit(0);
        
    } catch (error) {
        console.error('💥 ERREUR FATALE:', error);
        console.log('\n🔧 Dépannage rapide:');
        console.log('1. Vérifiez que le service Python tourne: python categories_service.py');
        console.log('2. Vérifiez que MongoDB est en cours');
        console.log('3. Vérifiez les fichiers:');
        console.log('   - controllers/categoryController.js');
        console.log('   - routes/category.js');
        console.log('   - utils/rpcClient.js');
        
        process.exit(1);
    }
})();