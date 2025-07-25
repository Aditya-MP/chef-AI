import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NavigationBreadcrumbs = ({ 
  recipe = null,
  className = ""
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Build breadcrumb items based on current route and state
  const breadcrumbItems = [
    {
      label: 'Dashboard',
      path: '/main-dashboard-with-dual-panel-layout',
      icon: 'Home'
    },
    {
      label: 'Recipe View',
      path: location.pathname,
      icon: 'BookOpen',
      current: true
    }
  ];

  // Add recipe name if available
  if (recipe?.name) {
    breadcrumbItems[1].label = recipe.name;
  }

  const handleNavigate = (path) => {
    if (path !== location.pathname) {
      navigate(path);
    }
  };

  return (
    <nav className={`bg-muted/30 border-b border-border ${className}`} aria-label="Breadcrumb">
      <div className="px-4 lg:px-6 py-3">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbItems.map((item, index) => (
            <li key={item.path} className="flex items-center">
              {index > 0 && (
                <Icon 
                  name="ChevronRight" 
                  size={14} 
                  className="text-muted-foreground mx-2"
                />
              )}
              
              {item.current ? (
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={item.icon} 
                    size={16} 
                    className="text-primary"
                  />
                  <span className="font-medium text-foreground truncate max-w-xs">
                    {item.label}
                  </span>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavigate(item.path)}
                  className="flex items-center space-x-2 text-muted-foreground hover:text-foreground p-1 h-auto"
                >
                  <Icon 
                    name={item.icon} 
                    size={16}
                  />
                  <span className="truncate max-w-xs">
                    {item.label}
                  </span>
                </Button>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default NavigationBreadcrumbs;