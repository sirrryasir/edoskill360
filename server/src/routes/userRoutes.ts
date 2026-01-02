import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  getWorkers,
} from "../controllers/userController";
import {
  registerUser,
  loginUser as authUser,
  logoutUser,
} from "../controllers/authController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.get("/workers", protect, getWorkers);

export default router;
