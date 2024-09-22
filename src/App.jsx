import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { path } from "./utils/constant";
import Home from "./pages/Public/Home";
import Login from "./pages/Public/Login";
import Register from "./pages/Public/Register";
import About from "./pages/Public/About";

const App = () => {
  const router = createBrowserRouter([
    { path: path.HOME, element: <Home /> },
    { path: path.LOGIN, element: <Login /> },
    { path: path.REGISTER, element: <Register /> },
    { path: path.ABOUT, element: <About /> },
    { path: path.TESTIMONIALS, element: <Register /> },
    { path: path.WORK, element: <Register /> },
    { path: path.TEAM, element: <Register /> },
    { path: path.FEATURES, element: <Register /> },
    { path: path.PRICING, element: <Register /> },
    { path: path.REGISTER, element: <Register /> },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
