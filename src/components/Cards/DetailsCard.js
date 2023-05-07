import React from 'react';
import { useParams } from "react-router-dom";


const DetailsCard = ({ cocktail, onAdd, added, onDetails }) => {
    // const { cocktailId } = useParams();
  const addButtonText = added ? "Remove" : "Add";


  return (
    <div className="card">
      <img src={cocktail.image} alt={cocktail.name} />
        <p className="card-text">Type: {cocktail.type}</p>
      <div className="card-body">
        <h5 className="card-title">{cocktail.name}</h5>
        <h5 className="instructions">How to make that cocktail: {cocktail.instructions}</h5>
        <p className="card-text">Ingredients: {cocktail.ingredients.join(", ")}</p>
        <p className="card-text">Measures: {cocktail.measures.join(", ")}</p>
        {onAdd && <button className={added ? "removeButton" : "addButton"} onClick={() => onAdd(cocktail)}>{addButtonText}</button>}
        {onDetails && <button className="detailsButton" onClick={() => onDetails(cocktail)}>Details</button>}
      </div>
    </div>
  );
};

export default DetailsCard;