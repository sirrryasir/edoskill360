import request from 'supertest';
import app from '../src/app';
import Verification from '../src/models/Verification';

describe('Agent Endpoints', () => {

    // Independent test flow
    it('should allow agent to view and approve verification requests', async () => {
        // 1. Register Agent
        const agentRes = await request(app).post('/api/auth/register').send({
            name: 'Agent Smith',
            email: 'agent.flow@matrix.com',
            password: 'password123',
            role: 'agent'
        });
        const agentCookie = agentRes.headers['set-cookie'] as unknown as string[];

        // 2. Register Worker
        const talentRes = await request(app).post('/api/auth/register').send({
            name: 'Neo Talent',
            email: 'neo.flow@matrix.com',
            password: 'password123',
            role: 'talent'
        });
        const talentCookie = talentRes.headers['set-cookie'] as unknown as string[];
        const talentId = talentRes.body._id;

        // 3. Talent submits Identity Verification
        await request(app)
            .post('/api/verification/identity')
            .set('Cookie', talentCookie)
            .send({ identityProof: 'http://id.com/neo.jpg' });

        // Fetch verification ID
        const ver = await Verification.findOne({ userId: talentId });
        const verificationId = ver?._id.toString();

        // 4. Agent views pending requests
        const listRes = await request(app)
            .get('/api/agent/pending')
            .set('Cookie', agentCookie);

        expect(listRes.statusCode).toEqual(200);
        expect(listRes.body.verifications.length).toBeGreaterThan(0);
        const found = listRes.body.verifications.find((v: any) => v._id === verificationId);
        expect(found).toBeDefined();

        // 5. Talent tries to view pending (should fail)
        const denyRes = await request(app)
            .get('/api/agent/pending')
            .set('Cookie', talentCookie);
        expect(denyRes.statusCode).toBeGreaterThanOrEqual(400);

        // 6. Agent approves verification
        const approveRes = await request(app)
            .post('/api/agent/review-verification')
            .set('Cookie', agentCookie)
            .send({
                id: verificationId,
                outcome: 'approved',
                notes: 'Looks legit.'
            });

        expect(approveRes.statusCode).toEqual(200);
        expect(approveRes.body.message).toContain('approved');

        // 7. Verify Trust Score updated
        const statusRes = await request(app)
            .get('/api/verification/status')
            .set('Cookie', talentCookie);

        expect(statusRes.body.verificationStatus.identity).toEqual('verified');
        expect(statusRes.body.trustScore).toEqual(20);
    });
});
