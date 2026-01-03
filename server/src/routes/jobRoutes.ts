import express from "express";
import {
  createJob,
  getJobs,
  getMyJobs,
  getJobById,
} from "../controllers/jobController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").get(getJobs).post(protect, createJob);

router.route("/:id").get(getJobById);
router.route("/my-jobs").get(protect, getMyJobs);
export default router;
