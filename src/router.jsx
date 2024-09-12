import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import Home from "./components/main/MoviesListSlider.jsx";
import Movies from "./components/pages/Movies";
import Movie from "./components/pages/Movie";
import Login from "./components/pages/Login";
import UserProvider from "./context/UserContext.jsx";
import Profile from "./components/pages/Profile.jsx";

export const router = createBrowserRouter([
  {
    element: (
      <UserProvider>
        <App />
      </UserProvider>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/movies",
        element: <Movies />,
      },
      {
        path: "/movies/:id",
        element: <Movie />,
      },
      {
        path: "/tv",
        element: <h1>is not difinde</h1>,
      },
      {
        path: "/people",
        element: <h1>is not difinde</h1>,
      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);
