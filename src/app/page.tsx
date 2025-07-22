'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/logo';

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="text-center animate-fade-in">
        <Logo />
        <p className="text-lg text-foreground/80 mt-2 font-body max-w-md mx-auto">
          Your smart kitchen assistant. Get recipes from ingredients you already have.
        </p>
        <div className="mt-8 flex justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      </div>
    </div>
  );
}
