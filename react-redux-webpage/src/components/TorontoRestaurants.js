import React, { useState, useEffect } from 'react';
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
        .then((result) => setRestaurants(result.data.location.restaurants));
    };

    // only runs once on component mount
    useEffect(() => {
        fetchRestaurants();
    }, []);

    return (
        <>
            <h2 className="restaurant-title">Restaurants in Toronto</h2>
            <div className="all-restaurants">
                {restaurants &&
                    restaurants.map((restaurant) => ( 
                        <TorontoListItem key={restaurant.id} restaurant={restaurant} />
                ))}
            </div>
        </>
    );
};

export default TorontoRestaurantsList;
/*import React, { Component } from 'react';

export default class TorontoRestaurants extends Component {
    constructor(props) {
        super(props);
        this.state = { restaurants: [] };
    }

    componentDidMount() {
        fetch(
        'http://localhost:3000/api/v1/restaurants')
        .then((response) => response.json())
        .then((result) => {
            this.setState({ restaurants: result })
            console.log(result);
        });
    }
    
    renderDoctors() {
        return this.state.restaurants.map((restaurant) => <div>{restaurant.name}</div>);
    }

    render() {
        return (
            <>
                <h2>Restaurants</h2>
                {this.renderDoctors()}
            </>
            );
        }
    }
*/