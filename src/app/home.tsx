import React, { useState } from 'react';
import { PantryProvider } from '@/contexts/pantry-context';
import IngredientSelector from '@/components/pantry/ingredient-selector';
import DietaryFilters from '@/components/pantry/dietary-filters';
import RecipeView from '@/components/pantry/recipe-view';

const sidebarItems = [
  { label: 'Recent Recipes', key: 'recent' },
  { label: 'Favorite Recipes', key: 'favorites' },
  { label: 'Profile', key: 'profile' },
  { label: 'Settings', key: 'settings' },
];

export default function HomePage() {
  const [activeSidebar, setActiveSidebar] = useState('recent');

  return (
    <PantryProvider>
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
        {/* Sidebar Navigation - Fixed width and padding */}
        <aside className="w-72 bg-white/90 border-r shadow-xl flex flex-col justify-between py-6 px-6 min-h-screen">
          <div>
            {/* Logo Section - Reduced margin */}
            <div className="flex items-center gap-3 mb-8">
              <img src="/logo.svg" alt="ChefAI" className="h-10 w-10" />
              <div>
                <div className="text-xl font-extrabold text-green-700 tracking-tight">ChefAI</div>
                <div className="text-xs text-gray-500">Your AI Cooking Companion</div>
              </div>
            </div>

            {/* Main Navigation - Better spacing */}
            <nav className="flex flex-col gap-2 mb-8">
              <button 
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-left font-medium transition text-sm ${
                  activeSidebar === 'dashboard' 
                    ? 'bg-green-100 text-green-700 shadow-sm' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`} 
                onClick={() => setActiveSidebar('dashboard')}
              >
                <span className="material-icons text-lg">dashboard</span> Dashboard
              </button>
              <button 
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-left font-medium transition text-sm ${
                  activeSidebar === 'fullrecipe' 
                    ? 'bg-green-100 text-green-700 shadow-sm' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`} 
                onClick={() => setActiveSidebar('fullrecipe')}
              >
                <span className="material-icons text-lg">menu_book</span> Full Recipe View
              </button>
              <button 
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-left font-medium transition text-sm ${
                  activeSidebar === 'profile' 
                    ? 'bg-green-100 text-green-700 shadow-sm' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`} 
                onClick={() => setActiveSidebar('profile')}
              >
                <span className="material-icons text-lg">person</span> Profile
              </button>
              <button 
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-left font-medium transition text-sm ${
                  activeSidebar === 'settings' 
                    ? 'bg-green-100 text-green-700 shadow-sm' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`} 
                onClick={() => setActiveSidebar('settings')}
              >
                <span className="material-icons text-lg">settings</span> Settings
              </button>
            </nav>

            {/* Recipe Collections - Better spacing */}
            <div className="mb-6">
              <div className="text-xs font-bold text-gray-500 mb-3 tracking-wide uppercase">Recipe Collections</div>
              <div className="flex flex-col gap-1">
                <button 
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-left font-medium transition text-sm ${
                    activeSidebar === 'recent' 
                      ? 'bg-gray-100 text-green-700 shadow-sm' 
                      : 'hover:bg-gray-100 text-gray-700'
                  }`} 
                  onClick={() => setActiveSidebar('recent')}
                >
                  <span className="material-icons text-lg">history</span> Recent Recipes
                </button>
                <button 
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-left font-medium transition text-sm ${
                    activeSidebar === 'favorites' 
                      ? 'bg-gray-100 text-green-700 shadow-sm' 
                      : 'hover:bg-gray-100 text-gray-700'
                  }`} 
                  onClick={() => setActiveSidebar('favorites')}
                >
                  <span className="material-icons text-lg">favorite</span> Favorite Recipes
                </button>
              </div>
            </div>
          </div>

          {/* User Profile - Compact design */}
          <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 border">
            <img src="/avatar-demo.png" alt="Chef Sarah" className="h-10 w-10 rounded-full border border-gray-300" />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-700 text-sm truncate">Chef Sarah</div>
              <div className="text-xs text-gray-500 truncate">sarah.chef@example.com</div>
            </div>
          </div>
        </aside>

        {/* Main Content - Better responsive padding */}
        <main className="flex-1 flex flex-col px-6 py-8 gap-8 bg-transparent overflow-auto">
          {/* Header Section - Reduced padding */}
          <div className="mb-6">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-2 tracking-tight">
              Welcome back, Chef! <span className="inline-block">👋</span>
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl">
              What delicious recipe would you like to create today? Select your ingredients and let AI work its magic.
            </p>
          </div>

          {/* Dual Panel Layout - Better responsive grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 flex-1">
            {/* Left Panel: Ingredient Selection - Improved padding */}
            <section className="bg-white/95 rounded-2xl shadow-lg p-6 flex flex-col gap-6 min-h-[500px] border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">Select Ingredients</h3>
              <div className="flex-1 flex flex-col justify-center">
                <IngredientSelector />
              </div>
            </section>

            {/* Right Panel: AI Generated Recipes - Improved padding */}
            <section className="bg-white/95 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center min-h-[500px] border border-gray-100">
              <h3 className="text-xl font-bold mb-4 text-gray-800">AI Generated Recipes</h3>
              <div className="flex flex-col items-center justify-center h-full text-center">
                <span className="material-icons text-6xl text-gray-200 mb-6">restaurant_menu</span>
                <div className="text-xl font-semibold text-gray-600 mb-2">Ready to Cook with AI?</div>
                <div className="text-base text-gray-500 mb-4 max-w-md">
                  Select ingredients from the left panel to generate personalized recipes using Google Gemini AI.
                </div>
                <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-400">
                  <span>AI-powered</span>
                  <span>•</span>
                  <span>Real-time generation</span>
                  <span>•</span>
                  <span>Personalized</span>
                </div>
              </div>
              {/* RecipeView will show generated recipe below */}
              <div className="w-full mt-6">
                <RecipeView />
              </div>
            </section>
          </div>
        </main>
      </div>
    </PantryProvider>
  );
}