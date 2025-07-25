import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const NotificationSettingsSection = ({ expanded, onToggle, className = "", Notification }) => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [recipeReminders, setRecipeReminders] = useState(true);
  const [favoriteUpdates, setFavoriteUpdates] = useState(true);
  const [promotionalContent, setPromotionalContent] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [reminderFrequency, setReminderFrequency] = useState('daily');
  const [quietHours, setQuietHours] = useState({ enabled: false, start: '22:00', end: '08:00' });

  // Frequency options
  const frequencyOptions = [
  { value: 'immediate', label: 'Immediate', description: 'Get notified right away' },
  { value: 'hourly', label: 'Hourly', description: 'Bundled every hour' },
  { value: 'daily', label: 'Daily', description: 'Once per day summary' },
  { value: 'weekly', label: 'Weekly', description: 'Weekly digest only' },
  { value: 'never', label: 'Never', description: 'Turn off all notifications' }];


  // Time options for quiet hours
  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return { value: `${hour}:00`, label: `${hour}:00` };
  });

  useEffect(() => {
    // Load saved notification preferences
    const savedPrefs = localStorage.getItem('notificationPreferences');
    if (savedPrefs) {
      const prefs = JSON.parse(savedPrefs);
      setEmailNotifications(prefs.emailNotifications ?? true);
      setPushNotifications(prefs.pushNotifications ?? true);
      setRecipeReminders(prefs.recipeReminders ?? true);
      setFavoriteUpdates(prefs.favoriteUpdates ?? true);
      setPromotionalContent(prefs.promotionalContent ?? false);
      setWeeklyDigest(prefs.weeklyDigest ?? true);
      setReminderFrequency(prefs.reminderFrequency ?? 'daily');
      setQuietHours(prefs.quietHours ?? { enabled: false, start: '22:00', end: '08:00' });
    }
  }, []);

  const savePreferences = () => {
    const preferences = {
      emailNotifications,
      pushNotifications,
      recipeReminders,
      favoriteUpdates,
      promotionalContent,
      weeklyDigest,
      reminderFrequency,
      quietHours
    };
    localStorage.setItem('notificationPreferences', JSON.stringify(preferences));
  };

  useEffect(() => {
    savePreferences();
  }, [
  emailNotifications,
  pushNotifications,
  recipeReminders,
  favoriteUpdates,
  promotionalContent,
  weeklyDigest,
  reminderFrequency,
  quietHours]
  );

  const handleQuietHoursToggle = () => {
    setQuietHours((prev) => ({ ...prev, enabled: !prev.enabled }));
  };

  const handleQuietHoursTimeChange = (field, value) => {
    setQuietHours((prev) => ({ ...prev, [field]: value }));
  };

  const testNotification = () => {
    // Mock test notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('ChefAI Test Notification', {
        body: 'This is a test notification from ChefAI. Your notification settings are working!',
        icon: '/favicon.ico'
      });
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('ChefAI Test Notification', {
            body: 'This is a test notification from ChefAI. Your notification settings are working!',
            icon: '/favicon.ico'
          });
        }
      });
    } else {
      alert('Test notification sent! (Browser notifications not supported)');
    }
  };

  return (
    <div className={`bg-card rounded-lg border border-border shadow-warm ${className}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-quick">

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Bell" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="font-heading font-medium text-foreground">Notification Settings</h3>
            <p className="text-sm font-caption text-muted-foreground">
              Manage email, push notifications, and cooking reminders
            </p>
          </div>
        </div>
        <Icon
          name="ChevronDown"
          size={20}
          className={`text-muted-foreground transition-quick ${expanded ? 'rotate-180' : ''}`} />

      </button>

      {expanded &&
      <div className="px-4 pb-4 space-y-4 expand-gentle">
          {/* General Notification Types */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground flex items-center space-x-2">
              <Icon name="Settings" size={16} className="text-muted-foreground" />
              <span>General Notifications</span>
            </h4>

            <div className="space-y-3 pl-6">
              <Checkbox
              label="Email Notifications"
              description="Receive notifications via email"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)} />


              <Checkbox
              label="Push Notifications"
              description="Browser and mobile push notifications"
              checked={pushNotifications}
              onChange={(e) => setPushNotifications(e.target.checked)} />


              <Checkbox
              label="Weekly Digest"
              description="Summary of your cooking activity and new recipes"
              checked={weeklyDigest}
              onChange={(e) => setWeeklyDigest(e.target.checked)} />

            </div>
          </div>

          {/* Recipe-Specific Notifications */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground flex items-center space-x-2">
              <Icon name="ChefHat" size={16} className="text-muted-foreground" />
              <span>Recipe Notifications</span>
            </h4>

            <div className="space-y-3 pl-6">
              <Checkbox
              label="Cooking Reminders"
              description="Reminders for meal planning and cooking times"
              checked={recipeReminders}
              onChange={(e) => setRecipeReminders(e.target.checked)} />


              <Checkbox
              label="Favorite Recipe Updates"
              description="When your favorite recipes get new reviews or variations"
              checked={favoriteUpdates}
              onChange={(e) => setFavoriteUpdates(e.target.checked)} />


              <Checkbox
              label="Promotional Content"
              description="Special offers, new features, and cooking tips"
              checked={promotionalContent}
              onChange={(e) => setPromotionalContent(e.target.checked)} />

            </div>
          </div>

          {/* Notification Frequency */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-muted-foreground" />
              <h4 className="font-medium text-foreground">Notification Frequency</h4>
            </div>
            <Select
            options={frequencyOptions}
            value={reminderFrequency}
            onChange={setReminderFrequency}
            placeholder="Select frequency"
            className="w-full" />

          </div>

          {/* Quiet Hours */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Moon" size={16} className="text-muted-foreground" />
                <h4 className="font-medium text-foreground">Quiet Hours</h4>
              </div>
              <button
              onClick={handleQuietHoursToggle}
              className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-smooth
                  ${quietHours.enabled ? 'bg-primary' : 'bg-muted'}
                `}>

                <span
                className={`
                    inline-block h-4 w-4 transform rounded-full bg-background transition-smooth
                    ${quietHours.enabled ? 'translate-x-6' : 'translate-x-1'}
                  `} />

              </button>
            </div>

            {quietHours.enabled &&
          <div className="pl-6 space-y-3 expand-gentle">
                <p className="text-sm font-caption text-muted-foreground">
                  No notifications will be sent during these hours
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Start Time
                    </label>
                    <Select
                  options={timeOptions}
                  value={quietHours.start}
                  onChange={(value) => handleQuietHoursTimeChange('start', value)}
                  className="w-full" />

                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      End Time
                    </label>
                    <Select
                  options={timeOptions}
                  value={quietHours.end}
                  onChange={(value) => handleQuietHoursTimeChange('end', value)}
                  className="w-full" />

                  </div>
                </div>
              </div>
          }
          </div>

          {/* Test Notification */}
          <div className="pt-2 border-t border-border">
            <Button
            variant="outline"
            onClick={testNotification}
            iconName="Send"
            iconPosition="left"
            fullWidth>

              Send Test Notification
            </Button>
          </div>
        </div>
      }
    </div>);

};

export default NotificationSettingsSection;