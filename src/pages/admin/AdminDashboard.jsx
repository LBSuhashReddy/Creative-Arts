/*
  File: src/pages/admin/AdminDashboardPage.jsx
  This is the central "hub" for all admin actions.
*/
import React from 'react';
import { Link } from 'react-router-dom';

// --- Helper Icons ---
const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);
const UserPlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
);
const UploadCloudIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/></svg>
);

const AdminDashboardPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-lg text-gray-600 mt-2">Select an action to manage the club's content.</p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Create Event Button */}
        <Link 
          to="/admin/create-event" 
          className="bg-white rounded-2xl shadow-lg p-8 text-center transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col items-center justify-center"
        >
          <div className="bg-indigo-100 text-indigo-600 p-4 rounded-full mb-4">
            <PlusIcon />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Create Event</h2>
          <p className="text-gray-500 mt-1">Add a new workshop, talk, or exhibition.</p>
        </Link>

        {/* Add Artist Button */}
        <Link 
          to="/admin/add-artist" 
          className="bg-white rounded-2xl shadow-lg p-8 text-center transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col items-center justify-center"
        >
          <div className="bg-green-100 text-green-600 p-4 rounded-full mb-4">
            <UserPlusIcon />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Add Artist</h2>
          <p className="text-gray-500 mt-1">Create a single new member account.</p>
        </Link>
        
        {/* Bulk Add Artists Button */}
        <Link 
          to="/admin/bulk-add" 
          className="bg-white rounded-2xl shadow-lg p-8 text-center transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col items-center justify-center"
        >
          <div className="bg-blue-100 text-blue-600 p-4 rounded-full mb-4">
            <UploadCloudIcon />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Bulk Add Artists</h2>
          <p className="text-gray-500 mt-1">Upload a CSV to add multiple artists at once.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboardPage;