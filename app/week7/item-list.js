"use client";
import React, { useState } from 'react';
import Item from './item';

export default function ItemList({ items, onItemSelect }) {

    const handleItemClick = (item) => {
        if (onItemSelect) {
            onItemSelect(item);
        }
    };


    const [sortBy, setSortBy] = useState('name');

    const sortedItems = [...items].sort((a, b) => {
        if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortBy === 'category') {
            return a.category.localeCompare(b.category);
        } else {
            return 0;
        }
    });

    const GroupSortItems = (items) => {

        const groupedItems = items.reduce((acc, item) => {
            (acc[item.category] = acc[item.category] || []).push(item);
            return acc;
        }, {});

        Object.keys(groupedItems).forEach(category => {
            groupedItems[category].sort((a, b) => a.name.localeCompare(b.name));
        });

        return groupedItems;
    };


    const groupedItems = GroupSortItems(items);

    return (
        <div>
          <div className="flex rounded-lg items-center mb-5 px-8 py-5 bg-stone-300 ">
            <span className="text-lg font-bold text-black mr-4">Sort By: </span>
            <button
              onClick={() => setSortBy('name')}
              className={`flex items-center text-lg px-4 py-2 mr-2 font-bold text-white rounded-xl hover:bg-stone-400 ${sortBy === 'name' ? 'bg-stone-400' : 'bg-stone-500'}`}
            >
              Name
            </button>
            <button
              onClick={() => setSortBy('category')}
              className={`flex items-center text-lg px-4 py-2 font-bold text-white rounded-xl hover:bg-stone-400  ${sortBy === 'category' ? 'bg-stone-400' : 'bg-stone-500'}`}
            >
              Category
            </button>
          </div>
          
            {
                sortBy === 'groupCategory' ? (
                    Object.entries(GroupSortItems(sortedItems))
                        .sort(([a], [b]) => a.localeCompare(b))
                        .map(([category, items]) => (
                            <div key={category} className="mb-4">
                                <h2 className="font-bold text-lg capitalize mb-2">{category}</h2>
                                <ul>
                                    {items.map((item) => (
                                        <li key={item.id} 
                                            onClick={() => handleItemClick(item)}
                                            className="mb-2">
                                            <Item
                                                name={item.name}
                                                quantity={item.quantity}
                                                category={item.category}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))
                ) : (
                    
                    <ul>
                        {sortedItems.map((item) => (
                            <li key={item.id} 
                                onClick={() => handleItemClick(item)}
                                className="mb-2">
                                <Item
                                    name={item.name}
                                    quantity={item.quantity}
                                    category={item.category}
                                />
                            </li>
                        ))}
                    </ul>
                )
            }
          
        </div>
    );
}
