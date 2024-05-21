import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { options } from "../utils/constants";

const SearchMovies = () => {
  const user = useSelector((store) => store.app.user);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");
  const placeholderImageUrl =
    "https://www.youtube.com/embed/C1AjgIeJAH8?si=u9gUNL9UtDKS42KI";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let url;
        // Determine the API endpoint based on the selected category or search query
        if (selectedCategory) {
          switch (selectedCategory) {
            case "now_playing":
              url = "https://api.themoviedb.org/3/movie/now_playing";
              break;
            case "popular":
              url = "https://api.themoviedb.org/3/movie/popular";
              break;
            case "top_rated":
              url = "https://api.themoviedb.org/3/movie/top_rated";
              break;
            case "upcoming":
              url = "https://api.themoviedb.org/3/movie/upcoming";
              break;
            default:
              url = "https://api.themoviedb.org/3/movie/popular";
          }
        } else if (searchQuery) {
          url = "https://api.themoviedb.org/3/search/movie";
        } else {
          // If neither category nor search query is specified, default to popular movies
          url = "https://api.themoviedb.org/3/movie/popular";
        }

        const response = await axios.get(url, {
          params: {
            api_key: process.env.REACT_APP_API_KEY,
            query: searchQuery, // Add query parameter for search
          },
          headers: options.headers, // Assuming options includes any necessary headers
        });

        // If search results are returned, set them; otherwise, set an error message
        if (response.data.results && response.data.results.length > 0) {
          setSearchResults(response.data.results);
          setSearchError("");
        } else {
          setSearchResults([]);
          setSearchError("Movie not found");
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setSearchError("Error fetching movies. Please try again later.");
      }
    };

    fetchMovies();
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      setSelectedCategory(null); // Reset selected category
    }
  };

  const fetchTrailer = async (movieId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos`,
        {
          params: {
            api_key: process.env.REACT_APP_API_KEY,
          },
          headers: options.headers,
        }
      );

      // Extract the trailer URL from the response
      if (
        response.data.results &&
        response.data.results.length > 0 &&
        response.data.results[0].key
      ) {
        const trailerKey = response.data.results[0].key;
        const trailerUrl = `https://www.youtube.com/embed/${trailerKey}`;
        setTrailerUrl(trailerUrl);
      } else {
        setTrailerUrl(placeholderImageUrl);
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
      setTrailerUrl("");
    }
  };

  return (
    <div className="relative min-h-screen">
      <Header />
      <div className="absolute top-80 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-60 shadow-lg rounded-lg p-8 max-w-lg w-full z-50 flex">
        <input
          type="text"
          placeholder="Search movies..."
          className="border border-gray-500 px-4 py-2 rounded-md w-full bg-slate-200"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="bg-slate-500 hover:bg-slate-700 transition-all duration-500 text-white px-4 py-2 rounded-md ml-2"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="w-full overflow-hidden">
        <iframe
          className="w-screen aspect-video"
          src={trailerUrl ? trailerUrl : placeholderImageUrl}
          title="YouTube video player"
          allowFullScreen
        ></iframe>
      </div>
      <div className="flex justify-center flex-col items-center mb-4 mt-20 ml-4">
        <h1 className="text-white text-[5vw] lg:text-[4vw] font-extralight">
          Movies Categories
        </h1>
        <div className="flex gap-2 mt-10 font-extralight tracking-tighter mb-10">
          <button
            onClick={() => setSelectedCategory("now_playing")}
            className={`bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-all duration-500 ${
              selectedCategory === "now_playing" ? "bg-gray-600" : ""
            }`}
          >
            Now Playing
          </button>
          <button
            onClick={() => setSelectedCategory("popular")}
            className={`bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-all duration-500 ${
              selectedCategory === "popular" ? "bg-gray-600" : ""
            }`}
          >
            Popular
          </button>
          <button
            onClick={() => setSelectedCategory("top_rated")}
            className={`bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-all duration-500 ${
              selectedCategory === "top_rated" ? "bg-gray-600" : ""
            }`}
          >
            Top Rated
          </button>
          <button
            onClick={() => setSelectedCategory("upcoming")}
            className={`bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-all duration-500 ${
              selectedCategory === "upcoming" ? "bg-gray-600" : ""
            }`}
          >
            Upcoming
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center mt-10">
        <h1 className="text-gray-600 text-[3vw] lg:text-[3vw] font-extralight col-span-full mb-4">
          {selectedCategory === "upcoming"
            ? "Up-Coming Movies List"
            : selectedCategory === "now_playing" ? "Now-Playing Movies List" : selectedCategory === "top_rated" ? "Top-Rated Movies List" : selectedCategory === "popular" ? "Popular Movies List" : "" }
        </h1>
        {searchResults.length > 0 ? (
          searchResults.map((movie) => (
            <div
              key={movie.id}
              className="max-w-xs rounded-lg overflow-hidden shadow-lg cursor-pointer"
              onClick={() => fetchTrailer(movie.id)}
              style={{ minWidth: "200px" }} // Ensure minimum width for each movie card
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{movie.title}</div>
                <p className="text-gray-700 text-base whitespace-nowrap overflow-hidden text-center">
                  {movie.release_date}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white text-center col-span-full">{searchError}</p>
        )}
      </div>
    </div>
  );
};

export default SearchMovies;
