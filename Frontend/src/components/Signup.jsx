import React ,{useState} from 'react'
import {Link  , useNavigate} from "react-router-dom";
import {login as authLogin} from "../store/authSlice";
import {Button ,Input ,Logo} from "./index"
import { useDispatch } from 'react-redux';
import {useForm} from "react-hook-form";
import axios from "axios";


const Signup = () => {
    const navigate=useNavigate();
    const [error ,setError]=useState("");
    const dispatch =useDispatch();
    const {register , handleSubmit , reset}=useForm();

    //function that will be called when in the button present in the Signup form will  be clicked
   const createAccount= async(data)=>{
    setError("");
    try{
        //send the data to the backend signup route
        const res=await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/signup`,

          data,

          {withCredentials:true} //allow the cookie to be stored

        );
        console.log("Signup Response:", res.data);

        if(res.data?.statusCode==200){
            alert("Account created successfully!");

            const user=res.data.data;
            dispatch(authLogin({userData:user})); //update the redux state

            reset(); //clear inputs
            navigate("/");
        }else { setError("Signup failed");}
    }catch(err){
      
        console.log(err);
        setError(err.response?.data.message || err.message || "Signup failed! . Try again");
    }
   };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
       <Logo/>
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create an account
        </h2>

        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(createAccount)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Username:"
              placeholder="Enter your username"
              {...register("username", { required: true, minLength: 3 })}
            />

            <Input
              label="Password:"
              placeholder="Enter your password"
              type="password"
              {...register("password", { required: true, minLength: 3 })}
            />

            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
