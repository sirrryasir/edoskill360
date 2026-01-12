import mongoose, { Schema, Document } from "mongoose";

export interface IagentProfile extends Document {
    userId: mongoose.Types.ObjectId;
    level: "junior" | "senior";
    verifiedByAdmin: boolean;
    specialization?: string[]; // e.g., ["dev", "design"]
    createdAt: Date;
    updatedAt: Date;
}

const agentProfileSchema: Schema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        level: {
            type: String,
            enum: ["junior", "senior"],
            default: "junior",
        },
        verifiedByAdmin: { type: Boolean, default: false },
        specialization: [{ type: String }],
    },
    { timestamps: true }
);

export default mongoose.model<IagentProfile>("agentProfile", agentProfileSchema);
