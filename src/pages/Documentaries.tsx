
import React from 'react';
import Header from '../components/Header';
import ContentRow from '../components/ContentRow';
import Footer from '../components/Footer';

const Documentaries = () => {
  // Sample documentary data
  const natureDocumentaries = [
    { id: 1, title: "Planet Earth", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=300", genre: "Nature", year: "2006" },
    { id: 2, title: "Blue Planet", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300", genre: "Nature", year: "2001" },
    { id: 3, title: "Our Planet", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300", genre: "Nature", year: "2019" },
    { id: 4, title: "Africa", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=300", genre: "Nature", year: "2013" },
  ];

  const historyDocumentaries = [
    { id: 5, title: "The World Wars", image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=300", genre: "History", year: "2014" },
    { id: 6, title: "Ancient Civilizations", image: "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=300", genre: "History", year: "2017" },
    { id: 7, title: "The Civil War", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300", genre: "History", year: "1990" },
    { id: 8, title: "Medieval Lives", image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300", genre: "History", year: "2004" },
  ];

  const handleDocumentaryClick = (docId: number) => {
    console.log(`Documentary clicked: ${docId}`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="pt-20 px-4 md:px-8 space-y-8 pb-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Documentaries</h1>
          <p className="text-gray-400 text-lg">Explore the world through powerful documentaries</p>
        </div>
        
        <ContentRow 
          title="Nature Documentaries" 
          movies={natureDocumentaries}
          onMovieClick={handleDocumentaryClick}
        />
        
        <ContentRow 
          title="History Documentaries" 
          movies={historyDocumentaries}
          onMovieClick={handleDocumentaryClick}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Documentaries;
