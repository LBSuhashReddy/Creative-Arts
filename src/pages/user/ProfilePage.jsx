/*
  File: src/pages/user/ProfilePage.jsx
  This is the new page component for the user's profile.
*/
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

// --- Helper Icons ---
const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /></svg>
);
const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
);

// --- Reusable ArtCard (can be moved to its own file later) ---
const ArtCard = ({ imageUrl, title }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
            <h3 className="font-bold text-lg truncate">{title}</h3>
        </div>
    </div>
);

// --- Special Upload Card ---
const UploadCard = () => (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:bg-gray-200 hover:border-indigo-500 hover:text-indigo-500 transition-all duration-300 cursor-pointer">
        <UploadIcon />
        <p className="mt-2 font-semibold">Upload New Art</p>
    </div>
);


const ProfilePage = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Posts'); // 'Posts' or 'Wishlist'

    // --- Manual Data for demonstration ---

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/'); // Use navigate for redirection
        } catch (error) {
            console.error("Failed to log out", error);
            // Optionally, show an error message to the user
        }
    };

    const userPosts = [
        { id: 1, title: 'My First Masterpiece', imageUrl: 'https://images.unsplash.com/photo-1547891654-e66ed711b999?w=800' },
        { id: 2, title: 'City at Night', imageUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800' },
    ];
    const userWishlist = [
        { id: 3, title: 'Golden Solitude', imageUrl: 'https://images.unsplash.com/photo-1531913423379-61763315a05f?w=800' },
    ];
    // ---

    const TabButton = ({ label }) => (
        <button
            onClick={() => setActiveTab(label)}
            className={`px-6 py-2 font-semibold rounded-md transition-all duration-300 ${
                activeTab === label
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
        >
            {label}
        </button>
    );

    if (!currentUser) {
        // This can be a loading spinner or a redirect in a real app
        return <p>Loading profile...</p>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* --- Profile Header --- */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
                <div className="relative">
                    <img 
                        src={currentUser.profileImageUrl || `https://i.pravatar.cc/150?u=${currentUser.uid}`} 
                        alt={currentUser.name}
                        className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                </div>
                <div className="flex-grow text-center md:text-left">
                    <h1 className="text-4xl font-bold text-gray-800">{currentUser.name || 'User Name'}</h1>
                    <p className="text-xl text-indigo-600 font-semibold mt-1">{currentUser.domain || 'Artistic Domain'}</p>
                    <p className="text-md text-gray-500 mt-2">{currentUser.email}</p>
                    <p className="mt-4 max-w-xl">{currentUser.bio || 'This is a sample bio. Users can edit this to share more about themselves and their art.'}</p>
                </div>
                <div className="flex flex-col space-y-2">
                    <button 
                        onClick={() => navigate('/edit-profile')}
                        className="flex items-center justify-center bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                    >
                        <EditIcon />
                        <span className="ml-2">Edit Profile</span>
                    </button>
                    <button 
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                    >
                        Log Out
                    </button>
                </div>
            </div>

            {/* --- Tabs and Content --- */}
            <div>
                <div className="flex justify-center md:justify-start border-b border-gray-200 mb-8">
                    <div className="flex space-x-4">
                        <TabButton label="Posts" />
                        <TabButton label="Wishlist" />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {activeTab === 'Posts' && (
                        <>
                            <UploadCard />
                            {userPosts.map(art => <ArtCard key={art.id} {...art} />)}
                        </>
                    )}
                    {activeTab === 'Wishlist' && (
                        userWishlist.length > 0 ? (
                            userWishlist.map(art => <ArtCard key={art.id} {...art} />)
                        ) : (
                            <p className="col-span-full text-center text-gray-500">Your wishlist is empty.</p>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

/*
  File: src/App.jsx
  You need to add the new routes for the profile and edit profile pages.
*/
/* --- Add these imports and routes to App.jsx ---

// Add these imports at the top
import ProfilePage from './pages/user/ProfilePage';
// Create a placeholder for EditProfilePage for now
const EditProfilePage = () => <div className="text-center mt-10"><h1 className="text-3xl font-bold">Edit Profile</h1><p>This page will contain the form to edit user details.</p></div>;


// Add these routes inside your <Routes> component
<Route path="/profile" element={<ProfilePage />} />
<Route path="/edit-profile" element={<EditProfilePage />} />

*/
