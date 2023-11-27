import React from "react";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer} from "react-router-bootstrap";

import logo from "./images/icons8-universe-96.png"; 

import './styles/NavigationBar.css';

const NavigationBar = () => {
    return (
        <Navbar className="custom-navbar" expand="lg">
            <LinkContainer to="/">
                <Navbar.Brand>
                    <img src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="logo"
                    />
                </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <LinkContainer to="/experiment">
                        <Nav.Link>Experimento</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/theory">
                        <Nav.Link>Teoria</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/instructions">
                        <Nav.Link>Instrucciones</Nav.Link>
                    </LinkContainer>
                    <NavDropdown title="Referencias" id="basic-nav-dropdown" className="custom-nav-dropdown">
                        <LinkContainer to="/resources/reading">
                            <NavDropdown.Item>Lecturas</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/resources/videos">
                            <NavDropdown.Item>Videos</NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>
                    <LinkContainer to="Contacto">
                        <Nav.Link>Contacto</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationBar;