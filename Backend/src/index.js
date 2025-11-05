import dotenv from "dotenv";
import connectDb from "./models/db_connect/index.js";
import {app} from "./app.js";

dotenv.config({
    path: "./.env"
})


connectDb().
then(()=>{
    app.listen(process.env.PORT ,()=>{
     console.log(`Server listening on port ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("mongodb connection failed!!");
})