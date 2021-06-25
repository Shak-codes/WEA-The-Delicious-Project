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
    // Query for GET restaurant by id
    restaurant: async (parent, args, context, info) => {
        const { id } = args;
        const response = await fetch(`${API_URL}/restaurants/${id}`);
        const restaurant = await response.json();
        return restaurant;
    },
    // Query for GET all restaurant reviews
    allReviews: async (parent, args, context, info) => {
        const { restaurant_id } = args;
        const response = await fetch(`${API_URL}/restaurants/${restaurant_id}/reviews`);
        const arrayOfReviews = await response.json();
        return { reviews: arrayOfReviews };
    },
    // Query for GET individual restaurant reviews by restaurant and ID
    review: async (parent, args, context, info) => {
        const { restaurant_id, review_id } = args;
        const response = await fetch(`${API_URL}/restaurants/${restaurant_id}/reviews/${review_id}`);
        const review = await response.json();
        return review;
    },
    // Query for GET location by id
    location: async (parent, args, context, infor) => {
        const { id } = args;
        const response = await fetch(`${API_URL}/locations/${id}`)
    },
    // Query for GET genre by id
    genre: async (parent, args, context, info) => {
        const { id } = args;
        const response = await fetch(`${API_URL}/genres/${id}`);
        const genre = await response.json();
        return genre;
    },
    // Query for GET all genres
    allGenres: async (parent, args, context, infor) => {
        const response = await fetch(`${API_URL}/genres`);
        const allGenres = await response.json();
        return allGenres;
    },
    // Query for GET all locations
    allLocations: async (parent, args, context, infor) => {
        const response = await fetch(`${API_URL}/locations`);
        const allLocations = await response.json();
        return allLocations;
    }
};

const Franchise = {
    // GET genre of franchise
    async genre(parent, args, context, info) {
        const genreName = parent.genre;
        const response = await fetch(`${API_URL}/genres`);
        const genres = await response.json();
        const genre = genres.find(g => g.name === genreName);
        return genre;
    },
    async locations(parent, args, context, info) {
        const locationNames = parent.locations;
        const response = await fetch(`${API_URL}/locations`);
        const arrayOfLocations = await response.json();
        const locations = arrayOfLocations.filter(l => locationNames.includes(l.name));
        return locations;
    }
};

const Restaurant = {
    // GET location of restaurant
    async location(parent, args, context, info) {
        const locationName = parent.location;
        const response = await fetch(`${API_URL}/locations`);
        const arrayOfLocations = await response.json();
        const location = arrayOfLocations.filter((name) => name === locationName);
        return location;
    }
};

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