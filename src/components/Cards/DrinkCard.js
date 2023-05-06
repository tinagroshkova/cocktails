import React from 'react';
import "./DrinkCard.scss";

const DrinkCard = ({ cocktail }) => {
  return (
    <div className="card">
      <img src={cocktail.image} alt={cocktail.name} />
      <div className="card-body">
        <h5 className="card-title">{cocktail.name}</h5>
        <p className="card-text">Type: {cocktail.type}</p>
        <p className="card-text">Ingredients: {cocktail.ingredients.join(", ")}</p>
        <button className="btn btn-primary">Add</button>
        <button className="btn btn-secondary">Details</button>
      </div>
    </div>
  );
};

export default DrinkCard;