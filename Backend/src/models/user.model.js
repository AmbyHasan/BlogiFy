import mongoose ,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    username:{
        type:String ,
        required:true,
        unique:true,
        trim: true,
    } ,
    password:{
        type:String,
        required:true
    } ,
    refreshtoken: {
    type: String, // store the latest refresh token
  },
})

//this method runs before the document is being saved in the collection
userSchema.pre("save" , async function(next){
    if(!this.isModified("password")) return next();
    this.password=await bcrypt.hash(this.password ,10);
    next();

})

//checking is the password is correct
userSchema.methods.isPasswordCorrect= async function(password){
 return  await bcrypt.compare(password , this.password) ; //comparing the encrypted password and the password send by the user
}


//generating the access token
userSchema.methods.generateAccessToken=async function(){
  return jwt.sign(
    {
        _id:this.id,
        username:this.username,
      
    } ,
     process.env.ACCESS_TOKEN_SECRET , 
     {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
     }
   )
}


//generating the refersh token
userSchema.methods.generateRefreshToken=async function(){
 return jwt.sign(
    {
        _id:this.id,
    } ,
     process.env.REFRESH_TOKEN_SECRET , 
     {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
     }
   )
}

const User= mongoose.model("User" , userSchema);
export {User};