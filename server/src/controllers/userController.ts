import type { Request, Response } from "express";
import User from "../models/User";
import UserSkill from "../models/UserSkill";
import Feedback from "../models/Feedback";

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req: Request, res: Response) => {
  // @ts-ignore
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      headline: user.headline,
      bio: user.bio,
      location: user.location,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// @desc    Get public user profile by ID (for Profile Page)
// @route   GET /api/users/:id
// @access  Public
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (user) {
      // Fetch User Skills
      const skills = await UserSkill.find({ userId: user._id }).populate(
        "skillId",
        "name category"
      );

      // Fetch Feedback
      const reviews = await Feedback.find({ workerId: user._id }).populate(
        "employerId",
        "name"
      );

      res.json({
        ...user.toObject(),
        skills,
        reviews,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// @desc    Get all workers with filters
// @route   GET /api/users/workers
// @access  Private/Employer (Public in this context for "Find Talent")
export const getWorkers = async (req: Request, res: Response) => {
  try {
    const { search, verified } = req.query;

    const query: any = { role: "worker" };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { headline: { $regex: search, $options: "i" } },
        { "skills.name": { $regex: search, $options: "i" } }, // Basic join check attempt (won't work directly on User model without aggregate, keeping simple for now)
      ];
      // Note: For searching skills, we'd ideally aggregate. For MVP, we search name/headline.
    }

    if (verified === "true") {
      query.verificationStage = "VERIFIED";
    }

    const workers = await User.find(query).select("-password").sort({
      trustScore: -1, // Show high trust first
      verificationStage: -1 // Show verified first (lexicographically V > U, mostly works)
    });

    // In a real app, populate skills here.
    res.json(workers);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req: Request, res: Response) => {
  // @ts-ignore
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.headline = req.body.headline || user.headline;
    user.bio = req.body.bio || user.bio;
    user.location = req.body.location || user.location;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      headline: updatedUser.headline,
      bio: updatedUser.bio,
      location: updatedUser.location,
      token: req.headers.authorization?.split(" ")[1], // Return same token
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
