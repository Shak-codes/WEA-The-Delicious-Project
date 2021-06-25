import express from 'express';
const fs = require("fs");
const apiData = require("../../../data");

const app = express();
var router = express.Router();

//Endpoint for Get all locations
router.get('/', (req, res) => {
    res.json(apiData.data.locations).status(200);
});

//Endpoint for GET Location by ID
router.get('/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let locations = apiData.data.locations;
    let response = locations.find(location => location.id === id);
    if (!response) {
        res.status(404).json({ message: `Location with ID: ${id} doesn't exist.` });
    }
    res.json(response).status(200);
});

module.exports = router;