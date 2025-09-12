import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import Loader from "./Loader";

const MovieGrid = ({ fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const fetchMovies = async () => {
      setStatus("loading");
      try {
        const res = await fetch(`${fetchUrl}${page}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setMovies(data.results);
        setStatus("success");
      } catch (err) {
        console.error(err);
        setStatus("failure");
      }
    };
    fetchMovies();
  }, [fetchUrl, page]);

  if (status === "loading") return <Loader />;

  if (status === "failure")
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load movies.{" "}
        <button
          onClick={() => setPage(page)}
          className="underline hover:text-red-600"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="px-6 py-6 bg-black min-h-screen text-white">
      {/* Movie Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="flex justify-center">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-50 transition"
        >
          Prev
        </button>
        <span className="px-4 py-2 bg-gray-800 rounded font-medium">
          {page}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MovieGrid;
