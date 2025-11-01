

// Set a cookie
export const setCookie = (name, value, days = 7) => {
  const maxAge = days * 24 * 60 * 60; // Convert days to seconds
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Strict; Secure`;
};

// Get a cookie by name
export const getCookie = (name) => {
  const nameEQ = name + "=";
  const cookies = document.cookie.split(';');
  
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length);
    }
  }
  return null;
};

// Delete a cookie
export const deleteCookie = (name) => {
  document.cookie = `${name}=; path=/; max-age=0`;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const accessToken = getCookie('access_token');
  const refreshToken = getCookie('refresh_token');
  return !!(accessToken || refreshToken);
};

// Get user info from localStorage
export const getUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// Clear all auth data (for logout)
export const clearAuth = () => {
  deleteCookie('access_token');
  deleteCookie('refresh_token');
  localStorage.removeItem('user');
};