import { Request, Response, NextFunction } from "express";

export enum VerificationStage {
    UNVERIFIED = "UNVERIFIED",
    PROFILE_COMPLETED = "PROFILE_COMPLETED",
    IDENTITY_SUBMITTED = "IDENTITY_SUBMITTED",
    IDENTITY_APPROVED = "IDENTITY_APPROVED",
    IDENTITY_REJECTED = "IDENTITY_REJECTED",
    SKILLS_TESTING = "SKILLS_TESTING",
    SKILLS_EVALUATED = "SKILLS_EVALUATED",
    AI_VALIDATION_PASSED = "AI_VALIDATION_PASSED",
    REFERENCES_PENDING = "REFERENCES_PENDING",
    REFERENCES_VERIFIED = "REFERENCES_VERIFIED",
    VERIFIED = "VERIFIED",
    REJECTED = "REJECTED",
}

const stageHierarchy = [
    VerificationStage.UNVERIFIED,
    VerificationStage.PROFILE_COMPLETED,
    VerificationStage.IDENTITY_SUBMITTED,
    VerificationStage.IDENTITY_APPROVED,
    VerificationStage.SKILLS_TESTING,
    VerificationStage.SKILLS_EVALUATED,
    VerificationStage.AI_VALIDATION_PASSED,
    VerificationStage.REFERENCES_PENDING,
    VerificationStage.REFERENCES_VERIFIED,
    VerificationStage.VERIFIED,
];

export const requireStage = (requiredStage: VerificationStage) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // @ts-ignore
        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: "Not authorized" });
        }

        if (user.role === "admin" || user.role === "agent") {
            return next(); // Admins/agents bypass checks
        }

        const currentStageIndex = stageHierarchy.indexOf(user.verificationStage);
        const requiredStageIndex = stageHierarchy.indexOf(requiredStage);

        if (currentStageIndex === -1) {
            // User stage not in hierarchy (e.g. REJECTED or IDENTITY_REJECTED)
            // If required stage is UNVERIFIED, allow, else block.
            if (requiredStage === VerificationStage.UNVERIFIED) return next();
            return res.status(403).json({ message: `Access denied. Your current status is ${user.verificationStage}` });
        }

        if (currentStageIndex >= requiredStageIndex) {
            next();
        } else {
            res.status(403).json({
                message: `Verification stage ${requiredStage} required. Current: ${user.verificationStage}`,
                required: requiredStage,
                current: user.verificationStage,
            });
        }
    };
};
