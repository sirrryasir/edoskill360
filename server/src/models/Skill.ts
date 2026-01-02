import mongoose, { Schema, Document } from "mongoose";

export interface ISkill extends Document {
  name: string;
  category?: string; // e.g., 'Development', 'Design'
  createdAt: Date;
}

const SkillSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    category: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<ISkill>("Skill", SkillSchema);
