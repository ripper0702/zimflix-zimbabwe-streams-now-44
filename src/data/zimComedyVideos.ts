
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
  youtubeUrl: string;
  youtubeId: string;
}

export const zimComedyVideos: ZimComedyVideo[] = [
  {
    id: 'comic-elder-pakuda-mari',
    title: 'PAKUDA MARI - Comic Elder',
    description: 'Zimbabwe Comedy Gold featuring Comic Elder. Pure entertainment that will keep you laughing!',
    thumbnail: './thumbnail.jpg',
    author: 'Comic Elder',
    likes: 1540,
    comments: 89,
    views: '12.5K',
    duration: '8:45',
    category: 'Comedy',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeId: 'dQw4w9WgXcQ'
  },
  {
    id: 'kapfupi-sabhuku',
    title: 'Kapfupi - Sabhuku Wekumusha',
    description: 'Hilarious village comedy featuring the beloved Kapfupi character',
    thumbnail: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop',
    author: 'Kapfupi',
    likes: 2850,
    comments: 156,
    views: '28.3K',
    duration: '12:30',
    category: 'Comedy',
    youtubeUrl: 'https://www.youtube.com/watch?v=abc123def456',
    youtubeId: 'abc123def456'
  },
  {
    id: 'baba-tilda-church',
    title: 'Baba Tilda - Church Service Comedy',
    description: 'Church comedy that will have you rolling on the floor laughing',
    thumbnail: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop',
    author: 'Baba Tilda',
    likes: 1920,
    comments: 94,
    views: '19.7K',
    duration: '10:15',
    category: 'Comedy',
    youtubeUrl: 'https://www.youtube.com/watch?v=xyz789uvw012',
    youtubeId: 'xyz789uvw012'
  },
  {
    id: 'comic-pastor-wedding',
    title: 'Comic Pastor - Zim Wedding Chaos',
    description: 'Wedding gone wrong in true Zimbabwean style!',
    thumbnail: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop',
    author: 'Comic Pastor',
    likes: 3200,
    comments: 187,
    views: '35.8K',
    duration: '15:22',
    category: 'Comedy',
    youtubeUrl: 'https://www.youtube.com/watch?v=def456ghi789',
    youtubeId: 'def456ghi789'
  },
  {
    id: 'mai-chisina-market',
    title: 'Mai Chisina - Market Day Drama',
    description: 'Market day comedy featuring the hilarious Mai Chisina',
    thumbnail: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop',
    author: 'Mai Chisina',
    likes: 1650,
    comments: 78,
    views: '16.4K',
    duration: '9:45',
    category: 'Comedy',
    youtubeUrl: 'https://www.youtube.com/watch?v=ghi789jkl012',
    youtubeId: 'ghi789jkl012'
  },
  {
    id: 'uncle-epatan-drunk',
    title: 'Uncle Epatan - Drunk Uncle Stories',
    description: 'Uncle Epatan shares his hilarious drunk adventures',
    thumbnail: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop',
    author: 'Uncle Epatan',
    likes: 2100,
    comments: 123,
    views: '22.1K',
    duration: '11:30',
    category: 'Comedy',
    youtubeUrl: 'https://www.youtube.com/watch?v=jkl012mno345',
    youtubeId: 'jkl012mno345'
  },
  {
    id: 'gringo-zim-culture',
    title: 'Gringo - Understanding Zim Culture',
    description: 'Foreigner tries to understand Zimbabwean culture - comedy gold!',
    thumbnail: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop',
    author: 'Gringo Comedy',
    likes: 1750,
    comments: 98,
    views: '18.2K',
    duration: '13:15',
    category: 'Comedy',
    youtubeUrl: 'https://www.youtube.com/watch?v=mno345pqr678',
    youtubeId: 'mno345pqr678'
  },
  {
    id: 'sekuru-zim-politics',
    title: 'Sekuru - Zim Politics Commentary',
    description: 'Sekuru breaks down Zimbabwean politics in his own hilarious way',
    thumbnail: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop',
    author: 'Sekuru Comedy',
    likes: 2650,
    comments: 201,
    views: '31.5K',
    duration: '14:50',
    category: 'Comedy',
    youtubeUrl: 'https://www.youtube.com/watch?v=pqr678stu901',
    youtubeId: 'pqr678stu901'
  }
];

export const getVideosByCategory = () => {
  return {
    trending: zimComedyVideos.slice(0, 4),
    classic: zimComedyVideos.slice(2, 6),
    latest: zimComedyVideos.slice(4, 8)
  };
};
