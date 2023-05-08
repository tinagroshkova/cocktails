import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState, useEffect } from "react";
import { NavLink, Route, Routes, Navigate, useNavigate, useLocation } from "react-router-dom";
import LoginForm from "../../pages/LoginAndRegister/LoginForm";
import RegistrationForm from "../../pages/LoginAndRegister/RegistrationForm";
import "./NavBar.scss";
import { CocktailsPage } from '../../pages/CocktailsPage/CocktailsPage';
import FavouritesPage from '../../pages/FavouritesPage/FavouritesPage';
import DetailsPage from "../../pages/DetailsPage/DetailsPage";
import FiltersPage from '../../pages/FiltersPage/FiltersPage';
import userManager from '../../services/UserManager';
import ConfirmModal from '../Modals/ConfirmModal';


function NavBar() {

  const loggedInUser = userManager.getLoggedInUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    const isConfirmed = await ConfirmModal("Logout", "Are you sure you want to logout?");
    if (isConfirmed) {
      userManager.logoutUser().then(() => {
        navigate("/login");
      });
    }
  };

  return (
    <>
      <Navbar bg="dark" expand="lg" className="navbar">
        <NavLink to="/cocktails">Cocktails</NavLink>
        <NavLink to="/favourites">My favourites</NavLink>
        <NavLink to="/filters">Filters</NavLink>
        {loggedInUser ? (
          <button className="logoutButton" onClick={handleLogout}>Logout</button>
        ) : null}
      </Navbar>

      <Routes>
        <Route index element={<Navigate to={"/cocktails"} />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/cocktails" element={<CocktailsPage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="/filters" element={<FiltersPage />} />
        <Route path="/details/:id" element={<DetailsPage />} />

        <Route path="*" element={
          <>
            <div className="errorPage">
              <div className="text">
                <h1> ERROR 404 </h1>
                <h2>Go <a href="/cocktails" >home!</a> You're Drunk! </h2>
              </div>
            </div>
          </>
        } />
      </Routes>
    </>
  );
}

export default NavBar;