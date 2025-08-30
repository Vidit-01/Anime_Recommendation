import React, { useState } from 'react';
import { Search, X, Loader, Star } from 'lucide-react';

const AnimeRecommender = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);
  const [error, setError] = useState('');

  // Mock search function - replace with actual API call
  const searchAnime = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setError('');

    try {
      // Mock API response - replace with actual anime search API
      const mockResults = [
        { id: 1, title: 'Attack on Titan', poster: 'https://via.placeholder.com/200x300/FF6B6B/FFFFFF?text=AOT', year: 2013, rating: 9.0 },
        { id: 2, title: 'One Piece', poster: 'https://via.placeholder.com/200x300/4ECDC4/FFFFFF?text=OP', year: 1999, rating: 8.9 },
        { id: 3, title: 'Naruto', poster: 'https://via.placeholder.com/200x300/45B7D1/FFFFFF?text=Naruto', year: 2002, rating: 8.3 },
        { id: 4, title: 'Death Note', poster: 'https://via.placeholder.com/200x300/96CEB4/FFFFFF?text=DN', year: 2006, rating: 9.0 },
        { id: 5, title: 'My Hero Academia', poster: 'https://via.placeholder.com/200x300/FFEAA7/000000?text=MHA', year: 2016, rating: 8.5 }
      ].filter(anime => anime.title.toLowerCase().includes(query.toLowerCase()));

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setSearchResults(mockResults);
    } catch (err) {
      setError('Failed to search anime. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    searchAnime(searchQuery);
  };

  const handleAnimeSelect = (anime) => {
    if (!selectedAnime.find(selected => selected.id === anime.id)) {
      setSelectedAnime([...selectedAnime, anime]);
    }
  };

  const handleAnimeRemove = (animeId) => {
    setSelectedAnime(selectedAnime.filter(anime => anime.id !== animeId));
  };

  const getRecommendations = async () => {
    if (selectedAnime.length === 0) {
      setError('Please select at least one anime to get recommendations.');
      return;
    }

    setIsLoadingRecommendations(true);
    setError('');

    try {
      const animeIds = selectedAnime.map(anime => anime.id);
      
      // Mock backend call - replace with actual API endpoint
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ animeIds }),
      });

      if (!response.ok) {
        throw new Error('Failed to get recommendations');
      }

      const data = await response.json();
      
      // Mock response for demo - remove when using real backend
      const mockRecommendations = [
        { name: 'Demon Slayer', poster: 'https://via.placeholder.com/200x300/DDA0DD/FFFFFF?text=DS' },
        { name: 'Jujutsu Kaisen', poster: 'https://via.placeholder.com/200x300/98D8E8/FFFFFF?text=JJK' },
        { name: 'Fullmetal Alchemist', poster: 'https://via.placeholder.com/200x300/F7DC6F/000000?text=FMA' },
        { name: 'Hunter x Hunter', poster: 'https://via.placeholder.com/200x300/BB8FCE/FFFFFF?text=HxH' },
        { name: 'Tokyo Ghoul', poster: 'https://via.placeholder.com/200x300/85C1E9/FFFFFF?text=TG' },
        { name: 'One Punch Man', poster: 'https://via.placeholder.com/200x300/F8C471/000000?text=OPM' }
      ];

      // Use mock data if API fails (for demo purposes)
      setRecommendations(data.recommendations || mockRecommendations);
    } catch (err) {
      // For demo, show mock recommendations even if API fails
      const mockRecommendations = [
        { name: 'Demon Slayer', poster: 'https://via.placeholder.com/200x300/DDA0DD/FFFFFF?text=DS' },
        { name: 'Jujutsu Kaisen', poster: 'https://via.placeholder.com/200x300/98D8E8/FFFFFF?text=JJK' },
        { name: 'Fullmetal Alchemist', poster: 'https://via.placeholder.com/200x300/F7DC6F/000000?text=FMA' },
        { name: 'Hunter x Hunter', poster: 'https://via.placeholder.com/200x300/BB8FCE/FFFFFF?text=HxH' }
      ];
      setRecommendations(mockRecommendations);
      setError('Using demo recommendations. Connect to your backend API for real results.');
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Anime Recommender</h1>
          <p className="text-blue-200">Discover your next favorite anime based on your preferences</p>
        </div>

        {/* Search Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8">
          <div className="mb-6">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for anime..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                {isSearching ? <Loader className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                Search
              </button>
            </div>
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-4">Search Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map((anime) => (
                  <div
                    key={anime.id}
                    onClick={() => handleAnimeSelect(anime)}
                    className="bg-white/10 rounded-lg p-4 cursor-pointer hover:bg-white/20 transition-colors border border-white/20"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={anime.poster}
                        alt={anime.title}
                        className="w-16 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="text-white font-medium">{anime.title}</h4>
                        <p className="text-gray-300 text-sm">Year: {anime.year}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-yellow-400 text-sm">{anime.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Selected Anime */}
          {selectedAnime.length > 0 && (
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-4">Selected Anime ({selectedAnime.length})</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedAnime.map((anime) => (
                  <div
                    key={anime.id}
                    className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
                  >
                    <span>{anime.title}</span>
                    <button
                      onClick={() => handleAnimeRemove(anime.id)}
                      className="hover:bg-blue-700 rounded-full p-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={getRecommendations}
                disabled={isLoadingRecommendations}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                {isLoadingRecommendations ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Getting Recommendations...
                  </>
                ) : (
                  'Get Recommendations'
                )}
              </button>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}
        </div>

        {/* Recommendations Section */}
        {recommendations.length > 0 && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Recommended Anime</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {recommendations.map((anime, index) => (
                <div
                  key={index}
                  className="bg-white/10 rounded-lg overflow-hidden hover:bg-white/20 transition-colors group"
                >
                  <div className="aspect-[2/3] overflow-hidden">
                    <img
                      src={anime.poster}
                      alt={anime.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="text-white font-medium text-sm text-center truncate">
                      {anime.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimeRecommender;