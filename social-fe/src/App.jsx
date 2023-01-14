import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import CreatePost from "./components/create-post";
import Home from "./components/home";
import Login from "./components/login";
import Navbar from "./components/navbar";
import Profile from "./components/profile";
import Register from "./components/register";
import ProtectedRoute from "./protected-route/protected-route";

function App() {
  const Layout = () => {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
          state: "home",
          name: "home",
        },

        {
          path: "/post",
          element: (
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          ),
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },

    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
