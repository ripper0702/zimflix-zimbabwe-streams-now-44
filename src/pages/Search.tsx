
import React, { useState } from 'react';
import { MagnifyingGlass, TrendUp, Clock } from 'phosphor-react';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('trending');

  const trendingSearches = [
    'African Music', 'Zimbabwe Culture', 'Dance Challenge', 'Comedy Skits', 
    'Food Recipes', 'Tech Reviews', 'Fashion Trends', 'Travel Vlogs'
  ];

  const recentSearches = [
    'Harare City Tour', 'Sungura Music', 'Traditional Dance', 'Local Cuisine'
  ];

  const searchResults = [
    {
      id: 1,
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300',
      title: 'Amazing Zimbabwe Culture',
      creator: '@culture_zim',
      views: '12.5K',
      duration: '0:45'
    },
    {
      id: 2,
      thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300',
      title: 'Traditional Dance Moves',
      creator: '@dance_master',
      views: '8.2K',
      duration: '1:20'
    }
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-y-auto pb-20 pt-16">
      <div className="px-4">
        {/* Search Input */}
        <div className="relative mb-6">
          <div className="relative">
            <MagnifyingGlass size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search videos, creators, sounds..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-white/30 focus:bg-black/40 transition-all duration-300"
            />
          </div>
        </div>

        {/* Search Results or Suggestions */}
        {searchQuery ? (
          <div>
            <h2 className="text-lg font-semibold mb-4">Results for "{searchQuery}"</h2>
            <div className="grid grid-cols-2 gap-3">
              {searchResults.map((result) => (
                <div key={result.id} className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
                  <div className="relative aspect-[9/16]">
                    <img 
                      src={result.thumbnail} 
                      alt={result.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg text-xs">
                      {result.duration}
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-medium text-white line-clamp-2 mb-1">{result.title}</h3>
                    <p className="text-xs text-gray-400">{result.creator}</p>
                    <p className="text-xs text-gray-500">{result.views} views</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {/* Tab Navigation */}
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setActiveTab('trending')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-2xl transition-all duration-300 ${
                  activeTab === 'trending' 
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-white/20 text-white' 
                    : 'bg-black/20 backdrop-blur-xl border border-white/10 text-gray-400'
                }`}
              >
                <TrendUp size={16} />
                <span className="text-sm font-medium">Trending</span>
              </button>
              <button
                onClick={() => setActiveTab('recent')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-2xl transition-all duration-300 ${
                  activeTab === 'recent' 
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-white/20 text-white' 
                    : 'bg-black/20 backdrop-blur-xl border border-white/10 text-gray-400'
                }`}
              >
                <Clock size={16} />
                <span className="text-sm font-medium">Recent</span>
              </button>
            </div>

            {/* Search Suggestions */}
            <div>
              <h2 className="text-lg font-semibold mb-4">
                {activeTab === 'trending' ? 'Trending Searches' : 'Recent Searches'}
              </h2>
              <div className="space-y-3">
                {(activeTab === 'trending' ? trendingSearches : recentSearches).map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(search)}
                    className="flex items-center space-x-3 w-full p-4 bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-black/30 hover:border-white/20 transition-all duration-300"
                  >
                    {activeTab === 'trending' ? (
                      <TrendUp size={20} className="text-gray-400" />
                    ) : (
                      <Clock size={20} className="text-gray-400" />
                    )}
                    <span className="text-white font-medium">{search}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
