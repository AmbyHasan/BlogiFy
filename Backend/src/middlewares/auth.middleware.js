import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";



export const verifyJwt=asyncHandler( async(req ,res ,next)=>{
  try {
  const token =
    req.cookies?.accesstoken ||
    req.header("Authorization")?.replace("Bearer ", "");

  console.log("TOKEN RECEIVED:", token);
  console.log("SECRET:", process.env.ACCESS_TOKEN_SECRET);

  const decodedToken = jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET
  );

  console.log("DECODED TOKEN:", decodedToken);

  const user = await User.findById(decodedToken._id);

  console.log("USER FOUND:", user);

  if (!user) {
    throw new ApiError(401, "User not found");
  }

  req.user = user;
  next();
} catch (error) {
  console.log("JWT ERROR:", error);
  throw new ApiError(401, error.message);
}
})