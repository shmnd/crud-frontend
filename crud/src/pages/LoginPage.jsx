import { useState } from 'react';
import './LoginPage.css';

function LoginPage() {
  // STATE: React remembers these values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // FUNCTION: Handles form submission
  const handleLogin = async () => {
    setError(''); // Clear previous errors
    
    // Validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    // Simulate API call
    setIsLoading(true);
    
    try {
      // TODO: Replace with your actual backend API call
      // const response = await fetch('http://your-backend-url/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });
      
      // Fake delay to simulate network request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert('Login successful! ✓');
      console.log('Email:', email);
      console.log('Password:', password);
      
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        
        {/* Header */}
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your account</p>
        </div>
        
        {/* Form Inputs */}
        <div className="login-form">
          
          {/* Email Input */}
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
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
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </div>
        
        {/* Footer Links */}
        <div className="login-footer">
          <button className="link-button">Forgot password?</button>
          <p>
            Don't have an account?{' '}
            <button className="link-button signup-link">Sign up</button>
          </p>
        </div>
        
      </div>
    </div>
  );
}

export default LoginPage;