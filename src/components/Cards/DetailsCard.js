import React from 'react';


const DetailsCard = ({ cocktail, onAdd, added, onDetails }) => {
  const addButtonText = added ? "Remove" : "Add";
  return (
    <div className="details-card">
      <div className="left">
        <img src={cocktail.image} alt={cocktail.name} />
      </div>
      <div className="card-body">
        <h3 className="card-title">{cocktail.name}</h3>
        <p className="card-text">Type: {cocktail.type}</p>
        <h5 className="instructions">How to make that cocktail: </h5>
        <p className="card-text">{cocktail.instructions}</p>
        <h5 className="card-text">Ingredients:</h5>
        <p className="card-text">{cocktail.ingredients.map((ingredient, index) => `${ingredient}: ${cocktail.measures[index]}`).join(", ")}</p>
        {onAdd && <button className={added ? "removeButton" : "addButton"} onClick={() => onAdd(cocktail)}>{addButtonText}</button>}
        {onDetails && <button className="detailsButton" onClick={() => onDetails(cocktail)}>Details</button>}
      </div>
    </div>
  );
};

export default DetailsCard;