import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod: MongoMemoryServer;

// Increase timeout for downloading MongoDB binary
jest.setTimeout(300000);

// Connect to the database before running any tests
beforeAll(async () => {
    mongod = await MongoMemoryServer.create({
        instance: {
            dbName: 'testdb',
        }
    });
    const uri = mongod.getUri();
    process.env.JWT_SECRET = process.env.JWT_SECRET || 'test_secret_key_123';
    // Mongoose connection options for stability
    await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000
    });
});

// Clear all data from collections after every test
afterEach(async () => {
    if (mongoose.connection.readyState !== 0) {
        const collections = mongoose.connection.collections;
        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany({});
        }
    }
});

// Disconnect after all tests are done
afterAll(async () => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    }
    if (mongod) {
        await mongod.stop();
    }
});
