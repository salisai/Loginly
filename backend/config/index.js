import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_DB_URI}`);
        console.log(`\n MongoDB connected, DB host: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("Mongodb connection error", error);
        process.exit(1)
    }
}

export default connectDB;