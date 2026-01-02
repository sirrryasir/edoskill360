import mongoose, { Schema, Document } from "mongoose";

export interface ITaskResult extends Document {
  taskId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  score: number;
  maxScore: number;
  passed: boolean;
  answers: {
    questionIndex: number;
    selectedOption: number;
    isCorrect: boolean;
  }[];
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
    score: { type: Number, required: true },
    maxScore: { type: Number, required: true },
    passed: { type: Boolean, default: false },
    answers: [
      {
        questionIndex: { type: Number, required: true },
        selectedOption: { type: Number, required: true },
        isCorrect: { type: Boolean, required: true },
      },
    ],
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<ITaskResult>("TaskResult", TaskResultSchema);
