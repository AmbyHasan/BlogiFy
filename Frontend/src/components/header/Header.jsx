import React from 'react'
import {Container ,Logo ,LogoutBtn} from "../index.js"
import {Link} from "react-router-dom";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 


const Header = () => {
  //first of all we would have to check from states that the person is authenticated or not
  //on the basis of his authentication we will  render the buttons in the header
  const authStatus = useSelector((state)=> state.auth.status)
  const navigate=useNavigate();

 //navigation bar items in the form of  array of objects
 //we will loop over this array and display the items according to their active status
  const navItems=[
    {
      name: "Home",
      slug:'/' , //url kaha ja  rha hai
      active:true
    } ,{
      name:"Login",
      slug:"/login" ,
      active: !authStatus  //when the user is not logged in
    } ,{
      name:"Signup" ,
      slug:"/signup" ,
      active:!authStatus ,
    } ,
     {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus, //when the user is logged in
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]
  return (
    <div>
      <header className="py-3 shadow bg-gray-500">
        <Container>
          <nav className="flex">
            <div className= "mr-4">
               <Logo/>
            </div>
             <ul className='flex ml-auto'>
              {navItems.map((item)=> 
              item.active ?  (

                <li key={item.name}>
                <button  className=' cursor-pointer inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full font-bold'
                onClick={()=>navigate(item.slug)}>{item.name}</button>
                </li>
              )
               : null
              )}
             
  {/* displaying the logout button only if the person is logged in */}

             {authStatus &&  (
              <li>
                <LogoutBtn/>
              </li>
             )}

             </ul>
          </nav>
        </Container>
      </header>
    </div>
  )
}

export default Header
