import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/index.js"
import bodyParser from 'body-parser';
import cors from 'cors'
import authRoutes from "./routes/auth.routes.js"
import oauthRoutes from "./routes/oauth.routes.js"
import articleRoutes from "./routes/article.routes.js";


import passport from "passport";
import session from "express-session";
import "./config/passport.js"

dotenv.config({
    path: "./.env"
})

const app = express();

// app.set("trust proxy", 1);//for production

// origin should be exactly your frontend URL, not "*"
// If you want it to work both in local and production, you can allow multiple origins
// Google/GitHub OAuth callback usually comes from your backend domain, so cookies need sameSite: "None" in prod
// You must also set app.set('trust proxy', 1) if you’re behind a proxy (like Vercel, Render, or Nginx)
//cors middleware

const allowedOrigins = [process.env.CLIENT_URL, "http://localhost:5173"]
app.use(cors({
    origin: function(origin, callback){
        if(!origin || allowedOrigins.includes(origin)){
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true
}));




//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(session({
    secret: process.env.SESSION_SECRET ||  "default_session_secret", 
    resave: false, 
    saveUninitialized: false,
    cookie: {
        httpOnly: true, 
        secure: false, //in prod set true
        sameSite: "Lax"
    }
}));

//passport setup
app.use(passport.initialize());
app.use(passport.session());
//routing
app.use('/api/auth', authRoutes)
app.use("/api/auth", oauthRoutes);

app.use("/api/article", articleRoutes)

//default route
app.get("/", (req, res) => {
    res.send("Server is running")
})


//db connection 
connectDB().then(()=> {
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`server is running at port ${process.env.PORT || 8000}`)
    })
}).catch((error)=> {
    console.log("Mongodb connection failed ", error)
})
