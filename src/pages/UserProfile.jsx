import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext' // Assuming you have this for user data

// --- Reusable ArtCard for Wishlist/Cart ---
const ItemCard = ({ imageUrl, title }) => (
    <div className="bg-gray-100 rounded-xl p-4">
        <div className="bg-gray-200 rounded-lg h-40 mb-4">
            <img src={imageUrl} alt={title} className="w-full h-full object-cover rounded-lg" />
        </div>
        <h3 className="text-center font-semibold text-gray-700">{title}</h3>
    </div>
);

// --- Placeholder Data ---
const placeholderData = {
    name: 'Jojo',
    address: '123 Art Lane, Creativity City, 12345',
    phone: '123-456-7890',
    email: 'jojo@email.com',
    avatarUrl: 'https://placehold.co/200x200/e2e8f0/e2e8f0',
    wishlist: [
        { id: 1, title: 'Crimson Bloom', imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400' },
        { id: 2, title: 'Azure Depths', imageUrl: 'https://images.unsplash.com/photo-1552353289-97f993ea0846?w=400' },
    ],
    cart: [
        { id: 3, title: 'Golden Solitude', imageUrl: 'https://images.unsplash.com/photo-1531913423379-61763315a05f?w=400' },
    ]
};

// --- UserProfilePage Component ---
const UserProfilePage = () => {
    const [activeTab, setActiveTab] = useState('Wishlist');
    // In a real app, you would get the user from the useAuth() hook
    const { currentUser, logout } = useAuth();
    // For now, we use placeholder data
    // const currentUser = placeholderData;
    // const logout = () => alert('Logging out...');

    const TabButton = ({ label }) => (
        <button
            onClick={() => setActiveTab(label)}
            className={`pb-2 font-semibold transition-all duration-300 ${
                activeTab === label
                    ? 'text-gray-800 border-b-2 border-gray-800'
                    : 'text-gray-400 hover:text-gray-600'
            }`}
        >
            {label}
        </button>
    );

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                
                {/* --- Profile Header Section --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {/* Profile Picture */}
                    <div className="flex flex-col items-center">
                        <div className="w-40 h-40 rounded-2xl bg-gray-200 mb-4">
                            <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-full h-full object-cover rounded-2xl" />
                        </div>
                        <button className="w-full bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors duration-300">
                            Edit
                        </button>
                    </div>

                    {/* Profile Details */}
                    <div className="md:col-span-2">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <p className="text-xl text-gray-600">Name: <span className="font-bold text-2xl text-gray-800">{currentUser.name}</span></p>
                                <p className="text-md text-gray-600 mt-2">Address: <span className="text-gray-800">{currentUser.address}</span></p>
                            </div>
                            <button className="bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors duration-300">
                                Edit
                            </button>
                        </div>
                        <div className="mb-6">
                            <p className="text-md text-gray-600">Contact:</p>
                            <div className="flex flex-col sm:flex-row sm:space-x-8 mt-1 text-md">
                                <p className="text-gray-500">Phone no: <span className="text-gray-700">{currentUser.phone}</span></p>
                                <p className="text-gray-500">Email: <span className="text-gray-700">{currentUser.email}</span></p>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <button className="bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors duration-300">
                                Chats
                            </button>
                            <button onClick={logout} className="bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors duration-300">
                                Log out
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- Wishlist/Cart Section --- */}
                <div className="mt-16">
                    <div className="flex justify-center space-x-8 border-b border-gray-200 mb-8">
                        <TabButton label="Wishlist" />
                        <TabButton label="Cart" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {(activeTab === 'Wishlist' ? currentUser.wishlist : currentUser.cart).map(item => (
                            <ItemCard key={item.id} imageUrl={item.imageUrl} title={item.title} />
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-center items-center mt-12 space-x-2">
                        <button className="p-2 w-10 h-10 flex items-center justify-center rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors">{"<"}</button>
                        <button className="p-2 w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-500 text-white">1</button>
                        <button className="p-2 w-10 h-10 flex items-center justify-center rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors">{">"}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;
