import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  getTalents,
  getUserById,
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

router.get("/talents", getTalents);
router.route("/:id").get(getUserById);

export default router;
