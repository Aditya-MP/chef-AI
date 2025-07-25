import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import SocialAuth from './components/SocialAuth';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import SecurityBadges from './components/SecurityBadges';

const AuthenticationHub = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [notification, setNotification] = useState(null);

  // Mock authentication functions
  const handleLogin = async (formData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock user data
      const userData = {
        id: 1,
        name: 'Chef User',
        email: formData.email,
        profilePhoto: null
      };
      
      // Store user data in localStorage
      localStorage.setItem('chefai_user', JSON.stringify(userData));
      localStorage.setItem('chefai_auth_token', 'mock_token_' + Date.now());
      
      setNotification({
        type: 'success',
        message: 'Welcome back! Redirecting to dashboard...'
      });
      
      setTimeout(() => {
        navigate('/main-dashboard-with-dual-panel-layout');
      }, 1000);
      
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Login failed. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (formData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock user creation
      const userData = {
        id: Date.now(),
        name: formData.fullName,
        email: formData.email,
        profilePhoto: null,
        createdAt: new Date().toISOString()
      };
      
      // Store user data in localStorage
      localStorage.setItem('chefai_user', JSON.stringify(userData));
      localStorage.setItem('chefai_auth_token', 'mock_token_' + Date.now());
      
      setNotification({
        type: 'success',
        message: 'Account created successfully! Welcome to ChefAI!'
      });
      
      setTimeout(() => {
        navigate('/main-dashboard-with-dual-panel-layout');
      }, 1000);
      
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Signup failed. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = async (provider) => {
    setLoading(true);
    try {
      // Simulate social auth
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = {
        id: Date.now(),
        name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
        email: `user@${provider}.com`,
        profilePhoto: null,
        provider: provider
      };
      
      localStorage.setItem('chefai_user', JSON.stringify(userData));
      localStorage.setItem('chefai_auth_token', 'mock_token_' + Date.now());
      
      setNotification({
        type: 'success',
        message: `Signed in with ${provider}! Redirecting...`
      });
      
      setTimeout(() => {
        navigate('/main-dashboard-with-dual-panel-layout');
      }, 1000);
      
    } catch (error) {
      setNotification({
        type: 'error',
        message: `${provider} authentication failed. Please try again.`
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (email) => {
    setLoading(true);
    try {
      // Simulate password reset email
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setNotification({
        type: 'success',
        message: 'Password reset link sent to your email!'
      });
      
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Failed to send reset email. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  // Clear notifications after 5 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Cooking ingredients background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
      </div>

      {/* Navigation Header */}
      <header className="relative z-10 p-4 lg:p-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/auto-navigating-landing-page')}
            className="flex items-center space-x-3 text-foreground hover:text-primary transition-quick"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="ChefHat" size={20} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-heading font-semibold">ChefAI</h1>
              <p className="text-xs font-caption text-muted-foreground hidden sm:block">
                Your AI Cooking Companion
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate('/auto-navigating-landing-page')}
            className="text-muted-foreground hover:text-foreground transition-quick"
          >
            <Icon name="ArrowLeft" size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] p-4">
        <div className="w-full max-w-md">
          {/* Auth Card */}
          <div className="bg-card/95 backdrop-blur-sm rounded-lg border border-border shadow-warm-lg p-6 sm:p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
                {activeTab === 'login' ? 'Welcome Back' : 'Join ChefAI'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {activeTab === 'login' ?'Sign in to continue your culinary journey' :'Create your account and start cooking smarter'
                }
              </p>
            </div>

            {/* Tab Navigation */}
            <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Forms */}
            {activeTab === 'login' ? (
              <LoginForm
                loading={loading}
                onSubmit={handleLogin}
                onForgotPassword={() => setShowForgotPassword(true)}
              />
            ) : (
              <SignupForm
                loading={loading}
                onSubmit={handleSignup}
              />
            )}

            {/* Social Authentication */}
            <div className="mt-6">
              <SocialAuth
                loading={loading}
                onSocialAuth={handleSocialAuth}
              />
            </div>

            {/* Security Badges */}
            <SecurityBadges />
          </div>

          {/* Additional Links */}
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              {activeTab === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setActiveTab(activeTab === 'login' ? 'signup' : 'login')}
                className="text-primary hover:text-primary/80 font-medium transition-quick"
              >
                {activeTab === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </main>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        onSubmit={handleForgotPassword}
        loading={loading}
      />

      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right">
          <div className={`
            flex items-center space-x-3 px-4 py-3 rounded-lg border shadow-warm-lg max-w-sm
            ${notification.type === 'success' ?'bg-success/10 border-success/20 text-success' :'bg-error/10 border-error/20 text-error'
            }
          `}>
            <Icon 
              name={notification.type === 'success' ? 'CheckCircle' : 'AlertCircle'} 
              size={20} 
            />
            <p className="text-sm font-medium">{notification.message}</p>
            <button
              onClick={() => setNotification(null)}
              className="text-current hover:opacity-70 transition-quick"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthenticationHub;