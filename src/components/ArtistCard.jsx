import React from 'react';

function ArtistCard (props) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
      {/* Image Section */}
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
        <img
          src={props.imageUrl}
          alt={props.name}
          className="w-full h-full object-cover"
          // Fallback in case the image fails to load
          onError={(e) => {
            e.target.onerror = null; 
            // Replace with a placeholder or a default icon/image
            e.target.src = `https://placehold.co/400x400/E2E8F0/4A5568?text=${props.name.charAt(0)}`;
          }}
        />
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-1">{props.name}</h3>
        <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2">{props.designation}</p>
        <p className="text-gray-600 mb-4">
          <span className="font-semibold">Domain:</span> {props.domain}
        </p>
        
        {/* Action Button */}
        <a 
          href="###" // This will later be a link to the artist's profile, e.g., `/artists/${artistId}`
          className="inline-block w-full text-center bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
        >
          View Profile
        </a>
      </div>
    </div>
  );
};

export default ArtistCard;
