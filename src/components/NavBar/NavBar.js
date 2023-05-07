import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LoginForm from "../../pages/LoginAndRegister/LoginForm";
import RegistrationForm from "../../pages/LoginAndRegister/RegistrationForm";
import { Link, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import "./NavBar.scss";
import { CocktailsPage } from '../../pages/CocktailsPage/CocktailsPage';
import FavouritesPage from '../../pages/FavouritesPage/FavouritesPage';
// import ConfirmModal from "../../components/Modals/ConfirmModal";
import DetailsPage from "../../pages/DetailsPage/DetailsPage";


function NavBar() {
  return (
    <>
      <Navbar bg="dark" expand="lg" className="navbar">
        <Container fluid>
          <Navbar.Brand><Link to="/cocktails">Cocktails</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Link to="/favourites" className="nav-link">My favourites</Link>

              <NavDropdown title="Filters" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Categories</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Glasses</NavDropdown.Item>
                <NavDropdown.Item href="#action5">Ingredients</NavDropdown.Item>
                <NavDropdown.Item href="#action5">Drink type</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route index element={<Navigate to={"/cocktails"} />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/cocktails" element={<CocktailsPage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="/details/:id" element={<DetailsPage />} />

        {/* <Route path="*" element={<><h2 style={{ color: "white", display: "flex", justifyContent: "center" }}>Page not found. You've taken a wrong turn, but you found a hedgehog.</h2>
          <div className="errorImage">
            <img width={650} src={errorpic} alt="errorImage"></img></div></>} /> */}
      </Routes>
    </>
  );
}

export default NavBar;