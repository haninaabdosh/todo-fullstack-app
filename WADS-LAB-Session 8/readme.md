# Todo List Application

A full-stack Todo List web application built with React, Vite, Express.js, PostgreSQL, Drizzle ORM, JWT authentication, Zustand, Tailwind CSS, and Zod validation.

Submitted by: Hanina Elias Abdosh (2802516030)

---

# Features

- User Registration & Login
- JWT Authentication
- Protected Dashboard
- Create Todos
- Read Todos
- Update Todos
- Delete Todos
- Mark Todos as Complete
- Responsive UI Design
- Loading States
- Error Handling
- PostgreSQL Database Integration
- REST API Architecture

---

# Tech Stack

## Frontend
- React + Vite
- Tailwind CSS
- Axios
- Zustand
- React Router DOM
- Lucide React Icons

## Backend
- Express.js
- PostgreSQL
- Drizzle ORM
- JWT Authentication
- bcryptjs
- Zod Validation
- CORS

---

# Project Structure

```bash
todo-app/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── postcss.config.js
│
├── backend/
│   ├── src/
│   │   ├── index.js
│   │   ├── db/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   └── validations/
│   ├── package.json
│   └── .env
│
└── README.md
```

---

# Database Schema

## Users Table

| Column | Type |
|---|---|
| id | serial primary key |
| email | varchar unique |
| password_hash | text |
| created_at | timestamp |

## Todos Table

| Column | Type |
|---|---|
| id | serial primary key |
| user_id | integer foreign key |
| title | varchar |
| is_complete | boolean |
| created_at | timestamp |

---

# API Endpoints

## Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/me | Get current user |

## Todos

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/todos | Get all todos |
| POST | /api/todos | Create todo |
| PUT | /api/todos/:id | Update todo |
| DELETE | /api/todos/:id | Delete todo |

---

# Installation Guide

## 1. Clone Project

```bash
git clone <your-repository-url>
```

---

# Backend Setup

## 1. Navigate to Backend

```bash
cd backend
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Create .env File

```env
DATABASE_URL=your_neon_database_url
JWT_SECRET=mysecret123
PORT=3001
```

## 4. Run Backend

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:3001
```

---

# Frontend Setup

## 1. Navigate to Frontend

```bash
cd frontend
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Run Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# Environment Variables

## Backend

```env
DATABASE_URL=
JWT_SECRET=
PORT=3001
```

---

# Authentication Flow

1. User registers or logs in
2. Backend returns JWT token
3. Token stored in localStorage
4. Axios sends token in Authorization header
5. Protected routes verify JWT token

---

# UI Features

- Blue and white modern design
- Responsive layout
- Rounded cards
- Hover effects
- Loading states
- Empty state messages
- Smooth transitions
- Mobile friendly

---

# Testing Guide

## Register User

```bash
curl -X POST http://localhost:3001/api/auth/register ^
-H "Content-Type: application/json" ^
-d "{\"email\":\"test@test.com\",\"password\":\"123456\"}"
```

## Login User

```bash
curl -X POST http://localhost:3001/api/auth/login ^
-H "Content-Type: application/json" ^
-d "{\"email\":\"test@test.com\",\"password\":\"123456\"}"
```

## Create Todo

```bash
curl -X POST http://localhost:3001/api/todos ^
-H "Authorization: Bearer YOUR_TOKEN" ^
-H "Content-Type: application/json" ^
-d "{\"title\":\"My Todo\"}"
```

## Get Todos

```bash
curl http://localhost:3001/api/todos ^
-H "Authorization: Bearer YOUR_TOKEN"
```

## Update Todo

```bash
curl -X PUT http://localhost:3001/api/todos/1 ^
-H "Authorization: Bearer YOUR_TOKEN" ^
-H "Content-Type: application/json" ^
-d "{\"title\":\"Updated Todo\",\"is_complete\":true}"
```

## Delete Todo

```bash
curl -X DELETE http://localhost:3001/api/todos/1 ^
-H "Authorization: Bearer YOUR_TOKEN"
```

---

# Manual Testing Checklist

| Test | Status |
|---|---|
| Register User | Pass |
| Login User | Pass |
| Create Todo | Pass |
| Update Todo | Pass |
| Delete Todo | Pass |
| Toggle Complete | Pass |
| Protected Routes | Pass |
| Responsive UI | Pass |
| Error Handling | Pass |
| Empty State | Pass |

---

# Common Bugs & Fixes

## Axios Not Found

Fix:

```bash
npm install axios
```

## CORS Error

Ensure backend has:

```js
app.use(cors({
  origin: "http://localhost:5173"
}));
```

## JWT Token Invalid

Delete token and login again:

```bash
localStorage.clear()
```

## Tailwind Not Working

Restart Vite server:

```bash
npm run dev
```

---

# Security Features

- Password hashing with bcrypt
- JWT authentication
- Protected routes
- Input validation with Zod
- User ownership validation for todos

---

# Acknowledgements

- OpenAI ChatGPT
- Lucide React Icons
- Tailwind CSS
- Vite
- Neon PostgreSQL


---