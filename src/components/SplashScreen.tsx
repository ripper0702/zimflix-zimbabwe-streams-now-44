
import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const phases = [
      () => setAnimationPhase(1), // Logo fade in
      () => setAnimationPhase(2), // Text animation
      () => setAnimationPhase(3), // Particles
      () => setAnimationPhase(4), // Final glow
      () => {
        setIsVisible(false);
        setTimeout(onComplete, 500);
      }
    ];

    const timeouts = [
      setTimeout(phases[0], 300),
      setTimeout(phases[1], 1200),
      setTimeout(phases[2], 2000),
      setTimeout(phases[3], 2800),
      setTimeout(phases[4], 3800)
    ];

    return () => timeouts.forEach(clearTimeout);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-green-400/30 to-yellow-400/30 rounded-full blur-xl animate-pulse opacity-60"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-gradient-to-r from-yellow-400/30 to-red-400/30 rounded-full blur-xl animate-pulse opacity-60 animation-delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-gradient-to-r from-red-400/30 to-green-400/30 rounded-full blur-xl animate-pulse opacity-60 animation-delay-2000"></div>
        
        {/* Liquid Waves */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-green-400/20 via-yellow-400/10 to-transparent transform rotate-1 animate-wave"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-yellow-400/20 via-red-400/10 to-transparent transform -rotate-1 animate-wave-reverse"></div>
        </div>

        {/* Particles */}
        {animationPhase >= 3 && (
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-float opacity-60"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>
        )}
      </div>

      {/* Main Logo Container */}
      <div className="relative z-10 text-center">
        {/* Logo Text */}
        <div className={`transform transition-all duration-1000 ${animationPhase >= 1 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-8'}`}>
          <h1 className="text-8xl md:text-9xl font-black bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 bg-clip-text text-transparent relative">
            <span className="relative inline-block">
              {'ZimFlix'.split('').map((letter, index) => (
                <span
                  key={index}
                  className="inline-block animate-bounce opacity-0"
                  style={{
                    animationDelay: `${0.1 * index + 1.2}s`,
                    animationFillMode: 'forwards'
                  }}
                >
                  {letter}
                </span>
              ))}
            </span>
            
            {/* Glow Effect */}
            {animationPhase >= 4 && (
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 bg-clip-text text-transparent blur-lg opacity-50 animate-pulse-glow"></div>
            )}
          </h1>
        </div>

        {/* Tagline */}
        <div className={`mt-8 transform transition-all duration-1000 delay-500 ${animationPhase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-xl md:text-2xl text-white/80 font-light tracking-wide">
            Zimbabwe's Premier Streaming Experience
          </p>
          <div className="mt-4 w-32 h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent mx-auto animate-shimmer"></div>
        </div>

        {/* Loading Animation */}
        <div className={`mt-12 transform transition-all duration-1000 delay-1000 ${animationPhase >= 3 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex justify-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-gradient-to-r from-green-400 to-yellow-400 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.3}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/40 pointer-events-none"></div>
    </div>
  );
};

export default SplashScreen;
