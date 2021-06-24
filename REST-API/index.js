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

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
})
