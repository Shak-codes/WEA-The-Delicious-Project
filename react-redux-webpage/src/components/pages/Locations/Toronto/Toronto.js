import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import "../../../CSS/restaurants.css";
import "../../../CSS/selected-link.css";
import TorontoPopeyes from './Toronto_Popeyes';
import TorontoMandarin from './Toronto_Mandarin';
import TorontoScaramouche from './Toronto_Scaramouche';
import Login from '../../../Login';

function TorontoRestaurants(props) {
    // GQL API & QUERY INFORMATION
    const GQL_API = `https://wea-group33-graphql.herokuapp.com/`
    const GQL_QUERY = `
        query {
            location(id: 1) {
                restaurants {
                    id
                    name
                }
            }
        }`;

    // Variable to store restaurant data
    const [restaurants, setRestaurants] = useState(null);

    // Function to retrieve restaurant data from GraphQL
    const fetchRestaurants = () => {
        fetch(GQL_API, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: GQL_QUERY,
            }),
        })
        .then((response) => response.json())
        .then((result) => {
            setRestaurants(result.data.location.restaurants);
            console.log(result.data.location.restaurants);
        });
    };

    // only runs once on component mount
    useEffect(() => {
        fetchRestaurants();
    }, []);

    return (
        <div id="toronto-content">
            <div id="location-links">
                <nav>
                    <h1 id="title-review">Toronto</h1>
                    <Link to="/reviews/toronto"><button className="selected-link" id="toronto"><span>Toronto</span></button></Link>
                    <Link to="/reviews/waterloo"><button className="location-link" id="waterloo"><span>Waterloo</span></button></Link>
                    <Link to="/reviews/ottawa"><button className="location-link" id="ottawa"><span>Ottawa</span></button></Link>
                    <Link to="/reviews/brampton"><button className="location-link" id="brampton"><span>Brampton</span></button></Link>
                    <Login/>
                </nav>
            </div>


            <Router>

                <div id="container">

                    <div className="restaurant-list">
                        <h2 id="restaurant-header">Restaurants</h2>

                        <div id="restaurant-links">
                            <Link to="/reviews/toronto/scaramouche"><h3 className="restaurant-link">{restaurants && restaurants[0].name}</h3></Link>
                            <Link to="/reviews/toronto/popeyes"><h3 className="restaurant-link">{restaurants && restaurants[1].name}</h3></Link>
                            <Link to="/reviews/toronto/mandarin"><h3 className="restaurant-link">{restaurants && restaurants[2].name}</h3></Link>
                        </div>
                    </div>

                    <Switch>
                        <Route path="/reviews/toronto/scaramouche"><TorontoScaramouche/></Route>
                        <Route path="/reviews/toronto/popeyes"><TorontoPopeyes/></Route>
                        <Route path="/reviews/toronto/mandarin"><TorontoMandarin/></Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default TorontoRestaurants;