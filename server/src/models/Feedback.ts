import mongoose, { Schema, Document } from "mongoose";

export interface IFeedback extends Document {
  employerId: mongoose.Types.ObjectId;
  workerId: mongoose.Types.ObjectId;
  jobId?: mongoose.Types.ObjectId; // Optional link to a specific job
  rating: number; // 1-5
  comment?: string;
  createdAt: Date;
}

const FeedbackSchema: Schema = new Schema(
  {
    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    workerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IFeedback>("Feedback", FeedbackSchema);
