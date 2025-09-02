/*
  File: src/pages/ArtistPage.jsx
  This is the corrected version of the dedicated/public artist page.
*/
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserProfile } from '../../services/userService';
import { getArtworksForUser } from '../../services/artworkService';
import { addToWishlist } from '../../services/userService';
import { useAuth } from '../../contexts/AuthContext'; // FIX: Import useAuth
import ArtCard from '../../components/specific/ArtCard';

const DedicatedArtistPage = () => {
    const { artistId } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useAuth(); // FIX: Get the currently logged-in user

    const [artist, setArtist] = useState(null);
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const postsPerPage = 3;

    useEffect(() => {
        const fetchArtistData = async () => {
            if (!artistId) return;
            setLoading(true);
            try {
                const profileData = await getUserProfile(artistId);
                const artworkData = await getArtworksForUser(artistId);
                
                if (profileData) {
                    setArtist(profileData);
                    setArtworks(artworkData);
                } else {
                    console.error("Artist not found");
                }
            } catch (error) {
                console.error("Failed to fetch artist data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchArtistData();
    }, [artistId]);

    const handleAddToWishlist = async (artwork) => {
        if (!currentUser) {
            navigate('/login');
            return;
        }
        try {
            await addToWishlist(currentUser.uid, artwork);
            setFeedbackMessage(`${artwork.title} added to your wishlist!`);
            setTimeout(() => setFeedbackMessage(''), 3000);
        } catch (error) {
            console.error(error);
            setFeedbackMessage('Failed to add to wishlist.');
             setTimeout(() => setFeedbackMessage(''), 3000);
        }
    };
    
    // Pagination Logic
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = artworks.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(artworks.length / postsPerPage);

    if (loading) {
        return <div className="text-center py-20 text-xl font-semibold">Loading Artist Profile...</div>;
    }

    if (!artist) {
        return <div className="text-center py-20 text-xl font-semibold">Artist Not Found</div>;
    }

    return (
        <>
            {/* Feedback Message Popup */}
            {feedbackMessage && (
                <div className="fixed bottom-5 right-5 bg-green-600 text-white py-2 px-4 rounded-lg shadow-lg z-50 animate-pulse">
                    {feedbackMessage}
                </div>
            )}

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                    
                    {/* --- Profile Header Section --- */}
                    <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
                        <img 
                            src={artist.profileImageUrl || 'https://placehold.co/200x200/e2e8f0/e2e8f0?text=...'} 
                            alt={artist.name} 
                            className="w-40 h-40 rounded-2xl object-cover bg-gray-200 flex-shrink-0 mb-6 md:mb-0 md:mr-12"
                        />
                        <div className="flex-grow">
                            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                                <div>
                                    <p className="text-lg text-gray-600">Name: <span className="font-bold text-gray-800 text-2xl">{artist.name}</span></p>
                                    <p className="text-lg text-gray-600">Domain: <span className="font-bold text-indigo-600">{artist.domain}</span></p>
                                </div>
                                <button onClick={() => navigate('/inbox')} className="mt-4 sm:mt-0 bg-gray-800 text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-700 transition-colors duration-300 flex items-center">
                                    Message <span className="ml-2 text-indigo-400">▶</span>
                                </button>
                            </div>
                            <div className="mb-6">
                                <p className="text-lg text-gray-600">Contact:</p>
                                <div className="flex flex-col sm:flex-row sm:space-x-8 mt-2 text-md">
                                    <p className="text-gray-500">Email: <span className="text-gray-700">{artist.email}</span></p>
                                </div>
                            </div>
                            {artist.bio && (
                                <blockquote className="relative p-4 text-center text-xl italic text-gray-600 border-l-4 border-indigo-500 bg-indigo-50 rounded-r-lg">
                                    <p>"{artist.bio}"</p>
                                </blockquote>
                            )}
                        </div>
                    </div>

                    {/* --- Posts Section --- */}
                    <div className="mt-16">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-gray-800 relative inline-block">
                                Posts
                                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-indigo-500 rounded-full"></span>
                            </h2>
                        </div>
                        
                        {currentPosts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {currentPosts.map(art => (
                                    <ArtCard 
                                        key={art.id} 
                                        {...art} 
                                        // FIX: Pass the wishlist handler to the ArtCard
                                        onAddToWishlist={() => handleAddToWishlist(art)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500 mt-8">This artist hasn't posted any artwork yet.</p>
                        )}

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                             <div className="flex justify-center items-center mt-12 space-x-2">
                                 <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 w-10 h-10 flex items-center justify-center rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors disabled:opacity-50">{"<"}</button>
                                 <button className="p-2 w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-500 text-white">{currentPage}</button>
                                 <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 w-10 h-10 flex items-center justify-center rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors disabled:opacity-50">{">"}</button>
                             </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DedicatedArtistPage;