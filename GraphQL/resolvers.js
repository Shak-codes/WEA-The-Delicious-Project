const { responsePathAsArray } = require('graphql');
const fetch = require('node-fetch');
const API_URL = 'http://localhost:3000/api/v1';

const Query = {
    franchise: async (parent, args, context, info) => {
        const { id } = args;
        const response = await fetch(`${API_URL}/franchises/${id}`);
        const franchise = await response.json();
        console.log(`${API_URL}/franchises/${id}`);
        return franchise;
    }
};

const Franchise = {};

const Restaurant = {};

const Mutation = {};

module.exports = {
    Query
};