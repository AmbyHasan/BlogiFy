import {Router} from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { CreatePost} from "../controllers/posts.controllers.js";
import { UpdatePost } from "../controllers/posts.controllers.js";
import { GetPost } from "../controllers/posts.controllers.js";
import { DeletePost } from "../controllers/posts.controllers.js";
import { ListPosts } from "../controllers/posts.controllers.js";
import { GetUserPosts } from "../controllers/posts.controllers.js";



const postRouter=Router();
postRouter.route("/api/v1/posts/create-post").post( verifyJwt ,  upload.single("featuredImage") , CreatePost );

postRouter.route("/api/v1/posts/update-post/:id").put(verifyJwt ,  upload.single("featuredImage") , UpdatePost);

postRouter.route("/api/v1/posts/delete-post/:id").delete(verifyJwt, DeletePost);
postRouter.route("/api/v1/posts/get-post/:id").get(verifyJwt, GetPost);
postRouter.route("/api/v1/posts/list-posts").get(verifyJwt, ListPosts);
postRouter.route("/ap1/v1/posts/get-user-posts").get(verifyJwt, GetUserPosts);





export default postRouter;
