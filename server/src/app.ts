import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import { protect } from "./middleware/authMiddleware";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Example protected route
// @ts-ignore
app.get("/api/protected", protect, (req, res) => {
  // @ts-ignore
  res.json({ message: "This is a protected route", user: req.user });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
