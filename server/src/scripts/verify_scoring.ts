import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User";
import Task from "../models/Task";
import TaskResult from "../models/TaskResult";
import UserSkill from "../models/UserSkill";
import { submitTask } from "../controllers/taskController";

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/edoskill360"
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

const runVerification = async () => {
  await connectDB();

  try {
    // 1. Setup Data
    // 1. Setup Data
    const worker = await User.findOne({ email: "ahmed@example.com" });
    const task = await Task.findOne({ title: "React Developer Certification" });

    if (!worker || !task) {
      console.error("Worker or Task not found. Run seed first.");
      process.exit(1);
    }

    console.log("--- Setup ---");
    console.log(`Worker: ${worker.name} (${worker._id})`);
    console.log(`Task: ${task.title} (${task._id})`);

    // Clean up previous run
    await TaskResult.deleteMany({ userId: worker._id });
    await UserSkill.deleteMany({ userId: worker._id });
    console.log("Cleaned up previous results and user skills.");

    // 2. Mock Request Helper
    const mockRes = () => {
      const res: any = {};
      res.status = (code: number) => {
        // console.log(`Response Status: ${code}`);
        return res;
      };
      res.json = (data: any) => {
        // console.log("Response JSON:", JSON.stringify(data, null, 2));
        return res;
      };
      return res;
    };

    // 3. Attempt 1
    console.log("\n--- Attempt 1 (Perfect Score) ---");
    const req1 = {
      body: {
        answers: [
          { questionIndex: 0, selectedOption: 1 }, // Correct (useEffect)
          { questionIndex: 1, selectedOption: 0 }, // Correct (Uniquely identify)
        ],
      },
      params: { id: task._id },
      user: { _id: worker._id },
    };

    await submitTask(req1 as any, mockRes() as any);

    // Verify DB State
    let userSkill = await UserSkill.findOne({
      userId: worker._id,
      skillId: task.skillId,
    });
    console.log("UserSkill after Attempt 1:", userSkill?.toObject());

    if (userSkill?.verified === false && userSkill?.score === 100) {
      console.log("✅ PASS: Not verified yet (attempts < 2). Score is 100.");
    } else {
      console.error("❌ FAIL: Unexpected state after Attempt 1.");
    }

    // 4. Attempt 2
    console.log("\n--- Attempt 2 (Perfect Score) ---");
    // Using same request (simulating retake)
    await submitTask(req1 as any, mockRes() as any);

    // Verify DB State
    userSkill = await UserSkill.findOne({
      userId: worker._id,
      skillId: task.skillId,
    });
    console.log("UserSkill after Attempt 2:", userSkill?.toObject());

    if (userSkill?.verified === true && userSkill?.score === 100) {
      console.log("✅ PASS: Verified! (attempts >= 2). Score is 100.");
    } else {
      console.error("❌ FAIL: Unexpected state after Attempt 2.");
    }

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runVerification();
