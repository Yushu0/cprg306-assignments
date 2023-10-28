"use client";

import React, { useState, useEffect } from "react";

const MealIdeas = ({ ingredient }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getMealIdeas(ingredient)
      .then((fetchedMeals) => {
        setMeals(fetchedMeals);
        setLoading(false);
      })
      .catch(() => {
        setError("Fetching meal failed!!");
        setLoading(false);
      });
  }, [ingredient]);

  const handleSelectMeal = (meal) => {
    setSelectedItem(meal);
  };

  const handleNotSelectMeal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="mb-4 flex items-center">
        <h2 className="text-2xl font-semibold text-white">
          Meal Ideas for {ingredient}
        </h2>
      </div>
      {loading && <p>Loading...</p>}
      {!loading && error && <p className="text-red-500">{error}</p>}
      {!loading && !error && meals.length === 0 && (
        <p>No meal ideas found for {ingredient}.</p>
      )}
      {!loading && !error && meals.length > 0 && (
        <div className="flex">
          <ul className="list-none p-0 mr-4">
            {meals.map((meal) => (
              <li
                key={meal.idMeal}
                className={`bg-dark-slate p-4 rounded-md shadow-md mb-4 border-white border hover:scale-105 transition-transform duration-300 cursor-pointer ${
                  meal === selectedItem ? "selected bg-stone-500" : ""
                }`}
                onClick={() => {
                  if (meal === selectedItem) {
                    handleNotSelectMeal();
                  } else {
                    handleSelectMeal(meal);
                  }
                }}
              >
                <div className="text-lg font-semibold text-white">
                  {meal.strMeal}
                </div>
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  width="75"
                  className="mt-2 mb-2 w-24 h-24 object-cover transition-transform transform scale-100 group-hover:scale-110 group-hover:opacity-100 opacity-80"
                />
                {meal === selectedItem && (
                  <div className="text-xs text-gray-400 mt-2">
                    <h4 className="font-semibold text-lg mb-2 text-white">
                      Ingredients for {selectedItem.strMeal}:
                    </h4>
                    <ul className="list-disc pl-5">
                      {[
                        selectedItem.strIngredient1,
                        selectedItem.strIngredient2,
                        selectedItem.strIngredient3,
                        selectedItem.strIngredient4,
                        selectedItem.strIngredient5,
                      ]
                        .filter((ingredient) => ingredient) // Filter empty ingredients
                        .map((ingredient, index) => (
                          <li key={index} className="text-white">
                            {ingredient}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MealIdeas;

async function getMealIdeas(ingredient) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    ); // fetch meals containing ingredient
    const data = await response.json(); // parse API response as JSON

    if (data.meals && data.meals.length > 0) {
      // check if meal have ingredient and map meal ID list of promise fetch meal
      const MealDetailPromise = data.meals.map((meal) =>
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`) // fetch detail for each meal
          .then((res) => res.json())
      );

      const MealDetails = await Promise.all(MealDetailPromise); // wait for all meal detail to resolve
      return MealDetails.map((detail) => detail.meals[0]); // get first meal detail for each response
    }
    return []; // return meal empty array if no meal found
    
/*
if (data.meals && data.meals.length > 0) {
  const MealDetailPromise = data.meals.map((meal) =>
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
      .then((res) => res.json())
  );

  const MealDetails = await Promise.all(MealDetailPromise);
  return MealDetails.map((detail) => detail.meals[0]);
}
// it doesn't work
return ['no meal ideas found'];
*/
    
  } catch (error) {
    console.error(
      "error!!!! there is an issue with the fetch operation: ",
      error.message
    );
    throw error; 
  }
}

