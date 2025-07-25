import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import BenefitCards from './components/BenefitCards';
import SkipButton from './components/SkipButton';
import LoadingAnimation from './components/LoadingAnimation';

const AutoNavigatingLandingPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [hasStartedCountdown, setHasStartedCountdown] = useState(false);

  useEffect(() => {
    // Start countdown after a brief delay to allow page to load
    const startTimer = setTimeout(() => {
      setHasStartedCountdown(true);
    }, 1000);

    return () => clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    if (!hasStartedCountdown) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      // Countdown finished, show loading and navigate
      handleAutoNavigation();
    }
  }, [countdown, hasStartedCountdown]);

  const handleAutoNavigation = () => {
    setIsLoading(true);
    
    // Simulate loading time before navigation
    setTimeout(() => {
      navigate('/authentication-hub');
    }, 1500);
  };

  const handleSkip = () => {
    setCountdown(0);
    setIsLoading(true);
    
    setTimeout(() => {
      navigate('/authentication-hub');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Loading Animation Overlay */}
      <LoadingAnimation isVisible={isLoading} />

      {/* Hero Section */}
      <HeroSection countdown={hasStartedCountdown ? countdown : 0} />

      {/* Benefits Section */}
      <BenefitCards />

      {/* Skip Button */}
      <SkipButton 
        countdown={hasStartedCountdown ? countdown : 0} 
        onSkip={handleSkip}
      />

      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"></div>
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, var(--color-primary) 1px, transparent 1px),
                             radial-gradient(circle at 75% 75%, var(--color-secondary) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>
    </div>
  );
};

export default AutoNavigatingLandingPage;