import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const PrivacySettings = ({ 
  initialSettings = {},
  onSave = () => {},
  className = "" 
}) => {
  const [settings, setSettings] = useState({
    profileVisibility: initialSettings.profileVisibility || 'public',
    recipeSharing: initialSettings.recipeSharing || true,
    activityTracking: initialSettings.activityTracking || true,
    emailNotifications: initialSettings.emailNotifications || true,
    marketingEmails: initialSettings.marketingEmails || false,
    dataCollection: initialSettings.dataCollection || true,
    thirdPartySharing: initialSettings.thirdPartySharing || false,
    cookingAnalytics: initialSettings.cookingAnalytics || true,
    communityInteraction: initialSettings.communityInteraction || true
  });

  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const profileVisibilityOptions = [
    { 
      value: 'public', 
      label: 'Public', 
      description: 'Anyone can see your profile and recipes' 
    },
    { 
      value: 'friends', 
      label: 'Friends Only', 
      description: 'Only your friends can see your profile' 
    },
    { 
      value: 'private', 
      label: 'Private', 
      description: 'Only you can see your profile and recipes' 
    }
  ];

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onSave(settings);
      setHasChanges(false);
      
      console.log('Privacy settings saved successfully');
    } catch (error) {
      console.error('Failed to save privacy settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const privacyCategories = [
    {
      title: 'Profile & Sharing',
      description: 'Control how your profile and recipes are shared',
      settings: [
        {
          key: 'recipeSharing',
          label: 'Allow Recipe Sharing',
          description: 'Let others share your recipes with the community',
          type: 'checkbox'
        },
        {
          key: 'communityInteraction',
          label: 'Community Interactions',
          description: 'Allow others to comment and rate your recipes',
          type: 'checkbox'
        }
      ]
    },
    {
      title: 'Data & Analytics',
      description: 'Manage how your cooking data is used',
      settings: [
        {
          key: 'activityTracking',
          label: 'Activity Tracking',
          description: 'Track your cooking activities for personalized recommendations',
          type: 'checkbox'
        },
        {
          key: 'cookingAnalytics',
          label: 'Cooking Analytics',
          description: 'Analyze your cooking patterns to improve suggestions',
          type: 'checkbox'
        },
        {
          key: 'dataCollection',
          label: 'Usage Data Collection',
          description: 'Help improve ChefAI by sharing anonymous usage data',
          type: 'checkbox'
        }
      ]
    },
    {
      title: 'Communications',
      description: 'Choose what notifications you receive',
      settings: [
        {
          key: 'emailNotifications',
          label: 'Email Notifications',
          description: 'Receive notifications about your account and recipes',
          type: 'checkbox'
        },
        {
          key: 'marketingEmails',
          label: 'Marketing Communications',
          description: 'Receive updates about new features and cooking tips',
          type: 'checkbox'
        }
      ]
    },
    {
      title: 'Third-Party Integration',
      description: 'Control data sharing with external services',
      settings: [
        {
          key: 'thirdPartySharing',
          label: 'Third-Party Data Sharing',
          description: 'Allow sharing anonymized data with cooking partners',
          type: 'checkbox'
        }
      ]
    }
  ];

  return (
    <div className={`bg-card rounded-lg border border-border shadow-warm p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-medium text-foreground">
            Privacy Settings
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Control your privacy and data sharing preferences
          </p>
        </div>
        <Icon name="Shield" size={24} className="text-primary" />
      </div>

      <div className="space-y-6">
        {/* Profile Visibility */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Icon name="Eye" size={16} className="text-primary" />
            <h4 className="font-medium text-foreground">Profile Visibility</h4>
          </div>
          
          <Select
            label="Who can see your profile?"
            description="Control who can view your profile and cooking activity"
            options={profileVisibilityOptions}
            value={settings.profileVisibility}
            onChange={(value) => handleSettingChange('profileVisibility', value)}
          />
        </div>

        {/* Privacy Categories */}
        {privacyCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="space-y-4">
            <div className="flex items-start space-x-2 pt-4 border-t border-border">
              <Icon name="Settings" size={16} className="text-primary mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground">{category.title}</h4>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>
            </div>
            
            <div className="ml-6 space-y-4">
              {category.settings.map((setting) => (
                <Checkbox
                  key={setting.key}
                  label={setting.label}
                  description={setting.description}
                  checked={settings[setting.key]}
                  onChange={(e) => handleSettingChange(setting.key, e.target.checked)}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Data Export & Deletion */}
        <div className="space-y-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Download" size={16} className="text-primary" />
            <h4 className="font-medium text-foreground">Data Management</h4>
          </div>
          
          <div className="ml-6 space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={() => console.log('Export data')}
                iconName="Download"
                iconPosition="left"
                className="flex-1 sm:flex-none"
              >
                Export My Data
              </Button>
              
              <Button
                variant="outline"
                onClick={() => console.log('Delete account')}
                iconName="Trash2"
                iconPosition="left"
                className="flex-1 sm:flex-none text-destructive hover:text-destructive"
              >
                Delete Account
              </Button>
            </div>
            
            <p className="text-xs font-caption text-muted-foreground">
              Export your data or permanently delete your account and all associated data
            </p>
          </div>
        </div>

        {/* Privacy Policy Link */}
        <div className="bg-primary/5 rounded-lg border border-primary/20 p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-foreground mb-2">Privacy Information</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Learn more about how we protect your privacy and handle your data.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => console.log('View privacy policy')}
                  iconName="ExternalLink"
                  iconPosition="right"
                  className="text-primary hover:text-primary"
                >
                  Privacy Policy
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => console.log('View terms of service')}
                  iconName="ExternalLink"
                  iconPosition="right"
                  className="text-primary hover:text-primary"
                >
                  Terms of Service
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-border">
          <Button
            variant="default"
            onClick={handleSave}
            disabled={!hasChanges || saving}
            loading={saving}
            iconName="Save"
            iconPosition="left"
            fullWidth
          >
            {saving ? 'Saving Settings...' : 'Save Privacy Settings'}
          </Button>
          
          {hasChanges && (
            <div className="flex items-center space-x-2 text-sm text-warning mt-3">
              <Icon name="AlertCircle" size={16} />
              <span>You have unsaved privacy setting changes</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;