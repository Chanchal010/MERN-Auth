import User from "../models/user.models.js";
import bcryptjs from 'bcryptjs';

export const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  
  const hashedPassword = bcryptjs.hashSync(password, 10);


  const newUser = new User({
    username,
    email,
    password,
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
