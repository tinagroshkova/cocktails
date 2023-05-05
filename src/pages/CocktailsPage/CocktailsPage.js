import React, { useState, useEffect } from "react";
import cocktailsManager from "../../services/CocktailsManager";
import DrinkCard from "../../components/Cards/DrinkCard";

function CocktailsPage() {
    const [drinks, setDrinks] = useState([]);

    useEffect(() => {
        async function fetchDrinks() {
            const result = await cocktailsManager.getAllCocktails();
            console.log("Result:", result);
            setDrinks(result.drinks);
        }
        fetchDrinks();
    }, []);

    console.log("Drinks:", drinks);

    return (
        <div className="drink-list">
            {drinks.map((drink) => (
                <DrinkCard key={drink.idDrink} drink={drink} />
            ))}
        </div>
    );
}
export default CocktailsPage;