import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import NavigationHeader from '../../components/ui/NavigationHeader';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import ProfilePhotoUpload from './components/ProfilePhotoUpload';
import PersonalDetailsForm from './components/PersonalDetailsForm';
import AccountStatistics from './components/AccountStatistics';
import CookingPreferences from './components/CookingPreferences';
import AccountSecurity from './components/AccountSecurity';
import RecentActivity from './components/RecentActivity';
import PrivacySettings from './components/PrivacySettings';

const UserProfileManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState({
    name: 'Alex Johnson',
    email: 'chef@example.com',
    username: 'chef_master_2024',
    firstName: 'Alex',
    lastName: 'Johnson',
    phone: '+1 (555) 123-4567',
    bio: 'Passionate home cook exploring flavors from around the world',
    profilePhoto: null,
    joinDate: '2024-03-15'
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate loading user data
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handlePhotoChange = (newPhoto) => {
    setUserData(prev => ({
      ...prev,
      profilePhoto: newPhoto
    }));
  };

  const handlePersonalDetailsSave = (formData) => {
    setUserData(prev => ({
      ...prev,
      ...formData
    }));
    console.log('Personal details saved:', formData);
  };

  const handlePreferencesSave = (preferences) => {
    console.log('Preferences saved:', preferences);
  };

  const handlePasswordChange = (passwordData) => {
    console.log('Password changed successfully');
  };

  const handlePrivacySettingsSave = (settings) => {
    console.log('Privacy settings saved:', settings);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'preferences', label: 'Preferences', icon: 'Settings' },
    { id: 'security', label: 'Security', icon: 'Shield' },
    { id: 'activity', label: 'Activity', icon: 'Activity' },
    { id: 'privacy', label: 'Privacy', icon: 'Lock' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationHeader 
          onMenuToggle={handleSidebarToggle}
          sidebarCollapsed={sidebarCollapsed}
          user={userData}
        />
        <SidebarNavigation 
          collapsed={sidebarCollapsed}
          onCollapse={handleSidebarToggle}
          user={userData}
        />
        
        <main className="lg:ml-64 pt-16">
          <div className="p-6">
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton-warm h-32 rounded-lg"></div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Profile Management - ChefAI</title>
        <meta name="description" content="Manage your ChefAI profile, cooking preferences, and account settings" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <NavigationHeader 
          onMenuToggle={handleSidebarToggle}
          sidebarCollapsed={sidebarCollapsed}
          user={userData}
        />
        
        <SidebarNavigation 
          collapsed={sidebarCollapsed}
          onCollapse={handleSidebarToggle}
          user={userData}
        />

        <main className="lg:ml-64 pt-16">
          <div className="p-4 lg:p-6">
            {/* Page Header */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-heading font-semibold text-foreground">
                    Profile Management
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    Customize your account and cooking preferences
                  </p>
                </div>
                <div className="mt-4 sm:mt-0">
                  <div className="text-sm font-caption text-muted-foreground">
                    Member since {new Date(userData.joinDate).toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="mb-6">
              <div className="border-b border-border">
                <nav className="flex space-x-8 overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-quick
                        ${activeTab === tab.id
                          ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                        }
                      `}
                    >
                      <span className="text-lg">
                        {tab.icon === 'User' && '👤'}
                        {tab.icon === 'Settings' && '⚙️'}
                        {tab.icon === 'Shield' && '🛡️'}
                        {tab.icon === 'Activity' && '📊'}
                        {tab.icon === 'Lock' && '🔒'}
                      </span>
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === 'profile' && (
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  <div className="xl:col-span-1">
                    <ProfilePhotoUpload
                      currentPhoto={userData.profilePhoto}
                      onPhotoChange={handlePhotoChange}
                      className="mb-6"
                    />
                    <AccountStatistics />
                  </div>
                  <div className="xl:col-span-2">
                    <PersonalDetailsForm
                      initialData={userData}
                      onSave={handlePersonalDetailsSave}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'preferences' && (
                <div className="max-w-4xl">
                  <CookingPreferences
                    onSave={handlePreferencesSave}
                  />
                </div>
              )}

              {activeTab === 'security' && (
                <div className="max-w-4xl">
                  <AccountSecurity
                    onPasswordChange={handlePasswordChange}
                  />
                </div>
              )}

              {activeTab === 'activity' && (
                <div className="max-w-4xl">
                  <RecentActivity />
                </div>
              )}

              {activeTab === 'privacy' && (
                <div className="max-w-4xl">
                  <PrivacySettings
                    onSave={handlePrivacySettingsSave}
                  />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default UserProfileManagement;