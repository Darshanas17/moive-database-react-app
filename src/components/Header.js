import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search, Menu, X } from "lucide-react";

const Header = () => {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search/${query}`);
      setQuery("");
    }
  };

  const linkClass = (isActive) =>
    isActive
      ? "text-red-600 font-semibold transition"
      : "hover:text-red-600 transition";

  return (
    <nav className="bg-black text-white px-4 py-3 md:px-6 flex items-center justify-between flex-wrap">
      {/* Title */}
      <h1 className="text-2xl font-bold text-red-600">
        <NavLink to="/">movieDB</NavLink>
      </h1>

      {/* Hamburger menu button for small screens */}
      <button
        className="md:hidden text-white ml-auto"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Navigation & Search */}
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } w-full md:flex md:items-center md:w-auto mt-3 md:mt-0`}
      >
        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row md:gap-6 gap-2 md:mr-4">
          <NavLink to="/" className={({ isActive }) => linkClass(isActive)}>
            Popular
          </NavLink>
          <NavLink
            to="/top-rated"
            className={({ isActive }) => linkClass(isActive)}
          >
            Top Rated
          </NavLink>
          <NavLink
            to="/upcoming"
            className={({ isActive }) => linkClass(isActive)}
          >
            Upcoming
          </NavLink>
        </div>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-gray-800 px-2 py-1 rounded-lg mt-3 md:mt-0 md:ml-4 w-full md:w-72"
        >
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent outline-none text-sm text-white w-full px-2"
          />
          <button
            type="submit"
            className="flex items-center gap-1 bg-red-600 px-3 py-1 rounded-md hover:bg-red-700 transition"
          >
            <Search className="h-4 w-4" />
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Header;
