import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import cocktailsManager from "../../services/CocktailsManager";
import DrinkCard from "../../components/Cards/DrinkCard";
import "./CocktailsPage.scss";
import useDebounce from "../../components/Utils/Debounce";
import userManager from "../../services/UserManager";
import LoginModal from "../../components/Modals/LoginModal";

function CocktailsPage() {
    const [cocktailsList, setCocktailsList] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [originalList, setOriginalList] = useState([]);
    const debouncedSearchInput = useDebounce(searchInput, 300);
    const [addedCocktails, setAddedCocktails] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const user = userManager.getLoggedInUser();

    useEffect(() => {
        async function fetchDrinks() {
            if (location.state && location.state.cocktails) {
                setCocktailsList(location.state.cocktails);
                setOriginalList(location.state.cocktails);
            } else {
                const result = await cocktailsManager.getAllCocktails();
                setCocktailsList(result);
                setOriginalList(result);
            }
        }
        fetchDrinks();
        setAddedCocktails(user ? user.favourites || [] : []);
    }, [userManager.getLoggedInUser(), location.state]);

    useEffect(() => {
        const handleSearch = async () => {
            if (debouncedSearchInput.trim() === "") {
                setCocktailsList(originalList);
                return;
            }
            const result = await cocktailsManager.searchCocktails(debouncedSearchInput);
            setCocktailsList(result);
        };
        handleSearch();
    }, [debouncedSearchInput, originalList]);

    
    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleAdd = async (cocktail) => {
        if (!user) {
            const shouldNavigateToLogin = await LoginModal();
            if (shouldNavigateToLogin) {
                navigate("/login");
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
            setAddedCocktails((prevCocktails) => [...prevCocktails, cocktail]);
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
        <div className="cocktails-page">
            <div className="search-container">
                <input
                    type="text"
                    value={searchInput}
                    placeholder="Search for cocktail"
                    onChange={handleSearchInputChange}
                />
            </div>

            <div className="cocktails-list">
                {cocktailsList.map((cocktail) => (
                    <DrinkCard
                        cocktail={cocktail}
                        key={cocktail.id}
                        onAdd={handleAdd}
                        added={addedCocktails.some((c) => c.name === cocktail.name)}
                        onDetails={() => handleDetails(cocktail)}
                    />
                ))}
            </div>
        </div>
    );
}

export { CocktailsPage };
// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import cocktailsManager from "../../services/CocktailsManager";
// import DrinkCard from "../../components/Cards/DrinkCard";
// import "./CocktailsPage.scss";
// import useDebounce from "../../components/Utils/Debounce";
// import userManager from "../../services/UserManager";
// import LoginModal from "../../components/Modals/LoginModal";

// function CocktailsPage() {
//     const [cocktailsList, setCocktailsList] = useState([]);
//     const [searchInput, setSearchInput] = useState("");
//     const [originalList, setOriginalList] = useState([]);
//     const debouncedSearchInput = useDebounce(searchInput, 300);
//     const [addedCocktails, setAddedCocktails] = useState([]);
//     const navigate = useNavigate();
//     const location = useLocation();
//     const user = userManager.getLoggedInUser();

//     useEffect(() => {
//         async function fetchDrinks() {
//             // Check if location.state and location.state.cocktails exist
//             if (location.state && location.state.cocktails) {
//                 // Set the cocktails list to the passed state
//                 setCocktailsList(location.state.cocktails);
//                 setOriginalList(location.state.cocktails);
//             } else {
//                 const result = await cocktailsManager.getAllCocktails();
//                 setCocktailsList(result);
//                 setOriginalList(result);
//             }
//         }
//         fetchDrinks();
//         setAddedCocktails(user ? user.favourites || [] : []);
//     }, [userManager.getLoggedInUser(), location.state]);

//     useEffect(() => {
//         const handleSearch = async () => {
//             if (debouncedSearchInput.trim() === "") {
//                 setCocktailsList(originalList);
//                 return;
//             }
//             const result = await cocktailsManager.searchCocktails(debouncedSearchInput);
//             setCocktailsList(result);
//         };
//         handleSearch();
//     }, [debouncedSearchInput, originalList]);


//     const handleSearchInputChange = (event) => {
//         setSearchInput(event.target.value);
//     };

//     const handleAdd = async (cocktail) => {
//         if (!user) {
//             const shouldNavigateToLogin = await LoginModal();
//             if (shouldNavigateToLogin) {
//                 navigate("/login");
//             }
//             return;
//         }

//         if (user.hasCocktail(cocktail)) {
//             userManager.remove(cocktail);
//             setAddedCocktails((prevCocktails) =>
//                 prevCocktails.filter((a) => a.name !== cocktail.name)
//             );
//         } else {
//             userManager.add(cocktail);
//             setAddedCocktails((prevCocktails) => [...prevCocktails, cocktail]);
//         }
//     };

//     const handleDetails = async (cocktail) => {
//         try {
//             navigate(`/details/${cocktail.id}`);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <div className="cocktails-page">
//             <div className="search-container">
//                 <input
//                     type="text"
//                     value={searchInput}
//                     placeholder="Search for cocktail"
//                     onChange={handleSearchInputChange}
//                 />
//             </div>

//             <div className="cocktails-list">
//                 {cocktailsList.map((cocktail) => (
//                     <DrinkCard
//                         cocktail={cocktail}
//                         key={cocktail.id}
//                         onAdd={handleAdd}
//                         added={addedCocktails.some((c) => c.name === cocktail.name)}
//                         onDetails={() => handleDetails(cocktail)}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// }

// export { CocktailsPage };