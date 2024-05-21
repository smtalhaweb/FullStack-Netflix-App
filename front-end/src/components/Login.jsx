// Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion from Framer Motion
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import Header from "./Header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // State for displaying messages
  const [isLogged, setIsLogged] = useState(false); // State for controlling animation
  const navigate = useNavigate(); // Hook for programmatic navigation
  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/api/login", {
        email: email,
        password: password,
      });
      console.log("Login successful:", response.data);
      setMessage("Login successful"); // Set success message
      setIsLogged(true); // Trigger animation

      // Dispatch action to store user information in Redux store
      dispatch(setUser(response.data.user));

      // Navigate to homepage after 3 seconds
      setTimeout(() => {
        navigate("/search-movies");
      }, 3000);
    } catch (error) {
      console.error("Error:", error.response.data);
      setMessage(error.response.data.msg); // Update message state with error message
    }
  };

  return (
    <div className="relative min-h-screen">
      <Header />
      <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-60 shadow-lg rounded-lg p-8 w-full max-w-xs z-10">
        {/* Display message with animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isLogged ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          {message && <p className="text-red-600 text-center">{message}</p>}
        </motion.div>
        {/* Hide form when message is displayed */}
        {!message && (
          <motion.form
            className="space-y-4"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={isLogged ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.5, delay:0.5 }}
          >
            <h1 className="text-red-800 text-3xl font-bold mb-6">Sign In</h1>
            <input
              className="block w-full px-4 py-3 rounded-lg border bg-gray-300 border-gray-700 focus:outline-none focus:border-red-500"
              type="text"
              placeholder="Email or phone number"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <input
              className="block w-full px-4 py-3 rounded-lg border bg-gray-300 border-gray-700 focus:outline-none focus:border-red-500"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <button
              className="block w-full px-4 py-3 rounded-lg bg-red-600 text-white font-bold hover:bg-red-800 focus:outline-none focus:bg-red-600 transition-all duration-500"
              type="submit"
            >
              Sign In
            </button>
            <p className="text-center text-slate-800">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-red-600 font-bold hover:text-red-800 transition-all duration-500"
              >
                Sign Up
              </Link>
            </p>
          </motion.form>
        )}
      </div>
    </div>
  );
};

export default Login;
