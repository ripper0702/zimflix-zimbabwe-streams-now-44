import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import FeaturedClip from '../components/FeaturedClip';
import ClipRow from '../components/ClipRow';

interface Clip {
  id: string;
  title: string;
  thumbnail: string;
  author: string;
  likes: number;
  comments: number;
  views: string;
  duration: string;
  category: string;
  description?: string;
}

const Home = () => {
  const [featuredClip] = useState({
    id: 'featured-1',
    title: 'PAKUDA MARI - Comic Elder',
    description: 'Zimbabwe Comedy Gold featuring Comic Elder. Pure entertainment that will keep you laughing!',
    thumbnail: './thumbnail.jpg',
    author: 'Comic Elder',
    likes: 1540,
    comments: 89,
    views: '12.5K',
    duration: '8:45',
    category: 'Comedy'
  });

  const [clipCategories] = useState([
    {
      title: 'Trending Now',
      clips: []
    },
    {
      title: 'Comedy Hits',
      clips: []
    },
    {
      title: 'Lifestyle & Culture',
      clips: []
    }
  ]);

  const navigate = useNavigate();

  const handlePlayClip = (clip: Clip) => {
    console.log('Playing clip:', clip.title);
    navigate(`/video/${clip.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <TopBar />
      
      {/* Main Content */}
      <div className="pt-20 pb-32">
        {/* Featured Clip Hero Section */}
        <FeaturedClip 
          clip={featuredClip} 
          onPlay={() => handlePlayClip(featuredClip)} 
        />

        {/* Clip Rows */}
        <div className="space-y-8">
          {clipCategories.map((category, index) => (
            <ClipRow
              key={index}
              title={category.title}
              clips={category.clips}
              onPlayClip={handlePlayClip}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
