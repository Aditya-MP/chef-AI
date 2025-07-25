import React from 'react';
import Icon from '../../../components/AppIcon';

const HeroSection = ({ countdown }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Floating Animation Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Ingredients */}
        <div className="absolute top-20 left-10 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
          <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
            <Icon name="Apple" size={24} className="text-secondary" />
          </div>
        </div>
        
        <div className="absolute top-32 right-16 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>
          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
            <Icon name="Carrot" size={20} className="text-primary" />
          </div>
        </div>
        
        <div className="absolute bottom-40 left-20 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }}>
          <div className="w-14 h-14 bg-accent/20 rounded-full flex items-center justify-center">
            <Icon name="Fish" size={28} className="text-accent" />
          </div>
        </div>
        
        <div className="absolute bottom-32 right-12 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '4.5s' }}>
          <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
            <Icon name="Wheat" size={16} className="text-success" />
          </div>
        </div>
        
        <div className="absolute top-1/2 left-8 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '3.8s' }}>
          <div className="w-11 h-11 bg-warning/20 rounded-full flex items-center justify-center">
            <Icon name="Egg" size={22} className="text-warning" />
          </div>
        </div>
        
        <div className="absolute top-1/3 right-8 animate-bounce" style={{ animationDelay: '2.5s', animationDuration: '4.2s' }}>
          <div className="w-9 h-9 bg-primary/30 rounded-full flex items-center justify-center">
            <Icon name="Milk" size={18} className="text-primary" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Logo and Branding */}
        <div className="mb-8 lg:mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-primary rounded-2xl flex items-center justify-center shadow-warm-lg">
              <Icon name="ChefHat" size={32} className="text-primary-foreground lg:w-10 lg:h-10" />
            </div>
          </div>
          
          <h1 className="text-4xl lg:text-6xl xl:text-7xl font-heading font-semibold text-foreground mb-4">
            Chef<span className="text-primary">AI</span>
          </h1>
          
          <p className="text-lg lg:text-xl xl:text-2xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
            Transform your ingredients into delicious recipes with AI-powered cooking intelligence
          </p>
        </div>

        {/* Central Cooking Pot Illustration */}
        <div className="mb-8 lg:mb-12">
          <div className="relative inline-block">
            <div className="w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-warm-lg">
              <Icon name="CookingPot" size={64} className="text-primary-foreground lg:w-20 lg:h-20" />
            </div>
            
            {/* Steam Animation */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="flex space-x-1">
                <div className="w-1 h-8 bg-muted-foreground/30 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
                <div className="w-1 h-6 bg-muted-foreground/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="w-1 h-10 bg-muted-foreground/25 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="mb-8 lg:mb-12">
          <h2 className="text-xl lg:text-2xl xl:text-3xl font-heading font-medium text-foreground mb-4">
            Reduce Food Waste, Maximize Flavor
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Simply snap a photo of your ingredients or select from our smart list, and let our AI create personalized recipes that match your dietary preferences and cooking style.
          </p>
        </div>

        {/* Countdown Display */}
        {countdown > 0 && (
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 lg:w-24 lg:h-24 bg-primary rounded-full shadow-warm-lg">
              <span className="text-3xl lg:text-4xl font-heading font-bold text-primary-foreground">
                {countdown}
              </span>
            </div>
            <p className="text-sm lg:text-base text-muted-foreground mt-3 font-caption">
              Redirecting to login in {countdown} second{countdown !== 1 ? 's' : ''}...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;