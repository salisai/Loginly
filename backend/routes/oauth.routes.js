import express from "express";
import passport from "passport";
import { oauthCallbackHandler } from "../controllers/oauth.controller";


const router = express.Router();

//google auth
router.get("/google", passport.authenticate("google", {scope: ["profile", "email"]}));

router.get(
    "/google/callback",
    passport.authenticate("google", {failureRedirect: "/login", session:false}),
    oauthCallbackHandler
);


//github auth
router.get("/github", passport.authenticate("github", {scope: ['user: email']}));

router.get(
    "/github/callback",
    passport.authenticate("github", {failureRedirect: "/login", session:false }),
    oauthCallbackHandler
)

export default router;