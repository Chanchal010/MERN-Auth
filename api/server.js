import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import cookieparser from "cookie-parser";
import authRouter from './routes/auth.routes.js'
import userRouter from "./routes/user.routes.js"
import path from "path";


dotenv.config(
    {path: "./.env"}
);

mongoose
.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB connected");
})
.catch((err) => console.log("mongo error",err));

//directory for static files
const __dirname = path.resolve();

const app = express();

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
})
app.use(express.json());

app.use(cookieparser());



app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
})


//auth route import

app.use("/api/v1/auth" , authRouter);
app.use("/api/v1/user" , userRouter);
