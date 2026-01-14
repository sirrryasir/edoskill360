import { Request, Response } from "express";
import User from "../models/User";
import Verification from "../models/Verification";
import { generateSkillQuiz, generateInterviewQuestions } from "../services/aiService";
import { VerificationService } from "../services/VerificationService";

// Get user verification status and calculate Trust Score
export const getVerificationStatus = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user._id;

        // Use Service to ensure score is up to date based on current stage/status
        const user = await VerificationService.updateTrustScore(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            trustScore: user.trustScore,
            scoreBreakdown: user.trustScoreBreakdown,
            verificationStage: user.verificationStage,
            identityProof: user.identityProof
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Request Identity Verification
export const requestIdentityVerification = async (req: Request, res: Response) => {
    try {
        const { identityProof } = req.body;
        // @ts-ignore
        const userId = req.user._id;

        if (!identityProof) {
            return res.status(400).json({ message: "Identity proof URL required" });
        }

        // Create Verification Record
        await Verification.create({
            userId,
            type: "identity",
            status: "pending",
            stage: "STAGE_2", // Mapping Identity to Stage 2 context or prerequisite for Stage 2
            data: { identityProof }
        });

        // Update User Status
        // We do strictly update verificationStage if they were UNVERIFIED
        await User.findByIdAndUpdate(userId, {
            verificationStage: "STAGE_1_PROFILE_COMPLETED", // Assuming Identity upload completes profile
            identityProof
        });

        res.status(200).json({ message: "Identity verification requested" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Request Reference Verification
export const requestReferenceVerification = async (req: Request, res: Response) => {
    try {
        const { name, email, relationship, company } = req.body;
        // @ts-ignore
        const userId = req.user._id;

        if (!email) {
            return res.status(400).json({ message: "Reference email required" });
        }

        // Create Verification Record
        await Verification.create({
            userId,
            type: "reference",
            status: "pending",
            stage: "STAGE_4",
            data: { name, email, relationship, company }
        });

        // Update User Status
        await User.findByIdAndUpdate(userId, {
            verificationStage: "STAGE_4_REFERENCES_PENDING"
        });

        // SIMULATION: Sending Message
        console.log(`[SIMULATION] 📧 Sending verification request to ${email} (WhatsApp/Email)...`);

        res.status(200).json({ message: "Reference request sent. Pending Agent review." });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Finalize Verification (Step 4 -> Complete)
export const finalizeVerification = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const user = await User.findById(req.user._id);

        if (!user) return res.status(404).json({ message: "User not found" });

        // Update to Final Stage
        user.verificationStage = "STAGE_5_VERIFIED";

        await user.save();

        // Recalculate score via service
        const updatedUser = await VerificationService.updateTrustScore(user.id);

        res.json({ message: "Verification completed successfully!", status: updatedUser?.verificationStage });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Generate AI Quiz
export const generateAIQuiz = async (req: Request, res: Response) => {
    try {
        const { skill, difficulty } = req.body;
        if (!skill) return res.status(400).json({ message: "Skill is required" });

        const result = await generateSkillQuiz(skill, difficulty || "intermediate");
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Failed to generate quiz", error });
    }
};

// Generate AI Interview Questions
export const generateAIInterview = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const profileContext = `
             Name: ${user.name}
             Headline: ${user.headline}
             Bio: ${user.bio}
             Role: ${user.role}
         `;

        const questions = await generateInterviewQuestions(profileContext);
        res.json({ questions });
    } catch (error) {
        res.status(500).json({ message: "Failed to generate check", error });
    }
};

// Submit Interview (Completes Stage 3)
export const submitInterview = async (req: Request, res: Response) => {
    try {
        const { answers } = req.body; // Array of { question, answer }
        // @ts-ignore
        const userId = req.user._id;

        // Save verification record
        await Verification.create({
            userId,
            type: "interview",
            status: "pending", // Agent will review
            stage: "STAGE_3",
            data: { answers }
        });

        // Update Stage
        // We move them to STAGE_3_INTERVIEW_COMPLETED
        // This unlocks points for Skills (40) and Interview (20) in our TrustScore logic? 
        // Logic: passedSkills = [STAGE_3...].includes(stage). Yes.

        await User.findByIdAndUpdate(userId, {
            verificationStage: "STAGE_3_INTERVIEW_COMPLETED"
        });

        // Recalculate Score
        await VerificationService.updateTrustScore(userId);

        res.json({ message: "Interview submitted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
