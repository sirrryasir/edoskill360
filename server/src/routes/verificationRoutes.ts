import express from "express";
import { protect } from "../middleware/authMiddleware";
import {
    getVerificationStatus,
    requestIdentityVerification,
    requestReferenceVerification,
    finalizeVerification,
    generateAIQuiz,
    generateAIInterview,
    submitInterview
} from "../controllers/verificationController";

const router = express.Router();

// @route   GET /api/verification/status
// @desc    Get current user verification status
// @access  Private
// @ts-ignore
router.get("/status", protect, getVerificationStatus);

// @route   POST /api/verification/identity
// @desc    Request/Update Identity Verification
// @access  Private
// @ts-ignore
router.post("/identity", protect, requestIdentityVerification);

// @route   POST /api/verification/references
// @desc    Request Reference Verification
// @access  Private
// @ts-ignore
router.post("/references", protect, requestReferenceVerification);

// @route   POST /api/verification/finalize
// @desc    Finalize Verification (Step 4)
// @access  Private
// @ts-ignore
router.post("/finalize", protect, finalizeVerification);

// @route   POST /api/verification/ai/quiz
// @desc    Generate Skill Quiz
// @access  Private
// @ts-ignore
router.post("/ai/quiz", protect, generateAIQuiz);

// @route   POST /api/verification/ai/interview
// @desc    Generate Interview Questions
// @access  Private
// @ts-ignore
router.post("/ai/interview", protect, generateAIInterview);

// @route   POST /api/verification/interview/submit
// @desc    Submit Interview Answers
// @access  Private
// @ts-ignore
router.post("/interview/submit", protect, submitInterview);

export default router;
