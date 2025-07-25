import React from 'react';
import Button from '../../../components/ui/Button';


const SocialAuth = ({ loading, onSocialAuth }) => {
  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'bg-white border-border text-foreground hover:bg-muted'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      color: 'bg-blue-600 border-blue-600 text-white hover:bg-blue-700'
    }
  ];

  const handleSocialLogin = (provider) => {
    onSocialAuth(provider);
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {socialProviders.map((provider) => (
          <Button
            key={provider.id}
            variant="outline"
            onClick={() => handleSocialLogin(provider.id)}
            disabled={loading}
            className={`${provider.color} transition-quick`}
            iconName={provider.icon}
            iconPosition="left"
            iconSize={18}
          >
            {provider.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SocialAuth;