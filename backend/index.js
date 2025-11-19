import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/index.js"
import bodyParser from 'body-parser';
import cors from 'cors'
import authRoutes from "./routes/auth.routes.js"
import oauthRoutes from "./routes/oauth.routes.js"
import cookieParser from "cookie-parser";
import passport from "passport";
import "./config/passport.js"
import {verifyToken} from "./middleware/auth.middleware.js"
import { errorHandler } from "./middleware/errorHandler.middleware.js";
import { authRateLimiter } from "./middleware/rateLimiter.middleware.js";

dotenv.config({
    path: "./.env"
})

const app = express();

app.use(cookieParser());

// CORS middleware
const allowedOrigins = process.env.FRONTEND_URL 
    ? process.env.FRONTEND_URL.split(',')
    : ["http://localhost:5173"];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

app.use(passport.initialize());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Rate limiting for auth routes
app.use('/api/auth', authRateLimiter);

// Routing
app.use('/api/auth', authRoutes)
app.use("/api/auth", oauthRoutes);

// Default route
app.get("/", (req, res) => {
    res.json({ message: "Server is running", status: "ok" });
})

app.get("/api/auth/me", verifyToken, (req, res) => {
    res.json({user: req.user});
})

// Error handling middleware (must be last)
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// DB connection 
connectDB().then(()=> {
    app.listen(process.env.PORT || 8000, ()=>{ 
        console.log(`✅ Server is running at port ${process.env.PORT || 8000}`)
        console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`)
    })
}).catch((error)=> {
    console.error("❌ MongoDB connection failed: ", error.message)
    process.exit(1);
})
