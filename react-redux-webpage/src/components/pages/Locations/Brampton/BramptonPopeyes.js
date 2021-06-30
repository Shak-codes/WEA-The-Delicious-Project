import React, { useState, useEffect } from 'react';
import TorontoListItem from '../../../TorontoListItem';

function BramptonPopeyes(props) {

    // GQL API & QUERY INFORMATION
    const GQL_API = `https://wea-group33-graphql.herokuapp.com/`
    const GQL_QUERY = `
        query {
            location(id: 4) {
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
            setRestaurants([result.data.location.restaurants[0]]);
            //console.log([result.data.location.restaurants[1]]);
        });
    };

    // only runs once on component mount
    useEffect(() => {
        fetchRestaurants();
    }, []);

    return (
        <div id="brampton-popeyes-content">
            {restaurants && restaurants.map((restaurant) => (
                            <TorontoListItem key={restaurant.id} restaurant={restaurant} />))}
        </div>
    );
}

export default BramptonPopeyes;