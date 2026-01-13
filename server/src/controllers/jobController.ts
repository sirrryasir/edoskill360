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

// @desc    Get all jobs with filters
// @route   GET /api/jobs
// @access  Public
export const getJobs = async (req: Request, res: Response) => {
  try {
    const { search, type, location } = req.query;

    const query: any = { status: "open" };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { requirements: { $regex: search, $options: "i" } },
      ];
    }

    if (type) {
      // Handle comma separated if needed, but for now exact match or single
      query.type = type;
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    const jobs = await Job.find(query).populate(
      "employerId",
      "name companyName"
    ).sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// @desc    Get job by ID
// @route   GET /api/jobs/:id
// @access  Public
export const getJobById = async (req: Request, res: Response) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "employerId",
      "name companyName bio location"
    );

    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ message: "Job not found" });
    }
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
