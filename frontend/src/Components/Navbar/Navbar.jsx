import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const decodeJWT = (token) => {
    if (!token) return null;
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64).split('').map(c =>
                '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            ).join('')
        );
        return JSON.parse(jsonPayload);
    } catch (err) {
        console.error("JWT Decode Error:", err);
        return null;
    }
};

const NavigationBar = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Track route changes
    const [role, setRole] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const decoded = decodeJWT(token);
        setRole(decoded?.role || null);
    }, [location.pathname]); // Re-run when route changes

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Restaurant Management</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {role ? (
                            <>
                                {role === "ADMIN" && (
                                    <>
                                        <Nav.Link as={Link} to="/dashboard">Items</Nav.Link>
                                        <Nav.Link as={Link} to="/menu">Menu</Nav.Link>
                                        <Nav.Link as={Link} to="/completed-orders">Completed Orders</Nav.Link>
                                        <Nav.Link as={Link} to="/live-orders">Live Orders</Nav.Link>
                                        <Nav.Link as={Link} to="/ratings">Ratings</Nav.Link>
                                        <Nav.Link as={Link} to="/reviews">Reviews</Nav.Link>
                                    </>
                                )}
                                {role === "KITCHEN" && (
                                    <Nav.Link as={Link} to="/live-orders">Live Orders</Nav.Link>
                                )}
                                {role === "CUSTOMER" && (
                                    <>
                                        <Nav.Link as={Link} to="/dashboard">Items</Nav.Link>
                                        <Nav.Link as={Link} to="/completed-orders">Completed Orders</Nav.Link>
                                        <Nav.Link as={Link} to="/live-orders">Live Orders</Nav.Link>
                                        <Nav.Link as={Link} to="/ratings">Ratings</Nav.Link>
                                        <Nav.Link as={Link} to="/reviews">Reviews</Nav.Link>
                                    </>
                                )}
                                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                            </>
                        ) : (
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
