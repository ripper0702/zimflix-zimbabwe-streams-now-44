
import React, { useState, useRef, useEffect } from 'react';
import VideoFeed from '../components/VideoFeed';
import TopBar from '../components/TopBar';

const Home = () => {
  return (
    <div className="h-screen flex flex-col bg-black">
      <TopBar />
      <VideoFeed />
    </div>
  );
};

export default Home;
