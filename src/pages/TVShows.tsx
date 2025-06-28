
import React from 'react';
import Header from '../components/Header';
import ContentRow from '../components/ContentRow';
import Footer from '../components/Footer';

const TVShows = () => {
  // Sample TV show data
  const popularShows = [
    { id: 1, title: "Breaking Bad", image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=300", genre: "Drama", year: "2008" },
    { id: 2, title: "Game of Thrones", image: "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=300", genre: "Fantasy", year: "2011" },
    { id: 3, title: "The Office", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300", genre: "Comedy", year: "2005" },
    { id: 4, title: "Stranger Things", image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300", genre: "Sci-Fi", year: "2016" },
  ];

  const comedyShows = [
    { id: 5, title: "Friends", image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=300", genre: "Comedy", year: "1994" },
    { id: 6, title: "The Big Bang Theory", image: "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=300", genre: "Comedy", year: "2007" },
    { id: 7, title: "How I Met Your Mother", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300", genre: "Comedy", year: "2005" },
    { id: 8, title: "Brooklyn Nine-Nine", image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300", genre: "Comedy", year: "2013" },
  ];

  const handleShowClick = (showId: number) => {
    console.log(`TV Show clicked: ${showId}`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="pt-20 px-4 md:px-8 space-y-8 pb-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">TV Shows</h1>
          <p className="text-gray-400 text-lg">Binge-watch your favorite series</p>
        </div>
        
        <ContentRow 
          title="Popular Shows" 
          movies={popularShows}
          onMovieClick={handleShowClick}
        />
        
        <ContentRow 
          title="Comedy Shows" 
          movies={comedyShows}
          onMovieClick={handleShowClick}
        />
      </div>
      <Footer />
    </div>
  );
};

export default TVShows;
