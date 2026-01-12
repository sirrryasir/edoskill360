
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import path from "path";

// Load .env from server root
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const run = async () => {
    const key = process.env.GEMINI_API_KEY;

    console.log("---------------------------------------------------");
    console.log("🔑 Checking GEMINI_API_KEY...");

    if (!key) {
        console.error("❌ ERROR: GEMINI_API_KEY is missing in .env file.");
        process.exit(1);
    }

    // Masked key for log safety
    const maskedKey = key.substring(0, 4) + "..." + key.substring(key.length - 4);
    console.log(`ℹ️  Found Key: ${maskedKey}`);

    const genAI = new GoogleGenerativeAI(key);
    try {
        const modelName = "gemini-2.0-flash";
        const model = genAI.getGenerativeModel({ model: modelName });

        console.log(`📡 Attempting to connect to Gemini API using model: ${modelName}...`);
        const prompt = "Hello! respond with 'API Working'";
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log("---------------------------------------------------");
        console.log("✅ SUCCESS: API Connected Successfully!");
        console.log(`🤖 Response: ${text}`);
        console.log("---------------------------------------------------");
    } catch (error) {
        console.error("---------------------------------------------------");
        console.error("❌ FAILURE: API Call Failed.");
        console.error("Error Details:", (error as Error).message);
        console.log("---------------------------------------------------");
        process.exit(1);
    }
};

run();
