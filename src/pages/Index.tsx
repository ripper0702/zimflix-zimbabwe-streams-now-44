
import React, { useState } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ContentRow from '../components/ContentRow';
import Footer from '../components/Footer';
import AdminUpload from '../components/AdminUpload';
import VideoPlayer from '../components/VideoPlayer';

interface UploadedMovie {
  id: string;
  title: string;
  description: string;
  genre: string;
  year: string;
  videoFile: File;
  videoUrl: string;
  thumbnail?: string;
}

const Index = () => {
  const [uploadedMovies, setUploadedMovies] = useState<UploadedMovie[]>([]);
  const [currentVideo, setCurrentVideo] = useState<UploadedMovie | null>(null);

  const handleMovieUploaded = (movie: UploadedMovie) => {
    setUploadedMovies(prev => [...prev, movie]);
  };

  const handlePlayMovie = (movie: UploadedMovie) => {
    setCurrentVideo(movie);
  };

  const handleClosePlayer = () => {
    setCurrentVideo(null);
  };

  // Convert uploaded movies to the format expected by ContentRow
  const uploadedMoviesForRow = uploadedMovies.map(movie => ({
    id: parseInt(movie.id),
    title: movie.title,
    image: movie.thumbnail || "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=300",
    genre: movie.genre,
    year: movie.year
  }));

  const zimbabweanMovies = [
    {
      id: 1,
      title: "Neria",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300",
      genre: "Drama",
      year: "1993"
    },
    {
      id: 2,
      title: "Yellow Card",
      image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=300",
      genre: "Sports",
      year: "2000"
    },
    {
      id: 3,
      title: "Lobola",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
      genre: "Romance",
      year: "2019"
    },
    {
      id: 4,
      title: "The Letter",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=300",
      genre: "Thriller",
      year: "2021"
    },
    {
      id: 5,
      title: "Shona Princess",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300",
      genre: "Family",
      year: "2020"
    }
  ];

  const internationalMovies = [
    {
      id: 6,
      title: "Black Panther",
      image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300",
      genre: "Action",
      year: "2018"
    },
    {
      id: 7,
      title: "Coming to America 2",
      image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=300",
      genre: "Comedy",
      year: "2021"
    },
    {
      id: 8,
      title: "The Woman King",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300",
      genre: "Historical",
      year: "2022"
    },
    {
      id: 9,
      title: "Queen of Katwe",
      image: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=300",
      genre: "Biography",
      year: "2016"
    },
    {
      id: 10,
      title: "Beasts of No Nation",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300",
      genre: "Drama",
      year: "2015"
    }
  ];

  const documentaries = [
    {
      id: 11,
      title: "Great Zimbabwe",
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=300",
      genre: "History",
      year: "2022"
    },
    {
      id: 12,
      title: "Victoria Falls",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=300",
      genre: "Nature",
      year: "2021"
    },
    {
      id: 13,
      title: "Zimbabwean Wildlife",
      image: "https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=300",
      genre: "Wildlife",
      year: "2020"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <HeroSection />
      <div className="px-4 md:px-8 space-y-8 pb-16">
        <AdminUpload 
          onMovieUploaded={handleMovieUploaded}
          uploadedMovies={uploadedMovies}
        />
        
        {uploadedMoviesForRow.length > 0 && (
          <ContentRow 
            title="Your Uploaded Movies" 
            movies={uploadedMoviesForRow}
            onMovieClick={(movieId) => {
              const movie = uploadedMovies.find(m => parseInt(m.id) === movieId);
              if (movie) handlePlayMovie(movie);
            }}
          />
        )}
        
        <ContentRow title="Zimbabwean Originals" movies={zimbabweanMovies} />
        <ContentRow title="International Hits" movies={internationalMovies} />
        <ContentRow title="Documentaries" movies={documentaries} />
        <ContentRow title="Trending Now" movies={[...zimbabweanMovies.slice(0, 3), ...internationalMovies.slice(0, 2)]} />
      </div>
      <Footer />
      
      {currentVideo && (
        <VideoPlayer
          videoUrl={currentVideo.videoUrl}
          title={currentVideo.title}
          onClose={handleClosePlayer}
        />
      )}
    </div>
  );
};

export default Index;
