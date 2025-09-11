import { compare } from "bcryptjs";
import User from "../Models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const maxAgeSeconds = 3 * 24 * 60 * 60; // 3 days

const createToken = ({ userRole, userId }) => {
  return jwt.sign({ userRole, userId }, process.env.JWT_SECRET, { expiresIn: maxAgeSeconds });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if ([name, email, password].some(field => !field)) {
      return res.status(400).send("Please fill all the fields");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword }); 

    await newUser.save();

    const token = createToken({ userRole: newUser.role, userId: newUser._id });

    res.status(201).json({ success: true, user: newUser, jwt: token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if ([email, password].some(field => !field)) {
      return res.status(400).send("Please fill the required fields");
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).send("User does not exist, signup first");
    }

    const auth = await compare(password, existingUser.password);
    if (!auth) {
      return res.status(400).send( {success:false,message:"Invalid credentials"});
    }

    const token = createToken({ userRole: existingUser.role, userId: existingUser._id });

    res.status(200).json({ success: true, user: existingUser, jwt: token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// getuserinfo
export const getUserInfo = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const userData = await User.findById(userId);
        if (!userData) {
            return res.status(404).send("user with the given not found");
        }

        res.status(200).json({
            user: userData,
            success: true,
            message: "user data fetched successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}


