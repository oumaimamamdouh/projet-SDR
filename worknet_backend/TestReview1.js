// test_all_review_endpoints.js
const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();

// Configuration
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000/api/reviews';

// IDs de test (remplacez par vos vrais IDs si nécessaire)
const TEST_IDS = {
  order_id: '6930d6219ca9d71a5da3111b',
  gig_id: '692a3be1f3be085d2499e02e',
  freelancer_id: '692a3bd6f3be085d2499e02d',
  client_id: '6920c49a747da49650b2d6d1'
};

// Tokens
const TOKENS = {
  admin: process.env.ADMIN_TOKEN,
  client: process.env.ORDER_CLIENT_TOKEN || process.env.CLIENT_TOKEN,
  freelancer: process.env.ORDER_FREELANCER_TOKEN || process.env.FREELANCER_TOKEN
};

let createdReviewId = null;

console.log('🧪 TEST COMPLET DU SERVICE REVIEW\n');
console.log('🔧 Configuration:');
console.log('   API URL:', API_BASE_URL);
console.log('   Order ID:', TEST_IDS.order_id);
console.log('   Gig ID:', TEST_IDS.gig_id);
console.log('\n');

// Helper functions
const logSuccess = (testName, data) => {
  console.log(`✅ ${testName}`);
  if (data) console.log('   ', typeof data === 'object' ? JSON.stringify(data, null, 2).split('\n').slice(0, 3).join('\n   ') : data);
};

const logError = (testName, error) => {
  console.log(`❌ ${testName}`);
  console.log('   Status:', error.response?.status);
  console.log('   Message:', error.response?.data?.error || error.message);
};

// ==================== TESTS PRINCIPAUX ====================

async function testAllEndpoints() {
  try {
    // 1. TEST DE SANTÉ
    await testHealthCheck();
    
    // 2. ENDPOINTS PUBLICS
    await testPublicEndpoints();
    
    // 3. VALIDATION
    await testValidation();
    
    // 4. CRÉATION REVIEW (si pas déjà existante)
    await testCreateReview();
    
    if (createdReviewId) {
      // 5. RÉPONSE FREELANCER
      await testFreelancerResponse();
      
      // 6. MISE À JOUR REVIEW
      await testUpdateReview();
      
      // 7. SUPPRESSION REVIEW (optionnel)
      // await testDeleteReview();
      
      // 8. ENDPOINTS ADMIN
      await testAdminEndpoints();
    }
    
    // 9. TESTS D'ERREURS
    await testErrorCases();
    
    console.log('\n' + '='.repeat(60));
    console.log('🎉 TOUS LES TESTS TERMINÉS !');
    console.log('='.repeat(60));
    
  } catch (error) {
    console.error('💥 Erreur générale:', error.message);
  }
}

// ==================== TESTS INDIVIDUELS ====================

async function testHealthCheck() {
  console.log('1. 🩺 TEST DE SANTÉ');
  try {
    const response = await axios.get(`${API_BASE_URL}/health`);
    logSuccess('Health Check', {
      service: response.data.service,
      status: response.data.status,
      timestamp: response.data.timestamp
    });
  } catch (error) {
    logError('Health Check', error);
  }
}

async function testPublicEndpoints() {
  console.log('\n2. 🌐 ENDPOINTS PUBLICS');
  
  // a. Get Gig Reviews
  try {
    const response = await axios.get(`${API_BASE_URL}/gig/${TEST_IDS.gig_id}`, {
      params: { limit: 5, page: 1 }
    });
    logSuccess(`Gig Reviews (${TEST_IDS.gig_id})`, {
      count: response.data.data?.length || 0,
      pagination: response.data.pagination
    });
  } catch (error) {
    logError('Gig Reviews', error);
  }
  
  // b. Get Freelancer Reviews
  try {
    const response = await axios.get(`${API_BASE_URL}/freelancer/${TEST_IDS.freelancer_id}`, {
      params: { limit: 5, page: 1 }
    });
    logSuccess(`Freelancer Reviews (${TEST_IDS.freelancer_id})`, {
      count: response.data.data?.length || 0,
      pagination: response.data.pagination
    });
  } catch (error) {
    logError('Freelancer Reviews', error);
  }
  
  // c. Get Review Stats
  try {
    const response = await axios.get(`${API_BASE_URL}/stats/${TEST_IDS.freelancer_id}`);
    logSuccess(`Review Stats (${TEST_IDS.freelancer_id})`, {
      total_reviews: response.data.data?.total_reviews || 0,
      average_rating: response.data.data?.average_rating || 0
    });
  } catch (error) {
    logError('Review Stats', error);
  }
}

async function testValidation() {
  console.log('\n3. ✅ VALIDATION DE DONNÉES');
  
  if (!TOKENS.client) {
    console.log('⚠️  Token client manquant - skip');
    return;
  }
  
  const testData = {
    rating_communication: 5,
    rating_quality: 4,
    rating_deadline: 5,
    comment: "Test de validation de données - ceci est un commentaire de test assez long pour passer la validation",
    gig_id: TEST_IDS.gig_id
  };
  
  try {
    const response = await axios.post(`${API_BASE_URL}/validate`, testData, {
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKENS.client}`
      }
    });
    logSuccess('Validation réussie', {
      message: response.data.message,
      calculated_rating: response.data.calculated_rating
    });
  } catch (error) {
    logError('Validation', error);
  }
}

async function testCreateReview() {
  console.log('\n4. ✨ CRÉATION DE REVIEW');
  
  if (!TOKENS.client) {
    console.log('❌ Token client manquant - impossible de créer une review');
    return;
  }
  
  // Vérifier si une review existe déjà
  try {
    const mongoose = require('mongoose');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/worknet');
    const db = mongoose.connection.db;
    
    const existingReview = await db.collection('reviews').findOne({
      order_id: new mongoose.Types.ObjectId(TEST_IDS.order_id)
    });
    
    if (existingReview) {
      console.log(`⚠️  Review existe déjà: ${existingReview._id.toString()}`);
      createdReviewId = existingReview._id.toString();
      await mongoose.disconnect();
      return;
    }
    
    await mongoose.disconnect();
  } catch (error) {
    console.log('ℹ️  Erreur vérification MongoDB:', error.message);
  }
  
  const reviewData = {
    rating_communication: 5,
    rating_quality: 4,
    rating_deadline: 5,
    comment: "Service exceptionnel ! Le freelancer a dépassé toutes mes attentes. Communication parfaite, qualité du travail excellente et livraison avant la deadline. Je recommande vivement !",
    gig_id: TEST_IDS.gig_id
  };
  
  try {
    const response = await axios.post(
      `${API_BASE_URL}/order/${TEST_IDS.order_id}`,
      reviewData,
      {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TOKENS.client}`
        },
        timeout: 10000
      }
    );
    
    if (response.data.success) {
      createdReviewId = response.data.data?._id;
      logSuccess('Review créée avec succès', {
        id: createdReviewId,
        overall_rating: response.data.data?.overall_rating,
        created_at: response.data.data?.created_at
      });
    } else {
      console.log('❌ Échec création:', response.data.error);
    }
    
  } catch (error) {
    logError('Création Review', error);
  }
}

async function testFreelancerResponse() {
  console.log('\n5. 💬 RÉPONSE DU FREELANCER');
  
  if (!createdReviewId || !TOKENS.freelancer) {
    console.log(createdReviewId ? '⚠️  Token freelancer manquant' : '⚠️  Aucune review créée');
    return;
  }
  
  const responseData = {
    response: "Merci infiniment pour votre retour si positif ! C'était un véritable plaisir de travailler sur ce projet. J'ai pris note de vos commentaires et je serai ravi de collaborer à nouveau sur de futurs projets."
  };
  
  try {
    const response = await axios.post(
      `${API_BASE_URL}/${createdReviewId}/respond`,
      responseData,
      {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TOKENS.freelancer}`
        }
      }
    );
    logSuccess('Réponse ajoutée', response.data.message);
  } catch (error) {
    logError('Réponse Freelancer', error);
  }
}

async function testUpdateReview() {
  console.log('\n6. 🔄 MISE À JOUR REVIEW');
  
  if (!createdReviewId || !TOKENS.client) {
    console.log('⚠️  Aucune review créée ou token manquant');
    return;
  }
  
  const updateData = {
    rating_quality: 5,
    comment: "Après réflexion et révision du travail, je modifie ma note à 5/5 pour la qualité. Le service était véritablement exceptionnel !"
  };
  
  try {
    const response = await axios.put(
      `${API_BASE_URL}/${createdReviewId}`,
      updateData,
      {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TOKENS.client}`
        }
      }
    );
    logSuccess('Review mise à jour', {
      message: response.data.message,
      new_rating: response.data.data?.overall_rating
    });
  } catch (error) {
    logError('Mise à jour Review', error);
  }
}

async function testDeleteReview() {
  console.log('\n7. 🗑️  SUPPRESSION REVIEW (optionnel)');
  
  if (!createdReviewId || !TOKENS.client) {
    console.log('⚠️  Aucune review à supprimer');
    return;
  }
  
  console.log('❓ Voulez-vous supprimer la review créée? (y/n)');
  
  // Pour automatiser, décommentez cette partie
  /*
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/${createdReviewId}`,
      {
        headers: { 
          'Authorization': `Bearer ${TOKENS.client}`
        }
      }
    );
    logSuccess('Review supprimée', response.data.message);
  } catch (error) {
    logError('Suppression Review', error);
  }
  */
}

async function testAdminEndpoints() {
  console.log('\n8. 👑 ENDPOINTS ADMIN');
  
  if (!TOKENS.admin) {
    console.log('⚠️  Token admin manquant');
    return;
  }
  
  // a. Get All Reviews
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/all`, {
      params: { limit: 3, page: 1 },
      headers: { Authorization: `Bearer ${TOKENS.admin}` }
    });
    logSuccess('Toutes les reviews (admin)', {
      count: response.data.data?.length || 0,
      total: response.data.pagination?.total || 0
    });
  } catch (error) {
    logError('Admin - All Reviews', error);
  }
  
  // b. Toggle Visibility (si review existe)
  if (createdReviewId) {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/admin/${createdReviewId}/visibility`,
        { is_public: false },
        {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOKENS.admin}`
          }
        }
      );
      logSuccess('Visibilité changée (masqué)', response.data.message);
      
      // Remettre en public
      await axios.put(
        `${API_BASE_URL}/admin/${createdReviewId}/visibility`,
        { is_public: true },
        {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOKENS.admin}`
          }
        }
      );
      console.log('   ✅ Visibilité rétablie (public)');
      
    } catch (error) {
      logError('Admin - Toggle Visibility', error);
    }
  }
  
  // c. Delete Review Admin (optionnel)
  /*
  if (createdReviewId) {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/admin/${createdReviewId}`,
        {
          headers: { Authorization: `Bearer ${TOKENS.admin}` }
        }
      );
      logSuccess('Review supprimée (admin)', response.data.message);
    } catch (error) {
      logError('Admin - Delete Review', error);
    }
  }
  */
}

async function testErrorCases() {
  console.log('\n9. 🚨 TESTS D\'ERREURS (comportement attendu)');
  
  // a. Création sans token
  try {
    await axios.post(`${API_BASE_URL}/order/${TEST_IDS.order_id}`, {
      rating_communication: 5,
      comment: "Test"
    });
    console.log('❌ Devrait échouer mais a réussi');
  } catch (error) {
    console.log('✅ Création sans token - correctement échoué:', error.response?.status);
  }
  
  // b. Mauvais order ID
  if (TOKENS.client) {
    try {
      await axios.post(
        `${API_BASE_URL}/order/invalid_order_id`,
        { comment: "Test" },
        {
          headers: { Authorization: `Bearer ${TOKENS.client}` }
        }
      );
      console.log('❌ Devrait échouer mais a réussi');
    } catch (error) {
      console.log('✅ Mauvais order ID - correctement échoué:', error.response?.status);
    }
  }
  
  // c. Validation avec données invalides
  if (TOKENS.client) {
    try {
      await axios.post(
        `${API_BASE_URL}/validate`,
        {
          rating_communication: 10, // Trop élevé
          comment: "Court" // Trop court
        },
        {
          headers: { Authorization: `Bearer ${TOKENS.client}` }
        }
      );
      console.log('❌ Devrait échouer mais a réussi');
    } catch (error) {
      console.log('✅ Données invalides - correctement échoué:', error.response?.status);
    }
  }
}

// ==================== LANCEMENT DES TESTS ====================

testAllEndpoints();