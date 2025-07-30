// File Path: src/pages/ArtistsDirectoryPage.jsx

import React, { useState } from 'react';
import SearchBar from '../components/common/SearchBar';
import ArtistCard from '../components/specific/ArtistCard';
// --- ArtistCard Component (specific to this page) ---
// const ArtistCard = ({ name, designation, domain, imageUrl, profileUrl }) => (
//     <div className="bg-white rounded-lg shadow-md p-6 text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
//         <img src={imageUrl} alt={name} className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-gray-200 object-cover" />
//         <h3 className="text-xl font-bold text-gray-800">{name}</h3>
//         <p className="text-md font-medium text-gray-500">{designation}</p>
//         <p className="text-indigo-600 font-semibold mt-1">{domain}</p>
//         <a 
//             href={profileUrl || '#'} 
//             className="mt-4 inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-300 transition-colors"
//         >
//             View Profile
//         </a>
//     </div>
// );


// --- Manual Artist Data (from your provided code) ---
const sampleArtists = [
    { 
      id: '1', 
      name: 'Suhas Kumar', 
      designation: 'Member', 
      domain: 'Digital Art', 
      imageUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop' 
    },
    { 
      id: '2', 
      name: 'Priya Sharma', 
      designation: 'Alumni', 
      domain: 'Photography', 
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop'
    },
    { 
      id: '3', 
      name: 'Raj Patel', 
      designation: 'Member', 
      domain: 'Sculpture', 
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop'
    },
    { id: 4, name: 'Aisha Khan', designation: 'Alumni', domain: 'Illustrator', imageUrl: 'https://i.pravatar.cc/150?u=aisha' },
    { id: 5, name: 'Leo Rivera', designation: 'Member', domain: 'Sculptor', imageUrl: 'https://i.pravatar.cc/150?u=leo' },
];

// --- ArtistsDirectoryPage Component ---
const ArtistsDirectoryPage = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredArtists = sampleArtists.filter(artist =>
        artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artist.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artist.designation.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                    {filteredArtists.map((artist) => (
                        <ArtistCard
                          key={artist.id}
                          id = {artist.id}
                          name={artist.name}
                          designation={artist.designation}
                          domain={artist.domain}
                          imageUrl={artist.imageUrl}
                        />
                      ))}
                </div>
            ) : (
                <div className="text-center py-10">
                    <h2 className="text-2xl font-semibold text-gray-700">No artists found.</h2>
                    <p className="text-gray-500 mt-2">Try adjusting your search terms.</p>
                </div>
            )}
        </div>
    );
};

export default ArtistsDirectoryPage;
