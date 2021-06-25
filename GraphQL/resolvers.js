const { responsePathAsArray } = require('graphql');
const fetch = require('node-fetch');
const API_URL = 'http://localhost:3000/api/v1';

const Query = {
    // Query for GET franchise by id
    franchise: async (parent, args, context, info) => {
        const { id } = args;
        const response = await fetch(`${API_URL}/franchises/${id}`);
        const franchise = await response.json();
        return franchise;
    },
    // Query for GET all restaurant reviews
    allReviews: async (parent, args, context, info) => {
        const { restaurant_id } = args;
        const response = await fetch(`${API_URL}/restaurants/${restaurant_id}/reviews`);
        const arrayOfReviews = await response.json();
        return arrayOfReviews;
    },
    // Query for GET genre by id
    genre: async (parent, args, context, info) => {
        const { id } = args;
        const response = await fetch(`${API_URL}/api/v1/genres/${id}`);
        const genre = await response.json();
        return genre;
    }
};

const Franchise = {};

const Restaurant = {};

const Mutation = {
    // Mutation for POST review by restaurant id, review description, and review rating
    addReview: async (parent, args, context, info) => {
        const { input } = args;
        const { restaurant_id, review_description, review_rating } = input;
        const response = await fetch(`${API_URL}/restaurants/${restaurant_id}/reviews`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ description: review_description, rating: review_rating })
        });
        const review = await response.json();
        return {
            review: review
        };
    }
};

module.exports = {
    Query,
    Franchise,
    Restaurant,
    Mutation
};