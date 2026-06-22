# EdoSkill360 - Talent Verification and Job Matching Platform

Platform for verifying professional skills through task-based assessments and matching talent with employers.

## What It Does

EdoSkill360 connects talents with employers through a trust-based verification system. Talents prove their skills by completing tasks (quizzes, coding challenges, file submissions). Employers post jobs and browse verified talent profiles.

## Core Features

Skills Verification:
- Multi-stage verification process (6 stages from unverified to verified)
- Tasks per skill: quizzes, file uploads, text submissions, links
- Difficulty levels: easy, medium, hard
- AI-generated tasks using Google Gemini
- Trust score system based on identity, skills, interview, and references

Talent System:
- Talent profiles with headline, bio, location
- Trust score (0-100) with breakdown
- Role: talent, employer, admin, agent
- Verification stages tracked

Job Management:
- Employers post jobs with skill requirements
- Full-time, part-time, contract, freelance options
- Job status: open, closed
- Salary ranges

Task Types:
- Quiz with multiple choice questions
- File submission with scoring
- Text submission
- Link submission
- Static or AI-generated tasks

## Tech Stack

Backend:
- Node.js + Express.js
- TypeScript
- MongoDB with Mongoose ORM
- Google Generative AI (Gemini for AI-generated tasks)
- Authentication: JWT + bcrypt
- Prisma (in mobile)

Frontend:
- React
- Client and mobile apps
- Role-based access control

Database:
- MongoDB with Mongoose
- Models: User, Job, Task, TaskResult, Skill, Verification, Application, Feedback, etc.

## Models

User (with verification stages):
- STAGE_0_UNVERIFIED
- STAGE_1_PROFILE_COMPLETED
- STAGE_2_SKILLS_SUBMITTED
- STAGE_3_INTERVIEW_COMPLETED
- STAGE_4_REFERENCES_PENDING
- STAGE_5_VERIFIED
- REJECTED

Job:
- title, description
- requirements (skills array)
- salary range, location
- job type, status

Task:
- skill-based
- quiz/file/text/link submission types
- difficulty levels
- max score, time limit

## Installation

Backend:
```bash
cd server
npm install
npm run dev
```

Client:
```bash
cd client
npm install
npm run dev
```

Mobile:
```bash
cd mobile
npm install
npm run dev
```

## License

MIT
