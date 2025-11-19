import express from "express";
import { signup, login, logout, refreshAccessToken, changeCurrentPassword } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router()

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", verifyToken, logout);
router.post("/refresh-token", refreshAccessToken);
router.post("/change-password", verifyToken, changeCurrentPassword);

export default router;