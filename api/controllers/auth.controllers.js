import User from "../models/user.models.js";
import bcryptjs from 'bcryptjs';
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { ApiResponce } from "../utils/ApiResponse.js";

let options = {
  httpOnly:true,
  secure:true
}

export const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  
  const hashedPassword = bcryptjs.hashSync(password, 10);


  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();

    res
    .status(201)
    .json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error || "Internal server error" });
  }
};


export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      throw new ApiError(400, "User not found");
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      throw new ApiError(400, "Invalid password");
    }

    const token = jwt.sign(
      { _id: validUser._id},
      process.env.JWT_SECRET
    )
    console.log(token);

    // const {password : hashedPassword, ...rest} = validUser._doc;

    const loggedInUser = await User.findById(validUser._id).select("-password");

    res
    .status(200)
    .cookie("access_token", token, options)
    .json(
      new ApiResponce(
        200,
        {
          user: loggedInUser,token
        },
        "User logged in successfully"
      )
    );
  } catch (error) {
    next(error);
  }

}