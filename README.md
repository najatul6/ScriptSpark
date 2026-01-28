
---

# 🚀 ScriptSpark | Advanced Automation & Script Management

**ScriptSpark** is a high-performance automation ecosystem designed for developers to manage scripts, control user roles, and monitor real-time system analytics. Built with the **MERN Stack**, it combines a futuristic interface with enterprise-grade security.

🌐 **Live Demo:** [script-spark-eight.vercel.app](https://script-spark-eight.vercel.app/)

💻 **GitHub:** [najatul6/ScriptSpark](https://github.com/najatul6/ScriptSpark)

---

## ✨ Key Features

* **⚡ Futuristic UI/UX:** A sleek, dark-themed dashboard built with **Tailwind CSS** and **Glassmorphism** aesthetics.
* **🔐 Role-Based Access Control (RBAC):** Granular permission management for **SuperAdmins** and **Admins**.
* **🛡️ Secure Authentication:** Integrated **Firebase Auth** coupled with **JWT (JSON Web Tokens)** for stateless security.
* **🛠️ User Management System:** Dynamic interface to update user roles, access policies, and module permissions.
* **📊 Real-time Data Synchronization:** Powered by **TanStack Query** for seamless data fetching and caching.
* **📡 Secure API Layer:** Custom **Axios Interceptors** to handle automatic token injection and 401/403 error redirection.

---

## 🛠️ Tech Stack

### Frontend

* **React.js (Vite)** – Fast and modular component architecture.
* **Tailwind CSS** – Custom utility-first styling.
* **TanStack Query (React Query)** – Server-state management.
* **Lucide React** – Premium iconography.
* **Axios** – Secure HTTP client.

### Backend

* **Node.js & Express.js** – Scalable REST API architecture.
* **MongoDB** – NoSQL database with Stable API integration.
* **JWT** – Industry-standard secure token exchange.
* **Dotenv** – Environment variable protection.

---

## 🚀 Installation & Setup

Follow these steps to get a local copy up and running:

### 1. Clone the Repository

```bash
git clone https://github.com/najatul6/ScriptSpark.git
cd ScriptSpark

```

### 2. Configure Environment Variables

Create a `.env` file in the server directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

```

### 3. Install Dependencies & Run

**Server:**

```bash
cd server
npm install
npm start

```

**Client:**

```bash
cd client
npm install
npm run dev

```

---

## 📁 Project Architecture

```text
├── client/
│   ├── src/
│   │   ├── hooks/         # Custom Hooks (useUsers, useAxiosSecure)
│   │   ├── components/    # Reusable UI (Footer, Modals, Tables)
│   │   ├── pages/         # Dashboard, UserManagement, Auth
│   │   └── lib/           # Utility functions (cn, etc.)
└── server/
    ├── index.js           # Server entry point & Middleware
    └── .env               # Secrets & Database Config

```

---

## 🛡️ Security Best Practices

* **Double-Layer Verification:** Routes are protected by both `verifyToken` (Auth) and `verifyAdmin` (Role) middlewares.
* **Database Sanitization:** Strict MongoDB Stable API versioning to prevent deprecation errors.
* **Token Lifecycle:** Short-lived JWTs (1h) with secure local storage handling.

---

## 👨‍💻 Author

**Md Najatul Islam** *Full-Stack Web Developer* [Portfolio](https://najatul-islam.vercel.app/) | [GitHub](https://github.com/najatul6) | [LinkedIn](https://www.linkedin.com/in/najatul-islam-94193b1b3/)

---

### 🌟 Support the Project

If you find this project useful, please consider giving it a **Star** on GitHub!

---
