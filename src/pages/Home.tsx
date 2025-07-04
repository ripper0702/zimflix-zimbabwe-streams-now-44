
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import FeaturedClip from '../components/FeaturedClip';
import ClipRow from '../components/ClipRow';
import NetflixLikePlayer from '../components/NetflixLikePlayer';
import { zimComedyVideos, getVideosByCategory } from '../data/zimComedyVideos';

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
  videoUrl?: string;
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
    category: 'Comedy',
    videoUrl: './stream vid/PAKUDA MARI - Comic Elder (360p, h264).mp4'
  });

  const categoryVideos = getVideosByCategory();

  const [clipCategories] = useState([
    {
      title: 'Trending Zim Comedy',
      clips: categoryVideos.trending
    },
    {
      title: 'Classic Zim Laughs',
      clips: categoryVideos.classic
    },
    {
      title: 'Latest Comedy Hits',
      clips: categoryVideos.latest
    }
  ]);

  const [currentVideo, setCurrentVideo] = useState<{
    videoUrl?: string;
    title: string;
  } | null>(null);

  const navigate = useNavigate();

  const handlePlayClip = (clip: Clip) => {
    console.log('Playing clip:', clip.title);
    setCurrentVideo({
      videoUrl: clip.videoUrl || `./stream vid/${clip.title}.mp4`,
      title: clip.title
    });
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

      {/* Netflix-like Video Player Modal */}
      {currentVideo && (
        <NetflixLikePlayer
          videoUrl={currentVideo.videoUrl}
          title={currentVideo.title}
          onClose={() => setCurrentVideo(null)}
          autoplay={true}
        />
      )}
    </div>
  );
};

export default Home;
