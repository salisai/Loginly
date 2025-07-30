import bcrypt from "bcrypt";
import User from "../models/user.model.js"
import jwt from "jsonwebtoken";
import { asyndHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js"



const createTokens = async(userId) => {
    try {
        const user = await User.findById(userId);

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateAccessToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});

        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens")
    }
}

//signup controller
export const signup = asyndHandler(async(req, res) => {

    const {username, email, password} = req.body;
    
    // Basic validation
    if (!username || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const existingUser = await User.findOne({$or:[{username}, {email}]});
    if (existingUser) {
        throw new ApiError(409, "User with email or username already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        username, 
        email, 
        password: hashedPassword
    });
    
    const createdUser = await User.findById(newUser._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
});



//login controller
export const login = asyndHandler(async(req, res) => {

    const {email, password} = req.body;

    if(!(username || email)){
        throw new ApiError(400, "Username or password required")
    }

    const user = await User.findOne({
        $or: [{email}, {username}]
    });
    
    if(!user) throw new ApiError(404, "User does not exists")

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) throw new ApiError(401, "Invalid credentials")

    const {accessToken, refreshToken} = await createTokens(user._id);
    
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    
    const options = {
        httpOnly: true,
        secure: true
    }
    
    user.refreshToken = refreshToken;
    await user.save();

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200, {
            user: loggedInUser, accessToken, refreshToken
        },
    "User logged in successfully"
    ))
})



//logout controller
export const logout = asyndHandler(async(req, res) => {
    const userId = req.user?._id;

    if(!userId){
        throw new ApiError(401, "Unauthorized request");
    }

    User.findByIdAndUpdate(
        userId,
        {
            $unset: {refreshToken: 1}
        },
        {
            new: true
        }
    );

    const CookieOptions = {
        httpOnly: true,
        secure: true,
    }

    res.clearCookie("accessToken", CookieOptions);
    res.clearCookie("refreshToken", CookieOptions);

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "User logged out"));
})




//refresh token rotation
export const refreshAccessToken = asyndHandler(async(req, res) => {
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

    const {accessToken, refreshToken} = createTokens(user);
    user.refreshToken = refreshToken;
    await user.save();


    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true, 
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json(new ApiResponse(200, {accessToken}, "Token refreshed successfully"))
});



const changeCurrentPassword = asyndHandler(async(req, res)=>{
    const user = await User.findById(req.user?._id);

    const {oldPassword, newPassword} = req.body;

    const isPasswordCorrect = await user.isPasswordCorrect()
    if(!isPasswordCorrect){
        throw new ApiError(400, "Invalid password");
    }

    user.password = newPassword;

    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"))
});