import React, { useState, useEffect } from "react";



const AutocompleteSearch = ({ fetchSuggestions }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const handler = setTimeout(async () => {
      const results = await fetchSuggestions(query);
      setSuggestions(results);
    }, 300); // debounce 300ms

    return () => clearTimeout(handler);
  }, [query, fetchSuggestions]);

  return (
    <div style={{ position: "relative", width: "300px" }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        style={{ width: "100%", padding: "8px" }}
      />
      {suggestions.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            border: "1px solid #ccc",
            position: "absolute",
            width: "100%"
            backgroundColor: "#212121ff",
            zIndex: 10,
          }}
        >
          {suggestions.map((s, i) => (
            <li
              key={i}
              onClick={() => setQuery(s)}
              style={{ padding: "8px", cursor: "pointer" }}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteSearch;
