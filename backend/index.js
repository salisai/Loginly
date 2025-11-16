import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/index.js"
import bodyParser from 'body-parser';
import cors from 'cors'
import authRoutes from "./routes/auth.routes.js"
import oauthRoutes from "./routes/oauth.routes.js"
import cookieParser from "cookie-parser";
import passport from "passport";
import "./config/passport.js"
import {verifyToken} from "./middleware/auth.middleware.js"

dotenv.config({
    path: "./.env"
})

const app = express();

app.use(cookieParser());
//cors middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(passport.initialize());
//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



//routing
app.use('/api/auth', authRoutes)
app.use("/api/auth", oauthRoutes);

//default route
app.get("/", (req, res) => {
    res.send("Server is running")
})

app.get("/api/auth/me",verifyToken, (req, res) => {
    res.json({user: req.user});
})


//db connection 
connectDB().then(()=> {
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`server is running at port ${process.env.PORT || 8000}`)
    })
}).catch((error)=> {
    console.log("Mongodb connection failed ", error)
})
