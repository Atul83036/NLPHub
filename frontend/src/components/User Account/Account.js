import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo2 from './logo2-removebg-preview.png';
import axios from 'axios';

const Account = ({ setIsLoggedIn }) => {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Perform validation here
    if (!username || !email || !password || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }
    if (!validateEmail(email)) {
      alert('Invalid email format');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Send email verification
    axios.post('http://127.0.0.1:8000/api/register/', {
      email,
      username,
      password,
    })
    .then(registerResponse => {
      if (registerResponse.status === 200) {
        alert('Account created successfully');
        // Log in the user after successful registration
        axios.post('http://127.0.0.1:8000/api/login/', {
          email,
          password,
        })
        .then(function(res) 
          {setIsLoggedIn(true)
            navigate(-1)},
        loginResponse => {
          if (loginResponse.status === 200) {
            alert('Logged in successfully');
             // Update isLoggedIn state upon successful login
             navigate(-1);
          } else {
            console.error('Login failed:', loginResponse.data);
            alert('Login failed');
          }
        })
        .catch(loginError => {
          console.error('Error logging in:', loginError);
          alert('Login failed');
        });
      } else {
        console.error('Failed to create account:', registerResponse.data); // Log the response data
        alert('Failed to create account');
      }
    })
    .catch(error => {
      console.error('Error creating account:', error);
      alert('Failed to create account');
    });
  };
  
  
  // Function to check if all fields are filled
  const isFormValid = () => {
    return username && email && password && confirmPassword && validateEmail(email) && password === confirmPassword;
  };

  // Function to validate email format
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <div className="container mt-2">
      <div className="row justify-content-center">
        <div className="col-md-5 ">
          <div className="card " style={{ minHeight: '30rem', borderRadius: '10px' }}>
            <div className='header col-md-12' style={{ height: '6rem', backgroundColor: '#232f3e', textAlign: 'center', borderTopRightRadius: '10px', borderTopLeftRadius: '10px' }}>
              <img className="card-logo" src={logo2} alt="Logo" style={{ width: '6rem', height: '6rem', backgroundColor: '#232f3e' }} />
            </div>
            <div className="card-body d-flex flex-column align-items-center">
              <h2 className="card-title mb-4">Complete Sign Up</h2>
              <form onSubmit={handleFormSubmit} className="w-100">
                <div className="form-group">
                  <label>Name:<span style={{color:'red'}}>*</span></label>
                  <input type="text" className="form-control" value={username} onChange={(e) => setName(e.target.value)} placeholder='Enter Your Name' />
                </div>
                <div className="form-group mt-2">
                  <label>Email:<span style={{color:'red'}}>*</span></label>
                  <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email' />
                </div>
                <div className="form-group mt-2">
                  <label>Password:<span style={{color:'red'}}>*</span></label>
                  <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Your Password' />
                  <label>Must be 8 characters.</label>
                </div>
                <div className="form-group mt-2">
                  <label>Confirm Password:<span style={{color:'red'}}>*</span></label>
                  <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Enter Your Confirm Password' />
                </div>
                <button type="submit" className="btn btn-primary mt-4 col-md-6"
                  style={{ backgroundColor: '#FF914D', color: '#000000', borderRadius: '20px', marginLeft: '6rem' }}
                  disabled={!isFormValid()} // Disable the button if the form is not valid
                >
                  Create Account
                </button>
              </form>
              <p className="mt-3">Already have an account? <Link to="/signin">Sign In here</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
