import express from 'express';
const fs = require("fs");
const apiData = require("../../../data");

const app = express();
var router = express.Router();

//Endpoint for Get all genres
router.get('/', (req, res) => {
    res.json(apiData.data.genres).status(200);
});

//Endpoint for GET genre by ID
router.get('/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let genres = apiData.data.genres;
    let response = genres.find(location => location.id === id);
    if (!response) {
        res.status(404).json({ message: `Genre with ID: ${id} doesn't exist.` });
    }
    res.json(response).status(200);
});

module.exports = router;