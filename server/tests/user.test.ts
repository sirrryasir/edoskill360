import request from 'supertest';
import app from '../src/app';
import mongoose from 'mongoose';

describe('User Endpoints', () => {
    let userToken: string;
    let userId: string;
    let cookie: string[];

    const userData = {
        name: 'Profile Tester',
        email: 'profile@example.com',
        password: 'password123',
        role: 'talent',
        headline: 'Software Engineer'
    };

    beforeEach(async () => {
        // Register a user before each test to get a fresh token
        const res = await request(app).post('/api/auth/register').send(userData);
        userId = res.body._id;
        // Depending on how your app handles auth (cookie vs header)
        // From previous auth.test.ts we saw it uses cookies
        cookie = res.headers['set-cookie'] as unknown as string[];
    });

    describe('GET /api/users/profile', () => {
        it('should return the logged in user profile', async () => {
            const res = await request(app)
                .get('/api/users/profile')
                .set('Cookie', cookie);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('email', userData.email);
            expect(res.body).toHaveProperty('_id', userId);
        });

        it('should fail without auth token', async () => {
            const res = await request(app).get('/api/users/profile');
            expect(res.statusCode).toEqual(401);
        });
    });

    describe('PUT /api/users/profile', () => {
        it('should update user profile fields', async () => {
            const updatedData = {
                name: 'Updated Name',
                headline: 'Senior Engineer',
                bio: 'Experienced developer',
                location: 'Remote'
            };

            const res = await request(app)
                .put('/api/users/profile')
                .set('Cookie', cookie)
                .send(updatedData);

            expect(res.statusCode).toEqual(200);
            expect(res.body.name).toEqual(updatedData.name);
            expect(res.body.headline).toEqual(updatedData.headline);
            expect(res.body.bio).toEqual(updatedData.bio);
            expect(res.body.location).toEqual(updatedData.location);
        });

        it('should not update restricted fields directly if prevented (checking role)', async () => {
            // Attempt to change role to admin
            const res = await request(app)
                .put('/api/users/profile')
                .set('Cookie', cookie)
                .send({ role: 'admin' });

            // In the controller I saw:
            // user.name = req.body.name || user.name;
            // ...
            // It does NOT list role as updatable. Let's verify it stays as 'talent'

            expect(res.statusCode).toEqual(200);
            expect(res.body.role).toEqual('talent');
        });
    });

    describe('GET /api/users/:id', () => {
        it('should get public user profile without auth', async () => {
            const res = await request(app).get(`/api/users/${userId}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body.name).toEqual(userData.name);
            expect(res.body).not.toHaveProperty('password'); // Security check
        });
    });
});
