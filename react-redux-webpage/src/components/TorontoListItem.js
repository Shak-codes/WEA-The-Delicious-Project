import React, { useState } from 'react';
let reviewData = null;
let len = 0;
let current_idx = 1;

const TorontoListItem = ({ restaurant }) => {
    const GQL_API = `http://localhost:3030/`;
    const GQL_QUERY = `
        query($id: ID!) {
            restaurant(id: $id) {
                id
                reviews {
                    rating
                    description
                }
            }
        }`;

    // Variable to store review descriptions
    const [reviewList, setReviewList] = useState(null);

    // Variable to store ratings
    const [ratingList, setRatingList] = useState(null);

    // Variable to store the button to hide review descriptions
    const [deleteButton, setDeleteButton] = useState(null);

    // Variable to store the button to hide review descriptions
    const [nextReview, setNextReview] = useState(null);

    // Variable to store overall rating
    const [overallRating, setOverallRating] = useState(null);

    // Function to load review properties
    const handleLoadReviews = () => {
        let overall_rating = 0;
        // Store id variable
        const variables = { id: restaurant.id };
        console.log('// TODO: Load doctors with GraphQL API...');

        // Setting review text
        fetch(GQL_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: GQL_QUERY,
                variables,
            }),
        })
        .then((response) => response.json())
        .then((result) => {
            setReviewList(result.data.restaurant.reviews[0].description);
            setRatingList(result.data.restaurant.reviews[0].rating);
            reviewData = result.data.restaurant.reviews;
            len = reviewData.length;
            console.log(len);
            for (let i = 0; i < len; i += 1) {
                overall_rating += reviewData[i].rating;
                console.log(reviewData[i].rating);
            }
            console.log(overall_rating);
            overall_rating /= len;
            console.log(overall_rating);
            setOverallRating(overall_rating);
        });

        // Setting delete button
        setDeleteButton(<button className="hide-button" onClick={handleUnloadReviews}>Hide</button>);
        setNextReview(<button className="next-review-button" onClick={handleNextReview}>Next</button>);
    };

    // Function to unload review properties
    const handleUnloadReviews = () => {
        setReviewList();
        setRatingList();
        setDeleteButton();
        setNextReview();
    };

    const handleNextReview = () => {
        if (current_idx === len) {
            current_idx = 0;
        }
        setReviewList(reviewData[current_idx].description);
        setRatingList(reviewData[current_idx].rating);
        current_idx += 1;
    }

    return ( 
        <div className="restaurants">
            <h3 className="restaurant-name">
                <a href='#' onClick={handleLoadReviews}>
                    {restaurant.name}
                </a>
            </h3>
            
            <h5 className="review-container">
                {reviewList &&
                    <div>
                        <h4>
                            Overall rating: {overallRating}/5<br/>
                        </h4>
                        Rating: {ratingList}<br/>{reviewList}
                    </div>
                }
            </h5>
            {deleteButton}
            {nextReview}
                
        </div>
    );
};

export default TorontoListItem;

/*
{reviewList &&
                    reviewList.map((restaurant) => ( 
                    <div className="review-description" key={restaurant.id}>Rating: {restaurant.rating}/5<br/>
                    {restaurant.description}</div>
                ))}
                */