import { useState } from 'react'
import './App.css'
import AutocompleteSearch from './Components/autosearch';

const App = () => {

  const fetchSuggestions = async (query) => {
    const res = await fetch(`http://localhost:5000/search?q=${query}`);
    const data = await res.json();
    return data.results; // array of strings
  };
  const animereccs = async (likedanime) => {
    try {
      const response = await fetch("http://localhost:5000/reccs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(likedanime)
      });

      const result = await response.json();
      console.log("Response from server:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className='bg-gradient-to-b from-gray-900 via-gray-800 to-black h-full min-h-screen'>
      <img
        src="image.png"   // replace with your PNG path
        alt="Character"
        className="absolute left-0 bottom-0 h-[70vh] object-contain opacity-90 pointer-events-none"
      />
      <div className='relative z-10'>
      <AutocompleteSearch fetchSuggestions={fetchSuggestions} reccomationapi={animereccs} />
</div>
    </div>
  );
};

export default App;
