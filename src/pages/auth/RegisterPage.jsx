import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom'; // We'll use this to redirect

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [domain, setDomain] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(email, password, name, Number(graduationYear), domain);
      navigate('/'); // Redirect to homepage on successful registration
    } catch (err) {
      setError('Failed to create an account. The email might already be in use.');
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create Your Account</h2>
        {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
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
              Password
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
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </div>
        </form>
         <p className="text-center text-gray-500 text-sm mt-6">
            Already have an account? <a href="/login" className="font-bold text-indigo-600 hover:text-indigo-800">Login here</a>.
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
