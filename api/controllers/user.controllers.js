import User from "../models/user.models.js";
import bcryptjs from "bcryptjs";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponse.js";



export const updateUser = async (req, res, next) => {

    const { id } = req.params;
    const { _id } = req.user;

    if (String(id) !== String(_id)) {
        throw new ApiError(401, "You can only update your own profile");
    }
//     if (req.user._id !== req.params.id) {
//         throw new ApiError(401, "You can only update your own profile");
//     }

   try {
     if (req.body.password) {
         req.body.password = bcryptjs.hashSync(req.body.password, 10);
     }

     const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                profilePic: req.body.profilePic,
            },
        },
        { new: true }
     );
     const { password, ...rest } = updatedUser._doc;

     res
     .status(201)
     .json(
        new ApiResponce(
            201, 
            { user: rest },
            "User updated successfully", 
        ));

   } catch (error) {
    next(error);
   }
};


export const deleteUser = async (req, res, next) => {
    if (req.user._id !== req.params.id) {
        throw new ApiError(401, "You can only delete your own profile");
    }

    try {
        await User.findByIdAndDelete(req.params.id);
        res
        .status(201)
        .json(
            new ApiResponce(
                201, 
                { user: null },
                "User deleted successfully", 
            ));
        
    } catch (error) {
        next(error);
    }
}