import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import { User } from "../models/user.model.js";


passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.OAUTH_CALLBACK_URL}/google/callback`
        },
        //callback
        async(accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value;
                if(!email){
                    return done(new Error("Email not provided by Google"), false);
                }

                const existingUser = await User.findOne({email});

                //if user exists return otherwise create new user.
                if(existingUser) return done(null, existingUser);
                
                // Generate unique username
                let username = profile.displayName?.toLowerCase().replace(/\s+/g, "") || email.split("@")[0];
                let baseUsername = username;
                let counter = 1;
                
                // Ensure username is unique
                while(await User.findOne({username})){
                    username = `${baseUsername}${counter}`;
                    counter++;
                }

                const newUser = await User.create({
                    username,
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
                const email = profile.emails?.[0]?.value || `${profile.username}@github.com`;
                const existingUser = await User.findOne({email});

                if (existingUser) return done(null, existingUser);

                // Generate unique username
                let username = profile.username || email.split("@")[0];
                let baseUsername = username;
                let counter = 1;
                
                // Ensure username is unique
                while(await User.findOne({username})){
                    username = `${baseUsername}${counter}`;
                    counter++;
                }

                const newUser = await User.create({
                    username,
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

// Serialize user for session
passport.serializeUser((user, done) => {
    done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});


