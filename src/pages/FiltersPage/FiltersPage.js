import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import cocktailsManager from "../../services/CocktailsManager";
import "./FiltersPage.scss";

function FiltersPage() {
    const [categories, setCategories] = useState([]);
    const [glasses, setGlasses] = useState([]);
    const [drinkTypes, setDrinkTypes] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const fetchedCategories = await cocktailsManager.getCategories();
            const fetchedGlasses = await cocktailsManager.getGlasses();
            const fetchedDrinkTypes = await cocktailsManager.getType();
            const fetchedIngredients = await cocktailsManager.getIngredients();
            setCategories(fetchedCategories);
            setGlasses(fetchedGlasses);
            setDrinkTypes(fetchedDrinkTypes);
            setIngredients(fetchedIngredients);
        };
        fetchData();
    }, []);


    const handleCategoryClick = (category) => {
        cocktailsManager.filterByCategory(category)
            .then(async (filteredCocktails) => {
                const cocktailsWithDetails = await Promise.all(
                    filteredCocktails.map(cocktail => cocktailsManager.getDetails(cocktail.idDrink))
                );

                navigate(`/cocktails?category=${category}`, { state: { cocktails: cocktailsWithDetails } });
            });
    };

    const handleGlassClick = (glass) => {
        cocktailsManager.filterByGlass(glass)
            .then(async (filteredCocktails) => {
                const cocktailsWithDetails = await Promise.all(
                    filteredCocktails.map(cocktail => cocktailsManager.getDetails(cocktail.idDrink))
                );

                navigate(`/cocktails?glass=${glass}`, { state: { cocktails: cocktailsWithDetails } });
            });
    };

    const handleDrinkTypeClick = (type) => {
        cocktailsManager.filterByType(type)
            .then(async (filteredCocktails) => {
                const cocktailsWithDetails = await Promise.all(
                    filteredCocktails.map(cocktail => cocktailsManager.getDetails(cocktail.idDrink))
                );

                navigate(`/cocktails?type=${type}`, { state: { cocktails: cocktailsWithDetails } });
            });
    };

    const handleIngredientClick = (ingredient) => {
        cocktailsManager.filterByIngredient(ingredient)
            .then(async (filteredCocktails) => {
                const cocktailsWithDetails = await Promise.all(
                    filteredCocktails.map(cocktail => cocktailsManager.getDetails(cocktail.idDrink))
                );

                navigate(`/cocktails?ingredient=${ingredient}`, { state: { cocktails: cocktailsWithDetails } });
            });
    };

    return (

        <div className="filters-page">
            <h2>Ingredients</h2>
            <div className="filter ingredients">
                {ingredients.map(ingredient => (
                    <div
                        className="ingredient-item"
                        key={ingredient.strIngredient1}
                        onClick={() => handleIngredientClick(ingredient.strIngredient1)}
                    >
                        <img
                            src={`https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png`}
                            alt={ingredient.strIngredient1}
                        />
                        <p>{ingredient.strIngredient1}</p>
                    </div>
                ))}
            </div>
            <h2>Categories</h2>
            <div className="categories">
                <ul>
                    {categories.map(category => (
                        <li key={category.strCategory} onClick={() => handleCategoryClick(category.strCategory)}>
                            {category.strCategory}
                        </li>
                    ))}
                </ul>
            </div>

            <h2>Glasses</h2>
            <div className="glasses">
                <div className="glasses-container">
                    {glasses.map((glass, index) => (
                        <div key={glass.strGlass} className="item" onClick={() => handleGlassClick(glass.strGlass)}>
                            {glass.strGlass}
                        </div>
                    ))}
                </div>
            </div>
            <h2>Drink Types</h2>
            <div className="drink-types">
                <ul>
                    {drinkTypes.map(type => (
                        <li key={type.strAlcoholic} onClick={() => handleDrinkTypeClick(type.strAlcoholic)}>
                            {type.strAlcoholic}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default FiltersPage;
