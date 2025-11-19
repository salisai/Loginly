import bcrypt from "bcrypt";
import {User} from "../models/user.model.js"
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js"

const createTokens = async(userId) => {
    try {
        const user = await User.findById(userId);

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});

        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens")
    }
}

//signup controller
export const signup = asyncHandler(async(req, res) => {

    const {username, email, password} = req.body;
    
    if (!username || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new ApiError(400, "Invalid email format");
    }

    // Password validation
    if (password.length < 6) {
        throw new ApiError(400, "Password must be at least 6 characters long");
    }

    const existingUser = await User.findOne({$or:[{username}, {email}]});
    if (existingUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

    const newUser = new User({
        username, 
        email, 
        password,
    });

    await newUser.save();
    
    const createdUser = await User.findById(newUser._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    )
});



//login controller
export const login = asyncHandler(async(req, res) => {

    const {email, password} = req.body;

    if((!email || !password)){
        throw new ApiError(400, "Username or password required")
    }

    const user = await User.findOne({email});
    
    if(!user) throw new ApiError(404, "User does not exists")

    const isPasswordValid = await user.isPasswordCorrect(password);
    // console.log("Password valid:", isPasswordValid);

    if (!isPasswordValid) throw new ApiError(401, "Invalid credentials")

    const {accessToken, refreshToken} = await createTokens(user._id);
    
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    
    const isProduction = process.env.NODE_ENV === "production";
    
    const options = {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        path: "/" 
    }

    const accessTokenOptions = {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 1000 * 60 * 60, // 1 hour
        path: "/" // Ensure cookie is available for all routes
    }
    
    user.refreshToken = refreshToken;
    await user.save();

    return res
    .status(200)
    .cookie("accessToken", accessToken, accessTokenOptions)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200, {
            user: loggedInUser
        },
    "User logged in successfully"
    ))
})



//logout controller
export const logout = asyncHandler(async(req, res) => {
    const userId = req.user?._id;

    if(!userId){
        throw new ApiError(401, "Unauthorized request");
    }

    await User.findByIdAndUpdate(
        userId,
        {
            $unset: {refreshToken: 1}
        },
        {
            new: true
        }
    );

    const isProduction = process.env.NODE_ENV === "production";
    const CookieOptions = {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        path: "/" // Must match the path used when setting cookies
    }

    res.clearCookie("accessToken", CookieOptions);
    res.clearCookie("refreshToken", CookieOptions);

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "User logged out"));
})




//refresh token rotation
export const refreshAccessToken = asyncHandler(async(req, res) => {
    const oldToken = req.cookies.refreshToken;

    if(!oldToken) throw new ApiError(401, "Missing refresh token");

    let decoded;
    try{
        decoded = jwt.verify(oldToken, process.env.REFRESH_TOKEN_SECRET);
    }catch(error){
        throw new ApiError(403, "Invalid or expired refresh token");
    }

    const user = await User.findById(decoded._id);
    if(!user || user.refreshToken !== oldToken){
        throw new ApiError(403, "Token mismatch or user not found");
    } 

    const {accessToken, refreshToken} = await createTokens(user._id);
    user.refreshToken = refreshToken;
    await user.save();

    const isProduction = process.env.NODE_ENV === "production";
    
    const refreshTokenOptions = {
        httpOnly: true,
        secure: isProduction, 
        sameSite: isProduction ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/" 
    }

    const accessTokenOptions = {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 1000 * 60 * 60, // 1 hour
        path: "/" 
    }

    res.cookie("refreshToken", refreshToken, refreshTokenOptions);
    res.cookie("accessToken", accessToken, accessTokenOptions);

    res.status(200).json(new ApiResponse(200, {accessToken}, "Token refreshed successfully"))
});



export const changeCurrentPassword = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.user?._id);

    if(!user){
        throw new ApiError(404, "User not found");
    }

    const {oldPassword, newPassword} = req.body;

    if(!oldPassword || !newPassword){
        throw new ApiError(400, "Old password and new password are required");
    }

    // Validate new password length
    if(newPassword.length < 6){
        throw new ApiError(400, "New password must be at least 6 characters long");
    }

    // Skip password check for OAuth users
    if(user.password && user.password !== "oauth"){
        const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
        if(!isPasswordCorrect){
            throw new ApiError(400, "Current password is incorrect");
        }
    }

    user.password = newPassword;
    await user.save();

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"))
});