// test_route_fix.js
const request = require('supertest');
const app = require('./server'); // Your Express app
const baseUrl = 'http://localhost:5000';

async function testRouteFix() {
    console.log('🔍 Testing route order fix');
    
    // 1. Login to get token
    const loginRes = await request(baseUrl)
        .post('/api/users/login')
        .send({
            email: 'sadik@example.com',
            password: 'pwd12345'
        });
    
    const token = loginRes.body.token;
    
    // 2. Test /api/gigs/my-gigs
    console.log('\nTesting GET /api/gigs/my-gigs...');
    const myGigsRes = await request(baseUrl)
        .get('/api/gigs/my-gigs')
        .set('Authorization', `Bearer ${token}`);
    
    console.log('Status:', myGigsRes.status);
    console.log('Response:', myGigsRes.body);
    
    if (myGigsRes.status === 200) {
        console.log('✅ Route fixed! /my-gigs is working correctly');
    } else if (myGigsRes.status === 404) {
        console.log('❌ Still getting 404 - route not matching');
    } else if (myGigsRes.body.error && myGigsRes.body.error.includes('ObjectId')) {
        console.log('❌ Still hitting wrong route - getting ObjectId error');
    }
}

testRouteFix().catch(console.error);