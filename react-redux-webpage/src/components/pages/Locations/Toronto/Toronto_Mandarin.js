import React, { useState, useEffect } from 'react';
import RestaurantListItem from '../../../RestaurantListItem';

function TorontoMandarin(props) {

    // GQL API & QUERY INFORMATION
    const GQL_API = `https://wea-group33-graphql.herokuapp.com/`
    const GQL_QUERY = `
        query {
            location(id: 1) {
                restaurants {
                    id
                    name
                    hours
                    description
                    genre {
                        name
                    }
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
            setRestaurants([result.data.location.restaurants[2]]);
            console.log([result.data.location.restaurants[1]]);
        });
    };

    // only runs once on component mount
    useEffect(() => {
        fetchRestaurants();
    }, []);

    return (
        <div id="toronto-mandarin-content">
            {restaurants && restaurants.map((restaurant) => (
                            <RestaurantListItem key={restaurant.id} restaurant={restaurant} />))}
        </div>
    );
}

export default TorontoMandarin;