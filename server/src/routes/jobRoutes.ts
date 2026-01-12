import express from "express";
import {
  createJob,
  getJobs,
  getMyJobs,
  getJobById,
} from "../controllers/jobController";
import { protect, employer } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").get(getJobs).post(protect, employer, createJob);

// Specific routes first
router.route("/my-jobs").get(protect, getMyJobs);

// Dynamic routes last
router.route("/:id").get(getJobById);
export default router;
