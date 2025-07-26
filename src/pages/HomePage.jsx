import React from 'react';

const HomePage = () => (
  <div className="text-center">
    <div className="bg-indigo-600 text-white py-20 px-4 rounded-lg">
        <h1 className="text-5xl font-bold mb-4">Welcome to the Creative Arts Club</h1>
        <p className="text-xl mb-8">Discover, create, and share your passion for art.</p>
        <a href="/register" className="bg-white text-indigo-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-200">Join The Community</a>
    </div>
    
    <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">What We Offer</h2>
        <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-2">Art Exhibition</h3>
                <p>Explore amazing artwork from our talented members, available for sale.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-2">Artist Directory</h3>
                <p>Connect with our community of artists, both current students and alumni.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-2">Workshops & Events</h3>
                <p>Join our workshops and events to learn new skills and collaborate.</p>
            </div>
        </div>
    </div>
  </div>
);

export default HomePage;
