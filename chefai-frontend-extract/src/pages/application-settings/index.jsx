import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import NavigationHeader from '../../components/ui/NavigationHeader';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import AccountSecuritySection from './components/AccountSecuritySection';
import DisplayPreferencesSection from './components/DisplayPreferencesSection';
import NotificationSettingsSection from './components/NotificationSettingsSection';
import DataManagementSection from './components/DataManagementSection';

const ApplicationSettings = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [expandedSections, setExpandedSections] = useState({
    security: false,
    display: false,
    notifications: false,
    data: false
  });
  const [isMobile, setIsMobile] = useState(false);

  // Mock user data
  const user = {
    name: 'Chef User',
    email: 'chef@example.com',
    avatar: null,
    joinDate: '2024-01-15',
    preferences: {
      dietary: ['vegetarian'],
      cuisines: ['italian', 'asian']
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setSidebarCollapsed(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleSectionToggle = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const expandAllSections = () => {
    setExpandedSections({
      security: true,
      display: true,
      notifications: true,
      data: true
    });
  };

  const collapseAllSections = () => {
    setExpandedSections({
      security: false,
      display: false,
      notifications: false,
      data: false
    });
  };

  const handleBackToDashboard = () => {
    navigate('/main-dashboard-with-dual-panel-layout');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <NavigationHeader
        onMenuToggle={handleSidebarToggle}
        sidebarCollapsed={sidebarCollapsed}
        user={user}
      />

      {/* Sidebar Navigation */}
      <SidebarNavigation
        collapsed={sidebarCollapsed}
        onCollapse={handleSidebarToggle}
        user={user}
      />

      {/* Main Content */}
      <main className={`
        pt-16 transition-smooth
        ${isMobile ? 'pl-0' : 'pl-64'}
      `}>
        <div className="max-w-4xl mx-auto p-4 lg:p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBackToDashboard}
                className="lg:hidden"
                aria-label="Back to dashboard"
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Settings" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-heading font-semibold text-foreground">
                  Application Settings
                </h1>
                <p className="text-sm lg:text-base font-caption text-muted-foreground">
                  Customize your ChefAI experience and manage your account
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={expandAllSections}
                iconName="Expand"
                iconPosition="left"
              >
                Expand All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={collapseAllSections}
                iconName="Minimize"
                iconPosition="left"
              >
                Collapse All
              </Button>
            </div>
          </div>

          {/* Settings Sections */}
          <div className="space-y-4">
            {/* Account Security Section */}
            <AccountSecuritySection
              expanded={expandedSections.security}
              onToggle={() => handleSectionToggle('security')}
            />

            {/* Display Preferences Section */}
            <DisplayPreferencesSection
              expanded={expandedSections.display}
              onToggle={() => handleSectionToggle('display')}
            />

            {/* Notification Settings Section */}
            <NotificationSettingsSection
              expanded={expandedSections.notifications}
              onToggle={() => handleSectionToggle('notifications')}
            />

            {/* Data Management Section */}
            <DataManagementSection
              expanded={expandedSections.data}
              onToggle={() => handleSectionToggle('data')}
            />
          </div>

          {/* Help & Support */}
          <div className="mt-8 p-4 bg-card rounded-lg border border-border shadow-warm">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name="HelpCircle" size={20} className="text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-heading font-medium text-foreground mb-1">
                  Need Help?
                </h3>
                <p className="text-sm font-caption text-muted-foreground mb-3">
                  Can't find what you're looking for? Our support team is here to help.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="MessageCircle"
                    iconPosition="left"
                  >
                    Contact Support
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Book"
                    iconPosition="left"
                  >
                    User Guide
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Video"
                    iconPosition="left"
                  >
                    Video Tutorials
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-4 text-sm font-caption text-muted-foreground">
                <span>ChefAI v2.1.0</span>
                <span>•</span>
                <span>Last updated: {new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-sm font-caption text-muted-foreground hover:text-foreground transition-quick">
                  Privacy Policy
                </button>
                <button className="text-sm font-caption text-muted-foreground hover:text-foreground transition-quick">
                  Terms of Service
                </button>
              </div>
            </div>
            <div className="text-center mt-4">
              <p className="text-xs font-caption text-muted-foreground">
                © {new Date().getFullYear()} ChefAI. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApplicationSettings;