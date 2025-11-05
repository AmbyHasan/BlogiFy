import {Router} from "express";

import { SignUpUser } from "../controllers/user.controllers.js";
import { SignInUser } from "../controllers/user.controllers.js";
import { LogOutUser } from "../controllers/user.controllers.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { getCurrentUser } from "../controllers/user.controllers.js";
import { refreshAccessToken } from "../controllers/user.controllers.js";

const userRouter=Router();
//user routes
userRouter.route("/signup").post(SignUpUser);
userRouter.route("/signin").post(SignInUser);
userRouter.route("/logout").post( verifyJwt,LogOutUser);
userRouter.route("/current-user").get(verifyJwt, getCurrentUser);
userRouter.route("/refresh-token").post( refreshAccessToken );



export default userRouter;