import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CameraHelperTips = ({ onClose }) => {
  const tips = [
    {
      icon: 'Sun',
      title: 'Good Lighting',
      description: 'Ensure ingredients are well-lit and visible. Natural light works best.',
      color: 'text-warning'
    },
    {
      icon: 'Focus',
      title: 'Clear Focus',
      description: 'Frame ingredients clearly within the viewfinder guides for better recognition.',
      color: 'text-primary'
    },
    {
      icon: 'Target',
      title: 'Single Items',
      description: 'Focus on one ingredient type at a time for more accurate detection.',
      color: 'text-success'
    },
    {
      icon: 'Camera',
      title: 'Steady Shots',
      description: 'Hold the device steady and avoid blurry images for best results.',
      color: 'text-accent'
    },
    {
      icon: 'Maximize',
      title: 'Fill the Frame',
      description: 'Position ingredients to fill most of the viewfinder for detailed analysis.',
      color: 'text-secondary'
    },
    {
      icon: 'Eye',
      title: 'Multiple Angles',
      description: 'Try different angles if initial recognition is not accurate.',
      color: 'text-primary'
    }
  ];

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-card rounded-2xl shadow-warm-lg border border-border max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-heading font-semibold text-foreground mb-1">
                Camera Tips
              </h2>
              <p className="text-sm text-muted-foreground">
                Get the best ingredient recognition results
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Tips Content */}
        <div className="p-6">
          <div className="space-y-6">
            {tips.map((tip, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className={`
                  w-10 h-10 rounded-lg bg-muted/30 flex items-center justify-center flex-shrink-0
                  border border-border
                `}>
                  <Icon name={tip.icon} size={20} className={tip.color} />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium text-foreground mb-1">
                    {tip.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tip.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-8 bg-primary/10 rounded-lg p-4 border border-primary/20">
            <div className="flex items-start space-x-3">
              <Icon name="Lightbulb" size={20} className="text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-primary mb-2">
                  Pro Tip
                </h3>
                <p className="text-sm text-primary/80 leading-relaxed">
                  For best results, place ingredients on a clean, contrasting background 
                  and ensure they're completely visible in the frame.
                </p>
              </div>
            </div>
          </div>

          {/* Accuracy Note */}
          <div className="mt-4 bg-muted/30 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Brain" size={18} className="text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Our AI recognition improves over time. You can always edit or correct 
                  detected ingredients before adding them to your selection.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border">
          <Button
            variant="default"
            size="lg"
            onClick={onClose}
            className="w-full"
            iconName="Camera"
            iconPosition="left"
          >
            Got it, Start Capturing
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CameraHelperTips;