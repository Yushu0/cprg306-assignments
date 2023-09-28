import React from 'react';

const Item = ({ name, quantity, category }) => {
  return (
    <li className="bg-white p-4 shadow-md mb-4 rounded-md">
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <p className="text-gray-700 mb-1">Category: {category}</p>
      <p className="text-gray-700">Quantity: {quantity}</p>
    </li>
  );
};

export default Item;
