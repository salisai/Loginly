import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/index.js"
import bodyParser from 'body-parser';
import cors from 'cors'
import authRoutes from "./routes/auth.routes.js"

dotenv.config({
    path: "./.env"
})

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(bodyParser.json());

//routing
app.use('/api/auth', authRoutes)


//db connection 
connectDB().then(()=> {
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`server is running at port ${process.env.PORT || 8000}`)
    })
}).catch((error)=> {
    console.log("Mongodb connection failed ", error)
})
