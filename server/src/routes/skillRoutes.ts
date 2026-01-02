import express from "express";
import {
  getSkills,
  getUserSkills,
  addUserSkill,
} from "../controllers/skillController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", getSkills);
router.get("/my-skills", protect, getUserSkills);
router.post("/my-skills", protect, addUserSkill);

export default router;
