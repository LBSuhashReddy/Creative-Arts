import React from 'react';
import ArtCard from '../components/specific/ArtCard'; // Make sure this path is correct

// --- Manual Data ---
// This array now acts as our temporary database.
const manualArtworks = [
  {
    id: 1,
    title: 'Crimson Bloom',
    artistName: 'Eleanor Vance',
    price: '250',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800',
    artistAvatarUrl: 'https://i.pravatar.cc/150?u=eleanor',
  },
  {
    id: 2,
    title: 'Azure Depths',
    artistName: 'Marco Diaz',
    price: '450',
    imageUrl: 'https://images.unsplash.com/photo-1552353289-97f993ea0846?w=800',
    artistAvatarUrl: 'https://i.pravatar.cc/150?u=marco',
  },
  {
    id: 3,
    title: 'Golden Solitude',
    artistName: 'Aisha Khan',
    price: '320',
    imageUrl: 'https://images.unsplash.com/photo-1531913423379-61763315a05f?w=800',
    artistAvatarUrl: 'https://i.pravatar.cc/150?u=aisha',
  },
  {
    id: 4,
    title: 'Veridian Echo',
    artistName: 'Leo Rivera',
    price: '180',
    imageUrl: 'https://images.unsplash.com/photo-1506878206813-bb2154d4a210?w=800',
    artistAvatarUrl: 'https://i.pravatar.cc/150?u=leo',
  },
];
// --- End of Manual Data ---


const ExhibitionPage = () => {
  // We no longer need useState, useEffect, or any loading/error logic.
  // We just use the manual data directly.

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Art Exhibition</h1>
        <p className="text-lg text-gray-600 mt-2">Discover and acquire unique pieces from our talented artists.</p>
      </div>
      
      {manualArtworks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {manualArtworks.map((art) => (
            <ArtCard
              key={art.id}
              imageUrl={art.imageUrl}
              title={art.title}
              artistName={art.artistName}
              artistAvatarUrl={art.artistAvatarUrl}
              price={art.price}
              onViewDetails={() => alert(`Viewing details for ${art.title}`)}
              onInquire={() => alert(`Inquiring about ${art.title}`)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center mt-10">
          <h2 className="text-2xl font-semibold text-gray-700">The Gallery is Currently Empty</h2>
          <p className="text-gray-500 mt-2">Check back soon to see new artwork for sale!</p>
        </div>
      )}
    </div>
  );
};

export default ExhibitionPage;
