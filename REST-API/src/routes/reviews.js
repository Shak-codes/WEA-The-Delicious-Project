import express from 'express';
const fs = require("fs");
const apiData = require("../../../data");

const app = express();
var router = express.Router();

//Endpoint for GET review by Restaurant ID and Review ID by query
router.get('/', (req, res) => {
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

router.put('/', (req, res) => {
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
            // Create new review object
            const newReview = {
                id: theReview.id,
                description: req.body.description,
                rating: req.body.rating
            };
            apiData.data.restaurants[resId - 1].reviews[theReview.id - 1] = newReview;
            const data = JSON.stringify(apiData, null, 2);
            fs.writeFileSync("../data.json", data, err => {
                if (err) throw err;
                console.log("Done Writing");
            });
            res.json(newReview).status(200);
        } else {
            res.json(reviews).status(200);
        }
    } else {
        return res.status(400).json({ message: `Cannot query review without restaurant ID` });
    }
});

module.exports = router;