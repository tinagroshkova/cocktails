import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userManager from "../../services/UserManager";
import DrinkCard from "../../components/Cards/DrinkCard";
import LoginModal from "../../components/Modals/LoginModal";
import ConfirmModal from "../../components/Modals/ConfirmModal";
import "./FavouritesPage.scss";


function FavouritesPage() {
    const [user, setUser] = useState(userManager.getLoggedInUser());
    const [addedCocktails, setAddedCocktails] = useState([]);
    const navigate = useNavigate();
    const loggedInUser = userManager.getLoggedInUser();

    useEffect(() => {
        const checkLoggedInUser = async () => {
          if (!loggedInUser) {
            const isLoggedIn = await LoginModal();
            if (!isLoggedIn) {
              navigate("/cocktails");
              return;
            }
            navigate("/login");
          }
          setUser({ ...loggedInUser });
        };
        checkLoggedInUser();
      }, []);


    useEffect(() => {
        const fetchData = async () => {
            const favourites = userManager.getUserFavourites(user);
            setAddedCocktails(favourites);
        };
        fetchData();
    }, [user]);

    const handleRemoveActivity = async (cocktail) => {
        const shouldRemove = await ConfirmModal(
          "Do you really want to remove this cocktail?",
          "This action cannot be undone."
        );
      
        if (shouldRemove) {
          userManager.remove(cocktail);
          setAddedCocktails((prevState) =>
            prevState.filter((c) => c.name !== cocktail.name)
          );
        }
      };
    
    const handleDetails = async (cocktail) => {
        try {
            navigate(`/details/${cocktail.id}`);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="favourites-page">
            {addedCocktails.map((cocktail) => (
                <DrinkCard
                    cocktail={cocktail}
                    key={cocktail.id}
                    onAdd={handleRemoveActivity}
                    added={addedCocktails.some((c) => c.name === cocktail.name)}
                    onDetails={() => handleDetails(cocktail)} />
            ))}

        </div>
    );
}

export default FavouritesPage;