import { User } from "../models/user.model";
import { ApiResponse } from "../utils/ApiResponse";
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

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("accessToken", accessToken, {
        httpOnly: true, 
        secure: true, 
        sameSite: "Strict",
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true, 
        secure: true, 
        sameSite: "Strict"
    });


    return res.redirect("/")
}