import React from 'react';
import { useParams } from 'react-router-dom';
import ArtCard from '../components/specific/ArtCard'; // Step 1: Import the reusable ArtCard

// --- Placeholder Database ---
// This object simulates your database, mapping IDs to artist data.
const allArtistsData = {
  '1': { name: 'Suhas Kumar', domain: 'Digital Art', phone: '111-222-3333', email: 'suhas@email.com', quote: 'Art is a line around your thoughts.', avatarUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop', artworks: [ { id: 1, title: 'Crimson Bloom', imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800' }] },
  '2': { name: 'Priya Sharma', domain: 'Photography', phone: '444-555-6666', email: 'priya@email.com', quote: 'Capturing moments from today, creating memories for tomorrow.', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop', artworks: [ { id: 2, title: 'Azure Depths', imageUrl: 'https://images.unsplash.com/photo-1552353289-97f993ea0846?w=800' }] },
  '3': { name: 'Raj Patel', domain: 'Sculpture', phone: '777-888-9999', email: 'raj@email.com', quote: 'Giving form to ideas, one piece at a time.', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop', artworks: [ { id: 3, title: 'Golden Solitude', imageUrl: 'https://images.unsplash.com/photo-1531913423379-61763315a05f?w=800' }] },
  '4': { name: 'Aisha Khan', designation: 'Alumni', domain: 'Illustrator', phone: '123-456-7890', email: 'aisha@email.com', quote: 'Drawing worlds with a single stroke.', avatarUrl: 'https://i.pravatar.cc/150?u=aisha', artworks: [] },
  '5': { name: 'Leo Rivera', designation: 'Member', domain: 'Sculptor', phone: '098-765-4321', email: 'leo@email.com', quote: 'Finding the art within the stone.', avatarUrl: 'https://i.pravatar.cc/150?u=leo', artworks: [] },
};


// --- ArtistPage Component ---
const ArtistProfilePage = () => {
  const { artistId } = useParams();
  const artistData = allArtistsData[artistId];

  if (!artistData) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-gray-700">Artist Not Found</h2>
        <p className="text-gray-500 mt-2">Please check the URL and try again.</p>
      </div>
    );
  }

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
          
          {/* Step 2: Use the imported ArtCard component */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artistData.artworks.map(art => (
              <ArtCard 
                key={art.id} 
                imageUrl={art.imageUrl} 
                title={art.title}
                // Pass other props if needed by the advanced card
                artistName={artistData.name}
                artistAvatarUrl={artistData.avatarUrl}
                onViewDetails={() => alert(`Viewing details for ${art.title}`)}
                onAddToWishlist={() => alert(`${art.title} added to wishlist!`)}
                onInquire={() => alert(`Inquiring about ${art.title}`)}
              />
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
