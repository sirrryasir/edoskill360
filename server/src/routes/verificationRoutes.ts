import express from "express";
import { protect } from "../middleware/authMiddleware";
import {
    getVerificationStatus,
    requestIdentityVerification,
    requestReferenceVerification,
    finalizeVerification,
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

export default router;
