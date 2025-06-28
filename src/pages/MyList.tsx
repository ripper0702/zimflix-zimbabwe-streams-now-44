
import React, { useState } from 'react';
import Header from '../components/Header';
import ContentRow from '../components/ContentRow';
import Footer from '../components/Footer';

const MyList = () => {
  const [myListItems, setMyListItems] = useState([
    { id: 1, title: "Victoria Falls Documentary", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=300", genre: "Documentary", year: "2023" },
    { id: 2, title: "Great Zimbabwe", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=300", genre: "History", year: "2022" },
    { id: 3, title: "Zimbabwe Wildlife", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300", genre: "Nature", year: "2023" },
  ]);

  const handleItemClick = (itemId: number) => {
    console.log(`My List item clicked: ${itemId}`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="pt-20 px-4 md:px-8 space-y-8 pb-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">My List</h1>
          <p className="text-gray-400 text-lg">Your personal collection of saved content</p>
        </div>
        
        {myListItems.length > 0 ? (
          <ContentRow 
            title="Saved Items" 
            movies={myListItems}
            onMovieClick={handleItemClick}
          />
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-400 mb-4">Your list is empty</h2>
            <p className="text-gray-500">Add movies and shows to your list to watch them later!</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyList;
