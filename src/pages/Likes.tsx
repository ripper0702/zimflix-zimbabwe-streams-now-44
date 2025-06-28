
import React, { useState } from 'react';
import { Heart, Play, Share, Bookmark } from 'phosphor-react';

const Likes = () => {
  const [activeTab, setActiveTab] = useState('liked');

  const likedVideos = [
    {
      id: 1,
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300',
      title: 'Amazing Zimbabwe Culture Dance',
      creator: '@culture_zim',
      views: '12.5K',
      duration: '0:45',
      likes: '2.1K'
    },
    {
      id: 2,
      thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300',
      title: 'Traditional Mbira Music Session',
      creator: '@music_master',
      views: '8.2K',
      duration: '1:20',
      likes: '1.8K'
    },
    {
      id: 3,
      thumbnail: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=300',
      title: 'Victoria Falls Adventure',
      creator: '@adventure_zim',
      views: '15.7K',
      duration: '2:10',
      likes: '3.2K'
    },
    {
      id: 4,
      thumbnail: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300',
      title: 'Harare Street Food Tour',
      creator: '@food_explorer',
      views: '9.8K',
      duration: '1:45',
      likes: '2.5K'
    }
  ];

  const savedVideos = [
    {
      id: 1,
      thumbnail: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=300',
      title: 'Learn Shona Language Basics',
      creator: '@language_tutor',
      views: '5.4K',
      duration: '3:20',
      saved: true
    },
    {
      id: 2,
      thumbnail: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=300',
      title: 'Zimbabwe History Documentary',
      creator: '@history_docs',
      views: '18.9K',
      duration: '4:15',
      saved: true
    }
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-y-auto pb-20 pt-16">
      <div className="px-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Your Activity</h1>
          <p className="text-gray-400">Videos you've liked and saved</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('liked')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-2xl transition-all duration-300 ${
              activeTab === 'liked' 
                ? 'bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-xl border border-white/20 text-white' 
                : 'bg-black/20 backdrop-blur-xl border border-white/10 text-gray-400'
            }`}
          >
            <Heart size={16} weight={activeTab === 'liked' ? 'fill' : 'regular'} />
            <span className="text-sm font-medium">Liked Videos</span>
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-2xl transition-all duration-300 ${
              activeTab === 'saved' 
                ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-xl border border-white/20 text-white' 
                : 'bg-black/20 backdrop-blur-xl border border-white/10 text-gray-400'
            }`}
          >
            <Bookmark size={16} weight={activeTab === 'saved' ? 'fill' : 'regular'} />
            <span className="text-sm font-medium">Saved</span>
          </button>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-2 gap-4">
          {(activeTab === 'liked' ? likedVideos : savedVideos).map((video) => (
            <div key={video.id} className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden group">
              <div className="relative aspect-[9/16]">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Video Duration */}
                <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg text-xs">
                  {video.duration}
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <Play size={24} className="text-white" weight="fill" />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex flex-col space-y-2">
                    <button className="bg-black/40 backdrop-blur-sm rounded-full p-2">
                      <Share size={16} className="text-white" />
                    </button>
                    <button className="bg-black/40 backdrop-blur-sm rounded-full p-2">
                      {activeTab === 'liked' ? (
                        <Heart size={16} className="text-red-500" weight="fill" />
                      ) : (
                        <Bookmark size={16} className="text-blue-500" weight="fill" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-3">
                <h3 className="text-sm font-medium text-white line-clamp-2 mb-2">{video.title}</h3>
                <p className="text-xs text-gray-400 mb-1">{video.creator}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{video.views} views</span>
                  {activeTab === 'liked' && (
                    <span className="flex items-center space-x-1">
                      <Heart size={12} className="text-red-500" weight="fill" />
                      <span>{video.likes}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {(activeTab === 'liked' ? likedVideos : savedVideos).length === 0 && (
          <div className="text-center py-16">
            <div className="mb-4">
              {activeTab === 'liked' ? (
                <Heart size={48} className="text-gray-600 mx-auto" />
              ) : (
                <Bookmark size={48} className="text-gray-600 mx-auto" />
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-400 mb-2">
              No {activeTab} videos yet
            </h3>
            <p className="text-gray-500 text-sm">
              {activeTab === 'liked' 
                ? 'Videos you like will appear here' 
                : 'Videos you save will appear here'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Likes;
