// components/ProtectedRoute.js

import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/cookies';

function ProtectedRoute({ children }) {
  // Check if user has valid tokens
  if (!isAuthenticated()) {
    // Not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }

  // User is authenticated, render the page
  return children;
}

export default ProtectedRoute;

// ========================================
// HOW TO USE IN YOUR APP.JS OR ROUTER:
// ========================================

/*
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        {/* Protected routes - require authentication 
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}
*/