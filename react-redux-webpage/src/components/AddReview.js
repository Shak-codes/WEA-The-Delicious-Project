import React, { useState } from 'react';

let valid_description = false;
let valid_rating = false;
let valid_user = false;
let notValid = true;

const AddReview = (props) => {
    const [reviewDescription, setReviewDescription] = useState('');
    const [rating, setRating] = useState('');

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

    const handleAddReview = () => {
        props.onAddReview(reviewDescription, rating);
    }

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

    const checkValidReview = () => {
        if (valid_description === true && valid_rating === true && valid_user === true) {
            notValid = false;
        } else notValid = true;
    }

    return (
        <div>
            <select className="add-rating" name="rating" value={rating} onChange={handleChangeRating}>
                <option disabled selected value> Rating </option>
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