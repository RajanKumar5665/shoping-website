import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";


//register controller
export const regsiterUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration Succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//Login contoller
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isProd = process.env.NODE_ENV === "production";

    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.status(404).json({
        success: false,
        message: "User doesn't exit",
      });

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch)
      return res.status(401).json({
        success: false,
        message: "Password doesn't Match",
      });
    const token = jwt.sign(
      {
        userId: checkUser._id,
        role: checkUser.role,
        userName: checkUser.userName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "strict",
        maxAge: 60 * 60 * 1000, // 1 hour
      })
      .status(200)
      .json({
        success: true,
        message: "Logged in successfully",
        user: {
          userId: checkUser._id,
          role: checkUser.role,
          userName: checkUser.userName,
        },
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//Logot controller
export const logoutUser = (req, res) => {
   const isProd = process.env.NODE_ENV === "production";
   res
       .clearCookie("token", {
         httpOnly: true,
         secure: isProd,
         sameSite: isProd ? "none" : "strict",
         })
         .status(200)
         .json({
           success: true,
           message: "Logged out successfully",
         });
}

//auth middleware
export const authMiddleware = (req, res, next) => {
   const token = req.cookies.token;
   if (!token) {
     return res.status(401).json({
       success: false,
       message: "Unauthorized access",
       });
   }
   try {
     const decoded = jwt.verify(token, process.env.JWT_SECRET);
       req.user = decoded;
         next();
   } catch (error) {
       return res.status(401).json({
         success: false,
         message: "Invalid token",
       });
   }
};