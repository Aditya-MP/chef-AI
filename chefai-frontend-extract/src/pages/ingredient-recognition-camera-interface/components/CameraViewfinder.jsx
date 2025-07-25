import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CameraViewfinder = ({ 
  videoRef, 
  isStreaming, 
  hasPermission, 
  capturedImage,
  onRetake,
  onFileUpload 
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer?.files;
    if (files && files[0] && files[0].type.startsWith('image/')) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        onFileUpload({ target: { files: [file] } });
      };
      reader.readAsDataURL(file);
    }
  };

  // No camera permission or support
  if (hasPermission === false) {
    return (
      <div 
        className={`
          absolute inset-0 bg-black flex flex-col items-center justify-center p-6
          ${isDragOver ? 'bg-primary/10 border-2 border-dashed border-primary' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="Camera" size={48} className="text-muted-foreground" />
          </div>
          
          <h2 className="text-xl font-heading font-medium text-white mb-3">
            Camera Not Available
          </h2>
          
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Camera access is not available on this device or browser. 
            You can still upload images from your gallery for ingredient recognition.
          </p>

          <div className="space-y-4">
            <Button
              variant="default"
              size="lg"
              iconName="Upload"
              iconPosition="left"
              className="w-full bg-primary hover:bg-primary/90"
              onClick={() => document.querySelector('input[type="file"]')?.click()}
            >
              Upload from Gallery
            </Button>

            <div className={`
              border-2 border-dashed rounded-lg p-8 transition-quick
              ${isDragOver 
                ? 'border-primary bg-primary/5' :'border-muted-foreground/30 hover:border-primary/50'
              }
            `}>
              <div className="text-center">
                <Icon 
                  name="ImagePlus" 
                  size={32} 
                  className={`mx-auto mb-3 ${
                    isDragOver ? 'text-primary' : 'text-muted-foreground'
                  }`}
                />
                <p className="text-sm text-muted-foreground">
                  Or drag and drop an image here
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show captured image
  if (capturedImage) {
    return (
      <div className="absolute inset-0 bg-black">
        <img
          src={capturedImage}
          alt="Captured ingredient"
          className="w-full h-full object-cover"
        />
        
        {/* Retake button */}
        <Button
          variant="outline"
          size="sm"
          iconName="RotateCcw"
          iconPosition="left"
          onClick={onRetake}
          className="absolute top-4 right-4 bg-black/50 border-white/30 text-white hover:bg-black/70"
        >
          Retake
        </Button>
      </div>
    );
  }

  // Show camera stream
  return (
    <div className="absolute inset-0 bg-black">
      {/* Video element */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover"
        style={{ transform: 'scaleX(-1)' }} // Mirror effect for selfie mode
      />

      {/* Loading state */}
      {hasPermission === null && (
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-sm">Initializing camera...</p>
          </div>
        </div>
      )}

      {/* Viewfinder guide */}
      {isStreaming && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Center guide lines */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-80 h-80 max-w-[80vw] max-h-[50vh]">
              {/* Corner guides */}
              <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-white/60 rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-white/60 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-white/60 rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-white/60 rounded-br-lg"></div>
              
              {/* Center guidance text */}
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                <p className="text-white/80 text-sm font-caption bg-black/50 px-3 py-1 rounded-full whitespace-nowrap">
                  Frame ingredients within guides
                </p>
              </div>
            </div>
          </div>

          {/* Grid overlay for rule of thirds */}
          <div className="absolute inset-0 opacity-20">
            {/* Vertical lines */}
            <div className="absolute left-1/3 top-0 w-px h-full bg-white"></div>
            <div className="absolute left-2/3 top-0 w-px h-full bg-white"></div>
            {/* Horizontal lines */}
            <div className="absolute top-1/3 left-0 w-full h-px bg-white"></div>
            <div className="absolute top-2/3 left-0 w-full h-px bg-white"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraViewfinder;