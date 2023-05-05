import React from 'react';
import "./DrinkCard.scss";

const DrinkCard = ({ drink }) => {
  const { idDrink, strDrink, strDrinkAlternate, strTags, strVideo, strDrinkThumb } = drink;

  return (
    <div className="card">
      <img src={strDrinkThumb} alt={strDrink} />
      <div className="card-body">
        <h5 className="card-title">{strDrink}</h5>
        <p className="card-text">Type: {strTags}</p>
        <p className="card-text">Ingredients: [list of ingredients]</p>
        <button className="btn btn-primary">Add</button>
        <button className="btn btn-secondary">Details</button>
      </div>
    </div>
  );
};

export default DrinkCard;