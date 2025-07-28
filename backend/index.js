import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js"
import { signup, login } from "./controllers/auth.controller.js";
import bodyParser from 'body-parser';
import cors from 'cors'

dotenv.config({
    path: "./.env"
})

const app = express();
const router = express. Router();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', router)
//routers
router.post('/signup', signup);
router.post('/login', login);

//db connection 
connectDB().then(()=> {
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`server is running at port ${process.env.PORT || 8000}`)
    })
}).catch((error)=> {
    console.log("Mongodb connection failed ", error)
})
