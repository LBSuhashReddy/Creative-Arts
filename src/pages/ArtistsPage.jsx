// File Path: src/pages/ArtistsDirectoryPage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllArtists } from '../services/userService'; // Import the new function

// --- Reusable Components (assuming they exist elsewhere) ---
const SearchBar = ({ placeholder, value, onChange }) => (
    <div className="mb-8 max-w-lg mx-auto">
        <input 
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-3 text-lg text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
    </div>
);

const ArtistCard = ({ id, name, designation, domain, imageUrl }) => (
    <Link to={`/artist/${id}`} className="block group">
        <div className="bg-white rounded-lg shadow-md p-6 text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <img 
              src={imageUrl || `https://i.pravatar.cc/150?u=${id}`} 
              alt={name} 
              className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-white shadow-md object-cover" 
            />
            <h3 className="text-xl font-bold text-gray-800">{name}</h3>
            <p className="text-md font-medium text-gray-500">{designation}</p>
            <p className="text-indigo-600 font-semibold mt-1">{domain}</p>
            <div className="mt-4 inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                View Profile
            </div>
        </div>
    </Link>
);

// --- ArtistsDirectoryPage Component ---
const ArtistsDirectoryPage = () => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchArtists = async () => {
            setLoading(true);
            try {
                const data = await getAllArtists();
                setArtists(data);
            } catch (error) {
                console.error("Failed to fetch artists:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchArtists();
    }, []);

    const filteredArtists = artists.filter(artist => {
        // Dynamically determine designation based on graduation year
        const designation = new Date().getFullYear() > artist.graduationYear ? 'Alumni' : 'Member';
        
        return artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
               (artist.domain && artist.domain.toLowerCase().includes(searchQuery.toLowerCase())) ||
               designation.toLowerCase().includes(searchQuery.toLowerCase());
    });

    if (loading) {
        return <div className="text-center py-20 text-xl font-semibold">Loading artists...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800">Meet Our Artists</h1>
                <p className="text-lg text-gray-600 mt-2">Meet the talented members and alumni of the Creative Arts Club.</p>
            </div>

            <SearchBar 
                placeholder="Search by name, domain, or designation..."
                value={searchQuery}
                onChange={setSearchQuery}
            />

            {filteredArtists.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredArtists.map((artist) => {
                        const designation = new Date().getFullYear() > artist.graduationYear ? 'Alumni' : 'Member';
                        return (
                            <ArtistCard
                                key={artist.uid}
                                id={artist.uid}
                                name={artist.name}
                                designation={designation}
                                domain={artist.domain}
                                imageUrl={artist.profileImageUrl}
                            />
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-10">
                    <h2 className="text-2xl font-semibold text-gray-700">No artists found.</h2>
                    <p className="text-gray-500 mt-2">Try adjusting your search terms or adding members via the admin dashboard.</p>
                </div>
            )}
        </div>
    );
};

export default ArtistsDirectoryPage;
