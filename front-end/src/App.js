import "./index.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import SearchMovies from "./components/SearchMovies";
import Register from "./components/Register";
function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register/>,
    },
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/search-movies",
      element: <SearchMovies />,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
