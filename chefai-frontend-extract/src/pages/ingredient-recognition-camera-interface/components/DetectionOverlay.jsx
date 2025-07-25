import React, { useState, useEffect } from 'react';

const DetectionOverlay = ({ boundingBoxes, videoRef }) => {
  const [videoRect, setVideoRect] = useState({ width: 0, height: 0, left: 0, top: 0 });

  useEffect(() => {
    const updateVideoRect = () => {
      if (videoRef?.current) {
        const rect = videoRef.current.getBoundingClientRect();
        setVideoRect(rect);
      }
    };

    updateVideoRect();
    window.addEventListener('resize', updateVideoRect);
    
    return () => {
      window.removeEventListener('resize', updateVideoRect);
    };
  }, [videoRef]);

  if (!boundingBoxes?.length || !videoRect.width) return null;

  return (
    <div 
      className="absolute pointer-events-none z-10"
      style={{
        left: videoRect.left,
        top: videoRect.top,
        width: videoRect.width,
        height: videoRect.height,
      }}
    >
      {boundingBoxes.map((box) => (
        <div
          key={box.id}
          className="absolute border-2 rounded-lg animate-pulse"
          style={{
            left: `${box.x * 100}%`,
            top: `${box.y * 100}%`,
            width: `${box.width * 100}%`,
            height: `${box.height * 100}%`,
            borderColor: box.ingredient.color || '#7C9885',
            backgroundColor: `${box.ingredient.color || '#7C9885'}20`,
          }}
        >
          {/* Ingredient Label */}
          <div 
            className="absolute -top-8 left-0 px-2 py-1 rounded-md text-xs font-medium text-white shadow-warm"
            style={{ 
              backgroundColor: box.ingredient.color || '#7C9885',
            }}
          >
            {box.ingredient.name}
            <span className="ml-1 opacity-80">
              {Math.round(box.confidence * 100)}%
            </span>
          </div>

          {/* Corner markers for better visibility */}
          <div className="absolute -top-1 -left-1 w-3 h-3 rounded-tl-md border-l-2 border-t-2" 
               style={{ borderColor: box.ingredient.color || '#7C9885' }} />
          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-tr-md border-r-2 border-t-2" 
               style={{ borderColor: box.ingredient.color || '#7C9885' }} />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-bl-md border-l-2 border-b-2" 
               style={{ borderColor: box.ingredient.color || '#7C9885' }} />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-br-md border-r-2 border-b-2" 
               style={{ borderColor: box.ingredient.color || '#7C9885' }} />

          {/* Confidence indicator */}
          <div className="absolute -bottom-6 right-0 flex items-center">
            <div className="bg-black/70 text-white text-xs px-2 py-1 rounded-full font-mono">
              {Math.round(box.confidence * 100)}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetectionOverlay;