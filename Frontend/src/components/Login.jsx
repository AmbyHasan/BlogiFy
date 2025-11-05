import React , {useState} from 'react'
import {Link  , useNavigate} from "react-router-dom";
import {login as authLogin} from "../store/authSlice"; //reducer from authSlice 
import {Button ,Input ,Logo} from "./index"
import { useDispatch } from 'react-redux';
import {useForm} from "react-hook-form";
import axios from "axios";


function Login() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {register , handleSubmit} = useForm(); //comes from form hook
    const [error , setError]=useState("");

    const login=async(data)=>{

        setError(""); //clean out the error

        try{
            //call the node js bakcend with login api
            const res= await axios.post(
              "http://localhost:8000/api/v1/user/signin",
              {
                username:data.username ,
                password:data.password ,
              }   ,
              {withCredentials:true}
            );

        if(res.data.statusCode==200){ //the user logged in successfully
            const userData= res.data.data.user;
            dispatch(authLogin({userData})); //update the redux state
            navigate("/") //since the user has logged so navigate him to other route  now


        }else{
            setError(res.data.message || "Login failed")
        }

         }catch(error){
           console.log(error);
           setError(error.response?.data?.message || error.message || "Login failed");
        }
    };

  return (
      <div className="flex items-center justify-center w-full min-h-screen bg-gray-300">
      <div className="mx-auto w-full max-w-lg bg-white rounded-xl p-10 border border-black/10 shadow">
        <div className="mb-4 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>


        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>

        </p>

      {/* displaying the error */}
      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}



        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            {/* Username input */}
            <Input
              label="Username: "
              placeholder="Enter your username"
              type="text"
              {...register("username", { required: "Username is required" })}
            />

            {/* Password input */}
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
            />

            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
