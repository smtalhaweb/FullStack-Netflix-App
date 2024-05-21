import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Header = () => {
  const user = useSelector((store) => store.app.user);
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutMessage, setShowLogoutMessage] = useState(""); // State for showing logout message
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3001/api/logout");
      dispatch(setUser(null));
      setShowLogoutMessage(`${user.username} logged out successfully`); // Show logout message
      setTimeout(() => {
        setShowLogoutMessage(""); // Hide logout message after 3 seconds
        navigate("/login");
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="relative bg-cover bg-center h-[100vh]">
      {/* Background Image */}
      <img
        src="https://isquad.tv/wp-content/uploads/2018/08/Netflix-Background.jpg"
        className="absolute inset-0 w-full h-full object-cover filter blur-0"
        alt=""
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      <div className="relative z-10 inset-y-10 flex justify-between items-start px-6 md:px-12 lg:px-20 h-full">
        <Link to={"/"} className="flex items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Logonetflix.png/800px-Logonetflix.png"
            className="w-32 h-auto md:w-48"
            alt=""
          />
        </Link>
        <div className="flex justify-end gap-10">
          <div className="flex flex-col">
            {user ? (
              <div className="flex flex-col">
                <button
                  onClick={toggleDropdown}
                  className="bg-red-600 text-white py-1 px-4 md:py-2 md:px-5 mt-1 md:mt-3 font-semibold hover:bg-red-800 transition-all duration-500"
                >
                  {`Welcome, ${user.username}`}
                </button>
                {isOpen && (
                  <div className="flex flex-col bg-red-600">
                    <button className="bg-red-600 hover:bg-red-800 py-1 px-4 md:py-2 md:px-5 mt-1 md:mt-3 font-semibold transition-all duration-500 text-white">
                      My Favorite Movies
                    </button>
                    <button
                      onClick={handleLogout}
                      className="bg-red-600 hover:bg-red-800 py-1 px-4 md:py-2 md:px-5 mt-1 md:mt-3 font-semibold transition-all duration-500 text-white"
                    >
                      Logout
                    </button>
                    <button className="bg-red-600 hover:bg-red-800 py-1 px-4 md:py-2 md:px-5 mt-1 md:mt-3 font-semibold transition-all duration-500 text-white">
                      <Link to="/search-movies">Search Movies</Link>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="bg-red-600 text-white py-1 px-4 md:py-2 md:px-5 mt-1 md:mt-3 rounded-md font-semibold hover:bg-red-800 transition-all duration-500">
                <Link to="/login">Sign In</Link>
              </button>
            )}
          </div>
        </div>
      </div>
      {showLogoutMessage && (
        <div className="absolute top-[10%] left-1/2 transform -translate-x-1/2 -translate-y-[10%] bg-black bg-opacity-60 shadow-lg rounded-lg p-8 w-full max-w-xs z-10">
          <motion.p
            className="text-red-600 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3 }}
          >
            {showLogoutMessage}
          </motion.p>
        </div>
      )}
    </header>
  );
};

export default Header;
