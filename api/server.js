import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import cookieparser from "cookie-parser";


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

// app.use("/api/v1/user" , userRotes);