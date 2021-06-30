import React, { useState } from 'react';
import { createSlice } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import AddReview from './AddReview';
let reviewData = null;
let totalReviews = 0;


const TorontoListItem = ({ restaurant }) => {
    let len = 0;
    let total_rating = 0;
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
        total_rating = 0;
        // Store id variable
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
            setReviewList(result.data.restaurant.reviews[0].description);
            setRatingList(result.data.restaurant.reviews[0].rating);
            setReviewUser(result.data.restaurant.reviews[0].user);
            reviewData = result.data.restaurant.reviews;
            console.log(reviewData);
            len = reviewData.length;
            totalReviews = len;
            for (let i = 0; i < len; i += 1) {
                total_rating += reviewData[i].rating;
                //console.log(reviewData[i].rating);
            }
            //console.log(overall_rating);
            //console.log(overall_rating);
            setOverallRating((total_rating / len).toFixed(1));
        });
        console.log(total_rating);
        // Setting delete button
        setDeleteButton(<button className="hide-button" onClick={handleUnloadReviews}>Hide</button>);
        setNextReview(<button className="next-review-button" onClick={handleNextReview}>Next</button>);
        setAddReviewThreshold(<button className="add-review-threshold" onClick={showAddReviewContent}>Add Review</button>);
        //<AddReview onAddReview={(description) => handleAddReview(description, rating)}/>
        //<button className="add-review-threshold">Add Review</button>
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

    const handleNextReview = () => {
        if (current_idx === len) {
            current_idx = 0;
        }
        setReviewList(reviewData[current_idx].description);
        setRatingList(reviewData[current_idx].rating);
        setReviewUser(reviewData[current_idx].user);
        current_idx += 1;
    };

    const showAddReviewContent = () => {
        setAddReviewButton(<AddReview onClick={add} onAddReview={(description, rating) => handleAddReview(description, rating)}/>);
    }

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
    const { increment } = counterSlice.actions;
    let count = useSelector((state) => state.counter.value + totalReviews)
    const dispatch = useDispatch()
  
    function combine() {
      test();
    }
    const add = () => dispatch(increment());

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

export default TorontoListItem;
export const counterReducer = counterSlice.reducer;