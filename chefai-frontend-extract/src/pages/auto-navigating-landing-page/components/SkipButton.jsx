import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SkipButton = ({ countdown, onSkip }) => {
  const navigate = useNavigate();

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    }
    navigate('/authentication-hub');
  };

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20">
      <div className="flex flex-col items-center space-y-4">
        {/* Skip Button */}
        <Button
          variant="outline"
          size="lg"
          onClick={handleSkip}
          iconName="ArrowRight"
          iconPosition="right"
          className="bg-background/80 backdrop-blur-sm border-2 border-primary/30 hover:border-primary hover:bg-primary/5 shadow-warm-lg"
        >
          Skip to Login
        </Button>

        {/* Progress Indicator */}
        {countdown > 0 && (
          <div className="flex items-center space-x-2 px-4 py-2 bg-background/80 backdrop-blur-sm rounded-full border border-border shadow-warm">
            <Icon name="Timer" size={16} className="text-muted-foreground" />
            <span className="text-sm font-caption text-muted-foreground">
              Auto-redirect in {countdown}s
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkipButton;