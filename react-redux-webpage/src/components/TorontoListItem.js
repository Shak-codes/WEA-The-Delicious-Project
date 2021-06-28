import React, { useState } from 'react';
let reviewData = null;
let len = 0;
let current_idx = 1;

const TorontoListItem = ({ restaurant }) => {
    const GQL_API = `http://localhost:3030/`;
    const GQL_QUERY = `
        query ($id: ID!) {
            restaurant(id: $id) {
                id
                hours
                description
                reviews {
                    rating
                    description
                    user
                }
            }
        }`;

    // Variable to store hours
    const [hours, setHours] = useState(null);

    // Variable to store description
    const [description, setDescription] = useState(null);

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

    // Variable to store review user
    const [reviewUser, setReviewUser] = useState(null);


    // Function to load review properties
    const handleLoadReviews = () => {
        let overall_rating = 0;
        // Store id variable
        const variables = { id: restaurant.id };
        console.log(restaurant.id);

        // Setting review text
        fetch(GQL_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: GQL_QUERY,
                variables
            }),
        })
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            setReviewList(result.data.restaurant.reviews[0].description);
            setRatingList(result.data.restaurant.reviews[0].rating);
            setReviewUser(result.data.restaurant.reviews[0].user);
            reviewData = result.data.restaurant.reviews;
            len = reviewData.length;
            console.log(len);
            for (let i = 0; i < len; i += 1) {
                overall_rating += reviewData[i].rating;
                //console.log(reviewData[i].rating);
            }
            //console.log(overall_rating);
            overall_rating /= len;
            //console.log(overall_rating);
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
        setReviewUser(reviewData[current_idx].user);
        current_idx += 1;
    }

    return ( 
        <div className="restaurant-data">
            <div className="general-data">
                <h2 id="nested-restaurant-name">{restaurant.name}</h2>
                <i id="restaurant-description">{restaurant.description}</i><br/>
                <h4 id="restaurant-hours"><span id="genre-name">{restaurant.genre.name}</span> | Hours: {restaurant.hours}</h4>
                <button id="load-reviews" onClick={handleLoadReviews}>Load Reviews</button>
            </div>
            
            <div className="review-description">
            {reviewList &&
                    <div className="restaurant-ratings">
                        <h2 className="overall-rating">
                            Overall rating: {overallRating}/5<br/>
                        </h2>
                        <h3 className="individual-rating">
                            Review by user: {reviewUser} - Rating: {ratingList}<br/>{reviewList}
                        </h3>
                        
                    </div>
                }
            </div>
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

                /*            <h5 className="review-container">
                {reviewList &&
                    <div>
                        <h4>
                            Overall rating: {overallRating}/5<br/>
                        </h4>
                        Rating: {ratingList}<br/>{reviewList}
                    </div>
                }
            </h5>*/