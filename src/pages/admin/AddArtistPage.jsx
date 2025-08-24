/*
  File: src/pages/admin/AddArtistPage.jsx
  This is the corrected form that uses the correct admin-safe function.
*/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Step 1: Import the correct function directly from the service, NOT from useAuth.
import { createArtist } from '../../services/authService'; 

const AddArtistPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [domain, setDomain] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // Step 2: Call the admin-safe 'createArtist' function here.
      await createArtist(email, password, name, Number(graduationYear), domain);
      alert(`Artist ${name} created successfully!`);
      navigate('/admin'); // Redirect back to the admin dashboard
    } catch (err) {
      setError('Failed to create artist account. The email might already exist.');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Add New Artist</h2>
        {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* Form fields remain the same */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Temporary Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="graduationYear">
              Graduation Year
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="graduationYear" type="number" placeholder="e.g., 2025" value={graduationYear} onChange={(e) => setGraduationYear(e.target.value)} required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="domain">
              Primary Artistic Domain
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="domain" type="text" placeholder="e.g., Painting, Photography" value={domain} onChange={(e) => setDomain(e.target.value)} required
            />
          </div>
          <div className="flex items-center justify-between">
            <button disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full disabled:bg-indigo-300" type="submit">
              {loading ? 'Creating Account...' : 'Add Artist'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddArtistPage;
