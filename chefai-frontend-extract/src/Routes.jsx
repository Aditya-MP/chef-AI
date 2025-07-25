import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import AutoNavigatingLandingPage from "pages/auto-navigating-landing-page";
import AuthenticationHub from "pages/authentication-hub";
import MainDashboardWithDualPanelLayout from "pages/main-dashboard-with-dual-panel-layout";
import ApplicationSettings from "pages/application-settings";
import FullScreenRecipeView from "pages/full-screen-recipe-view";
import UserProfileManagement from "pages/user-profile-management";
import IngredientRecognitionCameraInterface from "pages/ingredient-recognition-camera-interface";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<AutoNavigatingLandingPage />} />
        <Route path="/auto-navigating-landing-page" element={<AutoNavigatingLandingPage />} />
        <Route path="/authentication-hub" element={<AuthenticationHub />} />
        <Route path="/main-dashboard-with-dual-panel-layout" element={<MainDashboardWithDualPanelLayout />} />
        <Route path="/application-settings" element={<ApplicationSettings />} />
        <Route path="/full-screen-recipe-view" element={<FullScreenRecipeView />} />
        <Route path="/user-profile-management" element={<UserProfileManagement />} />
        <Route path="/ingredient-recognition-camera-interface" element={<IngredientRecognitionCameraInterface />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;