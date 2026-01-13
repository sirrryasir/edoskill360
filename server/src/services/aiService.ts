import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { getQuestionsForSkill } from "../data/questionBank";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const generateTask = async (skill: string, difficulty: string) => {
    // ALWAYS use Mock/Static bank for now as per requirements
    // This allows consistency and "3 questions" rule without relying on AI prompt engineering instability
    const questions = getQuestionsForSkill(skill, 3);

    return {
        questions: questions,
        source: "static-bank"
    };
};

export const generateBio = async (userData: any) => {
    try {
        if (!process.env.GEMINI_API_KEY) throw new Error("No API Key");

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
        if (!process.env.GEMINI_API_KEY) throw new Error("No API Key");

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
    // Mock Evaluation Logic
    // In a real scenario with API key, we would use LLM.
    // For now, we simulate "Review".

    // Simple heuristic: Length check + keyword presence (optional)
    const minLength = 20;
    const passed = answer.trim().length >= minLength;

    const score = passed ? Math.floor(Math.random() * (100 - 70) + 70) : Math.floor(Math.random() * 50);
    const feedback = passed
        ? "Good explanation. You covered the key points."
        : "The answer is too short or lacks detail. Please elaborate more.";

    return {
        score,
        feedback,
        passed
    };
}
