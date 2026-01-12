import request from 'supertest';
import app from '../src/app';

describe('Job Endpoints', () => {
    let employerToken: string;
    let employerCookie: string[];

    const employerData = {
        name: 'Tech Corp',
        email: 'hr@techcorp.com',
        password: 'password123',
        role: 'employer'
    };

    const jobData = {
        title: 'Senior React Developer',
        description: 'We need a pro.',
        requirements: ['React', 'Node', 'TypeScript'],
        salaryRange: '$5000 - $8000',
        location: 'Remote',
        type: 'full-time'
    };

    beforeAll(async () => {
        const res = await request(app).post('/api/auth/register').send(employerData);
        employerCookie = res.headers['set-cookie'] as unknown as string[];
    });

    describe('Job Workflow', () => {
        it('should allow employer to create a job and verify it exists', async () => {
            // 1. Create Job
            const res = await request(app)
                .post('/api/jobs')
                .set('Cookie', employerCookie)
                .send(jobData);

            if (res.statusCode !== 201) console.log('Create Job Error:', JSON.stringify(res.body, null, 2));
            expect(res.statusCode).toEqual(201);
            const jobId = res.body._id;

            // 2. View All Jobs
            const listRes = await request(app).get('/api/jobs');
            expect(listRes.statusCode).toEqual(200);
            expect(listRes.body.length).toBeGreaterThan(0);

            // Verify our job is in the list
            const foundReq = listRes.body.find((j: any) => j._id === jobId);
            expect(foundReq).toBeDefined();

            // 3. View Job Detail
            const detailRes = await request(app).get(`/api/jobs/${jobId}`);
            expect(detailRes.statusCode).toEqual(200);
            expect(detailRes.body.title).toEqual(jobData.title);
        });

        it('should prevent workers from creating jobs', async () => {
            // Register a worker
            const workerRes = await request(app).post('/api/auth/register').send({
                name: 'Job Failer',
                email: 'failer@bee.com',
                password: 'password',
                role: 'worker'
            });
            const workerCookie = workerRes.headers['set-cookie'] as unknown as string[];

            const res = await request(app)
                .post('/api/jobs')
                .set('Cookie', workerCookie)
                .send(jobData);

            // Expect 401 or 403
            expect(res.statusCode).toBeGreaterThanOrEqual(401);
        });
    });
});
