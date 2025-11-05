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
postRouter.route("/create-post").post( verifyJwt ,  upload.single("featuredImage") , CreatePost );

postRouter.route("/update-post/:id").put(verifyJwt ,  upload.single("featuredImage") , UpdatePost);

postRouter.route("/delete-post/:id").delete(verifyJwt, DeletePost);
postRouter.route("/get-post/:id").get(verifyJwt, GetPost);
postRouter.route("/list-posts").get(verifyJwt, ListPosts);
postRouter.route("/get-user-posts").get(verifyJwt, GetUserPosts);





export default postRouter;
