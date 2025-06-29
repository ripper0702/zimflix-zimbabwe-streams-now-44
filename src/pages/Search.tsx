
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
    <div className="h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-y-auto pb-24 pt-20">
      <div className="px-6">
        {/* Enhanced Search Input */}
        <div className="relative mb-8">
          <div className="relative">
            <MagnifyingGlass size={20} className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search videos, creators, sounds..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-5 bg-black/30 backdrop-blur-xl border border-white/20 rounded-3xl text-white placeholder-gray-400 focus:outline-none focus:border-white/40 focus:bg-black/40 transition-all duration-300 text-lg"
            />
          </div>
        </div>

        {/* Search Results or Suggestions */}
        {searchQuery ? (
          <div>
            <h2 className="text-xl font-bold mb-6">Results for "{searchQuery}"</h2>
            <div className="grid grid-cols-2 gap-4">
              {searchResults.map((result) => (
                <div key={result.id} className="bg-black/30 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden hover:border-white/30 transition-all duration-300">
                  <div className="relative aspect-[9/16]">
                    <img 
                      src={result.thumbnail} 
                      alt={result.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-xl text-xs font-medium">
                      {result.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-white line-clamp-2 mb-2">{result.title}</h3>
                    <p className="text-xs text-gray-400 mb-1">{result.creator}</p>
                    <p className="text-xs text-gray-500">{result.views} views</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {/* Enhanced Tab Navigation */}
            <div className="flex space-x-3 mb-8">
              <button
                onClick={() => setActiveTab('trending')}
                className={`flex items-center space-x-3 px-6 py-4 rounded-3xl transition-all duration-300 ${
                  activeTab === 'trending' 
                    ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-xl border border-white/30 text-white shadow-lg' 
                    : 'bg-black/30 backdrop-blur-xl border border-white/20 text-gray-400 hover:border-white/30'
                }`}
              >
                <TrendUp size={18} />
                <span className="text-base font-semibold">Trending</span>
              </button>
              <button
                onClick={() => setActiveTab('recent')}
                className={`flex items-center space-x-3 px-6 py-4 rounded-3xl transition-all duration-300 ${
                  activeTab === 'recent' 
                    ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-xl border border-white/30 text-white shadow-lg' 
                    : 'bg-black/30 backdrop-blur-xl border border-white/20 text-gray-400 hover:border-white/30'
                }`}
              >
                <Clock size={18} />
                <span className="text-base font-semibold">Recent</span>
              </button>
            </div>

            {/* Enhanced Search Suggestions */}
            <div>
              <h2 className="text-xl font-bold mb-6">
                {activeTab === 'trending' ? 'Trending Searches' : 'Recent Searches'}
              </h2>
              <div className="space-y-4">
                {(activeTab === 'trending' ? trendingSearches : recentSearches).map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(search)}
                    className="flex items-center space-x-4 w-full p-5 bg-black/30 backdrop-blur-xl border border-white/20 rounded-3xl hover:bg-black/40 hover:border-white/30 transition-all duration-300 group"
                  >
                    {activeTab === 'trending' ? (
                      <div className="p-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-white/20">
                        <TrendUp size={20} className="text-white" />
                      </div>
                    ) : (
                      <div className="p-2 bg-black/40 rounded-full border border-white/20">
                        <Clock size={20} className="text-gray-400" />
                      </div>
                    )}
                    <span className="text-white font-semibold text-base group-hover:text-white/90">{search}</span>
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
