'use client';

// Removed useAuth since authentication is disabled
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
// Removed Firebase password reset
import { useEffect, useState } from 'react';

export default function SettingsPage() {
  // No user context
  const { toast } = useToast();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  const handlePasswordReset = async () => {
    try {
    // Password reset logic removed
    toast({
      title: 'Password Reset Disabled',
      description: 'Authentication is disabled in this app.',
      variant: 'destructive',
    });
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const toggleTheme = (checked: boolean) => {
      setIsDarkMode(checked);
      if (checked) {
          document.documentElement.classList.add('dark');
      } else {
          document.documentElement.classList.remove('dark');
      }
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Settings</CardTitle>
          <CardDescription>Manage your account and app preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                    <Label htmlFor="dark-mode" className="font-semibold">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Enable a darker color scheme.</p>
                </div>
                <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={toggleTheme} />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                    <p className="font-semibold">Change Password</p>
                    <p className="text-sm text-muted-foreground">Receive an email to reset your password.</p>
                </div>
                <Button onClick={handlePasswordReset}>
                  Reset Password
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
