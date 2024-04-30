import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo2 from './newlogoremove.png';

import axios from 'axios';
const Header = ({ isLoggedIn, setIsLoggedIn, username }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };


  async function submitLogout(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/logout", { withCredentials: true });
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error occurred while logging out:', error);
      // Handle error if needed
    }
  }


  return (
    <header style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#232f3e', color: '#fff' }}>
        <div className="container">

          {/* Logo */}
          <Link to="/" className="navbar-brand logo">
            <img src={logo2} alt="Logo" style={{ width: '7rem', height: '4rem' }} />
          </Link>

          {/* Toggle button for small screens */}
          <button className="navbar-toggler" style={{ backgroundColor: 'white', color: '#fff' }} type="button" onClick={toggleNav}>
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible menu items */}
          <div className={`collapse navbar-collapse justify-content-end ${isNavOpen ? 'show' : ''}`} id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/Sentiment" className="nav-link text-light">Sentiment</Link>
              </li>
              <li className="nav-item">
                <Link to="/Summary" className="nav-link text-light">Summary</Link>
              </li>
              <li className="nav-item">
                <Link to="/Translator" className="nav-link text-light">Translator</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light" href="#About">About Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light" href="#Contact">Contact Us</a>
              </li>

              {isLoggedIn ? (
                <li className="nav-item">
                  <form onSubmit={e => submitLogout(e)}>
                    <button className="btn btn-outline-success my-2 my-sm-0" style={{ backgroundColor: '#FF914D', color: '#000000', borderRadius: '20px' }} type="submit">Log out</button>
                  </form>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/SignIn" className="nav-link text-light">Sign In</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/account">
                      <button className="btn btn-outline-success my-2 my-sm-0" style={{ backgroundColor: '#FF914D', color: '#000000', borderRadius: '20px' }}>Create an Account</button>
                    </Link>
                  </li>
                </>
              )}

            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
