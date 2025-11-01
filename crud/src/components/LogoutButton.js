// Example: How to use logout in any component

import { useNavigate } from 'react-router-dom';
import { clearAuth } from '../utils/cookies';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear all authentication data
    clearAuth();
    
    // Redirect to login page
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
}

export default LogoutButton;