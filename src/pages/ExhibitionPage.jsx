/*
  File: src/pages/ExhibitionPage.jsx
  This component is now updated to fetch live data from Firestore.
*/
import React, { useState, useEffect } from 'react';
import SearchBar from '../components/common/SearchBar';
import ArtCard from '../components/specific/ArtCard';
import { getArtworksForSale } from '../services/artworkService'; // Import the correct service function

const ExhibitionPage = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchArtworks = async () => {
      setLoading(true);
      const data = await getArtworksForSale();
      setArtworks(data);
      setLoading(false);
    };
    fetchArtworks();
  }, []);

  const filteredArtworks = artworks.filter(art => 
    art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    art.artistName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="text-center py-20 text-xl font-semibold">Loading Exhibition...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Art Exhibition</h1>
        <p className="text-lg text-gray-600 mt-2">Discover and acquire unique pieces from our talented artists.</p>
      </div>
      
      <SearchBar 
        placeholder="Search by artwork or artist..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      
      {filteredArtworks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {filteredArtworks.map((art) => (
            <ArtCard
              key={art.id}
              imageUrl={art.imageUrl}
              title={art.title}
              artistName={art.artistName}
              artistAvatarUrl={art.artistAvatarUrl}
              price={art.price}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <h2 className="text-2xl font-semibold text-gray-700">No artwork is currently for sale.</h2>
          <p className="text-gray-500 mt-2">Please check back later!</p>
        </div>
      )}
    </div>
  );
};

export default ExhibitionPage;
