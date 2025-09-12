import { useEffect, useState } from "react";
import { IMAGE_BASE_URL } from "../api";
import { Link } from "react-router-dom";

const HeroSection = ({ fetchUrl }) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchHeroMovie = async () => {
      try {
        const res = await fetch(fetchUrl + "1");
        const data = await res.json();
        if (data.results?.length > 0) {
          const randomMovie =
            data.results[Math.floor(Math.random() * data.results.length)];
          setMovie(randomMovie);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchHeroMovie();
  }, [fetchUrl]);

  if (!movie) return null;

  return (
    <div
      className="relative h-[70vh] text-white flex items-center"
      style={{
        backgroundImage: `url(${IMAGE_BASE_URL}${movie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      <div className="relative z-10 px-8 max-w-xl">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          {movie.title}
        </h1>
        <p className="text-sm md:text-base mb-6 line-clamp-3">
          {movie.overview}
        </p>
        <div className="flex gap-4">
          <Link
            to={`/movie/${movie.id}`}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-md font-semibold"
          >
            More Info
          </Link>
          <a
            href={`https://www.youtube.com/results?search_query=${movie.title}+trailer`}
            target="_blank"
            rel="noreferrer"
            className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-md font-semibold"
          >
            Watch Trailer
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
