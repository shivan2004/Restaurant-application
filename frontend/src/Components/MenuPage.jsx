import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from "axios";

const MenuPage = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [newItem, setNewItem] = useState({ item: '', price: '', category: 'BREAKFAST' });
    const [selectedCategory, setSelectedCategory] = useState('BREAKFAST');

    useEffect(() => {
        fetchMenuItems(selectedCategory);
    }, [selectedCategory]);

    const fetchMenuItems = async (category) => {
        try {
            const response = await fetch(`http://localhost:8080/api/items/getAllItemsByCategory/${category}`);
            const data = await response.json();
            setMenuItems(data);
        } catch (e) {
            console.error("Error fetching menu items:", e.message);
        }
    };

    // const toggleAvailability = async (itemId) => {
    //     try {
    //         await fetch(`http://localhost:8080/api/items/toggleAvailability/${itemId}`, {
    //             method: "PUT",
    //         });
    //         setMenuItems(prevItems =>
    //             prevItems.map(item =>
    //                 item.id === itemId ? { ...item, isAvailable: !item.isAvailable } : item
    //             )
    //         );
    //     } catch (e) {
    //         console.error("Error toggling availability:", e.message);
    //     }
    // };

    const toggleAvailability = async (itemId) => {
        // eslint-disable-next-line no-unused-vars
        const response = await axios.put(`http://localhost:8080/api/items/toggleAvailability/${itemId}`)
            .then(
                setMenuItems(prevItems =>
                    prevItems.map(item =>
                        item.id === itemId ? { ...item, isAvailable: !item.isAvailable } : item
                    )
                )
            )

    }



    //
    // useEffect(() => {
    //     axios.get(`/api/products/show/${id}`)
    //         .then(response => {
    //             setProduct(response.data);
    //             setLoading(false);
    //         })
    //         .catch(() => {
    //             setError("Failed to fetch product details.");
    //             setLoading(false);
    //         });
    // }, [id]);


    const addNewItem = async () => {
        if (!newItem.item || !newItem.price) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            await fetch("http://localhost:8080/api/items/postItem", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...newItem, category: newItem.category.toUpperCase(), isAvailable: true }),
            });
            setNewItem({ item: '', price: '', category: 'BREAKFAST' });
            fetchMenuItems(selectedCategory);
        } catch (e) {
            console.error("Error adding new item:", e.message);
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4 fw-bold">Menu</h2>
            <Row className="mb-3">
                <Col md={4}>
                    <Form.Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="BREAKFAST">Breakfast</option>
                        <option value="LUNCH">Lunch</option>
                        <option value="DINNER">Dinner</option>
                    </Form.Select>
                </Col>
            </Row>
            <Row>
                {/* Menu Items */}
                <Col md={8}>
                    <Row>
                        {menuItems.length > 0 ? (
                            menuItems.map((item) => (
                                <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                                    <Card className="p-3 text-center">
                                        <Card.Body>
                                            <Card.Title className="fw-bold">{item.item}</Card.Title>
                                            <Card.Text className="fs-5 text-success">₹{item.price}</Card.Text>
                                            <Form.Check
                                                type="switch"
                                                id={`availability-switch-${item.id}`}
                                                label={item.isAvailable ? "Available" : "Unavailable"}
                                                checked={item.isAvailable}
                                                onChange={() => toggleAvailability(item.id)}
                                            />
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <p className="text-center w-100">No items were added for {selectedCategory}</p>
                        )}
                    </Row>
                </Col>

                {/* Add New Item */}
                <Col md={4}>
                    <Card className="p-4">
                        <h4 className="text-center fw-bold">Add New Item</h4>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Item Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter item name"
                                    value={newItem.item}
                                    onChange={(e) => setNewItem({ ...newItem, item: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Price (₹)</Form.Label>
                                <Form.Control
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    placeholder="Enter price"
                                    value={newItem.price}
                                    onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) || '' })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Form.Select
                                    value={newItem.category}
                                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                                >
                                    <option value="BREAKFAST">Breakfast</option>
                                    <option value="LUNCH">Lunch</option>
                                    <option value="DINNER">Dinner</option>
                                </Form.Select>
                            </Form.Group>
                            <Button variant="success" className="w-100" onClick={addNewItem}>
                                Add Item
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default MenuPage;