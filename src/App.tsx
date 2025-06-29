
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SoundProvider } from "./contexts/SoundContext";
import { useState } from "react";
import SplashScreen from "./components/SplashScreen";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Upload from "./pages/Upload";
import Likes from "./pages/Likes";
import Profile from "./pages/Profile";
import MobileNav from "./components/MobileNav";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SoundProvider>
          <Toaster />
          <Sonner />
          {showSplash ? (
            <SplashScreen onComplete={handleSplashComplete} />
          ) : (
            <BrowserRouter>
              <div className="h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/upload" element={<Upload />} />
                  <Route path="/likes" element={<Likes />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
                <MobileNav />
              </div>
            </BrowserRouter>
          )}
        </SoundProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
