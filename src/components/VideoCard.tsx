
import React, { useRef, useState, useEffect } from 'react';
import { Heart, ChatCircle, Share, Play, Pause, SpeakerHigh, SpeakerX } from 'phosphor-react';
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
    <div className="relative h-screen w-full bg-black">
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
        <div className="absolute inset-0 flex items-center justify-center">
          <button onClick={togglePlay} className="text-white/80">
            <Play size={64} weight="fill" />
          </button>
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Video info */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex justify-between items-end">
          <div className="flex-1 pr-4">
            <p className="text-white font-semibold text-sm mb-1">{video.author}</p>
            <p className="text-white text-sm mb-2 leading-tight">{video.title}</p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col items-center space-y-4">
            <button 
              onClick={handleLike}
              className="flex flex-col items-center space-y-1"
            >
              <Heart 
                size={28} 
                weight={isLiked ? "fill" : "regular"}
                className={isLiked ? "text-red-500" : "text-white"}
              />
              <span className="text-white text-xs">{video.likes}</span>
            </button>

            <button onClick={handleComment} className="flex flex-col items-center space-y-1">
              <ChatCircle size={28} className="text-white" />
              <span className="text-white text-xs">{video.comments}</span>
            </button>

            <button onClick={handleShare} className="flex flex-col items-center space-y-1">
              <Share size={28} className="text-white" />
              <span className="text-white text-xs">{video.shares}</span>
            </button>

            <button onClick={toggleMute} className="mt-2">
              {isMuted ? (
                <SpeakerX size={24} className="text-white" />
              ) : (
                <SpeakerHigh size={24} className="text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
