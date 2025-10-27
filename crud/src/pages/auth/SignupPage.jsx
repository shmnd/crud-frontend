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
        body: JSON.stringify({ email, 
          password, 
          username, 
          phone_number: phoneNumber, 
          name 
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
        // alert('Signup Successfull');
        // console.log('Response',data);
        
        setName("");
        setEmail("");
        setUsername("");
        setPassword("");
        setPhoneNumber("");

        setTimeout(()=>{
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