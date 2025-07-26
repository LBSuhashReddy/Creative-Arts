import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css'; // Step 1: Make sure the CSS file is imported.

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  // Step 2: Use the class names from Navbar.css instead of Tailwind classes.
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <a href="/" className="navbar-brand">
            Creative Arts
          </a>
          <div className="navbar-links">
            <a href="/" className="navbar-link">Home</a>
            <a href="/exhibition" className="navbar-link">Exhibition</a>
            <a href="/artists" className="navbar-link">Artists</a>
            <a href="/events" className="navbar-link">Events</a>
            {currentUser ? (
              <>
                <a href="/profile" className="navbar-link">Profile</a>
                <button onClick={logout} className="navbar-button">Logout</button>
              </>
            ) : (
              <a href="/login" className="navbar-button">Login</a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
