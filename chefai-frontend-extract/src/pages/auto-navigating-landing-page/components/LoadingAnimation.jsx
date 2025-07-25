import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingAnimation = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-warm-lg animate-pulse">
              <Icon name="ChefHat" size={40} className="text-primary-foreground" />
            </div>
            
            {/* Rotating Ring */}
            <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-2xl animate-spin"></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h3 className="text-xl font-heading font-semibold text-foreground">
            Preparing Your Kitchen...
          </h3>
          <p className="text-sm text-muted-foreground font-caption">
            Setting up your AI cooking companion
          </p>
        </div>

        {/* Loading Dots */}
        <div className="flex items-center justify-center space-x-2 mt-6">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;