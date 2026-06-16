import { asyncHandler } from "../utils/AsyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import z from "zod"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

import { generateAccessAndRefreshToken } from "../utils/generateAccessTokenAndRefreshToken.js"

const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
};




//controller for signup 
const SignUpUser= asyncHandler( async(req ,res)=>{
    

  //using zod for validating the inputs

     //defining the schema and writing rules for each field
     const requireBody = z.object({
       username: z.string().min(3).max(50),
       password: z.string().min(3).max(100)
         

    })

    //now we will check our inputs against the zod schema
    const parsedDataWithSuccess=requireBody.safeParse(req.body);
    if(!parsedDataWithSuccess.success){
        throw new ApiError(400 , "Invalid input")
    }
   //validated name and password
    const username=req.body.username;
    const password=req.body.password;

    //check if the user already exists in our db

    const response=await User.findOne({
        username
    });
    if(response) throw new ApiError(400 ,  "User already exists in our database");

    //now insert the values in the database

   const user=  await User.create({
        username:username,
        password:password
    })

    const createdUser= await User.findById(user._id).select("-password");
    if(!createdUser) throw new ApiError(400 , "Error while creating user");

    // Generate access and refresh tokens for auto-login
    const {accesstoken , refreshtoken}= await generateAccessAndRefreshToken(user._id);

   return res.status(200)
   .cookie("accesstoken"  , accesstoken , cookieOptions)
   .cookie("refreshtoken" , refreshtoken , cookieOptions)
   .json(new ApiResponse(200 , {user: createdUser, accesstoken, refreshtoken} , "User created successfully"));

    })


//controller for  signin
const SignInUser = asyncHandler( async(req  ,res)=>{
    const username=req.body.username;
    const password=req.body.password;

    if(!username || !password) throw new ApiError(400 ,"Please enter all feilds");

     //check if the user exists in the databse
     const user=await User.findOne({
        username:username
     })

     if(!user) throw new ApiError(400 , "User does not exists in our database");

     //now match the password entered by the user with the password that is present in database

     const isPasswordValid=await user.isPasswordCorrect(password);

     if(!isPasswordValid) throw new ApiError(400 , "Invalid password");

     //now generate access and refresh tokens
     const {accesstoken , refreshtoken}= await generateAccessAndRefreshToken(user._id);
      console.log(`access token ->${accesstoken} refershtoken -> ${refreshtoken}`);
    
     //now send the info to the user
     const loggedInUser= await User.findById(user._id).select("-password");

      return res.status(200)
        .cookie("accesstoken"  , accesstoken , cookieOptions)
        .cookie("refreshtoken" , refreshtoken ,cookieOptions)
      .json(new ApiResponse(200 ,
        {
        user : loggedInUser  , accesstoken , refreshtoken
      } 
      , "User Logged in successfully"));


})


//controller for logging out
const LogOutUser=asyncHandler(async (req ,res)=>{
    //sabse pehle refresh token hatao db se
     //kuki middleware se arhe hai isliye req me user attach kardiya tha to userid ka access hai mere pas
     const id=req.user._id;
    await User.findByIdAndUpdate(
        req.user._id ,
        {
          $unset:{refreshtoken:1} ,
        } ,{
             new:true
        }  
    )
    return res.status(200).clearCookie("accesstoken" ,cookieOptions).clearCookie("refreshtoken" ,cookieOptions)
    .json(new ApiResponse(200 ,{id} ,"user logged out successfully"));
})





//get the current user
const getCurrentUser= asyncHandler(async(req ,res)=>{
   //middleware me hi user object inject krdiya tha req ki body mein
   return res.status(200).
   json(new ApiResponse(200 , req.user , "current user fetched succesfully"));
})



//controller for refreshing the token
const refreshAccessToken=asyncHandler(async(req ,res)=>{
    //get the incoming refreshtoken
    const incomingRefreshToken=req.cookies?.refreshtoken || req.body.refreshtoken;

    if(!incomingRefreshToken) throw new ApiError(400 , "Unauthorized request");
    
    //now verify this token with jwt
   try {


     const decodedToken=  jwt.verify(incomingRefreshToken   , process.env.REFRESH_TOKEN_SECRET);
     
 
     //now get the id from this decoded token ,use that  id to find the user in the db 
     ///generate new access and refresh tokens , store them in the db and set the tokens in cookies as well
     const user= await User.findById(decodedToken._id);
     if(!user) throw new ApiError(400 , "the token is invalid");

     //now match the incomingRefreshToken with the one present in the database
     if(incomingRefreshToken!== user?.refreshtoken) throw new ApiError(400 , "The token is already used or expired");


     //now generate new access and refresh tokne
     const {accesstoken , refreshtoken} = await generateAccessAndRefreshToken(user._id);
     
     //update the refresh token present in the db
     user.refreshtoken=refreshtoken;
     await user.save({ validateBeforeSave: false });


     return res.status(200).cookie("accesstoken" , accesstoken , cookieOptions).cookie("refreshtoken" , refreshtoken , cookieOptions)
     .json(new ApiResponse(200 , {user , accesstoken , refreshtoken} , "New refresh token generated successfully"));
   } catch (error) {
      return new ApiError(400 , "unable to genrate refresh token")
   }
});

export {SignUpUser , SignInUser , LogOutUser ,refreshAccessToken , getCurrentUser};