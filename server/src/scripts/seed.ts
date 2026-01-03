import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User";
import Skill from "../models/Skill";
import Task from "../models/Task";
import Job from "../models/Job";
import Feedback from "../models/Feedback";
import TaskResult from "../models/TaskResult";
import UserSkill from "../models/UserSkill";

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
    console.log("------------------------------------------");
    console.log("🧹 Clearing database...");
    await User.deleteMany({});
    await Skill.deleteMany({});
    await Task.deleteMany({});
    await Job.deleteMany({});
    await Feedback.deleteMany({});
    await TaskResult.deleteMany({});
    await UserSkill.deleteMany({});
    console.log("✅ Database cleared.");

    console.log("------------------------------------------");
    console.log("🌱 Seeding Skills...");
    const skills = await Skill.create([
      { name: "JavaScript", category: "Development" }, // 0
      { name: "React", category: "Development" }, // 1
      { name: "Node.js", category: "Development" }, // 2
      { name: "TypeScript", category: "Development" }, // 3
      { name: "Python", category: "Data Science" }, // 4
      { name: "Figma", category: "Design" }, // 5
      { name: "UI/UX Design", category: "Design" }, // 6
      { name: "Digital Marketing", category: "Marketing" }, // 7
      { name: "SEO Optimization", category: "Marketing" }, // 8
      { name: "Data Analysis", category: "Data Science" }, // 9
    ]);
    console.log(`✅ Seeded ${skills.length} skills.`);

    console.log("------------------------------------------");
    console.log("👤 Seeding Users...");

    // 1. Admin
    const admin = await User.create({
      name: "Admin User",
      email: "admin@edoskill360.com",
      password: "password123",
      role: "admin",
      headline: "System Administrator",
    });

    // 2. Employers
    const employers = await User.create([
      {
        name: "TechFlow Solutions",
        email: "techflow@example.com",
        password: "password123",
        role: "employer",
        headline: "Innovative SaaS Company",
        bio: "We build tools that help remote teams collaborate better.",
        location: "Mogadishu, Somalia",
      },
      {
        name: "Creative Minds Agency",
        email: "creative@example.com",
        password: "password123",
        role: "employer",
        headline: "Digital Design Studio",
        bio: "We create stunning brands and digital experiences.",
        location: "Hargeisa, Somaliland",
      },
      {
        name: "Global Tech Corp",
        email: "global@example.com",
        password: "password123",
        role: "employer",
        headline: "Multinational Technology Firm",
        location: "Nairobi, Kenya", // Regional context
      },
    ]);

    // 3. Workers (Freelancers)
    const workers = await User.create([
      {
        name: "Ahmed Hassan",
        email: "ahmed@example.com",
        password: "password123",
        role: "worker",
        headline: "Senior Full Stack Developer",
        bio: "Passionate developer with 5+ years of experience in MERN stack and Next.js. I love building scalable web applications.",
        location: "Hargeisa, Somaliland",
      },
      {
        name: "Sarah Ali",
        email: "sarah@example.com",
        password: "password123",
        role: "worker",
        headline: "UI/UX Designer & Brand Strategist",
        bio: "I craft user-friendly interfaces and memorable brand identities. Expert in Figma and Adobe Suite.",
        location: "Mogadishu, Somalia",
      },
      {
        name: "Mohamed Abdi",
        email: "mohamed@example.com",
        password: "password123",
        role: "worker",
        headline: "Data Scientist & Python Expert",
        bio: "Turning data into actionable insights. Proficient in Python, Pandas, and Machine Learning.",
        location: "Garowe, Puntland",
      },
      {
        name: "Khadra Yusuf",
        email: "khadra@example.com",
        password: "password123",
        role: "worker",
        headline: "Digital Marketing Specialist",
        bio: "Helping brands grow their online presence through SEO and social media strategies.",
        location: "Hargeisa, Somaliland",
      },
    ]);
    console.log(
      `✅ Seeded ${employers.length} employers and ${workers.length} workers.`
    );

    console.log("------------------------------------------");
    console.log("🏅 Seeding User Skills (Verifications)...");

    // Ahmed (Worker 0) - Dev Skills
    await UserSkill.create([
      {
        userId: workers[0]._id,
        skillId: skills[0]._id,
        score: 92,
        verified: true,
      }, // JS
      {
        userId: workers[0]._id,
        skillId: skills[1]._id,
        score: 88,
        verified: true,
      }, // React
      {
        userId: workers[0]._id,
        skillId: skills[2]._id,
        score: 85,
        verified: true,
      }, // Node
      {
        userId: workers[0]._id,
        skillId: skills[3]._id,
        score: 75,
        verified: false,
      }, // TypeScript
    ]);

    // Sarah (Worker 1) - Design Skills
    await UserSkill.create([
      {
        userId: workers[1]._id,
        skillId: skills[5]._id,
        score: 95,
        verified: true,
      }, // Figma
      {
        userId: workers[1]._id,
        skillId: skills[6]._id,
        score: 90,
        verified: true,
      }, // UI/UX
    ]);

    // Mohamed (Worker 2) - Data Skills
    await UserSkill.create([
      {
        userId: workers[2]._id,
        skillId: skills[4]._id,
        score: 94,
        verified: true,
      }, // Python
      {
        userId: workers[2]._id,
        skillId: skills[9]._id,
        score: 89,
        verified: true,
      }, // Data Analysis
    ]);

    // Khadra (Worker 3) - Marketing Skills
    await UserSkill.create([
      {
        userId: workers[3]._id,
        skillId: skills[7]._id,
        score: 85,
        verified: true,
      }, // Digital Marketing
    ]);

    console.log("✅ Seeded verified skills for workers.");

    console.log("------------------------------------------");
    console.log("📝 Seeding Tasks (Assessments)...");

    // Create assessments for key skills
    const tasks = await Task.create([
      {
        skillId: skills[1]._id, // React
        title: "React Developer Certification",
        description:
          "Assess your mastery of React hooks, lifecycle methods, and component patterns.",
        difficulty: "medium",
        maxScore: 100,
        timeLimit: 45,
        questions: [
          {
            question:
              "Which hook is used to perform side effects in functional components?",
            options: ["useState", "useEffect", "useContext", "useReducer"],
            correctOption: 1,
          },
          {
            question: "What is the purpose of the key prop in lists?",
            options: [
              "Uniquely identify elements",
              "Style specific elements",
              "Bind event handlers",
              "None of the above",
            ],
            correctOption: 0,
          },
        ],
      },
      {
        skillId: skills[5]._id, // Figma
        title: "Figma Design Expertise",
        description:
          "Validate your skills in prototyping, auto-layout, and component systems.",
        difficulty: "hard",
        maxScore: 100,
        timeLimit: 60,
        questions: [
          {
            question: "What is the shortcut to duplicate an element?",
            options: ["Ctrl+C", "Ctrl+D", "Alt+Drag", "Both B and C"],
            correctOption: 3,
          },
        ],
      },
    ]);
    console.log(`✅ Seeded ${tasks.length} assessments.`);

    console.log("------------------------------------------");
    console.log("💼 Seeding Jobs...");

    await Job.create([
      {
        employerId: employers[0]._id, // TechFlow
        title: "Senior Frontend Engineer",
        description:
          "We are looking for a React expert to lead our frontend team. You will be responsible for architecture and mentorship.",
        requirements: ["React", "TypeScript", "Tailwind CSS"],
        salaryRange: "$2000 - $3500 / month",
        location: "Remote",
        type: "full-time",
        status: "open",
      },
      {
        employerId: employers[0]._id, // TechFlow
        title: "Node.js Backend Developer",
        description: "Join our core platform team to build scalable APIs.",
        requirements: ["Node.js", "Express", "MongoDB"],
        salaryRange: "$1500 - $2500 / month",
        location: "Mogadishu, Somalia",
        type: "contract",
        status: "open",
      },
      {
        employerId: employers[1]._id, // Creative Minds
        title: "UI/UX Designer",
        description: "Create beautiful interfaces for our clients.",
        requirements: ["Figma", "Adobe XD", "Prototyping"],
        salaryRange: "$40 - $60 / hour",
        location: "Remote",
        type: "freelance",
        status: "open",
      },
      {
        employerId: employers[2]._id, // Global Tech
        title: "Data Analyst",
        description: "Analyze customer trends and provide actionable insights.",
        requirements: ["Python", "SQL", "Tableau"],
        salaryRange: "$3000 - $4000 / month",
        location: "Nairobi, Kenya",
        type: "full-time",
        status: "closed", // Example closed job
      },
    ]);
    console.log("✅ Seeded jobs.");

    console.log("------------------------------------------");
    console.log("⭐ Seeding Feedback (Reviews)...");

    // Use the first job implicitly for feedback or just generic feedback
    await Feedback.create([
      {
        employerId: employers[0]._id,
        workerId: workers[0]._id, // Ahmed
        rating: 5,
        comment:
          "Ahmed is an exceptional developer. delivered the project ahead of schedule.",
      },
      {
        employerId: employers[1]._id,
        workerId: workers[0]._id, // Ahmed
        rating: 4,
        comment: "Great communication and solid code quality.",
      },
      {
        employerId: employers[1]._id,
        workerId: workers[1]._id, // Sarah
        rating: 5,
        comment: "Sarah's designs are world-class. Highly recommended!",
      },
    ]);
    console.log("✅ Seeded feedback/reviews.");

    console.log("------------------------------------------");
    console.log("🎉 Database Seeded Successfully!");
    process.exit();
  } catch (error) {
    console.error(`❌ Error Seeding Data: ${(error as Error).message}`);
    process.exit(1);
  }
};

seedData();
