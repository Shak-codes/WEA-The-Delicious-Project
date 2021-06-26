import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import TorontoRestaurantsList from "./TorontoRestaurants";
import "./CSS/review.css";

function Review(props) {
    return (
        <Router>
            <div id="content">
                

                <nav>
                    <h1 id="reviews">Reviews</h1>
                    <Link to="/reviews/toronto"><button className="location-link" id="toronto"><span>Toronto</span></button></Link>
                    <Link to="/reviews/waterloo"><button className="location-link" id="waterloo"><span>Waterloo</span></button></Link>
                    <Link to="/reviews/ottawa"><button className="location-link" id="ottawa"><span>Ottawa</span></button></Link>
                    <Link to="/reviews/brampton"><button className="location-link" id="brampton"><span>Brampton</span></button></Link>
                </nav>
                <Switch>
                    
                    <Route path="/reviews/toronto"><TorontoRestaurantsList /></Route>
                    <Route path="/reviews/waterloo"><h1>waterloo</h1></Route>
                    <Route path="/reviews/ottawa"><h1>ottawa</h1></Route>
                    <Route path="/reviews/brampton"><h1>brampton</h1></Route>

                </Switch>
            </div>
        </Router>
    );
}

export default Review;
