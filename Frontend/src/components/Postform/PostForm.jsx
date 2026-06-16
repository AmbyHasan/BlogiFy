import React , {useCallback ,useEffect} from 'react'
import { useForm } from 'react-hook-form'
import {Button , Input , Select ,  RTE} from "../index.js"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axiosInstance from "../../api/axiosConfig"


//this is the post form component which will update the post if it already exists or will create a new post

const PostForm = ({post}) => {
    
  const {register , handleSubmit ,watch ,setValue , control , getValues}=useForm({

    defaultValues:{
      title : post?.title || "" ,
      slug : post?.slug || "",
      content: post?.content || "",
      status: post?.status || 'active',

    }})

    const navigate=useNavigate();
    const userData=useSelector( (state)=>state.auth.userData)

    //this is the submit handler that handler both create and update logic

    const submit=async(data)=>{
      try{
        const formData=new FormData();
        formData.append("title" , data.title);
        formData.append("slug", data.slug);
        formData.append("content", data.content);
        formData.append("status", data.status);
        formData.append("userId", userData?._id);

      
      if(data.image?.[0]){
        formData.append("featuredImage" , data.image[0]);
      }

      let response;

      if(post){ //is the post already exists then update the exisiting post
        
      response= await axiosInstance.put(
        //post id is present in the post prop
         `/api/v1/posts/update-post/${post._id}`,
         formData ,
         {
          withCredentials:true ,
          headers:{
             "Content-Type": "multipart/form-data",
          }
         }
      );

      }else{

          response=await axiosInstance.post(
             `/api/v1/posts/create-post`,
             formData ,
                       {
            withCredentials: true, //  include cookies
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
      }

       if (response.data?.statusCode===200) {
        alert(post ? " Post updated successfully!" : " Post created successfully!");
        navigate("/all-posts");
      }
      }catch (error) {
      console.error(" Error submitting post:", error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
    
    }

    //slug transform is a function that will be called again again therefore we are using useCallback in order to cache it
    const slugTransform = useCallback((value)=>{
        if(value && typeof value==="string"){
            return value
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '') // remove non-alphanumeric except spaces and hyphens
            .replace(/\s+/g, '-') // replace spaces with hyphens
            .replace(/-+/g, '-') // replace multiple hyphens with single hyphen
            .replace(/^-|-$/g, ''); // trim leading and trailing hyphens
               }
        return "";
                                             } ,[])
//in order to optimize watch method called inside the useEffect we use the subscribe - unsubscribe thing
     useEffect(()=>{
       //here we are watching title in order to generate slug
             const subscription = watch(( value , {name} )=>{
                   if(name==='title'){
                       setValue( "slug" , slugTransform(value.title , 
                        {shouldValidate : true}
                       )  )
                   }
         });
            return () => subscription.unsubscribe();
           }  , [watch ,slugTransform ,setValue] );

  return (
     <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post?.featuredImage && (
          <div className="w-full mb-4">
            <img
              src={`${import.meta.env.VITE_API_URL}/uploads/${post.featuredImage}`}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full cursor-pointer hover:bg-blue-800">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
  )
}

export default PostForm
