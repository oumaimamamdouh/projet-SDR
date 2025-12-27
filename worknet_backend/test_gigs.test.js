const request = require('supertest');
const express = require('express');

jest.mock('./utils/rpcClient', () => ({
    call: jest.fn()
}));

const rpcClient = require('./utils/rpcClient');
const gigController = require('./controllers/gig.controller');

const app = express();
app.use(express.json());

// Fake auth middleware
app.use((req, res, next) => {
    req.user = { id: 1, role: 'freelancer' };
    next();
});

app.get('/api/gigs', gigController.getAllGigs);
app.post('/api/gigs', gigController.createGig);
app.get('/api/gigs/me', gigController.getMyGigs);

describe('Gig Controller', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('GET /api/gigs - success', async () => {
        rpcClient.call.mockResolvedValue({
            success: true,
            gigs: [{ id: 1 }],
            pagination: {}
        });

        const res = await request(app).get('/api/gigs');

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.count).toBe(1);
    });

    test('POST /api/gigs - create gig', async () => {
        rpcClient.call.mockResolvedValue({
            success: true,
            gig: { id: 10 }
        });

        const res = await request(app)
            .post('/api/gigs')
            .send({ title: 'Test Gig' });

        expect(res.statusCode).toBe(201);
        expect(res.body.data.id).toBe(10);
    });

    test('GET /api/gigs/me - my gigs', async () => {
        rpcClient.call.mockResolvedValue({
            success: true,
            gigs: [{ id: 1 }, { id: 2 }],
            pagination: {}
        });

        const res = await request(app).get('/api/gigs/me');

        expect(res.statusCode).toBe(200);
        expect(res.body.count).toBe(2);
    });

    test('RPC failure handled', async () => {
        rpcClient.call.mockResolvedValue({
            success: false,
            error: 'RPC error'
        });

        const res = await request(app).get('/api/gigs');

        expect(res.statusCode).toBe(500);
    });
});
