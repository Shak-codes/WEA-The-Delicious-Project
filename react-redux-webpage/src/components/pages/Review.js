import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import "../CSS/restaurants.css";
import Login from '../Login';

function Review(props) {
    let welcomeMessage;
    let user = localStorage.getItem('username');
    if (user === null || user === "") {
        welcomeMessage = <h2 className="welcome-message">Welcome new user, Please select a location to view restaurants or login with your username</h2>;
    }
    else {
        welcomeMessage = <h2 className="welcome-message">Welcome {user}, Please select a location to view restaurants</h2>;
    }

    return (
        <div id="location-links">
            <nav>
                <h1 id="title-review">Reviews</h1>
                <Link to="/reviews/toronto"><button className="location-link" id="toronto"><span>Toronto</span></button></Link>
                <Link to="/reviews/waterloo"><button className="location-link" id="waterloo"><span>Waterloo</span></button></Link>
                <Link to="/reviews/ottawa"><button className="location-link" id="ottawa"><span>Ottawa</span></button></Link>
                <Link to="/reviews/brampton"><button className="location-link" id="brampton"><span>Brampton</span></button></Link>
                <Login/>
            </nav>
            {welcomeMessage}
        </div>
    );
}

export default Review;
