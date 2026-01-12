import request from 'supertest';
import app from '../src/app';

describe('Job Application Endpoints', () => {
    let workerToken: string;
    let workerCookie: string[];
    let employerToken: string;
    let employerCookie: string[];

    // We create fresh data for each test to avoid DB cleanup issues
    const employerData = {
        name: 'App Employer',
        email: 'app.employer@example.com',
        password: 'password123',
        role: 'employer'
    };

    const workerData = {
        name: 'App Worker',
        email: 'app.worker@example.com',
        password: 'password123',
        role: 'worker'
    };

    const jobData = {
        title: 'Backend Dev',
        description: 'Build APIs',
        requirements: ['Node.js'],
        salaryRange: '5k-10k',
        location: 'Remote',
        type: 'full-time'
    };

    describe('Application Flow', () => {
        it('should allow worker to apply for a job and employer to view it', async () => {
            // 1. Register Users
            const empRes = await request(app).post('/api/auth/register').send({
                ...employerData, email: 'emp1@test.com'
            });
            const empCookie = empRes.headers['set-cookie'] as unknown as string[];

            const workRes = await request(app).post('/api/auth/register').send({
                ...workerData, email: 'work1@test.com'
            });
            const workCookie = workRes.headers['set-cookie'] as unknown as string[];

            // 2. Create Job
            const jobRes = await request(app)
                .post('/api/jobs')
                .set('Cookie', empCookie)
                .send(jobData);
            expect(jobRes.statusCode).toEqual(201);
            const jobId = jobRes.body._id;

            // 3. Worker Applies
            const applyRes = await request(app)
                .post('/api/applications')
                .set('Cookie', workCookie)
                .send({
                    jobId,
                    coverLetter: 'Hire me',
                    resumeLink: 'http://resume.com'
                });
            expect(applyRes.statusCode).toEqual(201);
            expect(applyRes.body.status).toEqual('pending');

            // 4. Verify duplicate application fails
            const dupRes = await request(app)
                .post('/api/applications')
                .set('Cookie', workCookie)
                .send({ jobId });
            expect(dupRes.statusCode).toEqual(400);

            // 5. Worker views my applications
            const myAppsRes = await request(app)
                .get('/api/applications/my')
                .set('Cookie', workCookie);
            expect(myAppsRes.statusCode).toEqual(200);
            expect(myAppsRes.body.length).toBeGreaterThan(0);
            expect(myAppsRes.body[0].jobId).toBeDefined();

            // 6. Employer views applications for job
            const jobAppsRes = await request(app)
                .get(`/api/applications/job/${jobId}`)
                .set('Cookie', empCookie);
            expect(jobAppsRes.statusCode).toEqual(200);
            expect(jobAppsRes.body.length).toEqual(1);
        });
    });
});
