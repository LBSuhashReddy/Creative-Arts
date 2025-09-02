/*
  File: src/pages/user/ProfilePage.jsx
  This component is the main profile page for a logged-in user.
  It displays their info, their artwork, and allows them to upload new posts.
*/
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { createArtwork, getArtworksForUser } from '../../services/artworkService';
import ArtCard from '../../components/specific/ArtCard'; // Reusable ArtCard

// --- Helper Icons ---
const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /></svg>
);
const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
);

// --- Special Upload Card ---
const UploadCard = ({ onClick }) => (
    <div onClick={onClick} className="flex flex-col items-center justify-center h-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 hover:bg-gray-100 hover:border-indigo-500 hover:text-indigo-500 transition-all duration-300 cursor-pointer min-h-[200px]">
        <UploadIcon />
        <p className="mt-2 font-semibold">Upload New Post</p>
    </div>
);

// --- Upload Modal Component ---
const UploadModal = ({ onClose, onUpload }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [forSale, setForSale] = useState(false);
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!imageFile) {
            setError("Please select an image to upload.");
            return;
        }
        setLoading(true);
        setError('');
        try {
            const artworkData = { 
                title, 
                description, 
                forSale, 
                price: forSale ? Number(price) : 0 
            };
            await onUpload(artworkData, imageFile);
            onClose(); // Close modal on success
        } catch (err) {
            setError("Failed to upload artwork. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Upload New Artwork</h2>
                {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {imagePreview && <img src={imagePreview} alt="Preview" className="w-full h-48 object-contain rounded-lg bg-gray-100" />}
                        <input type="file" onChange={handleImageChange} accept="image/*" required className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                        <input type="text" placeholder="Artwork Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows="3" className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                        
                        {/* For Sale Checkbox and Price Input */}
                        <div className="flex items-center space-x-3">
                            <input type="checkbox" id="forSale" checked={forSale} onChange={(e) => setForSale(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                            <label htmlFor="forSale" className="font-medium text-gray-700">List this item for sale</label>
                        </div>
                        {forSale && (
                            <input
                                type="number"
                                placeholder="Price in $"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        )}
                    </div>
                    <div className="mt-6 flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300">Cancel</button>
                        <button type="submit" disabled={loading} className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300">
                            {loading ? 'Uploading...' : 'Upload'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const ProfilePage = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [userPosts, setUserPosts] = useState([]);
    const [isLoadingPosts, setIsLoadingPosts] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchPosts = async () => {
        if (currentUser) {
            setIsLoadingPosts(true);
            const posts = await getArtworksForUser(currentUser.uid);
            setUserPosts(posts);
            setIsLoadingPosts(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [currentUser]);

    const handleUpload = async (artworkData, imageFile) => {
        await createArtwork(artworkData, imageFile, currentUser);
        fetchPosts(); // Refresh posts after upload
    };

    if (!currentUser) {
        return <p className="text-center py-10">Loading profile...</p>;
    }

    return (
        <>
            {isModalOpen && <UploadModal onClose={() => setIsModalOpen(false)} onUpload={handleUpload} />}
            <div className="container mx-auto px-4 py-8">
                {/* --- Profile Header --- */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
                    <img 
                        src={currentUser.profileImageUrl || `https://i.pravatar.cc/150?u=${currentUser.uid}`} 
                        alt={currentUser.name}
                        className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div className="flex-grow text-center md:text-left">
                        <h1 className="text-4xl font-bold text-gray-800">{currentUser.name || 'User Name'}</h1>
                        <p className="text-xl text-indigo-600 font-semibold mt-1">{currentUser.domain || 'Artistic Domain'}</p>
                        <p className="text-md text-gray-500 mt-2">{currentUser.email}</p>
                        <p className="mt-4 max-w-xl">{currentUser.bio || 'No bio provided.'}</p>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <button onClick={() => navigate('/edit-profile')} className="flex items-center justify-center bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300">
                            <EditIcon /> <span className="ml-2">Edit Profile</span>
                        </button>
                        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600">Log Out</button>
                    </div>
                </div>

                {/* --- Posts Section --- */}
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">My Posts</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        <UploadCard onClick={() => setIsModalOpen(true)} />
                        {isLoadingPosts ? (
                            <p>Loading posts...</p>
                        ) : (
                            userPosts.map(art => <ArtCard key={art.id} {...art} />)
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;

