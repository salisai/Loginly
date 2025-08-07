import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import { User } from "../models/user.model.js";


passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.OAUTH_CLIENT_SECRET_URL}/google/callback`
        },
        //callback
        async(accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value;
                const existingUser = await User.findOne({email});

                //if user exists return otherwise create new user.
                if(existingUser) return done(null, existingUser);
                const newUser = await User.create({
                    username: profile.displayName.toLowerCase().replace('/\s+g, ""'),
                    email, 
                    password: "oauth"
                })

                return done(null, newUser);
            } catch (error) {
                done(error, false);
            }
        }
    )
);

//oauth using github
passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: `${process.env.OAUTH_CALLBACK_URL}/github/callback`
        },

        async(accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value;
                const existingUser = await User.findOne({email});

                if (existingUser) return done(null, existingUser);

                const newUser = await User.create({
                    username: profile.username, 
                    email, 
                    password: "oauth"
                });

                return done(null, newUser);
            
            } catch (error) {
                done(error, false);
            }
        }
    )
);


//what do you want to store in the cookie
passport.serializeUser((user, done) => done(null, user._id));

//how do you get the full user back later.
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id).select("-password -refreshToken");
    done(null, user);
})