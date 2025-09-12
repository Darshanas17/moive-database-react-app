import { IMAGE_BASE_URL } from "../api";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  // Extract release year
  const releaseYear = movie.release_date
    ? movie.release_date.split("-")[0]
    : "N/A";

  return (
    <div className="relative w-64 h-80 bg-gray-900 rounded-lg overflow-hidden shadow-lg transform transition duration-300">
      {/* Poster */}
      <img
        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.src =
            "https://placehold.co/300x450/1a1a1a/ffffff?text=No+Image&font=roboto";
        }}
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        {/* Title */}
        <h3 className="text-white font-bold text-lg truncate">{movie.title}</h3>

        {/* Info row */}
        <div className="flex items-center justify-between mt-2">
          {/* Release year */}
          <span className="text-gray-300 text-sm">{releaseYear}</span>

          {/* Rating badge */}
          <span className="bg-yellow-500 text-black text-sm font-semibold px-2 py-0.5 rounded">
            {movie.vote_average.toFixed(1)}
          </span>
        </div>

        {/* Details button */}
        <Link
          to={`/movie/${movie.id}`}
          className="mt-3 w-full text-center bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 rounded transition-colors"
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
