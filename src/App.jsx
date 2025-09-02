import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Keep Routes and Route
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage'; // Import the new page
import ArtistsPage from './pages/artists/ArtistsPage';
import ExhibitionPage from './pages/ExhibitionPage'
import EventsPage from './pages/EventsPage'
import ArtistProfilePage from './pages/artists/ArtistProfilePage'
import InboxPage from './pages/user/InboxPage';
import ProtectedRoute from './routes/ProtectedRoute';
import AdminDashboardPage from './pages/admin/AdminDashboard';
import AddArtistPage from './pages/admin/AddArtistPage';
import AddEventPage from './pages/admin/AddEventPage';
import EditProfilePage from './pages/user/EditProfile';
import DedicatedArtistPage from './pages/artists/DedicatedArtistPage';
import UserProfilePage from './pages/user/UserProfilePage';

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
            {/* --- Public Routes (Visible to everyone) --- */}
            <Route path="/" element={<HomePage />} />
            <Route path="/exhibition" element={<ExhibitionPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/artists" element={<ArtistsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* --- Protected User Routes (Visible only to logged-in users) --- */}
            <Route 
              path="/artist-profile" 
              element={
                <ProtectedRoute>
                  <ArtistProfilePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/user-profile" 
              element={
                <ProtectedRoute>
                  <UserProfilePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/artist/:artistId" 
              element={
                <ProtectedRoute>
                  <DedicatedArtistPage />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/edit-profile" 
              element={
                <ProtectedRoute>
                  <EditProfilePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/inbox" 
              element={
                <ProtectedRoute>
                  <InboxPage />
                </ProtectedRoute>
              } 
            />

            {/* --- Protected Admin Routes (Visible only to admins) --- */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/add-event" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AddEventPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/add-artist" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AddArtistPage />
                </ProtectedRoute>
              } 
            />

            {/* --- Add a 404 Not Found page as a catch-all --- */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}

          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
