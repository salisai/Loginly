import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";


export const oauthCallbackHandler = async(req, res) => {
    const user = req.user 

    if(!user){
        return res.status(401).json({
            success: false, 
            message: "Oauth failed. No user found"});
    }

    try {
        //create access token
        const accessToken = jwt.sign(
            {
                _id: user._id,
                email: user.email, 
                username: user.username
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
    
        //save refresh token in DB
        user.refreshToken = refreshToken;
        await user.save();
        
        //cookie options. 
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax"
        }

        //send cookies
        res.cookie("accessToken", accessToken, cookieOptions);
        res.cookie("refreshToken", refreshToken, cookieOptions);
    
    
        return res.redirect(`${process.env.CLIENT_URL}/`)
    
    } catch (error) {
        console.error("AOuth callback error: ", error);
        return res.redirect(`${process.env.CLIENT_URL}/login?error=oauth_failed`)
    }
}