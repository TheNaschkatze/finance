const express = require('express');
const BuyIn = require('./buyins.model');
const routes = express.Router();

routes.route('/').get(function (req, res) {
    BuyIn.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

module.exports = routes;
