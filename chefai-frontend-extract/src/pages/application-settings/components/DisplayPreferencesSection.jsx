import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const DisplayPreferencesSection = ({ expanded, onToggle, className = "" }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState('default');
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('warm');

  // Font size options
  const fontSizeOptions = [
    { value: 'small', label: 'Small', description: 'Compact text for more content' },
    { value: 'default', label: 'Default', description: 'Standard readable size' },
    { value: 'large', label: 'Large', description: 'Larger text for better readability' },
    { value: 'extra-large', label: 'Extra Large', description: 'Maximum text size' }
  ];

  // Language options
  const languageOptions = [
    { value: 'en', label: 'English', description: 'English (United States)' },
    { value: 'es', label: 'Español', description: 'Spanish' },
    { value: 'fr', label: 'Français', description: 'French' },
    { value: 'de', label: 'Deutsch', description: 'German' },
    { value: 'it', label: 'Italiano', description: 'Italian' },
    { value: 'pt', label: 'Português', description: 'Portuguese' },
    { value: 'zh', label: '中文', description: 'Chinese (Simplified)' },
    { value: 'ja', label: '日本語', description: 'Japanese' }
  ];

  // Theme options
  const themeOptions = [
    { value: 'warm', label: 'Warm', description: 'Cozy earth tones (default)' },
    { value: 'cool', label: 'Cool', description: 'Fresh blue and gray tones' },
    { value: 'vibrant', label: 'Vibrant', description: 'Bold and energetic colors' },
    { value: 'minimal', label: 'Minimal', description: 'Clean monochrome design' }
  ];

  useEffect(() => {
    // Load saved preferences from localStorage
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedFontSize = localStorage.getItem('fontSize') || 'default';
    const savedLanguage = localStorage.getItem('language') || 'en';
    const savedTheme = localStorage.getItem('theme') || 'warm';

    setDarkMode(savedDarkMode);
    setFontSize(savedFontSize);
    setLanguage(savedLanguage);
    setTheme(savedTheme);
  }, []);

  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    // Apply dark mode class to document
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleFontSizeChange = (newFontSize) => {
    setFontSize(newFontSize);
    localStorage.setItem('fontSize', newFontSize);
    
    // Apply font size class to document
    document.documentElement.className = document.documentElement.className
      .replace(/font-size-\w+/g, '')
      .trim();
    document.documentElement.classList.add(`font-size-${newFontSize}`);
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    
    // Apply language attribute
    document.documentElement.lang = newLanguage;
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Apply theme class to document
    document.documentElement.className = document.documentElement.className
      .replace(/theme-\w+/g, '')
      .trim();
    document.documentElement.classList.add(`theme-${newTheme}`);
  };

  const resetToDefaults = () => {
    setDarkMode(false);
    setFontSize('default');
    setLanguage('en');
    setTheme('warm');
    
    localStorage.removeItem('darkMode');
    localStorage.removeItem('fontSize');
    localStorage.removeItem('language');
    localStorage.removeItem('theme');
    
    document.documentElement.classList.remove('dark');
    document.documentElement.className = document.documentElement.className
      .replace(/font-size-\w+|theme-\w+/g, '')
      .trim();
    document.documentElement.lang = 'en';
  };

  return (
    <div className={`bg-card rounded-lg border border-border shadow-warm ${className}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-quick"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="Palette" size={20} className="text-secondary" />
          </div>
          <div>
            <h3 className="font-heading font-medium text-foreground">Display Preferences</h3>
            <p className="text-sm font-caption text-muted-foreground">
              Customize appearance, theme, and language settings
            </p>
          </div>
        </div>
        <Icon 
          name="ChevronDown" 
          size={20} 
          className={`text-muted-foreground transition-quick ${expanded ? 'rotate-180' : ''}`}
        />
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-4 expand-gentle">
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={darkMode ? "Moon" : "Sun"} size={16} className="text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Dark Mode</h4>
                <p className="text-sm font-caption text-muted-foreground">
                  Switch between light and dark themes
                </p>
              </div>
            </div>
            <button
              onClick={handleDarkModeToggle}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-smooth
                ${darkMode ? 'bg-primary' : 'bg-muted'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-background transition-smooth
                  ${darkMode ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>

          {/* Font Size Selection */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name="Type" size={16} className="text-muted-foreground" />
              <h4 className="font-medium text-foreground">Font Size</h4>
            </div>
            <Select
              options={fontSizeOptions}
              value={fontSize}
              onChange={handleFontSizeChange}
              placeholder="Select font size"
              className="w-full"
            />
          </div>

          {/* Language Selection */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name="Globe" size={16} className="text-muted-foreground" />
              <h4 className="font-medium text-foreground">Language</h4>
            </div>
            <Select
              options={languageOptions}
              value={language}
              onChange={handleLanguageChange}
              searchable
              placeholder="Select language"
              className="w-full"
            />
          </div>

          {/* Theme Selection */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name="Paintbrush" size={16} className="text-muted-foreground" />
              <h4 className="font-medium text-foreground">Color Theme</h4>
            </div>
            <Select
              options={themeOptions}
              value={theme}
              onChange={handleThemeChange}
              placeholder="Select theme"
              className="w-full"
            />
          </div>

          {/* Theme Preview */}
          <div className="p-3 bg-muted/30 rounded-lg">
            <h4 className="font-medium text-foreground mb-2">Preview</h4>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-primary rounded-full"></div>
              <div className="w-4 h-4 bg-secondary rounded-full"></div>
              <div className="w-4 h-4 bg-accent rounded-full"></div>
              <div className="w-4 h-4 bg-success rounded-full"></div>
              <span className="text-sm font-caption text-muted-foreground ml-2">
                Current theme colors
              </span>
            </div>
          </div>

          {/* Reset to Defaults */}
          <div className="pt-2 border-t border-border">
            <Button
              variant="outline"
              onClick={resetToDefaults}
              iconName="RotateCcw"
              iconPosition="left"
              fullWidth
            >
              Reset to Defaults
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayPreferencesSection;