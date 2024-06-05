import express from "express";
import cookieParser from "cookie-parser";



const app = express();

app.use(express.json());


app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// imporing routes
import authRouter from "./routes/auth.route.js"

app.use("/api/v1/auth", authRouter)


export  { app };