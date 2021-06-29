import express from 'express';
const fs = require("fs");
const apiData = require("../../../data");

const app = express();
var router = express.Router();
//Endpoint for GET all restaurants
router.get('/', (req, res) => {
    res.json(apiData.data.restaurants).status(200);
})

//Endpoint for GET Restaurant by ID
router.get('/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let restaurants = apiData.data.restaurants;
    let response = restaurants.find(restaurant => restaurant.id === id);
    if (!response) {
        res.status(404).json({ message: `Restaurant with ID: ${id} doesn't exist.` });
    }
    res.json(response).status(200);
});

//Endpoint for GET Reviews by Restaurant ID
router.get('/:id/reviews', (req, res) => {
    let id = parseInt(req.params.id);
    let restaurants = apiData.data.restaurants;
    let theRestaurant = restaurants.find(restaurant => restaurant.id === id);
    if (!theRestaurant) {
        res.status(404).json({ message: `Restaurant with ID: ${id} doesn't exist.` });
    }

    let reviews = theRestaurant.reviews;
    let response = reviews;

    if (!response) {
        res.status(404).json({ message: `The ${theRestaurant.name} Review with ID: ${id} doesn't exist.` });
    }
    res.json(response).status(200);
});

//Endpoint for GET Individual Review by Restaurant ID and Review ID
router.get('/:resId/reviews/:revId', (req, res) => {
    let resId = parseInt(req.params.resId);
    let revId = parseInt(req.params.revId);
    let restaurants = apiData.data.restaurants;
    let theRestaurant = restaurants.find(restaurant => restaurant.id === resId);
    if (!theRestaurant) {
        res.status(404).json({ message: `Restaurant with ID: ${resId} doesn't exist.` });
    }

    let reviews = theRestaurant.reviews;
    let response = reviews.find(review => review.id === revId);
    if (!response) {
        res.status(404).json({ message: `Review with ID: ${revId} not found for restaurant with ID: ${resId}` });
    }

    res.json(response).status(200);
});

//Endpoint for POST Individual review by Restaurant and Review ID
router.post('/:id/reviews', (req, res) => {
    let resId = parseInt(req.params.id);
    let restaurants = apiData.data.restaurants;
    let theRestaurant = restaurants.find(restaurant => restaurant.id === resId);
    if (!theRestaurant) {
        res.status(404).json({ message: `Restaurant with ID: ${id} doesn't exist.` });
    }
    if (!isNaN(req.body.rating)) {
        let reviews = theRestaurant.reviews;
        let revId = reviews.length + 1;
        const body = {
            id: revId,
            ...req.body
        };
        apiData.data.restaurants[resId - 1].reviews.push(body);
        const data = JSON.stringify(apiData, null, 2);
        fs.writeFileSync("../data.json", data, err => {
            if (err) throw err;
            console.log("Done Writing");
        });
        res.json(body).status(201);
    } else {
        res.status(400).json({ message: `Rating: ${req.body.rating} is not a number` });
    }
})

module.exports = router;