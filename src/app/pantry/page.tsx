'use client';

import IngredientSelector from '@/components/pantry/ingredient-selector';
import RecipeView from '@/components/pantry/recipe-view';
import { usePantry } from '@/hooks/use-pantry';
import { AnimatePresence, motion } from 'framer-motion';

export default function PantryPage() {
  const { isRecipeVisible } = usePantry();

  return (
    <main className="flex-1 overflow-hidden relative">
      <AnimatePresence initial={false}>
        {!isRecipeVisible && (
          <motion.div
            key="selector"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <div className="h-full overflow-y-auto">
              <IngredientSelector />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isRecipeVisible && (
          <motion.div
            key="recipe"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <div className="h-full overflow-y-auto">
                <RecipeView />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
