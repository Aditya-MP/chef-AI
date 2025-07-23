'use client';

// Removed useAuth since authentication is disabled
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
// Removed Firebase profile update
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function ProfilePage() {
  // No user context
  const { toast } = useToast();
  const [displayName, setDisplayName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('Profile');
  // Settings
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  // Preferences
  const [dietary, setDietary] = useState('');
  const [cuisine, setCuisine] = useState('');
  // Security
  const [password, setPassword] = useState('');
  const [twoFA, setTwoFA] = useState(false);
  // Privacy
  const [dataSharing, setDataSharing] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    const savedName = localStorage.getItem('chefai_displayName');
    const savedAvatar = localStorage.getItem('chefai_avatarUrl');
    const savedDarkMode = localStorage.getItem('chefai_darkMode');
    const savedNotifications = localStorage.getItem('chefai_notifications');
    const savedDietary = localStorage.getItem('chefai_dietary');
    const savedCuisine = localStorage.getItem('chefai_cuisine');
    const savedTwoFA = localStorage.getItem('chefai_twoFA');
    const savedDataSharing = localStorage.getItem('chefai_dataSharing');
    if (savedName) setDisplayName(savedName);
    if (savedAvatar) setAvatarUrl(savedAvatar);
    if (savedDarkMode) setDarkMode(savedDarkMode === 'true');
    if (savedNotifications) setNotifications(savedNotifications === 'true');
    if (savedDietary) setDietary(savedDietary);
    if (savedCuisine) setCuisine(savedCuisine);
    if (savedTwoFA) setTwoFA(savedTwoFA === 'true');
    if (savedDataSharing) setDataSharing(savedDataSharing === 'true');
  }, []);

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('');
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      localStorage.setItem('chefai_displayName', displayName);
      localStorage.setItem('chefai_avatarUrl', avatarUrl);
      localStorage.setItem('chefai_darkMode', darkMode.toString());
      localStorage.setItem('chefai_notifications', notifications.toString());
      localStorage.setItem('chefai_dietary', dietary);
      localStorage.setItem('chefai_cuisine', cuisine);
      localStorage.setItem('chefai_twoFA', twoFA.toString());
      localStorage.setItem('chefai_dataSharing', dataSharing.toString());
      toast({ title: 'Profile Saved', description: 'Your changes have been saved locally.' });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">My Profile</CardTitle>
          <CardDescription>Manage your account and preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Tab Navigation */}
          <div className="flex gap-2 mb-6 justify-center">
            {['Profile', 'Settings', 'Preferences', 'Security', 'Activity', 'Privacy'].map(tab => (
              <Button key={tab} variant={activeTab === tab ? 'default' : 'outline'} size="sm" onClick={() => setActiveTab(tab)}>
                {tab}
              </Button>
            ))}
          </div>
          {/* Tab Content */}
          {activeTab === 'Profile' && (
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={avatarUrl || ''} alt={displayName || 'ChefAI User'} />
                  <AvatarFallback>{getInitials(displayName || 'ChefAI User')}</AvatarFallback>
                </Avatar>
                <input
                  type="text"
                  placeholder="Avatar URL (optional)"
                  className="border rounded px-2 py-1 text-sm"
                  value={avatarUrl}
                  onChange={e => setAvatarUrl(e.target.value)}
                  style={{ width: '220px' }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" value={'demo@chefai.com'} disabled />
              </div>
              <Button type="submit" disabled={isSaving}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                Save Changes
              </Button>
            </form>
          )}
          {activeTab === 'Settings' && (
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Dark Mode</Label>
                <input type="checkbox" checked={darkMode} onChange={e => setDarkMode(e.target.checked)} />
              </div>
              <div className="flex items-center justify-between">
                <Label>Notifications</Label>
                <input type="checkbox" checked={notifications} onChange={e => setNotifications(e.target.checked)} />
              </div>
              <Button type="submit" disabled={isSaving}>Save Settings</Button>
            </form>
          )}
          {activeTab === 'Preferences' && (
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dietary">Dietary Preferences</Label>
                <Input id="dietary" value={dietary} onChange={e => setDietary(e.target.value)} placeholder="e.g. Vegan, Gluten-Free" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cuisine">Favorite Cuisine</Label>
                <Input id="cuisine" value={cuisine} onChange={e => setCuisine(e.target.value)} placeholder="e.g. Italian, Indian" />
              </div>
              <Button type="submit" disabled={isSaving}>Save Preferences</Button>
            </form>
          )}
          {activeTab === 'Security' && (
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Change Password</Label>
                <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="New Password" />
              </div>
              <div className="flex items-center justify-between">
                <Label>Two-Factor Authentication</Label>
                <input type="checkbox" checked={twoFA} onChange={e => setTwoFA(e.target.checked)} />
              </div>
              <Button type="submit" disabled={isSaving}>Update Security</Button>
            </form>
          )}
          {activeTab === 'Activity' && (
            <div className="space-y-4">
              <h3 className="font-semibold">Recent Activity</h3>
              <ul className="list-disc pl-6 text-sm text-muted-foreground">
                <li>Reviewed "Spicy Paneer Tikka" - 5 stars</li>
                <li>Favorited "Classic Margherita Pizza"</li>
                <li>Updated profile info</li>
              </ul>
            </div>
          )}
          {activeTab === 'Privacy' && (
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Data Sharing</Label>
                <input type="checkbox" checked={dataSharing} onChange={e => setDataSharing(e.target.checked)} />
              </div>
              <Button type="submit" disabled={isSaving}>Update Privacy</Button>
              <div className="mt-4">
                <Button variant="destructive" size="sm" type="button" onClick={() => toast({ title: 'Account Deleted', description: 'Your account would be deleted (demo).' })}>Delete Account</Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
