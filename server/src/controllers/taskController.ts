import type { Request, Response } from "express";
import Task from "../models/Task";
import Skill from "../models/Skill";
import TaskResult from "../models/TaskResult";

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
// @access  Private/Worker
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
// @access  Private/Worker
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

// @desc    Submit task answers and calculate score
// @route   POST /api/tasks/:id/submit
// @access  Private/Worker
export const submitTask = async (req: any, res: Response) => {
  try {
    const { answers } = req.body; // [{ questionIndex: 0, selectedOption: 1 }]
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    let score = 0;
    const gradedAnswers = answers.map((ans: any) => {
      const question = task.questions[ans.questionIndex];
      const isCorrect = question.correctOption === ans.selectedOption;
      if (isCorrect) score += task.maxScore / task.questions.length;
      return { ...ans, isCorrect };
    });

    const passed = score >= task.maxScore * 0.7; // 70% passing grade

    const result = await TaskResult.create({
      taskId: task._id,
      userId: req.user._id,
      score: Math.round(score),
      maxScore: task.maxScore,
      passed,
      answers: gradedAnswers,
    });

    // If passed, verify the skill for the user
    if (passed) {
      // Import UserSkill dynamically or at top if not circular
      // For now assuming we can update UserSkill here
      const UserSkill = (await import("../models/UserSkill")).default;

      await UserSkill.findOneAndUpdate(
        { userId: req.user._id, skillId: task.skillId },
        { verified: true, score: Math.round(score) },
        { upsert: true, new: true }
      );
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
