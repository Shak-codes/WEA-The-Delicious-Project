import express from 'express';
import { restart } from 'nodemon';
const fs = require("fs");
const apiData = require("../../data");
const franchises = require("./routes/franchises");
const restaurants = require("./routes/restaurants");
const reviews = require("./routes/reviews");
const locations = require("./routes/locations");
const genres = require("./routes/genres.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/v1/franchises', franchises);
app.use('/api/v1/restaurants', restaurants);
app.use('/api/v1/reviews', reviews);
app.use('/api/v1/locations', locations);
app.use('/api/v1/genres', genres);

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
})
