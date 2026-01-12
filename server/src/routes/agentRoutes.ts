import express from "express";
import { protect, agent } from "../middleware/authMiddleware"; // Need to ensure 'agent' middleware exists
import {
    getPendingRequests,
    reviewVerification,
    reviewTask,
} from "../controllers/agentController";

const router = express.Router();

// Middleware to protect routes for agents only
// For MVP, we might need to add 'agent' to authMiddleware if not present.
// Assuming protect checks for valid token, we need a role check.

// @route   GET /api/agent/pending
// @desc    Get all pending requests
// @access  Private/agent
// @ts-ignore
// @ts-ignore
router.get("/pending", protect, agent, getPendingRequests);

// @route   POST /api/agent/review-verification
// @desc    Review verification request
// @access  Private/agent
// @ts-ignore
router.post("/review-verification", protect, agent, reviewVerification);

// @route   POST /api/agent/review-task
// @desc    Review task proof
// @access  Private/agent
// @ts-ignore
router.post("/review-task", protect, agent, reviewTask);

export default router;
