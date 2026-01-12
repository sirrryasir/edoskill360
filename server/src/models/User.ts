import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: "worker" | "employer" | "admin" | "agent";
  headline?: string;
  bio?: string;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
  // Verification Fields
  trustScore: number;
  verificationStatus: {
    identity: "unverified" | "pending" | "verified";
    skills: "unverified" | "partial" | "verified";
    experience: "unverified" | "partial" | "verified";
    references: "unverified" | "partial" | "verified";
  };
  identityProof?: string; // URL to ID image
  verificationStage:
  | "UNVERIFIED"
  | "PROFILE_COMPLETED"
  | "IDENTITY_SUBMITTED"
  | "IDENTITY_APPROVED"
  | "IDENTITY_REJECTED"
  | "SKILLS_TESTING"
  | "SKILLS_EVALUATED"
  | "AI_VALIDATION_PASSED"
  | "REFERENCES_PENDING"
  | "REFERENCES_VERIFIED"
  | "VERIFIED"
  | "REJECTED";
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["worker", "employer", "admin", "agent"],
      default: "worker",
    },
    headline: { type: String },
    bio: { type: String },
    location: { type: String },
    // Verification Fields
    trustScore: { type: Number, default: 0 },
    verificationStatus: {
      identity: {
        type: String,
        enum: ["unverified", "pending", "verified"],
        default: "unverified",
      },
      skills: {
        type: String,
        enum: ["unverified", "partial", "verified"],
        default: "unverified",
      },
      experience: {
        type: String,
        enum: ["unverified", "partial", "verified"],
        default: "unverified",
      },
      references: {
        type: String,
        enum: ["unverified", "partial", "verified"],
        default: "unverified",
      },
    },
    identityProof: { type: String },
    verificationStage: {
      type: String,
      enum: [
        "UNVERIFIED",
        "PROFILE_COMPLETED",
        "IDENTITY_SUBMITTED",
        "IDENTITY_APPROVED",
        "IDENTITY_REJECTED",
        "SKILLS_TESTING",
        "SKILLS_EVALUATED",
        "AI_VALIDATION_PASSED",
        "REFERENCES_PENDING",
        "REFERENCES_VERIFIED",
        "VERIFIED",
        "REJECTED",
      ],
      default: "UNVERIFIED",
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  // @ts-ignore
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model<IUser>("User", UserSchema);
