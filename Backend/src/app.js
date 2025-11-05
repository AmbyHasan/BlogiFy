import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app=express();
app.use(cors({
    origin: 'http://localhost:5173' || 'http://localhost:5174',
    credentials:true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" })); //to parse the data that comes from url
app.use(express.static("public")); //some assests(files , photos) that i will store on the server itself
app.use(cookieParser());
app.use("/uploads", express.static("./public/temp"));

import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js"

app.use("/api/v1/user" , userRouter);
app.use("/api/v1/posts" ,postRouter);

export {app}