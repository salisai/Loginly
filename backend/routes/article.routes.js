import express from "express";
import {verifyToken} from "../middleware/auth.middleware.js"

const router = express.Router();

//article route
router.get("/", verifyToken, (req, res) => {
    res.json({
        message: "Welcome to the article page, you are authenticated",
        user: req.user
    })
})

export default router;