import React from 'react';

// --- Reusable ArtCard Component (can be moved to its own file) ---
const ArtCard = ({ imageUrl, title }) => (
  <div className="relative group overflow-hidden rounded-2xl shadow-lg bg-white transition-all duration-500 ease-in-out transform hover:shadow-2xl hover:-translate-y-2">
    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-60 group-hover:duration-200 transition-all duration-1000"></div>
    <div className="relative bg-white rounded-2xl overflow-hidden">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-64 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out flex items-end p-4">
        <h3 className="text-white text-lg font-bold">{title}</h3>
      </div>
    </div>
  </div>
);


// --- Placeholder Data ---
const artistData = {
  name: 'Jojo',
  domain: 'Suhas', // As per the image, though this might mean 'Painting', 'Sculpture' etc.
  phone: '1234567890',
  email: 'jojo@email.com',
  quote: 'Art is not perfect. If it is perfect then it is not art.',
  avatarUrl: 'https://placehold.co/200x200/e2e8f0/e2e8f0', // Placeholder image
  artworks: [
    { id: 1, title: 'Crimson Bloom', imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800' },
    { id: 2, title: 'Azure Depths', imageUrl: 'https://images.unsplash.com/photo-1552353289-97f993ea0846?w=800' },
    { id: 3, title: 'Golden Solitude', imageUrl: 'https://images.unsplash.com/photo-1531913423379-61763315a05f?w=800' },
  ]
};

// --- ArtistPage Component ---
const ArtistProfilePage = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
        
        {/* --- Profile Header Section --- */}
        <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
          {/* Profile Picture */}
          <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-12">
            <img 
              src={artistData.avatarUrl} 
              alt={artistData.name} 
              className="w-40 h-40 rounded-2xl object-cover bg-gray-200"
            />
          </div>

          {/* Profile Details */}
          <div className="flex-grow">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
              <div>
                <p className="text-lg text-gray-600">Name: <span className="font-bold text-gray-800">{artistData.name}</span></p>
                <p className="text-lg text-gray-600">Domain: <span className="font-bold text-gray-800">{artistData.domain}</span></p>
              </div>
              <button className="mt-4 sm:mt-0 bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors duration-300 flex items-center">
                Message <span className="ml-2">▶</span>
              </button>
            </div>

            <div className="mb-6">
              <p className="text-lg text-gray-600">Contact:</p>
              <div className="flex flex-col sm:flex-row sm:space-x-8 mt-2 text-md">
                <p className="text-gray-500">Phone no: <span className="text-gray-700">{artistData.phone}</span></p>
                <p className="text-gray-500">Email: <span className="text-gray-700">{artistData.email}</span></p>
              </div>
            </div>

            <blockquote className="relative p-4 text-center text-xl italic text-gray-600 border-l-4 border-gray-300 bg-gray-50 rounded-r-lg">
              <p>"{artistData.quote}"</p>
            </blockquote>
          </div>
        </div>

        {/* --- Posts Section --- */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 relative inline-block">
              Posts
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-indigo-500 rounded-full"></span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artistData.artworks.map(art => (
              <ArtCard key={art.id} imageUrl={art.imageUrl} title={art.title} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-12 space-x-2">
            <button className="p-2 w-10 h-10 flex items-center justify-center rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors">{"<"}</button>
            <button className="p-2 w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-500 text-white">1</button>
            <button className="p-2 w-10 h-10 flex items-center justify-center rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors">{">"}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfilePage;
