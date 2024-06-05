import { app } from "./app.js";
import dotenv from "dotenv";
import connectDb from "./db/connectDb.js";


dotenv.config({
    path: "./.env",
});


connectDb()
.then(() => {
    app.listen(process.env.PORT || 8080, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log("MongoDB Connection ERROR!! ", error);
})
