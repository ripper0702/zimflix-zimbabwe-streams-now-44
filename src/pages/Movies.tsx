
import React from 'react';
import Header from '../components/Header';
import ContentRow from '../components/ContentRow';
import Footer from '../components/Footer';

const Movies = () => {
  // Sample movie data
  const actionMovies = [
    { id: 1, title: "Black Panther", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300", genre: "Action", year: "2018" },
    { id: 2, title: "The Matrix", image: "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=300", genre: "Sci-Fi", year: "1999" },
    { id: 3, title: "John Wick", image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=300", genre: "Action", year: "2014" },
    { id: 4, title: "Mad Max", image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300", genre: "Action", year: "2015" },
  ];

  const dramaMovies = [
    { id: 5, title: "The Shawshank Redemption", image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=300", genre: "Drama", year: "1994" },
    { id: 6, title: "Forrest Gump", image: "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=300", genre: "Drama", year: "1994" },
    { id: 7, title: "The Godfather", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300", genre: "Drama", year: "1972" },
    { id: 8, title: "Pulp Fiction", image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300", genre: "Crime", year: "1994" },
  ];

  const handleMovieClick = (movieId: number) => {
    console.log(`Movie clicked: ${movieId}`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="pt-20 px-4 md:px-8 space-y-8 pb-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Movies</h1>
          <p className="text-gray-400 text-lg">Discover amazing movies from around the world</p>
        </div>
        
        <ContentRow 
          title="Action Movies" 
          movies={actionMovies}
          onMovieClick={handleMovieClick}
        />
        
        <ContentRow 
          title="Drama Movies" 
          movies={dramaMovies}
          onMovieClick={handleMovieClick}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Movies;
