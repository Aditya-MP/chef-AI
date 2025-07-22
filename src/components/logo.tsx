import { ChefHat } from 'lucide-react';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <ChefHat className="w-12 h-12 md:w-16 md:h-16 text-primary" />
      <h1 className="text-4xl md:text-5xl font-bold ml-2 md:ml-4 font-headline text-primary-foreground bg-primary px-3 py-1 rounded-md shadow-md">
        ChefAI
      </h1>
    </div>
  );
}
