export const API_KEY = "22e0ac7e7f855c71394b0cfb7545aba6";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const endpoints = {
  popular: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=`,
  topRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=`,
  upcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=`,
  search: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`,

  // ✅ Make this a function to pass movieId
  movieDetails: (movieId) =>
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`,

  // Cast details
  movieCast: (movieId) =>
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
};
