import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, PostCard } from "../components";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from backend
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/posts/list-posts`, {
          withCredentials: true, //  include cookies if using auth cookies
        });

        if (res.data?.statusCode === 200) {
          setPosts(res.data.data.posts); // Backend sends { statusCode: 200, data: { posts }, message }
        } else {
          console.error("Failed to fetch posts");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.length > 0 
          ? (
            posts.map((post) => (
              <div key={post._id} className="p-2 w-1/4">
                <PostCard {...post} showEditDelete={false} />
              </div>
            ))
          ) 
          : (
            <p className="text-center text-gray-500 w-full">No posts available.</p>
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
