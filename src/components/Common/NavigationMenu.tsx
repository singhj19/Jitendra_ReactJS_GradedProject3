import React from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
// import './temp.css'

const NavigationMenu = () => {

    // const getNavLinkClass = (isActive: boolean) => {
    //     return isActive ? "nav-link-active nav-link" : "nav-link";
    // };

    return (

        <Navbar expand="lg" className="bg-body-tertiary navbar-border">
            <Container fluid>
                {/* <Navbar.Brand href="#">Navbar scroll</Navbar.Brand> */}
                {/* <Navbar.Toggle aria-controls="navbarScroll" /> */}
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                    >
                        <NavLink
                            to="/InTheater" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>
                            Movies In Theaters
                        </NavLink>

                        <NavLink to="/ComingSoon" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>Coming Soon</NavLink>
                        <NavLink to="/TopRatedIndian" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>Top Rated Indian</NavLink>
                        <NavLink to="/TopRatedMovies" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>Top Rated Movies</NavLink>
                        <NavLink to="/Favourites" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>Favourites</NavLink>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}

export default NavigationMenu;