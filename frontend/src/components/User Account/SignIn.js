import React, { useState } from 'react';
import logo2 from './logo2-removebg-preview.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const SignIn = ({ setIsLoggedIn, setUserName }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Function to check if all fields are filled and email is valid
  const isFormValid = () => {
    // Regular expression for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email && password;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Perform sign in logic here
    if (!isFormValid()) {
      alert('Please enter a valid email and fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        email,
        password,
      });
      if (response.status === 200) {
        alert('Sign in successful');
        setIsLoggedIn(true); // Update isLoggedIn state upon successful sign-in
        setUserName(response.data.username);
        navigate(-1)
      } else if (response.status === 400 && response.data.message === 'Account is not active') {
        alert('Your account is not active. Please contact support.');
      } else {
        alert('Sign in failed');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      alert('Sign in failed');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className='header col-md-12' style={{ height: '6rem', backgroundColor: '#232f3e', textAlign: 'center', borderTopRightRadius: '10px', borderTopLeftRadius: '10px' }}>
              <img className="card-logo" src={logo2} alt="Logo" style={{ width: '6rem', height: '6rem', backgroundColor: '#232f3e' }} />
            </div>
            <div className="card-body">
              <div className='text-center'><h2 className="card-title mb-6">Sign In</h2></div>
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label>Email:<span style={{color:'red'}}>*</span></label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder='Enter your registered email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group mt-2">
                  <label>Password:<span style={{color:'red'}}>*</span></label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-4 col-md-6"
                  style={{ backgroundColor: '#FF914D', color: '#000000', borderRadius: '20px', marginLeft: '8rem' }}
                  disabled={!isFormValid()} // Disable the button if the form is not valid
                >
                  Sign In
                </button>
              </form>
              <div className='text-center'><p className="mt-3">Don't have an account? <Link to="/account">Create an account</Link></p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
