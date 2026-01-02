import type { Request, Response } from "express";
import Job from "../models/Job";

// @desc    Create a new job
// @route   POST /api/jobs
// @access  Private/Employer
export const createJob = async (req: any, res: Response) => {
  try {
    const { title, description, requirements, salaryRange, location, type } =
      req.body;

    const job = await Job.create({
      employerId: req.user._id,
      title,
      description,
      requirements,
      salaryRange,
      location,
      type,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
export const getJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await Job.find({ status: "open" }).populate(
      "employerId",
      "name companyName"
    );
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// @desc    Get employer's jobs
// @route   GET /api/jobs/my-jobs
// @access  Private/Employer
export const getMyJobs = async (req: any, res: Response) => {
  try {
    const jobs = await Job.find({ employerId: req.user._id });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
