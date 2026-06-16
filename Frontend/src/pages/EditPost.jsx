import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, PostForm } from "../components";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPost] = useState(null);
  const { id } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) {
        navigate("/");
        return;
      }

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/posts/get-post/${id}`, {
          withCredentials: true, // include cookies if auth uses cookies
        });

        if (res.data?.success && res.data.data) {
          setPost(res.data.data);
        } else {
          console.error("Post not found or fetch failed");
          navigate("/"); // redirect if post not found
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        navigate("/");
      }
    };

    fetchPost();
  }, [id, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : (
    <p className="text-center mt-10 text-gray-500">Loading post...</p>
  );
}

export default EditPost;
