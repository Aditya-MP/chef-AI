import React from 'react';
import Icon from '../../../components/AppIcon';

const BenefitCards = () => {
  const benefits = [
    {
      id: 1,
      icon: "Recycle",
      title: "Reduce Food Waste",
      description: "Turn leftover ingredients into delicious meals and minimize kitchen waste with smart recipe suggestions.",
      color: "success"
    },
    {
      id: 2,
      icon: "Zap",
      title: "Instant Recipes",
      description: "Get personalized recipe recommendations in seconds based on what you have available right now.",
      color: "primary"
    },
    {
      id: 3,
      icon: "Camera",
      title: "Smart Recognition",
      description: "Simply take a photo of your ingredients and let AI identify them automatically for you.",
      color: "secondary"
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      success: {
        bg: "bg-success/10",
        icon: "text-success",
        border: "border-success/20"
      },
      primary: {
        bg: "bg-primary/10",
        icon: "text-primary",
        border: "border-primary/20"
      },
      secondary: {
        bg: "bg-secondary/10",
        icon: "text-secondary",
        border: "border-secondary/20"
      }
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <div className="py-12 lg:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl lg:text-3xl xl:text-4xl font-heading font-semibold text-foreground mb-4">
            Why Choose ChefAI?
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the future of cooking with intelligent recipe generation tailored to your ingredients and preferences.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit) => {
            const colors = getColorClasses(benefit.color);
            
            return (
              <div
                key={benefit.id}
                className={`
                  group relative p-6 lg:p-8 rounded-2xl border-2 ${colors.border} ${colors.bg}
                  hover:shadow-warm-lg transition-smooth hover:-translate-y-1
                  bg-card/50 backdrop-blur-sm
                `}
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className={`
                    inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20
                    bg-background rounded-xl shadow-warm group-hover:shadow-warm-md transition-smooth
                  `}>
                    <Icon 
                      name={benefit.icon} 
                      size={32} 
                      className={`${colors.icon} lg:w-10 lg:h-10`}
                    />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl lg:text-2xl font-heading font-semibold text-foreground mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                {/* Hover Effect Arrow */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-smooth">
                  <Icon 
                    name="ArrowRight" 
                    size={20} 
                    className={colors.icon}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Features */}
        <div className="mt-12 lg:mt-16 text-center">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center space-y-2">
              <Icon name="Users" size={24} className="text-primary" />
              <span className="text-sm font-caption text-muted-foreground">Family Friendly</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <Icon name="Clock" size={24} className="text-secondary" />
              <span className="text-sm font-caption text-muted-foreground">Quick & Easy</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <Icon name="Heart" size={24} className="text-success" />
              <span className="text-sm font-caption text-muted-foreground">Health Focused</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <Icon name="Sparkles" size={24} className="text-accent" />
              <span className="text-sm font-caption text-muted-foreground">AI Powered</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitCards;