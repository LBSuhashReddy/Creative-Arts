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

const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
);


const onAddToWishlist = (e) => {
              e.stopPropagation(); // Prevents other click events on the card from firing
              if (onAddToWishlist) onAddToWishlist();
            };

// --- Redesigned ArtCard Component ---
const ArtCard = ({ imageUrl, title, artistName, artistAvatarUrl, price, onViewDetails, onInquire, onAddToWishlist }) => {
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
              onClick={onAddToWishlist}
              className="p-3 bg-white bg-opacity-80 rounded-full text-gray-800 hover:bg-opacity-100 hover:text-pink-500 transform hover:scale-110 transition-all duration-300"
              aria-label="Add to Wishlist"
            >
              <HeartIcon />
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

export default ArtCard;
