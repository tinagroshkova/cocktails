import React from 'react';
import "./DrinkCard.scss";

const DrinkCard = ({ cocktail, onAdd, added, onDetails }) => {
  const addButtonText = added ? "Remove" : "Add";


  return (
    <div className="card">
      <img src={cocktail.image} alt={cocktail.name} />
      <div className="card-body">
        <h5 className="card-title">{cocktail.name}</h5>
        <p className="card-text">Type: {cocktail.type}</p>
        <p className="card-text">Ingredients: {cocktail.ingredients && Array.isArray(cocktail.ingredients) ? cocktail.ingredients.join(", ") : "N/A"}</p>
        {onAdd && <button className={added ? "removeButton" : "addButton"} onClick={() => onAdd(cocktail)}>{addButtonText}</button>}
        {onDetails && <button className="detailsButton" onClick={() => onDetails(cocktail)}>Details</button>}
      </div>
    </div>
  );
};

export default DrinkCard;