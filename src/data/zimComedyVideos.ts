
export interface ZimComedyVideo {
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
  videoUrl: string;
}

// Local video files in the stream vid folder
export const zimComedyVideos: ZimComedyVideo[] = [
  {
    id: 'pakuda-mari-comic-elder',
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
  }
];

export const getVideosByCategory = () => {
  return {
    trending: zimComedyVideos.slice(0, 4),
    classic: zimComedyVideos.slice(2, 6),
    latest: zimComedyVideos.slice(4, 8)
  };
};
