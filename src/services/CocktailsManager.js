// class Cocktail {
//     constructor(name, image, ingredients, type){
//         this.name = name;
//         this.image = image,
//         this.ingredients = ingredients;
//         this.type = type;
//     }
// }

import { makeAPICall } from "../Utilities";

const COCKTAILS_URL = "https:thecocktaildb.com/api/json/v1/1/"

class CocktailsManager {
    constructor() {
        this.cocktailsList = [];
        this.cocktailsIds = [];
    }

    getCocktailOfTheDay = () => {
        return makeAPICall(COCKTAILS_URL + `/random.php`);
    }


    getAllCocktails = () => {
        return makeAPICall(COCKTAILS_URL + `search.php?f=t`)
            .then(data => {
                // console.log(data);
                this.cocktailsList = data;
                console.log(this.cocktailsList)
                return this.cocktailsList;
            })
    }

    search = (keyword) => {
        return makeAPICall(COCKTAILS_URL + `search.php?s=${keyword}`);
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