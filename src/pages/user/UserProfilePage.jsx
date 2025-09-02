import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getWishlistForUser } from '../../services/userService'; // Import the new function
import ArtCard from '../../components/specific/ArtCard';

// --- Helper Icons ---
const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /></svg>
);
const WishlistIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
);

const UserProfilePage = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    
    const [wishlist, setWishlist] = useState([]);
    const [loadingWishlist, setLoadingWishlist] = useState(true);

    useEffect(() => {
        // Fetch the user's wishlist when the component mounts or the user changes
        if (currentUser) {
            setLoadingWishlist(true);
            getWishlistForUser(currentUser.uid)
                .then(setWishlist)
                .finally(() => setLoadingWishlist(false));
        }
    }, [currentUser]);

    if (!currentUser) {
        return <div className="text-center py-20">Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                
                {/* --- Profile Header --- */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
                     <div className="relative group">
                        <img 
                            src={currentUser.profileImageUrl || `https://i.pravatar.cc/150?u=${currentUser.uid}`} 
                            alt={currentUser.name}
                            className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                        <button onClick={() => navigate('/edit-profile')} className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                            <EditIcon />
                        </button>
                    </div>
                     <div className="flex-grow text-center md:text-left">
                        <h1 className="text-4xl font-bold text-gray-800">{currentUser.name || 'User Name'}</h1>
                        <p className="text-md text-gray-500 mt-2">{currentUser.email}</p>
                        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                             <button onClick={() => navigate('/edit-profile')} className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors">
                                Edit Profile
                            </button>
                             <button onClick={() => navigate('/inbox')} className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors">
                                Chats
                            </button>
                            <button onClick={logout} className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors">
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- Wishlist Section --- */}
                <div>
                    <div className="text-center md:text-left mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                            <WishlistIcon />
                            My Wishlist
                        </h2>
                    </div>

                    {loadingWishlist ? (
                        <p className="text-center text-gray-500">Loading wishlist...</p>
                    ) : wishlist.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {wishlist.map(art => (
                                <ArtCard 
                                    key={art.id}
                                    {...art}
                                    onViewDetails={() => alert(`Viewing details for ${art.title}`)}
                                    onAddToWishlist={() => alert(`${art.title} is already in your wishlist!`)}
                                    onInquire={() => alert(`Inquiring about ${art.title}`)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-gray-50 rounded-lg">
                             <p className="text-gray-500">Your wishlist is empty.</p>
                             <p className="text-gray-400 text-sm mt-2">Click the heart icon on any artwork to add it here.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;