import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AccountSecurity = ({ 
  securityData = {},
  onPasswordChange = () => {},
  className = "" 
}) => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [changingPassword, setChangingPassword] = useState(false);

  const defaultSecurityData = {
    lastLogin: '2025-01-22 14:30:00',
    loginLocation: 'San Francisco, CA',
    connectedDevices: 3,
    twoFactorEnabled: false,
    loginAttempts: 0
  };

  const currentSecurityData = { ...defaultSecurityData, ...securityData };

  const connectedDevices = [
    {
      id: 1,
      name: 'MacBook Pro',
      type: 'desktop',
      location: 'San Francisco, CA',
      lastActive: '2025-01-22 16:45:00',
      current: true
    },
    {
      id: 2,
      name: 'iPhone 15',
      type: 'mobile',
      location: 'San Francisco, CA',
      lastActive: '2025-01-22 15:20:00',
      current: false
    },
    {
      id: 3,
      name: 'iPad Air',
      type: 'tablet',
      location: 'San Francisco, CA',
      lastActive: '2025-01-21 19:30:00',
      current: false
    }
  ];

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'desktop':
        return 'Monitor';
      case 'mobile':
        return 'Smartphone';
      case 'tablet':
        return 'Tablet';
      default:
        return 'Monitor';
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handlePasswordInputChange = (field, value) => {
    setPasswordForm(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (passwordErrors[field]) {
      setPasswordErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validatePasswordForm = () => {
    const errors = {};

    if (!passwordForm.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }

    if (!passwordForm.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (passwordForm.newPassword.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwordForm.newPassword)) {
      errors.newPassword = 'Password must contain uppercase, lowercase, and number';
    }

    if (!passwordForm.confirmPassword) {
      errors.confirmPassword = 'Please confirm your new password';
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePasswordSubmit = async () => {
    if (!validatePasswordForm()) return;

    setChangingPassword(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onPasswordChange(passwordForm);
      setShowPasswordModal(false);
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      console.log('Password changed successfully');
    } catch (error) {
      console.error('Failed to change password:', error);
    } finally {
      setChangingPassword(false);
    }
  };

  const handleDeviceRemove = (deviceId) => {
    console.log('Remove device:', deviceId);
    // Device removal logic would be implemented here
  };

  const handleTwoFactorToggle = () => {
    console.log('Toggle two-factor authentication');
    // 2FA toggle logic would be implemented here
  };

  return (
    <>
      <div className={`bg-card rounded-lg border border-border shadow-warm p-6 ${className}`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-heading font-medium text-foreground">
              Account Security
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your account security and login settings
            </p>
          </div>
          <Icon name="Shield" size={24} className="text-primary" />
        </div>

        <div className="space-y-6">
          {/* Security Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-background rounded-lg border border-border p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="Clock" size={20} className="text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Last Login</p>
                  <p className="text-xs font-caption text-muted-foreground">
                    {formatDateTime(currentSecurityData.lastLogin)}
                  </p>
                  <p className="text-xs font-caption text-muted-foreground">
                    {currentSecurityData.loginLocation}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-background rounded-lg border border-border p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Devices" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Connected Devices</p>
                  <p className="text-xs font-caption text-muted-foreground">
                    {currentSecurityData.connectedDevices} active devices
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Password Section */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground flex items-center">
              <Icon name="Key" size={16} className="mr-2 text-primary" />
              Password & Authentication
            </h4>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={() => setShowPasswordModal(true)}
                iconName="Lock"
                iconPosition="left"
                className="flex-1 sm:flex-none"
              >
                Change Password
              </Button>
              
              <Button
                variant={currentSecurityData.twoFactorEnabled ? "default" : "outline"}
                onClick={handleTwoFactorToggle}
                iconName="Shield"
                iconPosition="left"
                className="flex-1 sm:flex-none"
              >
                {currentSecurityData.twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
              </Button>
            </div>
          </div>

          {/* Connected Devices */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground flex items-center">
              <Icon name="Smartphone" size={16} className="mr-2 text-primary" />
              Connected Devices
            </h4>
            
            <div className="space-y-3">
              {connectedDevices.map((device) => (
                <div key={device.id} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      <Icon name={getDeviceIcon(device.type)} size={20} className="text-muted-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium text-foreground">{device.name}</p>
                        {device.current && (
                          <span className="px-2 py-0.5 text-xs bg-success/10 text-success rounded-full font-caption">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-caption text-muted-foreground">
                        {device.location} • Last active {formatDateTime(device.lastActive)}
                      </p>
                    </div>
                  </div>
                  
                  {!device.current && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeviceRemove(device.id)}
                      iconName="X"
                      className="text-destructive hover:text-destructive"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Security Tips */}
          <div className="bg-primary/5 rounded-lg border border-primary/20 p-4">
            <h4 className="font-medium text-foreground flex items-center mb-3">
              <Icon name="Info" size={16} className="mr-2 text-primary" />
              Security Tips
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start space-x-2">
                <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                <span>Use a strong, unique password for your account</span>
              </li>
              <li className="flex items-start space-x-2">
                <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                <span>Enable two-factor authentication for extra security</span>
              </li>
              <li className="flex items-start space-x-2">
                <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                <span>Regularly review and remove unused connected devices</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-100"
            onClick={() => setShowPasswordModal(false)}
          />
          <div className="fixed inset-0 z-110 flex items-center justify-center p-4">
            <div className="bg-card rounded-lg border border-border shadow-warm-lg w-full max-w-md">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-heading font-medium text-foreground">
                    Change Password
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPasswordModal(false)}
                  >
                    <Icon name="X" size={20} />
                  </Button>
                </div>

                <div className="space-y-4">
                  <Input
                    label="Current Password"
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => handlePasswordInputChange('currentPassword', e.target.value)}
                    error={passwordErrors.currentPassword}
                    placeholder="Enter current password"
                    required
                  />

                  <Input
                    label="New Password"
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => handlePasswordInputChange('newPassword', e.target.value)}
                    error={passwordErrors.newPassword}
                    placeholder="Enter new password"
                    description="Must be at least 8 characters with uppercase, lowercase, and number"
                    required
                  />

                  <Input
                    label="Confirm New Password"
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => handlePasswordInputChange('confirmPassword', e.target.value)}
                    error={passwordErrors.confirmPassword}
                    placeholder="Confirm new password"
                    required
                  />
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setShowPasswordModal(false)}
                    disabled={changingPassword}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="default"
                    onClick={handlePasswordSubmit}
                    loading={changingPassword}
                    className="flex-1"
                  >
                    {changingPassword ? 'Changing...' : 'Change Password'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AccountSecurity;