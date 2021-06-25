import express from 'express';
const fs = require("fs");
const apiData = require("../../../data");

const app = express();
var router = express.Router();

//Endpoint for GET all restaurants
router.get('/', (req, res) => {
    let franchises = apiData.data.franchises;
    res.json(franchises).status(200);
})

//Endpoint for GET Franchise by ID
router.get('/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let franchises = apiData.data.franchises;
    let response = franchises.find(franchise => franchise.id === id);
    if (!response) {
        res.status(404).json({ message: `Franchise with ID: ${id} doesn't exist.` });
    }
    res.json(response).status(200);
});

module.exports = router;