import mongoose, { Schema, Document } from "mongoose";

export interface IApplication extends Document {
    jobId: mongoose.Schema.Types.ObjectId;
    workerId: mongoose.Schema.Types.ObjectId;
    coverLetter?: string;
    resumeLink?: string; // Optional URL to resume
    status: "pending" | "reviewed" | "accepted" | "rejected";
    createdAt: Date;
}

const ApplicationSchema: Schema = new Schema(
    {
        jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
        workerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        coverLetter: { type: String },
        resumeLink: { type: String },
        status: {
            type: String,
            enum: ["pending", "reviewed", "accepted", "rejected"],
            default: "pending",
        },
    },
    { timestamps: true }
);

// Prevent duplicate applications
ApplicationSchema.index({ jobId: 1, workerId: 1 }, { unique: true });

export default mongoose.model<IApplication>("Application", ApplicationSchema);
