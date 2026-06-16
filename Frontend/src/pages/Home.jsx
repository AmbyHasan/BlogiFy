import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);

  const fetchPosts = async () => {
    try {
      const res = await axiosInstance.get(`/api/v1/posts/get-user-posts`, {
        withCredentials: true,
      });

      if (res.data?.statusCode === 200) {
        setPosts(res.data.data.posts);
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    }
  };

  useEffect(() => {
    if (authStatus) {
      fetchPosts();
    }
  }, [authStatus]);

  if (!authStatus) { //the user is not logged in
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap justify-center">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold text-gray-700 hover:text-gray-500">
                Login To Read Your Posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  const handleDelete = async (postId) => {
    try {
      await axiosInstance.delete(`/api/v1/posts/delete-post/${postId}`, {
        withCredentials: true,
      });
      //after deleting the post call fetchPosts again for rendering the remaining post
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} className="p-2 w-1/4">
                <PostCard {...post} onDelete={handleDelete} showEditDelete={true} />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 w-full">No posts available.</p>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Home;

