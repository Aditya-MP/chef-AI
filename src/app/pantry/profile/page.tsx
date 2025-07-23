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

  // Load from localStorage on mount
  useEffect(() => {
    const savedName = localStorage.getItem('chefai_displayName');
    const savedAvatar = localStorage.getItem('chefai_avatarUrl');
    if (savedName) setDisplayName(savedName);
    if (savedAvatar) setAvatarUrl(savedAvatar);
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
          <CardDescription>Manage your personal information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
          <form onSubmit={handleProfileUpdate} className="space-y-4">
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
        </CardContent>
      </Card>
    </div>
  );
}
