import { User} from "../models/user.model.js"
import { ApiError } from "./ApiError.js";


const generateAccessAndRefreshToken=async( userId)=>{
   console.log("UserID:", userId);
    try{
    const user= await User.findById(userId);
    if(!user) throw new ApiError(400 ,"User does not exists in our db");
    const accesstoken= await user.generateAccessToken();
    const refreshtoken= await user.generateRefreshToken();
   

    user.refreshtoken=refreshtoken; //storing the refersh token in db
    await user.save({validateBeforeSave:false});
    return {accesstoken , refreshtoken};


    }catch(error){
      throw new ApiError(500 , "Error while generating access and refresh token");
    }

}
export {generateAccessAndRefreshToken}