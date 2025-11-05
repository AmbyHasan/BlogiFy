import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser";



//POST CARD COMPONENT
//this post card component has to be rendered in to forms 
//1. where all the posts are shown (showEditDelete = false)
//2. where only the users posts are shown (showEditDelete = true)


function PostCard({ _id, title, featuredImage, userId, onDelete, showEditDelete = true ,content }) {
  const currentUserId = useSelector((state) => state.auth.userData?._id);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      onDelete(_id);
    }
  };

  const getContentSnippet=(html)=>{
    if(!html) return "No content available with the post!!";
    const text =html.replace(/<[^>]*>/g, ''); // Strip HTML tags
     return text.length > 150 ? text.substring(0, 150) + '...' : text; 
  }

  return (
    <div className="w-full bg-gray-100 rounded-xl p-4 hover:shadow-lg duration-200">
      <Link to={`/post/${_id}`}>
        <div className="cursor-pointer">
          <div className="w-full mb-4">
            <img
              src={featuredImage || "/placeholder.png"} // fallback image if none
              alt={title}
              className="rounded-xl w-full h-48 object-cover"
            />
          </div>
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="overflow-hidden">{getContentSnippet(content)}</p>
        </div>
      </Link>
      {showEditDelete && currentUserId === userId && (
        <div className="mt-4 flex gap-2">
          <Link to={`/edit-post/${_id}`}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Edit
            </button>
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default PostCard;
