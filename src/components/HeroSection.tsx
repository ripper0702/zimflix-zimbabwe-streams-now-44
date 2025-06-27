
import React from 'react';
import { Play, Plus, Info } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative h-screen flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200')`,
        }}
      >
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 md:px-8 max-w-2xl">
        <div className="space-y-4 animate-fade-in">
          {/* ZimFlix Original Badge */}
          <div className="flex items-center space-x-2">
            <span className="bg-gradient-to-r from-green-600 to-red-600 text-white px-3 py-1 rounded text-sm font-semibold">
              ZIMFLIX ORIGINAL
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Victoria Falls:
            <br />
            <span className="bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 bg-clip-text text-transparent">
              Thunder & Wonder
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-xl">
            Experience the majesty of Victoria Falls like never before. This breathtaking documentary captures the raw power and stunning beauty of one of the world's greatest natural wonders, right here in Zimbabwe.
          </p>

          {/* Metadata */}
          <div className="flex items-center space-x-4 text-sm text-gray-300">
            <span className="bg-red-600 text-white px-2 py-1 rounded">HD</span>
            <span>2023</span>
            <span>•</span>
            <span>Documentary</span>
            <span>•</span>
            <span>1h 47m</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="flex items-center justify-center space-x-2 bg-white text-black px-8 py-3 rounded hover:bg-gray-200 transition-all transform hover:scale-105 font-semibold">
              <Play className="w-5 h-5 fill-current" />
              <span>Play</span>
            </button>
            
            <button className="flex items-center justify-center space-x-2 bg-gray-600/70 text-white px-8 py-3 rounded hover:bg-gray-600 transition-all border border-gray-500">
              <Info className="w-5 h-5" />
              <span>More Info</span>
            </button>
            
            <button className="flex items-center justify-center space-x-2 bg-transparent text-white px-8 py-3 rounded hover:bg-white/20 transition-all border border-white/50">
              <Plus className="w-5 h-5" />
              <span>My List</span>
            </button>
          </div>
        </div>
      </div>

      {/* Age Rating Badge */}
      <div className="absolute bottom-8 right-8 bg-yellow-600 text-black px-3 py-1 rounded font-bold text-sm">
        PG
      </div>
    </div>
  );
};

export default HeroSection;
