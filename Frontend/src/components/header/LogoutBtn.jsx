import React from 'react'
import {useDispatch} from "react-redux";
import { logout } from '../../store/authSlice';
import axiosInstance from "../../api/axiosConfig";



function LogoutBtn() {
    const dispatch=useDispatch();

    const logoutHandler=async()=>{
    try{
        //calling the backend API
        const res=await axiosInstance.post(`/api/v1/user/logout` ,{}  //empty body,
        , {withCredentials:true ,}); //for sending the cookies

        console.log(res.data);

        dispatch(logout()); //clearing the redux state
    }catch(error){
        console.log("Logout failed"  , error.response?.data || error.message);
        alert("Logout failed.. Try again!");
    }
    };
  return (
    
       <button
    className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full font-bold'
    onClick={logoutHandler}
    >Logout</button>

    
  )
}

export default LogoutBtn;
