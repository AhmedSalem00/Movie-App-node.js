# 🎬 Movies App Backend

A scalable RESTful API for a Movies application built with Node.js, Express, PostgreSQL, and Prisma. It provides secure authentication, structured architecture, and core movie management features.

---

## 🚀 Tech Stack
Node.js • Express.js • PostgreSQL • Prisma ORM • JWT Authentication

---

## ✨ Features

🔐 Authentication & Security  
- JWT-based authentication  
- Secure password hashing  
- Middleware-based route protection  

🎬 Movies Management  
- Get all movies  
- Get movie details  
- Add / manage movies (admin-ready structure)  

❤️ Watchlist System  
- Add movies to watchlist  
- Remove from watchlist  
- Get user watchlist  

🏗️ Architecture  
- Clean MVC structure  
- Scalable and maintainable codebase  
- Separation of concerns (controllers, routes, services)  

---

## ⚙️ Setup Instructions

npm install

DATABASE_URL=your_postgres_url  
JWT_SECRET=your_secret_key  

npx prisma migrate dev  

npm run dev  

---

## 🔌 API Endpoints

Auth:
POST /api/auth/register  
POST /api/auth/login  

Movies:
GET /api/movies  
GET /api/movies/:id  
POST /api/movies  

Watchlist (Protected):
GET /api/watchlist  
POST /api/watchlist  
DELETE /api/watchlist/:id  

---

## 🔐 Security
JWT authentication • Middleware protection • Password hashing • Prisma ORM

---

## 📄 License
Educational & portfolio project

---

## 💡 Author
Built with Node.js, Express, PostgreSQL, and Prisma 🚀
