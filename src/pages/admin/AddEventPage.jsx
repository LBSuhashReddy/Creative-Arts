import React, { useState } from 'react';
import { createEvent } from '../../services/eventService';
import { uploadImage } from '../../services/storageService'; // Import the new storage service

// --- Helper Icons ---
const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);

// --- AdminDashboardPage Component ---
const AddEventPage = () => {
    // State for the form inputs
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Workshop');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [imageFile, setImageFile] = useState(null); // State for the image file
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!imageFile) {
            setError("Please select an image for the event.");
            return;
        }

        setIsSubmitting(true);
        setError('');
        setSuccess('');

        try {
            // 1. Upload the image and get the URL
            const imageUrl = await uploadImage(imageFile, 'event-images');

            // 2. Create the event object with the new image URL
            const newEvent = {
                title,
                category,
                date,
                location,
                imageUrl, // Use the URL from the upload
                description,
            };

            // 3. Save the event data to Firestore
            await createEvent(newEvent);
            setSuccess(`Event "${title}" has been successfully created!`);
            
            // Reset form fields
            setTitle('');
            setCategory('Workshop');
            setDate('');
            setLocation('');
            setImageFile(null);
            document.getElementById('imageFile').value = null; // Clear file input
            setDescription('');

        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-lg text-gray-600 mt-2">Manage club events and workshops.</p>
            </div>

            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Event</h2>
                
                {success && <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg">{success}</div>}
                {error && <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Event Title */}
                        <div className="md:col-span-2">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                        </div>

                        {/* Event Category & Date */}
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <option>Workshop</option><option>Talk</option><option>Exhibition</option><option>Activity</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
                            <input type="datetime-local" id="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                        </div>

                        {/* Event Location */}
                        <div className="md:col-span-2">
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                        </div>
                        
                        {/* Image File Input */}
                        <div className="md:col-span-2">
                            <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700 mb-1">Event Image</label>
                            <input
                                type="file"
                                id="imageFile"
                                onChange={handleImageChange}
                                accept="image/png, image/jpeg, image/gif"
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="4" className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required></textarea>
                        </div>
                    </div>

                    <div className="mt-8 text-right">
                        <button type="submit" disabled={isSubmitting} className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors duration-300 disabled:bg-indigo-300">
                            <PlusIcon />
                            <span className="ml-2">{isSubmitting ? 'Creating...' : 'Create Event'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEventPage;
