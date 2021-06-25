import express from 'express';
import { restart } from 'nodemon';
const fs = require("fs");
const apiData = require("../../data");


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//Endpoint for GET Franchise by ID
app.get('/api/v1/franchises/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let franchises = apiData.data.franchises;
    let response = franchises.find(franchise => franchise.id === id);
    if (!response) {
        res.status(404).json({ message: `Franchise with ID: ${id} doesn't exist.` });
    }
    res.json(response).status(200);
});

//Endpoint for GET Restaurant by ID
app.get('/api/v1/restaurants/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let restaurants = apiData.data.restaurants;
    let response = restaurants.find(restaurant => restaurant.id === id);
    if (!response) {
        res.status(404).json({ message: `Restaurant with ID: ${id} doesn't exist.` });
    }
    res.json(response).status(200);
});

//Endpoint for GET Reviews by Restaurant ID
app.get('/api/v1/restaurants/:id/reviews', (req, res) => {
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
app.get('/api/v1/restaurants/:resId/reviews/:revId', (req, res) => {
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

//Endpoint for GET review by Restaurant ID and Review ID by query
app.get('/api/v1/reviews', (req, res) => {
    const { resId, revId } = req.query;
    if (resId) {
        if (isNaN(resId)) {
            return res.status(400).json({ message: `Restaurant ID: ${resId} is not a number` });
        }
        let restaurants = apiData.data.restaurants;
        let theRestaurant = restaurants.find(restaurant => restaurant.id === parseInt(resId));
        if (!theRestaurant) {
            return res.status(404).json({ message: `Restaurant with ID: ${resId} doesn't exist.` });
        }
        let reviews = theRestaurant.reviews;
        if (revId) {
            if (isNaN(revId)) {
                return res.status(400).json({ message: `Review ID: ${revId} is not a number` });
            }
            let theReview = reviews.find(review => review.id === parseInt(revId));
            if (!theReview) {
                res.status(404).json({ message: `Review with ID: ${revId} doesn't exist for restaurant with ID: ${resId}` });
            }
            res.json(theReview).status(200);
        } else {
            res.json(reviews).status(200);
        }
    } else {
        return res.status(400).json({ message: `Cannot query review without restaurant ID` });
    }
});

//Endpoint for POST Individual review by Restaurant and Review ID
app.post('/api/v1/restaurants/:id/reviews', (req, res) => {
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

//Endpoint for GET Location by ID
app.get('/api/v1/locations/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let locations = apiData.data.locations;
    let response = locations.find(location => location.id === id);
    if (!response) {
        res.status(404).json({ message: `Location with ID: ${id} doesn't exist.` });
    }
    res.json(response).status(200);
});

//Endpoint for GET genre by ID
app.get('/api/v1/genres/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let genres = apiData.data.genres;
    let response = genres.find(location => location.id === id);
    if (!response) {
        res.status(404).json({ message: `Genre with ID: ${id} doesn't exist.` });
    }
    res.json(response).status(200);
});

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
})
