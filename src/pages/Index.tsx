
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
        
        {uploadedMoviesForRow.length === 0 && (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-400 mb-4">No Movies Available</h2>
            <p className="text-gray-500">Upload your first movie using the Admin Panel above to get started!</p>
          </div>
        )}
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
