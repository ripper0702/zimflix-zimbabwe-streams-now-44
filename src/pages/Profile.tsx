
import React from 'react';
import { Gear, Heart, Share } from 'phosphor-react';

const Profile = () => {
  const userStats = {
    followers: '12.5K',
    following: '1,234',
    likes: '45.6K'
  };

  const userVideos = [
    { id: 1, thumbnail: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=200', views: '1.2K' },
    { id: 2, thumbnail: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200', views: '856' },
    { id: 3, thumbnail: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=200', views: '2.1K' },
  ];

  return (
    <div className="h-screen bg-black text-white overflow-y-auto pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-8">
        <h1 className="text-xl font-bold">Profile</h1>
        <button>
          <Gear size={24} className="text-white" />
        </button>
      </div>

      {/* Profile info */}
      <div className="px-4 pb-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-black">Z</span>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold">@zimcreator</h2>
            <p className="text-gray-400 text-sm">Content creator from Zimbabwe 🇿🇼</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-around py-4 border-y border-gray-800">
          <div className="text-center">
            <div className="text-lg font-bold">{userStats.followers}</div>
            <div className="text-gray-400 text-sm">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">{userStats.following}</div>
            <div className="text-gray-400 text-sm">Following</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">{userStats.likes}</div>
            <div className="text-gray-400 text-sm">Likes</div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex space-x-2 mt-4">
          <button className="flex-1 bg-white text-black py-2 px-4 rounded-lg font-semibold">
            Edit Profile
          </button>
          <button className="p-2 border border-gray-600 rounded-lg">
            <Share size={20} />
          </button>
        </div>
      </div>

      {/* Videos grid */}
      <div className="px-4">
        <h3 className="text-lg font-bold mb-4">Videos</h3>
        <div className="grid grid-cols-3 gap-1">
          {userVideos.map((video) => (
            <div key={video.id} className="relative aspect-[9/16] bg-gray-800 rounded-lg overflow-hidden">
              <img 
                src={video.thumbnail} 
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 text-xs text-white bg-black/50 px-2 py-1 rounded">
                {video.views}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
