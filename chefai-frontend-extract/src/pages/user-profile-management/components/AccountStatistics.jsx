import React from 'react';
import Icon from '../../../components/AppIcon';

const AccountStatistics = ({ 
  stats = {},
  className = "" 
}) => {
  const defaultStats = {
    recipesGenerated: 127,
    favoritesSaved: 23,
    cookingStreak: 12,
    totalCookingTime: 48,
    achievements: 8,
    recipesShared: 15
  };

  const currentStats = { ...defaultStats, ...stats };

  const statisticCards = [
    {
      id: 'recipes',
      label: 'Recipes Generated',
      value: currentStats.recipesGenerated,
      icon: 'ChefHat',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'AI-generated recipes'
    },
    {
      id: 'favorites',
      label: 'Favorites Saved',
      value: currentStats.favoritesSaved,
      icon: 'Heart',
      color: 'text-error',
      bgColor: 'bg-error/10',
      description: 'Bookmarked recipes'
    },
    {
      id: 'streak',
      label: 'Cooking Streak',
      value: `${currentStats.cookingStreak} days`,
      icon: 'Flame',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      description: 'Consecutive cooking days'
    },
    {
      id: 'time',
      label: 'Total Cooking Time',
      value: `${currentStats.totalCookingTime}h`,
      icon: 'Clock',
      color: 'text-success',
      bgColor: 'bg-success/10',
      description: 'Hours spent cooking'
    },
    {
      id: 'achievements',
      label: 'Achievements',
      value: currentStats.achievements,
      icon: 'Award',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      description: 'Cooking milestones'
    },
    {
      id: 'shared',
      label: 'Recipes Shared',
      value: currentStats.recipesShared,
      icon: 'Share2',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      description: 'Shared with community'
    }
  ];

  const getFormattedValue = (value) => {
    if (typeof value === 'number' && value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value;
  };

  return (
    <div className={`bg-card rounded-lg border border-border shadow-warm p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-medium text-foreground">
            Cooking Statistics
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Your culinary journey at a glance
          </p>
        </div>
        <Icon name="BarChart3" size={24} className="text-primary" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statisticCards.map((stat) => (
          <div
            key={stat.id}
            className="bg-background rounded-lg border border-border p-4 hover:shadow-warm-md transition-smooth group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-smooth`}>
                <Icon 
                  name={stat.icon} 
                  size={20} 
                  className={stat.color}
                />
              </div>
              <div className="text-right">
                <div className="text-2xl font-heading font-semibold text-foreground">
                  {getFormattedValue(stat.value)}
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-foreground text-sm mb-1">
                {stat.label}
              </h4>
              <p className="text-xs font-caption text-muted-foreground">
                {stat.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Achievements */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="font-medium text-foreground mb-3 flex items-center">
          <Icon name="Trophy" size={16} className="mr-2 text-secondary" />
          Recent Achievements
        </h4>
        
        <div className="space-y-2">
          {[
            { name: 'Recipe Master', description: 'Generated 100+ recipes', date: '2 days ago' },
            { name: 'Consistency Chef', description: '10-day cooking streak', date: '1 week ago' },
            { name: 'Flavor Explorer', description: 'Tried 5 different cuisines', date: '2 weeks ago' }
          ].map((achievement, index) => (
            <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-quick">
              <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center">
                <Icon name="Award" size={14} className="text-secondary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {achievement.name}
                </p>
                <p className="text-xs font-caption text-muted-foreground">
                  {achievement.description}
                </p>
              </div>
              <span className="text-xs font-caption text-muted-foreground">
                {achievement.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountStatistics;