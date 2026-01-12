import express from "express";
import {
    applyForJob,
    getJobApplications,
    getMyApplications
} from "../controllers/applicationController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", protect, applyForJob);
router.get("/my", protect, getMyApplications);
router.get("/job/:jobId", protect, getJobApplications);

export default router;
