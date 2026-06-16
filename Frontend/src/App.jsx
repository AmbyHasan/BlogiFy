import { useState,useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { login, setLoading } from './store/authSlice';
import axios from 'axios';

import "./index.css";
import "./App.css";
import { Outlet } from 'react-router-dom';
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"




function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const response = await axios.get(
  `${import.meta.env.VITE_API_URL}/user/current-user`,
  {
    withCredentials: true,
  }
);
        if (response.data.statusCode === 200) {
          dispatch(login({ userData: response.data.data })); //here login is the acton creatorw
        }
      } catch (error) {
        console.log('No active session');
      } finally {
        dispatch(setLoading(false));
      }
    };

    checkCurrentUser();
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-400">
    <Header/>
   <main className="flex-1">
        <Outlet />  {/* Main content area */}
    </main>
     <Footer />
   </div>
  )
}

export default App
