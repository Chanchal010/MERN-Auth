import { User } from "../models/auth.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
  
    const emptyIfo = [username, email, password].some((fields) => fields?.trim());
  
    if (emptyIfo === "") {
      throw new ApiError(401, "Please fill all the fields");
    }
  
    const existedUser = await User.findOne({
      $or: [
          { username }, 
          { email }
      ],
    });
  
    if (existedUser) {
      throw new ApiError(401, "User already exists");
    }
  
    const user = await User.create({
      username,
      email,
      password,
    });
  
    const createdUser = await User.findById(user._id).select("-password");
  
    if(!createdUser) {
      throw new ApiError(401, "Somthig went wrong while registering user");
    }
  
    return res
    .status(201)
    .json(
      new ApiResponse(
          201,
          createdUser,
          "User created successfully"
      )
    )
  } catch (error) {
    throw new ApiError(500, error.message || "Something went wrong");
  }

};
