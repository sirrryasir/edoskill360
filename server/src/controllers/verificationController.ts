import { Request, Response } from "express";
import User from "../models/User";
import Verification from "../models/Verification";

// Get user verification status and calculate Trust Score
export const getVerificationStatus = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const user = await User.findById(req.user._id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Calculate Trust Score
        // Formula: Identity (20%) + Skills (40%) + Experience (25%) + References (15%)
        let score = 0;
        const breakdown = {
            identity: 0,
            skills: 0,
            experience: 0,
            references: 0
        };

        if (user.verificationStatus.identity === "verified") {
            score += 20;
            breakdown.identity = 20;
        }

        if (user.verificationStatus.skills === "verified") {
            score += 40;
            breakdown.skills = 40;
        } else if (user.verificationStatus.skills === "partial") {
            score += 20; // Partial credit for skills
            breakdown.skills = 20;
        }

        if (user.verificationStatus.experience === "verified") {
            score += 25;
            breakdown.experience = 25;
        } else if (user.verificationStatus.experience === "partial") {
            score += 10;
            breakdown.experience = 10;
        }

        if (user.verificationStatus.references === "verified") {
            score += 15;
            breakdown.references = 15;
        }

        // Update user if score changed
        if (user.trustScore !== score) {
            user.trustScore = score;
            await user.save();
        }

        res.json({
            trustScore: score,
            scoreBreakdown: breakdown,
            verificationStatus: user.verificationStatus,
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
            data: { identityProof }
        });

        // Update User Status
        await User.findByIdAndUpdate(userId, {
            "verificationStatus.identity": "pending",
            "verificationStage": "IDENTITY_SUBMITTED",
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
            data: { name, email, relationship, company }
        });

        // Update User Status (Trigger partial if not already)
        await User.findByIdAndUpdate(userId, {
            "verificationStatus.references": "pending"
        });

        // In a real app, send email here.

        res.status(200).json({ message: "Reference verification email sent (simulated)" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
