import HeroSection from "../components/HeroSection";
import MovieGrid from "../components/MovieGrid";
import { endpoints } from "../api";

const TopRated = () => (
  <>
    <HeroSection fetchUrl={endpoints.topRated} />
    <MovieGrid fetchUrl={endpoints.topRated} />
  </>
);

export default TopRated;
