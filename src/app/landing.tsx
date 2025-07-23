import React, { useEffect } from 'react';
import Logo from '@/components/logo';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50">
      <Logo />
      <p className="text-lg text-foreground/80 mt-2 font-body max-w-md mx-auto text-center">
        Your smart kitchen assistant. Get recipes from ingredients you already have.
      </p>
    </div>
  );
}
