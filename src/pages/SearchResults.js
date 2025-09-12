// src/pages/SearchResults.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { endpoints } from "../api";
import MovieCard from "../components/MovieCard";

const SearchResults = () => {
  const { query } = useParams();
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | success | failure

  useEffect(() => {
    const fetchSearchResults = async () => {
      setStatus("loading");
      try {
        const res = await fetch(endpoints.search + query);
        if (!res.ok) throw new Error("Failed to fetch search results");
        const data = await res.json();
        setMovies(data.results || []);
        setStatus("success");
      } catch (error) {
        console.error("Error fetching search results:", error);
        setStatus("failure");
      }
    };

    fetchSearchResults();
  }, [query]);

  // 🔹 Render functions
  const renderLoading = () => <Loader />;

  const renderFailure = () => (
    <div className="text-center text-red-500 mt-10">
      Failed to load search results.
      <button
        onClick={() => window.location.reload()}
        className="ml-2 underline"
      >
        Retry
      </button>
    </div>
  );

  const renderSuccess = () => {
    if (movies.length === 0) {
      return (
        <p className="text-center text-gray-400 mt-10 text-lg">
          No movies found for "{query}"
        </p>
      );
    }

    return (
      <div className="mt-6 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    );
  };

  // 🔹 Main render switch
  const renderContent = () => {
    switch (status) {
      case "loading":
        return renderLoading();
      case "failure":
        return renderFailure();
      case "success":
        return renderSuccess();
      default:
        return null;
    }
  };

  return (
    <div className="bg-black min-h-screen text-white px-4 sm:px-6 py-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
        Search Results for "{query}"
      </h2>
      {renderContent()}
    </div>
  );
};

export default SearchResults;
