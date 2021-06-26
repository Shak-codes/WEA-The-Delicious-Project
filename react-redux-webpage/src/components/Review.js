import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import DoctorsList from "./TorontoRestaurants";
import "./CSS/review.css";

function Review(props) {
    return (
        <Router>
            <div id="content">
                <h1 id="reviews">Reviews</h1>

                <navbar>
                    <Link to="/reviews/toronto"><button class="location-link" id="toronto"><span>Toronto</span></button></Link>
                    <Link to="/reviews/waterloo"><button class="location-link" id="waterloo"><span>Waterloo</span></button></Link>
                    <Link to="/reviews/ottawa"><button class="location-link" id="ottawa"><span>Ottawa</span></button></Link>
                    <Link to="/reviews/brampton"><button class="location-link" id="brampton"><span>Brampton</span></button></Link>
                </navbar>
                <Switch>
                    
                    <Route path="/reviews/toronto"><DoctorsList /></Route>
                    <Route path="/reviews/waterloo"><h1>waterloo</h1></Route>
                    <Route path="/reviews/ottawa"><h1>ottawa</h1></Route>
                    <Route path="/reviews/brampton"><h1>brampton</h1></Route>

                </Switch>
            </div>
        </Router>
    );
}

export default Review;
