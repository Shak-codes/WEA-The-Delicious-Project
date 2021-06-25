const { gql } = require('apollo-server');

module.exports = gql`
    type Query {
        franchise(id: ID!): Franchise
        restaurant(id: ID!): Restaurant
        allReviews(restaurant_id: ID!): [AllReviews]
        review(restaurant_id: ID!, review_id: ID!): Review
        location(id: ID!): Location
        genre(id: ID!): Genre
    }

    type AllReviews {
        reviews: [Review]
    }

    type Franchise {
        id: ID!
        name: String!
        description: String
        genre: [Genre]
        locations: [Location]
    }

    type Restaurant {
        id: ID!
        name: String!
        location: [Location]
        hours: String!
        reviews: [Review]
    }

    type Location {
        id: ID!
        name: String!
    }

    type Genre {
        id: ID!
        name: String!
    }

    type Review {
        id: ID!
        description: String
        rating: Int!
    }

    type Mutation {
        addReview(
            input: addReviewDetails
        ): reviewAdded
    }

    input addReviewDetails {
        restaurant_id: ID!
        review_description: String!
        review_rating: Int!
    }

    type reviewAdded {
        review: Review
    }
`;