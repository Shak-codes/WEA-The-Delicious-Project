import express from 'express';
import { restart } from 'nodemon';
const apiData = require("../data");


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//Endpoint for GET Franchise by ID
app.get('/api/v1/franchises/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let franchises = apiData.data[0].franchises;
    let response = franchises.find(franchise => franchise.id === id);
    if (!response) {
        res.status(404).json({ message: `Franchise with ID: ${id} doesn't exist.`});
    }
    res.json(response).status(200);
});

//Endpoint for GET Restaurant by ID
app.get('/api/v1/restaurants/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let restaurants = apiData.data[1].restaurants;
    let response = restaurants.find(restaurant => restaurant.id === id);
    if (!response) {
        res.status(404).json({ message: `Restaurant with ID: ${id} doesn't exist.`});
    }
    res.json(response).status(200);
});

//Endpoint for GET Reviews by Restaurant ID
app.get('/api/v1/restaurants/:id/reviews', (req, res) => {
    let id = parseInt(req.params.id);
    let restaurants = apiData.data[1].restaurants;
    let theRestaurant = restaurants.find(restaurant => restaurant.id === id);

    let reviews = theRestaurant.reviews;
    let response = reviews;

    if (!response) {
        res.status(404).json({ message: `The ${theRestaurant.name} Review with ID: ${id} doesn't exist.`});
    }
    res.json(response).status(200);
});

//Endpoint for GET Location by ID
app.get('/api/v1/locations/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let locations = apiData.data[2].locations;
    let response = locations.find(location => location.id === id);
    if (!response) {
        res.status(404).json({ message: `Location with ID: ${id} doesn't exist.`});
    }
    res.json(response).status(200);
});

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
})
