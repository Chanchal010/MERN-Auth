import jwt from "jsonwebtoken";
import { ApiError } from "./ApiError.js";



export const verifyUser = (req, res, next) => {
    const token = req.cookies?.access_token;
    // console.log("token ",token);
    if (!token) return next( new ApiError(401, "'You are not authenticated!'"));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(
            new ApiError(
                403, 
                "Token is not valid!"
            )
        );

        req.user = user;
        next();
    });
}