import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";



export const verifyJwt=asyncHandler( async(req ,res ,next)=>{
   try {
     const token=req.cookies?.accesstoken || req.header("Authorization")?.replace("Bearer" ,"");
 
     if(!token) throw new ApiError(401 , "Unauthorized Header");
     //now decode this token
     
 
     const decodedToken=jwt.verify(token , process.env.ACCESS_TOKEN_SECRET);
 
     const user =await User.findById(decodedToken._id).select("-password");
     if(!user) throw new ApiError(401 ,"Invalid access token");
 
     req.user=user;
     next();
   } catch (error) {
      throw new ApiError(401 ,error.message || "Invalid access token");
   }
})