import User, { IUser } from "../models/User";
import Verification, { IVerification } from "../models/Verification";

export class VerificationService {
    /**
     * Calculates and updates the user's trust score based on their verification status.
     * Trust Score Breakdown:
     * - Identity: 20 points
     * - Skills: 40 points
     * - Interview: 20 points
     * - References: 20 points
     */
    static async updateTrustScore(userId: string): Promise<IUser | null> {
        const user = await User.findById(userId);
        if (!user) return null;

        let identityScore = 0;
        let skillsScore = 0;
        let interviewScore = 0;
        let referencesScore = 0;

        // 1. Identity (20 points)
        // We check if they have passed the IDENTITY stage or are fully verified in identity
        // If we look at the verificationStage, STAGE_2_SKILLS_SUBMITTED implies Identity is done.
        // Or we can check verificationStatus.identity
        /* 
           Actually, let's rely on the stages for simplicity as they are linear.
           STAGE_2 means Stage 1 (Identity) is passed.
        */
        const passedIdentity = [
            "STAGE_2_SKILLS_SUBMITTED",
            "STAGE_3_INTERVIEW_COMPLETED",
            "STAGE_4_REFERENCES_PENDING",
            "STAGE_5_VERIFIED"
        ].includes(user.verificationStage);

        if (passedIdentity) {
            identityScore = 20;
        }

        // 2. Skills (40 points)
        // Ideally this scales with number of verified skills. 
        // For MVP, if they passed AI_VALIDATION_PASSED (which is part of Skill stage), they get points.
        // Let's assume if they reach STAGE_3_INTERVIEW_COMPLETED, they passed skills.
        const passedSkills = [
            "STAGE_3_INTERVIEW_COMPLETED",
            "STAGE_4_REFERENCES_PENDING",
            "STAGE_5_VERIFIED"
        ].includes(user.verificationStage);

        if (passedSkills) {
            skillsScore = 40;
        }

        // 3. Interview (20 points)
        const passedInterview = [
            "STAGE_4_REFERENCES_PENDING",
            "STAGE_5_VERIFIED"
        ].includes(user.verificationStage);

        if (passedInterview) {
            interviewScore = 20;
        }

        // 4. References (20 points)
        if (user.verificationStage === "STAGE_5_VERIFIED") {
            referencesScore = 20;
        }

        // Update User
        user.trustScoreBreakdown = {
            identity: identityScore,
            skills: skillsScore,
            interview: interviewScore,
            references: referencesScore
        };
        user.trustScore = identityScore + skillsScore + interviewScore + referencesScore;

        await user.save();
        return user;
    }

    /**
     * Advances the user to the next stage if conditions are met.
     */
    static async advanceStage(userId: string, newStage: IUser['verificationStage']): Promise<IUser | null> {
        const user = await User.findById(userId);
        if (!user) return null;

        // TODO: Add validation logic here (e.g., ensure prerequisites are met)
        user.verificationStage = newStage;

        // Auto-recalculate trust score on stage change
        await this.updateTrustScore(userId);

        return user;
    }
}
