import React from 'react';
import { Link } from 'react-router-dom';

// --- Helper Icons ---
const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);
const UserPlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
);


const AdminDashboardPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-lg text-gray-600 mt-2">Select an action to manage the club's content.</p>
      </div>

      <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Add Event Button */}
        <Link 
          to="/admin/add-event" 
          className="bg-white rounded-2xl shadow-lg p-8 text-center transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col items-center justify-center"
        >
          <div className="bg-indigo-100 text-indigo-600 p-4 rounded-full mb-4">
            <PlusIcon />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Add New Event</h2>
          <p className="text-gray-500 mt-1">Create workshops, talks, or exhibitions.</p>
        </Link>

        {/* Add Artist Button */}
        <Link 
          to="/admin/add-artist" 
          className="bg-white rounded-2xl shadow-lg p-8 text-center transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col items-center justify-center"
        >
          <div className="bg-green-100 text-green-600 p-4 rounded-full mb-4">
            <UserPlusIcon />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Add New Artist</h2>
          <p className="text-gray-500 mt-1">Create a new member/artist account.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboardPage;