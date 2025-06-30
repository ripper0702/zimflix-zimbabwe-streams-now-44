import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Fixed backdrop div */}
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />
      
      {/* Centered glassmorphic panel */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-black/40 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl animate-fade-in overflow-hidden">
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
