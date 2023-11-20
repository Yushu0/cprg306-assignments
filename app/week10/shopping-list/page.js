"use client"

import React, { useState, useEffect } from "react";
import ItemList from "./item-list";
import NewItem from "./new-item";
import MealIdeas from "./meal-ideas";
import { getItems, addItem, deleteItem } from "../_services/shopping-list-service";

export default function Page() {

    // 1.initialize state variable items with itemsData
    let [items, setItems] = useState([]);

    //2. create event handler function handleAddItem
    const handleAddItem = async (newItem) => {
        try{
            //call addItem service function to add the new item to firestore
            const addedItem = await addItem(user.uid, newItem);

            //set the id of the new item to the returned id from addItem
            newItem.id = addedItem;

            // log the added item to check its structure
            console.log("Added item: ", addedItem);

            

            //create a copy of the items array
            let copy = [...items];


            //add the new item to the copy
            copy.push(addedItem);

            //set the state variable items to the new array
            setItems(copy);


        }catch(error){
            console.log("Error adding item: ",error);
        }
        
    };


    // add new state variable to hold the name of the selected item from the shopping list
    let [selectedItemName, setSelectedItemName] = useState("");

    // create event handler function handleItemSelect
    const handleItemSelect = (item) => {
        //display confirmation dialog for deletion
        console.log(user.uid, item.id)
        const confirmDelete = confirm(`Are you sure you want to delete ${item}?`);
        if(confirmDelete){
            try{
                //call deleteItem service function to delete the item from firestore
                deleteItem(user.uid, item.id);}

            catch(error){
                console.log("Error deleting item: ",error);
            }
            
        }

        // clean up the item name by removing size and emoji
        const cleanedItemName = item.split(',')[0].trim();
        setSelectedItemName(cleanedItemName);
    };


    const { user } = useUserAuth();


    // async function to call getItems using the user id
    // and set the items state variable to the result
    useEffect(() => {
        // check if user is logged in using useUserAuth hook
        //conditionally render the shopping page list  or 
        // redirect the user to the landing page if user object is null
        
        if (user === null) {
            window.location.href = "/";
            return null;
        }


        async function loadItems() {
            try{
                const items = await getItems(user.uid);
                setItems(items);
            } catch(error) {
                console.log("Error loading items: ",error);
            }
        }
        // call loadItems when component is mounted
        loadItems();
    }, [user]);

    

    return (
        <main>
            <div className="flex flex-col">
                <div className="flex flex-row">
                    <h1 className="flex flex-grow ml-3 text-5xl">
                        CPRG 306: Web Development 2 - Assignments
                    </h1>

                    <nav className="flex flex-shrink bg-custom-orange p-3 self-start">
                        <Link href="/" className="hover:text-custom-slate">Home</Link>
                    </nav>

                </div>

                <div className="mt-10 mb-1 ml-10">
                    <div className="flex flex-row">
                        <h1 className="flex-grow text-4xl ml-5 pt-20 mb-1 text-left align-middle">My Shopping List</h1>
                        <StudentInfo className="justify-end flex-shrink"></StudentInfo>
                    </div>
                </div>

                <div className="flex">
                    <div className="flex flex-row">
                        <div className="flex flex-col">
                            <NewItem 
                            className="flex flex-col"
                            onAddItem = {handleAddItem}></NewItem>

                            <ItemList 
                            className="flex flex-col; max-w-5xl"
                            items = {items}
                            onItemSelect={handleItemSelect}
                            ></ItemList>
                        </div>
                    </div>

                    <div className="flex flex-row">
                        <MealIdeas 
                        className=""
                        ingredient={selectedItemName}></MealIdeas>
                    </div>
                </div>

                </div>
        </main>
    );
  }