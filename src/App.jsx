import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Keep Routes and Route
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage'; // Import the new page
import Artists from './pages/ArtistsPage';
import ExhibitionPage from './pages/ExhibitionPage'
import EventsPage from './pages/EventsPage'
import ProfilePage from './pages/user/ProfilePage'
const Footer = () => (
  <footer className="bg-gray-100 mt-12">
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
      <p>&copy; {new Date().getFullYear()} Creative Arts Club. All rights reserved.</p>
    </div>
  </footer>
);

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/artists" element={<Artists />} />
            {/* Add more routes here as needed */}
            <Route path="/artists" element={<Artists />} />
            <Route path="/exhibition" element={<ExhibitionPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/profile" element={<ProfilePage />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
