import express from "express";
import { protect } from "../middleware/authMiddleware";
import {
    getVerificationStatus,
    requestIdentityVerification,
    requestReferenceVerification,
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

// @route   POST /api/verification/reference
// @desc    Request Reference Verification
// @access  Private
// @ts-ignore
router.post("/reference", protect, requestReferenceVerification);

export default router;
