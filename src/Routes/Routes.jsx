import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";

// import Register from "../pages/Register";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import Coverage from "../pages/Covarage/Coverage";
import BookingParcel from "../pages/Booking Parcel/BookingParcel";
import DashBoardLayout from "../Layouts/DashBoardLayout";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path:'coverage',
        Component:Coverage
      },
      {
        path:'/add-parcel',
        Component:BookingParcel
      },
    ],
  },
  // auth routes
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  //dashboard routes
  {
      path: "/dashboard",
      Component: DashBoardLayout,
  },
]);
