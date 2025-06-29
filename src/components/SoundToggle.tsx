
import React from 'react';
import { SpeakerHigh, SpeakerX } from '@phosphor-icons/react';
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
      className="text-white hover:text-gray-300 hover:bg-white/10 p-2"
    >
      {isSoundEnabled ? (
        <SpeakerHigh size={20} />
      ) : (
        <SpeakerX size={20} />
      )}
    </Button>
  );
};

export default SoundToggle;
