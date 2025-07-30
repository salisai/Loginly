import mongoose, {Schema} from 'mongoose';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username: {
            type: String, 
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        email: {
            type: String,
            required: true, 
            unique: true,
            lowercase: true,
            trim: true
        }, 
        password: {
            type: String,
            required: true
        },
        refreshToken: {
            type: String
        }
        
    },{timestamps: true}
);


//hash before saving 
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next;

    this.password = await bcrypt.hash(this.password, 10);
    return next()
});

//inject method into the schema
userSchema.methods.isPasswordCorrect = async function(){
    return await bcrypt.compare(password, this.password)
}



//generate tokens
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}



//on logout
userSchema.methods.invalidateRefreshToken = async function (){
    this.refreshToken = null;
    await this.save();
}



export const User = mongoose.model("User", userSchema);