"use client";

import { useState } from "react";
import Item from "./item";
import itemData from "./items.json";

export default function ItemList() {
    let itemArray = itemData.map( (item) => ({...item}));

    let [filter, setFilter] = useState("all");
    let [sortBy, setSortBy] = useState("name");

    itemArray = itemArray.sort((a, b) => {
        if ( isNaN (parseInt(a[sortBy])) ) {
            let nameA = a[sortBy].toUpperCase();
            let nameB = b[sortBy].toUpperCase();

            if(nameA < nameB){
                return -1;
            }
            if (nameA > nameB){
                return 1;
            }
            return 0;
        }
        else 
        {
            return a[sortBy] - b[sortBy];
        }
    });

    if(filter !== "all") 
    {
        itemArray = itemArray.filter( (item) => item.category === filter );
    }


    return (
        <div>
            <div className="flex p-4 bg-stone-400 text-white">

                <div className="flex items-center space-x-4">
                    <label className="text-gray-200 font-medium">Sort by: </label>
                    <button 
                        className={`rounded-md px-3 py-1 transition duration-300 ease-in-out ${sortBy === "name" ? 'bg-stone-500' : 'bg-stone-400'}`}
                        onClick={() => setSortBy("name")}>
                                Name
                    </button>
                    <button 
                        className={`rounded-md px-3 py-1 transition duration-300 ease-in-out ${sortBy === "category" ? 'bg-stone-500' : 'bg-stone-400'}`}
                        onClick={() => setSortBy("category")}>
                                Category
                    </button>
                </div>

                <div className="flex-1 ml-5">
                    <label className="mr-2">Filter By:</label>
                    <select
                        className="border rounded-md px-2 py-1 focus:text-black"
                        onChange={ (e) => setFilter(e.target.value) }
                        value={filter}
                        >
                        <option value="all">All</option>
                        <option value="dairy">Dairy</option>
                        <option value="bakery">Bakery</option>
                        <option value="produce">Produce</option>
                        <option value="household">Household</option>
                        <option value="meat">Meat</option>
                        <option value="dry goods">Dry Goods</option>
                        <option value="canned goods">Canned Goods</option>
                    </select>
                </div>
            </div>
            
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5 p-5">
                {itemArray.map( (item) => (<Item item = {item} />))}
            </section>
        </div>
    );
}

