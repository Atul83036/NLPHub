import React, { useState, useEffect } from 'react';
import { Routes, Route} from "react-router-dom";
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Account from './components/User Account/Account';
import SignIn from './components/User Account/SignIn';
import About from './components/About/About';
import Summary from './components/Summary/Summary';
import Translator from './components/Translator/Translator';
import Sentiment from './components/Sentiment/Sentiment';
import axios from 'axios';
import './App.css'
import Contact from './components/Contact/Contact';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUserName] = useState('');

  // Check if the user is logged in on component mount
  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(storedIsLoggedIn);
  }, []);

  // Update isLoggedIn state and localStorage on login/logout
  const updateAuthStatus = (loggedIn) => {
    setIsLoggedIn(loggedIn);
    localStorage.setItem('isLoggedIn', loggedIn.toString());
  };

  return (
    <Routes >
      <Route path="/" element={<>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={updateAuthStatus} username={username}/>{/* Pass setIsLoggedIn as a prop */}
        <Home />
        <About/>
        <Contact/>
        <Footer isLoggedIn={isLoggedIn} />
      </>} />
      <Route path="/account" element={<Account setIsLoggedIn={updateAuthStatus} />} />
      <Route path="/SignIn" element={<SignIn setIsLoggedIn={updateAuthStatus}   setUserName={setUserName}/>}/>
      <Route path="/Summary" element={<><Header isLoggedIn={isLoggedIn} setIsLoggedIn={updateAuthStatus} username={username}/><Summary isLoggedIn={isLoggedIn}/><Footer isLoggedIn={isLoggedIn}/></>}/>
      <Route path="/Translator" element={<><Header isLoggedIn={isLoggedIn} setIsLoggedIn={updateAuthStatus} username={username}/><Translator isLoggedIn={isLoggedIn}/><Footer isLoggedIn={isLoggedIn}/></>}/>
      <Route path="/Sentiment" element={<><Header isLoggedIn={isLoggedIn} setIsLoggedIn={updateAuthStatus} username={username}/><Sentiment isLoggedIn={isLoggedIn}/><Footer isLoggedIn={isLoggedIn}/></>}/>
    </Routes>
  );
}

export default App;
