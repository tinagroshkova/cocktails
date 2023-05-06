import { makeAPICall } from "../Utilities";

class Cocktail {
  constructor(id, name, image, ingredients, type) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.ingredients = ingredients;
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
  return new Cocktail(drink.idDrink, drink.strDrink, drink.strDrinkThumb, ingredients, drink.strAlcoholic);
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

  search = async (keyword) => {
    const result = await makeAPICall(COCKTAILS_URL + `search.php?s=${keyword}`);
    const searchedCocktails = result.drinks.map(mapCocktailDataToCocktailObject);
    return searchedCocktails;
  }

  getDetails = (cocktailId) => {
    return makeAPICall(COCKTAILS_URL + `lookup.php?i=${cocktailId}`)
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