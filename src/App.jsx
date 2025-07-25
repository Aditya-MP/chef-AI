import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateRecipe from './pages/CreateRecipe';
import Favorites from './pages/Favorites';
import AIRecipeGenerator from './pages/AIRecipeGenerator';

function AppLayout() {
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  // Don't show layout for login/register pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    );
  }

  // If not authenticated, redirect to login
  if (!currentUser) {
    return (
      <Routes>
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen shadow-warm" style={{ backgroundColor: 'var(--color-card)' }}>
          <div className="p-6">
            <h1 className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
              ChefAI
            </h1>
          </div>
          
          <nav className="mt-8">
            <div className="px-6 space-y-2">
              <Link
                to="/"
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-smooth touch-target ${
                  location.pathname === '/' 
                    ? 'text-white' 
                    : 'hover:bg-opacity-75'
                }`}
                style={{
                  backgroundColor: location.pathname === '/' ? 'var(--color-primary)' : 'transparent',
                  color: location.pathname === '/' ? 'var(--color-primary-foreground)' : 'var(--color-foreground)'
                }}
              >
                Dashboard
              </Link>
              
              <Link
                to="/favorites"
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-smooth touch-target ${
                  location.pathname === '/favorites' 
                    ? 'text-white' 
                    : 'hover:bg-opacity-75'
                }`}
                style={{
                  backgroundColor: location.pathname === '/favorites' ? 'var(--color-primary)' : 'transparent',
                  color: location.pathname === '/favorites' ? 'var(--color-primary-foreground)' : 'var(--color-foreground)'
                }}
              >
                Favorites
              </Link>
              
              <Link
                to="/create-recipe"
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-smooth touch-target ${
                  location.pathname === '/create-recipe' 
                    ? 'text-white' 
                    : 'hover:bg-opacity-75'
                }`}
                style={{
                  backgroundColor: location.pathname === '/create-recipe' ? 'var(--color-primary)' : 'transparent',
                  color: location.pathname === '/create-recipe' ? 'var(--color-primary-foreground)' : 'var(--color-foreground)'
                }}
              >
                Create Recipe
              </Link>
              
              <Link
                to="/ai-generator"
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-smooth touch-target ${
                  location.pathname === '/ai-generator' 
                    ? 'text-white' 
                    : 'hover:bg-opacity-75'
                }`}
                style={{
                  backgroundColor: location.pathname === '/ai-generator' ? 'var(--color-primary)' : 'transparent',
                  color: location.pathname === '/ai-generator' ? 'var(--color-primary-foreground)' : 'var(--color-foreground)'
                }}
              >
                AI Generator
              </Link>
            </div>
            
            <div className="absolute bottom-6 left-6 right-6">
              <button
                onClick={logout}
                className="w-full px-4 py-2 text-sm font-medium rounded-lg transition-smooth touch-target"
                style={{
                  backgroundColor: 'var(--color-destructive)',
                  color: 'var(--color-destructive-foreground)'
                }}
              >
                Logout
              </button>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-recipe" element={<CreateRecipe />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/ai-generator" element={<AIRecipeGenerator />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
}

export default App;
