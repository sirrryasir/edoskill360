import type { Request, Response } from "express";
import User from "../models/User";

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

// @desc    Get all workers
// @route   GET /api/users/workers
// @access  Private/Employer
export const getWorkers = async (req: Request, res: Response) => {
  try {
    const workers = await User.find({ role: "worker" }).select("-password");
    // In a real app, we would aggregate with UserSkill to filter by skills here or on frontend
    // For MVP, we fetch all workers and let frontend/other calls handle skill display
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
