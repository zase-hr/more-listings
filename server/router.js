require('../node_modules/newrelic/index');
const express = require('express');
const path = require('path');
const compression = require('compression');
const db = require('../database/models.js');

const app = express();
app.use(compression());
app.use(express.static(`${__dirname}/../public/dist`));

// Get Recommended Listings
app.get('/MoreHomes', db.getRecommendedListings);

module.exports = {
  app
};
