import { useState } from 'react';
import './SignupPage.css';
import { Link, useNavigate } from 'react-router-dom';

function SignUpPage() {
  // STATE: React remembers these values
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate()

  // FUNCTION: Handles form submission
  const handleSignup = async () => {
    setError(''); // Clear previous errors

    // Validation
    if (!email || !password || !username || !phoneNumber || !name) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    if (phoneNumber.length !== 10) {
      setError('Phone number must be exactly 10 digits');
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
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/authentication/create-or-update-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          username,
          phone_number: phoneNumber,
          name
        })
      });


      const data = await response.json();

      if (data.status === false && data.errors) {
        const errorMessage = [];

        for (const field in data.errors) {
          const fieldError = data.errors[field];
          errorMessage.push(...fieldError);
        }
        setError(errorMessage.join(', '));
        return;
      }


      if (data.status === true) {
        // alert('Signup Successfull');
        // console.log('Response',data);

        setName("");
        setEmail("");
        setUsername("");
        setPassword("");
        setPhoneNumber("");

        setTimeout(() => {
          navigate('/login');
        });
      }



      // Fake delay to simulate network request
      // await new Promise(resolve => setTimeout(resolve, 1500));

      // alert('Signup successful! ✓');
      // console.log('Email:', email);
      // console.log('Password:', password);
      // console.log('phone:', phoneNumber);
      // console.log('username:', username);
      // console.log('name:', name);
      // console.log('Response:', data);

    } catch (err) {
      setError('Signup failed. Please try again.');
      console.error('Error:', err)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">

        {/* Header */}
        <div className="login-header">
          <h1>Create your account</h1>
        </div>

        {/* Form Inputs */}
        <div className="login-form">

          {/* name */}
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jhon Doe"
              className="input-field"
            />
          </div>


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

          <div className="input-group">
            <label>Phone number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="1234567890"
              className="input-field"
            />
          </div>

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
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
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
            onClick={handleSignup}
            disabled={isLoading}
            className="login-button"
          >
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </button>
        </div>

        {/* Footer Links */}
        <div className="login-footer">
          <p>
            Already have an account? {''}
            <Link to="/login" className='link-button signup-link'>
              Login
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default SignUpPage;