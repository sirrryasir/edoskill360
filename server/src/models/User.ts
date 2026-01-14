import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: "talent" | "employer" | "admin" | "agent";
  headline?: string;
  bio?: string;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
  // Verification Fields
  trustScore: number;
  trustScoreBreakdown: {
    identity: number; // Max 20
    skills: number;   // Max 40
    interview: number; // Max 20
    references: number; // Max 20
  };
  verificationStage:
  | "STAGE_0_UNVERIFIED"
  | "STAGE_1_PROFILE_COMPLETED"
  | "STAGE_2_SKILLS_SUBMITTED"
  | "STAGE_3_INTERVIEW_COMPLETED"
  | "STAGE_4_REFERENCES_PENDING"
  | "STAGE_5_VERIFIED"
  | "REJECTED";
  identityProof?: string;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["talent", "employer", "admin", "agent"],
      default: "talent",
    },
    headline: { type: String },
    bio: { type: String },
    location: { type: String },
    // Verification Fields
    trustScore: { type: Number, default: 0 },
    trustScoreBreakdown: {
      identity: { type: Number, default: 0 },
      skills: { type: Number, default: 0 },
      interview: { type: Number, default: 0 },
      references: { type: Number, default: 0 },
    },
    verificationStage: {
      type: String,
      enum: [
        "STAGE_0_UNVERIFIED",
        "STAGE_1_PROFILE_COMPLETED",
        "STAGE_2_SKILLS_SUBMITTED",
        "STAGE_3_INTERVIEW_COMPLETED",
        "STAGE_4_REFERENCES_PENDING",
        "STAGE_5_VERIFIED",
        "REJECTED",
      ],
      default: "STAGE_0_UNVERIFIED",
    },
    identityProof: { type: String },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  // @ts-ignore
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model<IUser>("User", UserSchema);
