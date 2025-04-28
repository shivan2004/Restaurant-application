import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Form } from 'react-bootstrap';

const Items = () => {
    const [items, setItems] = useState([]);
    const [category, setCategory] = useState("BREAKFAST");

    const getToken = () => localStorage.getItem("token");

    const fetchItemsByCategory = async (selectedCategory) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/items/getItemsAvailableByCategory/${selectedCategory}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });
            const data = await response.json();
            setItems(data);
        } catch (e) {
            console.error("Error fetching items:", e.message);
        }
    };

    useEffect(() => {
        fetchItemsByCategory(category);
    }, [category]);

    return (
        <Container className="mt-5">
            <h2 className="text-center fw-bold mb-4">Available Items</h2>
            <Row className="mb-3">
                <Col md={4} className="mx-auto">
                    <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="BREAKFAST">Breakfast</option>
                        <option value="LUNCH">Lunch</option>
                        <option value="DINNER">Dinner</option>
                    </Form.Select>
                </Col>
            </Row>
            <Row>
                {items.length > 0 ? (
                    items.map((item) => (
                        <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                            <Card className="text-center p-3 shadow-sm">
                                <Card.Body>
                                    <Card.Title className="fw-bold">{item.item}</Card.Title>
                                    <Card.Text className="text-success fs-5">₹{item.price}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p className="text-center text-muted w-100">
                        No items available for {category}
                    </p>
                )}
            </Row>
        </Container>
    );
};

export default Items;
