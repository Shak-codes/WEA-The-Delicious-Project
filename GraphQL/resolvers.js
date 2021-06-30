const { responsePathAsArray } = require('graphql');
const fetch = require('node-fetch');
const API_URL = 'https://wea-group33-restapi.herokuapp.com/api/v1';

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
        const response = await fetch(`${API_URL}/reviews/?resId=${restaurant_id}&revId=${review_id}`);
        const review = await response.json();
        return review;
    },
    // Query for GET location by id
    location: async (parent, args, context, infor) => {
        const { id } = args;
        const response = await fetch(`${API_URL}/locations/${id}`)
        const location = await response.json();
        return location;
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
    },
    // Query for GET all restaurants
    allRestaurants: async (parent, args, context, infor) => {
        const response = await fetch(`${API_URL}/restaurants`);
        const allRestaurants = await response.json();
        return allRestaurants;
    },
    // Query for GET all franchises
    allFranchises: async (parent, args, context, infor) => {
        const response = await fetch(`${API_URL}/franchises`);
        const allFranchises = await response.json();
        return allFranchises;
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
    // GET locations of franchise
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
        const location = arrayOfLocations.find(l => l.name === locationName);
        return location;
    },
    async genre(parent, args, context, info) {
        const franchiseName = parent.name;
        const responseFranchises = await fetch(`${API_URL}/franchises`);
        const franchises = await responseFranchises.json();
        const franchise = franchises.find(f => f.name === franchiseName);

        const genreName = franchise.genre;
        const responseGenre = await fetch(`${API_URL}/genres`);
        const genres = await responseGenre.json();
        const genre = genres.find(g => g.name === genreName);
        return genre;
    },
    async description(parent, args, context, info) {
        const franchiseName = parent.name;
        const responseFranchises = await fetch(`${API_URL}/franchises`);
        const franchises = await responseFranchises.json();
        const franchise = franchises.find(f => f.name === franchiseName);

        const description = franchise.description;
        return description;
    }
};

const Genre = {
    async restaurants(parent, args, context, info) {
        const genreName = parent.name;
        const responseFranchises = await fetch(`${API_URL}/franchises`);
        const arrayOfFranchises = await responseFranchises.json();
        const franchises = arrayOfFranchises.filter(f => f.genre === genreName);

        const franchiseNames = franchises.map(f => f.name);
        const responseRestaurants = await fetch(`${API_URL}/restaurants`);
        const arrayOfRestaurants = await responseRestaurants.json();
        const restaurants = arrayOfRestaurants.filter(r => franchiseNames.includes(r.name));
        return restaurants;
    }
};

const Location = {
    async restaurants(parent, args, context, info) {
        const locationName = parent.name;
        const response = await fetch(`${API_URL}/restaurants`);
        const allRestaurants = await response.json();
        return Promise.all(allRestaurants.filter(r => r.location === locationName));
    }
}

const Mutation = {
    // Mutation for POST review by restaurant id, review description, and review rating
    addReview: async (parent, args, context, info) => {
        const { input } = args;
        const { user, restaurant_id, review_description, review_rating } = input;
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
    },
    // Mutation for PATCH (edit) review by restaurant id, review id, review description, and review rating 
    editReview: async (parent, args, context, info) => {
        const { input } = args;
        const { user, restaurant_id, review_id, review_description, review_rating } = input;
        const response = await fetch(`${API_URL}/reviews/?resId=${restaurant_id}&revId=${review_id}`, {
            method: 'PATCH',
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
    Genre,
    Location,
    Mutation
};