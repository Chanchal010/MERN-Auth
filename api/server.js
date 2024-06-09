import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import cookieparser from "cookie-parser";
import authRouter from './routes/auth.routes.js'
import userRouter from "./routes/user.routes.js"


dotenv.config(
    {path: "./.env"}
);

mongoose
.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB connected");
})
.catch((err) => console.log(err));


const app = express();
app.use(express.json());
app.use(cookieparser());



app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
})


//auth route import

app.use("/api/v1/auth" , authRouter);
app.use("/api/v1/user" , userRouter);
