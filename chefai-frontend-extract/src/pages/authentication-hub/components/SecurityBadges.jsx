import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      text: 'SSL Encrypted'
    },
    {
      icon: 'Lock',
      text: 'Secure Authentication'
    },
    {
      icon: 'Eye',
      text: 'Privacy Protected'
    }
  ];

  return (
    <div className="flex items-center justify-center space-x-6 mt-8 pt-6 border-t border-border">
      {securityFeatures.map((feature, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Icon 
            name={feature.icon} 
            size={16} 
            className="text-success"
          />
          <span className="text-xs font-caption text-muted-foreground">
            {feature.text}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SecurityBadges;