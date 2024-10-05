import React, { useState } from 'react';
import { categories } from './constant/category'; // Assuming you have categories in a separate file

const FilterCard = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="filter-card p-4 border rounded-lg shadow-lg mr-6">
      <h2 className="font-bold mb-4 text-[18px] text-gray-800 ">Filter by Category</h2>
      <ul className="space-y-2">
        {categories.map((category, idx) => (
          <li key={idx}>
            <button
              className={`py-2 px-4 rounded-lg w-full text-left text-[16px] text-gray-700 ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
              }`}
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterCard;
