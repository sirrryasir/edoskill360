# Bun + Express + Next.js Starter Kit

This project is a starter template featuring a **Bun + Express + Mongoose** backend (Server) and a **Next.js** frontend (Client).

## Features

- **Server**: Express.js with Bun runtime, MongoDB (Mongoose), MVC architecture, JWT Authentication, TypeScript.
- **Client**: Next.js (TypeScript).

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed (`curl -fsSL https://bun.sh/install | bash`)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone ben-starter
    cd ben-starter
    ```

2.  **Install Server Dependencies:**

    ```bash
    cd server
    bun install
    ```

3.  **Install Client Dependencies:**
    ```bash
    cd client
    bun install
    ```

### Configuration

1.  **Server:**
    - Navigate to `server`
    - Copy `.env.example` to `.env`
      ```bash
      cp .env.example .env
      ```
    - Update `MONGO_URI` and `JWT_SECRET` in `.env` if needed.

### Running the App

1.  **Start Server (Development Mode):**

    ```bash
    cd server
    bun run dev
    ```

    Server runs on `http://localhost:5000`

2.  **Start Client:**
    ```bash
    cd client
    bun run dev
    ```
    Client runs on `http://localhost:3000`
