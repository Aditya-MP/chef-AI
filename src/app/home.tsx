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
        {/* Sidebar Navigation */}
        <aside className="w-80 bg-white/90 border-r shadow-xl flex flex-col justify-between py-10 px-8 min-h-screen">
          <div>
            <div className="flex items-center gap-4 mb-10">
              <img src="/logo.svg" alt="ChefAI" className="h-12 w-12" />
              <div>
                <div className="text-2xl font-extrabold text-green-700 tracking-tight">ChefAI</div>
                <div className="text-sm text-gray-500">Your AI Cooking Companion</div>
              </div>
            </div>
            <nav className="flex flex-col gap-3 mb-10">
              <button className={`flex items-center gap-3 px-5 py-3 rounded-xl text-left font-semibold transition ${activeSidebar === 'dashboard' ? 'bg-green-100 text-green-700 shadow' : 'hover:bg-gray-100 text-gray-700'}`} onClick={() => setActiveSidebar('dashboard')}>
                <span className="material-icons text-xl">dashboard</span> Dashboard
              </button>
              <button className={`flex items-center gap-3 px-5 py-3 rounded-xl text-left font-semibold transition ${activeSidebar === 'fullrecipe' ? 'bg-green-100 text-green-700 shadow' : 'hover:bg-gray-100 text-gray-700'}`} onClick={() => setActiveSidebar('fullrecipe')}>
                <span className="material-icons text-xl">menu_book</span> Full Recipe View
              </button>
              <button className={`flex items-center gap-3 px-5 py-3 rounded-xl text-left font-semibold transition ${activeSidebar === 'profile' ? 'bg-green-100 text-green-700 shadow' : 'hover:bg-gray-100 text-gray-700'}`} onClick={() => setActiveSidebar('profile')}>
                <span className="material-icons text-xl">person</span> Profile
              </button>
              <button className={`flex items-center gap-3 px-5 py-3 rounded-xl text-left font-semibold transition ${activeSidebar === 'settings' ? 'bg-green-100 text-green-700 shadow' : 'hover:bg-gray-100 text-gray-700'}`} onClick={() => setActiveSidebar('settings')}>
                <span className="material-icons text-xl">settings</span> Settings
              </button>
            </nav>
            <div className="mb-10">
              <div className="text-xs font-bold text-gray-500 mb-3 tracking-wide">RECIPE COLLECTIONS</div>
              <button className={`flex items-center gap-3 px-5 py-3 rounded-xl text-left font-semibold transition ${activeSidebar === 'recent' ? 'bg-gray-100 text-green-700 shadow' : 'hover:bg-gray-100 text-gray-700'}`} onClick={() => setActiveSidebar('recent')}>
                <span className="material-icons text-xl">history</span> Recent Recipes
              </button>
              <button className={`flex items-center gap-3 px-5 py-3 rounded-xl text-left font-semibold transition ${activeSidebar === 'favorites' ? 'bg-gray-100 text-green-700 shadow' : 'hover:bg-gray-100 text-gray-700'}`} onClick={() => setActiveSidebar('favorites')}>
                <span className="material-icons text-xl">favorite</span> Favorite Recipes
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4 p-5 rounded-xl bg-gray-100 border-t">
            <img src="/avatar-demo.png" alt="Chef Sarah" className="h-12 w-12 rounded-full border border-gray-300" />
            <div>
              <div className="font-bold text-gray-700 text-lg">Chef Sarah</div>
              <div className="text-xs text-gray-500">sarah.chef@example.com</div>
            </div>
          </div>
        </aside>
        {/* Main Content: Dual Panel Layout */}
        <main className="flex-1 flex flex-col px-6 md:px-12 xl:px-24 py-10 md:py-16 gap-12 bg-transparent">
          <div className="mb-12">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">Welcome back, Chef! <span className="inline-block">👋</span></h1>
            <p className="text-xl text-gray-500">What delicious recipe would you like to create today? Select your ingredients and let AI work its magic.</p>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
            {/* Left Panel: Ingredient Selection */}
            <section className="bg-white/95 rounded-3xl shadow-2xl px-6 md:px-10 py-8 md:py-10 flex flex-col gap-8 min-h-[520px] border border-gray-100">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Select Ingredients</h3>
              <div className="flex-1 flex flex-col justify-center">
                <IngredientSelector />
              </div>
            </section>
            {/* Right Panel: AI Generated Recipes */}
            <section className="bg-white/95 rounded-3xl shadow-2xl px-6 md:px-10 py-8 md:py-10 flex flex-col items-center justify-center min-h-[520px] border border-gray-100">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">AI Generated Recipes</h3>
              <div className="flex flex-col items-center justify-center h-full">
                <span className="material-icons text-8xl text-gray-200 mb-8">restaurant_menu</span>
                <div className="text-2xl font-semibold text-gray-600 mb-2">Ready to Cook with AI?</div>
                <div className="text-lg text-gray-500 text-center mb-4">Select ingredients from the left panel to generate personalized recipes using Google Gemini AI.</div>
                <div className="flex gap-4 text-base text-gray-400">
                  <span>AI-powered</span>
                  <span>•</span>
                  <span>Real-time generation</span>
                  <span>•</span>
                  <span>Personalized</span>
                </div>
              </div>
              {/* RecipeView will show generated recipe below */}
              <div className="w-full mt-10">
                <RecipeView />
              </div>
            </section>
          </div>
        </main>
      </div>
    </PantryProvider>
  );
}
