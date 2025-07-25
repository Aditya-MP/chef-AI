import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CameraControls = ({
  onCapture,
  onFlashToggle,
  onCameraFlip,
  onGalleryAccess,
  onClose,
  onShowTips,
  flashEnabled = false,
  isProcessing = false,
  hasCamera = false
}) => {

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Top Controls */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center pointer-events-auto">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="bg-black/50 hover:bg-black/70 border-white/30"
        >
          <Icon name="X" size={20} className="text-white" />
        </Button>

        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onShowTips}
            className="bg-black/50 hover:bg-black/70 border-white/30"
          >
            <Icon name="HelpCircle" size={20} className="text-white" />
          </Button>

          {hasCamera && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onFlashToggle}
              className={`
                bg-black/50 hover:bg-black/70 border-white/30
                ${flashEnabled ? 'bg-yellow-500/80 hover:bg-yellow-600/80' : ''}
              `}
            >
              <Icon 
                name={flashEnabled ? "Zap" : "ZapOff"} 
                size={20} 
                className={flashEnabled ? "text-black" : "text-white"}
              />
            </Button>
          )}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-auto">
        <div className="flex items-center justify-center space-x-8">
          {/* Gallery Access */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onGalleryAccess}
            className="bg-black/50 hover:bg-black/70 border-white/30 w-12 h-12 rounded-lg"
          >
            <Icon name="Image" size={24} className="text-white" />
          </Button>

          {/* Main Capture Button */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={onCapture}
              disabled={isProcessing || !hasCamera}
              className={`
                w-20 h-20 rounded-full border-4 border-white bg-white/10 hover:bg-white/20
                backdrop-blur-sm transition-all duration-200 
                ${isProcessing ? 'scale-110 animate-pulse' : 'hover:scale-105'}
              `}
            >
              {isProcessing ? (
                <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <Icon name="Camera" size={24} className="text-black" />
                </div>
              )}
            </Button>

            {/* Capture button ring animation */}
            {isProcessing && (
              <div className="absolute inset-0 w-20 h-20 rounded-full border-2 border-white/50 animate-ping" />
            )}
          </div>

          {/* Camera Flip */}
          {hasCamera && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onCameraFlip}
              className="bg-black/50 hover:bg-black/70 border-white/30 w-12 h-12 rounded-lg"
            >
              <Icon name="RefreshCw" size={24} className="text-white" />
            </Button>
          )}
        </div>

        {/* Status Text */}
        <div className="text-center mt-4">
          {isProcessing ? (
            <p className="text-white/80 text-sm font-caption">
              Processing image...
            </p>
          ) : hasCamera ? (
            <p className="text-white/80 text-sm font-caption">
              Tap to capture ingredients
            </p>
          ) : (
            <p className="text-white/80 text-sm font-caption">
              Upload image to detect ingredients
            </p>
          )}
        </div>
      </div>

      {/* Side Instructions (Desktop) */}
      {hasCamera && (
        <div className="hidden lg:block absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white max-w-xs">
            <h3 className="font-medium mb-2">Quick Tips</h3>
            <ul className="text-sm space-y-1 text-white/80">
              <li>• Frame ingredients clearly</li>
              <li>• Ensure good lighting</li>
              <li>• Focus on one ingredient type</li>
              <li>• Hold steady for best results</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraControls;