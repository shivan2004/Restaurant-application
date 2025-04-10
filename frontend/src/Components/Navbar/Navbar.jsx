import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Order Management</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">Live</Nav.Link>
                        <Nav.Link as={Link} to="/menu">Menu</Nav.Link>
                        <Nav.Link as={Link} to="/completed-orders">Completed Orders</Nav.Link>
                        <Nav.Link as={Link} to="/live-orders">Live Orders</Nav.Link>
                        <Nav.Link as={Link} to="/ratings">Ratings</Nav.Link>
                        <Nav.Link as={Link} to="/reviews">Reviews</Nav.Link> {/* Link to Reviews page */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;