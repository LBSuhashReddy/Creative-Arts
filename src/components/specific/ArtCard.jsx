import React from 'react';

// You can use a library like 'lucide-react' for icons, or use inline SVGs like this.
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


const ArtCard = ({
  imageUrl,
  title,
  artistName,
  artistAvatarUrl,
  price,
  onViewDetails,
  onInquire
}) => {
  return (
    // The 'group' class is essential for the hover effects to work on child elements.
    <div className="relative group overflow-hidden rounded-2xl shadow-lg bg-white transition-all duration-500 ease-in-out transform hover:shadow-2xl hover:-translate-y-2">
      
      {/* Animated Gradient Glow Effect (background) */}
      {/* This element is hidden by default and appears on hover, creating a beautiful glow. */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-60 group-hover:duration-200 transition-all duration-1000 animate-tilt"></div>

      {/* Main Card Content - positioned relative to stack on top of the glow */}
      <div className="relative bg-white rounded-2xl overflow-hidden">
        {/* Artwork Image */}
        <div className="overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-72 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
        </div>

        {/* Glassmorphism Hover Overlay */}
        {/* This overlay fades in on hover, providing a frosted glass effect over the image. */}
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

        {/* Card Information Section */}
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


// Example of how to use the ArtCard component
export default function ArtCardExample() {
  const artData = {
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
    title: 'Crimson Bloom',
    artistName: 'Eleanor Vance',
    artistAvatarUrl: 'https://i.pravatar.cc/150?u=eleanor',
    price: '250',
  };

  return (
    <div className="bg-gray-100 p-8 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm">
        <ArtCard
          imageUrl={artData.imageUrl}
          title={artData.title}
          artistName={artData.artistName}
          artistAvatarUrl={artData.artistAvatarUrl}
          price={artData.price}
          onViewDetails={() => alert(`Viewing details for ${artData.title}`)}
          onInquire={() => alert(`Inquiring about ${artData.title}`)}
        />
      </div>
    </div>
  );
}

