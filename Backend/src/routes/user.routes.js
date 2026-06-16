import {Router} from "express";

import { SignUpUser } from "../controllers/user.controllers.js";
import { SignInUser } from "../controllers/user.controllers.js";
import { LogOutUser } from "../controllers/user.controllers.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { getCurrentUser } from "../controllers/user.controllers.js";
import { refreshAccessToken } from "../controllers/user.controllers.js";

const userRouter=Router();
//user routes
userRouter.route("/api/v1/user/signup").post(SignUpUser);
userRouter.route("/api/v1/user/signin").post(SignInUser);
userRouter.route("/api/v1/user/logout").post( verifyJwt,LogOutUser);
userRouter.route("/api/v1/user/current-user").get(verifyJwt, getCurrentUser);
userRouter.route("/api/v1/user/refresh-token").post( refreshAccessToken );



export default userRouter;