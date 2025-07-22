'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Home,
  Heart,
  User,
  Settings,
  LogOut,
  History,
  Sun,
  Moon,
} from 'lucide-react';
import { auth } from '@/lib/firebase';
import Logo from '@/components/logo';
import { PantryProvider, usePantry } from '@/contexts/pantry-context';

function PantryLayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user } = useAuth();
  const { setOpen, isMobile, state } = useSidebar();

  const pantryContext = usePantry();
  const isRecipeVisible = pantryContext?.isRecipeVisible ?? false;
  
  // Collapse sidebar when recipe is visible on desktop
  useEffect(() => {
    if (!isMobile) {
        setOpen(!isRecipeVisible);
    }
  }, [isRecipeVisible, setOpen, isMobile]);

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/login');
  };

  // Basic theme toggle
  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('');
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="w-full flex items-center justify-center p-2 group-data-[collapsible=icon]:hidden">
             <Logo className="scale-75"/>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => router.push('/pantry')} tooltip="Pantry">
                <Home />
                <span>Pantry</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => router.push('/pantry/favorites')} tooltip="Favorites">
                <Heart />
                <span>Favorites</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => router.push('/pantry/recent')} tooltip="History">
                <History />
                <span>Recent Recipes</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className='items-center'>
            <div className="w-full flex justify-center pb-2">
                 <Button variant="ghost" size="icon" onClick={toggleTheme} className="dark:hidden">
                    <Sun/>
                 </Button>
                 <Button variant="ghost" size="icon" onClick={toggleTheme} className="hidden dark:flex">
                    <Moon/>
                 </Button>
            </div>
          <div className="flex items-center gap-3 w-full border-t p-2">
             <Avatar>
                <AvatarImage src={user?.photoURL ?? ''} alt={user?.displayName ?? 'User'} />
                <AvatarFallback>{getInitials(user?.displayName)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden group-data-[collapsible=icon]:hidden">
                <p className="font-semibold text-sm truncate">{user?.displayName ?? 'User'}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
          </div>
           <SidebarMenu>
             <SidebarMenuItem>
                <SidebarMenuButton onClick={() => router.push('/pantry/profile')} tooltip="Profile">
                    <User />
                    <span>Profile</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton onClick={() => router.push('/pantry/settings')} tooltip="Settings">
                    <Settings />
                    <span>Settings</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} tooltip="Log Out">
                    <LogOut />
                    <span>Log Out</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-background/50 backdrop-blur-sm px-6 sticky top-0 z-30 md:hidden">
           <SidebarTrigger/>
           <h2 className="font-semibold">ChefAI</h2>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}


export default function PantryLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
        <div className="flex items-center justify-center h-screen bg-background">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        </div>
    );
  }

  return (
    <PantryProvider>
        <PantryLayoutContent>{children}</PantryLayoutContent>
    </PantryProvider>
  );
}
