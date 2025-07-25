import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataManagementSection = ({ expanded, onToggle, className = "", caches }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [exportLoading, setExportLoading] = useState(false);
  const [clearCacheLoading, setClearCacheLoading] = useState(false);

  // Mock user data statistics
  const dataStats = {
    recipes: 47,
    favorites: 12,
    cookingHistory: 156,
    ingredients: 89,
    reviews: 23,
    totalSize: '2.4 MB'
  };

  const handleExportData = async () => {
    setExportLoading(true);

    try {
      // Mock data export
      const userData = {
        profile: {
          name: 'Chef User',
          email: 'chef@example.com',
          joinDate: '2024-01-15',
          preferences: {
            dietary: ['vegetarian'],
            cuisines: ['italian', 'asian', 'mediterranean']
          }
        },
        recipes: {
          created: dataStats.recipes,
          favorites: dataStats.favorites,
          cookingHistory: dataStats.cookingHistory
        },
        ingredients: {
          saved: dataStats.ingredients,
          frequently_used: ['tomatoes', 'onions', 'garlic', 'olive oil']
        },
        reviews: {
          count: dataStats.reviews,
          averageRating: 4.2
        },
        exportDate: new Date().toISOString(),
        dataVersion: '1.0'
      };

      // Create and download JSON file
      const dataStr = JSON.stringify(userData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `chefai-data-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);

      setTimeout(() => {
        setExportLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Export failed:', error);
      setExportLoading(false);
    }
  };

  const handleClearCache = async () => {
    setClearCacheLoading(true);

    try {
      // Mock cache clearing
      localStorage.removeItem('recipeCache');
      localStorage.removeItem('ingredientCache');
      localStorage.removeItem('imageCache');

      // Clear any cached API responses
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      }

      setTimeout(() => {
        setClearCacheLoading(false);
        alert('Cache cleared successfully! The app may load slower on the next visit.');
      }, 1500);
    } catch (error) {
      console.error('Cache clear failed:', error);
      setClearCacheLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmation.toLowerCase() === 'delete my account') {
      // Mock account deletion
      console.log('Account deletion initiated');
      alert('Account deletion request submitted. You will receive a confirmation email within 24 hours.');
      setShowDeleteModal(false);
      setDeleteConfirmation('');
    } else {
      alert('Please type "delete my account" exactly to confirm deletion.');
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <>
      <div className={`bg-card rounded-lg border border-border shadow-warm ${className}`}>
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-quick">

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="Database" size={20} className="text-success" />
            </div>
            <div>
              <h3 className="font-heading font-medium text-foreground">Data Management</h3>
              <p className="text-sm font-caption text-muted-foreground">
                Export data, clear cache, and manage account deletion
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
            {/* Data Statistics */}
            <div className="p-3 bg-muted/30 rounded-lg">
              <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
                <Icon name="BarChart3" size={16} className="text-muted-foreground" />
                <span>Your Data Overview</span>
              </h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="font-caption text-muted-foreground">Recipes Created:</span>
                  <span className="font-mono text-foreground">{dataStats.recipes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-caption text-muted-foreground">Favorite Recipes:</span>
                  <span className="font-mono text-foreground">{dataStats.favorites}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-caption text-muted-foreground">Cooking Sessions:</span>
                  <span className="font-mono text-foreground">{dataStats.cookingHistory}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-caption text-muted-foreground">Saved Ingredients:</span>
                  <span className="font-mono text-foreground">{dataStats.ingredients}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-caption text-muted-foreground">Reviews Written:</span>
                  <span className="font-mono text-foreground">{dataStats.reviews}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-caption text-muted-foreground">Total Data Size:</span>
                  <span className="font-mono text-foreground">{dataStats.totalSize}</span>
                </div>
              </div>
            </div>

            {/* Export Personal Data */}
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <h4 className="font-medium text-foreground">Export Personal Data</h4>
                <p className="text-sm font-caption text-muted-foreground">
                  Download all your recipes, preferences, and cooking history
                </p>
              </div>
              <Button
              variant="outline"
              onClick={handleExportData}
              loading={exportLoading}
              iconName="Download"
              iconPosition="left">

                {exportLoading ? 'Exporting...' : 'Export'}
              </Button>
            </div>

            {/* Clear Cache */}
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <h4 className="font-medium text-foreground">Clear Application Cache</h4>
                <p className="text-sm font-caption text-muted-foreground">
                  Free up storage space and resolve performance issues
                </p>
              </div>
              <Button
              variant="outline"
              onClick={handleClearCache}
              loading={clearCacheLoading}
              iconName="Trash2"
              iconPosition="left">

                {clearCacheLoading ? 'Clearing...' : 'Clear Cache'}
              </Button>
            </div>

            {/* Privacy Settings */}
            <div className="p-3 bg-muted/30 rounded-lg">
              <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-muted-foreground" />
                <span>Privacy Controls</span>
              </h4>
              <div className="space-y-2">
                <Button
                variant="ghost"
                className="w-full justify-start"
                iconName="Eye"
                iconPosition="left">

                  View Privacy Policy
                </Button>
                <Button
                variant="ghost"
                className="w-full justify-start"
                iconName="FileText"
                iconPosition="left">

                  Terms of Service
                </Button>
                <Button
                variant="ghost"
                className="w-full justify-start"
                iconName="Cookie"
                iconPosition="left">

                  Cookie Preferences
                </Button>
              </div>
            </div>

            {/* Delete Account */}
            <div className="p-3 bg-destructive/10 rounded-lg border border-destructive/20">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-destructive">Delete Account</h4>
                  <p className="text-sm font-caption text-muted-foreground">
                    Permanently delete your account and all associated data
                  </p>
                </div>
                <Button
                variant="destructive"
                onClick={() => setShowDeleteModal(true)}
                iconName="Trash2"
                iconPosition="left">

                  Delete
                </Button>
              </div>
            </div>
          </div>
        }
      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteModal &&
      <>
          <div
          className="fixed inset-0 bg-black/50 z-100"
          onClick={() => setShowDeleteModal(false)} />

          <div className="fixed inset-0 z-110 flex items-center justify-center p-4">
            <div className="bg-popover border border-border rounded-lg shadow-warm-lg w-full max-w-md">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="font-heading font-medium text-destructive">Delete Account</h3>
                <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowDeleteModal(false)}>

                  <Icon name="X" size={20} />
                </Button>
              </div>

              <div className="p-4 space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-destructive/10 rounded-lg">
                  <Icon name="AlertTriangle" size={20} className="text-destructive mt-0.5" />
                  <div>
                    <h4 className="font-medium text-destructive">Warning: This action is irreversible</h4>
                    <p className="text-sm font-caption text-muted-foreground mt-1">
                      Deleting your account will permanently remove:
                    </p>
                    <ul className="text-sm font-caption text-muted-foreground mt-2 space-y-1">
                      <li>• All your recipes and cooking history</li>
                      <li>• Favorite recipes and ingredient lists</li>
                      <li>• Profile information and preferences</li>
                      <li>• Reviews and ratings you've submitted</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Type "delete my account" to confirm:
                  </label>
                  <input
                  type="text"
                  value={deleteConfirmation}
                  onChange={(e) => setDeleteConfirmation(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-destructive focus:border-transparent"
                  placeholder="delete my account" />

                </div>

                <p className="text-xs font-caption text-muted-foreground">
                  You will receive a confirmation email within 24 hours. Account deletion will be processed after email confirmation.
                </p>
              </div>

              <div className="flex items-center justify-end space-x-3 p-4 border-t border-border">
                <Button
                variant="ghost"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmation('');
                }}>

                  Cancel
                </Button>
                <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                disabled={deleteConfirmation.toLowerCase() !== 'delete my account'}>

                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </>
      }
    </>);

};

export default DataManagementSection;