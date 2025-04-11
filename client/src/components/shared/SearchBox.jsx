import React from "react";

const SearchBox = ({ onSearch }) => {
  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search movies..."
      className="input input-bordered w-64"
      onChange={handleInputChange}
    />
  );
};

export default SearchBox;