import React from 'react';

const Modal = ({ src, alt, onClose }) => {
  if (!src) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-gray-200 bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative w-[80vw] h-[80vh]" onClick={(e) => e.stopPropagation()}>
        <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-contain" />
      </div>
    </div>
  );
};

export default Modal; 