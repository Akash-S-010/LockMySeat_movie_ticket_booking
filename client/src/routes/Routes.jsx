import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/user/Home";
import MovieDetails from "../pages/user/MovieDetails";
import ShowSelection from "../pages/user/ShowSelection";
import Movies from "../pages/user/Movies";
import Login from "../pages/shared/Login";
import Register from "../pages/shared/Register";
import RootLayout from "../layouts/RootLayout";
import ProtectedRoutes from "./ProtectedRoutes";
import AboutUs from "../pages/user/AboutUs";
import Profile from "../pages/shared/Profile";
import ForgotPassword from "../pages/shared/ForgotPassword";
import ResetPassword from "../pages/shared/Reset-password";
import ErrorPage from "../pages/shared/Error";
import Bookings from "../pages/user/Bookings";
import SeatSelection from "../pages/user/SeatSelection";
import VerifyOtp from "../pages/shared/Verification";
import Payment from "../pages/user/Payment";
export const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "all-movies",
        element: <Movies />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "verify-otp",
        element: <VerifyOtp />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password/:token",
        element: <ResetPassword />,
      },
      
      {
        path: "user",
        element: <ProtectedRoutes />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "bookings",
            element: <Bookings />,
          },
          {
            path: "movie-details/:id",
            element: <MovieDetails />,
          },
          {
            path: "show-selection/:movieId",
            element: <ShowSelection />,
          },
          {
            path: "seat-selection/:showId",
            element: <SeatSelection />,
          },
          {
            path:"payment/:showId",
            element:<Payment/>,
          }
        ],
      },
    ],
  },
]);
