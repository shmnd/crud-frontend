import { useState } from 'react';
import './SignupPage.css';
import SignUpPage from "./SignupPage";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  // STATE: React remembers these values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="input-field"
            />
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