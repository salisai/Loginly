import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";


export const oauthCallbackHandler = async(req, res) => {
    const user = req.user 

    if(!user){
        return res.status(401).json({success: false, message: "Oauth failed"});
    }

    //create access token
    const accessToken = jwt.sign(
        {
            _id: user._id,
            email: user.email, 
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
    );

    //refresh token
    const refreshToken = jwt.sign(
        {_id: user._id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
    );

    user.refreshToken = refreshToken;
    await user.save();

    const isProduction = process.env.NODE_ENV === "production";
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

    const accessTokenOptions = {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 1000 * 60 * 60, // 1 hour
        path: "/" 
    };

    const refreshTokenOptions = {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        path: "/" 
    };

    res.cookie("accessToken", accessToken, accessTokenOptions);
    res.cookie("refreshToken", refreshToken, refreshTokenOptions);

    return res.redirect(`${frontendUrl}/?oauth=success`)
}