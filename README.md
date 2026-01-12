# Edoskill360

Edoskill360 is a modern, high-performance freelance and task management platform built to bridge the gap between skilled professionals and employers. Unlike traditional platforms, Edoskill360 focuses on **Trust and Verification**, ensuring that every worker's identity and skills are validated through a multi-stage verification process.

## 🌟 Key Features

- **Multi-Role Ecosystem**: Tailored experiences for Workers, Employers, Agents, and Administrators.
- **Trust Score System**: A dynamic ranking system that builds credibility based on verified credentials, completed tasks, and feedback.
- **AI-Powered Verification**: Integrated AI validation for identity proof, skill assessment, and profile quality.
- **Verification Pipeline**: 
  - Identity Verification (ID/Passport)
  - Skill Testing & Evaluation
  - AI-Driven Background Validation
  - Reference Checking
- **Modern Dashboard**: Role-specific dashboards for managing jobs, applications, and verification progress.
- **High Performance**: Powered by **Bun** for lightning-fast server-side execution.

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [Shadcn/UI](https://ui.shadcn.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Form Handling**: React Hook Form & Zod
- **Icons**: Lucide React

### Backend (Server)
- **Runtime**: [Bun](https://bun.sh/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication**: JWT (JSON Web Tokens) & Bcrypt for password hashing
- **Testing**: Jest & Supertest

## 🚀 Getting Started

### Prerequisites
- [Bun](https://bun.sh/) installed (`curl -fsSL https://bun.sh/install | bash`)
- MongoDB (Local or Atlas)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/edoskill360.git
   cd edoskill360
   ```

2. **Setup Server:**
   ```bash
   cd server
   bun install
   cp .env.example .env
   # Update MONGO_URI and JWT_SECRET in .env
   bun run dev
   ```

3. **Setup Client:**
   ```bash
   cd client
   bun install
   bun run dev
   ```

## 📂 Project Structure

- `/client`: Next.js frontend application.
- `/server`: Express.js backend API.
- `/server/src/models`: Database schemas (User, Job, Task, Verification, etc.).
- `/server/src/controllers`: Business logic for each resource.
- `/server/src/routes`: API endpoints.
---
Built with ❤️ by [Yasir](https://yaasir.dev)