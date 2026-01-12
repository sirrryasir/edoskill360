import mongoose, { Schema, Document } from "mongoose";

export interface ITaskResult extends Document {
  taskId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  score: number;
  maxScore: number;
  passed: boolean;
  status: "pending" | "reviewed" | "approved" | "rejected";
  agentId?: mongoose.Types.ObjectId;
  verificationNotes?: string;
  verifiedAt?: Date;
  answers?: {
    questionIndex: number;
    selectedOption: number;
    isCorrect: boolean;
  }[];
  submissionText?: string;
  submissionFile?: string;
  submissionLink?: string;
  generatedQuestion?: string;
  aiFeedback?: string;
  adminFeedback?: string;
  completedAt: Date;
}

const TaskResultSchema: Schema = new Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    score: { type: Number, default: 0 }, // Can be 0 if pending manual review
    maxScore: { type: Number, required: true },
    passed: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["pending", "reviewed", "approved", "rejected"],
      default: "reviewed" // Default reviewed for auto-quizzes, pending for manual
    },
    // Verification details
    agentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    verificationNotes: { type: String },
    verifiedAt: { type: Date },

    // Quiz Answers
    answers: [
      {
        questionIndex: { type: Number },
        selectedOption: { type: Number },
        isCorrect: { type: Boolean },
      },
    ],
    // Proof Submissions
    submissionText: { type: String },
    submissionFile: { type: String }, // URL
    submissionLink: { type: String },

    // AI Assessment Fields
    generatedQuestion: { type: String },
    aiFeedback: { type: String },

    adminFeedback: { type: String },
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<ITaskResult>("TaskResult", TaskResultSchema);
