import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import skillRoutes from "./routes/skillRoutes";
import taskRoutes from "./routes/taskRoutes";
import jobRoutes from "./routes/jobRoutes";
import verificationRoutes from "./routes/verificationRoutes";
import agentRoutes from "./routes/agentRoutes";
import applicationRoutes from "./routes/applicationRoutes";
import { protect } from "./middleware/authMiddleware";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://edoskill360.vercel.app"],
    credentials: true, // Allow cookies
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/verification", verificationRoutes);
app.use("/api/agent", agentRoutes);
app.use("/api/applications", applicationRoutes);

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

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error(`Error starting server: ${error}`);
    process.exit(1);
  }
};

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

export default app;
