import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
// At the top, import the new page
import RegisterPage from './pages/auth/RegisterPage';

// ... inside the AppRoutes component
const AppRoutes = () => {
  const path = window.location.pathname;
  switch (path) {
    case '/':
      return <HomePage />;
    case '/login':
      return <LoginPage />;
    case '/register': // Add this new case
      return <RegisterPage />;
    // ... other routes
    default:
      return <HomePage />;
  }
};

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
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
