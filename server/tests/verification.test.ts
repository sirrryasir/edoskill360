import request from 'supertest';
import app from '../src/app';

describe('Verification Endpoints', () => {

    it('should handle identity verification flow', async () => {
        // 1. Register Worker
        const workerRes = await request(app).post('/api/auth/register').send({
            name: 'Verify Worker',
            email: 'verify.flow@example.com',
            password: 'password123',
            role: 'worker'
        });
        const workerCookie = workerRes.headers['set-cookie'] as unknown as string[];

        // 2. Request Identity Verification
        const res = await request(app)
            .post('/api/verification/identity')
            .set('Cookie', workerCookie)
            .send({
                identityProof: 'http://example.com/id.jpg'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toContain('verification requested');

        // 3. Request without proof (Fail)
        const failRes = await request(app)
            .post('/api/verification/identity')
            .set('Cookie', workerCookie)
            .send({});
        expect(failRes.statusCode).toEqual(400);

        // 4. Check Status (Pending)
        const statusRes = await request(app)
            .get('/api/verification/status')
            .set('Cookie', workerCookie);

        expect(statusRes.statusCode).toEqual(200);
        expect(statusRes.body.verificationStatus.identity).toEqual('pending');
        expect(statusRes.body.trustScore).toEqual(0);
    });

    it('should handle reference verification request', async () => {
        // 1. Register Worker
        const workerRes = await request(app).post('/api/auth/register').send({
            name: 'Ref Worker',
            email: 'ref.flow@example.com',
            password: 'password123',
            role: 'worker'
        });
        const workerCookie = workerRes.headers['set-cookie'] as unknown as string[];

        // 2. Request Reference
        const res = await request(app)
            .post('/api/verification/reference')
            .set('Cookie', workerCookie)
            .send({
                name: 'Old Boss',
                email: 'boss@corp.com',
                relationship: 'Manager',
                company: 'Corp Inc'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toContain('email sent');
    });
});
