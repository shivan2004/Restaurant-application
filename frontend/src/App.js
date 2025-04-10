import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./Components/Dashboard";
import NavigationBar from "./Components/Navbar/Navbar";
import CompletedOrders from "./Components/CompletedOrders";
import MenuPage from "./Components/MenuPage";
import LiveOrdersPage from "./Components/LiveOrdersPage";
import Footer from './Components/Footer/Footer'; // Import Footer Component
import Ratings from './Components/Ratings/Ratings'; // Import Ratings Component
import Reviews from './Components/Ratings/Reviews'


const App = () => {
    return (
        <Router>
            <div className="d-flex flex-column min-vh-100">
                <NavigationBar />
                <div className="flex-fill">
                    <Routes>
                        {/*<Route path="/" element= {<Tables />}/>*/}
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/menu" element={<MenuPage />} />
                        <Route path="/completed-orders" element={<CompletedOrders />} />
                        <Route path="/live-orders" element={<LiveOrdersPage />} />
                        <Route path="/ratings" element={<Ratings />} />
                        <Route path="/reviews" element={<Reviews />} /> {/* New route for Reviews */}
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
};

export default App;