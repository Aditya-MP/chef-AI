'use client';

import { useContext } from 'react';
import { PantryContext } from '@/contexts/pantry-context';

export const usePantry = () => {
  const context = useContext(PantryContext);
  if (context === undefined) {
    throw new Error('usePantry must be used within a PantryProvider');
  }
  return context;
};
