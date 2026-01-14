import mongoose, { Schema, Document } from "mongoose";

export interface IVerification extends Document {
    userId: mongoose.Types.ObjectId;
    type: "identity" | "experience" | "reference";
    status: "pending" | "approved" | "rejected";
    agentId?: mongoose.Types.ObjectId;
    reviewNotes?: string;
    data: any; // Flexible field for type-specific data (e.g., image URLs, reference email)
    adminComments?: string;
    createdAt: Date;
    updatedAt: Date;
}

const VerificationSchema: Schema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        type: {
            type: String,
            enum: ["identity", "experience", "reference", "skill_task", "interview"], // Added skill_task and interview
            required: true,
        },
        stage: {
            type: String,
            enum: ["STAGE_1", "STAGE_2", "STAGE_3", "STAGE_4"],
            required: true
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
        aiScore: { type: Number, default: 0 }, // Preliminary AI score
        humanScore: { type: Number, default: 0 }, // Agent final score
        agentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        reviewNotes: { type: String },
        data: { type: Schema.Types.Mixed },
        adminComments: { type: String },
    },
    { timestamps: true }
);

export default mongoose.model<IVerification>("Verification", VerificationSchema);
