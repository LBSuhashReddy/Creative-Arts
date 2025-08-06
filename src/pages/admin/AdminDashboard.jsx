import React, { useState } from 'react';

// --- Helper Icons ---
const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);

// --- AdminDashboardPage Component ---
const AdminDashboardPage = () => {
    // State for the form inputs
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Workshop');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const newEvent = {
            title,
            category,
            date,
            location,
            imageUrl,
            description,
        };

        // In a real application, you would call a service function here:
        // await eventService.createEvent(newEvent);

        console.log('New Event Submitted:', newEvent);
        
        // Simulate an API call
        setTimeout(() => {
            alert(`Event "${title}" has been created!`);
            // Reset form fields
            setTitle('');
            setCategory('Workshop');
            setDate('');
            setLocation('');
            setImageUrl('');
            setDescription('');
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-lg text-gray-600 mt-2">Manage club events and workshops.</p>
            </div>

            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Event</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Event Title */}
                        <div className="md:col-span-2">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        {/* Event Category */}
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option>Workshop</option>
                                <option>Talk</option>
                                <option>Exhibition</option>
                                <option>Activity</option>
                            </select>
                        </div>

                        {/* Event Date */}
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
                            <input
                                type="datetime-local"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        {/* Event Location */}
                        <div className="md:col-span-2">
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <input
                                type="text"
                                id="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        
                        {/* Image URL */}
                        <div className="md:col-span-2">
                            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                            <input
                                type="url"
                                id="imageUrl"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="https://images.unsplash.com/..."
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows="4"
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            ></textarea>
                        </div>
                    </div>

                    <div className="mt-8 text-right">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors duration-300 disabled:bg-indigo-300"
                        >
                            <PlusIcon />
                            <span className="ml-2">{isSubmitting ? 'Creating...' : 'Create Event'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
