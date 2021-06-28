import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import "../CSS/restaurants.css";

function Review(props) {
    return (
        <div id="location-links">
            <nav>
                <h1 id="title-review">Reviews</h1>
                <Link to="/reviews/toronto"><button className="location-link" id="toronto"><span>Toronto</span></button></Link>
                <Link to="/reviews/waterloo"><button className="location-link" id="waterloo"><span>Waterloo</span></button></Link>
                <Link to="/reviews/ottawa"><button className="location-link" id="ottawa"><span>Ottawa</span></button></Link>
                <Link to="/reviews/brampton"><button className="location-link" id="brampton"><span>Brampton</span></button></Link>
            </nav>
        </div>
    );
}

export default Review;