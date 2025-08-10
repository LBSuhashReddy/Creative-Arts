import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // Make sure the CSS file is imported.

// --- Helper Icons for the Navbar ---
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
        try {
            await logout();
            navigate('/'); 
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

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
            
            {/* Conditional rendering for logged-in users */}
            {currentUser ? (
              <div className="flex items-center space-x-2">
                <a href="/profile" className="navbar-icon-link" aria-label="Profile">
                  <UserIcon />
                </a>
                <button onClick={handleLogout} className="navbar-button">Logout</button>
              </div>
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
