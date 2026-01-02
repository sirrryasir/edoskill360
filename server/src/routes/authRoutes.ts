import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/authController";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
