import React, { useState, useEffect } from 'react';

const SearchBox = ({ onSearch, placeholder }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Debounce the search to prevent excessive filtering
    const handler = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm, onSearch]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={searchTerm}
      onChange={handleChange}
      className="input border-1 focus:border-1 focus:border-primary focus:outline-none w-64"
    />
  );
};

export default SearchBox;