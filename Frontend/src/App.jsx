import { useState } from 'react'
import './App.css'
import AutocompleteSearch from './Components/autosearch';

const App = () => {
  const dummyData = ["apple", "banana", "grape", "orange", "apricot"];

  const fetchSuggestions = async (query) => {
    return dummyData.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <>
    <div style={{ padding: "50px" }}>
      <h2>Autocomplete Demo</h2>
      <AutocompleteSearch fetchSuggestions={fetchSuggestions} />
    </div>
    </>
  );
};

export default App;
