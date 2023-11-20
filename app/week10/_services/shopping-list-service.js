import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";

export async function getItems(userId){
    /**
     * retrieves all items for a specific user from firestore
     * @param {string} userId
     * @returns {array} items
     */

    //query a sub collection named items under a document in the users collection 
    const queryUserItems = query(collection(db, "users", userId, "items"));
    const itemsSnapshot = await getDocs(queryUserItems); // get all documents from the query
    
    // for each document, add an object to the items array containing doc id and data
    // first create an empty array
    let items = [];

    // then loop through the snapshot and add an object to the array
    itemsSnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        items.push({id: doc.id, data: doc.data()});
    });

    // return the array
    return items;
}


export async function addItem(userId, item){
    /**
     * adds a new item to the items sub collection of a user
     * @returns {string} docRef.id
     * @param {string} userId
     * @param {object} item
     */

    // add a new document to the items collection
    const docRef = await addDoc(collection(db, "users", userId, "items"), item);
    console.log("Document written with ID: ", docRef.id);

    // return the docRef.id
    return docRef.id;

}


export async function deleteItem(userId, itemId){
    /**
     * deletes an item from the items sub collection of a user
     * @param {string} userId
     * @param {string} itemId
     */

    // delete a document from the items collection
    try{
        const docRef = doc(db, "users", userId, "items", itemId);
        await deleteDoc(docRef);
        console.log("Document with ID: ", itemId, " deleted");
    }catch(error){
        console.log("Error deleting item: ",error);
    }
}