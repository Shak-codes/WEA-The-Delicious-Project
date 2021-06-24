import express from 'express';
import { restart } from 'nodemon';
//import data from '../data';
const apiData = require("../dataa");


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Hello World'});
});
/*
app.get('/api/v1/franchises', (req, res) => {
    res.json(data.franchises).status(200);
});
*/

app.get('/api/v1/franchises/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let franchises = apiData.data[0].franchises;
    console.log(franchises)
    let response = franchises.find(fran => fran.id === id);
    if (!response) {
        res.status(404).json({ message: `Franchise with ID: ${id} doesn't exist.`});
    }
    res.json(response).status(200);
});

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
})
