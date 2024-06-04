import mongoose from "mongoose";
import { DB_NAME } from "../dbName.js";

 const connectDb = async () => {
    try {
        const conectionInstance = await mongoose.connect(`${process.env.MONODB_URI}/${process.env.DB_NAME}`);
    
        console.log(`Connected to ${DB_NAME} at ${conectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB Connection Failed!! ", error);
    }
}

export default connectDb;