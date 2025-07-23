'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
// Removed Firebase authentication
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import Logo from './logo';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type FormFields = z.infer<typeof formSchema>;

type AuthFormProps = {
  variant: 'login' | 'signup';
};

export default function AuthForm({ variant }: AuthFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    setIsLoading(true);
    try {
      // Authentication logic removed
      toast({ title: 'Success!', description: 'Authentication is disabled.' });
    } catch (error: any) {
      toast({
        title: 'Authentication Failed',
        description: 'Authentication is disabled.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      {/* Blurred kitchen background */}
      <div className="absolute inset-0 z-0">
        <img src="/login-bg.jpg" alt="Kitchen background" className="w-full h-full object-cover blur-lg scale-105" />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      {/* Glassmorphism card */}
      <div className="relative z-10 w-full max-w-md mx-auto">
        <div className="rounded-2xl bg-white/70 backdrop-blur-lg shadow-2xl border border-white/40 p-8">
          <div className="flex flex-col items-center mb-6">
            <Logo />
            <div className="text-lg font-semibold mt-2 text-gray-700">ChefAI</div>
            <div className="text-sm text-gray-500">Your AI Cooking Companion</div>
          </div>
          {/* Tabs for Sign In / Sign Up */}
          <div className="flex mb-6 w-full">
            <button
              className={`flex-1 py-2 rounded-l-lg font-medium ${variant === 'login' ? 'bg-white/90 text-green-700 shadow' : 'bg-transparent text-gray-500'}`}
              type="button"
              onClick={() => window.location.href = '/login'}
            >Sign In</button>
            <button
              className={`flex-1 py-2 rounded-r-lg font-medium ${variant === 'signup' ? 'bg-white/90 text-green-700 shadow' : 'bg-transparent text-gray-500'}`}
              type="button"
              onClick={() => window.location.href = '/signup'}
            >Sign Up</button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register('email')}
              disabled={isLoading}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register('password')}
              disabled={isLoading}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-green-600" /> Remember me
              </label>
              <Link href="/forgot-password" className="text-green-700 hover:underline">Forgot password?</Link>
            </div>
            <Button type="submit" className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 rounded-lg" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {variant === 'login' ? 'Sign In' : 'Sign Up'}
            </Button>
          </form>
          <div className="my-4 flex items-center">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="px-2 text-gray-500 text-sm">Or continue with</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>
          <div className="flex gap-4 mb-2">
            <Button className="flex-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50" type="button">
              <img src="/google-icon.svg" alt="Google" className="w-5 h-5 mr-2 inline" /> Google
            </Button>
            <Button className="flex-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50" type="button">
              <img src="/facebook-icon.svg" alt="Facebook" className="w-5 h-5 mr-2 inline" /> Facebook
            </Button>
          </div>
          <div className="text-xs text-gray-500 text-center mt-2">
            By continuing, you agree to our <Link href="#" className="underline">Terms</Link> & <Link href="#" className="underline">Privacy Policy</Link>.
          </div>
        </div>
      </div>
    </div>
  );
}
