"use client"

import React, { useState } from "react";
import ItemList from "./item-list";
import NewItem from "./new-item";
import itemsData from "./items.json";


function Page() {
    let itemsArray = itemsData.map(
        (item) => ({ ...item })
    );

    const [items, setItems] = useState(itemsArray);

    const handleAddItem = (NewItem) => {
        setItems([...items, NewItem]);
    }

    return (
        <main>
            <NewItem onAddItem={handleAddItem} />
            <ItemList items={items} />
        </main>
    );
}

export default Page;
