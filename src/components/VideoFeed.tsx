
import React, { useState, useRef, useCallback } from 'react';
import VideoCard from './VideoCard';

interface Video {
  id: string;
  url: string;
  title: string;
  author: string;
  likes: number;
  comments: number;
  shares: number;
  thumbnail?: string;
}

const VideoFeed = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videos, setVideos] = useState<Video[]>([
    {
      id: '1',
      url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      title: 'Victoria Falls Adventure',
      author: '@zimexplorer',
      likes: 1234,
      comments: 89,
      shares: 56
    },
    {
      id: '2', 
      url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
      title: 'Zimbabwe Wildlife',
      author: '@wildlifezim',
      likes: 2341,
      comments: 156,
      shares: 89
    }
  ]);

  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    
    const endY = e.changedTouches[0].clientY;
    const deltaY = startY.current - endY;
    
    if (Math.abs(deltaY) > 50) {
      if (deltaY > 0 && currentIndex < videos.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else if (deltaY < 0 && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      }
    }
    
    isDragging.current = false;
  };

  const addVideo = useCallback((video: Video) => {
    setVideos(prev => [...prev, video]);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="flex-1 relative overflow-hidden mt-14"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div 
        className="h-full transition-transform duration-300 ease-out"
        style={{ 
          transform: `translateY(-${currentIndex * 100}%)` 
        }}
      >
        {videos.map((video, index) => (
          <VideoCard
            key={video.id}
            video={video}
            isActive={index === currentIndex}
            onAddVideo={addVideo}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoFeed;
