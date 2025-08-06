import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import User from "../models/user.model.js"

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try{
        const user = await User.findById(id);
        done(null, user);
    } catch (error){
        done(error, null);
    }
});


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
    callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async(accessToken, refreshToken, profile, done) => {
    
}))