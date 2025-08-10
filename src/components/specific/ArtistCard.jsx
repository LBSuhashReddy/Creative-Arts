import React from 'react';
import { Link } from 'react-router-dom'; // Step 1: Import the Link component

// Step 2: Accept 'id' as a prop
function ArtistCard({ id, name, designation, domain, imageUrl }) {
  return (
    // Step 3: Wrap the entire card in the Link component
    <Link to={`/artist/${id}`} className="block group">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
        {/* Image Section */}
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = `https://placehold.co/400x400/E2E8F0/4A5568?text=${name.charAt(0)}`;
            }}
          />
        </div>

        {/* Content Section */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{name}</h3>
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2">{designation}</p>
          <p className="text-gray-600 mb-4">
            <span className="font-semibold">Domain:</span> {domain}
          </p>
          
          {/* Action Button - The parent Link makes this clickable */}
          <div 
            className="inline-block w-full text-center bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg group-hover:bg-indigo-700 transition-colors duration-200"
          >
            View Profile
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArtistCard;
