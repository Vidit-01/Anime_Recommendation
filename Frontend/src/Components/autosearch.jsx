import React, { useState, useEffect } from "react";
import Recommend from "./Recommend";

const AutocompleteSearch = ({ fetchSuggestions, reccomationapi }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [likedAnime, setLikedAnime] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [reccanime, setReccanime] = useState([]);

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const handler = setTimeout(async () => {
      const results = await fetchSuggestions(query);
      setSuggestions(results);
    }, 300);

    return () => clearTimeout(handler);
  }, [query, fetchSuggestions]);

  const handleLike = (anime) => {
    if (!likedAnime.find((a) => a.anime_id === anime.anime_id)) {
      setLikedAnime([...likedAnime, anime]);
    }
    if (likedAnime.length > 4) setDisabled(true);

    setQuery("");
    setSuggestions([]);
  };

  const handleClick = async () => {
    try {
      const response = await fetch("http://localhost:5000/recc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ anime: likedAnime }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      setReccanime(data);
    } catch (error) {
      console.error("Error sending likedAnime:", error);
    }
  };

  return (
    <>
      <div className="flex relative w-full items-center justify-center pt-10 px-4">
        <div className="flex flex-col sm:flex-row justify-center w-full max-w-2xl gap-2">
          {/* Search Box */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search anime..."
            disabled={disabled}
            className="flex-1 h-10 px-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <button
            onClick={handleClick}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition w-full sm:w-auto"
          >
            Recommend
          </button>

          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <ul className="absolute top-full left-4 right-4 sm:left-0 sm:right-0 max-w-2xl mx-auto text-white bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10 mt-1">
              {suggestions.map((s) => (
                <li
                  key={s.anime_id}
                  className="flex justify-between items-center px-4 py-2 hover:bg-gray-700 cursor-pointer"
                >
                  <span className="truncate">{s.title}</span>
                  <button
                    onClick={() => handleLike(s)}
                    className="text-red-400 hover:text-red-500"
                  >
                    ❤️
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Liked Anime */}
      <div className="flex flex-wrap justify-center gap-2 p-3">
        {likedAnime.map((a) => (
          <span
            key={a.anime_id}
            className="px-3 py-1 bg-green-500 text-black rounded-full text-xs sm:text-sm font-medium"
          >
            {a.title}
          </span>
        ))}
      </div>

      {/* Recommended Anime */}
      <div className="flex justify-center">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 w-2/3">
        {reccanime.map((anime) => (
          <div
            key={anime.anime_id}
            className="bg-gray-800 rounded-xl shadow-md overflow-hidden"
          >
            <img
              src={anime.image_url}
              alt={anime.title}
              className="w-full h-36 sm:h-40 object-cover"
            />
            <div className="p-2 sm:p-3">
              <h3 className="text-xs sm:text-sm font-semibold text-gray-100 text-center truncate">
                {anime.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
      </div>
    </>
  );
};

export default AutocompleteSearch;
