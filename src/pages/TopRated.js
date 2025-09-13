import HeroSection from "../components/HeroSection";
import MovieGrid from "../components/MovieGrid";
import { endpoints } from "../api";

const TopRated = () => (
  <>
    <HeroSection fetchUrl={endpoints.topRated} />
    <h2 className="text-2xl text-white px-6 mt-4">Top Rated</h2>
    <MovieGrid fetchUrl={endpoints.topRated} />
  </>
);

export default TopRated;
