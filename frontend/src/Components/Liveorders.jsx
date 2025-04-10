import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from "react-bootstrap";

const Liveorders = ({ fetchLiveOrdersTrigger }) => {
    const [liveOrders, setLiveOrders] = useState([]);

    useEffect(() => {
        fetchLiveOrders();
    }, [fetchLiveOrdersTrigger]); // Reload when trigger changes

    // Function to fetch live orders
    const fetchLiveOrders = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/orders/getAllFinalizedOrders");
            const data = await response.json();
            setLiveOrders(data);
        } catch (e) {
            console.error("Error fetching live orders:", e.message);
        }
    };

    // Function to complete an order
    const completeOrder = async (orderId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/orders/orderCompleted/${orderId}`, {
                method: "PUT",
            });

            if (response.ok) {
                fetchLiveOrders(); // Refresh live orders list after completion
            } else {
                alert(`Failed to complete order #${orderId}`);
            }
        } catch (error) {
            console.error("Error completing order:", error);
        }
    };

    return (
        <Row className="justify-content-center">
            {liveOrders.length > 0 ? (
                liveOrders.map((liveOrder) => (
                    <Col key={liveOrder.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                        <Card className="shadow-sm text-center p-3">
                            <Card.Body>
                                <Card.Title className="fw-bold">Order #{liveOrder.id}</Card.Title>

                                {/* Display order items */}
                                {liveOrder.orderItems.map((orderItem, index) => (
                                    <Card.Text key={index}>
                                        {orderItem.itemName} : {orderItem.quantity}
                                    </Card.Text>
                                ))}

                                <Card.Text className="text-primary fs-5">
                                    ₹{liveOrder.totalPrice}
                                </Card.Text>

                                <Button
                                    variant="success"
                                    className="w-100"
                                    onClick={() => completeOrder(liveOrder.id)}
                                >
                                    Complete Order
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))
            ) : (
                <p className="text-muted text-center mt-3">No live orders available</p>
            )}
        </Row>
    );
};

export default Liveorders;
