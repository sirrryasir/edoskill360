import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  skillId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  submissionType: "quiz" | "file" | "text" | "link";
  type: "static" | "ai-generated";
  instructions?: string;
  questions?: {
    question: string;
    options: string[];
    correctOption: number; // Index of the correct option
  }[];
  maxScore: number;
  timeLimit?: number; // Minutes
  createdAt: Date;
}

const TaskSchema: Schema = new Schema(
  {
    skillId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },
    // New fields for Proof-Based Tasks
    submissionType: {
      type: String,
      enum: ["quiz", "file", "text", "link"],
      default: "quiz",
    },
    type: {
      type: String,
      enum: ["static", "ai-generated"],
      default: "static",
    },
    instructions: { type: String }, // For file/text/link tasks

    questions: [
      {
        question: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctOption: { type: Number, required: true },
      },
    ],
    maxScore: { type: Number, default: 100 },
    timeLimit: { type: Number, default: 30 },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>("Task", TaskSchema);
