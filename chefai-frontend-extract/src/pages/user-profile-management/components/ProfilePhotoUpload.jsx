import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfilePhotoUpload = ({ 
  currentPhoto = null, 
  onPhotoChange = () => {},
  className = "" 
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = async (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const reader = new FileReader();
      reader.onload = (e) => {
        onPhotoChange(e.target.result);
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload failed:', error);
      setUploading(false);
    }
  };

  const handleCameraCapture = () => {
    // Simulate camera capture
    console.log('Camera capture initiated');
    // In real implementation, this would open camera interface
  };

  const handleRemovePhoto = () => {
    onPhotoChange(null);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="text-center">
        <h3 className="text-lg font-heading font-medium text-foreground mb-2">
          Profile Photo
        </h3>
        <p className="text-sm text-muted-foreground">
          Upload a photo to personalize your cooking profile
        </p>
      </div>

      {/* Photo Upload Area */}
      <div
        className={`
          relative w-32 h-32 mx-auto rounded-full border-2 border-dashed transition-smooth overflow-hidden
          ${dragActive 
            ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50'
          }
          ${uploading ? 'opacity-50' : ''}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {currentPhoto ? (
          <div className="relative w-full h-full group">
            <Image
              src={currentPhoto}
              alt="Profile photo"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-quick flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRemovePhoto}
                className="text-white hover:bg-white/20"
                aria-label="Remove photo"
              >
                <Icon name="Trash2" size={20} />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-4">
            {uploading ? (
              <div className="flex flex-col items-center space-y-2">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xs font-caption text-muted-foreground">
                  Uploading...
                </span>
              </div>
            ) : (
              <>
                <Icon 
                  name="User" 
                  size={32} 
                  className="text-muted-foreground mb-2"
                />
                <span className="text-xs font-caption text-muted-foreground text-center">
                  Drop photo here
                </span>
              </>
            )}
          </div>
        )}

        {/* Loading Overlay */}
        {uploading && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Upload Options */}
      <div className="flex flex-col sm:flex-row gap-2 justify-center">
        <Button
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          iconName="Upload"
          iconPosition="left"
          className="flex-1 sm:flex-none"
        >
          Choose File
        </Button>
        
        <Button
          variant="outline"
          onClick={handleCameraCapture}
          disabled={uploading}
          iconName="Camera"
          iconPosition="left"
          className="flex-1 sm:flex-none"
        >
          Take Photo
        </Button>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Upload Guidelines */}
      <div className="text-center">
        <p className="text-xs font-caption text-muted-foreground">
          Supported formats: JPG, PNG, GIF (max 5MB)
        </p>
      </div>
    </div>
  );
};

export default ProfilePhotoUpload;