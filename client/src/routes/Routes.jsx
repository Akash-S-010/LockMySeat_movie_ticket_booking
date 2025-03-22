import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/user/Home";
import MovieDetails from "../pages/user/MovieDetails";
import ShowSelection from "../pages/user/ShowSelection";
import Movies from "../pages/user/Movies";
import Login from "../pages/shared/Login";
import Register from "../pages/shared/Register";
import RootLayout from "../layouts/RootLayout";

export const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
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
        path: "movie-details/:id",
        element: <MovieDetails />,
      },
      {
        path: "show-selection",
        element: <ShowSelection />,
      },
    ],
  },
  
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
]);
