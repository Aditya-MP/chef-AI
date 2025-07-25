import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const PersonalDetailsForm = ({ 
  initialData = {},
  onSave = () => {},
  className = "" 
}) => {
  const [formData, setFormData] = useState({
    username: initialData.username || 'chef_master_2024',
    email: initialData.email || 'chef@example.com',
    firstName: initialData.firstName || 'Alex',
    lastName: initialData.lastName || 'Johnson',
    phone: initialData.phone || '+1 (555) 123-4567',
    bio: initialData.bio || 'Passionate home cook exploring flavors from around the world'
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (formData.phone && !/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onSave(formData);
      setHasChanges(false);
      
      // Show success message
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Failed to save profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setFormData({
      username: initialData.username || '',
      email: initialData.email || '',
      firstName: initialData.firstName || '',
      lastName: initialData.lastName || '',
      phone: initialData.phone || '',
      bio: initialData.bio || ''
    });
    setErrors({});
    setHasChanges(false);
  };

  return (
    <div className={`bg-card rounded-lg border border-border shadow-warm p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-medium text-foreground">
            Personal Information
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Update your personal details and contact information
          </p>
        </div>
        <Icon name="User" size={24} className="text-primary" />
      </div>

      <div className="space-y-6">
        {/* Username */}
        <Input
          label="Username"
          type="text"
          value={formData.username}
          onChange={(e) => handleInputChange('username', e.target.value)}
          error={errors.username}
          placeholder="Enter your username"
          required
          description="This will be displayed on your recipes and profile"
        />

        {/* Email */}
        <Input
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={errors.email}
          placeholder="Enter your email address"
          required
          description="Used for account notifications and password recovery"
        />

        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            error={errors.firstName}
            placeholder="Enter your first name"
            required
          />
          
          <Input
            label="Last Name"
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            error={errors.lastName}
            placeholder="Enter your last name"
            required
          />
        </div>

        {/* Phone */}
        <Input
          label="Phone Number"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          error={errors.phone}
          placeholder="Enter your phone number"
          description="Optional - for account security notifications"
        />

        {/* Bio */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Bio
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            placeholder="Tell us about your cooking journey..."
            rows={4}
            className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-quick resize-none"
            maxLength={500}
          />
          <p className="text-xs font-caption text-muted-foreground">
            {formData.bio.length}/500 characters
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <Button
            variant="default"
            onClick={handleSave}
            disabled={!hasChanges || saving}
            loading={saving}
            iconName="Save"
            iconPosition="left"
            className="flex-1 sm:flex-none"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
          
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={!hasChanges || saving}
            iconName="RotateCcw"
            iconPosition="left"
            className="flex-1 sm:flex-none"
          >
            Reset Changes
          </Button>
        </div>

        {hasChanges && (
          <div className="flex items-center space-x-2 text-sm text-warning">
            <Icon name="AlertCircle" size={16} />
            <span>You have unsaved changes</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalDetailsForm;