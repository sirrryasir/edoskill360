import mongoose, { Schema, Document } from "mongoose";

export interface IUserSkill extends Document {
  userId: mongoose.Types.ObjectId;
  skillId: mongoose.Types.ObjectId;
  score: number;
  verified: boolean;
  createdAt: Date;
}

const UserSkillSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    skillId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
      required: true,
    },
    score: { type: Number, default: 0 },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Ensure a user can only have a specific skill added once
UserSkillSchema.index({ userId: 1, skillId: 1 }, { unique: true });

export default mongoose.model<IUserSkill>("UserSkill", UserSkillSchema);
