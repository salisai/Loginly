import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/index.js"
import bodyParser from 'body-parser';
import cors from 'cors'
import authRoutes from "./routes/auth.routes.js"
import oauthRoutes from "./routes/oauth.routes.js"

import passport from "passport";
import { session } from "express-session";
import "./config/passport.js"

dotenv.config({
    path: "./.env"
})

const app = express();

//cors middleware
app.use(cors({
    origin: "http://localhost:5173",
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
