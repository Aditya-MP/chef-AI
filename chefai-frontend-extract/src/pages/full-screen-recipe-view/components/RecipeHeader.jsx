import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecipeHeader = ({ 
  recipe = null,
  onFavoriteToggle = null,
  className = ""
}) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(recipe?.isFavorite || false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleBack = () => {
    navigate('/main-dashboard-with-dual-panel-layout');
  };

  const handleFavoriteClick = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    
    if (onFavoriteToggle) {
      onFavoriteToggle(recipe?.id, newFavoriteState);
    }
  };

  const handleShare = () => {
    setShowShareMenu(!showShareMenu);
  };

  const shareOptions = [
    { name: 'Facebook', icon: 'Facebook', color: 'text-blue-600' },
    { name: 'Twitter', icon: 'Twitter', color: 'text-blue-400' },
    { name: 'WhatsApp', icon: 'MessageCircle', color: 'text-green-600' },
    { name: 'Copy Link', icon: 'Link', color: 'text-muted-foreground' }
  ];

  const handleShareOption = (option) => {
    console.log(`Sharing via ${option.name}`);
    setShowShareMenu(false);
    
    if (option.name === 'Copy Link') {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <header className={`sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border ${className}`}>
      <div className="flex items-center justify-between p-4 lg:px-6">
        {/* Left Section - Back Button & Title */}
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="touch-target"
            aria-label="Go back to dashboard"
          >
            <Icon name="ArrowLeft" size={20} className="text-foreground" />
          </Button>
          
          <div className="min-w-0 flex-1">
            <h1 className="text-lg lg:text-xl font-heading font-semibold text-foreground truncate">
              {recipe?.name || 'Recipe Details'}
            </h1>
            <div className="flex items-center space-x-3 mt-1">
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={14} className="text-muted-foreground" />
                <span className="text-sm font-mono text-muted-foreground">
                  {recipe?.cookTime || '30 min'}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Users" size={14} className="text-muted-foreground" />
                <span className="text-sm font-mono text-muted-foreground">
                  {recipe?.servings || '4'} servings
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={14} className="text-secondary fill-current" />
                <span className="text-sm font-mono text-muted-foreground">
                  {recipe?.rating || '4.5'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFavoriteClick}
            className={`touch-target transition-quick ${
              isFavorite ? 'text-error' : 'text-muted-foreground hover:text-error'
            }`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Icon 
              name="Heart" 
              size={20} 
              className={isFavorite ? 'fill-current' : ''}
            />
          </Button>

          {/* Share Button */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              className="touch-target"
              aria-label="Share recipe"
            >
              <Icon name="Share2" size={20} className="text-muted-foreground" />
            </Button>

            {/* Share Menu */}
            {showShareMenu && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowShareMenu(false)}
                  aria-hidden="true"
                />
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-warm-lg z-50">
                  <div className="py-2">
                    {shareOptions.map((option) => (
                      <button
                        key={option.name}
                        onClick={() => handleShareOption(option)}
                        className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-quick"
                      >
                        <Icon 
                          name={option.icon} 
                          size={16} 
                          className={`mr-3 ${option.color}`}
                        />
                        {option.name}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* More Options */}
          <Button
            variant="ghost"
            size="icon"
            className="touch-target"
            aria-label="More options"
          >
            <Icon name="MoreVertical" size={20} className="text-muted-foreground" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default RecipeHeader;