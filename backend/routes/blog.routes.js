import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Simple protected blog/articles route
// Only authenticated users (with valid JWT cookie) can access this
router.get("/articles", verifyToken, (req, res) => {
  // Example static articles – you can later swap this for a real DB model
  const articles = [
    {
      id: 1,
      title: "How I Built Loginly",
      excerpt: "A deep dive into building a production-grade auth system with MERN, JWT, and OAuth.",
      content:
        "This is where you explain your architecture, token strategy, and all the juicy implementation details...",
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: "My ML Journey",
      excerpt: "From zero to training models – how I got into machine learning.",
      content:
        "You can expand this article with your story, projects, and lessons learned along the way...",
      createdAt: new Date().toISOString(),
    },
  ];

  return res.json({
    success: true,
    data: articles,
  });
});

export default router;


