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
    title: 'Zimbabwe Comedy Gold',
    description: 'The funniest compilation of local comedy skits featuring the best comedians from Harare and Bulawayo. Pure entertainment that will keep you laughing!',
    thumbnail: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200&h=800&fit=crop',
    author: 'zimcomedian',
    likes: 15420,
    comments: 892,
    views: '125K',
    duration: '8:45',
    category: 'Comedy'
  });

  const [clipCategories] = useState([
    {
      title: 'Trending Now',
      clips: [
        {
          id: '1',
          title: 'Street Comedy Harare',
          thumbnail: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=300&fit=crop',
          author: 'streetcomedy',
          likes: 2340,
          comments: 156,
          views: '45K',
          duration: '2:45',
          category: 'Comedy'
        },
        {
          id: '3',
          title: 'Cooking With Gogo',
          thumbnail: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
          author: 'gogocooks',
          likes: 3456,
          comments: 187,
          views: '52K',
          duration: '4:12',
          category: 'Food'
        },
        {
          id: '4',
          title: 'Zim Fashion Week',
          thumbnail: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
          author: 'zimfashion',
          likes: 4321,
          comments: 298,
          views: '63K',
          duration: '3:20',
          category: 'Fashion'
        },
      ]
    },
    {
      title: 'Comedy Hits',
      clips: [
        {
          id: '6',
          title: 'Office Comedy Zim',
          thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
          author: 'officecomedy',
          likes: 6543,
          comments: 321,
          views: '87K',
          duration: '3:45',
          category: 'Comedy'
        },
        {
          id: '7',
          title: 'Family Laughs',
          thumbnail: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop',
          author: 'familyfun',
          likes: 4567,
          comments: 234,
          views: '65K',
          duration: '2:30',
          category: 'Comedy'
        },
        {
          id: '8',
          title: 'Stand Up Night',
          thumbnail: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=300&fit=crop',
          author: 'standupzim',
          likes: 8901,
          comments: 567,
          views: '112K',
          duration: '5:20',
          category: 'Comedy'
        },
        {
          id: '9',
          title: 'Prank Masters',
          thumbnail: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
          author: 'prankzim',
          likes: 5432,
          comments: 298,
          views: '73K',
          duration: '3:15',
          category: 'Comedy'
        }
      ]
    },
    {
      title: 'Lifestyle & Culture',
      clips: [
        {
          id: '13',
          title: 'Zimbabwe Culture',
          thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
          author: 'zimculture',
          likes: 5432,
          comments: 267,
          views: '67K',
          duration: '6:30',
          category: 'Culture'
        },
        {
          id: '14',
          title: 'Street Food Tour',
          thumbnail: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
          author: 'streetfood',
          likes: 4321,
          comments: 198,
          views: '54K',
          duration: '4:15',
          category: 'Food'
        },
        {
          id: '15',
          title: 'Fashion Spotlight',
          thumbnail: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
          author: 'fashionspot',
          likes: 6543,
          comments: 345,
          views: '76K',
          duration: '3:50',
          category: 'Fashion'
        }
      ]
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
