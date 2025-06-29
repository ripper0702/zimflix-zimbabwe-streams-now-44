
import React, { useRef, useState, useEffect } from 'react';
import { Heart, ChatCircle, Share, Play, Pause, SpeakerHigh, SpeakerX } from '@phosphor-icons/react';
import { useSoundContext } from '../contexts/SoundContext';

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

interface VideoCardProps {
  video: Video;
  isActive: boolean;
  onAddVideo: (video: Video) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, isActive, onAddVideo }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const { playClickSound } = useSoundContext();

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isActive]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
    playClickSound();
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    playClickSound();
  };

  const handleComment = () => {
    playClickSound();
    // TODO: Open comments modal
  };

  const handleShare = () => {
    playClickSound();
    // TODO: Open share modal
  };

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden">
      <video
        ref={videoRef}
        src={video.url}
        className="h-full w-full object-cover"
        loop
        muted={isMuted}
        playsInline
        onClick={togglePlay}
      />
      
      {/* Play/Pause overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <button 
            onClick={togglePlay} 
            className="bg-white/10 backdrop-blur-xl border border-white/20 text-white p-6 rounded-full transition-all duration-300 hover:bg-white/20 hover:scale-110"
          >
            <Play size={40} weight="fill" />
          </button>
        </div>
      )}

      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent via-60% to-transparent" />

      {/* Top gradient for better readability */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/40 to-transparent" />

      {/* Video info and controls */}
      <div className="absolute bottom-0 left-0 right-0 pb-24">
        <div className="flex justify-between items-end px-4">
          {/* Left side - Video info */}
          <div className="flex-1 pr-6 max-w-[75%]">
            <div className="mb-4">
              <p className="text-white font-bold text-lg mb-2 leading-tight">{video.author}</p>
              <p className="text-white/90 text-base mb-3 leading-snug line-clamp-3">{video.title}</p>
              
              {/* Enhanced music/sound indicator */}
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <p className="text-white/80 text-sm">Original sound - {video.author}</p>
              </div>
            </div>
          </div>

          {/* Right side - Action buttons with premium styling */}
          <div className="flex flex-col items-center space-y-6 pb-2">
            {/* Like button */}
            <button 
              onClick={handleLike}
              className="flex flex-col items-center space-y-1 group"
            >
              <div className={`p-3 rounded-full backdrop-blur-xl border transition-all duration-300 ${
                isLiked 
                  ? 'bg-red-500/20 border-red-500/30 text-red-500' 
                  : 'bg-black/20 border-white/10 text-white hover:bg-white/10'
              }`}>
                <Heart 
                  size={28} 
                  weight={isLiked ? "fill" : "regular"}
                  className="transition-transform duration-300 group-active:scale-125"
                />
              </div>
              <span className="text-white text-xs font-medium">{video.likes}</span>
            </button>

            {/* Comment button */}
            <button 
              onClick={handleComment} 
              className="flex flex-col items-center space-y-1 group"
            >
              <div className="p-3 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 transition-all duration-300">
                <ChatCircle 
                  size={28} 
                  className="transition-transform duration-300 group-active:scale-125" 
                />
              </div>
              <span className="text-white text-xs font-medium">{video.comments}</span>
            </button>

            {/* Share button */}
            <button 
              onClick={handleShare} 
              className="flex flex-col items-center space-y-1 group"
            >
              <div className="p-3 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 transition-all duration-300">
                <Share 
                  size={28} 
                  className="transition-transform duration-300 group-active:scale-125" 
                />
              </div>
              <span className="text-white text-xs font-medium">{video.shares}</span>
            </button>

            {/* Sound toggle button */}
            <button 
              onClick={toggleMute} 
              className="mt-4 p-3 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 transition-all duration-300"
            >
              {isMuted ? (
                <SpeakerX size={24} />
              ) : (
                <SpeakerHigh size={24} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
