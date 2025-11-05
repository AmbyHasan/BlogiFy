//multer has taken the file from the request and has uploaded it on our local server
//we have the path of that file
//we will upload that file on the cloudinary now
//after that we will remove our file from our local server

import {v2 as cloudinary} from "cloudinary";
import fs from "fs";


cloudinary.config({
   cloud_name:process.env.CLOUDINARY_CLOUD_NAME ,
    api_key:process.env.CLOUDINARY_API_KEY ,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary= async(localFilePath)=>{
    if(!localFilePath) return null;
try{
    //upload the file on cloudinary
   const response =await cloudinary.uploader.upload(localFilePath ,{
        resource_type:"auto"
    })
    //file has been uploaded succesfulle
    console.log("File is uploaded on cloudinary " ,response.url);

        // Remove local file
         if (fs.existsSync(localFilePath)) {
             fs.unlinkSync(localFilePath);
         }

    return response;

}catch(error){
    //file cloudinary pe to upload nhi ho payi but use server se to hatana padega
    if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
    }
    return null;

}
}
export default uploadOnCloudinary;



