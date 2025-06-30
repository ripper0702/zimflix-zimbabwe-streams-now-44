import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Plus, ThumbsUp, ThumbsDown, Share, Download, ArrowLeft, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import NetflixVideoPlayer from '@/components/NetflixVideoPlayer';
import ClipRow from '@/components/ClipRow';
import TopBar from '@/components/TopBar';
import CommentsView from '@/components/CommentsView';

interface VideoData {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  author: string;
  likes: number;
  comments: number;
  views: string;
  duration: string;
  category: string;
  releaseDate: string;
  tags: string[];
  quality: string[];
  isExclusive?: boolean;
  episodes?: VideoData[];
}

interface Comment {
  id: string;
  user: string;
  avatar: string;
  text: string;
  timestamp: Date;
  likes: number;
}

const VideoDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [video, setVideo] = useState<VideoData | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isInList, setIsInList] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState(0);
  const [relatedVideos, setRelatedVideos] = useState<VideoData[]>([]);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [mockComments, setMockComments] = useState<Comment[]>([]);

  useEffect(() => {
    // Simulate fetching video data - in real app, this would be an API call
    const fetchVideoData = () => {
      // Video data with actual local file
      const mockVideo: VideoData = {
        id: id || '1',
        title: 'PAKUDA MARI - Comic Elder',
        description: 'Zimbabwe Comedy Gold featuring Comic Elder. Pure entertainment that will keep you laughing! A hilarious comedy performance showcasing the unique humor and cultural richness of Zimbabwe.',
        thumbnail: './thumbnail.jpg',
        videoUrl: './stream vid/PAKUDA MARI - Comic Elder (360p, h264).mp4',
        author: 'Comic Elder',
        likes: 1540,
        comments: 89,
        views: '12.5K',
        duration: '8:45',
        category: 'Comedy',
        releaseDate: '2024',
        tags: ['Comedy', 'Zimbabwe', 'Entertainment', 'Culture'],
        quality: ['HD', 'SD'],
        isExclusive: false
      };

      setVideo(mockVideo);

      // Mock related videos
      const mockRelated: VideoData[] = [
        {
          id: '2',
          title: 'Zimbabwe Culture Showcase',
          description: 'Exploring traditional Zimbabwean culture',
          thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
          videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
          author: 'CultureZim',
          likes: 3456,
          comments: 187,
          views: '42K',
          duration: '25:15',
          category: 'Culture',
          releaseDate: '2024',
          tags: ['Culture'],
          quality: ['HD']
        },
        {
          id: '3',
          title: 'Cooking with Gogo',
          description: 'Traditional Zimbabwean recipes',
          thumbnail: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
          videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
          author: 'GogoCooks',
          likes: 2890,
          comments: 156,
          views: '35K',
          duration: '20:30',
          category: 'Food',
          releaseDate: '2024',
          tags: ['Cooking'],
          quality: ['HD', 'SD']
        }
      ];

      setRelatedVideos(mockRelated);
    };

    fetchVideoData();

    // Simulate fetching comments
    const fetchComments = async () => {
      const { mockComments } = await import('@/data/mockComments');
      setMockComments(mockComments);
    };

    fetchComments();
  }, [id]);

  const handlePlayVideo = (episodeIndex: number = -1) => {
    setCurrentEpisode(episodeIndex >= 0 ? episodeIndex : 0);
    setShowPlayer(true);
  };

  const handleNextEpisode = () => {
    if (video?.episodes && currentEpisode < video.episodes.length - 1) {
      setCurrentEpisode(currentEpisode + 1);
    }
  };

  const handlePreviousEpisode = () => {
    if (currentEpisode > 0) {
      setCurrentEpisode(currentEpisode - 1);
    }
  };

  const getCurrentVideo = () => {
    if (video?.episodes && video.episodes.length > 0) {
      return video.episodes[currentEpisode];
    }
    return video;
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const toggleList = () => {
    setIsInList(!isInList);
  };

const openComments = () => {\n    console.log('Opening comments');
    setIsCommentsOpen(true);
  };

  if (!video) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {showPlayer && (
        <NetflixVideoPlayer
          videoUrl={getCurrentVideo()?.videoUrl || video.videoUrl}
          title={getCurrentVideo()?.title || video.title}
          description={getCurrentVideo()?.description || video.description}
          onClose={() => setShowPlayer(false)}
          onNext={video.episodes && currentEpisode < video.episodes.length - 1 ? handleNextEpisode : undefined}
          onPrevious={currentEpisode > 0 ? handlePreviousEpisode : undefined}
          autoplay={true}
        />
      )}

      <TopBar />

      {/* Hero Section */}
      <div className="relative pt-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 py-20">
          <div className="max-w-4xl">
            {/* Back Button */}
            <Button
              onClick={() => navigate(-1)}
              variant="ghost"
              className="text-white hover:bg-white/20 mb-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>

            {/* Badges */}
            <div className="flex items-center space-x-3 mb-4">
              {video.isExclusive && (
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold">
                  EXCLUSIVE
                </Badge>
              )}
              <Badge variant="secondary" className="bg-red-600 text-white">
                {video.category}
              </Badge>
              {video.quality.includes('4K') && (
                <Badge className="bg-blue-600 text-white">4K</Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-5xl font-bold mb-4 leading-tight">{video.title}</h1>

            {/* Meta Info */}
            <div className="flex items-center space-x-6 text-gray-300 mb-6">
              <span className="text-green-400 font-semibold">
                {Math.round((video.likes / (video.likes + 1000)) * 100)}% Match
              </span>
              <span>{video.releaseDate}</span>
              <Badge variant="outline" className="border-gray-500">
                {video.duration}
              </Badge>
              <span>HD</span>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-200 mb-8 max-w-2xl leading-relaxed">
              {video.description}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4 mb-8">
              <Button
                onClick={() => handlePlayVideo()}
                className="bg-white text-black hover:bg-gray-200 px-8 py-3 text-lg font-semibold"
                size="lg"
              >
                <Play className="w-6 h-6 mr-2 fill-current" />
                Play
              </Button>

              <Button
                onClick={toggleList}
                variant="outline"
                className="border-gray-500 text-white hover:bg-white/10 px-6 py-3 bg-transparent"
                size="lg"
              >
                <Plus className="w-6 h-6 mr-2 text-white" />
                <span className="text-white">{isInList ? 'Remove from List' : 'My List'}</span>
              </Button>

              <div className="flex items-center space-x-2">
                <Button
                  onClick={toggleLike}
                  variant="ghost"
                  size="sm"
                  className={`text-white hover:bg-white/20 p-3 rounded-full ${
                    isLiked ? 'text-green-400' : ''
                  }`}
                >
                  <ThumbsUp className="w-5 h-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 p-3 rounded-full"
                >
                  <Share className="w-5 h-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 p-3 rounded-full"
                >
                  <Download className="w-5 h-5" />
                </Button>

                <Button
                  onClick={openComments}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 p-3 rounded-full"
                >
                  <MessageCircle className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {video.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-white/10"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Episodes Section */}
      {video.episodes && video.episodes.length > 0 && (
        <div className="px-6 py-8">
          <h2 className="text-2xl font-bold mb-6">Episodes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {video.episodes.map((episode, index) => (
              <div
                key={episode.id}
                className="bg-gray-900/50 rounded-lg overflow-hidden hover:bg-gray-800/50 transition-all duration-300 cursor-pointer group"
                onClick={() => handlePlayVideo(index)}
              >
                <div className="relative aspect-video">
                  <img
                    src={episode.thumbnail}
                    alt={episode.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 fill-current" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm">
                    {episode.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{episode.title}</h3>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                    {episode.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{episode.views} views</span>
                    <span>{episode.likes.toLocaleString()} likes</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats Section */}
      <div className="px-6 py-8 border-t border-gray-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{video.views}</div>
            <div className="text-gray-400">Views</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{video.likes.toLocaleString()}</div>
            <div className="text-gray-400">Likes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">{video.comments}</div>
            <div className="text-gray-400">Comments</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">4.8</div>
            <div className="text-gray-400">Rating</div>
          </div>
        </div>
      </div>

      {/* Related Content */}
      {relatedVideos.length > 0 && (
        <div className="px-6 py-8">
          <ClipRow
            title="More Like This"
            clips={relatedVideos.map(v => ({
              id: v.id,
              title: v.title,
              thumbnail: v.thumbnail,
              author: v.author,
              likes: v.likes,
              comments: v.comments,
              views: v.views,
              duration: v.duration,
              category: v.category
            }))}
            onPlayClip={(clip) => navigate(`/video/${clip.id}`)}
          />
        </div>
      )}

      {video && (
        <CommentsView
          clip={{
            id: video.id,
            title: video.title,
            thumbnail: video.thumbnail,
            author: video.author,
            likes: video.likes,
            comments: video.comments,
            views: video.views,
            duration: video.duration,
            category: video.category,
          }}
          comments={mockComments}
          onClose={() => setIsCommentsOpen(false)}
          isVisible={isCommentsOpen}
        />
      )}
    </div>
  );
};

export default VideoDetail;
