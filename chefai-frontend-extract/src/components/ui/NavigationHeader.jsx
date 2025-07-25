import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const NavigationHeader = ({
  onMenuToggle,
  sidebarCollapsed = false,
  user = null,
  className = "", setUserMenuToggle
}) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Load dark mode preference from localStorage
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleUserMenuToggle = () => {
    setUserMenuToggle(!userMenuOpen);
  };

  const handleLogout = () => {
    // Logout logic would be implemented here
    console.log('Logout clicked');
    setUserMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 bg-background border-b border-border z-100 transition-smooth ${className}`}>
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left Section - Mobile Menu & Logo */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="lg:hidden touch-target"
            aria-label="Toggle navigation menu">

            <Icon
              name={sidebarCollapsed ? "Menu" : "X"}
              size={24}
              className="text-foreground" />

          </Button>

          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon
                name="ChefHat"
                size={20}
                className="text-primary-foreground" />

            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl lg:text-2xl font-heading font-semibold text-foreground">
                ChefAI
              </h1>
              <p className="text-xs font-caption text-muted-foreground hidden lg:block">
                Your AI Cooking Companion
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Theme Toggle & User Menu */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="touch-target"
            aria-label="Toggle dark mode"
            onClick={handleDarkModeToggle}
          >
            <Icon name={darkMode ? "Sun" : "Moon"} size={20} className="text-foreground" />
          </Button>
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="touch-target relative"
            aria-label="View notifications">

            <Icon
              name="Bell"
              size={20}
              className="text-muted-foreground hover:text-foreground transition-quick" />

            <span className="absolute -top-1 -right-1 w-2 h-2 bg-warning rounded-full"></span>
          </Button>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={handleUserMenuToggle}
              className="flex items-center space-x-2 touch-target"
              aria-label="User menu"
              aria-expanded={userMenuOpen}>

              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <Icon
                  name="User"
                  size={16}
                  className="text-accent-foreground" />

              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-foreground">
                  {user?.name || 'Chef User'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {user?.email || 'chef@example.com'}
                </p>
              </div>
              <Icon
                name="ChevronDown"
                size={16}
                className={`text-muted-foreground transition-quick ${userMenuOpen ? 'rotate-180' : ''}`} />

            </Button>

            {/* User Dropdown Menu */}
            {userMenuOpen &&
            <>
                <div
                className="fixed inset-0 z-80"
                onClick={() => setUserMenuOpen(false)}
                aria-hidden="true" />

                <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-warm-lg z-110">
                  <div className="p-4 border-b border-border">
                    <p className="font-medium text-foreground">
                      {user?.name || 'Chef User'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {user?.email || 'chef@example.com'}
                    </p>
                  </div>
                  
                  <div className="py-2">
                    <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      // Navigate to profile
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-quick">

                      <Icon name="User" size={16} className="mr-3" />
                      Profile Settings
                    </button>
                    
                    <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      // Navigate to settings
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-quick">

                      <Icon name="Settings" size={16} className="mr-3" />
                      App Settings
                    </button>
                    
                    <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      // Navigate to help
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-quick">

                      <Icon name="HelpCircle" size={16} className="mr-3" />
                      Help & Support
                    </button>
                  </div>
                  
                  <div className="border-t border-border py-2">
                    <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-destructive hover:bg-muted transition-quick">

                      <Icon name="LogOut" size={16} className="mr-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            }
          </div>
        </div>
      </div>
    </header>);

};

export default NavigationHeader;