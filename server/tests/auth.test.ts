import request from 'supertest';
import app from '../src/app';
import mongoose from 'mongoose';
import User from '../src/models/User'; // Assuming User model exists

describe('Auth Endpoints', () => {

    // Test data
    const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'talent'
    };

    describe('POST /api/auth/register', () => {
        it('should register a new user successfully', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send(userData);

            if (res.statusCode !== 201) {
                throw new Error(`Registration failed with ${res.statusCode}: ${JSON.stringify(res.body)}`);
            }
            expect(res.statusCode).toEqual(201);
            expect(res.headers['set-cookie']).toBeDefined();
            expect(res.body).toHaveProperty('email', userData.email);
        });

        it('should return 400 if user already exists', async () => {
            // Register first
            await request(app).post('/api/auth/register').send(userData);

            // Try registering again
            const res = await request(app)
                .post('/api/auth/register')
                .send(userData);

            expect(res.statusCode).toEqual(400); // Or whatever existing user code is
        });
    });

    describe('POST /api/auth/login', () => {
        beforeEach(async () => {
            // Create user before login test
            await request(app).post('/api/auth/register').send(userData);
        });

        it('should login successfully with correct credentials', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: userData.email,
                    password: userData.password
                });

            expect(res.statusCode).toEqual(200);
            expect(res.headers['set-cookie']).toBeDefined();
        });

        it('should fail with incorrect password', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: userData.email,
                    password: 'wrongpassword'
                });

            expect(res.statusCode).toEqual(401); // Or 400/404 based on implementation
        });
    });
});
