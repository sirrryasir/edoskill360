import type { Request, Response } from "express";
import Application from "../models/Application";
import Job from "../models/Job";

// @desc    Apply for a job
// @route   POST /api/applications
// @access  Private/Worker
export const applyForJob = async (req: any, res: Response) => {
    try {
        const { jobId, coverLetter, resumeLink } = req.body;

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        if (job.status !== "open") {
            return res.status(400).json({ message: "Job is no longer accepting applications" });
        }

        // Check availability
        // @ts-ignore
        const existing = await Application.findOne({ jobId, workerId: req.user._id });
        if (existing) {
            return res.status(400).json({ message: "You have already applied to this job" });
        }

        const application = await Application.create({
            jobId,
            // @ts-ignore
            workerId: req.user._id,
            coverLetter,
            resumeLink
        });

        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

// @desc    Get applications for a specific job
// @route   GET /api/applications/job/:jobId
// @access  Private/Employer
export const getJobApplications = async (req: any, res: Response) => {
    try {
        const job = await Job.findById(req.params.jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        // Ensure employer owns the job
        if (job.employerId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const applications = await Application.find({ jobId: req.params.jobId })
            .populate("workerId", "name email headline location verificationStatus");

        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

// @desc    Get my applications
// @route   GET /api/applications/my
// @access  Private/Worker
export const getMyApplications = async (req: any, res: Response) => {
    try {
        const applications = await Application.find({ workerId: req.user._id })
            .populate("jobId", "title companyName location");

        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
