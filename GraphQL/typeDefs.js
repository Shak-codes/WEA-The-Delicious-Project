const { gql } = require('apollo-server');

module.exports = gql`
    type Query {
        franchise(id: ID!): Franchise
        restaurant(id: ID!): Restaurant
        allReviews(restaurant_id: ID!): AllReviews
        review(restaurant_id: ID!, review_id: ID!): Review
        location(id: ID!): Location
        genre(id: ID!): Genre
        allGenres: [Genre]
        allLocations: [Location]
        allRestaurants: [Restaurant]
        allFranchises: [Franchise]
    }

    type AllReviews {
        reviews: [Review]
    }

    type Franchise {
        id: ID!
        name: String!
        description: String
        genre: Genre
        locations: [Location]
    }

    type Restaurant {
        id: ID!
        name: String!
        location: Location
        hours: String!
        description: String
        genre: Genre
        reviews: [Review]
    }

    type Location {
        id: ID!
        name: String!
        restaurants: [Restaurant]
    }

    type Genre {
        id: ID!
        name: String!
        restaurants: [Restaurant]
    }

    type Review {
        id: ID!
        user: String!
        description: String
        rating: Int!
    }

    type Mutation {
        addReview(
            input: addReviewDetails
        ): reviewAdded
        editReview(
            input: editReviewDetails
        ): reviewEdited
    }

    input addReviewDetails {
        user: String!
        restaurant_id: ID!
        review_description: String!
        review_rating: Int!
    }

    type reviewAdded {
        review: Review
    }

    input editReviewDetails {
        user: String!
        restaurant_id: ID!
        review_id: ID!
        review_description: String
        review_rating: Int
    }

    type reviewEdited {
        review: Review
    }
`;