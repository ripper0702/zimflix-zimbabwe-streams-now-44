import React, { useRef, useEffect, useState } from 'react';
import Hls from 'hls.js';
import { X, SkipBack, SkipForward, Volume2, VolumeX, Settings, Play, Pause, Maximize, Minimize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  description?: string;
  thumbnail?: string;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  autoplay?: boolean;
  startTime?: number;
}

const NetflixVideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  title,
  description,
  thumbnail,
  onClose,
  onNext,
  onPrevious,
  autoplay = false,
  startTime = 0
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [buffered, setBuffered] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      
      // Check if HLS is supported
      if (Hls.isSupported()) {
        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
          backBufferLength: 90
        });
        
        hls.loadSource(videoUrl);
        hls.attachMedia(video);
        
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setIsLoading(false);
          console.log('HLS manifest parsed');
          
          if (autoplay) {
            video.play().catch(console.error);
          }
          
          // Start from specific time if provided
          if (startTime > 0) {
            video.currentTime = startTime;
          }
        });
        
        hls.on(Hls.Events.ERROR, (event, data) => {
          console.error('HLS error:', data);
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                hls.recoverMediaError();
                break;
              default:
                hls.destroy();
                break;
            }
          }
        });
        
        hlsRef.current = hls;
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Native HLS support (Safari)
        video.src = videoUrl;
        setIsLoading(false);
      } else {
        // Fallback for regular MP4
        video.src = videoUrl;
        setIsLoading(false);
      }
      
      // Set up video event listeners
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleTimeUpdate = () => {
        setCurrentTime(video.currentTime);
        updateBuffered();
      };
      const handleDurationChange = () => setDuration(video.duration);
      const handleVolumeChange = () => {
        setVolume(video.volume);
        setIsMuted(video.muted);
      };
      const handleLoadStart = () => setIsLoading(true);
      const handleCanPlay = () => setIsLoading(false);
      const handleWaiting = () => setIsLoading(true);
      const handlePlaying = () => setIsLoading(false);
      
      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('durationchange', handleDurationChange);
      video.addEventListener('volumechange', handleVolumeChange);
      video.addEventListener('loadstart', handleLoadStart);
      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('waiting', handleWaiting);
      video.addEventListener('playing', handlePlaying);
      
      // Cleanup function
      return () => {
        if (hlsRef.current) {
          hlsRef.current.destroy();
          hlsRef.current = null;
        }
        
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('durationchange', handleDurationChange);
        video.removeEventListener('volumechange', handleVolumeChange);
        video.removeEventListener('loadstart', handleLoadStart);
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('waiting', handleWaiting);
        video.removeEventListener('playing', handlePlaying);
      };
    }
  }, [videoUrl, autoplay, startTime]);

  const getVideoType = (url: string): string => {
    if (url.includes('.m3u8')) return 'application/x-mpegURL';
    if (url.includes('.mpd')) return 'application/dash+xml';
    return 'video/mp4';
  };

  const updateBuffered = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const bufferedEnd = video.buffered.length > 0 
        ? video.buffered.end(video.buffered.length - 1)
        : 0;
      setBuffered(bufferedEnd);
    }
  };

  const handleKeydown = (event: KeyboardEvent) => {
    const video = videoRef.current;
    if (!video) return;

    switch (event.code) {
      case 'Space':
        event.preventDefault();
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
        break;
      case 'ArrowLeft':
        event.preventDefault();
        video.currentTime = Math.max(0, video.currentTime - 10);
        break;
      case 'ArrowRight':
        event.preventDefault();
        video.currentTime = video.currentTime + 10;
        break;
      case 'ArrowUp':
        event.preventDefault();
        video.volume = Math.min(1, video.volume + 0.1);
        break;
      case 'ArrowDown':
        event.preventDefault();
        video.volume = Math.max(0, video.volume - 0.1);
        break;
      case 'KeyM':
        event.preventDefault();
        video.muted = !video.muted;
        break;
      case 'KeyF':
        event.preventDefault();
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          video.requestFullscreen();
        }
        break;
      case 'Escape':
        event.preventDefault();
        onClose();
        break;
    }
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const position = (event.clientX - rect.left) / rect.width;
    const newTime = position * duration;
    videoRef.current.currentTime = newTime;
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen();
    }
  };

  const skipBackward = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
  };

  const skipForward = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = videoRef.current.currentTime + 10;
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const newVolume = parseFloat(event.target.value);
    videoRef.current.volume = newVolume;
  };

  const handlePlaybackRateChange = (rate: number) => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = rate;
    setPlaybackRate(rate);
    setShowSettings(false);
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
  const bufferedPercentage = duration > 0 ? (buffered / duration) * 100 : 0;

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Video Container */}
      <div 
        className="relative w-full h-full flex items-center justify-center"
        onMouseMove={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* Video Player */}
        <video 
          ref={videoRef} 
          className="w-full h-full object-contain"
          onClick={togglePlay}
          onKeyDown={handleKeydown}
        />

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
          </div>
        )}

        {/* Top Bar */}
        {showControls && (
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent p-6">
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

        {/* Center Play Button */}
        {!isPlaying && showControls && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              onClick={togglePlay}
              className="bg-white/20 hover:bg-white/30 text-white rounded-full p-6 backdrop-blur-sm"
              size="lg"
            >
              <Play className="w-12 h-12 fill-current" />
            </Button>
          </div>
        )}

        {/* Bottom Controls */}
        {showControls && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
            {/* Progress Bar */}
            <div className="mb-6">
              <div 
                className="relative h-2 bg-white/20 rounded-full cursor-pointer hover:h-3 transition-all duration-200"
                onClick={handleSeek}
              >
                {/* Buffered Progress */}
                <div 
                  className="absolute top-0 left-0 h-full bg-white/40 rounded-full"
                  style={{ width: `${bufferedPercentage}%` }}
                />
                {/* Current Progress */}
                <div 
                  className="absolute top-0 left-0 h-full bg-red-500 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                />
                {/* Progress Thumb */}
                <div 
                  className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full opacity-0 hover:opacity-100 transition-opacity"
                  style={{ left: `calc(${progressPercentage}% - 8px)` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-300 mt-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Play/Pause */}
                <Button
                  onClick={togglePlay}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 p-2"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6 fill-current" />
                  )}
                </Button>

                {/* Skip Controls */}
                <Button
                  onClick={skipBackward}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 p-2"
                >
                  <SkipBack className="w-5 h-5" />
                </Button>

                <Button
                  onClick={skipForward}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 p-2"
                >
                  <SkipForward className="w-5 h-5" />
                </Button>

                {/* Volume Control */}
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={toggleMute}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20 p-2"
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </Button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                {/* Playback Rate Badge */}
                {playbackRate !== 1 && (
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {playbackRate}x
                  </Badge>
                )}
              </div>

              <div className="flex items-center space-x-4">
                {/* Navigation Buttons */}
                {onPrevious && (
                  <Button
                    onClick={onPrevious}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                  >
                    Previous
                  </Button>
                )}

                {onNext && (
                  <Button
                    onClick={onNext}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                  >
                    Next Episode
                  </Button>
                )}

                {/* Settings */}
                <div className="relative">
                  <Button
                    onClick={() => setShowSettings(!showSettings)}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20 p-2"
                  >
                    <Settings className="w-5 h-5" />
                  </Button>

                  {showSettings && (
                    <div className="absolute bottom-full right-0 mb-2 bg-black/90 backdrop-blur-sm rounded-lg p-4 min-w-[200px]">
                      <div className="text-white">
                        <h3 className="font-semibold mb-3">Playback Speed</h3>
                        {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((rate) => (
                          <button
                            key={rate}
                            onClick={() => handlePlaybackRateChange(rate)}
                            className={`block w-full text-left px-2 py-1 rounded hover:bg-white/20 ${
                              playbackRate === rate ? 'bg-red-500/50' : ''
                            }`}
                          >
                            {rate === 1 ? 'Normal' : `${rate}x`}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Fullscreen */}
                <Button
                  onClick={toggleFullscreen}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 p-2"
                >
                  {isFullscreen ? (
                    <Minimize className="w-5 h-5" />
                  ) : (
                    <Maximize className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS for sliders */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ef4444;
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ef4444;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default NetflixVideoPlayer;
