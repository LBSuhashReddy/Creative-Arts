// File Path: src/components/common/SearchBar.jsx

import React from 'react';

// A helper SVG icon for the search input
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const SearchBar = ({ placeholder, value, onChange }) => {
  return (
    <div className="relative w-full max-w-lg mx-auto mb-12">
      <input
        type="text"
        placeholder={placeholder || 'Search...'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3 text-lg bg-white border-2 border-gray-200 rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
      />
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400">
        <SearchIcon />
      </div>
    </div>
  );
};

export default SearchBar;
