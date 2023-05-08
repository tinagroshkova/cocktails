import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState, useEffect } from "react";
import { NavLink, Route, Routes, Navigate, useNavigate } from "react-router-dom";
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
        <NavLink to="/cocktails" activeclassname="activeLink">Cocktails</NavLink>
        <NavLink to="/favourites" activeclassname="activeLink">My favourites</NavLink>
        <NavLink to="/filters" activeclassname="activeLink">Filters</NavLink>
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

        {/* <Route path="*" element={<><h2 style={{ color: "white", display: "flex", justifyContent: "center" }}>Page not found. You've taken a wrong turn, but you found a hedgehog.</h2>
          <div className="errorImage">
            <img width={650} src={errorpic} alt="errorImage"></img></div></>} /> */}
      </Routes>
    </>
  );
}

export default NavBar;