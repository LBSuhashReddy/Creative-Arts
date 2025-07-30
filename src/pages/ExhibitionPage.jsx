import React from 'react';

// --- Helper Icons for the Card ---
const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const MessageCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
  </svg>
);

// --- Redesigned ArtCard Component ---
const ArtCard = ({ imageUrl, title, artistName, artistAvatarUrl, price, onViewDetails, onInquire }) => {
  return (
    <div className="relative group overflow-hidden rounded-2xl shadow-lg bg-white transition-all duration-500 ease-in-out transform hover:shadow-2xl hover:-translate-y-2">
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-60 group-hover:duration-200 transition-all duration-1000"></div>
      <div className="relative bg-white rounded-2xl overflow-hidden">
        <div className="overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-72 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out flex items-center justify-center">
          <div className="flex space-x-4">
            <button 
              onClick={onViewDetails}
              className="p-3 bg-white bg-opacity-80 rounded-full text-gray-800 hover:bg-opacity-100 transform hover:scale-110 transition-all duration-300"
              aria-label="View Details"
            >
              <EyeIcon />
            </button>
            <button 
              onClick={onInquire}
              className="p-3 bg-white bg-opacity-80 rounded-full text-gray-800 hover:bg-opacity-100 transform hover:scale-110 transition-all duration-300"
              aria-label="Inquire about this art"
            >
              <MessageCircleIcon />
            </button>
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800 truncate">{title}</h3>
            {price && (
              <span className="text-lg font-semibold text-green-600">${price}</span>
            )}
          </div>
          <div className="flex items-center mt-3">
            <img
              src={artistAvatarUrl}
              alt={artistName}
              className="w-8 h-8 rounded-full object-cover mr-3"
            />
            <p className="text-md text-gray-600">{artistName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- Manual Data ---
const manualArtworks = [
  { id: 1, title: 'Crimson Bloom', artistName: 'Eleanor Vance', price: '250', imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800', artistAvatarUrl: 'https://i.pravatar.cc/150?u=eleanor' },
  { id: 2, title: 'Azure Depths', artistName: 'Marco Diaz', price: '450', imageUrl: 'https://images.unsplash.com/photo-1552353289-97f993ea0846?w=800', artistAvatarUrl: 'https://i.pravatar.cc/150?u=marco' },
  { id: 3, title: 'Golden Solitude', artistName: 'Aisha Khan', price: '320', imageUrl: 'https://images.unsplash.com/photo-1531913423379-61763315a05f?w=800', artistAvatarUrl: 'https://i.pravatar.cc/150?u=aisha' },
  { id: 4, title: 'Veridian Echo', artistName: 'Leo Rivera', price: '180', imageUrl: 'https://images.unsplash.com/photo-1506878206813-bb2154d4a210?w=800', artistAvatarUrl: 'https://i.pravatar.cc/150?u=leo' },
];

// --- ExhibitionPage Component ---
const ExhibitionPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Art Exhibition</h1>
        <p className="text-lg text-gray-600 mt-2">Discover and acquire unique pieces from our talented artists.</p>
      </div>
      
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
    </div>
  );
};

export default ExhibitionPage;
