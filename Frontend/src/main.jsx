import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import AddPost from './pages/AddPost.jsx'
import Signup from './pages/SignUp.jsx'
import EditPost from './pages/EditPost.jsx'
import AllPosts from './pages/AllPosts.jsx'
import Post from './pages/Post.jsx'
import Home from './pages/Home.jsx'
import {Provider} from "react-redux";
import store from './store/store.js'

import { AuthLayout , Login  } from './components/index.js'

const Router=createBrowserRouter([
  {
    path: "/", //root element
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        { //this route is not protected and does not require the user to be logged in
            path: "/login",
            element: (
                <AuthLayout authentication={false}> 
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication={true}>
                    {" "}
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication={true}>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:id",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
    ],
},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
  <RouterProvider router={Router} />
  </Provider>
  </StrictMode>,
)
