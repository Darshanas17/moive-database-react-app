// src/pages/MovieDetails.js
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { endpoints, IMAGE_BASE_URL } from "../api";
import Loader from "../components/Loader";
import { Star } from "lucide-react";

// Placeholder images
const PLACEHOLDER_POSTER =
  "https://placehold.co/300x450/1a1a1a/ffffff?text=No+Image&font=roboto";
const PLACEHOLDER_BACKDROP =
  "https://placehold.co/1280x720/1a1a1a/ffffff?text=No+Backdrop&font=roboto";
const PLACEHOLDER_PROFILE =
  "https://placehold.co/300x450/1a1a1a/ffffff?text=No+Image&font=roboto";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const fetchMovieData = async () => {
      setStatus("loading");
      try {
        const [detailsRes, castRes] = await Promise.all([
          fetch(endpoints.movieDetails(id)),
          fetch(endpoints.movieCast(id)),
        ]);

        if (!detailsRes.ok || !castRes.ok) throw new Error("Failed to fetch");

        const detailsData = await detailsRes.json();
        const castData = await castRes.json();

        setMovie(detailsData);
        setCast(castData.cast || []);
        setStatus("success");
      } catch (err) {
        console.error(err);
        setStatus("failure");
      }
    };

    fetchMovieData();
  }, [id]);

  const handleImageError = (e, type = "poster") => {
    switch (type) {
      case "poster":
        e.target.src = PLACEHOLDER_POSTER;
        break;
      case "backdrop":
        e.target.src = PLACEHOLDER_BACKDROP;
        break;
      case "profile":
        e.target.src = PLACEHOLDER_PROFILE;
        break;
      default:
        e.target.src = PLACEHOLDER_POSTER;
    }
    e.target.onerror = null;
  };

  if (status === "loading") return <Loader />;

  if (status === "failure")
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load movie details.
        <button
          onClick={() => window.location.reload()}
          className="ml-2 underline"
        >
          Retry
        </button>
      </div>
    );

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : PLACEHOLDER_POSTER;

  const backdropUrl = movie.backdrop_path
    ? `${IMAGE_BASE_URL}${movie.backdrop_path}`
    : PLACEHOLDER_BACKDROP;

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Banner */}
      <div
        className="relative h-[60vh] md:h-[70vh] flex items-center px-4 sm:px-6"
        style={{
          backgroundImage: `url(${backdropUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 flex flex-col md:flex-row gap-4 md:gap-6 items-start max-w-6xl mx-auto w-full px-4 sm:px-6">
          <div className="flex-shrink-0 w-full max-w-[150px] sm:max-w-[180px] md:w-60">
            <img
              src={posterUrl}
              alt={movie.title}
              className="hidden md:block w-60 rounded-lg shadow-lg"
              onError={(e) => handleImageError(e, "poster")}
            />
          </div>
          <div className="flex-1 mt-4 md:mt-0">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2">
              {movie.title}
            </h1>
            <p className="flex items-center gap-2 text-yellow-400 mb-1 flex-wrap">
              <Star className="w-4 h-4" />
              <span>{movie.vote_average.toFixed(1)}/10</span>
              <span className="text-gray-300">({movie.vote_count})</span>
            </p>
            <p className="mb-1">Duration: {movie.runtime || "N/A"} min</p>
            <p className="mb-1">
              Genre: {movie.genres?.map((g) => g.name).join(", ") || "N/A"}
            </p>
            <p className="mb-2">Release: {movie.release_date || "N/A"}</p>
            <p className="line-clamp-4">
              {movie.overview || "No overview available."}
            </p>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      <div className="px-4 sm:px-6 py-10 max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Cast</h2>
        {cast.length === 0 ? (
          <p className="text-gray-400">No cast information available.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
            {cast.map((member) => {
              const profileUrl = member.profile_path
                ? `${IMAGE_BASE_URL}${member.profile_path}`
                : PLACEHOLDER_PROFILE;

              return (
                <div key={member.id} className="text-center">
                  <img
                    src={profileUrl}
                    alt={member.name}
                    className="rounded-lg w-full h-60 sm:h-30 object-cover"
                    onError={(e) => handleImageError(e, "profile")}
                  />
                  <p className="mt-2 font-semibold text-sm sm:text-base">
                    {member.name}
                  </p>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    {member.character}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
