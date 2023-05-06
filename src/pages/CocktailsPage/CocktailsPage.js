import React, { useState, useEffect } from "react";
import cocktailsManager from "../../services/CocktailsManager";
import DrinkCard from "../../components/Cards/DrinkCard";
import "./CocktailsPage.scss";
import useDebounce from "../../components/Utils/Debounce";


function CocktailsPage() {
  const [cocktailsList, setCocktailsList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [originalList, setOriginalList] = useState([]);
  const debouncedSearchInput = useDebounce(searchInput, 300);

  useEffect(() => {
    async function fetchDrinks() {
      const result = await cocktailsManager.getAllCocktails();
      setCocktailsList(result);
      setOriginalList(result);
    }
    fetchDrinks();
  }, []);

  async function handleSearchInputChange(event) {
    const keyword = event.target.value;
    setSearchInput(keyword);
    if (keyword.trim() === "") {
      setCocktailsList(originalList);
      return;
    }
    const result = await cocktailsManager.search(keyword);
    setCocktailsList(result);
  }

  return (
    <div className="cocktails-page">
      <div className="search-container">
        <input
          type="text"
          value={searchInput}
          placeholder="Search for cocktail"
          onChange={handleSearchInputChange}
        />
      </div>

      <div className="cocktails-list">
        {cocktailsList
          .map((cocktail) => (
            <DrinkCard cocktail={cocktail} key={cocktail.id} />
          ))}
      </div>
    </div>
  );
}

export { CocktailsPage };

