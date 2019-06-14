require('../node_modules/newrelic/index');
const express = require('express');
const path = require('path');
const db = require('../database/models.js');

const app = express();

app.use(express.static(`${__dirname}/../public/dist`));

app.get('/:id', (req, res) => {
  if (!req.params.id) {
    res.status(400);
    res.end();
  } else {
    res.sendFile('index.html', { root: path.resolve(__dirname, '../public/dist') });
  }
});

// Get Recommended Listings
app.get('/:id/RecommendedListings', db.getRecommendedListings);

module.exports = {
  app
};
