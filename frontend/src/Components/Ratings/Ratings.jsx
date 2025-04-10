import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';

const Ratings = () => {
    const [rating, setRating] = useState(0); // Rating selected by user (1-5)
    const [comment, setComment] = useState('');
    const [averageRating, setAverageRating] = useState(0);

    // Fetch the current average rating when the component mounts
    useEffect(() => {
        const fetchAverageRating = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/rating/getStars');
                const data = await response.json();
                setAverageRating(data); // Set the average rating (double value)
            } catch (error) {
                console.error('Error fetching average rating:', error);
            }
        };

        fetchAverageRating();
    }, []);

    // Handle rating form submission
    const handleRatingSubmit = async () => {
        const ratingData = {
            review: comment,  // Include the comment
            rating: rating,   // Send the rating value (1-5)
        };

        try {
            const response = await fetch('http://localhost:8080/api/rating/postRating', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ratingData),
            });

            if (response.ok) {
                setComment('');
                setRating(0); // Reset rating after submission
                // Re-fetch average rating after new rating submission
                const fetchAverageRating = async () => {
                    const response = await fetch('http://localhost:8080/api/rating/getStars');
                    const data = await response.json();
                    setAverageRating(data); // Update average rating
                };

                fetchAverageRating();
            } else {
                console.error('Failed to submit rating');
            }
        } catch (error) {
            console.error('Error submitting rating:', error);
        }
    };

    // Handle star click to set rating
    const handleStarClick = (value) => {
        setRating(value);
    };

    // Function to render stars with partial fill based on decimal value
    const renderStars = (ratingValue) => {
        const stars = [];
        const fullStars = Math.floor(ratingValue); // Full stars
        const remainder = ratingValue - fullStars; // Partial fill (decimal)
        const starSize = '2rem'; // Size of the star

        // Render full stars
        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <span key={i} style={{ color: 'gold', fontSize: starSize }}>&#9733;</span> // Full Star
            );
        }

        // Render partial star
        if (remainder > 0) {
            const starStyle = {
                fontSize: starSize,
                background: `linear-gradient(to right, gold ${remainder * 100}%, gray ${remainder * 100}%)`,
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                display: 'inline-block',
            };
            stars.push(
                <span key={fullStars} style={starStyle}>&#9733;</span> // Partial Star
            );
        }

        // Render empty stars
        for (let i = fullStars + (remainder > 0 ? 1 : 0); i < 5; i++) {
            stars.push(
                <span key={i} style={{ color: 'gray', fontSize: starSize }}>&#9733;</span> // Empty Star
            );
        }

        return stars;
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 fw-bold">Submit Your Rating</h2>

            {/* Average Rating Display */}
            <Card className="mb-4">
                <Card.Body>
                    <h4>Average Rating: {averageRating.toFixed(2)}</h4> {/* Show average with 2 decimals */}
                    <div className="star-rating mb-3">
                        {renderStars(averageRating)} {/* Render stars based on average rating */}
                    </div>
                </Card.Body>
            </Card>

            {/* Rating Form with Stars */}
            <Row>
                <Col md={6}>
                    <Form>
                        <Form.Group controlId="formRating">
                            <Form.Label>Rating (1 to 5)</Form.Label>
                            {/* Render 5 stars for user to select rating */}
                            <div className="star-rating mb-3">
                                {[1, 2, 3, 4, 5].map((starValue) => (
                                    <span
                                        key={starValue}
                                        onClick={() => handleStarClick(starValue)}
                                        style={{
                                            cursor: 'pointer',
                                            fontSize: '2rem',
                                            color: starValue <= rating ? 'gold' : 'gray',
                                        }}
                                    >
                                        &#9733; {/* Star Character */}
                                    </span>
                                ))}
                            </div>
                        </Form.Group>

                        <Form.Group controlId="formComment" className="mt-3">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" className="mt-3" onClick={handleRatingSubmit}>
                            Submit Rating
                        </Button>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

export default Ratings;