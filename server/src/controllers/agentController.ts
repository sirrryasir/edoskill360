import { Request, Response } from "express";
import Verification from "../models/Verification";
import TaskResult from "../models/TaskResult";
import User from "../models/User";

// @desc    Get all pending verification requests (Identity, References, Skills)
// @route   GET /api/agent/pending
// @access  Private/agent
export const getPendingRequests = async (req: Request, res: Response) => {
    try {
        // 1. Pending Verifications (Identity, Experience, References)
        const pendingVerifications = await Verification.find({ status: "pending" })
            .populate("userId", "name email identityProof")
            .sort({ createdAt: -1 });

        // 2. Pending Skill Tasks (Proofs)
        const pendingTasks = await TaskResult.find({ status: "pending" })
            .populate("userId", "name email")
            .populate({
                path: "taskId",
                select: "title submissionType maxScore",
                populate: { path: "skillId", select: "name" }
            })
            .sort({ createdAt: -1 });

        res.json({
            verifications: pendingVerifications,
            tasks: pendingTasks,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// @desc    Review a verification request (Approve/Reject)
// @route   POST /api/agent/review-verification
// @access  Private/agent
export const reviewVerification = async (req: Request, res: Response) => {
    try {
        const { id, outcome, notes } = req.body; // id = Verification ID, outcome = "approved" | "rejected"
        // @ts-ignore
        const agentId = req.user._id;

        const verification = await Verification.findById(id);
        if (!verification) {
            return res.status(404).json({ message: "Verification request not found" });
        }

        if (verification.status !== "pending") {
            return res.status(400).json({ message: "Request already reviewed" });
        }

        // Update Verification Record
        verification.status = outcome;
        verification.agentId = agentId;
        verification.reviewNotes = notes;
        await verification.save();

        // Update User Status based on type
        if (outcome === "approved") {
            const updateField = `verificationStatus.${verification.type === 'reference' ? 'references' : verification.type === 'experience' ? 'experience' : 'identity'}`;
            const updates: any = {
                [updateField]: "verified"
            };

            // Transition Stage Logic
            if (verification.type === 'identity') {
                updates.verificationStage = "IDENTITY_APPROVED";
            } else if (verification.type === 'reference') {
                updates.verificationStage = "REFERENCES_VERIFIED";
            }

            await User.findByIdAndUpdate(verification.userId, updates);
        } else {
            // Rejection Logic
            if (verification.type === 'identity') {
                await User.findByIdAndUpdate(verification.userId, {
                    verificationStage: "IDENTITY_REJECTED"
                });
            }
        }

        res.json({ message: `Verification ${outcome}`, verification });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// @desc    Review a skill task proof
// @route   POST /api/agent/review-task
// @access  Private/agent
export const reviewTask = async (req: Request, res: Response) => {
    try {
        const { id, outcome, score, notes } = req.body; // id = TaskResult ID
        // @ts-ignore
        const agentId = req.user._id;

        const result = await TaskResult.findById(id);
        if (!result) {
            return res.status(404).json({ message: "Task result not found" });
        }

        if (result.status !== "pending") {
            return res.status(400).json({ message: "Task already reviewed" });
        }

        // Update TaskResult
        result.status = outcome; // approved / rejected
        result.agentId = agentId;
        result.verificationNotes = notes;
        result.verifiedAt = new Date();

        if (outcome === "approved") {
            result.score = score || result.maxScore;
            result.passed = true;

            // Update UserSkill (Trigger aggregation)
            const Task = (await import("../models/Task")).default;
            const task = await Task.findById(result.taskId);

            if (task) {
                const UserSkill = (await import("../models/UserSkill")).default;
                await UserSkill.findOneAndUpdate(
                    { userId: result.userId, skillId: task.skillId },
                    {
                        verified: true,
                        score: 100 // Or the assigned score normalized
                    },
                    { upsert: true }
                );

                // Also update User global status for skills to partial/verified
                await User.findByIdAndUpdate(result.userId, {
                    "verificationStatus.skills": "verified",
                    verificationStage: "SKILLS_EVALUATED"
                });
            }
        } else {
            result.passed = false;
            result.score = 0;
        }

        await result.save();

        res.json({ message: `Task ${outcome}`, result });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
