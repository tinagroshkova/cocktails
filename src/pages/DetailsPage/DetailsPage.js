import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import cocktailsManager from "../../services/CocktailsManager";
import userManager from "../../services/UserManager";
import DetailsCard from "../../components/Cards/DetailsCard";
import LoginModal from "../../components/Modals/LoginModal";
import "./DetailsPage.scss";

function DetailsPage() {
    const user = userManager.getLoggedInUser();
    const [addedCocktails, setAddedCocktails] = useState([]);
    const navigate = useNavigate();
    const [cocktail, setCocktail] = useState(null);
    const { id } = useParams();

    const handleAdd = async (cocktail) => {
        if (!user) {
            const shouldNavigateToLogin = await LoginModal();
            if (shouldNavigateToLogin) {
                navigate('/login');
            }
            return;
        }

        if (user.hasCocktail(cocktail)) {
            userManager.remove(cocktail);
            setAddedCocktails((prevCocktails) =>
                prevCocktails.filter((a) => a.name !== cocktail.name)
            );
        } else {
            userManager.add(cocktail);
            setAddedCocktails((prevCocktails) => [
                ...prevCocktails,
                cocktail,
            ]);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const cocktail = await cocktailsManager.getDetails(id);
            setCocktail(cocktail);
        };
        fetchData();
    }, [id]);

    return (
        <div className="details-page">
            {cocktail ? (
                <div className="detailed-card">
                    <DetailsCard
                        cocktail={cocktail}
                        onAdd={handleAdd}
                        added={addedCocktails.some((c) => c.name === cocktail.name)}
                    />
                </div>
            ) : (
                <p>Loading cocktail details...</p>
            )}
        </div>
    );
}

export default DetailsPage;