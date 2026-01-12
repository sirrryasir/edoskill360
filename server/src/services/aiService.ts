import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const generateTask = async (skill: string, difficulty: string) => {
    // Mock Fallback for Demo/Testing if API fails or key missing
    const mockTask = {
        question: `**[AI Generated]** Explain the event loop in ${skill} and how it handles asynchronous operations. Provide a code example.`,
        type: "coding"
    };

    if (!process.env.GEMINI_API_KEY) {
        console.warn("Using Mock AI Task (No API Key)");
        return mockTask;
    }

    try {
        const prompt = `Generate a unique, single technical question or coding challenge for a ${difficulty} level ${skill} assessment. 
    Format the output as a JSON object with the following structure:
    {
      "question": "The question text (markdown supported)",
      "options": ["Option A", "Option B", "Option C", "Option D"], // If multiple choice
      "correctOption": 0, // Index of correct option (if multiple choice)
      "type": "quiz" // or "coding"
    }
    If it's a coding challenge, 'options' and 'correctOption' can be omitted, and 'type' should be 'coding'.
    Ensure the question is challenging and not generic.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
        return JSON.parse(cleanText);
    } catch (error) {
        console.error("AI Task Generation Error (Falling back to mock):", error);
        return mockTask;
    }
};

export const generateBio = async (userData: any) => {
    try {
        const prompt = `Write a professional, engaging LinkedIn-style bio for a freelancer with the following details:
        Name: ${userData.name}
        Role: ${userData.headline}
        Skills: ${userData.skills?.join(", ") || "General"}
        Experience Level: ${userData.experience || "Intermediate"}
        Keep it under 300 characters.`;

        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error("AI Bio Gen Error:", error);
        return "Passionate professional ready to deliver high-quality work.";
    }
};

export const generateJobDescription = async (title: string, keywords: string) => {
    try {
        const prompt = `Write a detailed job description for a "${title}". 
        Keywords to include: ${keywords}.
        Include: Responsibilities, Requirements, and a catchy introduction.
        Format as Markdown.`;

        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error("AI Job Desc Error:", error);
        throw new Error("Failed to generate description");
    }
};

export const evaluateSubmission = async (question: string, answer: string) => {
    try {
        const prompt = `Evaluate the following answer to the technical question.
        Question: "${question}"
        User Answer: "${answer}"
        
        Respond with a JSON object:
        {
            "score": 0-100,
            "feedback": "Short feedback explaining the score",
            "passed": true/false (Pass if score >= 70)
        }`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
        return JSON.parse(cleanText);
    } catch (error) {
        console.error("AI Evaluation Error:", error);
        // Fallback or manual review trigger
        return { score: 0, feedback: "Error evaluating. Flagged for manual review.", passed: false };
    }
}
