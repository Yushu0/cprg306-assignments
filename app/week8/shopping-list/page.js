"use client"

import React, { useState } from "react";
import ItemList from "./item-list";
import NewItem from "./new-item";
import itemsData from "./items.json";
import MealIdeas from "./meal-ideas";

export default function Page() {

    let itemsArray = itemsData.map(
        (item) => ({ ...item })
    );

    const [items, setItems] = useState(itemsArray);

    const handleAddItem = (NewItem) => {
        setItems([...items, NewItem]);

    }

    const [selectedItemName, setSelectedItemName] = useState(null);
    const handleItemSelect = (selectedItem) => {
      const cleanedName = selectedItem.name.split(',')[0].trim().replace(/[^\w\s]/gi, "");
      setSelectedItemName(cleanedName);
    };
    
    return (
        <main>
            <div className="bg-black">
            <NewItem onAddItem={handleAddItem} />
            </div>   
        <div className="flex">
            <div className="bg-black p-5">
            <ItemList items={items} onItemSelect={handleItemSelect}/>
            </div>
            <div className="bg-black p-5 shadow-md w-full ">
                <MealIdeas ingredient={selectedItemName} />
            </div>
        </div>
        </main>
    );
}