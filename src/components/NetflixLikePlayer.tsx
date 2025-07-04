import React, { useRef, useEffect, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { X, Play, Pause, Volume2, VolumeX, Maximize, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NetflixLikePlayerProps {
  videoUrl: string;
  title: string;
  description?: string;
  onClose: () => void;
  autoplay?: boolean;
}

const NetflixLikePlayer: React.FC<NetflixLikePlayerProps> = ({
  videoUrl,
  title,
  description,
  onClose,
  autoplay = false
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);
  const [showControls, setShowControls] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (videoRef.current && !playerRef.current) {
      const videoElement = videoRef.current;
      
      playerRef.current = videojs(videoElement, {
        controls: true,
        responsive: true,
        fluid: true,
        playbackRates: [0.5, 1, 1.25, 1.5, 2],
        plugins: {},
        sources: [{
          src: videoUrl,
          type: 'video/mp4'
        }],
        autoplay: autoplay,
        preload: 'auto'
      });

      // Event listeners
      playerRef.current.on('play', () => setIsPlaying(true));
      playerRef.current.on('pause', () => setIsPlaying(false));
      playerRef.current.on('ended', () => setIsPlaying(false));

      // Auto-hide controls
      let timeout: NodeJS.Timeout;
      const resetTimeout = () => {
        clearTimeout(timeout);
        setShowControls(true);
        timeout = setTimeout(() => setShowControls(false), 3000);
      };

      playerRef.current.on('mousemove', resetTimeout);
      playerRef.current.on('touchstart', resetTimeout);
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [videoUrl, autoplay]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!playerRef.current) return;

    switch (e.key) {
      case ' ':
        e.preventDefault();
        if (playerRef.current.paused()) {
          playerRef.current.play();
        } else {
          playerRef.current.pause();
        }
        break;
      case 'Escape':
        onClose();
        break;
      case 'f':
      case 'F':
        if (playerRef.current.isFullscreen()) {
          playerRef.current.exitFullscreen();
        } else {
          playerRef.current.requestFullscreen();
        }
        break;
      case 'ArrowLeft':
        e.preventDefault();
        playerRef.current.currentTime(Math.max(0, playerRef.current.currentTime() - 10));
        break;
      case 'ArrowRight':
        e.preventDefault();
        playerRef.current.currentTime(playerRef.current.currentTime() + 10);
        break;
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <style>{`
        .video-js {
          width: 100%;
          height: 100%;
        }
        
        .video-js .vjs-big-play-button {
          font-size: 3em;
          line-height: 1.5em;
          height: 1.5em;
          width: 3em;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.7);
          border: 3px solid #fff;
          color: #fff;
          left: 50%;
          top: 50%;
          margin-left: -1.5em;
          margin-top: -0.75em;
        }
        
        .video-js .vjs-control-bar {
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%);
          height: 4em;
        }
        
        .video-js .vjs-progress-control {
          background: rgba(255, 255, 255, 0.2);
        }
        
        .video-js .vjs-play-progress {
          background: #e50914;
        }
        
        .video-js .vjs-volume-bar {
          background: rgba(255, 255, 255, 0.2);
        }
        
        .video-js .vjs-volume-level {
          background: #e50914;
        }
      `}</style>

      {/* Top Bar with Title and Close */}
      {showControls && (
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 via-black/40 to-transparent p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
              {description && (
                <p className="text-gray-300 max-w-2xl line-clamp-2">{description}</p>
              )}
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
        </div>
      )}

      {/* Video Player */}
      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          className="video-js vjs-default-skin w-full h-full"
          controls
          data-setup="{}"
        />
      </div>

      {/* Help Text */}
      {showControls && (
        <div className="absolute bottom-20 left-6 text-white/60 text-sm">
          <p>Press Space to play/pause, F for fullscreen, ← → to skip, Esc to close</p>
        </div>
      )}
    </div>
  );
};

export default NetflixLikePlayer;