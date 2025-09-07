import { compare } from "bcryptjs";
import User from "../Models/UserModel.js";
const maxAgeSeconds = 3 * 24 * 60 * 60; // 3 days in seconds
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
const createToken = ({userRole, userId})=>{
   return jwt.sign({userRole, userId}, process.env.JWT_SECRET, {expiresIn:maxAgeSeconds });
}
export const register = async (req, res)=>{
  try { 
    const {name, email , password, role  } = req.body;
    if([name, email, password, role].some(field=>!field)){
        res.status(400).send("please fill all the fields")
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const PresentUserEmail = await User.findOne({email});
    if(PresentUserEmail){
        return res.status(400).send("user already present")
    }

    const newUser = await User({
        name, email, password:hashedPassword, roles:role
    });
    await newUser.save();
    const token = createToken({userRole:newUser.role, userId:newUser._id});
    res.status(200).json({success:true, user:newUser, jwt:token});

    
  } catch (error) {
     console.log(error)
  }

}

export const login = async (req, res)=>{
  try {
     const  {email, password} = req.body;
     if([email, password].some(field=> !field)){
     return res.status(400).send("please fill the required field");
     }

     const existingUser= await User.findOne({email});
     if(!existingUser){
      return res.status(400).send("user nor exist , signup first");
     }

     const auth = await compare(password,existingUser.password);
     if(!auth){
      return res.status(400).send("invalid credentials")
     }

     const token = createToken({userRole:existingUser.role, userId:existingUser._id})

     res.status(200).json({success:true, user:existingUser, jwt:token})
  } catch (error) {
     res.status(500).send(error);
  }
}