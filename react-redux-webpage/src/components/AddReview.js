import React, { useState } from 'react';

// Variable for check if a valid review description has been filled out
let valid_description = false;

// Variable for check if a valid rating has been filled out
let valid_rating = false;

// Variable for check if a valid username is being used
let valid_user = false;

// Variable for check if a review can be submitted
let notValid = true;

const AddReview = (props) => {

    // Variable for review description
    const [reviewDescription, setReviewDescription] = useState('');

    // Variable for rating
    const [rating, setRating] = useState('');

    // Function to 
    const handleChangeReview = (event) => {
        setReviewDescription(event.target.value);
        if (event.target.value === '') {
            valid_description = false;
        } else {
            valid_description = true;
        }
        if (localStorage.username === '') {
            console.log("username blank:");
            valid_user = false;
        } else valid_user = true;
        checkValidReview();
    };

    // Function for adding review on button click
    const handleAddReview = () => {
        props.onAddReview(reviewDescription, rating);
    }

    // Function for setting the rating to the input
    const handleChangeRating = (event) => {
        setRating(event.target.value);
        if (event.target.value === '') {
            valid_rating = false;
        } else {
            valid_rating = true;
        }
        if (localStorage.username === '') {
            console.log("username blank:");
            valid_user = false;
        } else valid_user = true;
        checkValidReview();
    };

    // Function for checking if a review is valid
    const checkValidReview = () => {
        if (valid_description === true && valid_rating === true && valid_user === true) {
            notValid = false;
        } else notValid = true;
    }

    return (
        <div>
            <select className="add-rating" name="rating" value={rating} onChange={handleChangeRating}>
                <option disabled selected value="">-- Select A Rating --</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <textarea maxLength="400" cols="80" rows="6" name="review-description" className="add-review-description" type='text' value={reviewDescription} placeholder="Your review here" onChange={handleChangeReview} />
            <button disabled={notValid} onClick={handleAddReview}>Submit Review</button>
        </div>
    );
};

export default AddReview;