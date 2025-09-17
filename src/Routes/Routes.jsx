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
import AdminDashboard from "../pages/Dashboard/Admin Dashboard/AdminDashboard";
import ParcelAssignment from "../pages/Dashboard/Parcel Assignment/ParcelAssignment";
import AssignedParcels from "../pages/Dashboard/Assigned Parcels/AssignedParcels";

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
        path: "coverage",
        Component: Coverage,
      },
      {
        path: "BeARider",
        element: (
          <PrivateRoute>
            <BeARider></BeARider>
          </PrivateRoute>
        ),
      },
      {
        path: "add-parcel",
        element: (
          <PrivateRoute>
            <BookingParcel></BookingParcel>
          </PrivateRoute>
        ),
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
      // user routes …
      {
        index: true,
        Component: MyParcels,
      },
      { path: "payment/:id", Component: Payment },
      { path: "payments", Component: PaymentHistory },

      // rider routes …
      {
        element: <RoleProtected requiredRole="rider" />,
        children: [
          { path: "become-rider", Component: BeARider },
          { path: "assigned-parcels", Component: PendingRiders },
          {
            element: <RoleProtected requiredRole="rider" />,
            children: [
              { path: "assigned-parcels", Component: AssignedParcels },
              // …other rider routes…
            ],
          },
        ],
      },

      // ── Admin routes under “admin” ──
      {
        path: "admin",
        element: <RoleProtected requiredRole="admin" />,
        children: [
          { index: true, Component: AdminDashboard },
          { path: "pendingRiders", Component: PendingRiders },
          { path: "activeRiders", Component: ActiveRiders },
          // new parcel assignment route
          { path: "assign-parcels", Component: ParcelAssignment },
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
