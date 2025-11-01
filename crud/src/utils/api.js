// utils/api.js

import { getCookie, setCookie, clearAuth } from './cookies';

// Base API function that automatically adds auth token
export const apiRequest = async (url, options = {}) => {
  const accessToken = getCookie('access_token');
  
  // Add Authorization header if token exists
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }
  
  try {
    let response = await fetch(url, {
      ...options,
      headers,
    });
    
    // If access token expired (401), try to refresh
    if (response.status === 401) {
      const refreshed = await refreshAccessToken();
      
      if (refreshed) {
        // Retry the original request with new token
        const newAccessToken = getCookie('access_token');
        headers['Authorization'] = `Bearer ${newAccessToken}`;
        
        response = await fetch(url, {
          ...options,
          headers,
        });
      } else {
        // Refresh failed, redirect to login
        clearAuth();
        window.location.href = '/login';
        throw new Error('Session expired');
      }
    }
    
    return response;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Function to refresh access token
const refreshAccessToken = async () => {
  const refreshToken = getCookie('refresh_token');
  
  if (!refreshToken) {
    return false;
  }
  
  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/token/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: refreshToken }),
    });
    
    if (!response.ok) {
      return false;
    }
    
    const data = await response.json();
    
    if (data.access) {
      // Store new access token
      setCookie('access_token', data.access, 0.0021); // 5 minutes
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Token refresh failed:', error);
    return false;
  }
};

// ========================================
// HOW TO USE IN YOUR COMPONENTS:
// ========================================

/*
import { apiRequest } from './utils/api';

// Example: Fetch user profile
const getUserProfile = async () => {
  try {
    const response = await apiRequest(
      `${process.env.REACT_APP_API_BASE_URL}/api/user/profile`,
      { method: 'GET' }
    );
    
    const data = await response.json();
    console.log('User profile:', data);
  } catch (error) {
    console.error('Failed to fetch profile:', error);
  }
};

// Example: Update user data
const updateUser = async (userData) => {
  try {
    const response = await apiRequest(
      `${process.env.REACT_APP_API_BASE_URL}/api/user/update`,
      {
        method: 'PUT',
        body: JSON.stringify(userData),
      }
    );
    
    const data = await response.json();
    console.log('Updated:', data);
  } catch (error) {
    console.error('Update failed:', error);
  }
};
*/