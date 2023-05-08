import { makeAPICall } from "../Utilities";

class Cocktail {
  constructor(id, name, image, ingredients, measures, instructions, glass, type) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.ingredients = ingredients;
    this.measures = measures;
    this.instructions = instructions;
    this.glass = glass;
    this.type = type;
  }
}

const COCKTAILS_URL = "https:thecocktaildb.com/api/json/v1/1/"

const mapCocktailDataToCocktailObject = (drink) => {
  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = drink[`strIngredient${i}`];
    if (ingredient !== null) {
      ingredients.push(ingredient);
    }
  }
  const measures = [];
  for (let i = 1; i <= 15; i++) {
    const measure = drink[`strMeasure${i}`];
    if (measure !== null) {
      measures.push(measure);
    }
  }
  return new Cocktail(drink.idDrink, drink.strDrink, drink.strDrinkThumb, ingredients, measures, drink.strInstructions, drink.strGlass, drink.strAlcoholic);
}

class CocktailsManager {
  constructor() {
    this.cocktailsList = [];
    this.cocktailsIds = [];
  }

  getCocktailOfTheDay = () => {
    return makeAPICall(COCKTAILS_URL + `/random.php`);
  }

  getAllCocktails = async () => {
    const data = await makeAPICall(COCKTAILS_URL + `search.php?f=t`);
    this.cocktailsList = data.drinks.map(mapCocktailDataToCocktailObject);
    return this.cocktailsList;
  };

  searchCocktails = async (keyword) => {
    const result = await makeAPICall(COCKTAILS_URL + `search.php?s=${keyword}`);
    const searchedCocktails = result.drinks.map(mapCocktailDataToCocktailObject);
    return searchedCocktails;
  }

  getDetails = async (cocktailId) => {
    const data = await makeAPICall(`${COCKTAILS_URL}lookup.php?i=${cocktailId}`);
    if (data.drinks && data.drinks.length > 0) {
      const detailed = mapCocktailDataToCocktailObject(data.drinks[0]);
      return detailed;
    } else {
      console.log('No details found for cocktailId:', cocktailId);
      return null;
    }
  }


  getCategories = () => {
    return makeAPICall(COCKTAILS_URL + `list.php?c=list`)
      .then(data => {
        return data.drinks;
      })
  }

  filterByCategory = (category) => {
    return makeAPICall(COCKTAILS_URL + `filter.php?c=${category}`)
      .then(data => {
        console.log(data.drinks)
        return data.drinks;

      })
  }

  getGlasses = () => {
    return makeAPICall(COCKTAILS_URL + `list.php?g=list`)
      .then(data => {
        return data.drinks;
      })
  }

  filterByGlass = (glass) => {
    return makeAPICall(COCKTAILS_URL + `filter.php?g=${glass}`)
      .then(data => {
        return data.drinks;

      })
  }

  getIngredients = () => {
    return makeAPICall(COCKTAILS_URL + `list.php?i=list`)
      .then(data => {
        return data.drinks;
      })
  }

  filterByIngredient = (ingredient) => {
    return makeAPICall(COCKTAILS_URL + `filter.php?i=${ingredient}`)
      .then(data => {
        return data.drinks;
      })

  }

  getType = () => {
    return makeAPICall(COCKTAILS_URL + `list.php?a=list`)
      .then(data => {
        return data.drinks;
      })
  }

  filterByType = (type) => {
    return makeAPICall(COCKTAILS_URL + `filter.php?a=${type}`)
      .then(data => {
        console.log(data);
        return data.drinks;
      })
  }
}


let cocktailsManager = new CocktailsManager();
export default cocktailsManager;