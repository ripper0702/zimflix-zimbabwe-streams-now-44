
import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useSoundContext } from '../contexts/SoundContext';
import { Button } from './ui/button';

const SoundToggle = () => {
  const { isSoundEnabled, toggleSound, playClickSound } = useSoundContext();

  const handleToggle = () => {
    playClickSound();
    toggleSound();
  };

  return (
    <Button
      onClick={handleToggle}
      variant="ghost"
      size="sm"
      className="text-white hover:text-gray-300 hover:bg-white/10"
    >
      {isSoundEnabled ? (
        <Volume2 className="w-6 h-6" />
      ) : (
        <VolumeX className="w-6 h-6" />
      )}
    </Button>
  );
};

export default SoundToggle;
