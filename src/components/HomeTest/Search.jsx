import { Search } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchComp = ({ isOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null; // Don't render the search bar if it's closed

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Handle the Enter key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="fixed top-[6.5em] right-2 w-[50vw] h-[12em] flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full text-xl flex">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown} // Listen for Enter key press
          placeholder="Search for products..."
          className="w-full px-4 py-4 border rounded-lg text-[18px]"
        />
        <button
          onClick={handleSearch}
          className="mt-2 text-black py-4 px-4 rounded-lg"
        >
          <Search />
        </button>
      </div>
    </div>
  );
};

export default SearchComp;
