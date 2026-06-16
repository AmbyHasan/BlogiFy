import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Post() {
    const [post, setPost] = useState(null);
    const { id } = useParams();  // assuming route is /post/:id
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData._id : false;

    useEffect(() => {
        if (id) {
            axios.get(`${import.meta.env.VITE_API_URL}/api/posts/get-post/${id}`)
                .then((res) => {
                    if (res.data.success) setPost(res.data.post);
                    else navigate("/");
                })
                .catch(() => navigate("/"));
        } else {
            navigate("/");
        }
    }, [id, navigate]);

    const deletePost = async () => {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/posts/delete-post/${id}`, {
                headers: {
                   withCredentials: true,
                },

            });
            if (res.data.success) {
                navigate("/");
            }
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={`${import.meta.env.VITE_API_URL}/uploads/${post.featuredImage}`}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post._id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">{parse(post.content)}</div>
            </Container>
        </div>
    ) : null;
}
