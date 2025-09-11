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
import MyParcels from "../pages/Dashboard/My parcel/MyParcels";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/Payment History/PaymentHistory";
import BeARider from "../pages/Be a Rider Form/BeARider";
import PendingRiders from "../pages/Dashboard/Pending Riders/PendingRiders";
import ActiveRiders from "../pages/Dashboard/Active Riders/ActiveRiders";
import Unauthorized from "../pages/UnAuthorized/Unauthorized";
import RoleProtected from "../Components/Role Protected/RoleProtected";

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
         path:'BeARider',
         element:<PrivateRoute><BeARider></BeARider></PrivateRoute>
      },
      {
        path:'add-parcel',
        element:<PrivateRoute><BookingParcel></BookingParcel></PrivateRoute>
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
    element: (
      <PrivateRoute>
        <DashBoardLayout />
      </PrivateRoute>
    ),
    children: [
      // 1) Default user dashboard
      {
        index: true,
        Component: MyParcels,
      },
      {
        path: "payment/:id",
        Component: Payment,
      },
      {
        path: "payments",
        Component: PaymentHistory,
      },

      // 2) Rider-only pages
      {
        element: <RoleProtected requiredRole="rider" />,
        children: [
          {
            path: "become-rider",
            Component: BeARider,
          },
          {
            path: "assigned-parcels", // example
            Component: PendingRiders,  // or your rider task list
          },
        ],
      },

      // 3) Admin-only pages
      {
        element: <RoleProtected requiredRole="admin" />,
        children: [
          {
            path: "pendingRiders",
            Component: PendingRiders,
          },
          {
            path: "activeRiders",
            Component: ActiveRiders,
          },
          // you can add more admin features here…
        ],
      },
    ],
  },

  // catch-all for forbidden access
  {
    path: "/unauthorized",
    Component: Unauthorized,
  },
]);
