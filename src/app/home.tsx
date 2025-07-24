import React, { useState } from 'react';
import { PantryProvider } from '@/contexts/pantry-context';
import IngredientSelector from '@/components/pantry/ingredient-selector';
import DietaryFilters from '@/components/pantry/dietary-filters';
import RecipeView from '@/components/pantry/recipe-view';
import dynamic from 'next/dynamic';

const ProfilePage = dynamic(() => import('./pantry/profile/page'));
const SettingsPage = dynamic(() => import('./pantry/settings/page'));
const FullRecipeViewPage = dynamic(() => import('./pantry/fullrecipe/page'));

const sidebarItems = [
  { label: 'Full Recipe View', key: 'fullrecipe' },
];

export default function HomePage() {
  const [activeSidebar, setActiveSidebar] = useState('recent');

  // Debug panel state
  const [debugPantry, setDebugPantry] = useState<string[]>([]);
  const [showDebug, setShowDebug] = useState(false);

  // Get userId from localStorage (set after login)
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;

  const fetchPantry = async () => {
    if (!userId) return;
    const res = await fetch(`/api/pantry?userId=${userId}`);
    const data = await res.json();
    setDebugPantry(data);
  };

  return (
    <PantryProvider>
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
        {/* Sidebar Navigation */}
        <aside className="w-80 bg-white/90 border-r shadow-xl flex flex-col justify-between py-10 px-8 min-h-screen">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <img src="/logo.svg" alt="ChefAI" className="h-12 w-12" />
              <div>
                <div className="text-xl font-extrabold text-green-700 tracking-tight">ChefAI</div>
                <div className="text-xs text-gray-500">Your AI Cooking Companion</div>
              </div>
            </div>
            <nav className="flex flex-col gap-2 mb-8">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Navigation</h2>
                <hr className="border-gray-200 mb-6" />
              </div>
              <button className={`flex items-center gap-3 px-4 py-2 rounded-lg text-left font-medium transition ${activeSidebar === 'dashboard' ? 'bg-green-600 text-white shadow' : 'hover:bg-gray-100 text-gray-700'}`} onClick={() => setActiveSidebar('dashboard')}>
                <span className="inline-block"><svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-xl" viewBox="0 0 24 24"><path d="M3 9.5V19a2 2 0 0 0 2 2h3V14h4v7h3a2 2 0 0 0 2-2V9.5a2 2 0 0 0-.76-1.57l-7-5.5a2 2 0 0 0-2.48 0l-7 5.5A2 2 0 0 0 3 9.5z"></path></svg></span>
                Dashboard
              </button>
              <button className={`flex items-center gap-3 px-4 py-2 rounded-lg text-left font-medium transition ${activeSidebar === 'fullrecipe' ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-100 text-gray-700'}`} onClick={() => setActiveSidebar('fullrecipe')}>
                <span className="inline-block"><svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-xl" viewBox="0 0 24 24"><path d="M21 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path><path d="M8 2v2"></path><path d="M8 22v-2"></path></svg></span>
                Full Recipe View
              </button>
              <button className={`flex items-center gap-3 px-4 py-2 rounded-lg text-left font-medium transition ${activeSidebar === 'profile' ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-100 text-gray-700'}`} onClick={() => setActiveSidebar('profile')}>
                <span className="inline-block"><svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-xl" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"></circle><path d="M5.5 21a7.5 7.5 0 0 1 13 0"></path></svg></span>
                Profile
              </button>
              <button className={`flex items-center gap-3 px-4 py-2 rounded-lg text-left font-medium transition ${activeSidebar === 'settings' ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-100 text-gray-700'}`} onClick={() => setActiveSidebar('settings')}>
                <span className="inline-block"><svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-xl" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1c.18-.39.11-.85-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06c.97.44 1.43.61 1.82.33.39-.18.85-.11 1.82.33l.06.06a2 2 0 0 1 2.83 2.83l-.06.06c-.44.97-.61 1.43-.33 1.82.18.39.11.85.33 1.82z"></path></svg></span>
                Settings
              </button>
            </nav>
            <div className="mb-8">
              <div className="text-xs font-bold text-gray-500 mb-2 tracking-wide">RECIPE COLLECTIONS</div>
              <button className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-left font-medium transition ${activeSidebar === 'recent' ? 'bg-gray-100 text-green-700 shadow' : 'hover:bg-gray-100 text-gray-700'}`} onClick={() => setActiveSidebar('recent')}>
                <span className="material-icons text-lg">history</span> Recent Recipes
              </button>
              <button className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-left font-medium transition ${activeSidebar === 'favorites' ? 'bg-gray-100 text-green-700 shadow' : 'hover:bg-gray-100 text-gray-700'}`} onClick={() => setActiveSidebar('favorites')}>
                <span className="material-icons text-lg">favorite</span> Favorite Recipes
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-100 border-t">
            <img src="/avatar-demo.png" alt="Chef Sarah" className="h-10 w-10 rounded-full border border-gray-300" />
            <div>
              <div className="font-bold text-gray-700">Chef Sarah</div>
              <div className="text-xs text-gray-500">sarah.chef@example.com</div>
            </div>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 py-8 gap-8 bg-transparent">
          {/* Debug Panel for Pantry (for dev only, can be removed in prod) */}
          <div className="mb-2">
            <button
              className="text-xs px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 mb-1"
              onClick={() => {
                setShowDebug((v) => !v);
                if (!showDebug) fetchPantry();
              }}
            >
              {showDebug ? 'Hide' : 'Show'} Pantry Debug
            </button>
            {showDebug && (
              <div className="bg-white border rounded p-2 text-xs text-gray-700">
                <div className="font-bold mb-1">Stored Pantry (DB):</div>
                <ul className="list-disc ml-4">
                  {debugPantry.length > 0 ? debugPantry.map((item) => (
                    <li key={item}>{item}</li>
                  )) : <li className="text-gray-400">(empty)</li>}
                </ul>
                <div className="text-xs text-gray-400 mt-2">userId: {userId || '(not set)'}</div>
              </div>
            )}
          </div>
          {activeSidebar === 'dashboard' || activeSidebar === 'recent' || activeSidebar === 'favorites' ? (
            <>
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
                  Welcome back, Chef! <span className="inline-block">👋</span>
                </h1>
                <p className="text-lg text-gray-500">
                  What delicious recipe would you like to create today? Select your ingredients and let AI work its magic.
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Panel: Ingredient Selection */}
                <section className="bg-white/95 rounded-2xl shadow-lg p-6 flex flex-col gap-6 min-h-[480px] border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-800">Select Ingredients</h3>
                  <div className="flex-1 flex flex-col justify-center">
                    <IngredientSelector userId={userId} />
                  </div>
                </section>
                {/* Right Panel: AI Generated Recipes */}
                <section className="bg-white/95 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center min-h-[480px] border border-gray-100">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">AI Generated Recipes</h3>
                  <div className="flex flex-col items-center justify-center h-full">
                    <span className="material-icons text-6xl text-gray-200 mb-6">restaurant_menu</span>
                    <div className="text-xl font-semibold text-gray-600 mb-1.5">Ready to Cook with AI?</div>
                    <div className="text-base text-gray-500 text-center mb-3">
                      Select ingredients from the left panel to generate personalized recipes using Google Gemini AI.
                    </div>
                    <div className="flex gap-3 text-sm text-gray-400">
                      <span>AI-powered</span>
                      <span>•</span>
                      <span>Real-time generation</span>
                      <span>•</span>
                      <span>Personalized</span>
                    </div>
                  </div>
                  <div className="w-full mt-8">
                    <RecipeView />
                  </div>
                </section>
              </div>
            </>
          ) : activeSidebar === 'profile' ? (
            <ProfilePage />
          ) : activeSidebar === 'settings' ? (
            <SettingsPage />
          ) : activeSidebar === 'fullrecipe' ? (
            <FullRecipeViewPage />
          ) : null}
        </main>
      </div>
    </PantryProvider>
  );
}