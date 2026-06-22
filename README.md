# 🎓 EdoSkill360 - Comprehensive Skills Development Platform

<div align="center">
  <p>
    <a href="https://github.com/sirrryasir/edoskill360"><img src="https://img.shields.io/badge/GitHub-EdoSkill360-black?style=flat-square&logo=github" alt="GitHub" /></a>
    <a href="https://nodejs.org"><img src="https://img.shields.io/badge/Node.js-20.x-339933?style=flat-square&logo=nodedotjs" alt="Node.js" /></a>
    <a href="https://react.dev"><img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" alt="React" /></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript" alt="TypeScript" /></a>
    <a href="https://www.docker.com"><img src="https://img.shields.io/badge/Docker-Enabled-2496ED?style=flat-square&logo=docker" alt="Docker" /></a>
  </p>
</div>

---

## 📌 Overview

**EdoSkill360** is a full-stack skills development and professional learning platform. It provides students and professionals with structured courses, progress tracking, and skill assessment tools. Built with a modern tech stack including React, Node.js, and MongoDB, EdoSkill360 enables seamless learning experiences across web and mobile platforms.

---

## ✨ Key Features

- **📚 Course Management**: Structured learning modules with video content, quizzes, and assignments
- **📊 Progress Tracking**: Real-time dashboard showing learning progress and skill achievements
- **🎯 Skill Assessment**: Automated testing and feedback on skill development
- **📱 Multi-Platform**: Web portal + React Native mobile app for on-the-go learning
- **👥 Community**: Peer interaction, forums, and mentorship features
- **🔐 Secure Auth**: JWT-based authentication with role-based access control
- **🚀 Scalable**: Docker-ready for cloud deployment

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | React 19, TypeScript, TailwindCSS |
| **Backend** | Node.js, Express.js |
| **Mobile** | React Native, Expo |
| **Database** | MongoDB |
| **DevOps** | Docker, Docker Compose |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20.x or higher
- Docker & Docker Compose (recommended)
- MongoDB instance

### Option 1: Docker (Recommended)
```bash
git clone https://github.com/sirrryasir/edoskill360.git
cd edoskill360
docker-compose up --build
```

### Option 2: Local Development

**1. Backend Setup**
```bash
cd server
npm install
# Create .env file with MongoDB connection
npm run dev
```

**2. Frontend Setup**
```bash
cd ../client
npm install
npm run dev
```

**3. Mobile Setup**
```bash
cd ../mobile
npm install
npx expo start
```

---

## 📁 Project Structure

```
edoskill360/
├── client/          # React web application
│   ├── src/
│   ├── public/
│   └── package.json
├── server/          # Node.js backend API
│   ├── src/
│   ├── models/
│   └── routes/
├── mobile/          # React Native mobile app
│   ├── src/
│   └── app.json
└── docker-compose.yml
```

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
   ```bash
   git clone https://github.com/sirrryasir/edoskill360.git
   cd edoskill360
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes** and commit
   ```bash
   git commit -m "feat: add your feature description"
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open a Pull Request** with a clear description

### Development Guidelines
- Use TypeScript for type safety
- Follow existing code style
- Write meaningful commit messages
- Test your changes before submitting PR

---

## 📄 License

MIT License. See `LICENSE` file for details.

---

## 👨‍💻 Author

Built by **Yasir Hassan** ([@sirrryasir](https://github.com/sirrryasir))  
Portfolio: [yaasir.dev](https://www.yaasir.dev)

---

## 📞 Support

- 📧 Email: Contact via GitHub
- 🐛 Issues: [GitHub Issues](https://github.com/sirrryasir/edoskill360/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/sirrryasir/edoskill360/discussions)

---

**Star this project if you find it useful!** ⭐
