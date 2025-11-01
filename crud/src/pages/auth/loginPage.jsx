import { useState } from 'react';
import './SignupPage.css';
import SignUpPage from "./SignupPage";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../../utils/cookies';


function LoginPage() {
  // STATE: React remembers these values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
 const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  // FUNCTION: Handles form submission
  const handleLogin = async () => {
    setError(''); // Clear previous errors
    
    // Validation
    if ( !password || !username ) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    // Simulate API call
    setIsLoading(true);

    
    try {
      // TODO: Replace with your actual backend API call
      console.log('API Base URL:', process.env.REACT_APP_API_BASE_URL);

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/authentication/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username, 
          password, 
        })
      });


      const data = await response.json();

      if (data.status === false && data.errors) {
        const errorMessage = [];
        
        for (const field in data.errors){
          const fieldError = data.errors[field];
          errorMessage.push(...fieldError);
        }
        setError(errorMessage.join(', '));
        return;
      }
      

      if (data.status === true ){

        // Store tokens in cookies
        setCookie('access_token', data.data.access, 0.0021); // 5 minutes
        setCookie('refresh_token', data.data.refresh, 1); // 1 day
        
        // Optional: Store user info in localStorage
        localStorage.setItem('user', JSON.stringify(data.data.user));
        
        setUsername("");
        setPassword("");

        setTimeout(()=>{
          navigate('/home')
        })
      }


      // Fake delay to simulate network request
      // await new Promise(resolve => setTimeout(resolve, 1500));

      
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Error:',err)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        
        {/* Header */}
        <div className="login-header">
          <h1>Login to your account</h1>
        </div>
        
        {/* Form Inputs */}
        <div className="login-form">

          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="jhon12"
              className="input-field"
            />
          </div>
          
          {/* Password Input */}
          <div className="input-group">
            <label>Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="input-field"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle-btn"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  // Eye Slash Icon (hide password)
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  // Eye Icon (show password)
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          {/* Submit Button */}
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="login-button"
          >
            {isLoading ? 'Loging...' : 'Login'}
          </button>
        </div>
        
        {/* Footer Links */}
        <div className="login-footer">
          <button className="link-button">Forgot password?</button>
          <p>
            Create have an account? {SignUpPage}
            <Link to="/signup" className="link-button signup-link">
              Signup
            </Link>
          </p>
        </div>
        
      </div>
    </div>
  );
}

export default LoginPage;