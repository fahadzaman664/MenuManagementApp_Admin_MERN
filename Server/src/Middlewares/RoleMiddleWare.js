import jwt from "jsonwebtoken";
const roleAuthorization = (...allowedRoles)=>{
 
    return (req,res,next)=>{
        if(!allowedRoles.includes(req.user.userRole)){
            return res.status(403).json({message:"access denied"});
        }
        next();
    }
}
export default roleAuthorization;