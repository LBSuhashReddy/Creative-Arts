/*
  File: src/pages/user/EditProfilePage.jsx
  This component is updated with profile picture upload functionality.
*/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { updateUserProfile } from '../../services/userService';
import { uploadImage } from '../../services/storageService'; // We'll reuse this

const EditProfilePage = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    // Initialize state with the current user's data
    const [name, setName] = useState(currentUser?.name || '');
    const [domain, setDomain] = useState(currentUser?.domain || '');
    const [bio, setBio] = useState(currentUser?.bio || '');
    const [graduationYear, setGraduationYear] = useState(currentUser?.graduationYear || '');
    
    // New state for image handling
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(currentUser?.profileImageUrl || null);
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        let profileImageUrl = currentUser?.profileImageUrl;

        try {
            // If a new image was selected, upload it first
            if (imageFile) {
                profileImageUrl = await uploadImage(imageFile, `profile-pictures/${currentUser.uid}`);
            }

            const updatedData = {
                name,
                domain,
                bio,
                graduationYear: Number(graduationYear),
                profileImageUrl, // Add the new or existing URL to the data
            };

            await updateUserProfile(currentUser.uid, updatedData);
            setSuccess('Profile updated successfully!');
            setTimeout(() => {
                navigate('/profile');
            }, 1500);
        } catch (err) {
            setError('Failed to update profile. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (!currentUser) {
        return <div className="text-center py-10">Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Edit Your Profile</h1>
                
                {success && <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg">{success}</div>}
                {error && <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        {/* --- Profile Picture Upload --- */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
                            <div className="flex items-center space-x-6">
                                <div className="shrink-0">
                                    <img 
                                        className="h-20 w-20 object-cover rounded-full" 
                                        src={imagePreview || 'https://placehold.co/80x80/e2e8f0/e2e8f0?text=...'} 
                                        alt="Current profile" 
                                    />
                                </div>
                                <label className="block">
                                    <span className="sr-only">Choose profile photo</span>
                                    <input 
                                        type="file" 
                                        onChange={handleImageChange}
                                        accept="image/png, image/jpeg"
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required
                            />
                        </div>

                        {/* Domain */}
                        <div>
                            <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-1">Primary Artistic Domain</label>
                            <input
                                type="text" id="domain" value={domain} onChange={(e) => setDomain(e.target.value)}
                                placeholder="e.g., Painting, Photography"
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required
                            />
                        </div>
                        
                        {/* Graduation Year */}
                        <div>
                            <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
                            <input
                                type="number" id="graduationYear" value={graduationYear} onChange={(e) => setGraduationYear(e.target.value)}
                                placeholder="e.g., 2025"
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required
                            />
                        </div>

                        {/* Bio */}
                        <div>
                            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                            <textarea
                                id="bio" value={bio} onChange={(e) => setBio(e.target.value)}
                                rows="4" placeholder="Tell us a little about yourself and your art..."
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            ></textarea>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end space-x-4">
                        <button
                            type="button" onClick={() => navigate('/profile')}
                            className="px-6 py-2 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit" disabled={loading}
                            className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-300"
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfilePage;