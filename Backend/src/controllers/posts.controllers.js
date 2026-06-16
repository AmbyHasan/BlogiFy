import { asyncHandler } from "../utils/AsyncHandler.js";
import Post from "../models/posts.model.js"
import { ApiError } from "../utils/ApiError.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import fs from "fs";



//controller for creating a post
const CreatePost=asyncHandler(async(req ,res)=>{

 const {title , content ,status} =req.body;
 //because status is coming in string form i would have to change it into boolean for storing in database
 const postStatus = status === "active";


 //this file is coming form multer middleware
 if(!req.file){
      throw new ApiError(400 , "Missing post image");
 }
 const featuredImageLocalPath=req.file.path;

 console.log("FILE OBJECT:", req.file);
console.log("FILE PATH:", req.file?.path);

if (req.file?.path) {
    console.log(
        "FILE EXISTS:",
        fs.existsSync(req.file.path)
    );
}

 const uploadedPost= await uploadOnCloudinary(featuredImageLocalPath);
 if(!uploadedPost) throw new ApiError(400 , "Couldnt upload your post");

 const post = await Post.create({
    title , 
    content,
    status:postStatus ,
    userId:req.user._id, //from the middleware
    featuredImage:uploadedPost.url
 })

 if(!post) throw new ApiError(500 , "Error creating post in database");

 return res.status(200).json(new ApiResponse(200 ,{uploadedPost } ," Post uploaded successfully"));

})


//controller for updating a post
const UpdatePost=asyncHandler(async(req ,res)=>{

    const {id}= req.params;
    const {title ,content, status}= req.body;

    const post= await Post.findById(id);
    if(!post ) throw new ApiError(400 , "Post not found");
    
    if(req.file){
     const uploadedImage = await uploadOnCloudinary(req.file.path);
    post.featuredImage = uploadedImage.url;
    }

    if(title) post.title=title;
    if(content) post.content=content;
    if(status) post.status=status;

    await post.save({validateBeforeSave: false});
    res.status(200).json(new ApiResponse(200 , post ,"Post updated successfully"));
 })

 //controller for deleting post
 const DeletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findByIdAndDelete(id);
  if (!post) throw new ApiError(404, "Post not found");

  res.status(200).json(new ApiResponse(200, post, "Post deleted successfully"));
});

//controller for getting a single post
 const GetPost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);
  if (!post) throw new ApiError(404, "Post not found");

  res.status(200).json(new ApiResponse(200, post, "Post fetched successfully"));
});

//controller for getting all posts
 const ListPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 }); // newest first
  res.status(200).json(new ApiResponse(200, { posts }, "Posts listed successfully"));
});

//controller for getting user posts
const GetUserPosts = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const posts = await Post.find({ userId }).sort({ createdAt: -1 });
  res.status(200).json(new ApiResponse(200, { posts }, "User posts fetched successfully"));
});




export {CreatePost , UpdatePost ,GetPost ,DeletePost ,ListPosts , GetUserPosts};
