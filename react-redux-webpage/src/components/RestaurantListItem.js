import React, { useState } from 'react';
import { createSlice } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import AddReview from './AddReview';
let reviewData = null;
let totalReviews = 0;


const RestaurantListItem = ({ restaurant }) => {
    // Variable for length of review array
    let len = 0;

    // Variable for the sum of review ratings
    let total_rating = 0;

    // Variable for the index of the current review
    let current_idx = 1;
    const GQL_API = `https://wea-group33-graphql.herokuapp.com/`;
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

    // Variable to store review descriptions
    const [reviewList, setReviewList] = useState(null);

    // Variable to store ratings
    const [ratingList, setRatingList] = useState(null);

    // Variable to store the button to hide review descriptions
    const [deleteButton, setDeleteButton] = useState(null);

    // Variable to store the button to display add review content
    const [addReviewThreshold, setAddReviewThreshold] = useState(null);

    // Variable to add review
    const [addReviewButton, setAddReviewButton] = useState(null);

    // Variable to store the button to hide review descriptions
    const [nextReview, setNextReview] = useState(null);

    // Variable to store overall rating
    const [overallRating, setOverallRating] = useState(null);

    // Variable to store review user
    const [reviewUser, setReviewUser] = useState(null);


    // Function to get total reviews
    const reviewTotal = () => {
        const variables = { id: restaurant.id };

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
            totalReviews = result.data.restaurant.reviews.length;
        })
    };

    // Function to load review properties
    const handleLoadReviews = () => {

        // Reset total_rating to 0 to recount the total rating
        total_rating = 0;

        // Store id variables
        const variables = { id: restaurant.id };

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

            // Set variable data to the first review in the array
            setReviewList(result.data.restaurant.reviews[0].description);
            setRatingList(result.data.restaurant.reviews[0].rating);
            setReviewUser(result.data.restaurant.reviews[0].user);

            // Set review dta to the entire array of reviews
            reviewData = result.data.restaurant.reviews;

            // Set the length of the reviewData array
            len = reviewData.length;

            // Set the total reviews to the value of len
            totalReviews = len;

            // Update the sum of all ratings
            for (let i = 0; i < len; i += 1) {
                total_rating += reviewData[i].rating;
            }

            // Set variable for sum of all ratings
            setOverallRating((total_rating / len).toFixed(1));
        });

        // Set buttons for hiding a review, going to the next review, and showing the add review textbox
        setDeleteButton(<button className="hide-button" onClick={handleUnloadReviews}>Hide</button>);
        setNextReview(<button className="next-review-button" onClick={handleNextReview}>Next</button>);
        setAddReviewThreshold(<button className="add-review-threshold" onClick={showAddReviewContent}>Add Review</button>);
    };

    // Function to unload review properties
    const handleUnloadReviews = () => {
        setReviewList();
        setRatingList();
        setDeleteButton();
        setNextReview();
        setAddReviewThreshold();
        setAddReviewButton();
    };

    // Function to pull the data for the next review
    const handleNextReview = () => {
        if (current_idx === len) {
            current_idx = 0;
        }

        // Setting the data of the next review into variables
        setReviewList(reviewData[current_idx].description);
        setRatingList(reviewData[current_idx].rating);
        setReviewUser(reviewData[current_idx].user);
        current_idx += 1;
    };

    // Function to show parameters for adding a review
    const showAddReviewContent = () => {
        setAddReviewButton(<AddReview onClick={add} onAddReview={addReview}/>);
    }

    // Function for triggering the addition of a review, and to hide the add review content afterwards
    const addReview = (description, rating) => {
        hideRev();
        handleAddReview(description, rating);
    }

    // Function for adding a review
    const handleAddReview = (description, rating) => {
        const newReview = {id: len + 1, user: localStorage.username, description: description, rating: parseInt(rating) };
        const newReviewList = [...reviewData, newReview];
        reviewData = newReviewList;
        len += 1;
        totalReviews = len;
        console.log(total_rating);
        total_rating += newReview.rating;
        let newOverallRating = (total_rating / len);
        setOverallRating(newOverallRating.toFixed(1));

        fetch(`https://wea-group33-restapi.herokuapp.com/api/v1/restaurants/${restaurant.id}/reviews`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: localStorage.username,
                description: description,
                rating: parseInt(rating),
            }),
        })
        .then((response) => response.json())
        .then((result) => console.log(result));
    };


    reviewTotal();

    // Setting the function increment for the redux component
    const { increment } = counterSlice.actions;

    // Setting the value of count for the redux component
    let count = useSelector((state) => state.counter.value + totalReviews);

    // Setting dispatch for the redux component
    const dispatch = useDispatch()

    // Setting the function add for the redux component
    const add = () => dispatch(increment());

    // Setting the function to hide add review details
    const hideRev = () => {
        setAddReviewButton();
    }

    // Returned content
    return ( 
        <div className="restaurant-data">
            <div className="general-data">
                <h2 id="nested-restaurant-name">{restaurant.name}</h2>
                <i id="restaurant-description">{restaurant.description}</i><br/>
                <h4 id="restaurant-hours">{restaurant.genre.name} | Hours: {restaurant.hours}</h4>
                <button id="load-reviews" onClick={handleLoadReviews}>Load Reviews</button>
            </div>
            
            <div className="review-description">
            {reviewList &&
                    <div className="restaurant-ratings">
                        <h2 className="overall-rating">
                            Total reviews: {count} | Overall rating: {overallRating}/5<br/>
                        </h2>
                        <h3 className="individual-rating">
                            <span className="review-user">Review by user: {reviewUser} - Rating: {ratingList}</span><br/>{reviewList}
                        </h3>
                        
                    </div>
                }
            </div>
            {deleteButton}
            {nextReview}
            {addReviewThreshold}
            {addReviewButton}
                
        </div>
    );
};

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: totalReviews,
    },
    reducers: {
        increment: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1
        },
    },
})

export default RestaurantListItem;
export const counterReducer = counterSlice.reducer;