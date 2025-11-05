import mongoose ,{Schema} from "mongoose";


const postSchema=new Schema({
    title:{
        type:String ,
        required:true  ,
        trim:true
    } ,
    slug:{
        type:String  , 
       
        lowercase:true  ,
        unique:true
    } ,
    content:{
        type:String ,
        required:true
    } ,
    featuredImage:{
        type:String ,
        required:true 
    } ,
    status:{  //is active or not
       type:Boolean ,
       default:true
    } ,
    userId:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:"User" ,
        required:true
    }
} ,{timestamps:true});


// Pre-save hook to generate slug from title
postSchema.pre("save", async function (next) {
  if (this.isModified("title")) {
    let slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")   // replace spaces and special chars with hyphen
      .replace(/(^-|-$)+/g, "");     // remove leading/trailing hyphens

    // Ensure slug is unique
    const Post = mongoose.model("Post", postSchema);
    const existing = await Post.findOne({ slug });
    if (existing) {
      slug = slug + "-" + Date.now(); // append timestamp if duplicate
    }

    this.slug = slug;
  }
  next();
});

const Post=mongoose.model("Post" , postSchema);
export default Post;