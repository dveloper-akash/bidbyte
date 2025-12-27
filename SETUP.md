# BidByte — Local Setup Guide

This document explains how to set up **BidByte** locally.

BidByte is a real-time auction platform where:
- The backend API
- Socket.IO real-time server
- BullMQ background jobs
- Nodemailer-based email logic

are all **integrated into a single Node.js server**.

---

## Prerequisites

Make sure you have the following installed:

- Node.js (v18 or higher)
- npm
- PostgreSQL database (**Neon**)
- Redis (local or Upstash)
- Google OAuth credentials
- SMTP credentials (for Nodemailer – development use)

---

## Clone the Repository

```bash
git clone <YOUR_GITHUB_REPO_URL>
cd bidbyte
```

---

## Project Structure(Simplified)

```css
bidbyte/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── middlewares/
│   │   ├── queues/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── socket/
│   │   ├── workers/
│   │   ├── utils/
│   │   └── prisma.js
│   │   └── app.js
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── assets/
│   │   ├── auth/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── websockets/
│   │   └── index.css
│   │   └── main.jsx
│   ├── index.html
│   └── vite.config.js
```

---

## Install Dependencies

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd ../frontend
npm install
```

---

## Environment Variables

### Backend

```bash
# Server
PORT=5000

# Database (Neon PostgreSQL)
DATABASE_URL=your_neondb_url

# Redis (Local)
REDIS_URL=redis://localhost:6379

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id

# Authentication
JWT_SECRET=your_jwt_secret

# Client Url (Local)
CLIENT_URL="http://localhost:5173"

# Nodemailer (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM=your_email@gmail.com
```

### Frontend

```bash
# Backend URL (local)
VITE_BASE_URL="http://localhost:5000"

# Google OAuth
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

---

## Database Setup (Prisma + Neon)

BidByte uses **Prisma v6.2.1** with a **Neon PostgreSQL** database.

From the `backend/` directory:

```bash
npx prisma generate
npx prisma migrate dev
```

This will:
- Connect to Neon
- Apply database migrations
- Generate Prisma Client

---

## Redis Setup

Redis is required for **BULLMQ job scheduling**.

### Option 1: Local Redis

```bash
redis-server
```

### Option 2: Upstash

- Create a Redis instance on Upstash
- Copy the connection URL
- Set it as `REDIS_URL` in `.env`

---

## Running the Application

### 1. Start Backend Server

```bash
cd backend
npm run dev
```

### 2. Start Frontend Server

```bash
cd frontend
npm run dev
```

---

## Testing the Full Flow

1. Login using Google OAuth
2. Create an auction
3. Open the auction page in two browsers
4. Place bids and observe real-time updates
5. Wait for the auction to end
6. Winner is finalized via BullMQ
7. Email is sent via Nodemailer (local SMTP)

---

## Notes & Limitations

- BullMQ workers run within the main server process
- SMTP email delivery is intended for development and testing
- Render free deployment restrict SMTP connections








