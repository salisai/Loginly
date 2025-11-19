# Loginly — Production-Grade Authentication System

A professional, full-stack **Authentication System** built with the MERN stack (MongoDB, Express, React, Node.js) using **JWT tokens**, **httpOnly cookies**, and a **clean architecture** (MVC pattern, async error handling, secure token flow).

> Built with scalability, security, and real-world production in mind.

---

## Features included

- ✅ **User Registration & Login** with email/password
- ✅ **OAuth Authentication** (Google & GitHub)
- ✅ **JWT-based Authentication** with access & refresh tokens
- ✅ **Protected Routes** with authentication middleware
- ✅ **Password Management** (change password)
- ✅ **Token Refresh** mechanism
- ✅ **Rate Limiting** for security
- ✅ **Form Validation** on frontend & backend both, good for security
- ✅ **Toast Notifications** for good user experience
- ✅ **Loading States** throughout the app
- ✅ **Modern UI** with Tailwind CSS, no shadcn.
- ✅ **Error Handling** with proper error messages

---

## Tech Stack

- **Frontend**: React 19 + Vite + Tailwind CSS
- **Backend**: Node.js + Express 5
- **Database**: MongoDB with Mongoose
- **Auth Strategy**: JWT (access & refresh tokens in httpOnly cookies)
- **OAuth**: Passport.js (Google OAuth 2.0 & GitHub)
- **Architecture**: MVC + Separation of Concerns
- **Security**:
  - Hashed passwords with bcrypt (10 rounds)
  - Refresh token rotation
  - Access control via middleware
  - Rate limiting (5 requests per 15 minutes)
  - CORS protection
  - Environment-based configuration

---

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/salisai/Loginly.git
cd Loginly
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=8000
NODE_ENV=development

# Database Configuration
MONGO_DB_URI=mongodb://localhost:27017/loginly

# JWT Configuration
ACCESS_TOKEN_SECRET=your_access_token_secret_here_change_in_production
REFRESH_TOKEN_SECRET=your_refresh_token_secret_here_change_in_production
ACCESS_TOKEN_EXPIRY=1h
REFRESH_TOKEN_EXPIRY=7d

# OAuth Configuration
OAUTH_CALLBACK_URL=http://localhost:8000/api/auth

# Google OAuth (Get from https://console.cloud.google.com/)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# GitHub OAuth (Get from https://github.com/settings/developers)
GITHUB_CLIENT_ID=your_github_client_id_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here

# Frontend URL (for CORS and OAuth redirects)
FRONTEND_URL=http://localhost:5173
```

### 3. Frontend Setup

```bash
cd ../client
npm install
```

---

## Running the Application

### Start Backend

```bash
cd backend
node index.js
```

The backend will run on `http://localhost:8000`

### Start Frontend

```bash
cd client
npm run dev
```

The frontend will run on `http://localhost:5173`

---

## OAuth Setup

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth client ID"
5. Add authorized redirect URI: `http://localhost:8000/api/auth/google/callback`
6. Copy Client ID and Client Secret to `.env`

### GitHub OAuth Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: Loginly
   - **Homepage URL**: `http://localhost:5173`
   - **Authorization callback URL**: `http://localhost:8000/api/auth/github/callback`
4. Copy Client ID and Client Secret to `.env`

---

## Project Structure

```
Loginly/
├── backend/
│   ├── config/           # Configuration files (DB, Passport)
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware (auth, error handler, rate limiter)
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── utils/            # Utility functions
│   └── index.js          # Entry point
├── client/
│   ├── src/
│   │   ├── components/   # React components
│   │   │   ├── Auth/     # Authentication components
│   │   │   ├── Home/     # Home page components
│   │   │   └── Layout/   # Layout components
│   │   ├── context/      # React Context (AuthContext)
│   │   ├── pages/        # Page components
│   │   └── main.jsx      # Entry point
│   └── package.json
└── README.md
```

---


## Security Features

1. **Password Hashing**: bcrypt with 10 salt rounds
2. **JWT Tokens**: 
   - Access token: 1 hour expiry
   - Refresh token: 7 days expiry
   - Stored in httpOnly cookies
3. **Rate Limiting**: 5 requests per 15 minutes for auth routes
4. **CORS**: Configurable allowed origins
5. **Input Validation**: Frontend and backend validation
6. **Error Handling**: Proper error messages without exposing internals

