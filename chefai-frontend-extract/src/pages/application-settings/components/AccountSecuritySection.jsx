import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AccountSecuritySection = ({ expanded, onToggle, className = "" }) => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formErrors, setFormErrors] = useState({});

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const handlePasswordChange = (field, value) => {
    setPasswordForm(prev => ({ ...prev, [field]: value }));
    if (field === 'newPassword') {
      setPasswordStrength(calculatePasswordStrength(value));
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
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePasswordSubmit = () => {
    if (validatePasswordForm()) {
      // Mock password change logic
      console.log('Password changed successfully');
      setShowPasswordModal(false);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setPasswordStrength(0);
      setFormErrors({});
    }
  };

  const handleLogout = () => {
    // Mock logout logic
    console.log('User logged out');
    setShowLogoutModal(false);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-error';
    if (passwordStrength < 50) return 'bg-warning';
    if (passwordStrength < 75) return 'bg-secondary';
    return 'bg-success';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  return (
    <>
      <div className={`bg-card rounded-lg border border-border shadow-warm ${className}`}>
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-quick"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Shield" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-heading font-medium text-foreground">Account Security</h3>
              <p className="text-sm font-caption text-muted-foreground">
                Password, authentication, and security settings
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
            {/* Password Change */}
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <h4 className="font-medium text-foreground">Change Password</h4>
                <p className="text-sm font-caption text-muted-foreground">
                  Update your account password for better security
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setShowPasswordModal(true)}
                iconName="Key"
                iconPosition="left"
              >
                Change
              </Button>
            </div>

            {/* Two-Factor Authentication */}
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <h4 className="font-medium text-foreground">Two-Factor Authentication</h4>
                <p className="text-sm font-caption text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <button
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-quick
                  ${twoFactorEnabled ? 'bg-primary' : 'bg-muted'}
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-background transition-quick
                    ${twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>

            {/* Active Sessions */}
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <h4 className="font-medium text-foreground">Active Sessions</h4>
                <p className="text-sm font-caption text-muted-foreground">
                  Manage your active login sessions
                </p>
              </div>
              <Button
                variant="ghost"
                iconName="Monitor"
                iconPosition="left"
              >
                View Sessions
              </Button>
            </div>

            {/* Logout */}
            <div className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg border border-destructive/20">
              <div>
                <h4 className="font-medium text-destructive">Sign Out</h4>
                <p className="text-sm font-caption text-muted-foreground">
                  Sign out from your account on this device
                </p>
              </div>
              <Button
                variant="destructive"
                onClick={() => setShowLogoutModal(true)}
                iconName="LogOut"
                iconPosition="left"
              >
                Sign Out
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-100"
            onClick={() => setShowPasswordModal(false)}
          />
          <div className="fixed inset-0 z-110 flex items-center justify-center p-4">
            <div className="bg-popover border border-border rounded-lg shadow-warm-lg w-full max-w-md">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="font-heading font-medium text-foreground">Change Password</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPasswordModal(false)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>

              <div className="p-4 space-y-4">
                <Input
                  label="Current Password"
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                  error={formErrors.currentPassword}
                  required
                />

                <Input
                  label="New Password"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                  error={formErrors.newPassword}
                  required
                />

                {passwordForm.newPassword && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-caption text-muted-foreground">
                        Password Strength
                      </span>
                      <span className={`text-sm font-medium ${
                        passwordStrength < 50 ? 'text-error' : 'text-success'
                      }`}>
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-smooth ${getPasswordStrengthColor()}`}
                        style={{ width: `${passwordStrength}%` }}
                      />
                    </div>
                  </div>
                )}

                <Input
                  label="Confirm New Password"
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                  error={formErrors.confirmPassword}
                  required
                />
              </div>

              <div className="flex items-center justify-end space-x-3 p-4 border-t border-border">
                <Button
                  variant="ghost"
                  onClick={() => setShowPasswordModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  onClick={handlePasswordSubmit}
                  iconName="Check"
                  iconPosition="left"
                >
                  Update Password
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-100"
            onClick={() => setShowLogoutModal(false)}
          />
          <div className="fixed inset-0 z-110 flex items-center justify-center p-4">
            <div className="bg-popover border border-border rounded-lg shadow-warm-lg w-full max-w-sm">
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="LogOut" size={24} className="text-warning" />
                </div>
                <h3 className="font-heading font-medium text-foreground mb-2">
                  Sign Out Confirmation
                </h3>
                <p className="text-sm font-caption text-muted-foreground mb-6">
                  Are you sure you want to sign out? You'll need to sign in again to access your account.
                </p>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    fullWidth
                    onClick={() => setShowLogoutModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    fullWidth
                    onClick={handleLogout}
                  >
                    Sign Out
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

export default AccountSecuritySection;