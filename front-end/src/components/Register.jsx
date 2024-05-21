import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion from Framer Motion

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // State for displaying messages
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/api/register", {
        username: username,
        email: email,
        password: password,
      });
      console.log("Registration successful,", response.data);
      setMessage("Registration successful");
      setIsRegistered(true);
    } catch (error) {
      console.error("Error:", error.response.data);
      setMessage(error.response.data.msg);
    }
  };

  useEffect(() => {
    if (isRegistered) {
      const timeout = setTimeout(() => {
        navigate("/login");
      }, 3000); // Navigate after 3 seconds

      return () => clearTimeout(timeout);
    }
  }, [isRegistered, navigate]);

  return (
    <div className="relative min-h-screen">
      <Header />
      <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-60 shadow-lg rounded-lg p-8 w-full max-w-xs z-10">
        {/* Display message or form */}
        {isRegistered ? (
          <motion.p
            className="text-red-600 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3 }}
          >
            {message}
          </motion.p>
        ) : (
          <motion.form
            className="space-y-4"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 3 }}
          >
            <h1 className="text-red-800 text-3xl font-bold mb-6">Sign Up</h1>
            <input
              className="block w-full px-4 py-3 rounded-lg border bg-gray-300 border-gray-700 focus:outline-none focus:border-red-500"
              type="text"
              placeholder="Full Name"
              value={username}
              onChange={handleUsernameChange}
              required
            />
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
              Sign Up
            </button>
            <p className="text-center text-slate-800">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-red-600 font-bold hover:text-red-800 transition-all duration-500"
              >
                Sign In
              </Link>
            </p>
          </motion.form>
        )}
      </div>
    </div>
  );
};

export default Register;
