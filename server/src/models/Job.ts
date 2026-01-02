import mongoose, { Schema, Document } from "mongoose";

export interface IJob extends Document {
  employerId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  requirements: string[]; // List of skills required
  salaryRange?: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "freelance";
  status: "open" | "closed";
  createdAt: Date;
}

const JobSchema: Schema = new Schema(
  {
    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: [{ type: String }],
    salaryRange: { type: String },
    location: { type: String, required: true },
    type: {
      type: String,
      enum: ["full-time", "part-time", "contract", "freelance"],
      default: "full-time",
    },
    status: { type: String, enum: ["open", "closed"], default: "open" },
  },
  { timestamps: true }
);

export default mongoose.model<IJob>("Job", JobSchema);
