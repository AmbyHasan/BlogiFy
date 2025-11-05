import React ,{useEffect , useState} from 'react';
import {useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';

function Protected({children  , authentication=true}) {

    const navigate=useNavigate();
    const [loader , setLoader]=useState(true);
    const authStatus=useSelector(state => state.auth.status)
    const loading = useSelector(state => state.auth.loading)

    useEffect(()=>{

        if(loading) return; // Wait for loading to complete

        if(authentication && !authStatus){ //the route requires authentication (authentcation==true) and the user is not logged in (!authStatus==true)
            navigate("/login")
        }else if(!authentication &&  authStatus){ // the route does not require authentication and  the user is logged in 
             navigate("/")  //redirect him to home page
        }

        setLoader(false);

    } , [authStatus , navigate ,authentication, loading])
       return loader ? <h1>Loading...</h1> : <>{children}</>
}

export default Protected
//it is okay to export a component by some other name
