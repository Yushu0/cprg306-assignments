"use client";

import Link from "next/link";
import { useState } from "react";

export default function NewItem({ onAddItem }) {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState("produce");

    const handleSubmit = (event) => {
        event.preventDefault();

        const item = {
            name,
            quantity,
            category,
        };
        
        onAddItem(item);

        setName("");
        setQuantity("1");
        setCategory("produce");
   
    
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };



    return (
        <main className="flex justify-center items-center w-full ">
            <div class="rounded-xl mx-auto w-5/6 bg-stone-300 p-10">
                     <button className="mt-4 py-2 px-4 bg-stone-400 hover:bg-stone-500 text-white rounded-lg">
                    <Link href="/">Home</Link>
                    </button> 
                <h1 className="text-center text-x1 text-black font-bold mb-8">Add New Items</h1>
                <form onSubmit={handleSubmit}>
                    <label className="block mb-10">
                        <input 
                        required onChange={handleNameChange} value={name}
                        type="text" placeholder="Item name" class="w-full mt-1 border-2 border-gray-300 p-2 rounded-lg font-sans">
                        </input>
                    </label>
                    <label className="flex items-center justify-between mb-4">
                        <input type="number" min="1" max="99" 
                        required onChange={handleQuantityChange} value={quantity}
                        className="w-20 ml-1 border-2 border-gray-300 p-2 rounded-lg font-sans"> 
                        </input> 
                        <select type="text"
                        required onChange={handleCategoryChange} value={category}
                        className="w-1/2 ml-10  border-2 border-gray-300 p-2 rounded-lg font-sans">
                        <option value disabled>Category</option>
                        <option value="Produce">Produce</option>
                        <option value="Dairy">Dairy</option>
                        <option value="Bakery">Bakery</option>
                        <option value="Meat">Meat</option>
                        <option value="Frozen Foods">Frozen Foods</option>
                        <option value="Canned Goods">Canned Goods</option>
                        <option value="Dry Goods">Dry Goods</option>
                        <option value="Beverages">Beverages</option>
                        <option value="Snacks">Snacks</option>
                        <option value="Household">Household</option>
                        <option value="Other">Other</option>
                        </select>  
                    </label>
                    <button type="submit" className="w-full mt-4 py-2 px-4 bg-stone-400 hover:bg-stone-500 text-white rounded-lg font-bold">Add</button> 
                </form>
            </div>
        </main>
    );

}