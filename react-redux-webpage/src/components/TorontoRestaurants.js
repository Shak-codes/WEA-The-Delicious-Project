import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import TorontoListItem from './TorontoListItem.js';
import "./CSS/restaurants.css";

const TorontoRestaurantsList = () => {
    const GQL_API = `http://localhost:3030/`
    const GQL_QUERY = `
        query {
            location(id: 1) {
                restaurants {
                    id
                    name
                }
            }
        }`;

    const [restaurants, setRestaurants] = useState(null);
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
        <>
            <h2 className="restaurant-title">Toronto</h2>
            <div className="all-restaurants">
                <Link to="/reviews/toronto/scaramouche"><h3>{restaurants && restaurants[0].name}</h3></Link>
                <Link to="/reviews/toronto/popeyes"><h3>{restaurants && restaurants[1].name}</h3></Link>
                <Link to="/reviews/toronto/mandarin"><h3>{restaurants && restaurants[2].name}</h3></Link>
            </div>
        </>
    );
};

export default TorontoRestaurantsList;