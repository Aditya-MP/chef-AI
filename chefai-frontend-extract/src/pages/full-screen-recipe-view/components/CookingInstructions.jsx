import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CookingInstructions = ({ 
  recipe = null,
  cookingMode = false,
  className = ""
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [timers, setTimers] = useState({});
  const [activeTimers, setActiveTimers] = useState({});

  // Mock cooking instructions
  const instructions = recipe?.instructions || [
    {
      id: 1,
      step: 1,
      title: "Prepare the ingredients",
      description: "Clean and slice the mushrooms. Mince the garlic. Measure out the Arborio rice and grate the Parmesan cheese.",
      duration: null,
      tips: "Pat mushrooms dry with paper towels for better browning."
    },
    {
      id: 2,
      step: 2,
      title: "Heat the broth",
      description: "In a medium saucepan, bring the vegetable broth to a gentle simmer over medium heat. Keep it warm throughout the cooking process.",
      duration: 5,
      tips: "Warm broth helps maintain the cooking temperature when added to the rice."
    },
    {
      id: 3,
      step: 3,
      title: "Sauté the mushrooms",
      description: "Heat 2 tablespoons of olive oil in a large, heavy-bottomed pan over medium-high heat. Add mushrooms and cook until golden brown and crispy.",
      duration: 8,
      tips: "Don't overcrowd the pan - cook mushrooms in batches if necessary."
    },
    {
      id: 4,
      step: 4,
      title: "Add aromatics",
      description: "Add minced garlic and fresh thyme to the mushrooms. Cook for another minute until fragrant. Season with salt and pepper.",
      duration: 1,
      tips: "Be careful not to burn the garlic - it can turn bitter quickly."
    },
    {
      id: 5,
      step: 5,
      title: "Toast the rice",
      description: "Add the Arborio rice to the pan and stir to coat with the oil and mushroom mixture. Toast for 2-3 minutes until the edges become translucent.",
      duration: 3,
      tips: "This step helps the rice maintain its texture and prevents it from becoming mushy."
    },
    {
      id: 6,
      step: 6,
      title: "Add wine and deglaze",
      description: "Pour in the white wine and stir constantly until it's almost completely absorbed. This should take about 2-3 minutes.",
      duration: 3,
      tips: "The wine adds depth of flavor and helps deglaze any browned bits from the pan."
    },
    {
      id: 7,
      step: 7,
      title: "Add broth gradually",
      description: "Add warm broth one ladle at a time, stirring constantly. Wait until each addition is almost absorbed before adding more. This process takes about 18-20 minutes.",
      duration: 20,
      tips: "Patience is key - don't rush this step. The constant stirring releases the rice's starch, creating the creamy texture."
    },
    {
      id: 8,
      step: 8,
      title: "Finish the risotto",
      description: "Remove from heat and stir in the heavy cream and grated Parmesan cheese. Season with salt and pepper to taste. The risotto should be creamy but still have a slight bite to the rice.",
      duration: null,
      tips: "Add the cream and cheese off the heat to prevent the mixture from becoming stringy."
    }
  ];

  // Timer management
  useEffect(() => {
    const intervals = {};
    
    Object.entries(activeTimers).forEach(([stepId, timeLeft]) => {
      if (timeLeft > 0) {
        intervals[stepId] = setInterval(() => {
          setActiveTimers(prev => {
            const newTime = prev[stepId] - 1;
            if (newTime <= 0) {
              // Timer finished
              console.log(`Timer finished for step ${stepId}`);
              const { [stepId]: removed, ...rest } = prev;
              return rest;
            }
            return { ...prev, [stepId]: newTime };
          });
        }, 1000);
      }
    });

    return () => {
      Object.values(intervals).forEach(clearInterval);
    };
  }, [activeTimers]);

  const startTimer = (stepId, duration) => {
    const durationInSeconds = duration * 60; // Convert minutes to seconds
    setActiveTimers(prev => ({
      ...prev,
      [stepId]: durationInSeconds
    }));
  };

  const stopTimer = (stepId) => {
    setActiveTimers(prev => {
      const { [stepId]: removed, ...rest } = prev;
      return rest;
    });
  };

  const toggleStepComplete = (stepId) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepId)) {
      newCompleted.delete(stepId);
    } else {
      newCompleted.add(stepId);
    }
    setCompletedSteps(newCompleted);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const goToStep = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const nextStep = () => {
    if (currentStep < instructions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className={`bg-card rounded-lg border border-border shadow-warm ${className}`}>
      {/* Header */}
      <div className="p-4 lg:p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Cooking Instructions
          </h3>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm font-caption text-muted-foreground">
              Step {currentStep + 1} of {instructions.length}
            </span>
            <div className="w-16 bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-smooth"
                style={{ 
                  width: `${((currentStep + 1) / instructions.length) * 100}%` 
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Current Step Display (Cooking Mode) */}
      {cookingMode ? (
        <div className="p-6 lg:p-8">
          <div className="max-w-2xl mx-auto">
            {/* Step Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-full mb-4">
                <span className="text-lg font-mono font-semibold text-primary-foreground">
                  {instructions[currentStep].step}
                </span>
              </div>
              <h4 className="text-2xl font-heading font-semibold text-foreground mb-2">
                {instructions[currentStep].title}
              </h4>
            </div>

            {/* Step Description */}
            <div className="bg-muted/50 rounded-lg p-6 mb-6">
              <p className="text-lg leading-relaxed text-foreground">
                {instructions[currentStep].description}
              </p>
              
              {instructions[currentStep].tips && (
                <div className="mt-4 p-4 bg-accent/10 rounded-lg border-l-4 border-accent">
                  <div className="flex items-start space-x-2">
                    <Icon name="Lightbulb" size={16} className="text-accent mt-0.5" />
                    <p className="text-sm text-accent-foreground">
                      <strong>Tip:</strong> {instructions[currentStep].tips}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Timer Section */}
            {instructions[currentStep].duration && (
              <div className="bg-card border border-border rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="Timer" size={20} className="text-secondary" />
                    <span className="font-medium text-foreground">
                      {instructions[currentStep].duration} minutes
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {activeTimers[instructions[currentStep].id] ? (
                      <>
                        <span className="font-mono text-lg text-secondary">
                          {formatTime(activeTimers[instructions[currentStep].id])}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => stopTimer(instructions[currentStep].id)}
                        >
                          Stop
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => startTimer(instructions[currentStep].id, instructions[currentStep].duration)}
                      >
                        <Icon name="Play" size={16} className="mr-2" />
                        Start Timer
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                <Icon name="ChevronLeft" size={16} className="mr-2" />
                Previous
              </Button>

              <Button
                variant={completedSteps.has(instructions[currentStep].id) ? "success" : "outline"}
                onClick={() => toggleStepComplete(instructions[currentStep].id)}
              >
                <Icon 
                  name={completedSteps.has(instructions[currentStep].id) ? "CheckCircle" : "Circle"} 
                  size={16} 
                  className="mr-2"
                />
                {completedSteps.has(instructions[currentStep].id) ? 'Completed' : 'Mark Complete'}
              </Button>

              <Button
                variant="default"
                onClick={nextStep}
                disabled={currentStep === instructions.length - 1}
              >
                Next
                <Icon name="ChevronRight" size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        /* All Steps List View */
        <div className="p-4 lg:p-6">
          <div className="space-y-4">
            {instructions.map((instruction, index) => (
              <div
                key={instruction.id}
                className={`
                  border rounded-lg transition-quick cursor-pointer
                  ${index === currentStep
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-primary/5'
                  }
                  ${completedSteps.has(instruction.id) ? 'opacity-75' : ''}
                `}
                onClick={() => goToStep(index)}
              >
                <div className="p-4">
                  <div className="flex items-start space-x-4">
                    {/* Step Number */}
                    <div className={`
                      flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0
                      ${completedSteps.has(instruction.id)
                        ? 'bg-success text-success-foreground'
                        : index === currentStep
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                      }
                    `}>
                      {completedSteps.has(instruction.id) ? (
                        <Icon name="Check" size={16} />
                      ) : (
                        <span className="font-mono font-semibold text-sm">
                          {instruction.step}
                        </span>
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`
                          font-medium
                          ${completedSteps.has(instruction.id)
                            ? 'text-muted-foreground line-through'
                            : 'text-foreground'
                          }
                        `}>
                          {instruction.title}
                        </h4>
                        
                        {instruction.duration && (
                          <div className="flex items-center space-x-1">
                            <Icon name="Clock" size={14} className="text-muted-foreground" />
                            <span className="text-sm font-mono text-muted-foreground">
                              {instruction.duration} min
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <p className={`
                        text-sm leading-relaxed
                        ${completedSteps.has(instruction.id)
                          ? 'text-muted-foreground'
                          : 'text-muted-foreground'
                        }
                      `}>
                        {instruction.description}
                      </p>

                      {instruction.tips && index === currentStep && (
                        <div className="mt-3 p-3 bg-accent/10 rounded-lg border-l-4 border-accent">
                          <div className="flex items-start space-x-2">
                            <Icon name="Lightbulb" size={14} className="text-accent mt-0.5" />
                            <p className="text-sm text-accent-foreground">
                              <strong>Tip:</strong> {instruction.tips}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Timer Controls */}
                    {instruction.duration && (
                      <div className="flex items-center space-x-2">
                        {activeTimers[instruction.id] ? (
                          <>
                            <span className="font-mono text-sm text-secondary">
                              {formatTime(activeTimers[instruction.id])}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                stopTimer(instruction.id);
                              }}
                              className="w-8 h-8"
                            >
                              <Icon name="Square" size={14} />
                            </Button>
                          </>
                        ) : (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              startTimer(instruction.id, instruction.duration);
                            }}
                            className="w-8 h-8"
                          >
                            <Icon name="Play" size={14} />
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CookingInstructions;