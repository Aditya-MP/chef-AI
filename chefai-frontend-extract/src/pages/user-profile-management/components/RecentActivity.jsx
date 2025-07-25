import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivity = ({ 
  activities = [],
  className = "" 
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const defaultActivities = [
    {
      id: 1,
      type: 'recipe_generated',
      title: 'Generated Creamy Mushroom Risotto',
      description: 'Used ingredients: mushrooms, arborio rice, parmesan, white wine',
      timestamp: '2025-01-22 14:30:00',
      recipeId: 'recipe_001',
      icon: 'ChefHat',
      color: 'text-primary'
    },
    {
      id: 2,
      type: 'recipe_favorited',
      title: 'Added Spicy Thai Basil Chicken to favorites',
      description: 'Saved for quick access in your recipe collection',
      timestamp: '2025-01-22 12:15:00',
      recipeId: 'recipe_002',
      icon: 'Heart',
      color: 'text-error'
    },
    {
      id: 3,
      type: 'recipe_cooked',
      title: 'Cooked Mediterranean Quinoa Bowl',
      description: 'Rated 5 stars and left a review',
      timestamp: '2025-01-21 19:45:00',
      recipeId: 'recipe_003',
      icon: 'Star',
      color: 'text-secondary'
    },
    {
      id: 4,
      type: 'profile_updated',
      title: 'Updated cooking preferences',
      description: 'Changed skill level to intermediate and added dietary restrictions',
      timestamp: '2025-01-21 16:20:00',
      icon: 'Settings',
      color: 'text-accent'
    },
    {
      id: 5,
      type: 'recipe_shared',
      title: 'Shared Classic Beef Stroganoff',
      description: 'Recipe shared with the ChefAI community',
      timestamp: '2025-01-21 14:10:00',
      recipeId: 'recipe_004',
      icon: 'Share2',
      color: 'text-success'
    },
    {
      id: 6,
      type: 'achievement_unlocked',
      title: 'Unlocked "Recipe Master" achievement',
      description: 'Generated 100+ recipes with ChefAI',
      timestamp: '2025-01-20 20:30:00',
      icon: 'Award',
      color: 'text-warning'
    },
    {
      id: 7,
      type: 'recipe_generated',
      title: 'Generated Lemon Herb Salmon',
      description: 'Used ingredients: salmon, lemon, herbs, olive oil',
      timestamp: '2025-01-20 18:15:00',
      recipeId: 'recipe_005',
      icon: 'ChefHat',
      color: 'text-primary'
    },
    {
      id: 8,
      type: 'recipe_reviewed',
      title: 'Reviewed Vegetarian Pad Thai',
      description: 'Left 4-star rating with cooking tips',
      timestamp: '2025-01-20 12:45:00',
      recipeId: 'recipe_006',
      icon: 'MessageSquare',
      color: 'text-accent'
    }
  ];

  const currentActivities = activities.length > 0 ? activities : defaultActivities;

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return activityTime.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const handleActivityClick = async (activity) => {
    if (!activity.recipeId) return;

    setLoading(true);
    try {
      // Navigate to recipe view
      navigate('/full-screen-recipe-view', {
        state: {
          recipeId: activity.recipeId,
          recipeName: activity.title.replace('Generated ', '').replace('Cooked ', '').replace('Added ', '').replace(' to favorites', ''),
          fromActivity: true
        }
      });
    } catch (error) {
      console.error('Error navigating to recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActivityTypeLabel = (type) => {
    switch (type) {
      case 'recipe_generated':
        return 'Recipe Generated';
      case 'recipe_favorited':
        return 'Recipe Favorited';
      case 'recipe_cooked':
        return 'Recipe Cooked';
      case 'recipe_shared':
        return 'Recipe Shared';
      case 'recipe_reviewed':
        return 'Recipe Reviewed';
      case 'profile_updated':
        return 'Profile Updated';
      case 'achievement_unlocked':
        return 'Achievement Unlocked';
      default:
        return 'Activity';
    }
  };

  return (
    <div className={`bg-card rounded-lg border border-border shadow-warm p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-medium text-foreground">
            Recent Activity
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Your cooking journey and recipe interactions
          </p>
        </div>
        <Icon name="Activity" size={24} className="text-primary" />
      </div>

      <div className="space-y-1 max-h-96 overflow-y-auto">
        {currentActivities.map((activity, index) => (
          <div
            key={activity.id}
            onClick={() => handleActivityClick(activity)}
            className={`
              flex items-start space-x-3 p-3 rounded-lg transition-smooth group
              ${activity.recipeId 
                ? 'hover:bg-primary/5 hover:border-primary/20 cursor-pointer' :'hover:bg-muted/50'
              }
              ${index !== currentActivities.length - 1 ? 'border-b border-border/50' : ''}
            `}
          >
            {/* Activity Icon */}
            <div className={`w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center group-hover:scale-110 transition-smooth`}>
              <Icon 
                name={activity.icon} 
                size={14} 
                className={activity.color}
              />
            </div>

            {/* Activity Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-quick truncate">
                    {activity.title}
                  </p>
                  <p className="text-xs font-caption text-muted-foreground mt-1 line-clamp-2">
                    {activity.description}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-xs font-caption text-muted-foreground">
                      {getActivityTypeLabel(activity.type)}
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs font-caption text-muted-foreground">
                      {formatTimeAgo(activity.timestamp)}
                    </span>
                  </div>
                </div>
                
                {activity.recipeId && (
                  <Icon 
                    name="ChevronRight" 
                    size={14} 
                    className="text-muted-foreground group-hover:text-primary transition-quick flex-shrink-0 ml-2"
                  />
                )}
              </div>
            </div>
          </div>
        ))}

        {currentActivities.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Activity" size={48} className="text-muted-foreground mx-auto mb-3" />
            <h4 className="font-medium text-foreground mb-1">No Recent Activity</h4>
            <p className="text-sm text-muted-foreground">
              Start cooking to see your activity here
            </p>
          </div>
        )}
      </div>

      {/* View All Activity Button */}
      {currentActivities.length > 0 && (
        <div className="pt-4 border-t border-border mt-4">
          <Button
            variant="outline"
            onClick={() => console.log('View all activity')}
            disabled={loading}
            iconName="ArrowRight"
            iconPosition="right"
            fullWidth
          >
            View All Activity
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;