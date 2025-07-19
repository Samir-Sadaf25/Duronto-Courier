import {
  createBrowserRouter,
} from "react-router";
import MainLayout from "../Layouts/MainLayout";

import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:MainLayout,
    children:[
        {
            index:true,
            Component:Home
        },
        {
           path:'/register',
           Component:Register
        },
        {
           path:'/login',
           Component:Login
        }

    ]
  },
]);