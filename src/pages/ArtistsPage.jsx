import React from 'react';
import ArtistCard from '../components/specific/ArtistCard';

const Artists = () => {
  // In a real application, this data would be fetched from your Firebase database.
  // For now, we'll use this sample data.
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
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Meet Our Artists
      </h1>
      
      {/* Grid container for the artist cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {sampleArtists.map((artist) => (
          <ArtistCard
            key={artist.id}
            name={artist.name}
            designation={artist.designation}
            domain={artist.domain}
            imageUrl={artist.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Artists;