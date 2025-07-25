import React from 'react';
import Icon from '../../../components/AppIcon';

const ProcessingIndicator = ({ progress = 0, step = 'Processing...' }) => {
  return (
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-30 flex items-center justify-center">
      <div className="bg-card/90 backdrop-blur-md rounded-2xl p-8 max-w-sm mx-4 text-center">
        {/* AI Processing Icon */}
        <div className="relative mb-6">
          <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
            <Icon name="Sparkles" size={32} className="text-primary animate-pulse" />
          </div>
          <div className="absolute inset-0 w-16 h-16 mx-auto border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        {/* Processing Step */}
        <div className="space-y-2">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            AI Analysis in Progress
          </h3>
          <p className="text-sm text-muted-foreground">
            {step}
          </p>
          <div className="text-xs text-primary font-mono">
            {Math.round(progress)}%
          </div>
        </div>

        {/* Gemini Branding */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Zap" size={14} />
            <span>Powered by Google Gemini</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingIndicator;