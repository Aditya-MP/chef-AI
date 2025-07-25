import React, { createContext, useState, useEffect, useContext } from 'react';
import API from '../api/api';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Add this function to get user profile
  const getProfile = async () => {
    try {
      const response = await API.get('/auth/profile');
      setCurrentUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      logout();
      return null;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await getProfile();
        } catch (error) {
          console.error('Auth initialization error:', error);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (userData) => {
    localStorage.setItem('token', userData.token);
    setCurrentUser({
      _id: userData._id,
      name: userData.name,
      email: userData.email,
      isAdmin: userData.isAdmin
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  const register = async (data) => {
    return API.post('/auth/register', data);
  };

  const updateFavorites = (recipeId) => {
    setCurrentUser(prevUser => {
      if (!prevUser) return prevUser;
      
      const newFavorites = prevUser.favorites?.includes(recipeId)
        ? prevUser.favorites.filter(id => id !== recipeId)
        : [...(prevUser.favorites || []), recipeId];
      
      const updatedUser = {
        ...prevUser,
        favorites: newFavorites
      };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    login,
    logout,
    register,
    getProfile,
    updateFavorites,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
