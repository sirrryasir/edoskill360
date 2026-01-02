import type { Request, Response } from "express";
import Skill from "../models/Skill";
import UserSkill from "../models/UserSkill";

// @desc    Get all available skills
// @route   GET /api/skills
// @access  Public
export const getSkills = async (req: Request, res: Response) => {
  try {
    const skills = await Skill.find({});
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// @desc    Get logged in user's skills
// @route   GET /api/skills/my-skills
// @access  Private
export const getUserSkills = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userSkills = await UserSkill.find({ userId: req.user._id }).populate(
      "skillId",
      "name category"
    );
    res.json(userSkills);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// @desc    Add a skill to user profile
// @route   POST /api/skills/my-skills
// @access  Private
export const addUserSkill = async (req: Request, res: Response) => {
  const { skillId } = req.body;

  try {
    // Check if skill exists
    const skillExists = await Skill.findById(skillId);
    if (!skillExists) {
      return res.status(404).json({ message: "Skill not found" });
    }

    // Check if user already has this skill
    // @ts-ignore
    const userSkillExists = await UserSkill.findOne({
      userId: req.user._id,
      skillId,
    });
    if (userSkillExists) {
      return res.status(400).json({ message: "Skill already added" });
    }

    const userSkill = await UserSkill.create({
      // @ts-ignore
      userId: req.user._id,
      skillId,
      score: 0,
      verified: false,
    });

    const populatedSkill = await userSkill.populate("skillId", "name category");

    res.status(201).json(populatedSkill);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
