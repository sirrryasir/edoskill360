import type { Request, Response } from "express";
import mongoose from "mongoose";
import Task from "../models/Task";
import Skill from "../models/Skill";
import TaskResult from "../models/TaskResult";
import UserSkill from "../models/UserSkill";
import { generateSkillQuiz, evaluateSubmission } from "../services/aiService";

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private/Admin
export const createTask = async (req: Request, res: Response) => {
  try {
    const {
      skillId,
      title,
      description,
      difficulty,
      questions,
      maxScore,
      timeLimit,
    } = req.body;

    const skill = await Skill.findById(skillId);
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    const task = await Task.create({
      skillId,
      title,
      description,
      difficulty,
      questions,
      maxScore,
      timeLimit,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private/Admin
export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({}).populate("skillId", "name category");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// @desc    Get task by ID
// @route   GET /api/tasks/:id
// @access  Private/Talent
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "skillId",
      "name category"
    );
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// @desc    Get task by Skill ID
// @route   GET /api/tasks/skill/:skillId
// @access  Private/Talent
export const getTaskBySkillId = async (req: Request, res: Response) => {
  try {
    const task = await Task.findOne({ skillId: req.params.skillId }).select(
      "-questions.correctOption"
    ); // Hide answers
    if (task) {
      res.json(task);
    } else {
      res
        .status(404)
        .json({ message: "No assessment available for this skill" });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private/Admin
export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);

    if (task) {
      task.title = req.body.title || task.title;
      task.description = req.body.description || task.description;
      task.questions = req.body.questions || task.questions;
      task.maxScore = req.body.maxScore || task.maxScore;
      task.timeLimit = req.body.timeLimit || task.timeLimit;
      task.difficulty = req.body.difficulty || task.difficulty;

      const updatedTask = await task.save();
      res.json(updatedTask);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private/Admin
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);

    if (task) {
      await task.deleteOne();
      res.json({ message: "Task removed" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const submitTask = async (req: any, res: Response) => {
  try {
    const { answers, submissionText, submissionFile, submissionLink } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    let score = 0;
    let passed = false;
    let status = "pending";
    let gradedAnswers = [];

    // Handle Quiz Submission
    if (task.submissionType === "quiz") {
      if (!answers) return res.status(400).json({ message: "Answers are required for quiz tasks" });

      let rawScore = 0;
      gradedAnswers = answers.map((ans: any) => {
        const question = task.questions?.find((q, index) => index === ans.questionIndex); // Safe access
        // Fallback if questions are not aligned by index in request? Assuming index alignment.

        // Better: Use index if question array is stable.
        const q = task.questions ? task.questions[ans.questionIndex] : null;

        if (!q) return { ...ans, isCorrect: false };

        const isCorrect = q.correctOption === ans.selectedOption;
        if (isCorrect && task.questions) rawScore += task.maxScore / task.questions.length;
        return { ...ans, isCorrect };
      });

      score = Math.round(rawScore);
      const percentageScore = (score / task.maxScore) * 100;
      passed = percentageScore >= 60;
      status = "reviewed"; // Auto-reviewed
    } else {
      // Handle Proof Submission (Text, File, Link)
      // For MVP, these are manual reviews, so score=0, passed=false, status=pending
      status = "pending";
    }

    // 2. Save TaskResult
    const result = await TaskResult.create({
      taskId: task._id,
      userId: req.user._id,
      score: score,
      maxScore: task.maxScore,
      passed,
      status,
      answers: gradedAnswers,
      submissionText,
      submissionFile,
      submissionLink
    });

    // 3. Update UserSkill Verification Logic
    if (passed && task.skillId) {
      let userSkill = await UserSkill.findOne({
        userId: req.user._id,
        skillId: task.skillId,
      });

      if (userSkill) {
        // Update existing skill
        if (score > userSkill.score) {
          userSkill.score = score;
        }
        userSkill.verified = true;
        await userSkill.save();
      } else {
        // Create new Verified Skill
        await UserSkill.create({
          userId: req.user._id,
          skillId: task.skillId,
          score: score,
          verified: true,
        });
      }
    }

    res.json({
      ...result.toObject(),
      message:
        status === "pending"
          ? "Submission received. Under review."
          : "Task graded.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: (error as Error).message });
  }
};

export const startAssessment = async (req: any, res: Response) => {
  try {
    const task = await Task.findById(req.params.id).populate("skillId");
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.type === "ai-generated") {
      // NOTE: Removed strict API Key check to allow usage of Static Question Bank fallback

      // @ts-ignore
      const skillName = task.skillId?.name || "General Technical";

      try {
        // Use generateSkillQuiz which returns { questions: [], source: "..." }
        const quizResult = await generateSkillQuiz(skillName, task.difficulty);

        // Ensure we store it in a format submitAIAssessment expects
        const generatedParam = {
          questions: quizResult.questions,
          source: quizResult.source
        };

        // Create a pending result to track this specific instance
        const result = await TaskResult.create({
          taskId: task._id,
          userId: req.user._id,
          maxScore: task.maxScore,
          passed: false,
          status: 'pending',
          generatedQuestion: JSON.stringify(generatedParam),
          completedAt: new Date() // Temporary, will update on submit
        });

        return res.json({
          taskId: task._id,
          resultId: result._id,
          generatedQuestion: generatedParam,
          type: "ai-generated"
        });
      } catch (aiGenError) {
        console.error("AI Generation Failed:", aiGenError);
        return res.status(500).json({
          message: "Failed to generate AI assessment. Please try again later.",
          debug: (aiGenError as Error).message
        });
      }
    } else {
      // Static Task - just return title/questions (hidden answers)
      return res.json({
        taskId: task._id,
        questions: task.questions?.map(q => ({
          question: q.question,
          options: q.options
        })),
        type: "static"
      });
    }
  } catch (error) {
    console.error("Critical Start Assessment Error:", error);
    res.status(500).json({ message: (error as Error).message });
  }
};

export const submitAIAssessment = async (req: any, res: Response) => {
  try {
    const { resultId, answer, answers } = req.body; // Accept 'answers' array if provided
    const result = await TaskResult.findById(resultId);

    if (!result) return res.status(404).json({ message: "Result session not found" });
    if (result.userId.toString() !== req.user._id.toString()) return res.status(401).json({ message: "Unauthorized" });
    if (result.status !== "pending") return res.status(400).json({ message: "Already submitted" });

    // Parse generated data
    const genData = JSON.parse(result.generatedQuestion || "{}");
    const questions = genData.questions || [genData]; // Handle both array and single object (legacy)

    let totalScore = 0;
    let combinedFeedback = "";
    let allPassed = true;

    // Handle multiple answers (new flow) or single answer (legacy flow)
    const userAnswers = answers || [answer];

    for (let i = 0; i < questions.length; i++) {
      const qText = questions[i].question || "Unknown Question";
      const userAns = userAnswers[i] || "";

      const evaluation = await evaluateSubmission(qText, userAns);

      totalScore += evaluation.score;
      combinedFeedback += `Q${i + 1}: ${evaluation.feedback} `;
      if (!evaluation.passed) allPassed = false;
    }

    // Average Score
    const finalScore = Math.round(totalScore / questions.length);
    const finalPassed = finalScore >= 60; // Overall pass threshold

    // Update Result
    result.score = finalScore;
    result.aiFeedback = combinedFeedback.trim();
    result.passed = finalPassed;
    result.status = finalPassed ? "approved" : "rejected";
    result.completedAt = new Date();
    // @ts-ignore
    result.submissionText = JSON.stringify(userAnswers); // Store all answers

    await result.save();

    // Update User Skill
    if (finalPassed) {
      const task = await Task.findById(result.taskId);
      if (task && task.skillId) {
        // Update UserSkill logic
        let userSkill = await UserSkill.findOne({ userId: req.user._id, skillId: task.skillId });
        if (userSkill) {
          if (finalScore > userSkill.score) userSkill.score = finalScore;
          userSkill.verified = true;
          await userSkill.save();
        } else {
          await UserSkill.create({ userId: req.user._id, skillId: task.skillId, score: finalScore, verified: true });
        }

        // IMPORTANT: Update Global User Verification Stage
        // Check if ALL claimed skills are verified
        const allUserSkills = await UserSkill.find({ userId: req.user._id });
        const allVerified = allUserSkills.every(s => s.verified);

        if (allVerified) {
          const User = (await import("../models/User")).default;
          await User.findByIdAndUpdate(req.user._id, {
            "verificationStatus.skills": "verified",
            verificationStage: "SKILLS_EVALUATED"
          });
        }
      }
    }

    res.json({
      score: finalScore,
      passed: finalPassed,
      feedback: result.aiFeedback
    });

  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
