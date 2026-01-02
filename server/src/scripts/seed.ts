import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User";
import Skill from "../models/Skill";
import Task from "../models/Task";
import Job from "../models/Job";
import Feedback from "../models/Feedback";
import TaskResult from "../models/TaskResult";

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

const seedData = async () => {
  await connectDB();

  try {
    console.log("Clearing database...");
    await User.deleteMany({});
    await Skill.deleteMany({});
    await Task.deleteMany({});
    await Job.deleteMany({});
    await Feedback.deleteMany({});
    await TaskResult.deleteMany({});

    console.log("Seeding Users...");
    const users = await User.create([
      {
        name: "Admin User",
        email: "admin@edoskill360.com",
        password: "password123", // Will be hashed by pre-save hook
        role: "admin",
        headline: "System Administrator",
      },
      {
        name: "John Doe",
        email: "worker@example.com",
        password: "password123",
        role: "worker",
        headline: "Full Stack Developer",
        bio: "Experienced developer with a focus on MERN stack.",
        location: "Hargeisa, Somaliland",
      },
      {
        name: "Tech Solutions Inc.",
        email: "employer@example.com",
        password: "password123",
        role: "employer",
        headline: "Leading Tech Company",
        location: "Mogadishu, Somalia",
      },
    ]);

    console.log("Seeding Skills...");
    // Create Skills
    const skills = await Skill.create([
      { name: "JavaScript", category: "Development" },
      { name: "React", category: "Development" },
      { name: "Node.js", category: "Development" },
      { name: "Python", category: "Data Science" },
      { name: "Design Principles", category: "Design" },
    ]);

    console.log("Skills Imported!");

    console.log("Seeding Tasks...");
    await Task.create([
      {
        skillId: skills[0]._id, // JavaScript
        title: "JavaScript Basics Assessment",
        description: "Test your knowledge of JS fundamentals.",
        difficulty: "easy",
        maxScore: 100,
        timeLimit: 30,
        questions: [
          {
            question: "What is the output of typeof null?",
            options: ["object", "null", "undefined", "number"],
            correctOption: 0,
          },
          {
            question: "Which keyword is used to declare a constant?",
            options: ["let", "var", "const", "fixed"],
            correctOption: 2,
          },
        ],
      },
      {
        skillId: skills[1]._id, // React
        title: "React Fundamentals",
        description: "Basic concepts of components and state.",
        difficulty: "easy",
        maxScore: 100,
        timeLimit: 45,
        questions: [
          {
            question: "What hook is used for side effects?",
            options: ["useState", "useEffect", "useContext", "useReducer"],
            correctOption: 1,
          },
        ],
      },
    ]);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

seedData();
