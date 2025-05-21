import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import LoginPopup from './components/Navbar/Login/LoginPopup';
import RegisterPopup from './components/Register/RegisterPopup';
import SlideShow from './components/SlideShow/SlideShow';
import Footer from './components/Footer/Footer';
import AboutUs from './components/Aboutus/AboutUs';
import DonatePage from './components/Donate/donatepage';
import DiscoverNGOs from './components/discover/DiscoverNGOs';
import YourDonation from './components/yourdonation/YourDonation';
import './App.css';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const BASE_URL = 'http://localhost:4000';

  // Check user authentication status on component load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${BASE_URL}/api/verify-token`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      })
        .then((res) => res.ok && setIsLoggedIn(true))
        .catch(() => {
          localStorage.removeItem('token');
          setIsLoggedIn(false);
        });
    }
  }, []);

  const handleLoginSuccess = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setCurrentPage('home');
  };

  return (
    <>
      {showLogin && (
        <LoginPopup
          setShowLogin={setShowLogin}
          setShowRegister={setShowRegister}
          handleLoginSuccess={handleLoginSuccess}
        />
      )}
      {showRegister && <RegisterPopup closePopup={() => setShowRegister(false)} />}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} setCurrentPage={setCurrentPage} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        {currentPage === 'home' && (
          <>
            <SlideShow setShowDonatePage={() => setCurrentPage('donate')} setShowLogin={setShowLogin} isLoggedIn={isLoggedIn} />
            <AboutUs />
            <Footer />
          </>
        )}
        {currentPage === 'donate' && <DonatePage isLoggedIn={isLoggedIn} setShowLogin={setShowLogin} />}
        {currentPage === 'discover' && (isLoggedIn ? <DiscoverNGOs /> : <button onClick={() => setShowLogin(true)}>Login</button>)}
        {currentPage === 'your-donations' && <YourDonation isLoggedIn={isLoggedIn} setShowLogin={setShowLogin} />}
      </div>
    </>
  );
};

export default App;
